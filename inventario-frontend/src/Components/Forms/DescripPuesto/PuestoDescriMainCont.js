import '../Forms.css'
import {useState,useRef,useEffect} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
import Identificacion from './Identificacion';
import FuncionesDelPuesto from './FuncionesDelPuesto';
import ActividadesPeriDelPuesto from './ActividadesPeriDelPuesto';
import RelacionesInternas from './RelacionesInternas';
import RelacionesExternas from './RelacionesExternas';
import ResponRecYMateriales from './ResponRecYMateriales';
import DecisionesSinAprobacion from './DecisionesSinAprobacion';
import GradoAutoridadDecisiones from './GradoAutoridadDecisiones';
import FormacionAcademica from './FormacionAcademica';
import HabilidadComputacion from './HabilidadComputacion';
import ExperienciaIdeal from './ExperienciaIdeal';
import CompeteActituLista from './CompeteActituLista';
import CompeteTecniIndisLista from './CompeteTecniIndisLista';
import CondicionesFisicas from './CondicionesFisicas';
import Riesgos from './Riesgos';
import RevAprobacion from '../RevAprobacion';
import HistorialCambios from '../HistorialCambios';

export default function PuestoDescriMainCont (props) {
  const [confirmationModal,setConfirmationModal] = useState(false);  
  const [fullPuestoDescriData,setFullPuestoDescriData] = useState(false);   
  var refreshDataTable = useRef(false);
  var formsData = useRef(false);
  var formMainCont = useRef(false);
  var backenData = useRef({'DescripcionPuesto':{},'FuncionesPuesto':[],'ActividadesPeriodicasPuesto':[],'RelacionesInternas':[],'RelacionesExternas':[],'ResponRecurYMateriales':[],'DecisionesSinAprobacion':[],'GradoAutoridadDecisiones':[],'FormacionAcademica':[],'Idiomas':[],'IdiomasHabilidades':[],'Computacion':[],'ExperienciaIdeal':[],'CompeteActituLista':[],'CompeteTecniIndisLista':[],'CondicionesFisicas':[],'Riesgos':[],'RevAprobacion':[{'empty':false}],'HistorialCambios':[],'recordsToDelete':[]});
  var summaryData = useRef({'DescripcionPuesto':{},'FuncionesPuesto':[],'ActividadesPeriodicasPuesto':[],'RelacionesInternas':[],'RelacionesExternas':[],'ResponRecurYMateriales':[],'DecisionesSinAprobacion':[],'GradoAutoridadDecisiones':[],'FormacionAcademica':[],'Idiomas':[],'IdiomasHabilidades':[],'Computacion':[],'ExperienciaIdeal':[],'CompeteActituLista':[],'CompeteTecniIndisLista':[],'CondicionesFisicas':[],'Riesgos':[],'RevAprobacion':[{'empty':false}],'HistorialCambios':[],'recordsToDelete':{}});
  // if(props.procedData && props.procedData.specificProced){backenData.current={'specificProced':props.procedData.specificProced,...backenData.current}}
  backenData.current = props.callMode && props.callMode.current == 'update'? {'puestoDescriCode':props.updateElementId.current,...backenData.current}:backenData.current
  formMainCont.current = props.callMode && props.callMode.current == 'update'? props.setUpdateForm:props.setCreationForm
  fetch(`http://${window.location.hostname}:8000/puestodescripcion/`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:props.updateElementId? JSON.stringify({'mode':'fillForm','puestoDescriCode':props.updateElementId.current}):JSON.stringify({'mode':'fillForm'})
   })
   .then(re=>re.json())
   .then(re=>{formsData.current = re['payload']})
  useEffect(()=>{if(refreshDataTable.current){
     props.setTableName('')
     setTimeout(()=>{        
      props.setTableName('puestodescripcion')
      props.updateElementId? props.setUpdateForm(false):props.setCreationForm(false)
      refreshDataTable.current = false
    },500) }},[refreshDataTable.current])
  return (
   <div className='DescripPuestoMainCont'>
    <div className='DescripPuestoInnerCont'>
     <Identificacion formsData={formsData} backenData={backenData} summaryData={summaryData} fullPuestoDescriData={fullPuestoDescriData} updateElementId={props.updateElementId} setFullPuestoDescriData={setFullPuestoDescriData}/>
     <FuncionesDelPuesto formsData={formsData} backenData={backenData} summaryData={summaryData} fullPuestoDescriData={fullPuestoDescriData}/>
     <ActividadesPeriDelPuesto formsData={formsData} backenData={backenData} summaryData={summaryData} fullPuestoDescriData={fullPuestoDescriData}/>
     <RelacionesInternas formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <RelacionesExternas formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <ResponRecYMateriales formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <DecisionesSinAprobacion formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <GradoAutoridadDecisiones formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <FormacionAcademica formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <HabilidadComputacion formsData={formsData} backenData={backenData} summaryData={summaryData}/>     
     <ExperienciaIdeal formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <CompeteActituLista formsData={formsData} backenData={backenData} summaryData={summaryData} fullPuestoDescriData={fullPuestoDescriData}/>
     <CompeteTecniIndisLista formsData={formsData} backenData={backenData} summaryData={summaryData} fullPuestoDescriData={fullPuestoDescriData} setConfirmationModal={setConfirmationModal} formMainCont={formMainCont.current} refreshDataTable={refreshDataTable}/>
     <CondicionesFisicas formsData={formsData} backenData={backenData} summaryData={summaryData}/>
     <RevAprobacion senData={fullPuestoDescriData} procedData={formsData} backenData={backenData} summaryData={summaryData} sectionNumber={'11'}/>
     <HistorialCambios senData={fullPuestoDescriData} procedData={formsData} backenData={backenData} summaryData={summaryData} setConfirmationModal={setConfirmationModal} sectionNumber={'12'}/>      
     <button className='saveProcButton saveProcedureButton' onClick={e=>{e.preventDefault();setFullPuestoDescriData(true)}}>Guardar datos</button>
     <button className='saveProcButton closeProcedureButton' onClick={e=>{
       props.callMode && props.callMode.current == 'update'? props.setUpdateForm(false):props.setCreationForm(false)
       }} style={{'display':'block','margin':'3% 0 0 0'}}>Cerrar</button>
      {/* {props.procedData && props.procedData.specificProced && <a className = 'saveProcButton printProcedureButton' style={{'display':'block','margin':'6% 0 0 0'}} onClick={e=>{
      fetch(`http://${window.location.hostname}:8000/procedimiento/`,{
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