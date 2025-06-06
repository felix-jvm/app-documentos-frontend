import { useRef,useState,useEffect } from "react"
import './Forms.css';
import ConfirmationModal from "../ConfirmationModal";

export default function DescripcionProcedimiento (props) {
 const [modalErrorData,setModalErrorData] = useState(false); 
 var errorDataref = useRef(false); 
 var selectedrecord = useRef('');
 var selectedTableRecord = useRef(undefined);
 const tableRecordsNumber = useRef(props.procedData.specificData && props.procedData.specificData['DescripcionesProcedimiento'] && 
  props.procedData.specificData['DescripcionesProcedimiento'].length > 0);
  const subTableRecordsNumber = useRef(props.procedData.specificData && props.procedData.specificData['SubDescripciones'] && 
    props.procedData.specificData['SubDescripciones'].length > 0);  

 useEffect(() => {
  setTimeout(() => {
  for(let tableCounter=0;tableCounter<=1;tableCounter++) {
    if(props.procedData.specificData && props.procedData.specificData['DescripcionesProcedimiento']) {
      if(tableCounter===0){
       var tHead = document.getElementsByClassName('descripProcedtHead')[0]
       var tBody = document.getElementsByClassName('descripProcedtbody')[0]
       for(let records of props.procedData.specificData['DescripcionesProcedimiento']) {
        let columnSchema = ['Descripcion']
        let trBody = document.createElement('tr')
        trBody.className = 'descripProcTr'        
        if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
        for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
        trBody.value=records['ID']
        trBody.style.backgroundColor = 'white'
        trBody.style.fontWeight = '400'
        trBody.addEventListener('click',(e)=>{
          if(e.target.parentElement.value){
           selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
          }else{selectedTableRecord.current = {'record':e.target.parentElement}}
          let trList = document.getElementsByClassName('descripProcTr')
          for (let tr of trList){if(tr!=e.target.parentElement){
            setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } })          
        tBody.appendChild(trBody)
       }}else{
       let tBody = document.getElementsByClassName('subtBody')[0]        
       let subDescripTable = document.getElementsByClassName('subDescripTable')[0] 
       subDescripTable.style.visibility = 'visible'
       for(let mainDescrip of Object.keys(props.procedData.specificData['SubDescripciones'])) {
        let columnSchema = ['mainDescription','SubDescripcion']
        let trBody = document.createElement('tr')
        trBody.className = 'descripProcTr'        
        for(let subDescripRecords of props.procedData.specificData['SubDescripciones'][mainDescrip]) {
         for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column=='mainDescription'?mainDescrip:subDescripRecords[column];trBody.appendChild(td);trBody.value=subDescripRecords['ID']}
        }
        trBody.style.backgroundColor = 'white'
        trBody.style.fontWeight = '400'
        trBody.addEventListener('click',(e)=>{
          if(e.target.parentElement.value){
           selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
          }else{selectedTableRecord.current = {'record':e.target.parentElement}}
          let trList = document.getElementsByClassName('descripProcTr')
          for (let tr of trList){if(tr!=e.target.parentElement){
            setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } })         
        tBody.appendChild(trBody)
       }
       if(props.procedData.specificData['DescripcionesProcedimiento']){let subDescripButton=document.getElementsByClassName('subDescripProcedAddButton')[0];subDescripButton.style.display='block'}       
      }}          
  }
  },250)},[])

 function HandleAdd() {
  let DescripcionesProcedimiento_DescripcionInput = document.getElementsByClassName('DescripcionesProcedimiento_DescripcionInput')[0]  
  let responsHead = document.getElementsByClassName('descripProcedtHead')[0]    
  let responsBody = document.getElementsByClassName('descripProcedtbody')[0]    
  let data = [DescripcionesProcedimiento_DescripcionInput]
  let columns = ['Descripciòn']
  var trHead = document.createElement('tr')
  var trBody = document.createElement('tr')
  trBody.className = 'descripProcTr'
  trBody.style.backgroundColor = 'white'
  trBody.style.fontWeight = '400'  
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
     selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('descripProcTr')
    for (let tr of trList){if(tr!=e.target.parentElement){
      setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } })  
  let subDescripAddbutton = document.getElementsByClassName('subDescripProcedAddButton')[0]
  errorDataref.current = false

  for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
    let td = document.createElement('td');
    let th = document.createElement('th');
    th.innerText = columns[dataCounter];    
    trHead.appendChild(th)
    if(data[dataCounter].required && !data[dataCounter].value) {
      setModalErrorData(`El campo ${data[dataCounter].className.split('_')[1].replace('Input','').replace('Select','').replace('ID','')} de la Secciòn_Descripciòn_del_Procedimiento es requerido.`);
      errorDataref.current = true;
      trBody.innerHTML = '';
    }
    if(!errorDataref.current){td.innerText = data[dataCounter].value;trBody.appendChild(td)}
  }

  if(!errorDataref.current) {
    props.backenData.current['DescripcionesProcedimiento'].push({'Descripcion':DescripcionesProcedimiento_DescripcionInput.value,'elementHtml':trBody.innerHTML});
    props.summaryData.current['DescripcionesProcedimiento'][trBody.innerHTML] = {'Descripcion':DescripcionesProcedimiento_DescripcionInput.value}     
    DescripcionesProcedimiento_DescripcionInput.value = '';
   }  
  responsBody.appendChild(trBody)
  !responsHead.children.length?responsHead.appendChild(trHead):void 0
  subDescripAddbutton.style.display = 'inline-block'
 }  

 function addSubRecord() {

  let descripProcedTable = document.getElementsByClassName('descripProcedTable')[0]
  let subDescripAddbutton = document.getElementsByClassName('subDescripProcedAddButton')[0];
  let DescripcionesProcedimiento_DescripcionInput = document.getElementsByClassName('DescripcionesProcedimiento_DescripcionInput')[0];
  let subtBody = document.getElementsByClassName('subtBody')[0];
  let subDescripTable = document.getElementsByClassName('subDescripTable')[0];
  // let subDescripCodigoTitle = document.getElementsByClassName('subDescripCodigoTitle')[0];
  // let SubDescripciones_CodigoInput = document.getElementsByClassName('SubDescripciones_CodigoInput')[0];
  // subDescripCodigoTitle.setAttribute('required',true);
  errorDataref.current = false

  subDescripAddbutton.value === 'Guardar subregistro'? (() => {   
   subDescripTable.style.visibility = 'visible'
  //  let codigotd = document.createElement('td')
   let mainDescriptd = document.createElement('td')
   let subDescriptd = document.createElement('td')
   let tr = document.createElement('tr')
   tr.style.backgroundColor = 'white'
   tr.style.fontWeight = '400'   
   tr.addEventListener('click',(e)=>{
     if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
     }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
   })  
  //  if(!selectedrecord.current || !SubDescripciones_CodigoInput.value){
    if(!selectedrecord.current){
    // (!SubDescripciones_CodigoInput.value && setModalErrorData(`El campo ${SubDescripciones_CodigoInput.className.split('_')[1].replace('Input','').replace('Select','').replace('ID','')} de la Secciòn_Descripciòn_del_Procedimiento es requerido.`)) ||
    (!selectedrecord.current && setModalErrorData(`Debe elegir una descripción principal para poder crear una sub-descripción.`));
    return;
  }
  mainDescriptd.innerText = `${selectedrecord.current}`
  subDescriptd.innerText = `${DescripcionesProcedimiento_DescripcionInput.value}`
  //  codigotd.innerText = SubDescripciones_CodigoInput.value
  //  tr.appendChild(codigotd)
   tr.appendChild(mainDescriptd)
   tr.appendChild(subDescriptd)
   subtBody.appendChild(tr)
  //  Object.keys(props.backenData.current['SubDescripciones']).includes(selectedrecord.current)? (() => {
  //   props.backenData.current['SubDescripciones'][selectedrecord.current].push({'Codigo':SubDescripciones_CodigoInput.value,'SubDescripcion':DescripcionesProcedimiento_DescripcionInput.value,'elementHtml':tr.innerHTML}) 
  //  })():props.backenData.current['SubDescripciones'][selectedrecord.current] = [{'Codigo':SubDescripciones_CodigoInput.value,'SubDescripcion':DescripcionesProcedimiento_DescripcionInput.value,'elementHtml':tr.innerHTML}]
  //  props.summaryData.current['SubDescripciones'][tr.innerHTML] = {'codigo':SubDescripciones_CodigoInput,'mainDescription':selectedrecord.current,'subDescription':DescripcionesProcedimiento_DescripcionInput.value} 
  Object.keys(props.backenData.current['SubDescripciones']).includes(selectedrecord.current)? (() => {
    props.backenData.current['SubDescripciones'][selectedrecord.current].push({'SubDescripcion':DescripcionesProcedimiento_DescripcionInput.value,'elementHtml':tr.innerHTML}) 
   })():props.backenData.current['SubDescripciones'][selectedrecord.current] = [{'SubDescripcion':DescripcionesProcedimiento_DescripcionInput.value,'elementHtml':tr.innerHTML}]
   props.summaryData.current['SubDescripciones'][tr.innerHTML] = {'mainDescription':selectedrecord.current,'subDescription':DescripcionesProcedimiento_DescripcionInput.value}  
   DescripcionesProcedimiento_DescripcionInput.value = ''
  //  SubDescripciones_CodigoInput.value = ''
   selectedrecord.current = ''
   let descripProcTrList = document.getElementsByClassName('descripProcTr')
   for(let tr of descripProcTrList){tr.style.backgroundColor = 'white'}
  })():void 0

  descripProcedTable.addEventListener('click',(e => {selectedrecord.current = e.target.innerText}))
  subDescripAddbutton.value = 'Guardar subregistro'
  // subDescripCodigoTitle.style.visibility = 'visible'
  // SubDescripciones_CodigoInput.style.visibility = 'visible'
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'DescripcionesProcedimiento':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('DescripcionesProcedimiento')? props.summaryData.current['recordsToDelete']['DescripcionesProcedimiento'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['DescripcionesProcedimiento']=[selectedTableRecord.current['record']]
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['DescripcionesProcedimiento']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['DescripcionesProcedimiento'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['DescripcionesProcedimiento'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['DescripcionesProcedimiento'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['DescripcionesProcedimiento'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
  } 
  
  function handleSubRecordRemove(){
    if(!selectedTableRecord.current){return}
    if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
     props.backenData.current['recordsToDelete'].push({'SubDescripciones':selectedTableRecord.current['recordToDeleteId']})
     Object.keys(props.summaryData.current['recordsToDelete']).includes('SubDescripciones')? props.summaryData.current['recordsToDelete']['SubDescripciones'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['SubDescripciones']=[selectedTableRecord.current['record']]     
    }else{
      if(selectedTableRecord.current['record']){
        Object.keys(props.summaryData.current['SubDescripciones']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['SubDescripciones'][selectedTableRecord.current['record'].innerHTML]})():void 0        
       for(let counter=0;counter<=props.backenData.current['SubDescripciones'].length-1;counter++){
        let currentRecordToCreate = props.backenData.current['SubDescripciones'][counter]
        if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['SubDescripciones'].splice(counter,1)}
      }}}
    if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
    }

 return (
  <div className="descripProcedCont"> 
   <h2 className='descripProcedTitle' style={{'marginBottom':'6px','fontWeight':'900','letterSpacing':'-1.7px'}}>6. Desarrollo o descripción del procedimiento:</h2>

   {/* <h4 className='subDescripCodigoTitle' style={{'marginTop':'0','visibility':'hidden'}}>Còdigo:</h4>    */}
   {/* <textarea className='SubDescripciones_CodigoInput' placeholder='Còdigo de la subdescripciòn' style={{'marginTop':'0','visibility':'hidden'}}></textarea> */}

   <h4 className='descripProcedDescripciònTitle' style={{'letterSpacing':'-1.7px','display':'inline-block','position':'relative'}}>Descripción:</h4>
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','margin':'0 0 5px 5px','padding':'4px 35px 4px 30px','borderRadius':'15px'}}/>   
   <textarea className='DescripcionesProcedimiento_DescripcionInput' placeholder='Descripción o Subdescripción' required={true}></textarea>
   <br/>
   <br/>
   <table className='descripProcedTable' style={{'border':'0','borderCollapse':'separate'}}>
    <thead className='descripProcedtHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='descripProcedtbody'></tbody>
   </table>
   {tableRecordsNumber.current && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'2px 0 3px 0','position':'relative'}} onClick={()=>{handleRecordRemove()}}/>}
   <br/>
   <br/>
   <input type='submit' className='subDescripProcedAddButton' value='Agregar subregistro' style={{'display':'none','position':'relative','margin':'0 0 0 100px','padding':'6px 33px 6px 35px','borderRadius':'15px'}} onClick={()=>{addSubRecord()}}/>   
   <table className='subDescripTable' style={{'margin':'15px 0 3px 100px','visibility':'hidden','border':'0.5px solid black','border':'0','borderCollapse':'separate'}}>
    <thead className='subtHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}> 
      <tr>
        <th>Descripción principal</th>
        <th>Subdescripción</th>
      </tr>
      </thead>
    <tbody className='subtBody'></tbody>
   </table>
   {subTableRecordsNumber.current && <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'0 0 3px 0',}} onClick={()=>{handleSubRecordRemove()}}/>}
   <br/>
   <hr/>   
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}    
  </div>   
 )
}