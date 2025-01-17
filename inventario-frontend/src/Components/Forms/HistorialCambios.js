import './Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../ConfirmationModal';
import SummaryModal from '../SummaryModal';

export default function HistorialCambios (props) {
  var selectedTableRecord = useRef(undefined)
  const [modalErrorData,setModalErrorData] = useState(false);
  const [summary,setSummary] = useState(false);

  useEffect(()=>{
   setTimeout(()=>{ 
    if(props.procedData.specificData && props.procedData.specificData['HistorialCambios']) {
      let tHead = document.getElementsByClassName('historialCambioHead')[0]
      let tBody = document.getElementsByClassName('historialCambioBody')[0]
      for(let records of props.procedData.specificData['HistorialCambios']) {
       let columnSchema = ['Fecha','Version','Descripcion']
       let trBody = document.createElement('tr')
       if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
       for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
       trBody.value=records['ID']
       trBody.style.backgroundColor = 'rgb(250, 250, 250)'
       trBody.style.fontWeight = '400'
       trBody.addEventListener('mouseenter',(e)=>{e.target.style.backgroundColor = 'rgb(212, 208, 208)'})
       trBody.addEventListener('mouseleave',(e)=>{e.target.style.backgroundColor = 'rgb(250, 250, 250)'})
       trBody.addEventListener('click',(e)=>{
       if(e.target.parentElement.value){
        selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
       }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
       })        
       tBody.appendChild(trBody)
      } 
     }    
   },100) },[])

  function HandleAdd() {
    let HistorialCambios_DescripcionInput = document.getElementsByClassName('HistorialCambios_DescripcionInput')[0]
    let HistorialCambios_VersionInput = document.getElementsByClassName('HistorialCambios_VersionInput')[0] 
    let HistorialCambios_FechaInput = document.getElementsByClassName('HistorialCambios_FechaInput')[0]  
    
    let historialCambioHead = document.getElementsByClassName('historialCambioHead')[0]    
    let historialCambioBody = document.getElementsByClassName('historialCambioBody')[0]    
    let data = [HistorialCambios_FechaInput,HistorialCambios_VersionInput,HistorialCambios_DescripcionInput]
    let columns = ['Fecha','Versión','Descripción de la creación o modificación del documento']
    var trHead = document.createElement('tr')
    var trBody = document.createElement('tr')
    trBody.style.backgroundColor = 'rgb(250, 250, 250)'
    trBody.style.fontWeight = '400'
    trBody.addEventListener('mouseenter',(e)=>{e.target.style.backgroundColor='rgb(212, 208, 208)'})
    trBody.addEventListener('mouseleave',(e)=>{e.target.style.backgroundColor='rgb(250, 250, 250)'})
    trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
    }) 

    for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
      let td = document.createElement('td')
      let th = document.createElement('th')
      td.innerText = data[dataCounter].value
      th.innerText = columns[dataCounter]
      trBody.appendChild(td)
      trHead.appendChild(th)
    }
    props.backenData.current['HistorialCambios'].push({'Descripcion':HistorialCambios_DescripcionInput.value,'Version':HistorialCambios_VersionInput.value,'Fecha':HistorialCambios_FechaInput.value,'elementHtml':trBody.innerHTML})            
    HistorialCambios_FechaInput.value = ''
    HistorialCambios_VersionInput.value = ''
    HistorialCambios_DescripcionInput.value = ''    
    historialCambioBody.appendChild(trBody)
    !historialCambioHead.children.length?historialCambioHead.appendChild(trHead):void 0
   }   

 useEffect((() => {
  if(props.senData){ 
   if(!props.backenData.current['Procedimiento_AlcanceInput'] || !props.backenData.current['Procedimiento_ObjetivoInput'] || !props.backenData.current['Procedimiento_CodigoSelect']) {
    (!props.backenData.current['Procedimiento_AlcanceInput'] && setModalErrorData(`El campo Alcance de la Secciòn_Procedimiento es requerido.`)) ||
    (!props.backenData.current['Procedimiento_ObjetivoInput'] && setModalErrorData(`El campo Objetivo de la Secciòn_Procedimiento es requerido.`)) ||
    (!props.backenData.current['Procedimiento_CodigoSelect'] && setModalErrorData(`El campo Codigo de la Secciòn_Procedimiento es requerido.`))
    props.setSendData(false)
    props.setConfirmationModal(false)
    return  
    }  
    fetch(`http://${window.location.hostname}:8000/procedimiento/`,{
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

  function handleRecordRemove(){
    if(!selectedTableRecord.current){return}
    if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
     props.backenData.current['recordsToDelete'].push({'HistorialCambios':selectedTableRecord.current['recordToDeleteId']})
    }else{
      if(selectedTableRecord.current['record']){
       for(let counter=0;counter<=props.backenData.current['HistorialCambios'].length-1;counter++){
        let currentRecordToCreate = props.backenData.current['HistorialCambios'][counter]
        if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['HistorialCambios'].splice(counter,1)}
      }}}
    if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
    }
    
 return (
  <>
   <h2 style={{'fontWeight':'900'}}>10. Historial de cambios:</h2>
   <h4 className='historialCambioFechaTitle'>Fecha:</h4>   
   <input type='date' className='HistorialCambios_FechaInput'/>
    <br/>
    <br/>
   <h4 className='historialCambioVersionTitle'>Versión:</h4>   
   <input type='number' className='HistorialCambios_VersionInput' placeholder='Versiòn del cambio' step='.01'/>
   <h4 className='historialCambioDescripcionTitle'>Descripciòn:</h4>   
   <textarea className='HistorialCambios_DescripcionInput' placeholder='Razòn por la que se realizò el cambio'></textarea>
   <br/>
   <input type='submit' className='historialCambioAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/>   

   <table className='RevAprobacionTable' style={{'marginBottom':'10px'}}>
    <thead className='historialCambioHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='historialCambioBody'></tbody>
   </table> 
   {/* <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'-5px 0 3px 130px'}} onClick={()=>{handleRecordRemove()}}/> */}
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
    icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/> </svg>}/>}
    {summary && props.procedData.specificProced && <SummaryModal setSummary={setSummary} summaryData={props.summaryData} backenData={props.backenData} procedData={props.procedData.specificData}/>}
  </>
 )}