import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function ExperienciaIdeal (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);

 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['ExperienciaIdeal']) {
     let tHead = document.getElementsByClassName('ExperienciaIdealHead')[0]
     let tBody = document.getElementsByClassName('ExperienciaIdealBody')[0]
     for(let records of props.formsData.current['specificData']['ExperienciaIdeal']) {
      let columnSchema = ['Experiencia','Indispensable','Deseable']
      let trBody = document.createElement('tr')
      trBody.className = 'ExperienciaIdealTr'
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
      let trList = document.getElementsByClassName('ExperienciaIdealTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let ExperienciaIdealBody = document.getElementsByClassName('ExperienciaIdealBody')[0]
  setDisplayDeleteRecordButton(ExperienciaIdealBody && ExperienciaIdealBody.children.length? true:false)
 }

 function HandleAdd() {
  let ExperienciaIdeal_DetalleID = document.getElementsByClassName('ExperienciaIdeal_DetalleID')[0]
  let ExperienciaIdeal_DetalleDescripcion = document.getElementsByClassName('ExperienciaIdeal_DetalleDescripcion')[0]  
  let ExperienciaIdealIndispensable = document.getElementsByClassName('ExperienciaIdealIndispensable')[0]    
  let ExperienciaIdealDeseable = document.getElementsByClassName('ExperienciaIdealDeseable')[0]   
  let ExperienciaIdealHead = document.getElementsByClassName('ExperienciaIdealHead')[0]    
  let ExperienciaIdealBody = document.getElementsByClassName('ExperienciaIdealBody')[0]    
  let data = [ExperienciaIdeal_DetalleID,ExperienciaIdealIndispensable,ExperienciaIdealDeseable]
  let columns = ['Experiencia','Indispensable','Deseable']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'ExperienciaIdealTr'  
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('ExperienciaIdealTr') 
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
    if(data[dataCounter].className == 'ExperienciaIdeal_DetalleID'){
      let cleanedDetailProp = ''
      try{cleanedDetailProp=JSON.parse(data[dataCounter].value)['Descripcion']}
      catch{cleanedDetailProp=data[dataCounter].value}
      td.innerText = cleanedDetailProp +': '+ ExperienciaIdeal_DetalleDescripcion.value
    } else if(data[dataCounter].className == 'ExperienciaIdealIndispensable'){ExperienciaIdealIndispensable.checked? TdMarkStyles(td):td.innerText=''}
      else if(data[dataCounter].className == 'ExperienciaIdealDeseable'){ExperienciaIdealDeseable.checked? TdMarkStyles(td):td.innerText=''}
     trBody.appendChild(td)} 
  }
  if(!errorDataref.current) {
  //  let parsedOptionValue = JSON.parse(ExperienciaIdeal_DetalleID.value)
   props.backenData.current['ExperienciaIdeal'].push({'Descri':ExperienciaIdeal_DetalleID.value +': '+ ExperienciaIdeal_DetalleDescripcion.value,'Indispensable':ExperienciaIdealIndispensable.checked,'Deseable':ExperienciaIdealDeseable.checked,'elementHtml':trBody.innerHTML});
   props.summaryData.current['ExperienciaIdeal'][trBody.innerHTML] = {'Descri':ExperienciaIdeal_DetalleID.value +': '+ ExperienciaIdeal_DetalleDescripcion.value,'Indispensable':ExperienciaIdealIndispensable.checked,'Deseable':ExperienciaIdealDeseable.checked}
   ExperienciaIdeal_DetalleID.value = '';
   ExperienciaIdeal_DetalleDescripcion.value = '';
   ExperienciaIdealIndispensable.checked = false
   ExperienciaIdealDeseable.checked = false
  }
  ExperienciaIdealBody.appendChild(trBody)
  !ExperienciaIdealHead.children.length?ExperienciaIdealHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'ExperienciaIdeal':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('ExperienciaIdeal')? props.summaryData.current['recordsToDelete']['ExperienciaIdeal'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['ExperienciaIdeal']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['ExperienciaIdeal']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['ExperienciaIdeal'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['ExperienciaIdeal'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['ExperienciaIdeal'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['ExperienciaIdeal'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'} 
  updateDeleteRecordButtonStatus()   
  }

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_ExperienciaIdeal">
   <h5 className='responsTitle' style={{'fontWeight':'900'}}>9.3. Experiencia ideal</h5>
   <h4 className='responsTitle'>Detalle:</h4>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/> 
   <select className='ExperienciaIdeal_DetalleID' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}>
    <option>Tiempo de labor</option>
    <option>Puesto/s</option>
    <option>Tipo de Compañía</option>
   </select>
   <br/>
   <br/>   
   <h4 className='responsTitle'>Especificación del Detalle:</h4>
   <input type='text' className='ExperienciaIdeal_DetalleDescripcion' placeholder='Especificación del Detalle' style={{'minWidth':'15%','maxWidth':'15%'}}/>   
   <br/>   
   <br/>
   <br/>
   <fieldset>
    <input type='radio' id='ExperienciaIdealIndispensable' name='ExperienciaIdeal' value='Indispensable' className='ExperienciaIdealIndispensable'/>
    <label for='ExperienciaIdealIndispensable' style={{'margin':'0 0 0 8px'}}>Indispensable</label>
    <br/>
    <input type='radio' id='ExperienciaIdealDeseable' name='ExperienciaIdeal' value='Deseable' className='ExperienciaIdealDeseable'/>
    <label for='ExperienciaIdealDeseable' style={{'margin':'0 0 0 8px'}}>Deseable</label>   
   </fieldset> 
   <table className='ExperienciaIdealTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='ExperienciaIdealHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='ExperienciaIdealBody'></tbody>
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