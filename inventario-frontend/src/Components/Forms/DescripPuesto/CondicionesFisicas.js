import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function CondicionesFisicas (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);

 useEffect(() => {
  setTimeout(() => { 
    if(props.formsData.current['specificData'] && (props.formsData.current['specificData']['CondicionesFisicas'] || props.formsData.current['specificData']['Riesgos'])) {
     let tHead = document.getElementsByClassName('CondicionesFisicasHead')[0]
     let tBody = document.getElementsByClassName('CondicionesFisicasBody')[0]
     let initialTableData = [[props.formsData.current['specificData']['CondicionesFisicas']],[props.formsData.current['specificData']['Riesgos']]]
     let tableSectionsNames = ['Condicion Física','Riesgo']
     let tableSectionsCounter = 0
     for(let tableSections of initialTableData) { 
      let currenTableSection = tableSectionsNames[tableSectionsCounter]
      for(let records of tableSections[0]) {
        let trBody = document.createElement('tr')
        trBody.className = 'CondicionesFisicasTr'
        if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of ['Condición Física','Riesgo']) {let th=document.createElement('th');th.innerText=column;trHead.appendChild(th)}tHead.appendChild(trHead)}
        let primaryTd =document.createElement('td')
        let secundaryTd =document.createElement('td')
        primaryTd.innerText=records['Descripción']
        if(currenTableSection=='Condicion Física') {
          trBody.appendChild(primaryTd)  
          trBody.appendChild(secundaryTd)
        } else {
          trBody.appendChild(secundaryTd)
          trBody.appendChild(primaryTd)  
        }    
        trBody.value=records['ID']
        trBody.style.backgroundColor = 'white'
        trBody.style.fontWeight = '400'
        trBody.addEventListener('click',(e)=>{
        if(e.target.parentElement.value){
          selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
        }else{selectedTableRecord.current = {'record':e.target.parentElement}}
        let trList = document.getElementsByClassName('CondicionesFisicasTr') 
        for (let tr of trList){if(tr!=e.target.parentElement){
          setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
        })      
        tBody.appendChild(trBody)
      } tableSectionsCounter++} } 
      updateDeleteRecordButtonStatus() 
      let CondicionesFisicas_Tipo = document.getElementsByClassName('CondicionesFisicas_TipoID')[0]   
      CondicionesFisicas_Tipo.value = ''      
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let CondicionesFisicasBody = document.getElementsByClassName('CondicionesFisicasBody')[0]
  setDisplayDeleteRecordButton(CondicionesFisicasBody && CondicionesFisicasBody.children.length? true:false)
 }

 function HandleAdd() {
  let CondicionesFisicas_TipoID = document.getElementsByClassName('CondicionesFisicas_TipoID')[0]
  let CondicionesFisicas_Descripción = document.getElementsByClassName('CondicionesFisicas_Descripción')[0]  
  let CondicionesFisicasHead = document.getElementsByClassName('CondicionesFisicasHead')[0]    
  let CondicionesFisicasBody = document.getElementsByClassName('CondicionesFisicasBody')[0]    
  let data = [CondicionesFisicas_TipoID,CondicionesFisicas_Descripción]
  let columns = ['Condiciones Físicas','Riesgos']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'CondicionesFisicasTr'
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('CondicionesFisicasTr') 
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
    if(!errorDataref.current){
      const TdMarkStyles = (td,data) => {
       td.innerText=' - ' + data
      }
      if(CondicionesFisicas_TipoID.value == 'Condición física'){columns[dataCounter] == 'Condiciones Físicas'? TdMarkStyles(td,CondicionesFisicas_Descripción.value):td.innerText=''}
      else if(CondicionesFisicas_TipoID.value == 'Riesgo'){columns[dataCounter] == 'Riesgos'? TdMarkStyles(td,CondicionesFisicas_Descripción.value):td.innerText=''}
     trBody.appendChild(td)}
  }
  if(!errorDataref.current) {
   //  let parsedOptionValue = JSON.parse(CondicionesFisicas_TipoID.value)
   if(CondicionesFisicas_TipoID.value == 'Condición física'){
    props.backenData.current['CondicionesFisicas'].push({'Descri':CondicionesFisicas_Descripción.value,'elementHtml':trBody.innerHTML});
    props.summaryData.current['CondicionesFisicas'][trBody.innerHTML] = {'Descri':CondicionesFisicas_Descripción.value}
   }
   else if(CondicionesFisicas_TipoID.value == 'Riesgo'){
    props.backenData.current['Riesgos'].push({'Descri':CondicionesFisicas_Descripción.value,'elementHtml':trBody.innerHTML});
    props.summaryData.current['Riesgos'][trBody.innerHTML] = {'Descri':CondicionesFisicas_Descripción.value}
   }
   CondicionesFisicas_TipoID.value = '';
   CondicionesFisicas_Descripción.value = '';
  }
  CondicionesFisicasBody.appendChild(trBody)
  !CondicionesFisicasHead.children.length?CondicionesFisicasHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove() {
  if(!selectedTableRecord.current){return}
  if(selectedTableRecord.current['record'].children && selectedTableRecord.current['record'].children[0].innerText) {

      if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
        props.backenData.current['recordsToDelete'].push({'CondicionesFisicas':selectedTableRecord.current['recordToDeleteId']})
        Object.keys(props.summaryData.current['recordsToDelete']).includes('CondicionesFisicas')? props.summaryData.current['recordsToDelete']['CondicionesFisicas'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['CondicionesFisicas']=[selectedTableRecord.current['record']]   
      }else{
        if(selectedTableRecord.current['record']){
          Object.keys(props.summaryData.current['CondicionesFisicas']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['CondicionesFisicas'][selectedTableRecord.current['record'].innerHTML]})():void 0      
          for(let counter=0;counter<=props.backenData.current['CondicionesFisicas'].length-1;counter++){
          let currentRecordToCreate = props.backenData.current['CondicionesFisicas'][counter]
          if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['CondicionesFisicas'].splice(counter,1)}
        }}}
  } else if(selectedTableRecord.current['record'].children && selectedTableRecord.current['record'].children[1].innerText) {

      if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
        props.backenData.current['recordsToDelete'].push({'Riesgos':selectedTableRecord.current['recordToDeleteId']})
        Object.keys(props.summaryData.current['recordsToDelete']).includes('Riesgos')? props.summaryData.current['recordsToDelete']['Riesgos'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['Riesgos']=[selectedTableRecord.current['record']]   
      }else{
        if(selectedTableRecord.current['record']){
          Object.keys(props.summaryData.current['Riesgos']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['Riesgos'][selectedTableRecord.current['record'].innerHTML]})():void 0      
          for(let counter=0;counter<=props.backenData.current['Riesgos'].length-1;counter++){
          let currentRecordToCreate = props.backenData.current['Riesgos'][counter]
          if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['Riesgos'].splice(counter,1)}
        }}} }
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
  updateDeleteRecordButtonStatus()
  }

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_CondicionesFisicas">
   <h2 className='responsPuestoTitle' style={{'fontWeight':'900'}}>10. Condiciones de Trabajo Física, Ambientales y Riesgos</h2>
   <h4 className='responsTitle'>Tipo:</h4>   
   <select className='CondicionesFisicas_TipoID' required={true} style={{'minWidth':'15%','maxWidth':'15%','display':'inline-block','position':'relative','marginRight':'5px'}}>
    <option>Condición física</option>
    <option>Riesgo</option>
   </select>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'zIndex':'5000','display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px'}}/>
   <br/>
   <br/>
   <h4 className='responsTitle'>Descripción de la condición física o el riesgo:</h4>
   <input type='text' className='CondicionesFisicas_Descripción' style={{'minWidth':'15%','maxWidth':'15%'}} placeholder='Descripción'/>     
   <br/>
   <br/>
   <table className='CondicionesFisicasTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='CondicionesFisicasHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='CondicionesFisicasBody'></tbody>
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