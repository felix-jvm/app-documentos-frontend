import '../Forms.css'
import {useState,useRef,useEffect} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
import ObjetivoPolitica from './ObjetivoPolitica.js';
import ResponsabilidadesPolitica from './ResponsabilidadesPolitica.js';
import TerminologiaDefinicionesPolitica from './TerminologiaDefinicionesPolitica';
import PoliticaClasificacion from './PoliticaClasificacion';
import PrecioCompra from './PrecioCompra.js';
import HorarioRecibo from './HorarioRecibo';
import Proveedores from './Proveedores';
import Pago from './Pago';
import AnexosPolitica from './AnexosPolitica.js';

import RevAprobacion from '../RevAprobacion';
import HistorialCambios from '../HistorialCambios';

export default function PoliticaMainCont (props) {
  const [confirmationModal,setConfirmationModal] = useState(false);  
  const [fullPoliticaData,setFullPoliticaData] = useState(false);
  var [refreshDataTable,setrefreshDataTable] = useState(false);
  var formsData = useRef(false);
  var backenData = useRef({'Politica':{},'DocumentosReferenciasPolitica':[],'ResponsabilidadesPolitica':[],'TerminologiasPolitica':[],'ClasificacionTipoMaterialPolitica':[],'BoundProcedimientosPolitica':[],'AnexoPolitica':[],'recordsToDelete':[]});
  var summaryData = useRef({'Politica':{},'DocumentosReferenciasPolitica':[],'ResponsabilidadesPolitica':[],'TerminologiasPolitica':[],'ClasificacionTipoMaterialPolitica':[],'BoundProcedimientosPolitica':[],'AnexoPolitica':[],'recordsToDelete':{}});
  backenData.current = props.callMode && props.callMode.current == 'update'? {'CodigoPolitica':props.updateElementId.current,...backenData.current}:backenData.current
  fetch(`http://${window.location.hostname}:9000/politica/`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:props.updateElementId? JSON.stringify({'mode':'fillForm','CodigoPolitica':props.updateElementId.current}):JSON.stringify({'mode':'fillForm'})
   })
   .then(re=>re.json())
   .then(re=>formsData.current = re['payload'])
  useEffect(()=>{
    if(refreshDataTable){
     props.setTableName('')
     setTimeout(()=>{        
      props.setTableName('politica')
      props.updateElementId? props.setUpdateForm(false):props.setCreationForm(false)
      setrefreshDataTable(false)
    },500)    
    setFullPoliticaData(false)
    formsData.current = false
  }},[refreshDataTable])

  return (
   <div className='DescripPuestoMainCont'>
    <div className='DescripPuestoInnerCont'>

     {/* <BoundProcedimiento formsData={formsData} backenData={backenData} summaryData={summaryData}/>     
     <RendicionCuenta formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData}/>
     <IndicadoresProceso formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData} setConfirmationModal={setConfirmationModal} refreshDataTable={setrefreshDataTable} fileFormData={fileFormData}/> */}
     <ObjetivoPolitica formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData} setFullPoliticaData={setFullPoliticaData}/>
     <ResponsabilidadesPolitica formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <TerminologiaDefinicionesPolitica formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <PoliticaClasificacion formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData}/>
     <PrecioCompra formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData}/>
     <HorarioRecibo formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData}/>
     <Proveedores formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData}/>
     <Pago formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData}/>
     <AnexosPolitica formsData={formsData} backenData={backenData} summaryData={summaryData} fullPoliticaData={fullPoliticaData} setConfirmationModal={setConfirmationModal} refreshDataTable={setrefreshDataTable}/>

     <RevAprobacion senData={fullPoliticaData} procedData={formsData} backenData={backenData} summaryData={summaryData} sectionNumber={'12'} inputWidth={'15'}/>
     <HistorialCambios senData={fullPoliticaData} procedData={formsData} backenData={backenData} summaryData={summaryData} setConfirmationModal={setConfirmationModal} sectionNumber={'13'} inputWidth={'15'}/>
     <button className='saveProcButton saveProcedureButton' onClick={e=>{e.preventDefault();setFullPoliticaData(true)}}>Guardar datos</button>
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