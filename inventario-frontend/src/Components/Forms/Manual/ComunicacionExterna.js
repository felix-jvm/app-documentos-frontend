import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function ComunicacionExterna (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);

  useEffect(() => {
    setTimeout(() => { 
      if(props.formsData.current['specificData'] && props.formsData.current['specificData']['ComunicacionExterna']) {
       let tHead = document.getElementsByClassName('ComunicacionExternaHead')[0]
       let tBody = document.getElementsByClassName('ComunicacionExternaBody')[0]
       for(let records of props.formsData.current['specificData']['ComunicacionExterna']) {
        let columnSchema = ['Tipo de comunicación','Periodicidad']
        let trBody = document.createElement('tr')
        trBody.className = 'ActividadesPeriodicasPuestoTr'
        if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
        for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
        trBody.value=records['ID']
        trBody.style.backgroundColor = 'white'
        trBody.style.fontWeight = '400'
        trBody.addEventListener('click',(e)=>{
        if(e.target.parentElement.value){
         selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
        }else{selectedTableRecord.current = {'record':e.target.parentElement}}
        let trList = document.getElementsByClassName('ActividadesPeriodicasPuestoTr') 
        for (let tr of trList){if(tr!=e.target.parentElement){
         setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
        })      
        tBody.appendChild(trBody)
       } }  
       updateDeleteRecordButtonStatus()
      },250) },[])   

  function updateDeleteRecordButtonStatus() {
        let ComunicacionExternaBody = document.getElementsByClassName('ComunicacionExternaBody')[0]
        setDisplayDeleteRecordButton(ComunicacionExternaBody && ComunicacionExternaBody.children.length? true:false)
  }

  function HandleAdd() {
    let tipocomunicacion = document.getElementsByClassName('ComunicacionExterna_tipocomunicacion')[0]
    let periodicidad = document.getElementsByClassName('ComunicacionExterna_periodicidad')[0]   
    let ComunicacionExternaHead = document.getElementsByClassName('ComunicacionExternaHead')[0]    
    let ComunicacionExternaBody = document.getElementsByClassName('ComunicacionExternaBody')[0]    
    let data = [tipocomunicacion,periodicidad]
    let columns = ['Tipo de comunicación','Periodicidad']
    var trHead = document.createElement('tr')
    var trBody = document.createElement('tr')
    trBody.className = 'ComunicacionExternaTr'
    trBody.style.backgroundColor = 'white'
    trBody.style.fontWeight = '400'  
    trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
        selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('ComunicacionExternaTr') 
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
    //  let parsedOptionValue = JSON.parse(ClientesInternos_Necesidad.value)    
     props.backenData.current['ComunicacionExterna'].push({'TipoComunicacion':tipocomunicacion.value,'Periodicidad':periodicidad.value,'elementHtml':trBody.innerHTML});
     props.summaryData.current['ComunicacionExterna'][trBody.innerHTML] = {'TipoComunicacion':tipocomunicacion.value,'Periodicidad':periodicidad.value,'elementHtml':trBody.innerHTML}
     tipocomunicacion.value = '';
     periodicidad.value = ''
    }
    ComunicacionExternaBody.appendChild(trBody)
    !ComunicacionExternaHead.children.length?ComunicacionExternaHead.appendChild(trHead):void 0
    updateDeleteRecordButtonStatus()
   }
  
   function handleRecordRemove(){
    if(!selectedTableRecord.current){return}
    if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
     props.backenData.current['recordsToDelete'].push({'ComunicacionExterna':selectedTableRecord.current['recordToDeleteId']})
     Object.keys(props.summaryData.current['recordsToDelete']).includes('ComunicacionExterna')? props.summaryData.current['recordsToDelete']['ComunicacionExterna'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['ComunicacionExterna']=[selectedTableRecord.current['record']]   
    }else{
      if(selectedTableRecord.current['record']){
        Object.keys(props.summaryData.current['ComunicacionExterna']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['ComunicacionExterna'][selectedTableRecord.current['record'].innerHTML]})():void 0      
       for(let counter=0;counter<=props.backenData.current['ComunicacionExterna'].length-1;counter++){
        let currentRecordToCreate = props.backenData.current['ComunicacionExterna'][counter]
        if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['ComunicacionExterna'].splice(counter,1)}
      }}}
    if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
    updateDeleteRecordButtonStatus()
   }

 return (
  <div className="Sección_ComunicacionExterna">
   <h5 style={{'fontWeight':'900','margin':'0 0 20px 0','letterSpacing':'-1px'}}>11.2. Externa</h5>
   <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-1px'}}>Tipo de comunicación:</h5>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/>   
   <textarea type='text' className='ComunicacionExterna_tipocomunicacion' placeholder='Tipo de comunicación' ></textarea>   
   <h5 style={{'margin':'0 0 8px 0','letterSpacing':'-1px'}}>Periodicidad:</h5>
   <textarea className='ComunicacionExterna_periodicidad' placeholder='Periodicidad'></textarea>  
   <br/>
   <br/>
   <table className='ComunicacionExternaTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='ComunicacionExternaHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='ComunicacionExternaBody'></tbody>
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