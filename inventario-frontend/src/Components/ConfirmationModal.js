import './ConfirmationModal.css'

export default function ConfirmationModal(props) {
 
 return (
  <div className = 'confirmationModalMainCont'>
    <div className = 'confirmationModalInnerCont'>
      <br/>
      <h2 className='confirmationModalMessage'>{props.message}</h2>  
       <div className='iconDiv'>  
        {props.icon}
       </div> 
      <input type = 'submit' className = 'modalConfirmationButton' value='Cerrar' onClick={() => {
        props.setConfirmationModal('');
        props.reload==='true'?window.location.reload():(()=>{
          setTimeout(()=>{if(props.setProcedData){props.setProcedData(false)}},300)
        })()}}/>
    </div>
  </div> 
 )   
}