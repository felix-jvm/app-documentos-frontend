import {useState} from 'react';
import ConfirmationModal from "../ConfirmationModal";
import './Forms.css'
import '../ConfirmationModal.css'

export default function Termino (props) {
  const [confirmationModal,setConfirmationModal] = useState(false); 
  function handleSend(obj) {
    obj.preventDefault()
    let formData = obj.target
    var data = {}
    let mode = ''
    data['Descripcion'] = formData.descripcion.value
    data['DescripcionGeneral'] = formData.descripciongeneral.value
 
    props.callMode && props.callMode.current === 'update'? data['ID'] = props.updateElementId.current : void(0)
 
    if(props.callMode && props.callMode.current==='update') {
     props.callMode.current=null
     mode = 'update'
    } else {
     mode = 'create'
   } 
   fetch(`http://localhost:9000/${props.route}/`,{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({mode:mode, data})})
     .then(res=>res.json()) 
     .then(res=>{if(res){setConfirmationModal('Datos guardados correctamente')}})
   } 

  function handleDelete(){
    fetch(`http://localhost:9000/${props.route}/`,{
     method:'DELETE',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({ID:props.updateElementId.current,mode:'delete'})})
     .then(()=>window.location.reload())}

    setTimeout(()=>{
      if(props.callMode && props.callMode.current==='update') {
        fetch(`http://localhost:9000/${props.route}/`,{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({mode:'requestUpdateData',ID:props.updateElementId})
        })
        .then((res)=>res.json())
        .then((res)=>{
         let parsedRes=JSON.parse(res)
         parsedRes=parsedRes.data
         let deleteButton = document.getElementsByClassName('deleteButton')[0];
         deleteButton? deleteButton.style.visibility = 'visible':void(0)
         for(let field of Object.entries(parsedRes)) {
          let tag = document.getElementsByName(field[0].toLowerCase())[0]
          tag? ((()=>{tag.value = field[1]}))() : void(0)
         }
        })} else {
         let deleteButton = document.getElementsByClassName('deleteButton')[0];
         deleteButton? deleteButton.style.visibility = 'hidden':void(0)    
        }      
    },250)

  fetch(`http://localhost:9000/${props.route}/`,{
    method:'POST',
    'headers':{'Content-Type':'application/json'},
    body:JSON.stringify({mode:'relations'})
  })
  .then((res)=>res.json())
  .then((res)=>{
    var parsedRes = JSON.parse(res)
    var relationsList = []
    var selects = document.getElementsByTagName('select')
    for(let selectElem of selects){
      relationsList.push(selectElem)
    }
    
      for(let relations of parsedRes.data.relations) {
        let relationTable = ''
        for(let option of relations) {
          Object.keys(option).includes('table')? relationTable = option.table.toLowerCase():void(0)
          var firstSelect = relationsList[0]
          var secondSelect = relationsList[1]
          var optionElement = document.createElement('option');

          if (firstSelect && relationTable.includes(firstSelect.name.replace('id',''))) {
            optionElement.innerText = Object.values(option)[0]
            firstSelect.appendChild(optionElement)
          } else if (secondSelect && relationTable.includes(secondSelect.name.replace('id',''))) {
            optionElement.innerText = Object.values(option)[0]
            secondSelect.appendChild(optionElement)            
          }
      }}
   })

    return (
      <div className="modalMainCont">
        <form id='termino' onSubmit={(data)=>handleSend(data)} style={{'width':'40%','minHeight':'800px','maxHeight':'800px','backgroundColor':'rgb(227, 225, 225)','margin':'50px auto 0 auto','borderRadius':'5px','position':'relative','box-shadow': '1px 1px 6px rgb(171, 163, 163)','paddingLeft':'5px'}}>
        <br/>          
          <h2 style={{'fontWeight':'900'}}>Crear nuevo termino</h2>
          <br/>
          <div style={{'width':'fit-content','height':'fit-content','float':'right','marginRight':'10px','marginBottom':'10px'}}>
          <input type='submit' value='Guardar' className='saveProcButton' style={{'display':'inline-block','position':'relative','top':'0','left':'0'}}/>
          <br/>
          <input type='submit' value='Cerrar' className='saveProcButton' style={{'display':'inline-block','position':'relative','top':'5px','left':'0'}} onClick={()=>props.setCreationForm?props.setCreationForm(''):props.setUpdateForm('')}/>                  
          </div>  
          <br/>
          <br/>                  
        <div style={{'display':'inline-block','position':'relative'}}><h3>Descripción</h3></div>
        <textarea required={true} maxLength='50' name='descripcion' placeholder='Descripción' className='Procedimiento_ObjetivoInput' style={{'border':'1px solid gray','margin':'-10px 0 5px 2px'}}></textarea>
        <h3>Descripción General</h3>
        <textarea required={false} maxLength='500' name='descripciongeneral' placeholder='Descripción general' className='Procedimiento_ObjetivoInput' style={{'border':'1px solid gray','margin':'-10px 0 5px 2px'}}></textarea>
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