import {useRef,useState,useEffect, cloneElement} from 'react';
import './Forms.css';
import InlinePuesto from './InlineForms/InlinePuesto';

export default function RevAprobacion (props) {
  const [image, setImage] = useState(null);
  const [inlineForm,setInlineForm] = useState(false);
  var tableRecords = useRef(0);
  var personsCounter = useRef(0);
  var selectedTableRecord = useRef(undefined);
  var tablePersonsOrder = useRef(-1);
  var columnSchema = ['Elaborado por:','Revisado por:','Aprobado por:']; 

  useEffect(()=>{
    setTimeout(()=>{
      let revAprobTableHead = document.getElementsByClassName('RevAprobacionHead')[0] 
      let trHead = document.createElement('tr')
      let empty = document.createElement('th')
      let thNombre = document.createElement('th')
      let thFirma = document.createElement('th')
      let thPuesto = document.createElement('th')
  
      thNombre.innerText = 'Nombre'
      thFirma.innerText = 'Firma'
      thPuesto.innerText = 'Puesto'
  
      empty.style.width = '125px'
      trHead.appendChild(empty)
      trHead.appendChild(thNombre)
      trHead.appendChild(thFirma)
      trHead.appendChild(thPuesto)
    
      revAprobTableHead.appendChild(trHead)
      if(props.procedData.specificData && props.procedData.specificData['RevAprobacion']) {       
        let tBody = document.getElementsByClassName('RevAprobacionBody')[0]
        for(let columnCounter=0;columnCounter<=columnSchema.length-1;columnCounter++) {
         let trBody = document.createElement('tr')
         let tdPor = document.createElement('td')
         if(columnCounter<=props.procedData.specificData['RevAprobacion'].length-1){
          let personRecord = props.procedData.specificData['RevAprobacion'][columnCounter]
          tdPor.innerText = columnSchema[columnCounter]
          trBody.appendChild(tdPor)
          trBody.value = props.procedData.specificData['RevAprobacion'][props.procedData.specificData['RevAprobacion'].length-1]
          for(let personDetails of Object.values(personRecord)){let td = document.createElement('td');td.innerText=personDetails;trBody.appendChild(td)}
          trBody.style.fontWeight = '400'
          trBody.style.backgroundColor = 'rgb(250, 250, 250)'          
          trBody.addEventListener('mouseenter',(e)=>{e.target.style.backgroundColor = 'rgb(212, 208, 208)'})
          trBody.addEventListener('mouseleave',(e)=>{e.target.style.backgroundColor = 'rgb(250, 250, 250)'})
          trBody.addEventListener('click',(e)=>{
          if(e.target.parentElement.value){
           selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
          }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
          })             
          tablePersonsOrder.current+=1
          tBody.appendChild(trBody)
         }}}
    },250)},[])

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
         var Responsabilidades_IDPuestoSelect = document.getElementsByClassName('revAprobacionPuestoInput')[0]
         for(let respons of data['Puestos']) {
          let option = document.createElement('option')
          option.innerText = `${respons.Descripcion}`
          Responsabilidades_IDPuestoSelect.appendChild(option)
         }
         Responsabilidades_IDPuestoSelect.value = ''
        })},200)},[])    

  function handleImageUpload(event)  {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
  }}
  
  function handleImageClick() {if (image) {window.open(image, '_blank')}}
  
  function HandleAdd() {

    let revAprobacionNombreInput = document.getElementsByClassName('revAprobacionNombreInput')[0]
    let revAprobacionFirmaInput = document.getElementsByClassName('revAprobacionFirmaInput')[0] 
    let revAprobacionPuestoInput = document.getElementsByClassName('revAprobacionPuestoInput')[0]  
    let RevAprobacionBody = document.getElementsByClassName('RevAprobacionBody')[0]  
    let tr = document.createElement('tr')
    let personTd = document.createElement('td')    
    let data = [revAprobacionNombreInput,revAprobacionFirmaInput,revAprobacionPuestoInput]
    personTd.innerText = columnSchema[tablePersonsOrder.current]
    tr.appendChild(personTd)
    if((RevAprobacionBody.children && RevAprobacionBody.children.length >= 3)){return}
   if (personsCounter.current<=2){
    if(personsCounter.current===0) {
      props.backenData.current['RevAprobacion'][0].ElaboradoPor = revAprobacionNombreInput.value
      props.backenData.current['RevAprobacion'][0].FirmaElaborado = revAprobacionFirmaInput.value
      props.backenData.current['RevAprobacion'][0].PuestoElaborado = revAprobacionPuestoInput.value
    }
    else if(personsCounter.current===1) {
      props.backenData.current['RevAprobacion'][0].RevisadoPor = revAprobacionNombreInput.value
      props.backenData.current['RevAprobacion'][0].FirmaRevisado = revAprobacionFirmaInput.value
      props.backenData.current['RevAprobacion'][0].PuestoRevisado = revAprobacionPuestoInput.value
    }
    else if(personsCounter.current===2) {
      props.backenData.current['RevAprobacion'][0].AprobadoPor = revAprobacionNombreInput.value
      props.backenData.current['RevAprobacion'][0].FirmaAprobado = revAprobacionFirmaInput.value
      props.backenData.current['RevAprobacion'][0].PuestoAprobado = revAprobacionPuestoInput.value
    }}

    for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
      let personColumn = tablePersonsOrder[tablePersonsOrder.current]
      let td = document.createElement('td')
      td.style.backgroundColor = 'rgb(250, 250, 250)'
      td.innerText = data[dataCounter].value
      tr.appendChild(td)
      data[dataCounter].value = ''
      setImage('')    
    }
    tr.style.fontWeight = '400'
    tr.addEventListener('mouseenter',(e)=>{e.target.style.backgroundColor='rgb(212, 208, 208)'})
    tr.addEventListener('mouseleave',(e)=>{e.target.style.backgroundColor='rgb(250, 250, 250)'})
    tr.addEventListener('click',(e)=>{
      if(e.target.parentElement.value){
       selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
      }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
    })
    RevAprobacionBody.appendChild(tr)         
    tableRecords.current+=1
    personsCounter.current+=1
    if(tablePersonsOrder.current<=1){tablePersonsOrder.current+=1}      
    // props.backenData.current['RevAprobacion'][0]['empty']=false
   }
   
   function handleRecordRemove(){
    let revAprobacionBody = document.getElementsByClassName('RevAprobacionBody')[0]    
    if(!selectedTableRecord.current){return}
    if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
     props.backenData.current['recordsToDelete'].push({'RevAprobacion':selectedTableRecord.current['recordToDeleteId']})
    }else{
      if(selectedTableRecord.current['record']){
      //  let anyValue = true 
       for(let recordTd of selectedTableRecord.current['record'].children){
        if(recordTd){
          for(let recordKey of Object.keys(props.backenData.current['RevAprobacion'][0])){
            // if(props.backenData.current['RevAprobacion'][0][recordKey] == recordTd.innerText){if(Object.keys(props.backenData.current['RevAprobacion'][0]).includes(recordKey)){props.backenData.current['RevAprobacion'][0][recordKey]=''}}
            // if(props.backenData.current['RevAprobacion'][0][recordKey]){anyValue=false}  
          }
        }
       }
      //  if(anyValue){props.backenData.current['RevAprobacion'][0]['empty']=true}
    }
  }
    if(selectedTableRecord.current['record']){revAprobacionBody.removeChild(selectedTableRecord.current['record'])}       
    // if(!revAprobacionBody.children){props.backenData.current['RevAprobacion'][0]['empty']=true}
    if(tablePersonsOrder.current>0){tablePersonsOrder.current-=1}
    }

  function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

  return (
   <>
    <h2 style={{'fontWeight':'900'}}>9. Revisión y aprobación:</h2>
    <h4 className='revAprobacionNombreTitle AnexosNombreTitle'>Nombre:</h4>   
    <textarea className='revAprobacionNombreInput Anexos_NombreInput' placeholder='Nombre de la persona'></textarea>
    <br/>
    <br/>
    <h4 className='revAprobacionFirmaTitle'>Firma:</h4>   
    <input type="file" accept="image/*" onChange={handleImageUpload} className='revAprobacionFirmaInput revAprobacionFirmaFileInput' style={{'marginLeft':'3px'}}/>
     {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{ cursor: 'pointer', marginTop: '10px', maxWidth: '100px', maxHeight:'100px' }}
          onClick={handleImageClick}
          className='revAprobImg'
        />
      )}    
    <br/>
    <a className='inlineFormLabel' href='' onClick={(e)=>{handleDisplayInlineForm(e,'puestos','revAprobacionPuestoInput')}}>Crear nuevo puesto</a>
    <br/>
    <h4 className='revAprobacionPuestoTitle'>Puesto:</h4>   
    <select className='revAprobacionPuestoInput' style={{'marginTop':'1px'}}></select>
    <input type='submit' className='descripProcedAddButton revAprobAddRecordButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'position':'absolute','left':'30%'}}/>            
    <br/>
    <table className='RevAprobacionTable'>
     <thead className='RevAprobacionHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
     <tbody className='RevAprobacionBody'></tbody>
    </table>      
    <input type='submit' className='responsAddButton' value='Eliminar' style={{'display':'inline-block','position':'relative','margin':'10px 0 0 0'}} onClick={()=>{handleRecordRemove()}}/>
    <br/>
    <hr/>
   {inlineForm && ( (inlineForm.split(',')[0]=='puestos' && <InlinePuesto inlineForm={inlineForm} setInlineForm={setInlineForm}/>) )}    
   </> 
  )}