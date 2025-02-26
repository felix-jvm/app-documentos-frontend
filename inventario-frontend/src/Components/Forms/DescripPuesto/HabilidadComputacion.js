import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function HabilidadComputacion (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);

 useEffect(() => {
  setTimeout(() => { 
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['Computacion']) {
     let tHead = document.getElementsByClassName('HabilidadComputacionHead')[0]
     let tBody = document.getElementsByClassName('HabilidadComputacionBody')[0]
     for(let records of props.formsData.current['specificData']['Computacion']) {
      let columnSchema = ['Programa Tecnológico','Grado','Indispensable','Deseable']
      let trBody = document.createElement('tr')
      trBody.className = 'HabilidadComputacionTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {
        let td=document.createElement('td')
        if(['Indispensable','Deseable'].includes(column)){
          if(records[column]){td.style.fontWeight = '900';td.style.padding = '0 0 0 10px';td.innerText='X'}
          else{td.innerText=''}
        }else{td.innerText=records[column]}
        trBody.appendChild(td) }
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('HabilidadComputacionTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let HabilidadComputacionBody = document.getElementsByClassName('HabilidadComputacionBody')[0]
  setDisplayDeleteRecordButton(HabilidadComputacionBody && HabilidadComputacionBody.children.length? true:false)
 }

 function HandleAdd() {
  let HabilidadComputacion_ProgramaTecnologico = document.getElementsByClassName('HabilidadComputacion_ProgramaTecnologico')[0]
  let HabilidadComputacion_GradoID = document.getElementsByClassName('HabilidadComputacion_GradoID')[0]
  let HabilidadComputacionIndispensable = document.getElementsByClassName('HabilidadComputacionIndispensable')[0]    
  let HabilidadComputacionDeseable = document.getElementsByClassName('HabilidadComputacionDeseable')[0] 
  let HabilidadComputacionHead = document.getElementsByClassName('HabilidadComputacionHead')[0]    
  let HabilidadComputacionBody = document.getElementsByClassName('HabilidadComputacionBody')[0]    
  let data = [HabilidadComputacion_ProgramaTecnologico,HabilidadComputacion_GradoID,HabilidadComputacionIndispensable,HabilidadComputacionDeseable]
  let columns = ['Programa Tecnológico','Grado','Indispensable','Deseable']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'HabilidadComputacionTr'
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('HabilidadComputacionTr') 
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
      const TdMarkStyles = (td) => {
       td.style.fontWeight = '900'
       td.style.padding = '0 0 0 10px'
       td.innerText='X'
      }
    if(data[dataCounter].className == 'HabilidadComputacion_GradoID'){
      let cleanedDetailProp = ''
      try{cleanedDetailProp=JSON.parse(data[dataCounter].value)['Descripcion']}
      catch{cleanedDetailProp=data[dataCounter].value}
      td.innerText = cleanedDetailProp
    }
    else if(data[dataCounter].className == 'HabilidadComputacionIndispensable'){HabilidadComputacionIndispensable.checked? TdMarkStyles(td):td.innerText=''}
    else if(data[dataCounter].className == 'HabilidadComputacionDeseable'){HabilidadComputacionDeseable.checked? TdMarkStyles(td):td.innerText=''}
    else if(data[dataCounter].className == 'HabilidadComputacion_ProgramaTecnologico'){td.innerText = data[dataCounter].value}
     trBody.appendChild(td)} }
  if(!errorDataref.current) {   
  //  let parsedOptionValue = JSON.parse(HabilidadComputacion_GradoID.value) 
   props.backenData.current['Computacion'].push({'Descri':HabilidadComputacion_ProgramaTecnologico.value,'Grado':HabilidadComputacion_GradoID.value,'Indispensable':HabilidadComputacionIndispensable.checked,'Deseable':HabilidadComputacionDeseable.checked,'elementHtml':trBody.innerHTML});
   props.summaryData.current['Computacion'][trBody.innerHTML] = {'Descri':HabilidadComputacion_ProgramaTecnologico.value,'Grado':HabilidadComputacion_GradoID.value,'Indispensable':HabilidadComputacionIndispensable.checked,'Deseable':HabilidadComputacionDeseable.checked}
   HabilidadComputacion_ProgramaTecnologico.value = ''
   HabilidadComputacion_GradoID.value = '';
   HabilidadComputacionIndispensable.checked = false
   HabilidadComputacionDeseable.checked = false
  }
  HabilidadComputacionBody.appendChild(trBody)
  !HabilidadComputacionHead.children.length?HabilidadComputacionHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'Computacion':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('Computacion')? props.summaryData.current['recordsToDelete']['Computacion'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['Computacion']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['Computacion']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['Computacion'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['Computacion'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['Computacion'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['Computacion'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  updateDeleteRecordButtonStatus()    
  }

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_HabilidadComputacion">
   <h5 className='responsTitle'>Computación</h5>   
   <h4 className='responsTitle'>Programa Tecnológico:</h4>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/> 
   <input type='text' className='HabilidadComputacion_ProgramaTecnologico' placeholder='Programa Tecnológico' style={{'minWidth':'15%','maxWidth':'15%'}}/> 
   <br/>
   <br/>
   <h4 className='responsTitle'>Grado:</h4>
   <select className='HabilidadComputacion_GradoID' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}>
   <option>A</option>
    <option>B</option>
    <option>C</option>
   </select>    
   <br/>
   <br/>   
   <fieldset>
    <input type='radio' id='HabilidadComputacionIndispensable' name='HabilidadComputacion' value='Indispensable' className='HabilidadComputacionIndispensable'/>
    <label for='HabilidadComputacionIndispensable' style={{'margin':'0 0 0 8px'}}>Indispensable</label>
    <br/>
    <input type='radio' id='HabilidadComputacionDeseable' name='HabilidadComputacion' value='Deseable' className='HabilidadComputacionDeseable'/>
    <label for='HabilidadComputacionDeseable' style={{'margin':'0 0 0 8px'}}>Deseable</label>   
   </fieldset> 
   <table className='HabilidadComputacionTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='HabilidadComputacionHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='HabilidadComputacionBody'></tbody>
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