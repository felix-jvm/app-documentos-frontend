import '../Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function InstructivoAnexo (props) {
 const [modalErrorData, setModalErrorData] = useState(false);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined); 
 useEffect(()=>{
  setTimeout(()=>{
    let tHead = document.getElementsByClassName('InstructivoAnexoHead')[0]
    let tBody = document.getElementsByClassName('InstructivoAnexoBody')[0]
    if(props.formsData.current['specificData']) {
      for(let records of props.formsData.current['specificData']['InstructivoAnexo']) {
        let columnSchema = ['No.','Nombre','Código']
        let trBody = document.createElement('tr')
        trBody.className = 'InstructivoAnexoTr'
        if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
        for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
        trBody.value=records['ID']
        trBody.style.backgroundColor = 'white'
        trBody.style.fontWeight = '400'
        trBody.addEventListener('click',(e)=>{
        if(e.target.parentElement.value){
         selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
        }else{selectedTableRecord.current = {'record':e.target.parentElement}}
        let trList = document.getElementsByClassName('InstructivoAnexoTr') 
        for (let tr of trList){if(tr!=e.target.parentElement){
         setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
        })      
        tBody.appendChild(trBody)
      } }
    updateDeleteRecordButtonStatus()
    },250) },[])

useEffect((() => {  
  if(props.fullInstructivoData && props.backenData.current['Instructivo']['CodigoInstructivo']) {
      fetch(`http://${window.location.hostname}:9000/instructivo/`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'saveInstructivoRecord','payload':props.backenData.current})
      })
      .then(re=>re.json())
      .then(re=>{if(re.msg=='ok'){
        props.setConfirmationModal(true) 
        setTimeout(()=>{
          props.setConfirmationModal(false)
          props.refreshDataTable(true)
  },2000)}}) } }),[props.fullInstructivoData])

function updateDeleteRecordButtonStatus() {
  let InstructivoAnexoBody = document.getElementsByClassName('InstructivoAnexoBody')[0]
  setDisplayDeleteRecordButton(InstructivoAnexoBody && InstructivoAnexoBody.children.length? true:false)
 }

 function HandleAdd() {
  let InstructivoAnexo_Numero = document.getElementsByClassName('InstructivoAnexo_Numero')[0]  
  let InstructivoAnexo_Descri = document.getElementsByClassName('InstructivoAnexo_Descri')[0]
  let InstructivoAnexo_Codigo = document.getElementsByClassName('InstructivoAnexo_Codigo')[0]
  let InstructivoAnexoHead = document.getElementsByClassName('InstructivoAnexoHead')[0]    
  let InstructivoAnexoBody = document.getElementsByClassName('InstructivoAnexoBody')[0]    
  let data = [InstructivoAnexo_Numero,InstructivoAnexo_Descri,InstructivoAnexo_Codigo]
  let columns = ['No.','Nombre','Código']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'InstructivoAnexoTr'
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('InstructivoAnexoTr') 
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
  //  let parsedOptionValue = JSON.parse(InstructivoAnexo_Descri.value)    
   props.backenData.current['InstructivoAnexo'].push({
    'Descri':InstructivoAnexo_Descri.value,
    'Codigo':InstructivoAnexo_Codigo.value,
    'Numero':InstructivoAnexo_Numero.value,
    'elementHtml':trBody.innerHTML});
   props.summaryData.current['InstructivoAnexo'][trBody.innerHTML] = {
    'Descri':InstructivoAnexo_Descri.value,
    'Codigo':InstructivoAnexo_Codigo.value,
    'Numero':InstructivoAnexo_Numero.value,
}
   InstructivoAnexo_Descri.value = ''
   InstructivoAnexo_Codigo.value = ''
   InstructivoAnexo_Numero.value = ''
  }
  InstructivoAnexoBody.appendChild(trBody)
  !InstructivoAnexoHead.children.length?InstructivoAnexoHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'InstructivoAnexo':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('InstructivoAnexo')? props.summaryData.current['recordsToDelete']['InstructivoAnexo'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['InstructivoAnexo']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['InstructivoAnexo']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['InstructivoAnexo'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['InstructivoAnexo'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['InstructivoAnexo'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['InstructivoAnexo'].splice(counter,1)}
    }}}
  // if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].remove()}
  updateDeleteRecordButtonStatus()    
 }

 return (
  <div className="Sección_InstructivoAnexo">
   <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>4. Anexos</h2>
   <h4 className='AnexosNumTitle' style={{'letterSpacing':'-1.7px'}}>Número:</h4>   
   <input type='number' className='InstructivoAnexo_Numero' placeholder='Número del anexo' style={{'minWidth':'21.9%','maxWidth':'21.9%','display':'inline-block','position':'relative','marginRight':'5px'}}/>
   <input type='submit' className='terminDefAddButton anexoAddRecordButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/>
   <br/>
   <br/>
   <h4 className='AnexosNombreTitle' style={{'letterSpacing':'-1.7px'}}>Nombre:</h4>   
   <textarea className='InstructivoAnexo_Descri' placeholder='Nombre del anexo' style={{'minWidth':'21.2%','maxWidth':'21.2%'}}></textarea>
   <br/>
   <br/>
   <h4 className='AnexosCodigoTitle AnexosNombreTitle' style={{'display':'inline-block','position':'relative','letterSpacing':'-1.7px'}}>Código:</h4>   
   <textarea className='InstructivoAnexo_Codigo' placeholder='Código del anexo' style={{'minWidth':'21.5%','maxWidth':'21.5%'}}></textarea>
   <br/>
   <br/>
   <table className='InstructivoAnexoTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='InstructivoAnexoHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='InstructivoAnexoBody'></tbody>
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