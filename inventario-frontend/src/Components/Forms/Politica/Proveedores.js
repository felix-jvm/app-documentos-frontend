import '../Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function Proveedores (props) {
 const [modalErrorData, setModalErrorData] = useState(false);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined); 
 useEffect(() => {
  setTimeout(() => {
    let toFill = ['Proveedores_Procedimientos']
    for(let elemName of toFill) {
    let htmlElem = document.getElementsByClassName(elemName)[0]
    for(let record of props.formsData.current[elemName]) {
     let option = document.createElement('option')
     option.value = `{"pk":"${record['ID']}","Objetivo":"${record['Objetivo']}","Codigo":"${record['Codigo']}"}`
     option.innerText = `${record['Codigo']}__${record['Objetivo']}`   
     htmlElem? htmlElem.appendChild(option):void 0
    }htmlElem.value = ''}    
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['BoundProcedimientosPolitica']) {
     let tHead = document.getElementsByClassName('ProveedoresHead')[0]
     let tBody = document.getElementsByClassName('ProveedoresBody')[0]
     for(let records of props.formsData.current['specificData']['BoundProcedimientosPolitica']) {
      let columnSchema = ['Código','Descripción']
      let trBody = document.createElement('tr')
      trBody.className = 'ProveedoresTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('ProveedoresTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } 
      let htmlElem = document.getElementsByClassName('Proveedores_Descri')[0] 
      htmlElem.innerText = props.formsData.current['specificData']['Politica']['ProveedoresDescri']
     }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 useEffect((() => {  
      if(props.fullPoliticaData) {
       let Proveedores_Descri = document.getElementsByClassName('Proveedores_Descri')[0]  
       if(Proveedores_Descri.value){props.backenData.current['Politica']['ProveedoresDescri']=Proveedores_Descri.value} } }),[props.fullPoliticaData])

 function updateDeleteRecordButtonStatus() {
  let ProveedoresBody = document.getElementsByClassName('ProveedoresBody')[0]
  setDisplayDeleteRecordButton(ProveedoresBody && ProveedoresBody.children.length? true:false)
 }

 function HandleAdd() {
  let Proveedores_Procedimientos = document.getElementsByClassName('Proveedores_Procedimientos')[0]  
  let parsedOptionValue = JSON.parse(Proveedores_Procedimientos.value)  
  let ProveedoresHead = document.getElementsByClassName('ProveedoresHead')[0]    
  let ProveedoresBody = document.getElementsByClassName('ProveedoresBody')[0]    
  let data = [parsedOptionValue['Codigo'],parsedOptionValue['Objetivo']]
  let columns = ['Código','Descripción']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'ProveedoresTr' 
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('ProveedoresTr') 
    for (let tr of trList){if(tr!=e.target.parentElement){
     setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } } )  
  errorDataref.current = false
  for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
    let td = document.createElement('td');
    let th = document.createElement('th');
    th.innerText = columns[dataCounter];    
    trHead.appendChild(th)
    if(!errorDataref.current){td.innerText=data[dataCounter];trBody.appendChild(td)}
  }
  if(!errorDataref.current) {    
   props.backenData.current['BoundProcedimientosPolitica'].push({'Descri':parsedOptionValue['Objetivo'],'Codigo':parsedOptionValue['Codigo'],'elementHtml':trBody.innerHTML});
   props.summaryData.current['BoundProcedimientosPolitica'][trBody.innerHTML] = {'Descri':parsedOptionValue['Objetivo'],'Codigo':parsedOptionValue['Codigo']}
   Proveedores_Procedimientos.value = '';
  }
  ProveedoresBody.appendChild(trBody)
  !ProveedoresHead.children.length?ProveedoresHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'BoundProcedimientosPolitica':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('BoundProcedimientosPolitica')? props.summaryData.current['recordsToDelete']['BoundProcedimientosPolitica'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['BoundProcedimientosPolitica']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['BoundProcedimientosPolitica']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['BoundProcedimientosPolitica'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['BoundProcedimientosPolitica'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['BoundProcedimientosPolitica'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['BoundProcedimientosPolitica'].splice(counter,1)}
    }}}
  // if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].remove()}
  updateDeleteRecordButtonStatus()    
 }

 return (
  <div className="Sección_Proveedores">
      <h2 style={{'fontWeight':'900','letterSpacing':'-1.5px'}}>9. Proveedores</h2>
      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción:</h5>      
      <textarea className='Proveedores_Descri' placeholder='Descripción general' style={{'marginLeft':'2px'}}></textarea>
      <br/>
      <br/>
      <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-2px','marginTop':'2px'}}>Procedimientos relacionados:</h5>
      <select className='Proveedores_Procedimientos' style={{'minWidth':'21.9%','maxWidth':'21.9%','display':'inline-block','position':'relative','marginRight':'5px'}}></select>
      <input type='submit' className='docRefAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/>
      <br/>
      <br/>
      <table className='ProveedoresTable' style={{'border':'0','borderCollapse':'separate'}}>
       <thead className='ProveedoresHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
       <tbody className='ProveedoresBody'></tbody>
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