import {useState} from 'react';
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

   fetch(`http://${window.location.hostname}:9000/${props.route}/`,{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({mode:mode, data})})
    .then(res=>res.json()) 
    .then(res=>{if(res){setConfirmationModal('Datos guardados correctamente')}})
  }

  // if(props.callMode && props.callMode.current==='update') {
  //   fetch(`http://${window.location.hostname}:9000/${props.route}/`,{
  //    method:'POST',
  //    headers:{'Content-Type':'application/json'},
  //    body:JSON.stringify({mode:'requestUpdateData',ID:props.updateElementId})
  //   })
  //   .then((res)=>res.json())
  //   .then((res)=>{
  //    let parsedRes=JSON.parse(res)
  //    parsedRes=parsedRes.data
  //    let deleteButton = document.getElementsByClassName('deleteButton')[0];
  //    deleteButton? deleteButton.style.visibility = 'visible':void(0)
  //    for(let field of Object.entries(parsedRes)) {
  //     let tag = document.getElementsByName(field[0].toLowerCase())[0]
  //     tag? ((()=>{tag.value = field[1]}))() : void(0)
  //    }
  //   })} else {
  //    let deleteButton = document.getElementsByClassName('deleteButton')[0];
  //    deleteButton? deleteButton.style.visibility = 'hidden':void(0)    
  //   }

  // function handleDelete(){
  //   fetch(`http://${window.location.hostname}:9000/${props.route}/`,{
  //    method:'DELETE',
  //    headers:{'Content-Type':'application/json'},
  //    body:JSON.stringify({ID:props.updateElementId.current,mode:'delete'})})
  //    .then(()=>window.location.reload())
  //  }

  setTimeout(()=>{
    fetch(`http://${window.location.hostname}:9000/${props.route}/`,{
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
      let code = `${tipoDoc.value.split('-')[0].trim()}-${e.target.value.split('-')[0].trim()}`
      if(tipoDoc.value && e.target.value){
        fetch(`http://${window.location.hostname}:9000/${props.route}/`,{
          method:'POST',
          'headers':{'Content-Type':'application/json'},
          body:JSON.stringify({'mode':'requestCodeSequence',code})
        })
        .then((res)=>res.json())
        .then((res)=>{if(res.length){codigoText.value = `${code}-${res}`}})         
      }}

    return (
      <div className='modalMainCont' style={{'minWidth':'100%','overflowY':'auto'}}>
        <form id='documentos' onSubmit={(data)=>handleSend(data)} style={{'width':'40%','minHeight':'990px','maxHeight':'990px','backgroundColor':'rgb(227, 225, 225)','margin':'50px auto 0 auto','borderRadius':'5px','position':'relative','boxShadow': '1px 1px 6px rgb(171, 163, 163)','paddingLeft':'5px'}}>
          <br/>          
          <h2 style={{'fontWeight':'900'}}>Crear nuevo documento</h2>
          <br/>
          <br/>
          <br/>
          <div style={{'width':'fit-content','height':'fit-content','float':'right','marginRight':'10px'}}>
          <input type='submit' value='Guardar' className='saveProcButton' style={{'display':'inline-block','position':'relative','top':'0','left':'0'}}/>
          <br/>
          <input type='submit' value='Cerrar' className='saveProcButton' style={{'display':'inline-block','position':'relative','top':'5px','left':'0'}} onClick={()=>props.setCreationForm?props.setCreationForm(''):props.setUpdateForm('')}/>                  
          </div>
          <div style={{'display':'inline-block','margin':'0','width':'fit-content'}}><h3>Código:</h3></div>
          <br/>
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
          <h3>Descripción:</h3>
          <textarea required={true} maxLength='100' className='Procedimiento_ObjetivoInput documentosDescription' name='descripcion' placeholder='Descripción' style={{'margin':'0 0 0 1.5px'}}></textarea>
          <br/>
          <h3>Versión:</h3>
          <input type='number' required={false} maxLength='100' name='version' placeholder='Versión' className='DocumentosReferencias_IDDocumentoSelect' style={{'border':'1px solid gray'}}/>
          <br/>
          <h3 style={{'margin':'15px 0 0 3px'}}>Fecha:</h3>
          <input type='date' required={false} maxLength='100' name='fecha' className='HistorialCambios_FechaInput' style={{'margin':'0 0 0 3px'}}/>
          <br/>        
          <br/>            
        </form>   
        {confirmationModal && <ConfirmationModal setConfirmationModal={setConfirmationModal} message={'Datos guardados correctamente'} 
         icon={<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg> } reload={'true'}/>}       
      </div>  
     )
}