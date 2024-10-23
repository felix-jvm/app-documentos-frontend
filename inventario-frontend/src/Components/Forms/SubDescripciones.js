
export default function SubDescripciones (props) {

  function handleSend(obj) {
    var formData = obj.target
    obj.preventDefault()
    var data = {}
    let mode = ''    
    data['Codigo'] = formData.codigo.value
    data['IDDescripcion'] = formData.iddescripcion.value
    data['SubDescripcion'] = formData.subdescripcion.value

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
   window.location.reload(true)
  }  

  function handleDelete(){
    fetch(`http://localhost:8000/${props.route}/`,{
       method:'DELETE',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({ID:props.updateElementId.current,mode:'delete'})})
      .then(()=>window.location.reload())}

    if(props.callMode && props.callMode.current==='update') {
      fetch(`http://localhost:8000/${props.route}/`,{
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

    fetch(`http://localhost:8000/${props.route}/`,{
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
          var optionElement = document.createElement('option');
          if (firstSelect && relationTable.includes(firstSelect.name.replace('id',''))) {
            optionElement.innerText = Object.values(option)[0]
            firstSelect.appendChild(optionElement)   
          }}}
     }) 

    return (
      <div className="formCont">
        <form id='subDescripciones' onSubmit={(data)=>handleSend(data)}>
          <label>Codigo</label>
          <br/>
          <input type='text' required={true} maxLength='50' name='codigo'/>
          <br/>
          <label>Descripcion</label>
          <br/>
          <select required={false} name='iddescripcion'></select>
          <br/>
          <label>SubDescripcion</label>
          <br/>
          <input type='text' required={false} name='subdescripcion'/>
          <br/>          
          <input type='submit' value='Guardar'/>
          <input type='submit' value='Borrar' onClick={()=>handleDelete()} name='deleteButton' className='deleteButton'/>          
        </form>
      </div>  
     )
}
