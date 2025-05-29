import '../Forms.css'
import {useState,useRef,useEffect} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
import InstructivoObjetivo from './InstructivoObjetivo';
import InstructivoInstrucciones from './InstructivoInstrucciones';
import InstructivoAnexo from './InstructivoAnexo';

import RevAprobacion from '../RevAprobacion';
import HistorialCambios from '../HistorialCambios';

export default function InstructivoMainCont (props) {
  const [confirmationModal,setConfirmationModal] = useState(false);  
  const [fullInstructivoData,setFullInstructivoData] = useState(false);
  var [refreshDataTable,setrefreshDataTable] = useState(false);
  var formsData = useRef(false);
  var backenData = useRef({'Instructivo':{},'InstructivoInstrucciones':[],'InstructivoAnexo':[],'recordsToDelete':[]});
  var summaryData = useRef({'Instructivo':{},'InstructivoInstrucciones':[],'InstructivoAnexo':[],'recordsToDelete':{}});
  backenData.current = props.callMode && props.callMode.current == 'update'? {'CodigoInstructivo':props.updateElementId.current,...backenData.current}:backenData.current
  fetch(`http://${window.location.hostname}:9000/instructivo/`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:props.updateElementId? JSON.stringify({'mode':'fillForm','CodigoInstructivo':props.updateElementId.current}):JSON.stringify({'mode':'fillForm'})
   })
   .then(re=>re.json())
   .then(re=>{formsData.current = re['payload']})
  useEffect(()=>{
    if(refreshDataTable){
     props.setTableName('')
     setTimeout(()=>{        
      props.setTableName('instructivo')
      props.updateElementId? props.setUpdateForm(false):props.setCreationForm(false)
      setrefreshDataTable(false)
    },500)    
    setFullInstructivoData(false)
    formsData.current = false
  }},[refreshDataTable])
//   InstructivoInstrucciones
  return (
   <div className='DescripPuestoMainCont'>
    <div className='DescripPuestoInnerCont'>
     <InstructivoObjetivo formsData={formsData} backenData={backenData} summaryData={summaryData} fullInstructivoData={fullInstructivoData} setFullInstructivoData={setFullInstructivoData}/>
     <InstructivoInstrucciones formsData={formsData} backenData={backenData} summaryData={summaryData}/>     
     <InstructivoAnexo formsData={formsData} backenData={backenData} summaryData={summaryData} fullInstructivoData={fullInstructivoData} setFullInstructivoData={setFullInstructivoData} setConfirmationModal={setConfirmationModal} refreshDataTable={setrefreshDataTable}/>     
     
     <RevAprobacion senData={fullInstructivoData} procedData={formsData} backenData={backenData} summaryData={summaryData} sectionNumber={'5'} inputWidth={'15'}/>
     <HistorialCambios senData={fullInstructivoData} procedData={formsData} backenData={backenData} summaryData={summaryData} setConfirmationModal={setConfirmationModal} sectionNumber={'6'} inputWidth={'15'}/>
     <button className='saveProcButton saveProcedureButton' onClick={e=>{e.preventDefault();setFullInstructivoData(true)}}>Guardar datos</button>
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