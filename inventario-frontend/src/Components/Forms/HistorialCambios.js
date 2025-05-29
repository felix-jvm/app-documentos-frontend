import './Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../ConfirmationModal';
import SummaryModal from '../SummaryModal';

export default function HistorialCambios (props) {
  const [modalErrorData,setModalErrorData] = useState(false);
  const [summary,setSummary] = useState(false);
  let selectedDocumentKey = useRef('');

  useEffect(()=>{
   setTimeout(()=>{
    selectedDocumentKey.current=document.getElementsByClassName(`${props.documentCodeSelectName}`)[0]
    if(props.keyLocation=='select') {
      selectedDocumentKey.current=JSON.parse(selectedDocumentKey.current.value)['pk']
    } else if(props.keyLocation=='option') {
      selectedDocumentKey.current=selectedDocumentKey.current.children[selectedDocumentKey.current.selectedIndex].id
    }
    fetch(`http://${window.location.hostname}:9000/historialcambios/`,{
      'method':'POST',
      'headers':{'Content-Type':'application/json'},
      'body':JSON.stringify({'mode':'requestRecords','documentKey':selectedDocumentKey.current,'formName':props.formName})
     })
    .then(e => e.json())
    .then(data => {
      if(data['payload']) {
        let tHead = document.getElementsByClassName('historialCambioHead')[0]
        let tBody = document.getElementsByClassName('historialCambioBody')[0]
        for(let records of data['payload']) {
         let columnSchema = ['Fecha','Versión','Descripción de la creación o modificación del documento']
         let trBody = document.createElement('tr')
         if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
         for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
         trBody.value=records['ID']
         trBody.style.backgroundColor = 'rgb(250, 250, 250)'
         trBody.style.fontWeight = '400'        
         tBody.appendChild(trBody)
        } } }) },500) },[])

 useEffect((() => {
  if(props.route && props.route == 'procedimiento' && props.senData){ 
   if(!props.backenData.current['Procedimiento_AlcanceInput'] || !props.backenData.current['Procedimiento_ObjetivoInput'] || !props.backenData.current['Procedimiento_CodigoSelect']) {
    (!props.backenData.current['Procedimiento_AlcanceInput'] && setModalErrorData(`El campo Alcance de la Secciòn_Procedimiento es requerido.`)) ||
    (!props.backenData.current['Procedimiento_ObjetivoInput'] && setModalErrorData(`El campo Objetivo de la Secciòn_Procedimiento es requerido.`)) ||
    (!props.backenData.current['Procedimiento_CodigoSelect'] && setModalErrorData(`El campo Codigo de la Secciòn_Procedimiento es requerido.`))
    props.setSendData(false)
    props.setConfirmationModal(false)
    return  
    }  
    fetch(`http://${window.location.hostname}:9000/procedimiento/`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'CREATE',backenData:props.backenData.current})
    })
    .then(res=>res.json())
    .then(res=>res.status === 'ok'? (()=>{      
      props.setConfirmationModal(true);
      setSummary(true);
      props.setSendData(false);
      props.refreshDataTable.current = true
    })():void 0)
  }}),[props.senData])

 return (
  <>
   <h2 style={{'fontWeight':'900'}}>{props.sectionNumber && props.sectionNumber}. Historial de cambios:</h2>
   {/* <h4 className='historialCambioFechaTitle'>Fecha:</h4>
   {props.inputWidth && <input type='date' style={{'minWidth':`${props.inputWidth}%`,'maxWidth':`${props.inputWidth}%`}} className='HistorialCambios_FechaInput'/>}   
   {!props.inputWidth && <input type='date' className='HistorialCambios_FechaInput'/>}
    <br/>
    <br/>
   <h4 className='historialCambioVersionTitle'>Versión:</h4>   
   {props.inputWidth && <input type='number' style={{'minWidth':`${props.inputWidth}%`,'maxWidth':`${props.inputWidth}%`}} className='HistorialCambios_VersionInput' placeholder='Versión del cambio' step='.01'/>}
   {!props.inputWidth && <input type='number' className='HistorialCambios_VersionInput' placeholder='Versión del cambio' step='.01'/>}
   <h4 className='historialCambioDescripcionTitle'>Descripción:</h4>   
   <textarea className='HistorialCambios_DescripcionInput' placeholder='Razón por la que se realizó el cambio'></textarea>
   <br/>
   <input type='submit' className='responsAddButton' value='Agregar' style={{'marginLeft':'0'}}/>    */}

   <table className='RevAprobacionTable' style={{'marginBottom':'10px','border':'0','borderCollapse':'separate'}}>
    <thead className='historialCambioHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}>
      <tr><td>Fecha</td><td>Versión</td><td>Descripción de la creación o modificación del documento</td></tr>
    </thead>
    <tbody className='historialCambioBody'></tbody>
   </table> 
   {/* <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'-5px 0 3px 130px'}} onClick={()=>{handleRecordRemove()}}/> */}
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
    icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/> </svg>}/>}
    {summary && props.procedData.specificProced && <SummaryModal setSummary={setSummary} summaryData={props.summaryData} backenData={props.backenData} procedData={props.procedData.specificData} formName={props.formName} selectedDocumentKey={selectedDocumentKey.current}/>}
  </>
 )}