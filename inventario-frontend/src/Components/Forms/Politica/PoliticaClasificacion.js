import '../Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function PoliticaClasificacion (props) {
 const [modalErrorData, setModalErrorData] = useState(false);
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false); 
 var errorDataref = useRef(false);
 var selectedTableRecord = useRef(undefined);
 useEffect(()=>{
  setTimeout(()=>{if(props.formsData.current['specificData']){
    let PoliticaClasificacionDescri = document.getElementsByClassName('PoliticaClasificacion_PoliticaClasificacionDescri')[0]
    PoliticaClasificacionDescri.innerText = props.formsData.current['specificData']['Politica']['ClasificacionPoliticaDescri']
    for(let record of props.formsData.current['specificData']['ClasificacionTipoMaterialPolitica']) {
      // let PoliticaClasificacion_Descri = document.getElementsByClassName('PoliticaClasificacion_Descri')[0]  
      // let PoliticaClasificacion_Categoria = document.getElementsByClassName('PoliticaClasificacion_Categoria')[0]
      // let PoliticaClasificacion_TipoMaterial = document.getElementsByClassName('PoliticaClasificacion_TipoMaterial')[0]
      let PoliticaClasificacionBody = document.getElementsByClassName('PoliticaClasificacionBody')[0]    
      let specificTrBodyRowSection = PoliticaClasificacionBody.children
      let td = document.createElement('td')
      let tr = document.createElement('tr')
      tr.className = 'PoliticaClasificacionTr'
      tr.style.fontWeight = '400'
      tr.addEventListener('click',(e)=>{
        selectedTableRecord.current = {'recordToDeleteId':record['ID'],'record':e.target.parentElement}
        let trList = document.getElementsByClassName('PoliticaClasificacionTr') 
        for (let tr of trList){if(tr!=e.target.parentElement){
        setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } } )
    
        td.innerText = record['Descripción']
        if(record['TipoMaterial'] == 'Plástico') {specificTrBodyRowSection = specificTrBodyRowSection[0]}
        else if(record['TipoMaterial'] == 'Cartón') {specificTrBodyRowSection = specificTrBodyRowSection[1]}
        else if(record['TipoMaterial'] == 'Metal') {specificTrBodyRowSection = specificTrBodyRowSection[2]}
        if(record['Categoria'] == 'Clasificación') {
        td.style.fontWeight = '900'       
        td.innerText = `● ${td.innerText}`
        specificTrBodyRowSection = specificTrBodyRowSection.children[1]}
        else if(record['Categoria'] == 'Especificaciones para compra') {
          td.innerText = `- ${td.innerText}`
          specificTrBodyRowSection = specificTrBodyRowSection.children[2]}
        td.style.minWidth = '23.5vw'
        td.style.maxWidth = '23.5vw'
        td.style.border = 'none'
        tr.appendChild(td)
        specificTrBodyRowSection.appendChild(tr) 
  }updateDeleteRecordButtonStatus()}},250) },[])

 useEffect((() => {  
  if(props.fullPoliticaData) {
   let PoliticaClasificacion_PoliticaClasificacionDescri = document.getElementsByClassName('PoliticaClasificacion_PoliticaClasificacionDescri')[0]    
   if(PoliticaClasificacion_PoliticaClasificacionDescri.value){
    props.backenData.current['Politica']['ClasificacionPoliticaDescri']=PoliticaClasificacion_PoliticaClasificacionDescri.value
   } } }),[props.fullPoliticaData])

function updateDeleteRecordButtonStatus() {
  let PoliticaClasificacionBody = document.getElementsByClassName('PoliticaClasificacionBody')[0]
  setDisplayDeleteRecordButton(PoliticaClasificacionBody && PoliticaClasificacionBody.children.length? true:false)
 }

 function HandleAdd() {
  let PoliticaClasificacion_Descri = document.getElementsByClassName('PoliticaClasificacion_Descri')[0]  
  let PoliticaClasificacion_Categoria = document.getElementsByClassName('PoliticaClasificacion_Categoria')[0]
  let PoliticaClasificacion_TipoMaterial = document.getElementsByClassName('PoliticaClasificacion_TipoMaterial')[0]
  let PoliticaClasificacionBody = document.getElementsByClassName('PoliticaClasificacionBody')[0]    
  if(!PoliticaClasificacion_TipoMaterial.value && !PoliticaClasificacion_Categoria.value){return}
  // let data = [PoliticaClasificacion_TipoMaterial,PoliticaClasificacion_Categoria,PoliticaClasificacion_Descri]
  // let columns = ['Tipo de material','Clasificación','Especificaciones para compra']
  // var trHead = document.createElement('tr')
  let specificTrBodyRowSection = PoliticaClasificacionBody.children
  let td = document.createElement('td')
  let tr = document.createElement('tr')
  tr.className = 'PoliticaClasificacionTr'
  tr.style.fontWeight = '400'
  tr.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
      selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}
    let trList = document.getElementsByClassName('PoliticaClasificacionTr') 
    for (let tr of trList){if(tr!=e.target.parentElement){
     setTimeout(()=>{tr.style.backgroundColor = 'rgb(222, 221, 221)'},50)} else {e.target.parentElement.style.backgroundColor = 'white'} } } )
  errorDataref.current = false

  if(!errorDataref.current) {
    td.innerText = PoliticaClasificacion_Descri.value
    if(PoliticaClasificacion_TipoMaterial.value == 'Plástico') {specificTrBodyRowSection = specificTrBodyRowSection[0]}
    else if(PoliticaClasificacion_TipoMaterial.value == 'Cartón') {specificTrBodyRowSection = specificTrBodyRowSection[1]}
    else if(PoliticaClasificacion_TipoMaterial.value == 'Metal') {specificTrBodyRowSection = specificTrBodyRowSection[2]}
    if(PoliticaClasificacion_Categoria.value == 'Clasificación') {
     td.style.fontWeight = '900'       
     td.innerText = `● ${td.innerText}`
     specificTrBodyRowSection = specificTrBodyRowSection.children[1]
    }
    else if(PoliticaClasificacion_Categoria.value == 'Especificaciones para compra') {
      td.innerText = `- ${td.innerText}`
      specificTrBodyRowSection = specificTrBodyRowSection.children[2]
    }
    td.style.minWidth = '23.5vw'
    td.style.maxWidth = '23.5vw'
    td.style.border = 'none'
    tr.appendChild(td)
    specificTrBodyRowSection.appendChild(tr)
 
   props.backenData.current['ClasificacionTipoMaterialPolitica'].push({
    'Categoria':PoliticaClasificacion_Categoria.value,
    'TipoMaterial':PoliticaClasificacion_TipoMaterial.value,
    'Descri':PoliticaClasificacion_Descri.value,
    'elementHtml':tr.innerHTML});
   props.summaryData.current['ClasificacionTipoMaterialPolitica'][tr.innerHTML] = {
    'Categoria':PoliticaClasificacion_Categoria.value,
    'TipoMaterial':PoliticaClasificacion_TipoMaterial.value,
    'Descri':PoliticaClasificacion_Descri.value,
}
   PoliticaClasificacion_Categoria.value = ''
   PoliticaClasificacion_TipoMaterial.value = ''
   PoliticaClasificacion_Descri.value = ''
  }
  // PoliticaClasificacionBody.appendChild(trBody)
  // !PoliticaClasificacionHead.children.length?PoliticaClasificacionHead.appendChild(trHead):void 0
  updateDeleteRecordButtonStatus()
 }

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'ClasificacionTipoMaterialPolitica':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('ClasificacionTipoMaterialPolitica')? props.summaryData.current['recordsToDelete']['ClasificacionTipoMaterialPolitica'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['ClasificacionTipoMaterialPolitica']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['ClasificacionTipoMaterialPolitica']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['ClasificacionTipoMaterialPolitica'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['ClasificacionTipoMaterialPolitica'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['ClasificacionTipoMaterialPolitica'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['ClasificacionTipoMaterialPolitica'].splice(counter,1)}
    }}}
  // if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].remove()}
  updateDeleteRecordButtonStatus()    
 }

 return (
  <div className="Sección_PoliticaClasificacion">
      <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>6. Política de clasificación por tipo de material aptos para la compra</h2>
    
      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción:</h5>      
      <textarea className='PoliticaClasificacion_PoliticaClasificacionDescri' placeholder='Descripción general' style={{'marginLeft':'2px'}}></textarea>

      <br/>
      <br/>

      <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-2px','marginTop':'2px'}}>Tipo de material:</h5>
      <select className='PoliticaClasificacion_TipoMaterial' style={{'minWidth':'20%','maxWidth':'20%','display':'inline-block','position':'relative','marginRight':'5px'}}>
       <option>Plástico</option>
       <option>Cartón</option>
       <option>Metal</option>
      </select>

      <input type='submit' className='docRefAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','marginLeft':'auto','padding':'4px 35px 4px 35px','borderRadius':'15px'}}/>

      <br/>
      <br/>

      <h5 className='responsTitle' style={{'display':'inline-block','letterSpacing':'-2px','marginTop':'2px'}}>Categoria:</h5>
      <select className='PoliticaClasificacion_Categoria' style={{'minWidth':'22.6%','maxWidth':'22.6%','display':'inline-block','position':'relative','marginRight':'5px'}}>
        <option>Clasificación</option>
        <option>Especificaciones para compra</option>
      </select>

      <br/>
      <br/>

      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción del tipo:</h5>      
      <textarea className='PoliticaClasificacion_Descri' placeholder='Descripción' style={{'marginLeft':'2px'}}></textarea>

      <br/>
      <br/>
      <table className='PoliticaClasificacionTable' style={{'border':'0','borderCollapse':'separate'}}>
       <thead className='PoliticaClasificacionHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}>
        <tr> 
         <th>Tipo de material</th>
         <th>Clasificación</th>
         <th>Especificaciones para compra</th>
        </tr> 
       </thead>
       <tbody className='PoliticaClasificacionBody'>
        <tr>
          <td>Plástico</td> 
          <td></td> 
          <td></td>
        </tr>
        <tr>
          <td>Cartón</td> 
          <td></td> 
          <td></td>
        </tr>
        <tr>
          <td>Metal</td> 
          <td></td> 
          <td></td>
        </tr>
       </tbody>
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