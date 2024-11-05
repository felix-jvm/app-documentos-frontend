import './Proced.css';
import Procedimiento from './Procedimiento';
import Responsabilidades from './Responsabilidades';
import TerminologiasDef from './TerminologiasDef';
import DescripcionProcedimiento from './DescripcionesProcedimiento';
import Anexos from './Anexos';
import HistorialCambios from './HistorialCambios';
import RevAprobacion from './RevAprobacion';
import DiagramaFlujo from './DiagramaFlujo';
import ConfirmationModal from '../ConfirmationModal';
import {useState,useRef} from 'react';

export default function Proced (props) {
  const [sendData,setSendData] = useState(false);
  const [confirmationModal,setConfirmationModal] = useState(false);  
  var backenData = useRef({'DocumentosReferencias':[],'Responsabilidades':[],'TerminologiasDef':[],'DescripcionesProcedimiento':[],'SubDescripciones':{},'Diagrama_Flujo':'','Anexos':[],'RevAprobacion':[{'empty':false}],'HistorialCambios':[],'recordsToDelete':[]})
  var summaryData = useRef({'Procedimiento_alcance':'','Procedimiento_objetivo':'','Procedimiento_codigo':'','DocumentosReferencias':{},'Responsabilidades':{},'TerminologiasDef':{},'DescripcionesProcedimiento':{},'SubDescripciones':{},'Diagrama_flujo':'','Anexos':{},'RevAprobacion':{},'recordsToDelete':{}})
  if(props.procedData.specificProced){backenData.current={'specificProced':props.procedData.specificProced,...backenData.current}}
  return (
   <div className='procedInnerCont'>
    <Procedimiento senData={sendData} procedData={props.procedData} backenData={backenData} summaryData={summaryData}/>
    <Responsabilidades senData={sendData} procedData={props.procedData} backenData={backenData} summaryData={summaryData}/>
    <TerminologiasDef senData={sendData} procedData={props.procedData} backenData={backenData} summaryData={summaryData}/>
    <DescripcionProcedimiento senData={sendData} procedData={props.procedData} backenData={backenData} summaryData={summaryData}/>
    <DiagramaFlujo senData={sendData} procedData={props.procedData} backenData={backenData} summaryData={summaryData}/>
    <Anexos senData={sendData} procedData={props.procedData} backenData={backenData} summaryData={summaryData}/>
    <RevAprobacion senData={sendData} procedData={props.procedData} backenData={backenData} summaryData={summaryData}/>
    <HistorialCambios senData={sendData} procedData={props.procedData} backenData={backenData} setConfirmationModal={setConfirmationModal} setSendData={setSendData} summaryData={summaryData}/>
    <button className='saveProcButton' onClick={e=>{setSendData(true);e.preventDefault()}}>Guardar datos</button>
    <button className='saveProcButton' onClick={e=>{window.location.reload()}} style={{'display':'block','margin':'3% 0 0 0'}}>Cerrar</button>
    {props.procedData.specificProced && <a className = 'saveProcButton' style={{'display':'block','margin':'6% 0 0 0'}} onClick={e=>{
      fetch(`http://${window.location.hostname}:8000/procedimiento/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'fillForm','procedCodigo':props.procedData.specificProced})
       })
       .then(res=>res.json())
       .then((res)=>{
        let procedId = res.specificData && res.specificData.RevAprobacion? res.specificData.RevAprobacion[res.specificData.RevAprobacion.length-1]:undefined
        if(typeof(procedId)==='number'){e.target.href=`http://${window.location.hostname}:16900/Report/ViewReport/${procedId}`}})
        }} target='_blank'>Imprimir</a>}
    {confirmationModal && <ConfirmationModal setConfirmationModal={setConfirmationModal} message={'Datos guardados correctamente'} 
    icon={<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
     </svg> } reload={'true'}/>}
   </div>
  )}