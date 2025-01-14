import {useState,useRef,useEffect} from 'react';
import ConfirmationModal from "../ConfirmationModal";
import './Forms.css'

export default function Documentos (props) {
  const [confirmationModal,setConfirmationModal] = useState(false);    
  function handleSend(obj) {
    var formData = obj.target
    obj.preventDefault()
    var data = {}
    let mode = ''
    data['Codigo'] = formData.codigoText.value
    data['Descripcion'] = formData.descripcion.value
    data['Version'] = formData.version.value
    data['Fecha'] = formData.fecha.value
    data['sequence'] = formData.codigoText.value

    props.callMode && props.callMode.current === 'update'? data['ID'] = props.updateElementId.current : void(0)

    if(props.callMode && props.callMode.current==='update') {
     props.callMode.current=null
     mode = 'update'
    } else {
     mode = 'create'
   } 

   fetch(`http://${window.location.hostname}:8000/${props.route}/`,{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({mode:mode, data})})
    .then(res=>res.json()) 
    .then(res=>{if(res){setConfirmationModal('Datos guardados correctamente')}})
  }

  // function handleDelete(){
  //   fetch(`http://${window.location.hostname}:8000/${props.route}/`,{
  //    method:'DELETE',
  //    headers:{'Content-Type':'application/json'},
  //    body:JSON.stringify({ID:props.updateElementId.current,mode:'delete'})})
  //    .then(()=>window.location.reload())
  //  }

  setTimeout(()=>{
    fetch(`http://${window.location.hostname}:8000/${props.route}/`,{
      method:'POST',
      'headers':{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'fillForm'})
    })
    .then((res)=>res.json())
    .then((res)=>{
      let departamento = document.getElementsByClassName('departamento')[0]
      let tipoDoc = document.getElementsByClassName('tipoDoc')[0]

      let dataIter = (containerElement,data,columnToDisplay,...optionalColumns)=>{
       for(let record of data){
        let option = document.createElement('option')
        Object.keys(record).includes(columnToDisplay)? option.innerText = optionalColumns.length?(()=>{return record[columnToDisplay]+' - '+record[optionalColumns[0]]})():(()=>{return record[columnToDisplay]})():void 0
        if(containerElement){containerElement.appendChild(option)}  
      }
      if(containerElement){containerElement.value = ''}        
      }
       dataIter(tipoDoc,res.tipoDocumentoSelect,'Codificacion','Descripcion')
       dataIter(departamento,res.departamentoSelect,'Codigo','Descripcion')       
    })      
  },300)

    function handleSelect(e){
      let tipoDoc = document.getElementsByClassName('tipoDoc')[0]
      let codigoText = document.getElementsByClassName('codigoText')[0]
      let code = `${tipoDoc.value.split('-')[0]}-${e.target.value.split('-')[0]}`
      if(tipoDoc.value && e.target.value){
        fetch(`http://${window.location.hostname}:8000/${props.route}/`,{
          method:'POST',
          'headers':{'Content-Type':'application/json'},
          body:JSON.stringify({'mode':'requestCodeSequence',code})
        })
        .then((res)=>res.json())
        .then((res)=>{if(res.length){codigoText.value = `${code}-${res}`}})         
      }}

    return (
      <div className='modalMainCont' style={{'backgroundColor':'rgba(1, 1, 1, 0.81)'}}>
        <h1 className='procedAlcanceTitle'>Documentos</h1>
        <form id='documentos' onSubmit={(data)=>handleSend(data)} style={{'width':'40%','minHeight':'850px','maxHeight':'850px','backgroundColor':'rgb(227, 225, 225)','margin':'0 auto 0 auto','borderRadius':'5px','position':'relative'}}>
          <h3>Codigo:</h3>
          <h5 style={{'margin':'0 0 0 2px'}}>Tipo documento</h5>
          <select className='DocumentosReferencias_IDDocumentoSelect tipoDoc' required={true} style={{'minWidth':'40%'}}></select>
          <br/>
          <h5 style={{'margin':'15px 0 0 2px'}}>Departamento</h5>
          <select className='DocumentosReferencias_IDDocumentoSelect departamento' onClick={(e)=>{handleSelect(e)}} required={true} style={{'minWidth':'40%'}}></select>          
          <br/>  
          <br/>
          <input type='text' className='DocumentosReferencias_IDDocumentoSelect codigoText' style={{'minWidth':'40%','border':'1px solid gray'}} readOnly={true} name='codigoText'/>
          <br/>
          <br/>
          <h3>Descripciòn:</h3>
          <textarea required={true} maxLength='100' className='Procedimiento_ObjetivoInput documentosDescription' name='descripcion' placeholder='Descripcion' style={{'margin':'0 0 0 1.5px'}}></textarea>
          <br/>
          <h3>Versiòn:</h3>
          <input type='number' required={false} maxLength='100' name='version' step='.02' className='DocumentosReferencias_IDDocumentoSelect' style={{'border':'1px solid gray'}}/>
          <br/>
          <h3 style={{'margin':'15px 0 0 3px'}}>Fecha:</h3>
          <input type='date' required={false} maxLength='100' name='fecha' className='HistorialCambios_FechaInput' style={{'margin':'0 0 0 3px'}}/>
          <br/>        
          <br/>            
          <input type='submit' value='Guardar' className='docRefAddButton' style={{'margin':'-10px 0 0 3px'}}/>
          <br/>
          <input type='submit' value='Cerrar' className='docRefAddButton' style={{'margin':'0 0 0 3px','padding':'2px 37px 2px 35px'}} onClick={()=>props.setCreationForm('')}/>
        </form>    
        {confirmationModal && <ConfirmationModal setConfirmationModal={setConfirmationModal} message={'Datos guardados correctamente'} 
         icon={<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg> } reload={'true'}/>}       
      </div>  
     )
}