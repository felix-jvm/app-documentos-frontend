import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function CompeteActituLista (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);

 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['CompeteActituLista']) {
     let tHead = document.getElementsByClassName('CompeteActituListaHead')[0]
     let tBody = document.getElementsByClassName('CompeteActituListaBody')[0]
     let competeActituLista_Descripcion = document.getElementsByClassName('CompeteActituLista_Descripcion')[0] 
     competeActituLista_Descripcion.value = props.formsData.current['specificData']['DescripcionPuesto'][0]['CompeteActituDescr']
     for(let records of props.formsData.current['specificData']['CompeteActituLista']) {
      let columnSchema = ['Competencias Actitudinales','Grado Indispensable','Deseable']
      let trBody = document.createElement('tr')
      trBody.className = 'CompeteActituListaTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {
        let td=document.createElement('td')
        if(['Grado Indispensable','Deseable'].includes(column)){
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
      let trList = document.getElementsByClassName('CompeteActituListaTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let CompeteActituListaBody = document.getElementsByClassName('CompeteActituListaBody')[0]
  setDisplayDeleteRecordButton(CompeteActituListaBody && CompeteActituListaBody.children.length? true:false)
 }

 function HandleAdd() {
  let CompeteActituLista_Competencia = document.getElementsByClassName('CompeteActituLista_Competencia')[0]
  let CompeteActituListaHead = document.getElementsByClassName('CompeteActituListaHead')[0]    
  let CompeteActituListaBody = document.getElementsByClassName('CompeteActituListaBody')[0]
  let CompeteActituListaIndispensable = document.getElementsByClassName('CompeteActituListaIndispensable')[0]    
  let CompeteActituListaDeseable = document.getElementsByClassName('CompeteActituListaDeseable')[0]      
  let data = [CompeteActituLista_Competencia,CompeteActituListaIndispensable,CompeteActituListaDeseable]
  let columns = ['Competencia','Indispensable','Deseable']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'CompeteActituListaTr'  
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('CompeteActituListaTr') 
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
     if(data[dataCounter].className == 'CompeteActituLista_Competencia'){td.innerText = data[dataCounter].value}
     else if(data[dataCounter].className == 'CompeteActituListaIndispensable'){CompeteActituListaIndispensable.checked? TdMarkStyles(td):td.innerText=''}
     else if(data[dataCounter].className == 'CompeteActituListaDeseable'){CompeteActituListaDeseable.checked? TdMarkStyles(td):td.innerText=''}
     trBody.appendChild(td)}
  }
  if(!errorDataref.current) {
  //  let parsedOptionValue = JSON.parse(CompeteActituLista_Competencia.value)    
   props.backenData.current['CompeteActituLista'].push({'Descri':CompeteActituLista_Competencia.value,'Indispensable':CompeteActituListaIndispensable.checked,'Deseable':CompeteActituListaDeseable.checked,'elementHtml':trBody.innerHTML});
   props.summaryData.current['CompeteActituLista'][trBody.innerHTML] = {'Descri':CompeteActituLista_Competencia.value,'Indispensable':CompeteActituListaIndispensable.checked,'Deseable':CompeteActituListaDeseable.checked}
   CompeteActituLista_Competencia.value = '';
   CompeteActituListaIndispensable.checked = false
   CompeteActituListaDeseable.checked = false
  }
  CompeteActituListaBody.appendChild(trBody)
  !CompeteActituListaHead.children.length?CompeteActituListaHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'CompeteActituLista':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('CompeteActituLista')? props.summaryData.current['recordsToDelete']['CompeteActituLista'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['CompeteActituLista']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['CompeteActituLista']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['CompeteActituLista'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['CompeteActituLista'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['CompeteActituLista'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['CompeteActituLista'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'} 
  updateDeleteRecordButtonStatus()
}

  useEffect((() => {
    if(props.fullPuestoDescriData){
     let CompeteActituLista_Descripcion = document.getElementsByClassName('CompeteActituLista_Descripcion')[0]
     CompeteActituLista_Descripcion.value? props.backenData.current['DescripcionPuesto']['CompeteActituDescr'] = CompeteActituLista_Descripcion.value:void 0
    //  if(!props.backenData.current['DescripcionPuesto_CodigoPuesto'] || !props.backenData.current['DescripcionPuesto_TituloPuesto']) {
    //   (!props.backenData.current['DescripcionPuesto_CodigoPuesto'] && setModalErrorData(`El campo Código de la Sección_Identificación es requerido.`))
    //   props.setSendData(false)
    //   props.setConfirmationModal(false)
    //   return  
    //   }   
    }}),[props.fullPuestoDescriData])

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_CompeteActituLista">
   <h5 className='responsTitle' style={{'fontWeight':'900'}}>9.4. Lista de Competencias</h5>
   <h4 className='responsPuestoTitle'>9.4.1. Competencias Actitudinales del Puesto:</h4>
   <textarea className='CompeteActituLista_Descripcion' placeholder='Descripción de competencias actitudinales del puesto'></textarea>   
   <h4 className='responsTitle'>Competencia Actitudinal:</h4>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/> 
   <input type='text' className='CompeteActituLista_Competencia' style={{'minWidth':'15%','maxWidth':'15%'}} placeholder='Competencia Actitudinal'/>   
   <br/>   
   <br/>
   <br/>
   <fieldset>
    <input type='radio' id='CompeteActituListaIndispensable' name='CompeteActituLista' value='Grado Indispensable' className='CompeteActituListaIndispensable'/>
    <label for='CompeteActituListaIndispensable' style={{'margin':'0 0 0 8px'}}>Grado Indispensable</label>
    <br/>
    <input type='radio' id='CompeteActituListaDeseable' name='CompeteActituLista' value='Deseable' className='CompeteActituListaDeseable'/>
    <label for='CompeteActituListaDeseable' style={{'margin':'0 0 0 8px'}}>Deseable</label>   
   </fieldset>
   <table className='CompeteActituListaTable'>
    <thead className='CompeteActituListaHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='CompeteActituListaBody'></tbody>
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