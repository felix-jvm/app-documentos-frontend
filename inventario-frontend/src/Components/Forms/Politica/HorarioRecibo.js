import '../Forms.css';
import {useEffect, useState, useRef} from 'react';
import ConfirmationModal from '../../ConfirmationModal';

export default function HorarioRecibo (props) {
 const [modalErrorData, setModalErrorData] = useState(false);
 useEffect(()=>{
  setTimeout(()=>{  
    if(props.formsData.current['specificData']) {
      let PrecioCompraDescri = document.getElementsByClassName('HorarioRecibo_Descri')[0]
      PrecioCompraDescri.innerText = props.formsData.current['specificData']['Politica']['HorarioRecibo']
    } },250) },[])

 useEffect((() => {  
  if(props.fullPoliticaData) {
   let HorarioRecibo_Descri = document.getElementsByClassName('HorarioRecibo_Descri')[0]  
   if(HorarioRecibo_Descri.value){props.backenData.current['Politica']['HorarioRecibo']=HorarioRecibo_Descri.value} } }),[props.fullPoliticaData])

 return (
  <div className="Sección_HorarioRecibo">
      <h2 className='responsTitle' style={{'fontWeight':'900','letterSpacing':'-2px'}}>8. Horario de recibo</h2>
      <h5 className='responsTitle' style={{'display':'inline-block','margin':'0','letterSpacing':'-1.7px'}}>Descripción:</h5>      
      <textarea className='HorarioRecibo_Descri' placeholder='Descripción general' style={{'marginLeft':'2px'}}></textarea>
      <br/>
      <br/>
      <hr/>      
   {modalErrorData && <ConfirmationModal message={modalErrorData} setConfirmationModal={setModalErrorData}
   icon={<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  </svg>}/>}
  </div>  
 )}