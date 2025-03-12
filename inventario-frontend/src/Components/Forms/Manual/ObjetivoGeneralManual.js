import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function ObjetivoGeneralManual (props) {
 const [modalErrorData, setModalErrorData] = useState(false); 
 useEffect(()=>{
  setTimeout(()=>{  
     let toFill = ['ObjetivoGeneralManual_Codigo']
     for(let elemName of toFill) {
     let htmlElem = document.getElementsByClassName(elemName)[0]
     for(let record of props.formsData.current[elemName]) {
      let optionInnerText = ''
      let option = document.createElement('option')
      option.value = `{"pk":"${record['ID']}","Descripcion":"${record['Descripcion']}"}`      
      optionInnerText = record['Codigo']
      option.innerText = optionInnerText     
      htmlElem? htmlElem.appendChild(option):void 0    
      props.formsData.current['specificData'] && props.formsData.current['specificData']['Manual']['CodigoManual'] == record['ID']?
      option.selected=true:htmlElem.value = ''
     } }
     if(props.formsData.current['specificData']) {
      let htmlElem = document.getElementsByClassName('ObjetivoGeneralManual_ObjetivoGeneralManualDescri')[0] 
      htmlElem.innerText = props.formsData.current['specificData']['Manual']['ObjetivoGeneralManualDescri']      
     }
    //  if(props.formsData.current['specificData']) {
    //   fetch(`http://${window.location.hostname}:8000/puestodescripcion/`,{
    //     'method':'POST',
    //     'headers':{'Content-Type':'application/json'},
    //     body:JSON.stringify({'mode':'request_ficha_tecnica','puestoDescriCode':props.updateElementId.current})
    //   })    
    //   .then((res)=>{setOrganigramaFileType(res.headers.get('Content-Type'));return res.blob()})
    //   .then((res)=>{setImage(URL.createObjectURL(res))})
    //  } 
    },250) },[])

 useEffect((() => {  
  if(props.fullManualData) {
   let ObjetivoGeneralManualDescri = document.getElementsByClassName('ObjetivoGeneralManual_ObjetivoGeneralManualDescri')[0]
   let ObjetivosUnidadNegocioCodigo = document.getElementsByClassName('ObjetivoGeneralManual_Codigo')[0]    
   if(!ObjetivosUnidadNegocioCodigo.value){
    setModalErrorData(`El campo Código del manual de la sección Objetivo general del manual es requerido.`)
    props.setFullManualData(false)
  }else{props.backenData.current['Manual']['CodigoManual']=JSON.parse(ObjetivosUnidadNegocioCodigo.value)['pk']}
   if(ObjetivoGeneralManualDescri.value){props.backenData.current['Manual']['ObjetivoGeneralManualDescri']=ObjetivoGeneralManualDescri.value}
  }
}),[props.fullManualData])

 return (
  <div className="Sección_ObjetivoGeneralManual">
   <h2 style={{'fontWeight':'900'}}>Manual</h2>    
   <br/>
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>1. Objetivo general del manual:</h2>  
   <br/>
   <h4 className='responsTitle' style={{'display':'inline-block'}}>Código del manual:</h4>
   <select className='ObjetivoGeneralManual_Codigo' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}></select>   
   <br/>
   <h5 className='responsTitle' style={{'display':'inline-block','margin':'15px 0 0 0'}}>Descripción general:</h5>
   <textarea className='ObjetivoGeneralManual_ObjetivoGeneralManualDescri' placeholder='Descripción'></textarea>
   <br/>  
   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}