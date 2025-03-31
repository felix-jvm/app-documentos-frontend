import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function DecisionesSinAprobacion (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);

 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['DecisionesSinAprobacion']) {
     let tHead = document.getElementsByClassName('DecisionesSinAprobacionHead')[0]
     let tBody = document.getElementsByClassName('DecisionesSinAprobacionBody')[0]
     for(let records of props.formsData.current['specificData']['DecisionesSinAprobacion']) {
      let columnSchema = ['Descripción']
      let trBody = document.createElement('tr')
      trBody.className = 'DecisionesSinAprobacionTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('DecisionesSinAprobacionTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let DecisionesSinAprobacionBody = document.getElementsByClassName('DecisionesSinAprobacionBody')[0]
  setDisplayDeleteRecordButton(DecisionesSinAprobacionBody && DecisionesSinAprobacionBody.children.length? true:false)
 }

 function HandleAdd() {
  let DecisionesSinAprobacion_Decisión = document.getElementsByClassName('DecisionesSinAprobacion_Decisión')[0]
  let DecisionesSinAprobacionHead = document.getElementsByClassName('DecisionesSinAprobacionHead')[0]    
  let DecisionesSinAprobacionBody = document.getElementsByClassName('DecisionesSinAprobacionBody')[0]    
  let data = [DecisionesSinAprobacion_Decisión]
  let columns = ['Descripción de la decisión']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'DecisionesSinAprobacionTr'
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('DecisionesSinAprobacionTr') 
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
  //  let parsedOptionValue = JSON.parse(DecisionesSinAprobacion_Decisión.value)    
   props.backenData.current['DecisionesSinAprobacion'].push({'Descri':DecisionesSinAprobacion_Decisión.value,'elementHtml':trBody.innerHTML});
   props.summaryData.current['DecisionesSinAprobacion'][trBody.innerHTML] = {'Descri':DecisionesSinAprobacion_Decisión.value}      
   DecisionesSinAprobacion_Decisión.value = '';
  }
  DecisionesSinAprobacionBody.appendChild(trBody)
  !DecisionesSinAprobacionHead.children.length?DecisionesSinAprobacionHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'DecisionesSinAprobacion':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('DecisionesSinAprobacion')? props.summaryData.current['recordsToDelete']['DecisionesSinAprobacion'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['DecisionesSinAprobacion']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['DecisionesSinAprobacion']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['DecisionesSinAprobacion'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['DecisionesSinAprobacion'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['DecisionesSinAprobacion'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['DecisionesSinAprobacion'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  updateDeleteRecordButtonStatus()    
  }

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Sección_DecisionesSinAprobacion">
   <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>8. Autoridad y Autonomía</h2>   
   <h5 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1px'}}>8.1. Decisiones que este puesto puede tomar sin necesidad de aprobación</h5>
   <h4 className='responsPuestoTitle' style={{'letterSpacing':'-1.7px'}}>Decisiones:</h4>   
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'marginLeft':'5px'}}/> 
   <textarea className='DecisionesSinAprobacion_Decisión' placeholder='Descripción de la decisión'></textarea>   
   <br/>
   <br/>
   <table className='DecisionesSinAprobacionTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='DecisionesSinAprobacionHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='DecisionesSinAprobacionBody'></tbody>
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