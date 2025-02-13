import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function RelacionesExternas (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);

 useEffect(() => {
  setTimeout(() => {
    let toFill = ['RelacionesExternas_PuestoSelectID']
    for(let elemName of toFill) {
     let htmlElem = document.getElementsByClassName(elemName)[0]
     for(let record of props.formsData.current[elemName]) {
      let optionInnerText = ''
      let option = document.createElement('option')
      option.value = `{"pk":"${record['ID']}","Descripcion":"${record['Descripcion']}"}`      
      if (elemName == 'Identificacion_CodigoSelect'){optionInnerText = record.Codigo}
      else if(elemName == 'Identificacion_DepartamentoSelect'){optionInnerText = `${record.Codigo} - ${record.Descripcion}`}
      else {optionInnerText = record.Descripcion}
      option.innerText = optionInnerText
      htmlElem? htmlElem.appendChild(option):void 0    
     }
     htmlElem.value = ''
    } 
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['RelacionesExternas']) {
     let tHead = document.getElementsByClassName('RelacionesExternasHead')[0]
     let tBody = document.getElementsByClassName('RelacionesExternasBody')[0]
     for(let records of props.formsData.current['specificData']['RelacionesExternas']) {
      let columnSchema = ['Puesto','Descripción']
      let trBody = document.createElement('tr')
      trBody.className = 'RelacionesExternasTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('RelacionesExternasTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } } 
     updateDeleteRecordButtonStatus() 
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let RelacionesExternasBody = document.getElementsByClassName('RelacionesExternasBody')[0]
  setDisplayDeleteRecordButton(RelacionesExternasBody && RelacionesExternasBody.children.length? true:false)
 }

 function HandleAdd() {
  let RelacionesExternas_PuestoSelectID = document.getElementsByClassName('RelacionesExternas_PuestoSelectID')[0]
  let RelacionesExternas_Objetivo = document.getElementsByClassName('RelacionesExternas_Objetivo')[0]  
  let RelacionesExternasHead = document.getElementsByClassName('RelacionesExternasHead')[0]    
  let RelacionesExternasBody = document.getElementsByClassName('RelacionesExternasBody')[0]    
  let data = [RelacionesExternas_PuestoSelectID,RelacionesExternas_Objetivo]
  let columns = ['Puesto','Responsabilidad']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'RelacionesExternasTr'  
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('RelacionesExternasTr') 
    for (let tr of trList){if(tr!=e.target.parentElement){
     setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } } )  
  errorDataref.current = false
  for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
    let td = document.createElement('td');
    let th = document.createElement('th');
    th.innerText = columns[dataCounter];    
    trHead.appendChild(th)
    if(data[dataCounter].required && !data[dataCounter].value) {
      setModalErrorData(`El campo ${data[dataCounter].className.split('_')[1].replace('Input','').replace('Select','').replace('ID','')} de la ${data[dataCounter].parentElement.className} es requerido.`);
      errorDataref.current = true;
      trBody.innerHTML = '';
    }
    if(!errorDataref.current){if(data[dataCounter].className.includes('ID')){td.innerText=JSON.parse(data[dataCounter].value)['Descripcion']}else{td.innerText = data[dataCounter].value};trBody.appendChild(td)}
  }
  if(!errorDataref.current) {
   let parsedOptionValue = JSON.parse(RelacionesExternas_PuestoSelectID.value)    
   props.backenData.current['RelacionesExternas'].push({'Puesto':parsedOptionValue['pk'],'Descri':RelacionesExternas_Objetivo.value,'elementHtml':trBody.innerHTML});
   props.summaryData.current['RelacionesExternas'][trBody.innerHTML] = {'Puesto':parsedOptionValue['pk'],'Descri':RelacionesExternas_Objetivo.value}      
   RelacionesExternas_PuestoSelectID.value = '';
   RelacionesExternas_Objetivo.value = '';
  }
  RelacionesExternasBody.appendChild(trBody)
  !RelacionesExternasHead.children.length?RelacionesExternasHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'RelacionesExternas':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('RelacionesExternas')? props.summaryData.current['recordsToDelete']['RelacionesExternas'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['RelacionesExternas']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['RelacionesExternas']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['RelacionesExternas'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['RelacionesExternas'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['RelacionesExternas'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['RelacionesExternas'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
  updateDeleteRecordButtonStatus()
  }

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_RelacionesExternas">
   <h5 className='responsTitle' style={{'fontWeight':'900'}}>6.2. Relaciones Externas</h5>   
   <h4 className='responsPuestoTitle'>Puesto:</h4>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/> 
   <select className='RelacionesExternas_PuestoSelectID' required={true}></select>
   <br/>   
   <h4 className='responsTitle'>¿Para qué?</h4>
   <textarea className='RelacionesExternas_Objetivo' placeholder='Utilidad'></textarea>   
   <table className='RelacionesExternasTable'>
    <thead className='RelacionesExternasHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='RelacionesExternasBody'></tbody>
   </table>
   {displayDeleteRecordButton && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'3px 0 3px 0'}} onClick={()=>{handleRecordRemove()}}/>}
   <br/>
   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}