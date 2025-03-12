import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function IndicadoresProceso (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [indicadorProcesoGestionFile, setIndicadorProcesoGestionFile] = useState(false);
 const [indicadorProcesoGestionFileType, setIndicadorProcesoGestionFileType] = useState(false);
 const [indicadorProcesoGestionArchive, setIndicadorProcesoGestionArchive] = useState(false);
 
 const [indicadorProcesoGestionRiesgoFile, setIndicadorProcesoGestionRiesgoFile] = useState(false);
 const [indicadorProcesoGestionRiesgoFileType, setIndicadorProcesoGestionRiesgoFileType] = useState(false);
 const [indicadorProcesoGestionRiesgoArchive, setIndicadorProcesoGestionRiesgoArchive] = useState(false);

 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['ObjetivoEspecificoManualLista']) {
    //  let tHead = document.getElementsByClassName('ObjetivosUnidadNegocioHead')[0]
    //  let tBody = document.getElementsByClassName('ObjetivosUnidadNegocioBody')[0]
    //  for(let records of props.formsData.current['specificData']['ObjetivoEspecificoManualLista']) {
    //   let columnSchema = ['Descripción']
    //   let trBody = document.createElement('tr')
    //   trBody.className = 'ObjetivosUnidadNegocioTr'
    //   if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
    //   for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
    //   trBody.value=records['ID']
    //   trBody.style.backgroundColor = 'white'
    //   trBody.style.fontWeight = '400'
    //   trBody.addEventListener('click',(e)=>{
    //   if(e.target.parentElement.value){
    //    selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    //   }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    //   let trList = document.getElementsByClassName('ObjetivosUnidadNegocioTr') 
    //   for (let tr of trList){if(tr!=e.target.parentElement){
    //    setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
    //   })      
    //   tBody.appendChild(trBody)
    //  } 
    let manualCode = props.formsData.current['specificData']? props.formsData.current['specificData']['Manual']['ID']:''
    let IndicadoresProceso_GestionRiesgoDescrihtmlElem = document.getElementsByClassName('IndicadoresProceso_GestionRiesgoDescri')[0] 
    IndicadoresProceso_GestionRiesgoDescrihtmlElem.innerText = props.formsData.current['specificData']['Manual']['IndicadorProcesoGestionRiesgoDescri']  
    setTimeout(()=>{
      fetch(`http://${window.location.hostname}:8000/manual/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'request_IndicadorProcesoGestionRiesgoFile','manualCode':manualCode})
      })
      .then((res)=>{setIndicadorProcesoGestionRiesgoFileType(res.headers.get('Content-Type'));return res.blob()})
      .then((res)=>{if(res.type!='text/html'){setIndicadorProcesoGestionRiesgoFile(URL.createObjectURL(res))}})        
    },500)

    setTimeout(()=>{
      fetch(`http://${window.location.hostname}:8000/manual/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'request_IndicadorProcesoGestionFile','manualCode':manualCode})
      })
      .then((res)=>{setIndicadorProcesoGestionFileType(res.headers.get('Content-Type'));return res.blob()})
      .then((res)=>{if(res.type!='text/html'){setIndicadorProcesoGestionFile(URL.createObjectURL(res))}})        
    },600)
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
    if(props.fullManualData && props.backenData.current['Manual']['CodigoManual']) { 
     let GestionRiesgoDescri = document.getElementsByClassName('IndicadoresProceso_GestionRiesgoDescri')[0]    
     if(GestionRiesgoDescri.value){props.backenData.current['Manual']['IndicadorProcesoGestionRiesgoDescri']=GestionRiesgoDescri.value}
     console.log('----->>',props.backenData.current)
     fetch(`http://${window.location.hostname}:8000/manual/`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'saveManualRecord','payload':props.backenData.current})
     })
     .then(re=>re.json())
     .then(re=>{if(re.msg=='ok'){
       props.setConfirmationModal(true) 
       setTimeout(()=>{
        props.setConfirmationModal(false)
        props.refreshDataTable(true)
       },3000)}})
     setTimeout(()=>{handleImageSave(indicadorProcesoGestionRiesgoArchive,'save_IndicadorProcesoGestionRiesgoFile')},500)
     setTimeout(()=>{handleImageSave(indicadorProcesoGestionArchive,'save_indicadorProcesoGestionFile')},600)
    }}),[props.fullManualData])

    const handleImageUpload = (event,setImage,setArchive) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl)
        setArchive(file)
        }}    
     const handleImageClick = (link) => {if (link) {window.open(link, '_blank')}}
   
 return (
  <div className="Secciòn_IndicadoresProceso">
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>15.Indicadores del Proceso</h2>
   <h5 style={{'fontWeight':'900','margin':'0 0 10px 0'}}>15.1. De Gestión</h5>
   {/* <h5 className='responsTitle'>Descripción general:</h5>
   <textarea className='MapaProceso_DescripcionGeneral' placeholder='Descripción'></textarea>    */}
   <h5 className='responsTitle'>Archivo:</h5>
   <input type="file" onChange={(e)=>{handleImageUpload(e,setIndicadorProcesoGestionFile,setIndicadorProcesoGestionArchive)}} className='sameLineInput'/>
   {indicadorProcesoGestionFile && indicadorProcesoGestionFileType === 'application/pdf'? (<embed src={indicadorProcesoGestionFile} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={()=>{handleImageClick(setIndicadorProcesoGestionFile)}}/>):(
        indicadorProcesoGestionFile && (<img
            src={indicadorProcesoGestionFile}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={()=>{handleImageClick(indicadorProcesoGestionFile)}}
        />) )}
   <br/>
   <br/>         
   <h5 style={{'fontWeight':'900','margin':'0 0 10px 0'}}>15.2. Gestión de riesgos</h5>
   <h5 className='responsTitle'>Descripción general:</h5>
   <textarea className='IndicadoresProceso_GestionRiesgoDescri' placeholder='Descripción'></textarea>   
   <h5 className='responsTitle'>Archivo:</h5>
   <input type="file" onChange={(e)=>{handleImageUpload(e,setIndicadorProcesoGestionRiesgoFile,setIndicadorProcesoGestionRiesgoArchive)}} className='sameLineInput'/>
   {indicadorProcesoGestionRiesgoFile && indicadorProcesoGestionRiesgoFileType === 'application/pdf'? (<embed src={indicadorProcesoGestionRiesgoFile} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={()=>{handleImageClick(indicadorProcesoGestionRiesgoFile)}}/>):(
        indicadorProcesoGestionRiesgoFile && (<img
            src={indicadorProcesoGestionRiesgoFile}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={()=>{handleImageClick(indicadorProcesoGestionRiesgoFile)}}
        />) )}     
   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}