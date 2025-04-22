import '../Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function ObjetivoPolitica (props) {
 const [modalErrorData, setModalErrorData] = useState(false);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined); 
 useEffect(()=>{
  setTimeout(()=>{  
     let toFill = ['ObjetivoPolitica_CodigoPolitica','ObjetivoPolitica_DocumentosReferenciasPolitica']
     for(let elemName of toFill) {
     let htmlElem = document.getElementsByClassName(elemName)[0]
     for(let record of props.formsData.current[elemName]) {
      let option = document.createElement('option')
      option.value = `{"pk":"${record['ID']}","Descripcion":"${record['Descripcion']}"}`
      option.innerText = record['Codigo']   
      if(elemName=='ObjetivoPolitica_DocumentosReferenciasPolitica'){option.innerText = `${record['Codigo']}__${record['Descripcion']}`}
      htmlElem? htmlElem.appendChild(option):void 0    
      props.formsData.current['specificData'] && props.formsData.current['specificData']['Politica']['CodigoPolitica'] == record['ID']?
      option.selected=true:htmlElem.value = ''
     } }
     if(props.formsData.current['specificData']) {
      let ObjetivoDescri = document.getElementsByClassName('ObjetivoPolitica_ObjetivoDescri')[0]
      let AlcanceDescri = document.getElementsByClassName('ObjetivoPolitica_AlcanceDescri')[0]
      let tHead = document.getElementsByClassName('ObjetivoPoliticaHead')[0]
      let tBody = document.getElementsByClassName('ObjetivoPoliticaBody')[0]      
      ObjetivoDescri.innerText = props.formsData.current['specificData']['Politica']['ObjetivoDescri']
      AlcanceDescri.innerText = props.formsData.current['specificData']['Politica']['AlcanceDescri']

      for(let records of props.formsData.current['specificData']['DocumentosReferenciasPolitica']) {
        let columnSchema = ['Documentos']
        let trBody = document.createElement('tr')
        trBody.style.margin = '150px'
        trBody.className = 'ObjetivoPoliticaTr'
        if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID' && column!=='na'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
        for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
        trBody.value=records['ID']
        trBody.style.backgroundColor = 'white'
        trBody.style.fontWeight = '400'
        trBody.addEventListener('click',(e)=>{
        if(e.target.parentElement.value){
         selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
        }else{selectedTableRecord.current = {'record':e.target.parentElement}}
        let trList = document.getElementsByClassName('ObjetivoPoliticaTr') 
        for (let tr of trList){if(tr!=e.target.parentElement){
         setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }          
        })      
        tBody.appendChild(trBody)
       } 
      }
    updateDeleteRecordButtonStatus()
    },250) },[])
    
 useEffect((() => {  
  if(props.fullPoliticaData) {
   let ObjetivoPolitica_ObjetivoDescri = document.getElementsByClassName('ObjetivoPolitica_ObjetivoDescri')[0]
   let ObjetivoPolitica_AlcanceDescri = document.getElementsByClassName('ObjetivoPolitica_AlcanceDescri')[0]
   let ObjetivoPolitica_CodigoPolitica = document.getElementsByClassName('ObjetivoPolitica_CodigoPolitica')[0]    
   if(!ObjetivoPolitica_CodigoPolitica.value){
    setModalErrorData(`El campo Código de la politica es requerido.`)
    props.setFullPoliticaData(false)
  }else{props.backenData.current['Politica']['CodigoPolitica']=JSON.parse(ObjetivoPolitica_CodigoPolitica.value)['pk']}
   if(ObjetivoPolitica_ObjetivoDescri.value){props.backenData.current['Politica']['ObjetivoDescri']=ObjetivoPolitica_ObjetivoDescri.value}
   if(ObjetivoPolitica_AlcanceDescri.value){props.backenData.current['Politica']['AlcanceDescri']=ObjetivoPolitica_AlcanceDescri.value}
  } }),[props.fullPoliticaData])

function updateDeleteRecordButtonStatus() {
  let ObjetivoPoliticaBody = document.getElementsByClassName('ObjetivoPoliticaBody')[0]
  setDisplayDeleteRecordButton(ObjetivoPoliticaBody && ObjetivoPoliticaBody.children.length? true:false)
 }

 function HandleAdd() {
  let ObjetivoPolitica_DocumentosReferenciasPolitica = document.getElementsByClassName('ObjetivoPolitica_DocumentosReferenciasPolitica')[0]  
  let ObjetivoPoliticaHead = document.getElementsByClassName('ObjetivoPoliticaHead')[0]    
  let ObjetivoPoliticaBody = document.getElementsByClassName('ObjetivoPoliticaBody')[0]    
  let data = [ObjetivoPolitica_DocumentosReferenciasPolitica]
  if(!ObjetivoPolitica_DocumentosReferenciasPolitica.value){return}  
  let columns = ['Documentos']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'ObjetivoPoliticaTr' 
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('ObjetivoPoliticaTr') 
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
    if(!errorDataref.current){td.innerText=JSON.parse(data[dataCounter].value)['Descripcion'];trBody.appendChild(td)}
  }
  if(!errorDataref.current) {
   let parsedOptionValue = JSON.parse(ObjetivoPolitica_DocumentosReferenciasPolitica.value)
   props.backenData.current['DocumentosReferenciasPolitica'].push({'IDDocumento':parsedOptionValue['pk'],'elementHtml':trBody.innerHTML});
   props.summaryData.current['DocumentosReferenciasPolitica'][trBody.innerHTML] = {'Documento':parsedOptionValue['Descripcion']}
   ObjetivoPolitica_DocumentosReferenciasPolitica.value = '';
  }
  ObjetivoPoliticaBody.appendChild(trBody)
  !ObjetivoPoliticaHead.children.length?ObjetivoPoliticaHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'DocumentosReferenciasPolitica':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('DocumentosReferenciasPolitica')? props.summaryData.current['recordsToDelete']['DocumentosReferenciasPolitica'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['DocumentosReferenciasPolitica']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['DocumentosReferenciasPolitica']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['DocumentosReferenciasPolitica'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['DocumentosReferenciasPolitica'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['DocumentosReferenciasPolitica'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['DocumentosReferenciasPolitica'].splice(counter,1)}
    }}}
  // if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].remove()}
  updateDeleteRecordButtonStatus()    
 }

 return (
  <div className="Sección_ObjetivoPolitica">
      <h2 style={{'fontWeight':'900','letterSpacing':'-1.5px'}}>Politica</h2>
      <br/>
      <h4 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-2px','marginTop':'2px'}}>Código de la politica:</h4>
      <select className='ObjetivoPolitica_CodigoPolitica' style={{'minWidth':'15%','maxWidth':'15%'}}></select>
      <br/>
      <br/>
      <h3 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>1. Objetivo</h3>
      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción general:</h5>      
      <textarea className='ObjetivoPolitica_ObjetivoDescri' placeholder='Objetivo de la politica' style={{'marginLeft':'2px'}}></textarea>
      <br/>
      <h3 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>2. Alcance</h3>
      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción general:</h5>      
      <textarea className='ObjetivoPolitica_AlcanceDescri' placeholder='Alcance de la politica' style={{'marginLeft':'2px'}}></textarea>      
      <hr/>
      <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>3. Documentos de referencias</h2>    
      <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-2px','marginTop':'2px'}}>Documento:</h5>
      <select className='ObjetivoPolitica_DocumentosReferenciasPolitica' style={{'minWidth':'21.9%','maxWidth':'21.9%','display':'inline-block','position':'relative','marginRight':'5px'}}></select>
      <input type='submit' className='docRefAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/>
      <br/>
      <br/>
      <table className='ObjetivoPoliticaTable' style={{'border':'0','borderCollapse':'separate'}}>
       <thead className='ObjetivoPoliticaHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
       <tbody className='ObjetivoPoliticaBody'></tbody>
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