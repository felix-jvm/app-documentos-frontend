import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function Identificacion (props) {
 const [modalErrorData, setModalErrorData] = useState(false); 
 const [inlineForm, setInlineForm] = useState(false); 
 const [image, setImage] = useState(false);
 const [archive, setArchive] = useState(false);
 const [OrganigramaFileType, setOrganigramaFileType] = useState(false);
 useEffect(()=>{
  setTimeout(()=>{  
     let toFill = ['Identificacion_CodigoPuesto','Identificacion_TituloPuesto','Identificacion_ReportaA','Identificacion_Departamento']
     for(let elemName of toFill) {
     let htmlElem = document.getElementsByClassName(elemName)[0]
     for(let record of props.formsData.current[elemName]) {
      let optionInnerText = ''
      let option = document.createElement('option')
      let cleanElementClassName = elemName.replace('Identificacion_','')           
      option.value = `{"pk":"${record['ID']}","Descripcion":"${record['Descripcion']}"}`      
      if (elemName == 'Identificacion_CodigoPuesto'){optionInnerText = record.Codigo}
      else if(elemName == 'Identificacion_Departamento'){optionInnerText = `${record.Codigo} - ${record.Descripcion}`}
      else {optionInnerText = record.Descripcion}
      option.innerText = optionInnerText
      props.formsData.current['specificData']? (()=>{
      let backendChoosenIdOpt = props.formsData.current['specificData']['DescripcionPuesto'][0][cleanElementClassName]  
      if(backendChoosenIdOpt==record['ID']){option.selected=true}
      let specificElemToFill = ['Identificacion_Ubicacion','Identificacion_OrganigramaDescri','Identificacion_ObjetivoPuesto','Identificacion_CodigoDepartamento']
      for(let elemName of specificElemToFill) {
       let cleanElementClassName = elemName.replace('Identificacion_','')     
       let htmlElem = document.getElementsByClassName(elemName)[0]
       htmlElem.value = props.formsData.current['specificData']['DescripcionPuesto'][0][cleanElementClassName] } })():void 0      
      htmlElem? htmlElem.appendChild(option):void 0    
      props.formsData.current['specificData'] && props.formsData.current['specificData']['DescripcionPuesto'][0][cleanElementClassName]? void 0:htmlElem.value = ''
     } } 
     if(props.formsData.current['specificData']) {
      fetch(`http://${window.location.hostname}:8000/puestodescripcion/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'request_ficha_tecnica','puestoDescriCode':props.updateElementId.current})
      })    
      .then((res)=>{setOrganigramaFileType(res.headers.get('Content-Type'));return res.blob()})
      .then((res)=>{setImage(URL.createObjectURL(res))})
     } },250) },[])

 useEffect((() => {  
  if(props.fullPuestoDescriData) {
   let Identificacion_CodigoSelect = document.getElementsByClassName('Identificacion_CodigoSelect')[0]
   let Identificacion_TituloSelect = document.getElementsByClassName('Identificacion_TituloSelect')[0]
   let Identificacion_ReportaASelect = document.getElementsByClassName('Identificacion_ReportaASelect')[0]
   let Identificacion_DepartamentoSelect = document.getElementsByClassName('Identificacion_DepartamentoSelect')[0]
   let Identificacion_CodigoDepartamento = document.getElementsByClassName('Identificacion_CodigoDepartamento')[0]
   let Identificacion_Ubicacion = document.getElementsByClassName('Identificacion_Ubicacion')[0]   
   let Identificacion_ObjetivoPuesto = document.getElementsByClassName('Identificacion_ObjetivoPuesto')[0]
   let Identificacion_OrganigramaDescri = document.getElementsByClassName('Identificacion_OrganigramaDescri')[0]
   if(!Identificacion_CodigoSelect.value || !Identificacion_TituloSelect.value || !Identificacion_ReportaASelect.value || !Identificacion_DepartamentoSelect.value) {
     (!Identificacion_CodigoSelect.value && setModalErrorData(`El campo Código de la Sección_Identificación es requerido.`)) ||
     (!Identificacion_TituloSelect.value && setModalErrorData(`El campo Titulo de la Sección_Identificación es requerido.`)) ||
     (!Identificacion_ReportaASelect.value && setModalErrorData(`El campo Reporta a de la Sección_Identificación es requerido.`)) ||
     (!Identificacion_DepartamentoSelect.value && setModalErrorData(`El campo Departamento de la Sección_Identificación es requerido.`))
     props.setFullPuestoDescriData(false)}     
   Identificacion_CodigoSelect.value? props.backenData.current['DescripcionPuesto']['CodigoPuesto'] = JSON.parse(Identificacion_CodigoSelect.value)['pk']:void 0   
   Identificacion_TituloSelect.value? props.backenData.current['DescripcionPuesto']['TituloPuesto'] = JSON.parse(Identificacion_TituloSelect.value)['pk']:void 0
   Identificacion_ReportaASelect.value? props.backenData.current['DescripcionPuesto']['ReportaA'] = JSON.parse(Identificacion_ReportaASelect.value)['pk']:void 0
   Identificacion_DepartamentoSelect.value? props.backenData.current['DescripcionPuesto']['Departamento'] = JSON.parse(Identificacion_DepartamentoSelect.value)['pk']:void 0
   Identificacion_CodigoDepartamento.value? props.backenData.current['DescripcionPuesto']['CodigoDepartamento'] = Identificacion_CodigoDepartamento.value:void 0
   Identificacion_Ubicacion.value? props.backenData.current['DescripcionPuesto']['Ubicacion'] = Identificacion_Ubicacion.value:void 0
   Identificacion_ObjetivoPuesto.value? props.backenData.current['DescripcionPuesto']['ObjetivoPuesto'] = Identificacion_ObjetivoPuesto.value:void 0
   Identificacion_OrganigramaDescri.value? props.backenData.current['DescripcionPuesto']['OrganigramaDescri'] = Identificacion_OrganigramaDescri.value:void 0
   setTimeout(()=>{
      if (archive) {
       let puestoDescriCode = Identificacion_CodigoSelect.value? JSON.parse(Identificacion_CodigoSelect.value)['pk']:''
       const formData = new FormData()
       formData.append('mode','save_ficha_tecnica')
       formData.append('puestoDescriCode',puestoDescriCode)
       formData.append('file',archive)  
       fetch(`http://${window.location.hostname}:8000/puestodescripcion/`,{
          method:'POST',
          body:formData
       })}
   },400) }
}),[props.fullPuestoDescriData])

 function handleDisplayInlineForm(e,route,elemName) {e.preventDefault();setInlineForm(`${route},${elemName}`)}  

 function updateDeparmentCode(e) {
  let identificacion_CodigoDepartamento = document.getElementsByClassName('Identificacion_CodigoDepartamento')[0]
  let selectedOptText = e.target.options[e.target.selectedIndex]
  selectedOptText = selectedOptText? selectedOptText.innerText.slice(0, 3):''
  identificacion_CodigoDepartamento.value = selectedOptText
 }

 const handleImageUpload = (event) => {
   const file = event.target.files[0];
   if (file) {
     const imageUrl = URL.createObjectURL(file);
     setImage(imageUrl)
     setArchive(file)
     }}    
  const handleImageClick = () => {if (image) {window.open(image, '_blank')}}

 return (
  <div className="Sección_Identificacion">
   <h2 style={{'fontWeight':'900'}}>Descripción de puesto</h2>    
   <br/>
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>1. Identificación:</h2>  
   {/* <a className='inlineFormLabel' href='' onClick={(e)=>{handleDisplayInlineForm(e,'puestos','Responsabilidades_IDPuestoSelect')}}>Crear nuevo puesto</a>   */}
   <br/>   
   <h4 className='responsPuestoTitle'>Código del puesto:</h4>
   <br/>
   <select className='Identificacion_CodigoSelect Identificacion_CodigoPuesto' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}></select>
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Título del puesto:</h4>
   <br/>
   <select className='Identificacion_TituloSelect Identificacion_TituloPuesto' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}></select>    
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Reporta a:</h4>
   <br/>
   <select className='Identificacion_ReportaASelect Identificacion_ReportaA' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}></select>       
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Departamento:</h4>
   <br/>
   <select className='Identificacion_DepartamentoSelect Identificacion_Departamento' required={true} style={{'minWidth':'15%','maxWidth':'15%'}} onClick={((e)=>{updateDeparmentCode(e)})}></select>       
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Código del departamento:</h4>     
   <br/>
   <input type='text' className='Identificacion_CodigoDepartamento' placeholder='Código del Departamento' readOnly={true} style={{'minWidth':'15%','maxWidth':'15%'}}/>
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Ubicación:</h4>     
   <br/>
   <input type='text' className='Identificacion_Ubicacion' placeholder='Ubicación' style={{'minWidth':'15%','maxWidth':'15%'}}/>    
   <br/>
   <hr/>
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>2. Objetivo del puesto</h2>
   <textarea className='Identificacion_ObjetivoPuesto' placeholder='Objetivo del puesto'></textarea>
   <br/>   
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>3. Organigrama</h2>
   <textarea className='Identificacion_OrganigramaDescri' placeholder='Descripción del organigrama'></textarea>
   <br/>
   <input type="file" onChange={handleImageUpload} className='sameLineInput'/>
   {image && OrganigramaFileType === 'application/pdf'? (<embed src={image} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={handleImageClick}/>):(
        image && (<img
            src={image}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={handleImageClick}
        />) )}  
   <hr/>
   {/* {inlineForm && ( (inlineForm.split(',')[0]=='puestos' && <InlinePuesto inlineForm={inlineForm} setInlineForm={setInlineForm}/>) )}    */}
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}