import '../Forms.css';
import {useState,useRef,useEffect} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
import ObjetivoGeneralManual from './ObjetivoGeneralManual';
import ObjetivoEspecificos from './ObjetivosEspecíficos';
import MarcoLegalRegulatorio from './MarcoLegalRegulatorio';
import ObjetivosUnidadNegocio from './ObjetivosUnidadNegocio';
import MapaProceso from './MapaProceso';
import OrganigramaEstructuralFuncional from './OrganigramaEstructuralFuncional';
import DescripcionesPuesto from './DescripcionesPuesto';
import ClienteInterno from './ClienteInterno';
import ClienteExterno from './ClienteExterno';
import ComunicacionInterna from './ComunicacionInterna';
import ComunicacionExterna from './ComunicacionExterna';
import Presupuesto from './Presupuesto';
import PresupuestoGastoPartida from './PresupuestoGastoPartida.js';
import BoundManuales from './BoundManuales.js';
import BoundProcedimiento from './BoundProcedimiento.js';
import RendicionCuenta from './RendicionCuenta.js';
import IndicadoresProceso from './IndicadoresProceso.js';
import RevAprobacion from '../RevAprobacion';
import HistorialCambios from '../HistorialCambios';

export default function ManualMainCont (props) {
  const [confirmationModal,setConfirmationModal] = useState(false);  
  const [fullManualData,setFullManualData] = useState(false);   
  var [refreshDataTable,setrefreshDataTable] = useState(false);
  var formsData = useRef(false);
  const fileFormData = new FormData();
  var backenData = useRef({'Manual':{},'ObjetivoEspecificoManualLista':[],'MarcoLegal':[],'ObjetivoEspecificoUnidadNegocio':[],'DescripcionPuestoManual':[],'ClienteInterno':[],'ClienteExterno':[],'ComunicacionInterna':[],'ComunicacionExterna':[],'CategorizacionGasto':[],'CategorizacionGastoPartida':[],'BoundManual':[],'BoundProcedimiento':[],'RendicionCuentaLista':[],'RevAprobacion':[{'empty':false}],'HistorialCambios':[],'recordsToDelete':[]});
  var summaryData = useRef({'Manual':{},'ObjetivoEspecificoManualLista':[],'MarcoLegal':[],'ObjetivoEspecificoUnidadNegocio':[],'DescripcionPuestoManual':[],'ClienteInterno':[],'ClienteExterno':[],'ComunicacionInterna':[],'ComunicacionExterna':[],'CategorizacionGasto':[],'CategorizacionGastoPartida':[],'BoundManual':[],'BoundProcedimiento':[],'RendicionCuentaLista':[],'RevAprobacion':[{'empty':false}],'HistorialCambios':[],'recordsToDelete':{}});
  backenData.current = props.callMode && props.callMode.current == 'update'? {'CodigoManual':props.updateElementId.current,...backenData.current}:backenData.current;
  fetch(`http://${window.location.hostname}:9000/manual/`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:props.updateElementId? JSON.stringify({'mode':'fillForm','manualCode':props.updateElementId.current}):JSON.stringify({'mode':'fillForm'})
    // body:props.updateElementId? JSON.stringify({'mode':'fillForm'}):JSON.stringify({'mode':'fillForm'})
   })
   .then(re=>re.json())
   .then(re=>{formsData.current = re['payload']})
  useEffect(()=>{
    if(refreshDataTable){
     props.setTableName('')
     setTimeout(()=>{        
      props.setTableName('manual')
      props.updateElementId? props.setUpdateForm(false):props.setCreationForm(false)
      setrefreshDataTable(false)
    },500)    
    setFullManualData(false)
    formsData.current = false
  }},[refreshDataTable])

  return (
   <div className='DescripPuestoMainCont'>
    <div className='DescripPuestoInnerCont'>
     <ObjetivoGeneralManual formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData} setFullManualData={setFullManualData}/>     
     <ObjetivoEspecificos formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData}/>
     <MarcoLegalRegulatorio formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <ObjetivosUnidadNegocio formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData}/>     
     <MapaProceso formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData} fileFormData={fileFormData}/>     
     <OrganigramaEstructuralFuncional formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData} fileFormData={fileFormData}/>
     <DescripcionesPuesto formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData}/>     
     <ClienteInterno formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <ClienteExterno formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <ComunicacionInterna formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <ComunicacionExterna formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <Presupuesto formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData}/>
     <PresupuestoGastoPartida formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <BoundManuales formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <BoundProcedimiento formsData={formsData} backenData={backenData} summaryData={summaryData}/>     
     <RendicionCuenta formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData}/>
     <IndicadoresProceso formsData={formsData} backenData={backenData} summaryData={summaryData} fullManualData={fullManualData} setConfirmationModal={setConfirmationModal} refreshDataTable={setrefreshDataTable} fileFormData={fileFormData}/>
     {/* <RevAprobacion senData={fullManualData} procedData={formsData} backenData={backenData} summaryData={summaryData} sectionNumber={'16'} inputWidth={'15'}/> */}
     <HistorialCambios senData={fullManualData} procedData={formsData} backenData={backenData} summaryData={summaryData} setConfirmationModal={setConfirmationModal} sectionNumber={'17'} inputWidth={'15'}/>      
     <button className='saveProcButton saveProcedureButton' onClick={e=>{e.preventDefault();setFullManualData(true)}}>Guardar datos</button>
     <button className='saveProcButton closeProcedureButton' onClick={e=>{
       props.callMode && props.callMode.current == 'update'? props.setUpdateForm(false):props.setCreationForm(false)
       }} style={{'display':'block','margin':'3% 0 0 0'}}>Cerrar</button>
      {/* {props.procedData && props.procedData.specificProced && <a className = 'saveProcButton printProcedureButton' style={{'display':'block','margin':'6% 0 0 0'}} onClick={e=>{
      fetch(`http://${window.location.hostname}:9000/procedimiento/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'fillForm','procedCodigo':props.procedData.specificProced})
       })
       .then(res=>res.json())
       .then((res)=>{
        let procedId = res.specificData && res.specificData.RevAprobacion? res.specificData.RevAprobacion[res.specificData.RevAprobacion.length-1]:undefined
        if(typeof(procedId)==='number'){e.target.href=`http://${window.location.hostname}:16900/Report/ViewReport/${procedId}`}})
        }} target='_blank'>Imprimir</a>} */}
      {confirmationModal && <ConfirmationModal setConfirmationModal={setConfirmationModal} refreshDataTable={refreshDataTable} message={'Datos guardados correctamente'} 
       reload={'false'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg> }/>}
    </div>  
   </div>
  )}