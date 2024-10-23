import './Forms.css'
import {useEffect, useRef} from 'react'
export default function Anexos (props) {
 var selectedTableRecord = useRef(undefined) 
 useEffect(()=>{
  setTimeout(()=>{
    if(props.procedData.specificData && props.procedData.specificData['Anexos']) {
      let tHead = document.getElementsByClassName('AnexosHead')[0]
      let tBody = document.getElementsByClassName('AnexosBody')[0]
      for(let records of props.procedData.specificData['Anexos']) {
       let columnSchema = ['Num','Nombre','Codigo']
       let trBody = document.createElement('tr')
       if(!tHead.children.length) {let trHead=document.createElement('tr');for(let column of Object.keys(records)) {if(column!=='ID'){let th=document.createElement('th');th.innerText=column.replace('ID','');trHead.appendChild(th)}}tHead.appendChild(trHead)}
       for(let column of columnSchema) {let td = document.createElement('td');td.innerText=column.length>2 && column.includes('ID')?Object.values(records[column][0]):records[column];trBody.appendChild(td)}
       trBody.value=records['ID']
       trBody.style.backgroundColor = 'rgb(250, 250, 250)'
       trBody.style.fontWeight = '400'
       trBody.addEventListener('mouseenter',(e)=>{e.target.style.backgroundColor = 'rgb(212, 208, 208)'})
       trBody.addEventListener('mouseleave',(e)=>{e.target.style.backgroundColor = 'rgb(250, 250, 250)'})
       trBody.addEventListener('click',(e)=>{
       if(e.target.parentElement.value){
        selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
       }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
       })        
       tBody.appendChild(trBody)
      } 
     }    
  },300)
 },[]) 

 function HandleAdd() {
  let Anexos_NumInput = document.getElementsByClassName('Anexos_NumInput')[0]
  let Anexos_NombreInput = document.getElementsByClassName('Anexos_NombreInput')[0] 
  let Anexos_CodigoInput = document.getElementsByClassName('Anexos_CodigoInput')[0]  
  
  let AnexosHead = document.getElementsByClassName('AnexosHead')[0]    
  let AnexosBody = document.getElementsByClassName('AnexosBody')[0]    
  let data = [Anexos_NumInput,Anexos_NombreInput,Anexos_CodigoInput]
  let columns = ['Nùmero','Nombre','Còdigo']
  var trHead = document.createElement('tr')
  let trBody = document.createElement('tr')
  trBody.style.backgroundColor = 'rgb(250, 250, 250)'
  trBody.style.fontWeight = '400'
  trBody.addEventListener('mouseenter',(e)=>{e.target.style.backgroundColor='rgb(212, 208, 208)'})
  trBody.addEventListener('mouseleave',(e)=>{e.target.style.backgroundColor='rgb(250, 250, 250)'})
  trBody.addEventListener('click',(e)=>{
    if(e.target.parentElement.value){
     selectedTableRecord.current = {'recordToDeleteId':e.target.parentElement.value,'record':e.target.parentElement}
    }else{selectedTableRecord.current = {'record':e.target.parentElement}}    
  })
    
  for(let dataCounter=0;dataCounter<=data.length-1;dataCounter+=1) {
    let td = document.createElement('td')
    let th = document.createElement('th')
    td.innerText = data[dataCounter].value
    th.innerText = columns[dataCounter]
    trBody.appendChild(td)
    trHead.appendChild(th)
  }
  props.backenData.current['Anexos'].push({'Num':Anexos_NumInput.value,'Nombre':Anexos_NombreInput.value,'Codigo':Anexos_CodigoInput.value,'elementHtml':trBody.innerHTML})  
  props.summaryData.current['Anexos'][trBody.innerHTML] = {'Num':Anexos_NumInput.value,'Nombre':Anexos_NombreInput.value,'Codigo':Anexos_CodigoInput.value}   
  Anexos_NumInput.value=''
  Anexos_NombreInput.value=''
  Anexos_CodigoInput.value=''

  AnexosBody.appendChild(trBody)
  !AnexosHead.children.length?AnexosHead.appendChild(trHead):void 0
 } 

 function handleRecordRemove(){
  if(!selectedTableRecord.current){return}
  if(Object.keys(selectedTableRecord.current).includes('recordToDeleteId')){
   props.backenData.current['recordsToDelete'].push({'Anexos':selectedTableRecord.current['recordToDeleteId']})
   Object.keys(props.summaryData.current['recordsToDelete']).includes('Anexos')? props.summaryData.current['recordsToDelete']['Anexos'].push(selectedTableRecord.current['record']):props.summaryData.current['recordsToDelete']['Anexos']=[selectedTableRecord.current['record']]   
  }else{
    if(selectedTableRecord.current['record']){
      Object.keys(props.summaryData.current['Anexos']).includes(selectedTableRecord.current['record'].innerHTML)? (()=>{delete props.summaryData.current['Anexos'][selectedTableRecord.current['record'].innerHTML]})():void 0      
     for(let counter=0;counter<=props.backenData.current['Anexos'].length-1;counter++){
      let currentRecordToCreate = props.backenData.current['Anexos'][counter]
      if(currentRecordToCreate['elementHtml']==selectedTableRecord.current['record'].innerHTML){props.backenData.current['Anexos'].splice(counter,1)}
    }}}
  if(selectedTableRecord.current['record']){selectedTableRecord.current['record'].style.display='none'}    
  }

 return (
  <div className="anexosCont">
   <h2 className='descripProcedTitle' style={{'fontWeight':'900'}}>8. Anexos:</h2>

   <h4 className='AnexosNumTitle'>Nùmero:</h4>   
   <input type='number' className='Anexos_NumInput' placeholder='Nùmero del anexo'/>
   <br/>
   <br/>
   <h4 className='AnexosNombreTitle'>Nombre:</h4>   
   <textarea className='Anexos_NombreInput' placeholder='Nombre del anexo'></textarea>
   <br/>
   <br/>
   <h4 className='AnexosCodigoTitle'>Còdigo:</h4>   
   <textarea className='Anexos_CodigoInput' placeholder='Còdigo del anexo'></textarea>
   <input type='submit' className='anexoAddButton' value='Agregar' onClick={()=>{HandleAdd()}}/>
   <table className='AnexosTable'>
    <thead className='AnexosHead' style={{'backgroundColor':'rgb(212, 208, 208)'}}></thead>
    <tbody className='AnexosBody'></tbody>
   </table>
   <input type='submit' className='responsAddButton' value='Eliminar' style={{'margin':'3px 0 3px 0'}} onClick={()=>{handleRecordRemove()}}/>
   <br/>
   <hr/>
  </div>  
 )
}