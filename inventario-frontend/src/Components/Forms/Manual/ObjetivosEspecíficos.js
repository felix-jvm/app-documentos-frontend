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
      if(props.formsData.current['specificData'] && props.formsData.current['specificData']['ObjetivoEspecificoManualLista']) {
       let tHead = document.getElementsByClassName('ObjetivosEspecíficosHead')[0]
       let tBody = document.getElementsByClassName('ObjetivosEspecíficosBody')[0]
       for(let records of props.formsData.current['specificData']['ObjetivoEspecificoManualLista']) {
        let columnSchema = ['Objetivo']
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
       } 
        let htmlElem = document.getElementsByClassName('ObjetivosEspecíficos_DescripciónOp')[0]
        let htmlElemAlcance = document.getElementsByClassName('ObjetivosEspecíficos_Alcance')[0]
        htmlElem.innerText = props.formsData.current['specificData']['Manual']['ObjetivoEspecificoManualDescri']    
        htmlElemAlcance.innerText = props.formsData.current['specificData']['Manual']['AlcanceDescri']        
       }  
       updateDeleteRecordButtonStatus()
      },250) },[])  

 function updateDeleteRecordButtonStatus() {
  let ObjetivosEspecíficosBody = document.getElementsByClassName('ObjetivosEspecíficosBody')[0]
  setDisplayDeleteRecordButton(ObjetivosEspecíficosBody && ObjetivosEspecíficosBody.children.length? true:false)
 } 

 function HandleAdd() {
  let ObjetivosEspecíficos_Objetivo = document.getElementsByClassName('ObjetivosEspecíficos_Objetivo')[0]  
  let ObjetivosEspecíficosHead = document.getElementsByClassName('ObjetivosEspecíficosHead')[0]    
  let ObjetivosEspecíficosBody = document.getElementsByClassName('ObjetivosEspecíficosBody')[0]    
  let data = [ObjetivosEspecíficos_Objetivo]
  let columns = ['Objetivo']
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
    if(!errorDataref.current){if(data[dataCounter].className.includes('ID')){td.innerText=JSON.parse(data[dataCounter].value)['Descripcion']}else{td.innerText = data[dataCounter].value};trBody.appendChild(td)}
  }
  if(!errorDataref.current) {
  //  let parsedOptionValue = JSON.parse(ObjetivosEspecíficos_Objetivo.value)    
   props.backenData.current['ObjetivoEspecificoManualLista'].push({'Descri':ObjetivosEspecíficos_Objetivo.value,'elementHtml':trBody.innerHTML});
   props.summaryData.current['ObjetivoEspecificoManualLista'][trBody.innerHTML] = {'Descri':ObjetivosEspecíficos_Objetivo.value}
   ObjetivosEspecíficos_Objetivo.value = '';
  }
  ObjetivosEspecíficosBody.appendChild(trBody)
  !ObjetivosEspecíficosHead.children.length?ObjetivosEspecíficosHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 } 

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'ObjetivoEspecificoManualLista':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('ObjetivoEspecificoManualLista')? props.summaryData.current['recordsToDelete']['ObjetivoEspecificoManualLista'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['ObjetivoEspecificoManualLista']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['ObjetivoEspecificoManualLista']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['ObjetivoEspecificoManualLista'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['ObjetivoEspecificoManualLista'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['ObjetivoEspecificoManualLista'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['ObjetivoEspecificoManualLista'].splice(counter,1)}
    }}}
  // if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].remove()}
  updateDeleteRecordButtonStatus()    
 }

 useEffect((() => {  
  if(props.fullManualData) {
   let descripciónOp = document.getElementsByClassName('ObjetivosEspecíficos_DescripciónOp')[0]    
   let alcance = document.getElementsByClassName('ObjetivosEspecíficos_Alcance')[0]
   if(descripciónOp.value){props.backenData.current['Manual']['ObjetivoEspecificoManualDescri']=descripciónOp.value}
   if(alcance.value){props.backenData.current['Manual']['AlcanceDescri']=alcance.value}
  } }),[props.fullManualData])
 
 return (
  <div className="Sección_ObjetivosEspecíficos">
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>2. Objetivos específicos del manual</h2>  
   <h5 className='responsTitle' style={{'display':'inline-block'}}>Descripción general:</h5>
   <textarea className='ObjetivosEspecíficos_DescripciónOp' placeholder='Descripción'></textarea>
   <br/>   
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/>
   <h5 className='responsTitle' style={{'display':'inline-block'}}>Objetivo específico:</h5>
   <textarea className='ObjetivosEspecíficos_Objetivo' placeholder='Descripción'></textarea>
   <table className='ObjetivosEspecíficosTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='ObjetivosEspecíficosHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='ObjetivosEspecíficosBody'></tbody>
   </table>
   {displayDeleteRecordButton && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'3px 0 3px 0'}} onClick={()=>{handleRecordRemove()}}/>}
   <hr/>
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>3. Alcance</h2>
   <h5 className='responsTitle'>Descripción:</h5>   
   <textarea className='ObjetivosEspecíficos_Alcance' placeholder='Descripción'></textarea>
   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}