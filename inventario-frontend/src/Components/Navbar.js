import {useState} from 'react';
import './Navbar.css';
// import '../styles.css'
import Login from './Forms/Login';

export default function Navbar(props) {
 
 const [userCreation,setUserCreation] = useState(false)
 {/* <h5 className='nameLabel'>Usuario: <b>{props.userData.Nombre}</b></h5>
 <h5 className='closeSession' onClick={()=>{props.setUserData(false)}} onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}>Cerrar sesión</h5> */}
 return (
   <>
   {/* sb-topnav navbar navbar-expand navbar-dark bg-dark */}
    <nav className="sb-topnav">
            
            {/* <a className="navbar-brand ps-3" style={{'margin':'0.7% 0 0 0'}}>MAESTRO DE MATERIALES</a> */}
            
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
               <div className='iconNameCont'>
                 <h4 className="userName">{props.userData.Nombre}</h4>
                 <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        {props.userData.PermisoNivel > 1 && <li><a className="dropdown-item" href="#!" onClick={()=>{setUserCreation(true)}}>Agregar usuario</a></li>}
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!" onClick={()=>{props.setUserData(false)}}>Cerrar sesión</a></li>
                    </ul>
                 </li>
                </div>
            </ul>         
    </nav>    
    {userCreation && <div className='userCreationMaintCont'><Login setUserCreation={setUserCreation} mode={'userCreation'}/></div>}
   </> 
 )}