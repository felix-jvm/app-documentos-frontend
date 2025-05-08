import {useRef,useState,useEffect, cloneElement} from 'react';
import './Forms.css';
import InlinePuesto from './InlineForms/InlinePuesto';

export default function RevAprobacion (props) {
  const [image, setImage] = useState(null);
  const [archive, setArchive] = useState(null);
  const [inlineForm,setInlineForm] = useState(false);
  const formData = new FormData();
  let revAprobacionBackendData = useRef({});
  let selectedDocumentKey = useRef('');
  let imagesPropMapping = useRef({});
  let rowMapping = {'Elaborado por':0,'Revisado por':1,'Aprobado por':2,'Elaborado':0,'Revisado':1,'Aprobado':2}
  let columnMapping = {'Nombre':1,'Firma':2,'Puesto':3,'por':1}

  useEffect(() => {
      setTimeout(() => {
        selectedDocumentKey.current=document.getElementsByClassName(`${props.documentCodeSelectName}`)[0]
        if(props.keyLocation=='select') {
          selectedDocumentKey.current=JSON.parse(selectedDocumentKey.current.value)['pk']
        } else if(props.keyLocation=='option') {
          selectedDocumentKey.current=selectedDocumentKey.current.children[selectedDocumentKey.current.selectedIndex].id
        }
        fetch(`http://${window.location.hostname}:8000/revaprobacion/`,{
          'method':'POST',
          'headers':{'Content-Type':'application/json'},
          'body':JSON.stringify({'mode':'requestRecord','documentKey':selectedDocumentKey.current,'formName':props.formName})
         })
        .then(e => e.json())
        .then(data => {
         let revAprobacionBody = document.getElementsByClassName('RevAprobacionBody')[0]
         let revAprobacionPuestoInput = document.getElementsByClassName('revAprobacionPuestoInput')[0]
         let revAprobacionSeccionInput = document.getElementsByClassName('revAprobacionSeccionInput')[0]
         let revAprobacionApartadoEspecificoInput = document.getElementsByClassName('revAprobacionApartadoEspecificoInput')[0]
         for(let puestoRecord of data.payload['Puestos']) {
          let option = document.createElement('option')
          option.innerText = puestoRecord['Descripcion']
          revAprobacionPuestoInput.appendChild(option)
         }
         if(data.payload['revAprobacion']) {
          for(let revAprobSection of Object.keys(data.payload['revAprobacion'])) {
           const [action,name] = revAprobSection.split(' ')
           let specificTd = revAprobacionBody.children[ rowMapping[action] ]
           specificTd = specificTd.children[ columnMapping[name] ]
           specificTd.innerText = data.payload['revAprobacion'][`${action} ${name}`]
         }}
         revAprobacionPuestoInput.value = ''
         revAprobacionSeccionInput.value = ''
         revAprobacionApartadoEspecificoInput.value = ''
        })
        fetch(`http://${window.location.hostname}:8000/revaprobacion/`,{
          'method':'POST',
          'headers':{'Content-Type':'application/json'},
          'body':JSON.stringify({'mode':'requestFirmaElaboradoFile','documentKey':selectedDocumentKey.current,'formName':props.formName})
         })
         .then(e => e.blob())
         .then(data => {
          if(data.size > 100) {
            let imageFilerow = document.getElementsByClassName('RevAprobacionBody')[0].children[0]
            let imageFileColumn = imageFilerow.children[2]
            let imageTag = imageFileColumn.children[0]
            let imageFileUrl = URL.createObjectURL(data)
            imageTag.src = imageFileUrl
          } })

         fetch(`http://${window.location.hostname}:8000/revaprobacion/`,{
          'method':'POST',
          'headers':{'Content-Type':'application/json'},
          'body':JSON.stringify({'mode':'requestFirmaRevisadoFile','documentKey':selectedDocumentKey.current,'formName':props.formName})
         })
         .then(e => e.blob())
         .then(data => {
          if(data.size > 100) {
            let imageFilerow = document.getElementsByClassName('RevAprobacionBody')[0].children[1]
            let imageFileColumn = imageFilerow.children[2]
            let imageTag = imageFileColumn.children[0]
            let imageFileUrl = URL.createObjectURL(data)
            imageTag.src = imageFileUrl
          } })
         
         fetch(`http://${window.location.hostname}:8000/revaprobacion/`,{
          'method':'POST',
          'headers':{'Content-Type':'application/json'},
          'body':JSON.stringify({'mode':'requestFirmaAprobadoFile','documentKey':selectedDocumentKey.current,'formName':props.formName})
         })
         .then(e => e.blob())
         .then(data => {
          if(data.size > 100) {
            let imageFilerow = document.getElementsByClassName('RevAprobacionBody')[0].children[2]
            let imageFileColumn = imageFilerow.children[2]
            let imageTag = imageFileColumn.children[0]
            let imageFileUrl = URL.createObjectURL(data)
            imageTag.src = imageFileUrl
          } }) },500) },[])
  
  useEffect(() => {
   if(props.fullData) {
    revAprobacionBackendData.current['FormName'] = props.formName
    revAprobacionBackendData.current['DocumentKey'] = selectedDocumentKey.current
    fetch(`http://${window.location.hostname}:8000/revaprobacion/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        'body':JSON.stringify({'mode':'saveRecord','documentKey':selectedDocumentKey.current,'formName':props.formName,'payload':revAprobacionBackendData.current})
    })
    setTimeout(() => {
     for(let key of Object.keys(imagesPropMapping.current)) {formData.append(`${key}`,imagesPropMapping.current[key])}
     formData.append('formName',props.formName)
     formData.append('documentKey',selectedDocumentKey.current)
     formData.append('mode','saveImageFile')
     fetch(`http://${window.location.hostname}:8000/revaprobacion/`,{
      method:'POST',
      body:formData
   }) },600) } },[props.fullData])

  function handleImageUpload(event)  {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setArchive(file);
  }}
  
  function HandleAdd() {
    let revAprobacionSeccionInput = document.getElementsByClassName('revAprobacionSeccionInput')[0]
    let revAprobacionApartadoEspecificoInput = document.getElementsByClassName('revAprobacionApartadoEspecificoInput')[0]
    if(!revAprobacionSeccionInput.value && !revAprobacionApartadoEspecificoInput.value){return}
    let revAprobacionPuestoInput = document.getElementsByClassName('revAprobacionPuestoInput')[0]
    let revAprobacionFirmaInput = document.getElementsByClassName('revAprobacionFirmaInput')[0]
    let revAprobacionDescripcion = document.getElementsByClassName('revAprobacionDescripcion')[0]
    let RevAprobacionBody = document.getElementsByClassName('RevAprobacionBody')[0]
    let tdToModify = RevAprobacionBody.children[ rowMapping[revAprobacionSeccionInput.value] ].children[ columnMapping[revAprobacionApartadoEspecificoInput.value] ]
    switch(revAprobacionApartadoEspecificoInput.value) {
      case 'Nombre':
        tdToModify.innerText = revAprobacionDescripcion.value
        revAprobacionBackendData.current[tdToModify.id] = revAprobacionDescripcion.value
        break
      case 'Firma':
        tdToModify.children[0].src = image
        imagesPropMapping.current[`${tdToModify.id}`] = archive
        break
      case 'Puesto':
        tdToModify.innerText = revAprobacionPuestoInput.value
        revAprobacionBackendData.current[tdToModify.id] = revAprobacionPuestoInput.value
        break
    } 
    revAprobacionApartadoEspecificoInput.value = ''
    revAprobacionSeccionInput.value = ''
    revAprobacionPuestoInput.value = ''
    revAprobacionFirmaInput.src = ''
}

  function handleApartadoEspecificoChange(e) {
    if(e.target.value) {
     let revAprobacionFirmaDiv = document.getElementsByClassName('revAprobacionFirmaDiv')[0]
     let revAprobacionPuestoDiv = document.getElementsByClassName('revAprobacionPuestoDiv')[0]
     let revAprobacionDescripcion = document.getElementsByClassName('revAprobacionDescripcion')[0]
     let RevAprobacionDescripBreaker = document.getElementsByClassName('RevAprobacionDescripBreaker')[0]
     switch(e.target.value) {
      case 'Puesto':
        revAprobacionPuestoDiv.style.display = 'block'
        revAprobacionFirmaDiv.style.display = 'none'
        RevAprobacionDescripBreaker.style.display = 'block'
        revAprobacionDescripcion.disabled = true
        break
      case 'Firma':
        revAprobacionPuestoDiv.style.display = 'none'
        revAprobacionFirmaDiv.style.display = 'block'
        RevAprobacionDescripBreaker.style.display = 'block'
        revAprobacionDescripcion.disabled = true
        break
      case 'Nombre':
        revAprobacionPuestoDiv.style.display = 'none'
        revAprobacionFirmaDiv.style.display = 'none'
        RevAprobacionDescripBreaker.style.display = 'none'
        revAprobacionDescripcion.disabled = false
        break        
      default:
        void 0
        break
     }
     revAprobacionDescripcion.value = ''
    } }

  function handleDisplayInlineForm(e,route,element) {e.preventDefault();setInlineForm(`${route},${element}`)}  

  return (
   <>
    <h2 style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>{props.sectionNumber && props.sectionNumber}. Revisión y aprobación:</h2>
    <h4 className='revAprobacionPuestoTitle' style={{'marginTop':'8px','letterSpacing':'-1.7px'}}>Sección de revisión y aprobación a modificar:</h4>   
    {props.inputWidth && <select style={{'minWidth':`${props.inputWidth}%`,'maxWidth':`${props.inputWidth}%`,'marginTop':'1px','display':'inline-block','position':'relative','marginRight':'5px'}} className='revAprobacionSeccionInput'>
     <option>Elaborado por</option>
     <option>Revisado por</option>
     <option>Aprobado por</option>
    </select>}
    {!props.inputWidth && <select style={{'minWidth':'20.6%','maxWidth':'20.6%','display':'inline-block','position':'relative','marginRight':'5px'}} className='revAprobacionSeccionInput'>
    <option>Elaborado por</option>
     <option>Revisado por</option>
     <option>Aprobado por</option>     
    </select>}  
    <input type='submit' className='responsAddButton revAprobAddRecordButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'display':'inline-block','position':'relative','borderRadius':'115px','padding':'4px 35px 4px 35px','margin':'0'}}/>      
    <br/>
    <br/>
    <h4 style={{'letterSpacing':'-1.7px','display':'inline-block','position':'relative','marginRight':'auto'}}>Apartado de revisión y aprobación a modificar:</h4>   
    {props.inputWidth && <select style={{'minWidth':`${props.inputWidth}%`,'maxWidth':`${props.inputWidth}%`,'marginTop':'1px','display':'inline-block','position':'relative','marginRight':'5px'}} className='revAprobacionApartadoEspecificoInput' onChange={(e)=>{handleApartadoEspecificoChange(e)}}>
     <option>Nombre</option>
     <option>Firma</option>
     <option>Puesto</option>
    </select>}
    {!props.inputWidth && <select style={{'minWidth':'20%','maxWidth':'20%','display':'inline-block','position':'relative','marginRight':'5px'}} className='revAprobacionApartadoEspecificoInput' onChange={(e)=>{handleApartadoEspecificoChange(e)}}>
    <option>Nombre</option>
     <option>Firma</option>
     <option>Puesto</option>     
    </select>}
    <br/>
    <br/>
    <div className='revAprobacionPuestoDiv' style={{'display':'none'}}>
      <a className='inlineFormLabel' href='' onClick={(e)=>{handleDisplayInlineForm(e,'puestos','revAprobacionPuestoInput')}} style={{'margin':'0 0 -50px'}}>Crear nuevo puesto</a>
      <br/>
      <h4 className='revAprobacionPuestoTitle' style={{'marginTop':'8px','letterSpacing':'-1.7px'}}>Puesto:</h4>   
      {props.inputWidth && <select style={{'minWidth':`${props.inputWidth}%`,'maxWidth':`${props.inputWidth}%`,'marginTop':'1px','display':'inline-block','position':'relative','marginRight':'5px'}} className='revAprobacionPuestoInput'></select>}
      {!props.inputWidth && <select className='revAprobacionPuestoInput' style={{'minWidth':'23.2%','maxWidth':'23.2%','display':'inline-block','position':'relative','marginRight':'5px'}}></select>}
    </div>      
    <div className='revAprobacionFirmaDiv' style={{'display':'none'}}>
      <h4 className='revAprobacionFirmaTitle' style={{'letterSpacing':'-1.7px'}}>Firma:</h4>   
      <input type="file" accept="image/*" onChange={handleImageUpload} className='revAprobacionFirmaInput revAprobacionFirmaFileInput' style={{'marginLeft':'3px'}}/>
      <br/>
    </div>
    <br className='RevAprobacionDescripBreaker' style={{'display':'none'}}/>
    <h4 className='revAprobacionPuestoTitle' style={{'letterSpacing':'-1.7px'}}>Descripción:</h4>   
    <textarea className='revAprobacionDescripcion' placeholder='Descripción' style={{'minWidth':'20.8%','maxWidth':'20.8%','minHeight':'36px','maxHeight':'36px','borderRadius':'20px'}}></textarea>        
    <br/>
    <br/>    
    <table className='RevAprobacionTable' style={{'border':'0','borderCollapse':'separate'}}>
     <thead className='RevAprobacionHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}><tr><td></td><td>Nombre</td><td style={{'maxWidth':'fit-content'}}>Firma</td><td>Puesto</td></tr></thead>
     <tbody className='RevAprobacionBody'>
      <tr><td style={{'backgroundColor':'white'}}>Elaborado por:</td><td id='ElaboradoPor' style={{'backgroundColor':'white','fontWeight':'400'}}></td><td id='FirmaElaborado' style={{'backgroundColor':'white','maxWidth':'fit-content'}}><img style={{'minWidth':'100%','maxWidth':'100%','maxHeight':'400px'}}/></td><td id='PuestoElaborado' style={{'backgroundColor':'white','fontWeight':'400'}}></td></tr>
      <tr><td style={{'backgroundColor':'white'}}>Revisado por:</td><td id='RevisadoPor' style={{'backgroundColor':'white','fontWeight':'400'}}></td><td id='FirmaRevisado' style={{'backgroundColor':'white','maxWidth':'fit-content'}}><img style={{'minWidth':'100%','maxWidth':'100%','maxHeight':'400px'}}/></td><td id='PuestoRevisado' style={{'backgroundColor':'white','fontWeight':'400'}}></td></tr>
      <tr><td style={{'backgroundColor':'white'}}>Aprobado por:</td><td id='AprobadoPor' style={{'backgroundColor':'white','fontWeight':'400'}}></td><td id='FirmaAprobado' style={{'backgroundColor':'white','maxWidth':'fit-content'}}><img style={{'minWidth':'100%','maxWidth':'100%','maxHeight':'400px'}}/></td><td id='PuestoAprobado' style={{'backgroundColor':'white','fontWeight':'400'}}></td></tr>
     </tbody>
    </table>
    <br/>      
    <hr/>
   {inlineForm && ( (inlineForm.split(',')[0]=='puestos' && <InlinePuesto inlineForm={inlineForm} setInlineForm={setInlineForm}/>) )}    
   </> 
  )}