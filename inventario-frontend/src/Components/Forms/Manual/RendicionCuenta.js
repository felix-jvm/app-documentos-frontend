import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function RendicionCuenta (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 
 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['RendicionCuentaLista']) {
     let tHead = document.getElementsByClassName('RendicionCuentaHead')[0]
     let tBody = document.getElementsByClassName('RendicionCuentaBody')[0]
     for(let records of props.formsData.current['specificData']['RendicionCuentaLista']) {
      let columnSchema = ['Elemento']
      let trBody = document.createElement('tr')
      trBody.className = 'RendicionCuentaTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('RendicionCuentaTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } 
      let RendicionCuenta_DescripcionGeneralhtmlElem = document.getElementsByClassName('RendicionCuenta_DescripcionGeneral')[0] 
      RendicionCuenta_DescripcionGeneralhtmlElem.innerText = props.formsData.current['specificData']['Manual']['RendicionCuentaDescri']           
    }  
     updateDeleteRecordButtonStatus()
    },250)},[])

 function updateDeleteRecordButtonStatus() {
  let RendicionCuentaBody = document.getElementsByClassName('RendicionCuentaBody')[0]
  setDisplayDeleteRecordButton(RendicionCuentaBody && RendicionCuentaBody.children.length? true:false)
 }

 function HandleAdd() {
  let RendicionCuentaElementosDescri = document.getElementsByClassName('RendicionCuentaListaElementos_Descri')[0]
  let RendicionCuentaHead = document.getElementsByClassName('RendicionCuentaHead')[0]    
  let RendicionCuentaBody = document.getElementsByClassName('RendicionCuentaBody')[0]    
  let data = [RendicionCuentaElementosDescri]
  let columns = ['Elemento']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'RendicionCuentaTr'  
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('RendicionCuentaTr') 
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
  //  let parsedOptionValue = JSON.parse(RendicionCuentaListaElementos_Descri.value)
   props.backenData.current['RendicionCuentaLista'].push({'Descri':RendicionCuentaElementosDescri.value,'elementHtml':trBody.innerHTML});
   props.summaryData.current['RendicionCuentaLista'][trBody.innerHTML] = {'Descri':RendicionCuentaElementosDescri.value}      
   RendicionCuentaElementosDescri.value = '';
  }
  RendicionCuentaBody.appendChild(trBody)
  !RendicionCuentaHead.children.length?RendicionCuentaHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'RendicionCuentaLista':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('RendicionCuentaLista')? props.summaryData.current['recordsToDelete']['RendicionCuentaLista'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['RendicionCuentaLista']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['RendicionCuentaLista']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['RendicionCuentaLista'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['RendicionCuentaLista'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['RendicionCuentaLista'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['RendicionCuentaLista'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
  updateDeleteRecordButtonStatus()
  }  

  useEffect((() => {  
    if(props.fullManualData) {
     let DescripcionGeneral = document.getElementsByClassName('RendicionCuenta_DescripcionGeneral')[0]    
     if(DescripcionGeneral.value){props.backenData.current['Manual']['RendicionCuentaDescri']=DescripcionGeneral.value}
    //  let SegundaDescripcionGeneral = document.getElementsByClassName('RendicionCuenta_SegundaDescripcionGeneral')[0]
    //  if(SegundaDescripcionGeneral.value){props.backenData.current['Manual']['PresupuestoSecondDescri']=SegundaDescripcionGeneral.value}
    }
  }),[props.fullManualData]) 

 return (
  <div className="Secciòn_RendicionCuenta">
   <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>14.Rendición de cuenta</h2>
   <h5 className='responsTitle'style={{'letterSpacing':'-1px'}}>Descripción general:</h5>
   <textarea className='RendicionCuenta_DescripcionGeneral' placeholder='Descripción general'></textarea>   
   <br/>
   <br/>
   <h4 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1px'}}>Lista de elementos a contener en el informe</h4>
   <h5 className='responsTitle'  style={{'display':'inline-block','marginBottom':'20px','letterSpacing':'-1px','marginTop':'6px'}}>Descripción:</h5>
   <input type='text' className='RendicionCuentaListaElementos_Descri' placeholder='Descripción'  style={{'minWidth':'20%','maxWidth':'20%','display':'inline-block','position':'relative','marginRight':'5px'}}/>  
   <input type='submit' className='responsAddButton' value='Agregar variable' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/> 
   <br/>  
   <br/>
   <table className='RendicionCuentaTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='RendicionCuentaHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='RendicionCuentaBody'></tbody>
   </table>
   {displayDeleteRecordButton && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'3px 0 3px 0'}} onClick={()=>{handleRecordRemove()}}/>}   
   <br/>
   {/* <br/>
   <h5 className='responsTitle'>Descripción general opcional:</h5>
   <textarea className='RendicionCuenta_SegundaDescripcionGeneral' placeholder='Descripción general opcional'></textarea>    */}
   <hr/>
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}