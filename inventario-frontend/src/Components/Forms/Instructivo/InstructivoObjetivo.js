import '../Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function InstructivoObjetivo (props) {
 const [modalErrorData, setModalErrorData] = useState(false);

 useEffect(()=>{
  setTimeout(()=>{  
     let toFill = ['Instructivo_CodigoInstructivo']
     for(let elemName of toFill) {
     let htmlElem = document.getElementsByClassName(elemName)[0]
     for(let record of props.formsData.current[elemName]) {
      let option = document.createElement('option')
      option.value = `{"pk":"${record['ID']}","Descripcion":"${record['Descripcion']}"}`
      option.innerText = `${record['Codigo']} ,  ${record['Descripcion']}`
      htmlElem? htmlElem.appendChild(option):void 0    
      props.formsData.current['specificData'] && props.formsData.current['specificData']['Instructivo']['CodigoInstructivo'] == record['ID']?
      (()=>{
        option.selected=true
        let titlElem = document.getElementsByClassName('instructivoTitleDocument')[0]
        titlElem.innerText = record['Descripcion']
      })():htmlElem.value = '' } }
     if(props.formsData.current['specificData']) {
      let ObjetivoDescri = document.getElementsByClassName('Instructivo_ObjetivoDescri')[0]
      let AlcanceDescri = document.getElementsByClassName('Instructivo_AlcanceDescri')[0]
      ObjetivoDescri.innerText = props.formsData.current['specificData']['Instructivo']['ObjetivoDescri']
      AlcanceDescri.innerText = props.formsData.current['specificData']['Instructivo']['AlcanceDescri'] 
      }
    },250) },[])

 function updateTitle(selectElem, titleElem) {
  let titlElem = document.getElementsByClassName(`${titleElem}`)[0]
  if(selectElem.value) {
    let selectedText = selectElem.children[selectElem.selectedIndex].innerText.split(' ,  ')
    if(selectedText) {titlElem.innerText = selectedText[1]} } }
    
 useEffect((() => {  
  if(props.fullInstructivoData) {
   let Instructivo_ObjetivoDescri = document.getElementsByClassName('Instructivo_ObjetivoDescri')[0]
   let Instructivo_AlcanceDescri = document.getElementsByClassName('Instructivo_AlcanceDescri')[0]
   let Instructivo_CodigoInstructivo = document.getElementsByClassName('Instructivo_CodigoInstructivo')[0]    
   if(!Instructivo_CodigoInstructivo.value){
    setModalErrorData(`El campo Código del instructivo es requerido.`)
    props.setFullInstructivoData(false)
  }else{props.backenData.current['Instructivo']['CodigoInstructivo']=JSON.parse(Instructivo_CodigoInstructivo.value)['pk']}
   if(Instructivo_ObjetivoDescri.value){props.backenData.current['Instructivo']['ObjetivoDescri']=Instructivo_ObjetivoDescri.value}
   if(Instructivo_AlcanceDescri.value){props.backenData.current['Instructivo']['AlcanceDescri']=Instructivo_AlcanceDescri.value}
  } }),[props.fullInstructivoData])

 return (
  <div className="Sección_InstructivoObjetivo">
      <p className='instructivoTitleDocument' style={{'position':'relative','textAlign':'center','display':'block','width':'100%','fontSize':'3.4vh'}}></p>
      <h2 style={{'fontWeight':'900','letterSpacing':'-1.5px'}}>Instructivo</h2>
      <br/>
      <h4 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-2px','marginTop':'2px'}}>Código del instructivo:</h4>
      <select className='Instructivo_CodigoInstructivo' style={{'minWidth':'15%','maxWidth':'15%'}} onClick={(e)=>updateTitle(e.target,'instructivoTitleDocument')}></select>
      <br/>
      <br/>
      <h3 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>1. Objetivo</h3>
      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción general:</h5>      
      <textarea className='Instructivo_ObjetivoDescri' placeholder='Objetivo de la Instructivo' style={{'marginLeft':'2px'}}></textarea>
      <br/>
      <h3 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>2. Alcance</h3>
      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción general:</h5>      
      <textarea className='Instructivo_AlcanceDescri' placeholder='Alcance de la Instructivo' style={{'marginLeft':'2px'}}></textarea>      
      <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}