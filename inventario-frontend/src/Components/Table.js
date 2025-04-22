import './Table.css';
// import '../styles.css'
import {useState, useEffect, useRef} from 'react';
// import Anexos from './Forms/Anexos';
// import HistorialCambios from './Forms/HistorialCambios';
// import DescripcionProcedimiento from './Forms/DescripcionesProcedimiento';
import Documentos from './Forms/Documentos';
// import DocumentosReferencias from './Forms/DocumentosReferencias';
import Puestos from './Forms/Puestos';
// import Responsabilidades from './Forms/Responsabilidades';
import Termino from './Forms/Termino';
// import SubDescripciones from './Forms/SubDescripciones';
// import RevAprobacion from './Forms/RevAprobacion';
// import TerminologiasDef from './Forms/TerminologiasDef';
import ConfirmationModal from './ConfirmationModal';
import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-dt';
import PuestoDescriMainCont from './Forms/DescripPuesto/PuestoDescriMainCont';
import ManualMainCont from './Forms/Manual/ManualMainCont';
import PoliticaMainCont from './Forms/Politica/PoliticaMainCont';

DataTable.use(DT);
export default function Table(props) {
//  let trHead = document.getElementsByClassName('trHead')[0];
//  let tBody = document.getElementsByClassName('tBody')[0];
//  let recordsMessage = document.getElementsByClassName('recordsMessage')[0];
//  var parsedData = ''
//  var actualRoute = useRef('')
//  var lastCounter = useRef(0)
 var updateElementId = useRef(null)
 var callMode = useRef(null)
let times = useRef(0)
 var procedRecordActions = useRef(null)
 var codeToSearchLength = useRef(null)
 const [creationForm,setCreationForm] = useState('');
 const [updateForm, setUpdateForm] = useState('');
 const [confirmationModal,setConfirmationModal] = useState(false);  
 var confirmationModalMessage = useRef('');
 var tableTitle = useRef(parseRoute(props));
 var lastSelectedRecord = useRef(undefined);
//  useEffect(()=>{
//    if(times.current >=1) {lastCounter.current=times.current+2;actualRoute.current=props.tableName;creationForm.includes('flow')? (()=>{setCreationForm(creationForm.split('_')[0]);times.current=-2})():setCreationForm('');setUpdateForm('')}
//    times.current += 1 
//  })

 function parseRoute(props) {
  //  let route
  //  if(Object.keys(props.data).includes('data')){return 'procedimiento'}
  //  if (props.data) {
  //    !props.data.includes('statusEmpty')? (() =>{ 
  //      let cleanedData = JSON.parse(props.data)[0]
  //      route = cleanedData.model.replace('api.','')
  //     })() : (() => route = props.data[props.data.length-1].route)()
  //   }
  //   return route
  return props.tableName
 }
  setTimeout(()=>{
    tableTitle.current=parseRoute(props)
    if(tableTitle.current){
     tableTitle.current=String(tableTitle.current).charAt(0).toUpperCase() + String(tableTitle.current).slice(1)
     let tableTitleElement = document.getElementsByClassName('tableTitle')[0]
     tableTitle.current = tableTitle.current == 'Puestodescripcion'? 'Descripción de Puesto':tableTitle.current
     tableTitleElement.innerText = tableTitle.current
    }       
    if(props.data){refreshDataTableDinamically(props.data)}
  },100)

  function refreshDataTableDinamically (data) {
    let divTable = document.getElementsByClassName('divTable')[0]
    let tableHtml = document.createElement('table')
    divTable.innerHTML = ''
    tableHtml.id = 'table'
    divTable.appendChild(tableHtml)
  
    var table = new DataTable('#table', {
      columns:[...data['columns']], 
      data:data['records'],
      responsive: 'true',
      select: 'single',
    })
    table.on('dblclick', 'tr', function () {
     let rowData = table.row(this).data()
     if(rowData){
      lastSelectedRecord.current=rowData[0]
      handleSearchRecord(rowData[0])
     }}) 
    table.on('click', 'tr', function (e) {
     let rowData = table.row(this).data()
     if(rowData){
      lastSelectedRecord.current=rowData[0]
     }
     let trList = document.getElementsByTagName('tr') 
     for (let tr of trList){if(tr!=e.target.parentElement){
      setTimeout(()=>{tr.style.backgroundColor = 'rgb(241, 241, 241)'},10)} else {e.target.parentElement.style.backgroundColor = 'rgb(208, 207, 207)'} }     
     }) }

// if(times.current%2===1 && parseRoute(props)==actualRoute.current && parseRoute(props) !== 'procedimiento') { 
//   props.data && !props.data.includes('statusEmpty')? (() => { 
//   trHead? trHead.innerHTML = '' : void(0);
//   tBody? tBody.innerHTML = '' : void(0);
//   recordsMessage? recordsMessage.style.display = 'none' : void(0);
//   parsedData = JSON.parse(props.data); 
//   let thId = document.createElement('th');
//   thId.innerHTML = 'ID'
//   thId.style.width = '60px'
//   thId.style.height = '40px'
//   thId.style.display = 'inline-block'  
//   thId.style.border = '1px solid rgb(195, 195, 195)'
//   thId.style.backgroundColor = 'rgb(212, 208, 208)'
//   thId.style.overflow = 'auto'

//   trHead.appendChild(thId);

//   for(let column of Object.keys(parsedData[0].fields)) {   
//     let th = document.createElement('th');
//     th.style.width = '290px'
//     th.style.height = '40px'
//     th.style.display = 'inline-block'         
//     th.style.overflow = 'auto'
//     th.style.border = '1px solid rgb(195, 195, 195)'
//     th.style.backgroundColor = 'rgb(212, 208, 208)'
//     let columnText = column.replace('ID','')
//     if(columnText==='Alcance' || columnText==='Diagrama_Flujo'){continue}
//     th.innerText = columnText;
//     trHead.appendChild(th);
//   }

//   for(let dataObj of parsedData) {
//    let tdId = document.createElement('td');
//    let tr = document.createElement('tr');
//    tdId.innerText = dataObj.pk;
//    tdId.style.width = '60px'
//    tdId.style.height = '100px'
//    tdId.style.display = 'inline-block' 
//    tdId.style.border = '1px solid rgb(195, 195, 195)'
//    tdId.style.fontSize = '0.9vw'
//    tdId.className = 'tdId'
//    tdId.setAttribute('name','tdId')
//    tr.appendChild(tdId);
//    for(let value of Object.entries(dataObj.fields)) {
//     if(value.length === 2) {
//       let td = document.createElement('td');
//       td.style.width = '290px'
//       td.style.height = '100px'
//       td.style.display = 'inline-block' 
//       td.style.overflow = 'auto'  
//       td.style.border = '1px solid rgb(195, 195, 195)'
//       td.style.fontSize = '0.9vw'
//       if(value[0] === 'Alcance' || value[0] === 'Diagrama_Flujo'){continue}else{td.innerText = value[1]}

//       tr.appendChild(td);
//    }}
//    tBody.append(tr);
//   }})() : (() => {
//   parsedData = props.data;  
//   trHead? trHead.innerHTML = '' : void(0)
//   tBody? tBody.innerHTML = '' : void(0);
//   recordsMessage? recordsMessage.style.display = 'inline-block' : void(0);
//   for(let column of parsedData) {
//     if (column !== 'statusEmpty' && typeof(column) !== 'object') {
//      let th = document.createElement('th');
//      th.innerText = column;
//      trHead.appendChild(th);
//   }}})()}
//   else if((times.current%2===1 && parseRoute(props)==actualRoute.current && parseRoute(props) === 'procedimiento') || (times.current == 1 && parseRoute(props) === 'procedimiento')) {
//    let data = props.data
//    setTimeout(() => {
//     let trHead = document.getElementsByClassName('trHead')[0];
//     let tBody = document.getElementsByClassName('tBody')[0];
//     let tableColumnOrder = ['Codigo','Descripcion','Objetivo','Fecha','Version']
//     trHead.innerHTML = ''
//     tBody.innerHTML = ''
//     for(let columnIndex=0;columnIndex<=data.fields.length-1;columnIndex++) {
//      let th = document.createElement('th');
//      th.style.width = '290px'
//      th.style.height = '40px'
//      th.style.display = 'inline-block'         
//      th.style.overflow = 'auto'
//      th.style.border = '1px solid rgb(195, 195, 195)'
//      th.style.fontSize = '1.1vw' 
//      th.style.backgroundColor = 'rgb(212, 208, 208)'
//      th.innerText=data.fields[columnIndex];
//      trHead.appendChild(th)
//     }
    
//     for(let tdRowData of data.data) {
//      let tr = document.createElement('tr') 
//      for(let column of tableColumnOrder) {
//       let td = document.createElement('td')
//       td.innerText = tdRowData[column]
//       td.style.width = '290px'
//       td.style.height = '100px'
//       td.style.display = 'inline-block' 
//       td.style.overflow = 'auto'  
//       td.style.border = '1px solid rgb(195, 195, 195)'
//       td.style.fontSize = '0.9vw'      
//       tr.appendChild(td)
//      }
//      tr.addEventListener('mouseenter',e=>{e.target.parentElement.style.cursor = 'pointer'})
//      tr.addEventListener('click',e=>{
//       e.target.parentElement.style.backgroundColor = 'rgb(212, 208, 208)' 
//       if(e.target.parentElement.children){
//        if(!lastSelectedRecord.current){lastSelectedRecord.current=e.target.parentElement.children[0].innerText}
//        else if(e.target.parentElement.children[0].innerText==lastSelectedRecord.current){handleSearchRecord(e.target.parentElement.children[0].innerText);lastSelectedRecord.current=undefined}
//        else{lastSelectedRecord.current=e.target.parentElement.children[0].innerText}
//       }})    
//      tr.addEventListener('mouseleave',(e)=>{e.target.style.backgroundColor = 'white'})
//      tBody.appendChild(tr)
//      recordsMessage.style.display = 'none'
//     }
//    },100)}
  
  function handleSearchRecord() {
   let codeToSearch = lastSelectedRecord.current
   let notFoundMessage=document.getElementsByClassName('notFoundMessage')[0];
  //  if(!codeToSearch){
  //   notFoundMessage.style.transform='scale(1)';
  //   setTimeout(()=>{notFoundMessage.style.transform='scale(0)'},5000);
  //   return
  //  }
   if(!procedRecordActions.current){
    fetch(`http://${window.location.hostname}:8000/procedimiento/`,{
      'method':'POST',
      'headers':{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'fillForm','procedCodigo':codeToSearch})
     })
     .then(res=>res.json())
     .then((res)=>{
      if(res.length===0) {
       // notFoundMessage.style.transform='scale(1)';setTimeout(()=>{notFoundMessage.style.transform='scale(0)'},4000)
      }
      else {
        // let codeToLook = document.getElementsByClassName('searchCodeBar')[0].value
        let codeToLook = false
        if(codeToLook){props.setTableName(`specificProcedRecord_${codeToLook}`)}else{props.setProcedData({specificProced:codeToSearch,...res})}
      }})}else if(procedRecordActions.current=='DELETE_RECORD'){
      fetch(`http://${window.location.hostname}:8000/procedimiento/`,{
       'method':'POST',
       'headers':{'Content-Type':'application/json'},
       body:JSON.stringify({'mode':'deleteRecord','procedCodigo':codeToSearch})
     })
     .then(res=>res.json())
     .then((res)=>{
      if(res.length===0){notFoundMessage.style.transform='scale(1)';setTimeout(()=>{notFoundMessage.style.transform='scale(0)'},4000)}
      else {confirmationModalMessage.current='Datos eliminados correctamente';setConfirmationModal(true)}
      procedRecordActions.current = undefined
     })}
     if(parseRoute(props)!='procedimiento'){updateElementId.current=lastSelectedRecord.current;callMode.current='update';setUpdateForm(parseRoute(props))}
     codeToSearchLength.current = codeToSearch.length
  }

  function deleteDocumentRecord() {
    let documentCodeToDel = lastSelectedRecord.current
    fetch(`http://${window.location.hostname}:8000/documentos/`,{
     'method':'POST',
     'headers':{'Content-Type':'application/json'},
     body:JSON.stringify({'mode':'deleteRecord','documentCode':documentCodeToDel})
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.status=='ok' && res.message=='procedDependent'){
        confirmationModalMessage.current='El documento seleccionado junto con su correspondiente procedimiento han sido eliminados';setConfirmationModal(true)
      } else if (res.status=='ok' && !res.message){confirmationModalMessage.current='Datos eliminados correctamente';setConfirmationModal(true)} }) 
  }

 return (
  <>
   <h3 className='tableTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}></h3>
   {/* {parseRoute(props)==='procedimiento' && <input className='searchCodeBar' placeholder='Buscar por còdigo' onKeyDown={(e)=>{if(e.target.value.length===0 && codeToSearchLength.current){props.setTableName('');codeToSearchLength.current=0;setTimeout(()=>{props.setTableName('procedimiento')},100)}}}/>}
   {parseRoute(props)==='procedimiento' && <input type='submit' className='searchCodeButton' value='Buscar' onClick={()=>{handleSearchRecord()}}/>}
   <br/>
   {parseRoute(props)==='procedimiento' && <h5 className='notFoundMessage'>No se encontrò ningùn registro con el còdigo especificado</h5>}

   <br/> */}

   <br/>
   <br/>

   <button className = 'addRecordButton' onClick = {()=>{setCreationForm(parseRoute(props));setUpdateForm('');times.current=0;if(parseRoute(props)==='procedimiento'){props.setProcedData('CREATE')}}} style={{'float':'left','margin':'0 10px 5px 0'}}>Agregar</button>
   {parseRoute(props)==='procedimiento' && <button className = 'addRecordButton' style={{'float':'left','margin':'0 10px 5px 0'}} onClick={()=>{
    // let codeBar = document.getElementsByClassName('searchCodeBar')[0]
    // codeBar.value = ''
    // procedRecordActions.current=undefined;
    // handleSearchRecord()  
      }} >Modificar</button>}

   {(parseRoute(props)==='procedimiento' || parseRoute(props)==='documentos') && <button className = 'addRecordButton' style={{'margin':'0 10px 5px 0','float':'left'}} onClick={(e)=>{if(parseRoute(props)==='procedimiento'){
    procedRecordActions.current='DELETE_RECORD';
    handleSearchRecord()
    }else if (parseRoute(props)==='documentos'){deleteDocumentRecord()}}}>Eliminar</button>}

    {parseRoute(props)==='procedimiento' && <a className = 'addRecordButton' style={{'margin':'0 10px 5px 0','float':'left'}} onClick={e=>{
      fetch(`http://${window.location.hostname}:8000/procedimiento/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'fillForm','procedCodigo':lastSelectedRecord.current})
       })
       .then(res=>res.json())
       .then((res)=>{
        let procedId = res.specificData && res.specificData.RevAprobacion? res.specificData.RevAprobacion[res.specificData.RevAprobacion.length-1]:undefined
        if(typeof(procedId)==='number'){e.target.href=`http://${window.location.hostname}:16900/Report/ViewReport/${procedId}`}})
        }} target='_blank'>Imprimir</a>}
<br/>
<br/>
<br/>

    <div className="divTable">    
     <table id="table"></table>     
    </div>

    {creationForm==='documentos' && <Documentos route={parseRoute(props)} setCreationForm={setCreationForm}/> ||
    (creationForm==='puestos' && <Puestos route={parseRoute(props)} setCreationForm={setCreationForm}/>) ||
    (creationForm==='termino' && <Termino route={parseRoute(props)} setCreationForm={setCreationForm}/>) || 
    (creationForm==='puestodescripcion' && <PuestoDescriMainCont route={parseRoute(props)} setCreationForm={setCreationForm} setTableName={props.setTableName}/>) ||
    (creationForm==='manual' && <ManualMainCont route={parseRoute(props)} setCreationForm={setCreationForm} setTableName={props.setTableName}/>) ||
    (creationForm==='politica' && <PoliticaMainCont route={parseRoute(props)} setCreationForm={setCreationForm} setTableName={props.setTableName}/>)}


    {(updateForm==='puestos' && <Puestos route={parseRoute(props)} updateElementId={updateElementId} setUpdateForm={setUpdateForm} callMode={callMode}/>) ||    
    (updateForm==='termino' && <Termino route={parseRoute(props)} updateElementId={updateElementId} setUpdateForm={setUpdateForm} callMode={callMode}/>) ||
    (updateForm==='puestodescripcion' && <PuestoDescriMainCont route={parseRoute(props)} updateElementId={updateElementId} setUpdateForm={setUpdateForm} callMode={callMode} setTableName={props.setTableName}/>) ||
    (updateForm==='manual' && <ManualMainCont route={parseRoute(props)} updateElementId={updateElementId} setUpdateForm={setUpdateForm} callMode={callMode} setTableName={props.setTableName}/>) ||
    (updateForm==='politica' && <PoliticaMainCont route={parseRoute(props)} updateElementId={updateElementId} setUpdateForm={setUpdateForm} callMode={callMode} setTableName={props.setTableName}/>)}
   {/* 

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
  


   {
  //  (creationForm==='procedimiento' && <Proced tableName={props.tableName} setCreationForm={setCreationForm}/>) || 
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
  */}

   {confirmationModal && <ConfirmationModal setConfirmationModal={setConfirmationModal} message={confirmationModalMessage.current} 
     icon={<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
     </svg> } reload={'true'}/>} 
  </>  
  )
}