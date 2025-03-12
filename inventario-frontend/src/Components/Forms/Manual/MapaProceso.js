import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function MapaProceso (props) {
 const [modalErrorData,setModalErrorData] = useState(false);  
 const [mapaProcesoFile, setMapaProcesoFile] = useState(false);
 const [mapaProcesoFileType, setMapaProcesoFileType] = useState(false);
 const [mapaProcesoArchive, setMapaProcesoArchive] = useState(false);
 const [estructuraProcesoFile, setEstructuraProcesoFile] = useState(false);
 const [estructuraProcesoFileType, setEstructuraProcesoFileType] = useState(false);
 const [estructuraProcesoArchive, setEstructuraProcesoArchive] = useState(false);
  
 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['Manual']) {
    let MapaProceso_DescripcionGeneralhtmlElem = document.getElementsByClassName('MapaProceso_DescripcionGeneral')[0]
    let MapaProceso_EstructuraProcesoDescripcionhtmlElem = document.getElementsByClassName('MapaProceso_EstructuraProcesoDescripcion')[0]
    MapaProceso_DescripcionGeneralhtmlElem.innerText = props.formsData.current['specificData']['Manual']['MapaProcesoDescri']
    MapaProceso_EstructuraProcesoDescripcionhtmlElem.innerText = props.formsData.current['specificData']['Manual']['EstructuraProcesoDescri']
    } 
    if(props.formsData.current['specificData']) {
      let manualCode = props.formsData.current['specificData']? props.formsData.current['specificData']['Manual']['ID']:'' 
      setTimeout(()=>{
        fetch(`http://${window.location.hostname}:8000/manual/`,{
          'method':'POST',
          'headers':{'Content-Type':'application/json'},
          body:JSON.stringify({'mode':'request_mapaprocesoFile','manualCode':manualCode})
        })    
        .then((res)=>{setMapaProcesoFileType(res.headers.get('Content-Type'));return res.blob()})
        .then((res)=>{if(res.type!='text/html'){setMapaProcesoFile(URL.createObjectURL(res))}})
      },100)     

      setTimeout(()=>{
        fetch(`http://${window.location.hostname}:8000/manual/`,{
          'method':'POST',
          'headers':{'Content-Type':'application/json'},
          body:JSON.stringify({'mode':'request_estructuraprocesoFile','manualCode':manualCode})
        })
        .then((res)=>{setEstructuraProcesoFileType(res.headers.get('Content-Type'));return res.blob()})
        .then((res)=>{if(res.type!='text/html'){setEstructuraProcesoFile(URL.createObjectURL(res))}})        
      },200)
 } },250)},[])  

  function handleImageSave(archive,mode) {
    setTimeout(()=>{
      if (archive) {
       let manualCode = props.formsData.current['specificData']? props.formsData.current['specificData']['Manual']['ID']:''
       const formData = new FormData()
       formData.append('mode',mode)
       formData.append('manualCode',manualCode)
       formData.append('file',archive)  
       fetch(`http://${window.location.hostname}:8000/manual/`,{
          method:'POST',
          body:formData
       })} },400)    
    }

  useEffect((() => {  
    if(props.fullManualData) {
     let DescripcionGeneral = document.getElementsByClassName('MapaProceso_DescripcionGeneral')[0]
     let EstructuraProcesoDescripcion = document.getElementsByClassName('MapaProceso_EstructuraProcesoDescripcion')[0]         
     if(DescripcionGeneral.value){props.backenData.current['Manual']['MapaProcesoDescri']=DescripcionGeneral.value}
     if(EstructuraProcesoDescripcion.value){props.backenData.current['Manual']['EstructuraProcesoDescri']=EstructuraProcesoDescripcion.value}
     setTimeout(()=>{handleImageSave(mapaProcesoArchive,'save_mapaProcesoFile')},100)
     setTimeout(()=>{handleImageSave(estructuraProcesoArchive,'save_estructuraProcesoFile')},200)
   } }),[props.fullManualData])

  const handleImageUpload = (event,setImage,setArchive) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl)
      setArchive(file)
      }}    
  const handleImageClick = (link) => {if (link) {window.open(link, '_blank')}}
   
 return (
  <div className="Secciòn_MapaProceso">
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>6. Mapa de proceso</h2>
   <h5 className='responsTitle'>Descripción general:</h5>
   <textarea className='MapaProceso_DescripcionGeneral' placeholder='Descripción'></textarea>   
   <h5 className='responsTitle'>Archivo:</h5>
   <input type="file" onChange={(e)=>{handleImageUpload(e,setMapaProcesoFile,setMapaProcesoArchive)}} className='sameLineInput'/>
   {mapaProcesoFile && mapaProcesoFileType === 'application/pdf'? (<embed src={mapaProcesoFile} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={()=>{handleImageClick(mapaProcesoFile)}}/>):(
        mapaProcesoFile && (<img
            src={mapaProcesoFile}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={()=>{handleImageClick(mapaProcesoFile)}}
        />) )}
   <br/> 
   <br/>         
   <h4 className='responsTitle' style={{'fontWeight':'900'}}>Estructura por procesos</h4>
   <h5 className='responsTitle'>Descripción general:</h5>
   <textarea className='MapaProceso_EstructuraProcesoDescripcion' placeholder='Descripción'></textarea>   
   <h5 className='responsTitle'>Archivo:</h5>
   <input type="file" onChange={(e)=>{handleImageUpload(e,setEstructuraProcesoFile,setEstructuraProcesoArchive)}} className='sameLineInput'/>
   {estructuraProcesoFile && estructuraProcesoFileType === 'application/pdf'? (<embed src={estructuraProcesoFile} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={()=>{handleImageClick(estructuraProcesoFile)}}/>):(
        estructuraProcesoFile && (<img
            src={estructuraProcesoFile}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={()=>{handleImageClick(estructuraProcesoFile)}}
        />) )}     
   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}