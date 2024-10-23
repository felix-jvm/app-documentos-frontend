import './CreationSubform.css'

export default function CreationSubform (props) {
 //params >>>  fields = {userFieldName,fieldName,convertionRoute,dependsOn},dataStore = ref,
 var fields = props.fields
 var newRecordButton = document.createElement('button')
 var deleteRecordButton = document.createElement('button')
//  var addSubRecord = document.createElement('button')
 var saveData = document.createElement('button')
 var fieldsData = {}
 newRecordButton.innerText = 'Agregar registro'
 deleteRecordButton.innerText = 'Eliminar registro'
//  addSubRecord.innerText = 'Agregar subregistro'
 saveData.innerText = 'Guardar datos'

 setTimeout(() => {
  var mainCont = document.getElementsByClassName('mainCont')[0]
  var selectCont = document.getElementsByClassName('selectCont')[0]
  var inputCont = document.getElementsByClassName('inputCont')[0]    
  for (let fieldElement of fields) {
   fieldsData[fieldElement.fieldName] = fieldElement 
   window[`${fieldElement['fieldName']}Label`] = document.createElement('h5')
   window[`${fieldElement['fieldName']}SelectLabel`] = document.createElement('h5')
   window[`${fieldElement['fieldName']}ConvertionRouteLabel`] = document.createElement('h6')
   window[`${fieldElement['fieldName']}Input`] = document.createElement('textarea')
   window[`${fieldElement['fieldName']}Data`] = document.createElement('select')

   window[`${fieldElement['fieldName']}Data`].setAttribute('name',`${fieldElement.fieldName}Data`)
   window[`${fieldElement['fieldName']}Input`].setAttribute('name',`${fieldElement.fieldName}Input`)
   window[`${fieldElement['fieldName']}Label`].innerText = fieldElement.userFieldName
   window[`${fieldElement['fieldName']}SelectLabel`].innerText = fieldElement.userFieldName
   window[`${fieldElement['fieldName']}ConvertionRouteLabel`].innerText = fieldElement.convertionRoute

   inputCont.appendChild(window[`${fieldElement['fieldName']}Label`])
   inputCont.appendChild(window[`${fieldElement['fieldName']}Input`])
   selectCont.appendChild(window[`${fieldElement['fieldName']}SelectLabel`])
   selectCont.appendChild(window[`${fieldElement['fieldName']}ConvertionRouteLabel`])
   selectCont.appendChild(window[`${fieldElement['fieldName']}Data`])
  }
  mainCont.appendChild(newRecordButton)
  mainCont.appendChild(deleteRecordButton)
  mainCont.appendChild(saveData)


  function handleCreate() {
    var textareaElem = document.getElementsByTagName('textarea') 
    if(textareaElem) {
      for(let element of textareaElem) {
       var elementSelect = document.getElementsByName(`${element.name.replace('Input','Data')}`)[0]
       if(elementSelect) {
        let option = document.createElement('option')
        if(fieldsData[element.name.replace('Input','')]) {
          fieldsData[element.name.replace('Input','')]['dependsOn']? (()=> {
           let parentElementInput = document.getElementsByName(`${fieldsData[element.name.replace('Input','')]['dependsOn']}Input`)[0];
           option.innerText = `${parentElementInput.value} - ${element.value}`
           parentElementInput.value = ''
           element.value = ''
          })():option.innerText = element.value
        }
        if(!elementSelect.hasChildNodes(option) || option.innerText.includes(' - ')){elementSelect.appendChild(option)}
        elementSelect.value=''
        element.value=''
      }
     }
   }}

  newRecordButton.addEventListener('click',e=>{e.preventDefault();handleCreate()})
},100)

 return (
  <div className='mainCont'>
   <div className='inputCont'></div>
   <div className='selectCont'></div>
  </div>
 )

}