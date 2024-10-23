import {useState,useRef,useEffect} from 'react';
import ConfirmationModal from "../ConfirmationModal";
import './Forms.css'

export default function Documentos (props) {
  const [modalErrorData,setModalErrorData] = useState(false);
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

   fetch(`http://localhost:8000/${props.route}/`,{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({mode:mode, data})})
    .then(res=>res.json()) 
    .then(res=>{if(res){setConfirmationModal('Datos guardados correctamente');setModalErrorData(false)}})
  }

  // function handleDelete(){
  //   fetch(`http://localhost:8000/${props.route}/`,{
  //    method:'DELETE',
  //    headers:{'Content-Type':'application/json'},
  //    body:JSON.stringify({ID:props.updateElementId.current,mode:'delete'})})
  //    .then(()=>window.location.reload())
  //  }

  setTimeout(()=>{
    fetch(`http://localhost:8000/${props.route}/`,{
      method:'POST',
      'headers':{'Content-Type':'application/json'},
      body:JSON.stringify({'mode':'fillForm'})
    })
    .then((res)=>res.json())
    .then((res)=>{
      let departamento = document.getElementsByClassName('departamento')[0]
      let tipoDoc = document.getElementsByClassName('tipoDoc')[0]

      let dataIter = (containerElement,data,columnToDisplay)=>{
       for(let record of data){
        let option = document.createElement('option')

        Object.keys(record).includes(columnToDisplay)? option.innerText = record[columnToDisplay]:void 0
        if(containerElement){containerElement.appendChild(option)}  
      }
      if(containerElement){containerElement.value = ''}        
      }
       dataIter(tipoDoc,res.tipoDocumentoSelect,'Codificacion')
       dataIter(departamento,res.departamentoSelect,'Codigo')       
    })      
  },300)

    function handleSelect(e){
      let tipoDoc = document.getElementsByClassName('tipoDoc')[0]
      let codigoText = document.getElementsByClassName('codigoText')[0]
      let code = `${tipoDoc.value}-${e.target.value}`
      if(tipoDoc.value && e.target.value){
        fetch(`http://localhost:8000/${props.route}/`,{
          method:'POST',
          'headers':{'Content-Type':'application/json'},
          body:JSON.stringify({'mode':'requestCodeSequence',code})
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res.length){
            codigoText.value = `${code}-${res}`
          } else {codigoText.value = `${code}-001`}
        })         
      }}

    return (
      <div className='formCont' style={{'width':'35%','border':'1px solid gray','borderRadius':'5px','marginTop':'5px','backgroundColor':'rgb(227, 225, 225)'}}>
        <h1>Documentos</h1>
        <form id='documentos' onSubmit={(data)=>handleSend(data)}>
          <h3 style={{'margin':'0 0 0 3px'}}>Codigo:</h3>
          <h5 style={{'margin':'0 0 0 3px'}}>Tipo documento</h5>
          <select className='DocumentosReferencias_IDDocumentoSelect tipoDoc' required={true}></select>
          <br/>
          <h5 style={{'margin':'15px 0 0 3px'}}>Departamento</h5>
          <select className='DocumentosReferencias_IDDocumentoSelect departamento' onClick={(e)=>{handleSelect(e)}} required={true}></select>          
          <br/>  
          <input type='text' className='revAprobacionNombreInput codigoText' style={{'minWidth':'150px','margin':'15px 0 0 3px'}} readOnly={true} name='codigoText'/>
          <h3 style={{'margin':'25px 0 0 3px'}}>Descripciòn:</h3>
          <textarea required={true} maxLength='100' name='descripcion' style={{'border':'1px solid gray','borderRadius':'5px','width':'98.5%','height':'200px','margin':'0 0 0 3px'}} placeholder='Descripcion'></textarea>
          <br/>
          <h3 style={{'margin':'10px 0 0 3px'}}>Versiòn:</h3>
          <input type='number' required={false} maxLength='100' name='version' style={{'border':'1px solid gray','borderRadius':'5px','margin':'0 0 0 3px'}} step='.02'/>
          <br/>
          <h3 style={{'margin':'15px 0 0 3px'}}>Fecha:</h3>
          <input type='date' required={false} maxLength='100' name='fecha' style={{'border':'1px solid gray','borderRadius':'5px','margin':'0 0 0 3px'}}/>
          <br/>                    
          <input type='submit' value='Guardar' style={{'borderRadius':'5px','position':'relative', 'display':'block', 'border':'1px solid gray', 'fontWeight':'900','margin':'5px 0 0 3px'}} className='docRefAddButton'/>

          <input type='submit' value='Cerrar' style={{'borderRadius':'5px','position':'relative','display':'block','border':'1px solid gray', 'fontWeight':'900','margin':'5px 0 5px 3px'}} onClick={()=>props.setCreationForm('')} className='docRefAddButton'/>

          {/* <input type='submit' value='Borrar' onClick={()=>handleDelete()} name='deleteButton' className='deleteButton' style={{'borderRadius':'5px','position':'relative','display':'block','margin':'5px 0 5px 2px','border':'1px solid gray','fontWeight':'900','borderRadius':'5px'}}/>           */}
        </form>
        {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
         icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
        </svg>}/>}        


        {confirmationModal && <ConfirmationModal setConfirmationModal={setConfirmationModal} message={'Datos guardados correctamente'} 
         icon={<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg> } reload={'true'}/>}       
      </div>  
     )
}