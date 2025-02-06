import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';
// import InlinePuesto from './InlineForms/InlinePuesto';

export default function Identificacion (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 const [inlineForm,setInlineForm] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 const tableRecordsNumber = useRef(props.formsData && props.formsData.specificData && props.formsData.specificData['Responsabilidades'] && 
  props.formsData.specificData['Responsabilidades'].length > 0)

 useEffect(() => {
  setTimeout(() => {
    fetch(`http://${window.location.hostname}:8000/procedimiento/`,
      {
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'fillForm'})
      })
    .then(e => e.json())
    .then(data => {
     var Responsabilidades_IDPuestoSelect = document.getElementsByClassName('Identificacion_IDPuestoSelectReporta')[0]
     for(let respons of data['Puestos']) {
      let option = document.createElement('option')
      option.value = `{"pk":"${respons['ID']}","Descripcion":"${respons['Descripcion']}"}`      
      option.innerText = `${respons.Descripcion}`
      Responsabilidades_IDPuestoSelect.appendChild(option)
     }
     Responsabilidades_IDPuestoSelect.value = ''
    }) 
    if(props.formsData && props.formsData.specificData && props.formsData.specificData['Responsabilidades']) {
     let tHead = document.getElementsByClassName('responsHead')[0]
     let tBody = document.getElementsByClassName('responsBody')[0]
     for(let records of props.formsData.specificData['Responsabilidades']) {
      let columnSchema = ['IDPuesto','Descripcion']
      let trBody = document.createElement('tr')
      trBody.className = 'ResponsTr'
      if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
      for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
      trBody.value=records['ID']
      trBody.style.backgroundColor = 'white'
      trBody.style.fontWeight = '400'
      trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}
      let trList = document.getElementsByClassName('ResponsTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
      })      
      tBody.appendChild(trBody)
     } }  },250)},[])

 function HandleAdd() {
  let Responsabilidades_IDPuestoSelect = document.getElementsByClassName('Responsabilidades_IDPuestoSelect')[0]
  let Responsabilidades_DescripcionInput = document.getElementsByClassName('Responsabilidades_DescripcionInput')[0]  
  let responsHead = document.getElementsByClassName('responsHead')[0]    
  let responsBody = document.getElementsByClassName('responsBody')[0]    
  let data = [Responsabilidades_IDPuestoSelect,Responsabilidades_DescripcionInput]
  let columns = ['Puesto','Responsabilidad']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'ResponsTr'  
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('ResponsTr') 
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
   let parsedOptionValue = JSON.parse(Responsabilidades_IDPuestoSelect.value)    
   props.backenData.current['Responsabilidades'].push({'IDPuesto':parsedOptionValue['pk'],'Descripcion':Responsabilidades_DescripcionInput.value,'elementHtml':trBody.innerHTML});
   props.summaryData.current['Responsabilidades'][trBody.innerHTML] = {'Puesto':parsedOptionValue['Descripcion'],'Descripcion':Responsabilidades_DescripcionInput.value}      
   Responsabilidades_IDPuestoSelect.value = '';
   Responsabilidades_DescripcionInput.value = '';
  }
  responsBody.appendChild(trBody)
  !responsHead.children.length?responsHead.appendChild(trHead):void 0
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'Responsabilidades':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('Responsabilidades')? props.summaryData.current['recordsToDelete']['Responsabilidades'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['Responsabilidades']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['Responsabilidades']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['Responsabilidades'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['Responsabilidades'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['Responsabilidades'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['Responsabilidades'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
  }

 function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

 return (
  <div className="Secciòn_Identificacion">
   <h2 style={{'fontWeight':'900'}}>Descripción De puesto</h2>    
   <br/>
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>1. Identificación:</h2>  
   {/* <a className='inlineFormLabel' href='' onClick={(e)=>{handleDisplayInlineForm(e,'puestos','Responsabilidades_IDPuestoSelect')}}>Crear nuevo puesto</a>   */}
   <br/>   
   <h4 className='responsPuestoTitle'>Código del puesto:</h4>
   <br/>
   <select className='Identificacion_IDDocSelect Responsabilidades_IDPuestoSelect' required={true}></select>
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Título del puesto:</h4>
   <br/>
   <select className='Identificacion_IDPuestoSelectTitulo Responsabilidades_IDPuestoSelect' required={true}></select>    
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Reporta a:</h4>
   <br/>
   <select className='Identificacion_IDPuestoSelectReporta Responsabilidades_IDPuestoSelect' required={true}></select>       
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Departamento:</h4>
   <br/>
   <select className='Identificacion_IDDepartamentoSelect Responsabilidades_IDPuestoSelect' required={true}></select>       
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Código del departamento:</h4>     
   <br/>
   <input type='text' className='Identificacion_CodigoDepar Anexos_NumInput' placeholder='Código del Departamento' readOnly={true}/>
   <br/>
   <br/>
   <h4 className='responsPuestoTitle'>Ubicación:</h4>     
   <br/>
   <input type='text' className='Identificacion_Ubicacion Anexos_NumInput' placeholder='Ubicación'/>    
   <br/>
   <hr/>
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>2. Objetivo del puesto</h2>
   <textarea className='Identificacion_ObjetivoPuesto Responsabilidades_DescripcionInput' placeholder='Objetivo del puesto'></textarea>
   <br/>   
   <h2 className='responsTitle' style={{'fontWeight':'900'}}>3. Organigrama</h2>
   <textarea className='Identificacion_OrganigramaDescri Responsabilidades_DescripcionInput' placeholder='Descripción del organigrama'></textarea>
   <br/>
   <h6 style={{'fontWeight':'900'}}>Archivo:</h6>
   <input type="file" 
//    onChange={handleImageUpload} 
   className='sameLineInput'/> 
      {/* {image && fichaTecnicaType === 'application/pdf'? (<embed src={image} type="application/pdf" width="90%" height="400" style={{'margin':'5px 0 4px 0'}} onClick={handleImageClick}/>):(
        image && (<img
            src={image}
            alt="Uploaded"
            style={{'display':'block','cursor':'pointer','margin': '5px 0 0 0','maxWidth':'100px','maxHeight':'100px' }}
            className='imageElement'
            onClick={handleImageClick}
   />) )}    */}
   <hr/>
   {/* {inlineForm && ( (inlineForm.split(',')[0]=='puestos' && <InlinePuesto inlineForm={inlineForm} setInlineForm={setInlineForm}/>) )}    */}
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}