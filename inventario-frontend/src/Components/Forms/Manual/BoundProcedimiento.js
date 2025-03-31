import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function BoundProcedimiento (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);

 useEffect(() => {
  setTimeout(() => {
    let toFill = ['BoundProcedimiento']
    for(let elemName of toFill) {       
    let htmlElem = document.getElementsByClassName(elemName)[0]
    for(let record of props.formsData.current[elemName]) {
     let optionInnerText = ''
     let option = document.createElement('option')
     option.value = `{"pk":"${record['ID']}"}` 
     optionInnerText = `${record['Codigo']} __ ${record['Objetivo']}`
     option.innerText = optionInnerText    
     htmlElem? htmlElem.appendChild(option):void 0    
     htmlElem.value = ''
    } }

    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['BoundProcedimiento']) {
     let tHead = document.getElementsByClassName('BoundProcedimientoHead')[0]
     let tBody = document.getElementsByClassName('BoundProcedimientoBody')[0]
     for(let records of props.formsData.current['specificData']['BoundProcedimiento']) {
      let columnSchema = ['Nomenclatura','Referencia del documento']
      let trBody = document.createElement('tr')
      trBody.className = 'BoundProcedimientoTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('BoundProcedimientoTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let BoundProcedimientoBody = document.getElementsByClassName('BoundProcedimientoBody')[0]
  setDisplayDeleteRecordButton(BoundProcedimientoBody && BoundProcedimientoBody.children.length? true:false)
 }

 function HandleAdd() {
  let BoundProcedimiento = document.getElementsByClassName('BoundProcedimiento')[0]
  if(BoundProcedimiento.selectedIndex==-1){return}
  let boundManualesManualValue = BoundProcedimiento.children[BoundProcedimiento.selectedIndex].innerText.split(' __ ')
  let BoundProcedimientoHead = document.getElementsByClassName('BoundProcedimientoHead')[0]    
  let BoundProcedimientoBody = document.getElementsByClassName('BoundProcedimientoBody')[0]    
  let data = [boundManualesManualValue[0], boundManualesManualValue[1]]
  let columns = ['Nomenclatura','Referencia del documento']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'BoundProcedimientoTr'  
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('BoundProcedimientoTr') 
    for (let tr of trList){if(tr!=e.target.parentElement){
     setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } } )  
  errorDataref.current = false
  for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
    let td = document.createElement('td');
    let th = document.createElement('th');
    th.innerText = columns[dataCounter];    
    trHead.appendChild(th)
    // if(data[dataCounter].required && !data[dataCounter].value) {
    //   setModalErrorData(`El campo ${data[dataCounter].className.split('_')[1].replace('Input','').replace('Select','').replace('ID','')} de la ${data[dataCounter].parentElement.className} es requerido.`);
    //   errorDataref.current = true;
    //   trBody.innerHTML = '';
    // }
    // if(!errorDataref.current){if(data[dataCounter].className.includes('ID')){td.innerText=JSON.parse(data[dataCounter].value)['Descripcion']}else{td.innerText = data[dataCounter].value};
    td.innerText = data[dataCounter]
    trBody.appendChild(td)
  }
  if(!errorDataref.current) {
  //  let parsedOptionValue = JSON.parse(MarcoLegalRegulatorioDescripción.value)
   props.backenData.current['BoundProcedimiento'].push({'Codigo':boundManualesManualValue[0],'Descri':boundManualesManualValue[1],'elementHtml':trBody.innerHTML});
   props.summaryData.current['BoundProcedimiento'][trBody.innerHTML] = {'Codigo':boundManualesManualValue[0],'Descri':boundManualesManualValue[1]}      
   BoundProcedimiento.value = '';
  }
  BoundProcedimientoBody.appendChild(trBody)
  !BoundProcedimientoHead.children.length?BoundProcedimientoHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'BoundProcedimiento':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('BoundProcedimiento')? props.summaryData.current['recordsToDelete']['BoundProcedimiento'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['BoundProcedimiento']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['BoundProcedimiento']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['BoundProcedimiento'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['BoundProcedimiento'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['BoundProcedimiento'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['BoundProcedimiento'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
  updateDeleteRecordButtonStatus()
  }

 return (
  <div className="Secciòn_BoundProcedimiento">
   <h5 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1px'}}>13.3. Procedimientos</h5>
   <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-1px','marginTop':'6px'}}>Procedimiento:</h5>
   <select className='BoundProcedimiento' style={{'minWidth':'21.9%','maxWidth':'21.9%','display':'inline-block','position':'relative','marginRight':'5px'}}></select>   
   <input type='submit' className='responsAddButton' value='Agregar' style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}} onClick={()=>{HandleAdd()}}/> 
   <br/>
   <br/>
   <table className='BoundProcedimientoTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='BoundProcedimientoHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='BoundProcedimientoBody'></tbody>
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