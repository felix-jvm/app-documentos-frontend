import '../Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function ResponsabilidadesPolitica (props) {
 const [modalErrorData, setModalErrorData] = useState(false);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);

 useEffect(() => {
  setTimeout(() => {
    let toFill = ['ResponsabilidadesPolitica_Puesto']
    for(let elemName of toFill) {
    let htmlElem = document.getElementsByClassName(elemName)[0]
    for(let record of props.formsData.current[elemName]) {
     let option = document.createElement('option')
     option.value = `{"pk":"${record['ID']}","Descripcion":"${record['Descripcion']}"}`
     option.innerText = record['Descripcion']   
     htmlElem? htmlElem.appendChild(option):void 0
    }htmlElem.value = ''}
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['ResponsabilidadesPolitica']) {
     let tHead = document.getElementsByClassName('ResponsabilidadesPoliticaHead')[0]
     let tBody = document.getElementsByClassName('ResponsabilidadesPoliticaBody')[0]
     for(let records of props.formsData.current['specificData']['ResponsabilidadesPolitica']) {
      let columnSchema = ['Indice','Puesto','Descripción']
      let trBody = document.createElement('tr')
      trBody.className = 'ResponsabilidadesPoliticaTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('ResponsabilidadesPoliticaTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

function updateDeleteRecordButtonStatus() {
    let ResponsabilidadesPoliticaBody = document.getElementsByClassName('ResponsabilidadesPoliticaBody')[0]
    setDisplayDeleteRecordButton(ResponsabilidadesPoliticaBody && ResponsabilidadesPoliticaBody.children.length? true:false)
   }

function HandleAdd() {
    let ResponsabilidadesPolitica_Indice = document.getElementsByClassName('ResponsabilidadesPolitica_Indice')[0] 
    let ResponsabilidadesPolitica_Puesto = document.getElementsByClassName('ResponsabilidadesPolitica_Puesto')[0]
    let ResponsabilidadesPolitica_Descri = document.getElementsByClassName('ResponsabilidadesPolitica_Descri')[0]
    let ResponsabilidadesPoliticaHead = document.getElementsByClassName('ResponsabilidadesPoliticaHead')[0]    
    let ResponsabilidadesPoliticaBody = document.getElementsByClassName('ResponsabilidadesPoliticaBody')[0]    
    let data = [ResponsabilidadesPolitica_Indice,ResponsabilidadesPolitica_Puesto,ResponsabilidadesPolitica_Descri]
    let columns = ['Indice','Puesto','Descripción']
    var trHead = document.createElement('tr')
    var trBody = document.createElement('tr')
    trBody.className = 'ResponsabilidadesPoliticaTr' 
    trBody.style.backgroundColor = 'white'
    trBody.style.fontWeight = '400'  
    trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
        selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('ResponsabilidadesPoliticaTr') 
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
      if(!errorDataref.current){if(data[dataCounter].className=='ResponsabilidadesPolitica_Puesto'){td.innerText=JSON.parse(data[dataCounter].value)['Descripcion']}else{td.innerText = data[dataCounter].value};trBody.appendChild(td)}}

    if(!errorDataref.current) {
     let parsedOptionValue = JSON.parse(ResponsabilidadesPolitica_Puesto.value)    
     props.backenData.current['ResponsabilidadesPolitica'].push({
        'Indice':ResponsabilidadesPolitica_Indice.value,
        'Puesto':parsedOptionValue['pk'],
        'Descri':ResponsabilidadesPolitica_Descri.value,
        'elementHtml':trBody.innerHTML});
     props.summaryData.current['ResponsabilidadesPolitica'][trBody.innerHTML] = {
        'Indice':ResponsabilidadesPolitica_Indice.value,
        'Puesto':parsedOptionValue['Descripcion'],
        'Descri':ResponsabilidadesPolitica_Descri.value,}
     ResponsabilidadesPolitica_Indice.value = ''
     ResponsabilidadesPolitica_Puesto.value = ''
     ResponsabilidadesPolitica_Descri.value = ''
    }
    ResponsabilidadesPoliticaBody.appendChild(trBody)
    !ResponsabilidadesPoliticaHead.children.length?ResponsabilidadesPoliticaHead.appendChild(trHead):void 0
    updateDeleteRecordButtonStatus()
   }

 function handleRecordRemove(){
    if(!selectedTableRecord.current){return}
    if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
     props.backenData.current['recordsToDelete'].push({'ResponsabilidadesPolitica':selectedTableRecord.current['recordToDeleteId']})
     Object.keys(props.summaryData.current['recordsToDelete']).includes('ResponsabilidadesPolitica')? props.summaryData.current['recordsToDelete']['ResponsabilidadesPolitica'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['ResponsabilidadesPolitica']=[selectedTableRecord.current['record']]   
    }else{
      if(selectedTableRecord.current['record']){
        Object.keys(props.summaryData.current['ResponsabilidadesPolitica']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['ResponsabilidadesPolitica'][selectedTableRecord.current['record'].innerHTML]})():void 0      
       for(let counter=0;counter<=props.backenData.current['ResponsabilidadesPolitica'].length-1;counter++){
        let currentRecordToCreate = props.backenData.current['ResponsabilidadesPolitica'][counter]
        if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['ResponsabilidadesPolitica'].splice(counter,1)}
      }}}
    // if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
    if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].remove()}
    updateDeleteRecordButtonStatus()    
   }

 return (
  <div className="Secciòn_ResponsabilidadesPolitica">
   <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>4. Responsabilidades</h2>   
   <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-1.7px','marginTop':'5px'}}>Indice:</h5>
   <input type='number' className='ResponsabilidadesPolitica_Indice' placeholder='Subindice'style={{'minWidth':'20.5%','maxWidth':'20.5%','display':'inline-block','position':'relative','marginRight':'5px'}}/>   
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/>   
   <br/>
   <br/>
   <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-2px','marginTop':'2px'}}>Puesto:</h5>
   <select className='ResponsabilidadesPolitica_Puesto' required={true} style={{'minWidth':'20.5%','maxWidth':'20.5%','display':'inline-block','position':'relative','marginRight':'5px'}}></select>
   <br/>
   <br/>
   <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-1.7px','margin':'0'}}>Descripción:</h5>   
   <textarea className='ResponsabilidadesPolitica_Descri' placeholder='Descripción del puesto' required={true}></textarea>
   <br/>
   <br/>
   <table className='ResponsabilidadesPoliticaTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='ResponsabilidadesPoliticaHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='ResponsabilidadesPoliticaBody'></tbody>
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