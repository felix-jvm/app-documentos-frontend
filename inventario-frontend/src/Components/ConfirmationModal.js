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
          let procedOutterCont = document.getElementsByClassName('procedOutterCont')[0];
          if(procedOutterCont){procedOutterCont.style.display = 'none'};
        })()}}/>
    </div>
  </div> 
 )   
}