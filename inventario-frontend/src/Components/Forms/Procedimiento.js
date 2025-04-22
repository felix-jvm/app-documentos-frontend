import './Forms.css'
import {useEffect,useRef,useState} from 'react';

export default function Procedimiento (props) {
 var selectedTableRecord = useRef(undefined)
 var documentCodes = useRef({})
 const tableRecordsNumber = useRef(props.procedData.specificData && props.procedData.specificData['DocumentosReferencias'] && 
 props.procedData.specificData['DocumentosReferencias'].length > 0)

 useEffect(() => {
  setTimeout(() => {
    let specificProcedCode = props.procedData.specificData && Object.keys(props.procedData.specificData).includes('Procedimiento_Codigo')?props.procedData.specificData['Procedimiento_Codigo']:false
    fetch(`http://${window.location.hostname}:8000/procedimiento/`,
      {
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'requestNonUsedCodes',specificProcedCode})
      })
      .then(data=>data.json())
      .then(data=>{
        let Procedimiento_CodigoSelect = document.getElementsByClassName('Procedimiento_CodigoSelect')[0]
        let Procedimiento_ObjetivoInput = document.getElementsByClassName('Procedimiento_ObjetivoInput')[0]      
        let Procedimiento_AlcanceInput = document.getElementsByClassName('Procedimiento_AlcanceInput')[0]
        for(let respons of data['procedimiento_Codigo']){
          documentCodes.current[respons.Codigo] = respons.Descripcion
          let option = document.createElement('option')
          option.innerText = `${respons.Codigo}`
          Procedimiento_CodigoSelect.appendChild(option)
        }
        if(props.procedData.specificData){
          Procedimiento_ObjetivoInput.value = props.procedData.specificData['Procedimiento_Objetivo']
          Procedimiento_AlcanceInput.value = props.procedData.specificData['Procedimiento_Alcance']         
          Procedimiento_CodigoSelect.value=props.procedData.specificData['Procedimiento_Codigo']
        } else {Procedimiento_CodigoSelect.value=''}
    })

    if(props.procedData.specificData && props.procedData.specificData['DocumentosReferencias']) {
      let tHead = document.getElementsByClassName('docRefHead')[0]
      let tBody = document.getElementsByClassName('docRefBody')[0]
      let columnSchema = ['Codigo']
      let th1 = document.createElement('th')
      th1.innerText = 'Codigo'
      tHead.appendChild(th1)
      for(let records of props.procedData.specificData['DocumentosReferencias']) {
       let trBody = document.createElement('tr')
       trBody.className = 'docRefTr'
       for(let column of columnSchema) {let td = document.createElement('td');td.innerText=records['IDDocumento'][0]?records['IDDocumento'][0][column]:void 0;trBody.appendChild(td)}
       trBody.value=records['ID']
       trBody.style.backgroundColor = 'white'
       trBody.style.fontWeight = '400'   
       trBody.addEventListener('click',(e)=>{
       if(e.target.parentElement.value){
        selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
       }else{selectedTableRecord.current = {'record':e.target.parentElement}}
       let trList = document.getElementsByClassName('docRefTr')
       for (let tr of trList){if(tr!=e.target.parentElement){
        setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} }           
       })        
       tBody.appendChild(trBody)
      } 
     } },250)
  setTimeout(()=>{
    fetch(`http://${window.location.hostname}:8000/procedimiento/`,
      {
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'fillForm'})
      })    
     .then(e => e.json())
     .then(data => {
     if(props.procedData.specificData && props.procedData.specificData.Procedimiento_Codigo){
       let displayDocument = document.getElementsByClassName('displayDocument')[0]
       displayDocument.innerText = documentCodes.current[props.procedData.specificData.Procedimiento_Codigo]
     }
     var DocumentosReferencias_IDDocumentoSelect = document.getElementsByClassName('DocumentosReferencias_IDDocumentoSelect')[0]
     for(let respons of data['DocumentosReferencias-IDDocumento']) {
      let option = document.createElement('option')
      option.value = `{"pk":"${respons['ID']}","Codigo":"${respons['Codigo']}"}`
      option.innerText = `${respons.Codigo} - ${respons.Descripcion}`
      DocumentosReferencias_IDDocumentoSelect.appendChild(option)
     }
     DocumentosReferencias_IDDocumentoSelect.value = ''
     })    
  },350) },[]) 
 
 function HandleAdd() {
    let DocumentosReferencias_IDDocumentoSelect = document.getElementsByClassName('DocumentosReferencias_IDDocumentoSelect')[0]
    let responsHead = document.getElementsByClassName('docRefHead')[0]    
    let responsBody = document.getElementsByClassName('docRefBody')[0]    
    let data = [DocumentosReferencias_IDDocumentoSelect]
    let columns = ['Codigo']
    var trHead = document.createElement('tr')
    var trBody = document.createElement('tr')
    trBody.className = 'docRefTr'
    trBody.style.backgroundColor = 'white'
    trBody.style.fontWeight = '400'
    trBody.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
      let trList = document.getElementsByClassName('docRefTr') 
      for (let tr of trList){if(tr!=e.target.parentElement){
       setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } })      
    let parsedOptionValue = DocumentosReferencias_IDDocumentoSelect.value?JSON.parse(DocumentosReferencias_IDDocumentoSelect.value):{}

    for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
          let td = document.createElement('td')
          let th = document.createElement('th')
          if(data[dataCounter].className.includes('ID') && data[dataCounter].value){td.innerText=JSON.parse(data[dataCounter].value)['Codigo']}else{td.innerText = data[dataCounter].value}
          th.innerText = columns[dataCounter]
          trBody.appendChild(td)
          trHead.appendChild(th)
        }
    props.backenData.current['DocumentosReferencias'].push({'IDDocumento':parsedOptionValue['pk'],'elementHtml':trBody.innerHTML})
    props.summaryData.current['DocumentosReferencias'][trBody.innerHTML] = {'Codigo':parsedOptionValue['Codigo']}       
    DocumentosReferencias_IDDocumentoSelect.value = ''
    responsBody.appendChild(trBody)
    !responsHead.children.length?responsHead.appendChild(trHead):void 0
 }

 useEffect((() => {
  if(props.senData){
   let Procedimiento_CodigoSelect = document.getElementsByClassName('Procedimiento_CodigoSelect')[0]
   let Procedimiento_ObjetivoInput = document.getElementsByClassName('Procedimiento_ObjetivoInput')[0]
   let Procedimiento_AlcanceInput = document.getElementsByClassName('Procedimiento_AlcanceInput')[0]
   props.backenData.current['Procedimiento_CodigoSelect'] = Procedimiento_CodigoSelect.value
   props.backenData.current['Procedimiento_ObjetivoInput'] = Procedimiento_ObjetivoInput.value
   props.backenData.current['Procedimiento_AlcanceInput'] = Procedimiento_AlcanceInput.value
  }}),[props.senData])

  function handleCodeClick(e) {
   let displayDocument = document.getElementsByClassName('displayDocument')[0]
   if(!e.target.value || !documentCodes.current[e.target.value]){displayDocument.style.visibility = 'hidden'} else {
    displayDocument.style.visibility = 'visible';
    displayDocument.innerText = documentCodes.current[e.target.value];
  }}
  
  function handleRecordRemove(){
    if(!selectedTableRecord.current){return}
    if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
     props.backenData.current['recordsToDelete'].push({'DocumentosReferencias':selectedTableRecord.current['recordToDeleteId']})
     Object.keys(props.summaryData.current['recordsToDelete']).includes('DocumentosReferencias')? props.summaryData.current['recordsToDelete']['DocumentosReferencias'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['DocumentosReferencias']=[selectedTableRecord.current['record']]
    }else{
      if(selectedTableRecord.current['record']){
       Object.keys(props.summaryData.current['DocumentosReferencias']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['DocumentosReferencias'][selectedTableRecord.current['record'].innerHTML]})():void 0
       for(let counter=0;counter<=props.backenData.current['DocumentosReferencias'].length-1;counter++){
        let currentRecordToCreate = props.backenData.current['DocumentosReferencias'][counter]
        if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['DocumentosReferencias'].splice(counter,1)}
      }}}   
    if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}  
    }

 return (
     <div className="procedCont">
      <p className='displayDocument' style={{'position':'relative','textAlign':'center','display':'block','width':'100%','fontSize':'3.4vh'}}></p>
      <h2 style={{'fontWeight':'900','letterSpacing':'-1.5px'}}>Procedimiento</h2>
      <br/>
      <h3 className='procedCodigoTitle' style={{'position':'relative','letterSpacing':'-1px','marginTop':'4px'}}>Código:</h3>
      <select className='Procedimiento_CodigoSelect' style={{'margin':'5px','position':'absolute'}} onClick={(e)=>{handleCodeClick(e)}}></select>

      <h3 className='procedObjetivoTitle' style={{'fontWeight':'900','letterSpacing':'-1px'}}>1. Objetivo:</h3>
      <textarea className='Procedimiento_ObjetivoInput' placeholder='Objetivo del procedimiento' style={{'marginLeft':'2px'}}></textarea>

      <h3 className='procedAlcanceTitle' style={{'fontWeight':'900','letterSpacing':'-1px'}}>2. Alcance:</h3>
      <textarea className='Procedimiento_AlcanceInput' placeholder='Alcance del procedimiento' style={{'marginLeft':'2px'}}></textarea>      
      <hr/>
      <h2 className='docRefTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>3. Documentos de referencias:</h2>      
      <h4 className='docRefDocumentoTitle' style={{'letterSpacing':'-1px','marginTop':'2px'}}>Documento:</h4>
      <select className='DocumentosReferencias_IDDocumentoSelect' style={{'minWidth':'21.9%','maxWidth':'21.9%','display':'inline-block','position':'relative','marginRight':'5px'}}></select>
      <input type='submit' className='docRefAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/>
      <br/>
      <br/>
      <table className='docRefTable'>
       <thead className='docRefHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
       <tbody className='docRefBody'></tbody>
      </table>
       {tableRecordsNumber.current && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'3px 0 3px 0'}} onClick={()=>{handleRecordRemove()}}/>}
      <br/>
      <hr/>
     </div>    
    )
 }