import './ConfirmationModal.css'

export default function ConfirmationModal(props) {
 
 return (
  <div className = 'modalMainCont'>
    <div className = 'modalInnerCont'>
      <br/>
      <h2 className='modalMessage'>{props.message}</h2>  
       <div className='iconDiv'>  
        {props.icon}
       </div> 
      <input type = 'submit' className = 'modalConfirmationButton' value='Cerrar' onClick={() => {
        props.setConfirmationModal('');
        props.reload==='true'?window.location.reload():void 0}}/>
    </div>
  </div> 
 )   
}