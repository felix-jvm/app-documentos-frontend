import '../Forms.css'
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function Idiomas (props) {
 const [displayDeleteRecordButton,setDisplayDeleteRecordButton] = useState(false);
 useEffect(() => {
  setTimeout(() => {
    if(props.formsData.current['specificData'] && props.formsData.current['specificData']['Idiomas']) {
     let idiomasMainCont = document.getElementsByClassName('Secciòn_Idiomas')[0]
     for(let idioma of Object.keys(props.formsData.current['specificData']['Idiomas'])) {
      createIdiomaTable(idioma,idiomasMainCont,props.formsData.current['specificData']['Idiomas'][idioma]) } }
      let idiomasHabilidad = document.getElementsByClassName('Idiomas_HabilidadID')[0]
      let idiomasGrado = document.getElementsByClassName('Idiomas_GradoID')[0]   
      idiomasHabilidad.value = ''
      idiomasGrado.value = ''     
   },250)},[])

 function createIdiomaTable(idioma,idiomasMainCont,initialData=false) {
      let idiomaTableHeaders = ['','Grado','Indispensable','Deseable']   
      let idiomaSkills = {
         'Leer':{'Grado':'','Indispensable':'','Deseable':''},
         'Hablar':{'Grado':'','Indispensable':'','Deseable':''},
         'Escribir':{'Grado':'','Indispensable':'','Deseable':''}}
      function generateTableElement() {
         let idiomaNewTable = document.createElement('table')
         idiomaNewTable.className = idioma
         let idiomaNewTableThead = document.createElement('thead')
         let idiomaNewTableTbody = document.createElement('tbody')
         let idiomaNewTableTrHead = document.createElement('tr')
         idiomaNewTable.style.borderCollapse = 'separate'
         idiomaNewTable.style.margin = '0 0 15px 8px'
         idiomaNewTable.style.fontWeight = '400'
         idiomaNewTable.style.border = '0'
         idiomaNewTable.style.width = '50px'      
         idiomaNewTableThead.style.border = '0'
         idiomaNewTable.appendChild(idiomaNewTableThead)
         idiomaNewTable.appendChild(idiomaNewTableTbody)      
         idiomaNewTableThead.appendChild(idiomaNewTableTrHead)    
         return [idiomaNewTable,idiomaNewTableThead,idiomaNewTableTbody,idiomaNewTableTrHead] 
      }
      function fillTableHeader(idiomaTableHeaders,idiomaNewTableTrHead,idioma) {
         for(let tableHeader of idiomaTableHeaders) {
            let idiomaNewTableTh = document.createElement('th')  
            idiomaNewTableTh.style.height = '30px'
            idiomaNewTableTh.style.minWidth = '18vw'
            idiomaNewTableTh.style.maxWidth = '18vw'
            idiomaNewTableTh.style.backgroundColor = 'rgb(212, 208, 208)'       
            idiomaNewTableTh.innerText = !tableHeader? idioma:tableHeader
            idiomaNewTableTrHead.appendChild(idiomaNewTableTh)
           }
         return idiomaNewTableTrHead
      }
      function fillTableBody(idiomaSkillsList,idiomaNewTableTbody) {
         for(let skillCounter=0;skillCounter<=Object.keys(idiomaSkillsList).length-1;skillCounter++) {
            let skillTr = document.createElement('tr')
            let currentSkillName = Object.keys(idiomaSkillsList)[skillCounter]     
            let skillTrTd = generateTableBodyTd(currentSkillName)
            skillTr.appendChild(skillTrTd)
            for(let skillSpecValues of Object.values(idiomaSkillsList[currentSkillName])) {
               let skillTd = generateTableBodyTd(skillSpecValues)
               skillTr.appendChild(skillTd)
            }
            idiomaNewTableTbody.appendChild(skillTr)
         }
      } 
      function generateTableBodyTd(dataToDisplay) {
         const TdMarkStyles = (td) => {
            td.style.fontWeight = '900'
            td.style.padding = '0 0 0 10px'
            td.style.backgroundColor = 'white'            
            td.innerText='X'}         
         let skillTrTd = document.createElement('td')
         if(dataToDisplay===true) {TdMarkStyles(skillTrTd)} else if(dataToDisplay){
            skillTrTd.style.height = '30px'
            skillTrTd.style.minWidth = '18vw'
            skillTrTd.style.maxWidth = '18vw'     
            skillTrTd.innerText = dataToDisplay
         }
         skillTrTd.style.backgroundColor = 'white'          
         return skillTrTd
      }
   
      let [idiomaNewTable,idiomaNewTableThead,idiomaNewTableTbody,idiomaNewTableTrHead] = generateTableElement()
      fillTableHeader(idiomaTableHeaders,idiomaNewTableTrHead,idioma)
      fillTableBody(initialData || idiomaSkills,idiomaNewTableTbody)
   
      idiomasMainCont.appendChild(idiomaNewTable)   
 }

 function HandleAdd() {
  let idioma = document.getElementsByClassName('Idiomas_Idioma')[0].value
  let idiomasHabilidad = document.getElementsByClassName('Idiomas_HabilidadID')[0]
  let idiomasGrado = document.getElementsByClassName('Idiomas_GradoID')[0]
  let idiomasHabilidadIndispensable = document.getElementsByClassName('IdiomasHabilidadIndispensable')[0]
  let idiomasHabilidadDeseable = document.getElementsByClassName('IdiomasHabilidadDeseable')[0]
  let idiomasMainCont = document.getElementsByClassName('Secciòn_Idiomas')[0]

  if(idioma) {
   let trDataList = [idiomasHabilidad,idiomasGrado,idiomasHabilidadIndispensable,idiomasHabilidadDeseable]
   let idiomaTable = document.getElementsByClassName(idioma)[0]
   if(!idiomaTable) {createIdiomaTable(idioma,idiomasMainCont)} 
   const TdMarkStyles = (td) => {
      td.style.fontWeight = '900'
      td.style.padding = '0 0 0 10px'
      td.innerText='X'
   }
   setTimeout(()=> {
    let radioButtons = ['IdiomasHabilidadIndispensable','IdiomasHabilidadDeseable']  
    let idiomaTableTbody = document.getElementsByClassName(idioma)[0].children[1]  
    let updatedTr = document.createElement('tr')
    for(let trData of trDataList) {
      let updatedTrTd = document.createElement('td')
      updatedTrTd.style.backgroundColor = 'white'
      trData.className && radioButtons.includes(trData.className) && trData.checked? 
      TdMarkStyles(updatedTrTd):radioButtons.includes(trData.className) && !trData.checked? 
       updatedTrTd.innerText='':updatedTrTd.innerText=trData.value
      updatedTr.appendChild(updatedTrTd)
    }
    if(idiomasHabilidad.value=='Leer') {idiomaTableTbody.replaceChild(updatedTr,idiomaTableTbody.childNodes[0])} 
    else if(idiomasHabilidad.value=='Hablar') {idiomaTableTbody.replaceChild(updatedTr,idiomaTableTbody.childNodes[1])} 
    else if(idiomasHabilidad.value=='Escribir') {idiomaTableTbody.replaceChild(updatedTr,idiomaTableTbody.childNodes[2])}
    let prevObjValue = props.backenData.current['Idiomas'][idioma]
    props.backenData.current['Idiomas'][idioma] = {...prevObjValue}
    props.backenData.current['Idiomas'][idioma][idiomasHabilidad.value] = {
      'Descri':idiomasHabilidad.value,
      'Grado':idiomasGrado.value,
      'Indispensable':idiomasHabilidadIndispensable.checked,
      'Deseable':idiomasHabilidadDeseable.checked} 
      idiomasHabilidad.value = ''
      idiomasGrado.value = ''
      idiomasHabilidadIndispensable.checked = false
      idiomasHabilidadDeseable.checked = false

   },50) } }

//  function createIdiomaTable(idioma,idiomasMainCont,initialData=false) {
//    let idiomaTableHeaders = ['','Grado','Indispensable','Deseable']   
//    let idiomaSkills = {
//       'Leer':{'Grado':'','Indispensable':'','Deseable':''},
//       'Hablar':{'Grado':'','Indispensable':'','Deseable':''},
//       'Escribir':{'Grado':'','Indispensable':'','Deseable':''}}
//    function generateTableElement() {
//       let idiomaNewTable = document.createElement('table')
//       idiomaNewTable.className = idioma
//       let idiomaNewTableThead = document.createElement('thead')
//       let idiomaNewTableTbody = document.createElement('tbody')
//       let idiomaNewTableTrHead = document.createElement('tr')
//       idiomaNewTable.style.borderCollapse = 'separate'
//       idiomaNewTable.style.margin = '0 0 0 8px'
//       idiomaNewTable.style.fontWeight = '400'
//       idiomaNewTable.style.border = '0'
//       idiomaNewTable.style.width = '50px'      
//       idiomaNewTableThead.style.border = '0'
//       idiomaNewTable.appendChild(idiomaNewTableThead)
//       idiomaNewTable.appendChild(idiomaNewTableTbody)      
//       idiomaNewTableThead.appendChild(idiomaNewTableTrHead)    
//       return [idiomaNewTable,idiomaNewTableThead,idiomaNewTableTbody,idiomaNewTableTrHead] 
//    }
//    function fillTableHeader(idiomaTableHeaders,idiomaNewTableTrHead,idioma) {
//       for(let tableHeader of idiomaTableHeaders) {
//          let idiomaNewTableTh = document.createElement('th')  
//          idiomaNewTableTh.style.height = '30px'
//          idiomaNewTableTh.style.minWidth = '18vw'
//          idiomaNewTableTh.style.maxWidth = '18vw'
//          idiomaNewTableTh.style.backgroundColor = 'rgb(212, 208, 208)'       
//          idiomaNewTableTh.innerText = !tableHeader? idioma:tableHeader
//          idiomaNewTableTrHead.appendChild(idiomaNewTableTh)
//         }
//       return idiomaNewTableTrHead
//    }
//    function fillTableBody(idiomaSkillsList,idiomaNewTableTbody) {
//       // props.backend.current['idiomas'] = {'INGLE':{
//       //    'Leer':{'Grado':'','Indispensable':'','Deseable':''},
//       //    'Hablar':{'Grado':'','Indispensable':'','Deseable':''},
//       //    'Escribir':{'Grado':'','Indispensable':'','Deseable':''}},
//       // 'FRANCE':{
//       //    'Leer':{'Grado':'','Indispensable':'','Deseable':''},
//       //    'Hablar':{'Grado':'','Indispensable':'','Deseable':''},
//       //    'Escribir':{'Grado':'','Indispensable':'','Deseable':''}} }
//       for(let skillCounter=0;skillCounter<=Object.keys(idiomaSkillsList).length-1;skillCounter++) {
//          let skillTr = document.createElement('tr')
//          let currentSkillName = Object.keys(idiomaSkillsList)[skillCounter]     
//          let skillTrTd = generateTableBodyTd(currentSkillName)
//          skillTr.appendChild(skillTrTd)
//          for(let skillSpecValues of Object.values(idiomaSkillsList[currentSkillName])) {
//             let skillTd = generateTableBodyTd(skillSpecValues)
//             skillTr.appendChild(skillTd)
//          }
//          idiomaNewTableTbody.appendChild(skillTr)
//       }
//    } 
//    function generateTableBodyTd(dataToDisplay) {
//       let skillTrTd = document.createElement('td')
//       skillTrTd.innerText = dataToDisplay
//       skillTrTd.style.height = '30px'
//       skillTrTd.style.minWidth = '18vw'
//       skillTrTd.style.maxWidth = '18vw'     
//       skillTrTd.style.backgroundColor = 'white'
//       return skillTrTd
//    }

//    let [idiomaNewTable,idiomaNewTableThead,idiomaNewTableTbody,idiomaNewTableTrHead] = generateTableElement()
//    fillTableHeader(idiomaTableHeaders,idiomaNewTableTrHead,idioma)
//    fillTableBody(idiomaSkills,idiomaNewTableTbody)

//    idiomasMainCont.appendChild(idiomaNewTable)   
//  }
 
 useEffect((() => {
    if(props.fullPuestoDescriData){
     let CompeteActituLista_Descripcion = document.getElementsByClassName('CompeteActituLista_Descripcion')[0]
     CompeteActituLista_Descripcion.value? props.backenData.current['DescripcionPuesto']['CompeteActituDescr'] = CompeteActituLista_Descripcion.value:void 0
    //  if(!props.backenData.current['DescripcionPuesto_CodigoPuesto'] || !props.backenData.current['DescripcionPuesto_TituloPuesto']) {
    //   (!props.backenData.current['DescripcionPuesto_CodigoPuesto'] && setModalErrorData(`El campo Código de la Sección_Identificación es requerido.`))
    //   props.setSendData(false)
    //   props.setConfirmationModal(false)
    //   return  
    //   }   
    }}),[props.fullPuestoDescriData])
 

 return (
  <div className="Secciòn_Idiomas">
   <h5 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-1.7px'}}>9.2. Conocimientos específicos</h5>    
   <h5 className='responsTitle' style={{'letterSpacing':'-1.7px'}}>Idiomas</h5>   
   <h4 className='responsTitle' style={{'letterSpacing':'-1.7px'}}>Idioma:</h4> 
   <input type='text' className='Idiomas_Idioma' placeholder='Idioma' style={{'minWidth':'15%','maxWidth':'15%'}}/> 
   <br/>
   <br/>
   <h4 className='responsTitle' style={{'letterSpacing':'-1.7px'}}>Habilidad:</h4>
   <select className='Idiomas_HabilidadID' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}>
   <option>Leer</option>
    <option>Hablar</option>
    <option>Escribir</option>
   </select>  
   <br/> 
   <br/> 
   <h4 className='responsTitle' style={{'letterSpacing':'-1px'}}>Grado:</h4>   
   <select className='Idiomas_GradoID' required={true} style={{'minWidth':'15%','maxWidth':'15%'}}>
   <option>A</option>
    <option>I</option>
    <option>B</option>
   </select>    
   <br/>
   <br/>   
   <fieldset>
    <input type='radio' id='IdiomasHabilidadIndispensable' name='Idiomas' value='Indispensable' className='IdiomasHabilidadIndispensable'/>
    <label for='IdiomasHabilidadIndispensable' style={{'margin':'0 0 0 8px'}}>Indispensable</label>
    <br/>
    <input type='radio' id='IdiomasHabilidadDeseable' name='Idiomas' value='Deseable' className='IdiomasHabilidadDeseable'/>
    <label for='IdiomasHabilidadDeseable' style={{'margin':'0 0 0 8px'}}>Deseable</label>   
   </fieldset>  
   <input type='submit' className='responsAddButton' value='Agregar' onClick={()=>{HandleAdd()}} style={{'margin':'15px 0 0 0'}}/>     
   <br/>
   <br/>
   <br/>
  </div>  
 )}