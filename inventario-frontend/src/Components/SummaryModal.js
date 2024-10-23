import './SummaryModal.css'
import {useEffect,useRef} from 'react';

export default function SummaryModal(props) {
  var displayModal = useRef(false) 
  useEffect(()=>{
    setTimeout(()=>{
      for(let sectionName of Object.keys(props.summaryData.current)) {
        let listCont = document.getElementsByClassName(`summary${sectionName}`)[0]                
        let creationList = document.getElementsByClassName(`${sectionName}Added`)[0]
        let deletionList = document.getElementsByClassName(`${sectionName}Deleted`)[0]        
        if(Object.keys(props.summaryData.current[sectionName]).length>=1){displayModal.current=true;listCont?listCont.style.display='block':void 0}
        if(!['Diagrama_flujo','Procedimiento_objetivo','Procedimiento_codigo','Procedimiento_alcance'].includes(sectionName)) {
         for(let sectionRecord of Object.values(props.summaryData.current[sectionName])) {
          let creationLi =document.createElement('li')
          let liText = ''          
          for(let recordPropValue of Object.values(sectionRecord)) {if(liText.length){liText=liText+' - '+recordPropValue}else{liText=recordPropValue}}
          creationLi.style.fontWeight = 500
          creationLi.style.width = '100%'
          creationLi.style.fontSize = '2.5vh'
          creationLi.style.wordWrap = 'normal'
          creationLi.innerText = liText
          if (creationList) {creationList.style.display='inline-block';creationList.style.width='100%';creationList.style.float='left';creationList.appendChild(creationLi)}}}
       
       if(Object.keys(props.summaryData.current['recordsToDelete']).length>=1) {displayModal.current=true}        
       if(Object.keys(props.summaryData.current['recordsToDelete']).includes(sectionName)) {
        listCont.style.display='block'
        for(let sectionRecord of Object.values(props.summaryData.current['recordsToDelete'][sectionName])) {
         let deletionLi =document.createElement('li')
         let deletionLiText = ''          
         if(sectionRecord && sectionRecord.children) {
          for(let sectionRecordChild of sectionRecord.children) {if(deletionLiText.length){deletionLiText=deletionLiText+' - '+sectionRecordChild.innerText}else{deletionLiText=sectionRecordChild.innerText}}
          deletionLi.style.fontWeight = 500
          deletionLi.style.fontSize = '2.5vh'
          deletionLi.style.wordWrap = 'normal'
          deletionLi.innerText = deletionLiText 
          if (deletionList) {
            deletionList.style.display='inline-block';
            if(creationList.style.float.length){creationList.style.width='50%';deletionList.style.width='50%';creationList.style.float='left';deletionList.style.float='right'}else{deletionList.style.width='100%'}
            deletionList.appendChild(deletionLi)}}}}}
      // console.log('---------->',props.procedData,props.backenData)    
      var displayProceData = (liText) => {
       let procedCont = document.getElementsByClassName('summaryProcedimiento')[0]
       let procedimientoAdded = document.getElementsByClassName('ProcedimientoAdded')[0]  
       procedCont.style.display = 'block'
       procedimientoAdded.style.display = 'inline-block'
       procedimientoAdded.style.width = '100%'
       let creationLi = document.createElement('li')
       creationLi.style.fontWeight = 500
       creationLi.style.fontSize = '2.5vh'
       creationLi.style.wordWrap = 'normal'
       creationLi.innerText = liText
       procedimientoAdded.appendChild(creationLi)
      }
      if(props.backenData.current['Procedimiento_CodigoSelect']!==props.procedData['Procedimiento_Codigo']){displayModal.current=true;displayProceData(props.backenData.current['Procedimiento_CodigoSelect'])}
      if(props.backenData.current['Procedimiento_ObjetivoInput']!==props.procedData['Procedimiento_Objetivo']){displayModal.current=true;displayProceData(props.backenData.current['Procedimiento_ObjetivoInput'])}
      if(props.backenData.current['Procedimiento_AlcanceInput']!==props.procedData['Procedimiento_Alcance']){displayModal.current=true;displayProceData(props.backenData.current['Procedimiento_AlcanceInput'])}

      if(!displayModal.current){props.setSummary(false)}     
    },19)},[])

  return (
   <div className='summaryMainCont'>
    <div className='summaryMiddleCont'>
        <h2 style={{'fontWeight':'900','textDecoration':'underline'}}>Informe de modificaciòn/es</h2>
        <div className='summaryProcedimiento'>
          <h3>Procedimiento:</h3>
          <ul className='ProcedimientoAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul></div>
        <div className='summaryDocumentosReferencias'>
          <h3>Documentos de referencia:</h3>
          <ul className='DocumentosReferenciasAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul>
          <ul className='DocumentosReferenciasDeleted' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a eliminar</h4></ul>
        </div>
        <div className='summaryResponsabilidades'>
          <h3>Responsabilidades:</h3>
          <ul className='ResponsabilidadesAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul>
          <ul className='ResponsabilidadesDeleted' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a eliminar</h4></ul>
        </div>
        <div className='summaryTerminologiasDef'>
          <h3>Definiciòn de terminologias:</h3>
          <ul className='TerminologiasDefAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul>
          <ul className='TerminologiasDefDeleted' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a eliminar</h4></ul>
        </div>
        <div className='summaryDescripcionesProcedimiento'>
          <h3>Descripciòn de procedimiento:</h3>
          <ul className='DescripcionesProcedimientoAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul>
          <ul className='DescripcionesProcedimientoDeleted' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a eliminar</h4></ul>
        </div>
        <div className='summarySubDescripciones'>
          <h3>SubDescripciones:</h3>
          <ul className='SubDescripcionesAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul>
          <ul className='SubDescripcionesDeleted' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a eliminar</h4></ul>
        </div>        
        <div className='summaryDiagrama_flujo'>
          <h3>Diagrama de flujo:</h3>
          <ul className='Diagrama_flujoAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul>
        </div>
        <div className='summaryAnexos'>
          <h3>Anexos:</h3>
          <ul className='AnexosAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul> 
          <ul className='AnexosDeleted' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a eliminar</h4></ul>
        </div>
        <div className='summaryRevAprobacion'>
          <h3>Revisiòn y aprobaciòn:</h3>
          <ul className='RevAprobacionAdded' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a guardar</h4></ul>
          <ul className='RevAprobacionDeleted' style={{'display':'none'}}><h4 style={{'fontWeight':'900'}}>Registro/os a eliminar</h4></ul>
        </div>
        <h2>Guardar informe y crear nueva versiòn del documento?</h2>
        <input type='submit' value='Si' style={{'margin':'3px 0 0 3px','display':'block','borderRadius':'5px','border':'1px solid rgb(96, 1, 156)','backgroundColor':'rgb(223, 221, 221)','color':'rgb(96, 1, 156)','padding':'5px 19px 5px 19px'}} onClick={()=>{props.setSummary(false)}}/>
        <input type='submit' value='No' style={{'margin':'3px 0 5px 3px','display':'block','borderRadius':'5px','border':'1px solid rgb(96, 1, 156)','backgroundColor':'rgb(223, 221, 221)','color':'rgb(96, 1, 156)','padding':'5px 15px 5px 15px'}} onClick={()=>{props.setSummary(false)}}/>
    </div>
   </div> 
  )  
}