import {useState,useRef,useEffect} from 'react';

export default function DiagramaFlujo(props) {
 const [image, setImage] = useState(null);
 const [archive, setArchive] = useState(null);
 useEffect((() => {
  setTimeout(() => {
   if(props.procedData.specificData){
    fetch(`http://${window.location.hostname}:9000/procedimiento/`,{
     'method':'POST',
     'headers':{'Content-Type':'application/json'},
     body:JSON.stringify({'mode':'request_proced_diagrama_flujo','procedCode':props.procedData.specificData['Procedimiento_Codigo']})
    })    
    .then((res)=>res.blob())
    .then((res)=>{
      const url = URL.createObjectURL(res);
      setImage(url)
    })
  }},250)}),[])

 useEffect((() => {
  if(props.senData){
   setTimeout(()=>{
     const formData = new FormData()
     formData.append('img',archive)
     formData.append('mode','save_diagrama_flujo_img')
     formData.append('procedCode',props.backenData.current['Procedimiento_CodigoSelect'])
     fetch(`http://${window.location.hostname}:9000/procedimiento/`,{
      method:'POST',
      body:formData
    }) },500) }}),[props.senData])

 const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl)
    setArchive(file)
    }}    
 const handleImageClick = () => {if (image) {window.open(image, '_blank');props.backenData['Diagrama_Flujo'] = image}}

 return (
   <>
    <h2 style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>7. Diagrama de flujo:</h2>
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{'marginLeft':'3px'}} className='diagramaFlujoInput'/>
      {image && (
        <img
          src={image}
          alt="Uploaded"
          style={{ cursor: 'pointer', marginTop: '10px', maxWidth: '100px', maxHeight:'100px' }}
          className='imageElement'
          onClick={handleImageClick}
        />
      )}
    </div>
    <hr/>
   </> 
  )}