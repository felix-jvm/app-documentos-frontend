import './Forms.css';
import ConfirmationModal from '../ConfirmationModal';
import {useEffect,useState,useRef} from 'react';
import InlineTermino from './InlineForms/InlineTermino';

export default function TerminologiasDef (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 var errorDataref = useRef(false) 
 var selectedTableRecord = useRef(undefined) 
 const tableRecordsNumber = useRef(props.procedData.specificData && props.procedData.specificData['TerminologiasDef'] && 
  props.procedData.specificData['TerminologiasDef'].length > 0) 
 useEffect((() => {
  setTimeout(() => {
    fetch(`http://${window.location.hostname}:9000/procedimiento/`,
     {
      'method':'POST',
      'headers':{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'fillForm'})
     })
      .then(e => e.json())
      .then(data => {
       var TerminologiasDef_IDTermino = document.getElementsByClassName('TerminologiasDef_IDTermino')[0]
       for(let respons of data['TerminologiasDef-IDTermino']) {
        let option = document.createElement('option')
        option.value = `{"pk":"${respons['ID']}","Descripcion":"${respons['Descripcion']}"}`        
        option.innerText = `${respons.Descripcion}`
        TerminologiasDef_IDTermino.appendChild(option)
       }
       TerminologiasDef_IDTermino.value = ''
   })

   if(props.procedData.specificData && props.procedData.specificData['TerminologiasDef']) {
    let tHead = document.getElementsByClassName('terminDefHead')[0]
    let tBody = document.getElementsByClassName('terminDefBody')[0]
    for(let records of props.procedData.specificData['TerminologiasDef']) {
     let columnSchema = ['IDTermino','Descripcion']
     let trBody = document.createElement('tr')
     trBody.className = 'terminTr'     
     if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
     for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
     trBody.value=records['ID']
     trBody.style.backgroundColor = 'white'
     trBody.style.fontWeight = '400'
     trBody.addEventListener('click',(e)=>{
     if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
     }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
     let trList = document.getElementsByClassName('terminTr')
     for (let tr of trList){if(tr!=e.target.parentElement){
      setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } })      
     tBody.appendChild(trBody)
    } } },250)}),[])

 function HandleAdd() {
    let responsSelectValue = document.getElementsByClassName('TerminologiasDef_IDTermino')[0]
    let responsDescripInput = document.getElementsByClassName('TerminologiasDef_DescripcionInput')[0]  
    
    let responsHead = document.getElementsByClassName('terminDefHead')[0]    
    let responsBody = document.getElementsByClassName('terminDefBody')[0]    
    let data = [responsSelectValue,responsDescripInput]
    let columns = ['Termino','Descripciòn']
    var trHead = document.createElement('tr')
    var trBody = document.createElement('tr')
    trBody.className = 'terminTr'    
    trBody.style.backgroundColor = 'white'
    trBody.style.fontWeight = '400'    
    trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('terminTr')
      for (let tr of trList){if(tr!=e.target.parentElement){
        setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } })    
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
     let parsedOptionValue = JSON.parse(responsSelectValue.value) 
     props.backenData.current['TerminologiasDef'].push({'IDTermino':parsedOptionValue['pk'],'Descripcion':responsDescripInput.value,'elementHtml':trBody.innerHTML})
     props.summaryData.current['TerminologiasDef'][trBody.innerHTML] = {'termino':parsedOptionValue['Descripcion'],'descripcion':responsDescripInput.value} 
     responsSelectValue.value = '';
     responsDescripInput.value = '';
    }    
    responsBody.appendChild(trBody)
    !responsHead.children.length?responsHead.appendChild(trHead):void 0
   } 

   function handleRecordRemove(){
    if(!selectedTableRecord.current){return}
    if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
     props.backenData.current['recordsToDelete'].push({'TerminologiasDef':selectedTableRecord.current['recordToDeleteId']})
     Object.keys(props.summaryData.current['recordsToDelete']).includes('TerminologiasDef')? props.summaryData.current['recordsToDelete']['TerminologiasDef'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['TerminologiasDef']=[selectedTableRecord.current['record']]     
    }else{
      if(selectedTableRecord.current['record']){
       Object.keys(props.summaryData.current['TerminologiasDef']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['TerminologiasDef'][selectedTableRecord.current['record'].innerHTML]})():void 0        
       for(let counter=0;counter<=props.backenData.current['TerminologiasDef'].length-1;counter++){
        let currentRecordToCreate = props.backenData.current['TerminologiasDef'][counter]
        if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['TerminologiasDef'].splice(counter,1)}
      }}}
    if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
    }

   function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}    

 return (
  <div className="Secciòn_Definiciòn_Terminologias">
   <h2 className='terminDefTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>5. Definición de terminologias:</h2>  
   <a className='inlineFormLabel' href='' onClick={(e)=>{handleDisplayInlineForm(e,'termino','TerminologiasDef_IDTermino')}}>Crear nuevo termino</a>   
   <br/>
   <h4 className='terminDefTerminoTitle' style={{'letterSpacing':'-1.7px'}}>Termino:</h4>
   <select className='TerminologiasDef_IDTermino' required={true} style={{'minWidth':'21.9%','maxWidth':'21.9%','display':'inline-block','position':'relative','marginRight':'5px'}}></select>
   <input type='submit' className='terminDefAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/>
   <br/>
   <br/>
   <textarea className='TerminologiasDef_DescripcionInput' placeholder='Descripción del termino' required={true}></textarea>
   <br/>
   <br/>
   <table className='terminDefTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='terminDefHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='terminDefBody'></tbody>
   </table>    
   {tableRecordsNumber.current && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'3px 0 3px 0'}} onClick={()=>{handleRecordRemove()}}/>}
   <br/>
   <hr/>
   {inlineForm && ( (inlineForm.split(',')[0]=='termino' && <InlineTermino inlineForm={inlineForm} setInlineForm={setInlineForm}/>) )}   
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}   
  </div>  
 )
}