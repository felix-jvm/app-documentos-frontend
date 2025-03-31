import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function ObjetivosEspecíficos (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);

  useEffect(() => {
    setTimeout(() => { 
      let toFill = ['DescripcionesPuesto_puestoSelect']
      for(let elemName of toFill) {
      let htmlElem = document.getElementsByClassName(elemName)[0]
      for(let record of props.formsData.current[elemName]) {
       let optionInnerText = ''
       let option = document.createElement('option')
       option.value = `{"pk":"${record['ID']}","CodigoPuesto":"${record['CodigoPuesto']}","TituloPuesto":"${record['TituloPuesto']}"}`      
       optionInnerText = `${record['CodigoPuesto']}, ${record['TituloPuesto']}`
       option.innerText = optionInnerText     
       htmlElem? (()=>{htmlElem.appendChild(option);htmlElem.value=''})():void 0
      } }
      if(props.formsData.current['specificData'] && props.formsData.current['specificData']['DescripcionPuestoManual']) {
       let tHead = document.getElementsByClassName('DescripcionesPuestoHead')[0]
       let tBody = document.getElementsByClassName('DescripcionesPuestoBody')[0]
       for(let records of props.formsData.current['specificData']['DescripcionPuestoManual']) {
        let columnSchema = ['Codificación Interna','Descripción de puesto']
        let trBody = document.createElement('tr')
        trBody.style.margin = '150px'
        trBody.className = 'ObjetivosEspecíficosTr'
        if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
        for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
        trBody.value=records['ID']
        trBody.style.backgroundColor = 'white'
        trBody.style.fontWeight = '400'
        trBody.addEventListener('click',(e)=>{
        if(e.target.parentElement.value){
         selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
        }else{selectedTableRecord.current = {'record':e.target.parentElement}}
        let trList = document.getElementsByClassName('ObjetivosEspecíficosTr') 
        for (let tr of trList){if(tr!=e.target.parentElement){
         setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
        })      
        tBody.appendChild(trBody)
       } }  
       updateDeleteRecordButtonStatus()
      },250) },[])  

 function updateDeleteRecordButtonStatus() {
  let DescripcionesPuestoBody = document.getElementsByClassName('DescripcionesPuestoBody')[0]
  setDisplayDeleteRecordButton(DescripcionesPuestoBody && DescripcionesPuestoBody.children.length? true:false)
 } 

 function HandleAdd() {
  let DescripcionesPuesto_puestoSelect = document.getElementsByClassName('DescripcionesPuesto_puestoSelect')[0]  
  let DescripcionesPuestoHead = document.getElementsByClassName('DescripcionesPuestoHead')[0]    
  let DescripcionesPuestoBody = document.getElementsByClassName('DescripcionesPuestoBody')[0]    
  let parsedOptionValue = JSON.parse(DescripcionesPuesto_puestoSelect.value)  
  let data = [parsedOptionValue['CodigoPuesto'],parsedOptionValue['TituloPuesto']]
  let columns = ['Codificación Interna','Descripción de puesto']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'ObjetivosEspecíficosTr' 
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('ObjetivosEspecíficosTr') 
    for (let tr of trList){if(tr!=e.target.parentElement){
     setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } } )  
  errorDataref.current = false
  for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
    let td = document.createElement('td');
    let th = document.createElement('th');
    th.innerText = columns[dataCounter];    
    trHead.appendChild(th)
    if(data[dataCounter].required && !data[dataCounter].value) {
      setModalErrorData(`El campo ${data[dataCounter].className.split('_')[1].replace('Input','').replace('Select','').replace('ID','')} de la ${data[dataCounter].parentElement.className} es requerido.`);
      errorDataref.current = true;
      trBody.innerHTML = '';
    }
    td.innerText = data[dataCounter]
    trBody.appendChild(td)
  }
  if(!errorDataref.current) {    
   props.backenData.current['DescripcionPuestoManual'].push({'Codigo':parsedOptionValue['CodigoPuesto'],'Descri':parsedOptionValue['TituloPuesto'],'elementHtml':trBody.innerHTML});
   props.summaryData.current['DescripcionPuestoManual'][trBody.innerHTML] = {'Codigo':parsedOptionValue['CodigoPuesto'],'Descri':parsedOptionValue['TituloPuesto']}
   DescripcionesPuesto_puestoSelect.value = '';
  }
  DescripcionesPuestoBody.appendChild(trBody)
  !DescripcionesPuestoHead.children.length?DescripcionesPuestoHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 } 

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'DescripcionPuestoManual':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('DescripcionPuestoManual')? props.summaryData.current['recordsToDelete']['DescripcionPuestoManual'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['DescripcionPuestoManual']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['DescripcionPuestoManual']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['DescripcionPuestoManual'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['DescripcionPuestoManual'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['DescripcionPuestoManual'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['DescripcionPuestoManual'].splice(counter,1)}
    }}}
  // if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].remove()}
  updateDeleteRecordButtonStatus()    
 }

//  useEffect((() => {  
//   if(props.fullManualData) {
//    let descripciónOp = document.getElementsByClassName('DescripcionesPuesto_DescripcionOp')[0]    
//    if(descripciónOp.value){props.backenData.current['Manual']['ObjetivoEspecificoManualDescri']=descripciónOp.value}
//   } }),[props.fullManualData])
 
 return (
  <div className="Sección_DescripcionesPuesto">
   <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>9. Descripciones de puesto</h2>  
   {/* <h5 className='responsTitle' style={{'display':'inline-block'}}>Descripción general:</h5>
   <textarea className='DescripcionesPuesto_DescripcionOp' placeholder='Descripción'></textarea>
   <br/> */}
   <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-1.7px','marginTop':'6px'}}>Puestos:</h5>
   <select className='DescripcionesPuesto_puestoSelect' style={{'display':'inline-block','position':'relative','marginRight':'5px'}}></select>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px'}}/>
   <br/>
   <br/>
   <table className='DescripcionesPuestoTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='DescripcionesPuestoHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='DescripcionesPuestoBody'></tbody>
   </table>
   {displayDeleteRecordButton && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'3px 0 3px 0'}} onClick={()=>{handleRecordRemove()}}/>}
   <br/>
   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}