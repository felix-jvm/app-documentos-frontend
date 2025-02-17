import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function CompeteTecniIndisLista (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);

 useEffect(() => {
  setTimeout(() => { 
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['CompeteTecniIndisLista']) {
     let tHead = document.getElementsByClassName('CompeteTecniIndisListaHead')[0]
     let tBody = document.getElementsByClassName('CompeteTecniIndisListaBody')[0]
     let CompeteTecniIndisLista_Descripcion = document.getElementsByClassName('CompeteTecniIndisLista_Descripcion')[0] 
     CompeteTecniIndisLista_Descripcion.value = props.formsData.current['specificData']['DescripcionPuesto'][0]['CompeteTecniIndisDescr']     
     for(let records of props.formsData.current['specificData']['CompeteTecniIndisLista']) {
      let columnSchema = ['Indispensables para ocupar la posición','Buen Dominio','Dominio Básico']
      let trBody = document.createElement('tr')
      trBody.className = 'CompeteTecniIndisListaTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {
        let td=document.createElement('td')
        if(['Buen Dominio','Dominio Básico'].includes(column)){
          if(records[column]){td.style.fontWeight = '900';td.style.padding = '0 0 0 10px';td.innerText='X'}
          else{td.innerText=''}
        }else{td.innerText=records[column]}
        trBody.appendChild(td) }
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('CompeteTecniIndisListaTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let CompeteTecniIndisListaBody = document.getElementsByClassName('CompeteTecniIndisListaBody')[0]
  setDisplayDeleteRecordButton(CompeteTecniIndisListaBody && CompeteTecniIndisListaBody.children.length? true:false)
 }

 function HandleAdd() {
  let CompeteTecniIndisLista_Competencia = document.getElementsByClassName('CompeteTecniIndisLista_Competencia')[0]  
  let CompeteTecniIndisListaHead = document.getElementsByClassName('CompeteTecniIndisListaHead')[0]    
  let CompeteTecniIndisListaBody = document.getElementsByClassName('CompeteTecniIndisListaBody')[0]  
  let CompeteTecniIndisListaBuenDominio = document.getElementsByClassName('CompeteTecniIndisListaBuenDominio')[0]    
  let CompeteTecniIndisListaDominioBásico = document.getElementsByClassName('CompeteTecniIndisListaDominioBásico')[0]    
  let data = [CompeteTecniIndisLista_Competencia,CompeteTecniIndisListaBuenDominio,CompeteTecniIndisListaDominioBásico]
  let columns = ['Indispensables para ocupar la posición','Buen Dominio','Dominio Básico']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'CompeteTecniIndisListaTr'
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('CompeteTecniIndisListaTr') 
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
    if(!errorDataref.current){
      const TdMarkStyles = (td) => {
       td.style.fontWeight = '900'
       td.style.padding = '0 0 0 10px'
       td.innerText='X'
      }
     if(data[dataCounter].className == 'CompeteTecniIndisLista_Competencia'){td.innerText = data[dataCounter].value}
     else if(data[dataCounter].className == 'CompeteTecniIndisListaBuenDominio'){CompeteTecniIndisListaBuenDominio.checked? TdMarkStyles(td):td.innerText=''}
     else if(data[dataCounter].className == 'CompeteTecniIndisListaDominioBásico'){CompeteTecniIndisListaDominioBásico.checked? TdMarkStyles(td):td.innerText=''}
     trBody.appendChild(td)}
  }
  if(!errorDataref.current) {
  //  let parsedOptionValue = JSON.parse(CompeteTecniIndisLista_Descripcion.value)    
   props.backenData.current['CompeteTecniIndisLista'].push({'Descri':CompeteTecniIndisLista_Competencia.value,'BuenDominio':CompeteTecniIndisListaBuenDominio.checked,'DominioBasico':CompeteTecniIndisListaDominioBásico.checked,'elementHtml':trBody.innerHTML});
   props.summaryData.current['CompeteTecniIndisLista'][trBody.innerHTML] = {'Descri':CompeteTecniIndisLista_Competencia.value,'BuenDominio':CompeteTecniIndisListaBuenDominio.checked,'DominioBasico':CompeteTecniIndisListaDominioBásico.checked}
   CompeteTecniIndisLista_Competencia.value = ''
   CompeteTecniIndisListaBuenDominio.checked = false
   CompeteTecniIndisListaDominioBásico.checked = false
  }
  CompeteTecniIndisListaBody.appendChild(trBody)
  !CompeteTecniIndisListaHead.children.length?CompeteTecniIndisListaHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'CompeteTecniIndisLista':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('CompeteTecniIndisLista')? props.summaryData.current['recordsToDelete']['CompeteTecniIndisLista'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['CompeteTecniIndisLista']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['CompeteTecniIndisLista']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['CompeteTecniIndisLista'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['CompeteTecniIndisLista'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['CompeteTecniIndisLista'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['CompeteTecniIndisLista'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'} 
  updateDeleteRecordButtonStatus()
 }

  useEffect((() => {
    if(props.fullPuestoDescriData && 
      props.backenData.current['DescripcionPuesto']['CodigoPuesto'] && 
      props.backenData.current['DescripcionPuesto']['TituloPuesto'] && 
      props.backenData.current['DescripcionPuesto']['ReportaA'] && 
      props.backenData.current['DescripcionPuesto']['Departamento']){
     let CompeteTecniIndisLista_Descripcion = document.getElementsByClassName('CompeteTecniIndisLista_Descripcion')[0]
     CompeteTecniIndisLista_Descripcion.value? props.backenData.current['DescripcionPuesto']['CompeteTecniIndisDescr'] = CompeteTecniIndisLista_Descripcion.value:void 0     
     fetch(`http://${window.location.hostname}:8000/puestodescripcion/`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'savePuestoDescriRecord','payload':props.backenData.current})
     })
     .then(re=>re.json())
     .then(re=>{if(re.msg=='ok'){
       props.setConfirmationModal(true) 
       setTimeout(()=>{
        props.setConfirmationModal(false)
        props.refreshDataTable.current = true
       },3000)}})
    }}),[props.fullPuestoDescriData])

  function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_CompeteTecniIndisLista">
   <h4 className='responsPuestoTitle'>9.4.2. Competencias Técnicas Indispensables:</h4>
   <textarea className='CompeteTecniIndisLista_Descripcion' placeholder='Descripción de competencias técnicas indispensables'></textarea>   
   <h4 className='responsTitle'>Indispensable para ocupar la posición:</h4>
   <input type='text' className='CompeteTecniIndisLista_Competencia' style={{'minWidth':'15%','maxWidth':'15%'}} placeholder='Descripción'/>   
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/> 
   <br/>   
   <br/>
   <br/>
   <fieldset>
    <input type='radio' id='CompeteTecniIndisListaBuenDominio' className='CompeteTecniIndisListaBuenDominio' name='CompeteTecniIndisLista' value='Buen Dominio'/>
    <label for='CompeteTecniIndisListaBuenDominio' style={{'margin':'0 0 0 8px'}}>Buen Dominio</label>
    <br/>
    <input type='radio' id='CompeteTecniIndisListaDominioBásico' className='CompeteTecniIndisListaDominioBásico' name='CompeteTecniIndisLista' value='Dominio Básico'/>
    <label for='CompeteTecniIndisListaDominioBásico' style={{'margin':'0 0 0 8px'}}>Dominio Básico</label>   
   </fieldset>
   <table className='CompeteTecniIndisListaTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='CompeteTecniIndisListaHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='CompeteTecniIndisListaBody'></tbody>
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