import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function MapaProceso (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [organigramaEstructuralFile, setOrganigramaEstructuralFile] = useState(false);
 const [organigramaEstructuralFileType, setOrganigramaEstructuralFileType] = useState(false);
 const [organigramaEstructuralArchive, setOrganigramaEstructuralArchive] = useState(false);

 const [organigramaFuncionalFile, setOrganigramaFuncionalFile] = useState(false);
 const [organigramaFuncionalFileType, setOrganigramaFuncionalFileType] = useState(false);
 const [organigramaFuncionalArchive, setOrganigramaFuncionalArchive] = useState(false);

 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['Manual']) {

    let OrganigramaEstructuralFuncional_FuncionalDescri = document.getElementsByClassName('OrganigramaEstructuralFuncional_FuncionalDescri')[0]
    let OrganigramaEstructuralFuncional_EstructuralDescri = document.getElementsByClassName('OrganigramaEstructuralFuncional_EstructuralDescri')[0]
    let manualCode = props.formsData.current['specificData']? props.formsData.current['specificData']['Manual']['ID']:''
    OrganigramaEstructuralFuncional_FuncionalDescri.innerText = props.formsData.current['specificData']['Manual']['OrganigramaFuncionalDescri']
    OrganigramaEstructuralFuncional_EstructuralDescri.innerText = props.formsData.current['specificData']['Manual']['OrganigramaEstructuralDescri']
    setTimeout(()=>{
      fetch(`http://${window.location.hostname}:8000/manual/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'request_organigramaEstructuralFile','manualCode':manualCode})
      })
      .then((res)=>{setOrganigramaEstructuralFileType(res.headers.get('Content-Type'));return res.blob()})
      .then((res)=>{if(res.type!='text/html'){setOrganigramaEstructuralFile(URL.createObjectURL(res))}})        
    },300)

    setTimeout(()=>{
      fetch(`http://${window.location.hostname}:8000/manual/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'request_organigramaFuncionalFile','manualCode':manualCode})
      })
      .then((res)=>{setOrganigramaFuncionalFileType(res.headers.get('Content-Type'));return res.blob()})
      .then((res)=>{if(res.type!='text/html'){setOrganigramaFuncionalFile(URL.createObjectURL(res))}})        
    },400)


 
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
     let FuncionalDescri = document.getElementsByClassName('OrganigramaEstructuralFuncional_FuncionalDescri')[0]
     let EstructuralDescri = document.getElementsByClassName('OrganigramaEstructuralFuncional_EstructuralDescri')[0]         
     if(FuncionalDescri.value){props.backenData.current['Manual']['OrganigramaFuncionalDescri']=FuncionalDescri.value}
     if(EstructuralDescri.value){props.backenData.current['Manual']['OrganigramaEstructuralDescri']=EstructuralDescri.value}
     setTimeout(()=>{handleImageSave(organigramaEstructuralArchive,'save_organigramaEstructuralFile')},300)
     setTimeout(()=>{handleImageSave(organigramaFuncionalArchive,'save_organigramaFuncionalFile')},400)
    }
  }),[props.fullManualData])

  const handleImageUpload = (event,setImage,setArchive) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl)
      setArchive(file)
      }}    
   const handleImageClick = (link) => {if (link) {window.open(link, '_blank')}}

 return (
  <div className="Secciòn_OrganigramaEstructuralFuncional">
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>7. Organigrama estructural</h2>
   <h5 className='responsTitle'>Descripción general:</h5>
   <textarea className='OrganigramaEstructuralFuncional_EstructuralDescri' placeholder='Descripción'></textarea>   
   <h5 className='responsTitle'>Archivo:</h5>
   <input type="file" onChange={(e)=>{handleImageUpload(e,setOrganigramaEstructuralFile,setOrganigramaEstructuralArchive)}} className='sameLineInput'/>

   {organigramaEstructuralFile && organigramaEstructuralFileType === 'application/pdf'? (<embed src={organigramaEstructuralFile} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={()=>{handleImageClick(organigramaEstructuralFile)}}/>):(
        organigramaEstructuralFile && (<img
            src={organigramaEstructuralFile}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={()=>{handleImageClick(organigramaEstructuralFile)}}
   />) )}

   <br/> 
   <br/>         
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>8. Organigrama Funcional</h2>
   <h5 className='responsTitle'>Descripción general:</h5>
   <textarea className='OrganigramaEstructuralFuncional_FuncionalDescri' placeholder='Descripción'></textarea>   
   <h5 className='responsTitle'>Archivo:</h5>
   <input type="file" onChange={(e)=>{handleImageUpload(e,setOrganigramaFuncionalFile,setOrganigramaFuncionalArchive)}} className='sameLineInput'/>

   {organigramaFuncionalFile && organigramaFuncionalFileType === 'application/pdf'? (<embed src={organigramaFuncionalFile} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={()=>{handleImageClick(organigramaFuncionalFile)}}/>):(
        organigramaFuncionalFile && (<img
            src={organigramaFuncionalFile}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={()=>{handleImageClick(organigramaFuncionalFile)}}
   />) )}

   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}