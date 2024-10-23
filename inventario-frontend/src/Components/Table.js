import './Table.css';
// import '../styles.css'
import {useState, useEffect, useRef} from 'react';
import Anexos from './Forms/Anexos';
import HistorialCambios from './Forms/HistorialCambios';
import DescripcionProcedimiento from './Forms/DescripcionesProcedimiento';
import Documentos from './Forms/Documentos';
import DocumentosReferencias from './Forms/DocumentosReferencias';
import Puestos from './Forms/Puestos';
import Responsabilidades from './Forms/Responsabilidades';
import Termino from './Forms/Termino';
import SubDescripciones from './Forms/SubDescripciones';
import RevAprobacion from './Forms/RevAprobacion';
import TerminologiasDef from './Forms/TerminologiasDef';
import ConfirmationModal from './ConfirmationModal';

export default function Table(props) {

 let trHead = document.getElementsByClassName('trHead')[0];
 let tBody = document.getElementsByClassName('tBody')[0];
 let recordsMessage = document.getElementsByClassName('recordsMessage')[0];
 var parsedData = ''
 let times = useRef(0)
 var actualRoute = useRef('')
 var lastCounter = useRef(0)
 var updateElementId = useRef(null)
 var callMode = useRef(null);
 var procedRecordActions = useRef(null)
 const [creationForm,setCreationForm] = useState('');
 const [updateForm, setUpdateForm] = useState('');
 const [confirmationModal,setConfirmationModal] = useState(false);  

 useEffect(()=>{
   if(times.current >=1) {lastCounter.current=times.current+2;actualRoute.current=props.setTableName;creationForm.includes('flow')? (()=>{setCreationForm(creationForm.split('_')[0]);times.current=-2})():setCreationForm('');setUpdateForm('')}
  //  if (times.current>2) { setTimeout(()=>{props.setProcedData('')},1000)}
   times.current += 1 
 })

 function parseRoute(props) {
   let route
   if(Object.keys(props.data).includes('data')){return 'procedimiento'}
   if (props.data) {
     !props.data.includes('statusEmpty')? (() =>{ 
       let cleanedData = JSON.parse(props.data)[0]
       route = cleanedData.model.replace('api.','')
      })() : (() => route = props.data[props.data.length-1].route)()
    }
    return route
  }

if(times.current%2===1 && parseRoute(props)==actualRoute.current && parseRoute(props) !== 'procedimiento') { 
  // console.log('----------------->',actualRoute.current,parseRoute(props),times.current)  
  props.data && !props.data.includes('statusEmpty')? (() => { 
  trHead? trHead.innerHTML = '' : void(0);
  tBody? tBody.innerHTML = '' : void(0);
  recordsMessage? recordsMessage.style.display = 'none' : void(0);
  parsedData = JSON.parse(props.data); 
  let thId = document.createElement('th');
  thId.innerHTML = 'ID'
  thId.style.width = '60px'
  thId.style.height = '40px'
  thId.style.display = 'inline-block'  
  thId.style.border = '1px solid rgb(195, 195, 195)'
  thId.style.backgroundColor = 'rgb(212, 208, 208)'
  thId.style.overflow = 'auto'

  trHead.appendChild(thId);

  for(let column of Object.keys(parsedData[0].fields)) {   
    let th = document.createElement('th');
    th.style.width = '290px'
    th.style.height = '40px'
    th.style.display = 'inline-block'         
    th.style.overflow = 'auto'
    th.style.border = '1px solid rgb(195, 195, 195)'
    th.style.backgroundColor = 'rgb(212, 208, 208)'
    let columnText = column.replace('ID','')
    if(columnText==='Alcance' || columnText==='Diagrama_Flujo'){continue}
    th.innerText = columnText;
    trHead.appendChild(th);
  }

  for(let dataObj of parsedData) {
   let tdId = document.createElement('td');
   let tr = document.createElement('tr');
   tdId.innerText = dataObj.pk;
   tdId.style.width = '60px'
   tdId.style.height = '100px'
   tdId.style.display = 'inline-block' 
   tdId.style.border = '1px solid rgb(195, 195, 195)'
   tdId.style.fontSize = '0.9vw'
   tdId.className = 'tdId'
   tdId.setAttribute('name','tdId')
   tr.appendChild(tdId);
   for(let value of Object.entries(dataObj.fields)) {
    if(value.length === 2) {
      let td = document.createElement('td');
      td.style.width = '290px'
      td.style.height = '100px'
      td.style.display = 'inline-block' 
      td.style.overflow = 'auto'  
      td.style.border = '1px solid rgb(195, 195, 195)'
      td.style.fontSize = '0.9vw'
      if(value[0] === 'Alcance' || value[0] === 'Diagrama_Flujo'){continue}else{td.innerText = value[1]}

      tr.appendChild(td);
   }}
   tBody.append(tr);
  }})() : (() => {
  parsedData = props.data;  
  trHead? trHead.innerHTML = '' : void(0)
  tBody? tBody.innerHTML = '' : void(0);
  recordsMessage? recordsMessage.style.display = 'inline-block' : void(0);
  for(let column of parsedData) {
    if (column !== 'statusEmpty' && typeof(column) !== 'object') {
     let th = document.createElement('th');
     th.innerText = column;
     trHead.appendChild(th);
  }}})()}
  else if((times.current%2===1 && parseRoute(props)==actualRoute.current && parseRoute(props) === 'procedimiento') || (times.current == 1 && parseRoute(props) === 'procedimiento')) {
   let data = props.data
   setTimeout(() => {
    let trHead = document.getElementsByClassName('trHead')[0];
    let tBody = document.getElementsByClassName('tBody')[0];
    let tableColumnOrder = ['Codigo','Descripcion','Objetivo','Fecha','Version']
    trHead.innerHTML = ''
    tBody.innerHTML = ''
    for(let columnIndex=0;columnIndex<=data.fields.length-1;columnIndex++) {
     let th = document.createElement('th');
     th.style.width = '290px'
     th.style.height = '40px'
     th.style.display = 'inline-block'         
     th.style.overflow = 'auto'
     th.style.border = '1px solid rgb(195, 195, 195)'
     th.style.fontSize = '1.1vw' 
     th.style.backgroundColor = 'rgb(212, 208, 208)'
     th.innerText=data.fields[columnIndex];
     trHead.appendChild(th)
    }
    
    for(let tdRowData of data.data) {
     let tr = document.createElement('tr') 
     for(let column of tableColumnOrder) {
      let td = document.createElement('td')
      td.innerText = tdRowData[column]
      td.style.width = '290px'
      td.style.height = '100px'
      td.style.display = 'inline-block' 
      td.style.overflow = 'auto'  
      td.style.border = '1px solid rgb(195, 195, 195)'
      td.style.fontSize = '0.9vw'      
      tr.appendChild(td)
     }
     tr.addEventListener('click',e=>{if(e.target.parentElement.children){(handleSearchRecord(e.target.parentElement.children[0].innerText))}})
     tBody.appendChild(tr)
     recordsMessage.style.display = 'none'
    }
   },100)}
  
  function handleSearchRecord(procedCode=undefined) {
   let codeToSearch = document.getElementsByClassName('searchCodeBar')[0].value || procedCode
   let notFoundMessage=document.getElementsByClassName('notFoundMessage')[0];
   if(!codeToSearch){
    notFoundMessage.style.transform='scale(1)';
    setTimeout(()=>{notFoundMessage.style.transform='scale(0)'},5000);
    return
   }
   if(!procedRecordActions.current){
    fetch('http://localhost:8000/procedimiento/',{
      'method':'POST',
      'headers':{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'fillForm','procedCodigo':codeToSearch})
     })
     .then(res=>res.json())
     .then((res)=>{
      if(res.length===0){notFoundMessage.style.transform='scale(1)';setTimeout(()=>{notFoundMessage.style.transform='scale(0)'},4000)}
      else {props.setProcedData({specificProced:codeToSearch,...res})}
     })
   }else if(procedRecordActions.current=='DELETE_RECORD'){
    fetch('http://localhost:8000/procedimiento/',{
      'method':'POST',
      'headers':{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'deleteRecord','procedCodigo':codeToSearch})
     })
     .then(res=>res.json())
     .then((res)=>{
      if(res.length===0){notFoundMessage.style.transform='scale(1)';setTimeout(()=>{notFoundMessage.style.transform='scale(0)'},4000)}
      else {setConfirmationModal(true)}
      procedRecordActions.current = undefined
     })}
  }

 return (
  <>
   <h3 className='tableTitle'>{parseRoute(props)}</h3>
   {parseRoute(props)==='procedimiento' && <input className='searchCodeBar' placeholder='Buscar por còdigo'/>}
   {parseRoute(props)==='procedimiento' && <input type='submit' className='searchCodeButton' value='Buscar' onClick={()=>{handleSearchRecord()}}/>}
   <br/>
   {parseRoute(props)==='procedimiento' && <h5 className='notFoundMessage'>No se encontrò ningùn registro con el còdigo especificado</h5>}
   <table className = "table">
     <thead className='tHead'>
       <tr className='trHead'>
       </tr>   
     </thead>
     <tbody className = 'tBody'>
     </tbody>
   </table>

   <p className = 'recordsMessage'>No hay registros para mostrar</p>
    {(updateForm==='descripcionesprocedimiento' && <DescripcionProcedimiento route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) || 
    // (updateForm==='procedimiento' && <Proced updateElementId={updateElementId} callMode={callMode}/>) ||
    (updateForm==='documentosreferencias' && <DocumentosReferencias route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) ||
    (updateForm==='documentos' && <Documentos route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) ||
    (updateForm==='responsabilidades' && <Responsabilidades route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) ||
    (updateForm==='puestos' && <Puestos route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) ||
    (updateForm==='terminologiasdef' && <TerminologiasDef route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) ||
    (updateForm==='termino' && <Termino route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) || 
    (updateForm==='subdescripciones' && <SubDescripciones route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) ||    
    (updateForm==='anexos' && <Anexos route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) || 
    (updateForm==='revaprobacion' && <RevAprobacion route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>) ||
    (updateForm==='historialcambios' && <HistorialCambios route={parseRoute(props)} updateElementId={updateElementId} callMode={callMode}/>)}
  
   <button className = 'addRecordButton' onClick = {()=>{setCreationForm(parseRoute(props));setUpdateForm('');times.current=0;if(parseRoute(props)==='procedimiento'){props.setProcedData('CREATE')}}}>Agregar</button>
   {parseRoute(props)==='procedimiento' && <button className = 'addRecordButton' style={{'margin':'0 10px 0 10px'}} onClick={()=>{
    let codeBar = document.getElementsByClassName('searchCodeBar')[0]
    codeBar.value = ''
    procedRecordActions.current=undefined;
    codeBar.placeholder='Còdigo de registro';    
    codeBar.focus()}}>Modificar</button>}
   <br/>
   {parseRoute(props)==='procedimiento' && <button className = 'addRecordButton' style={{'margin':'10px 0 0 0'}} onClick={(e)=>{if(parseRoute(props)==='procedimiento'){
    let codeBar = document.getElementsByClassName('searchCodeBar')[0]
    codeBar.value = ''
    procedRecordActions.current='DELETE_RECORD';
    codeBar.placeholder='Còdigo de registro a eliminar';
    codeBar.focus()}}}>Eliminar</button>}

    <button className = 'addRecordButton' style={{'margin':'10px 0 0 9px'}} onClick={()=>{}}>Imprimir</button>

   {
  //  (creationForm==='procedimiento' && <Proced setTableName={props.setTableName} setCreationForm={setCreationForm}/>) || 
   (creationForm==='documentosreferencias' && <DocumentosReferencias route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='documentos' && <Documentos route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='responsabilidades' && <Responsabilidades route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='puestos' && <Puestos route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='terminologiasdef' && <TerminologiasDef route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='termino' && <Termino route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='descripcionesprocedimiento' && <DescripcionProcedimiento route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='subdescripciones' && <SubDescripciones route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='anexos' && <Anexos route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='revaprobacion' && <RevAprobacion route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
   (creationForm==='historialcambios' && <HistorialCambios route={parseRoute(props)} setCreationForm={setCreationForm}/>)}
   {confirmationModal && <ConfirmationModal setConfirmationModal={setConfirmationModal} message={'Datos eliminados correctamente'} 
     icon={<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
     </svg> } reload={'true'}/>}  
  </>  
  )
}