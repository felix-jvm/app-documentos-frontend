import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function FormacionAcademica (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);

 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['FormacionAcademica']) {
     let tHead = document.getElementsByClassName('FormacionAcademicaHead')[0]
     let tBody = document.getElementsByClassName('FormacionAcademicaBody')[0]
     for(let records of props.formsData.current['specificData']['FormacionAcademica']) {
      let columnSchema = ['Nivel educativo','Indispensable','Deseable']
      let trBody = document.createElement('tr')
      trBody.className = 'FormacionAcademicaTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {
        let td=document.createElement('td')
        if(['Indispensable','Deseable'].includes(column)){
          if(records[column]){td.style.fontWeight = '900';td.style.padding = '0 0 0 10px';td.innerText='X'}
          else{td.innerText=''}
        }else{td.innerText=records[column]}
        trBody.appendChild(td) }
      // for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}      
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('FormacionAcademicaTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
      let FormacionAcademicaBody = document.getElementsByClassName('FormacionAcademicaBody')[0]
      setDisplayDeleteRecordButton(FormacionAcademicaBody && FormacionAcademicaBody.children.length? true:false)
 }

 function HandleAdd() {
  let FormacionAcademica_NivelEducativo = document.getElementsByClassName('FormacionAcademica_NivelEducativo')[0]
  let FormacionAcademicaHead = document.getElementsByClassName('FormacionAcademicaHead')[0]    
  let FormacionAcademicaBody = document.getElementsByClassName('FormacionAcademicaBody')[0]  
  let FormacionAcademicaIndispensable = document.getElementsByClassName('FormacionAcademicaIndispensable')[0]    
  let FormacionAcademicaDeseable = document.getElementsByClassName('FormacionAcademicaDeseable')[0]      
  let data = [FormacionAcademica_NivelEducativo,FormacionAcademicaIndispensable,FormacionAcademicaDeseable]
  let columns = ['Nivel Educativo','Indispensable','Deseable']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'FormacionAcademicaTr'  
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('FormacionAcademicaTr') 
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
     if(data[dataCounter].className.includes('ID')){td.innerText=JSON.parse(data[dataCounter].value)['Descripcion']}else{
      td.innerText = data[dataCounter].value
      if(data[dataCounter].className == 'FormacionAcademicaIndispensable'){FormacionAcademicaIndispensable.checked? TdMarkStyles(td):td.innerText=''}
      else if(data[dataCounter].className == 'FormacionAcademicaDeseable'){FormacionAcademicaDeseable.checked? TdMarkStyles(td):td.innerText=''} }
      trBody.appendChild(td)} }
  if(!errorDataref.current) {
  //  let parsedOptionValue = JSON.parse(FormacionAcademica_NivelEducativo.value)    
   props.backenData.current['FormacionAcademica'].push({'Descri':FormacionAcademica_NivelEducativo.value,'Indispensable':FormacionAcademicaIndispensable.checked,'Deseable':FormacionAcademicaDeseable.checked,'elementHtml':trBody.innerHTML});
   props.summaryData.current['FormacionAcademica'][trBody.innerHTML] = {'Descri':FormacionAcademica_NivelEducativo.value,'Indispensable':FormacionAcademicaIndispensable.checked,'Deseable':FormacionAcademicaDeseable.checked,'elementHtml':trBody.innerHTML}
   FormacionAcademica_NivelEducativo.value = '';
   FormacionAcademicaIndispensable.checked = false
   FormacionAcademicaDeseable.checked = false
  }
  FormacionAcademicaBody.appendChild(trBody)
  !FormacionAcademicaHead.children.length?FormacionAcademicaHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'FormacionAcademica':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('FormacionAcademica')? props.summaryData.current['recordsToDelete']['FormacionAcademica'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['FormacionAcademica']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['FormacionAcademica']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['FormacionAcademica'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['FormacionAcademica'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['FormacionAcademica'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['FormacionAcademica'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'} 
  updateDeleteRecordButtonStatus()   
  }

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_FormacionAcademica">
   <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>9. Perfil del Puesto</h2>   
   <h5 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1px'}}>9.1. Formación académica</h5>
   <h4 className='responsTitle' style={{'letterSpacing':'-1.7px'}}>Nivel educativo:</h4>   
   <input type='text' className='FormacionAcademica_NivelEducativo' placeholder='Nivel educativo' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}/> 
   <br/>
   <br/>
   <fieldset>
    <input type='radio' id='FormacionAcademicaIndispensable' name='FormacionAcademica' value='Indispensable' className='FormacionAcademicaIndispensable'/>
    <label for='FormacionAcademicaIndispensable' style={{'margin':'0 0 0 8px'}}>Indispensable</label>
    <br/>
    <input type='radio' id='FormacionAcademicaDeseable' name='FormacionAcademica' value='Deseable' className='FormacionAcademicaDeseable'/>
    <label for='FormacionAcademicaDeseable' style={{'margin':'0 0 0 8px'}}>Deseable</label>   
   </fieldset> 
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'margin':'15px 0 0 0'}}/> 
   <br/>
   <br/>
   <table className='FormacionAcademicaTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='FormacionAcademicaHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='FormacionAcademicaBody'></tbody>
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