import './SideMenu.css';
import {useRef} from 'react';
export default function SideMenu(props) {  

  let firstTimeLoad = useRef(0);

  setTimeout(()=>{!firstTimeLoad.current?(()=>{props.setTableName('procedimiento');firstTimeLoad.current=1})():void(0)},400)
  
  return (
    <div className='sideMenuCont'>
     <button onClick={() => props.setTableName('documentos')} className='sideMenuButton'>Documentos</button>
     <button onClick={() => props.setTableName('procedimiento')} className='sideMenuButton'>Procedimiento</button>
     {/* <button onClick={() => props.setTableName('documentosreferencias')} className='sideMenuButton'>Documentos referencias</button> */}
     <button onClick={() => props.setTableName('puestos')} className='sideMenuButton'>Puestos</button>
     {/* <button onClick={() => props.setTableName('responsabilidades')} className='sideMenuButton'>Responsabilidades</button> */}
     <button onClick={() => props.setTableName('termino')} className='sideMenuButton'>Termino</button>
     <button onClick={() => props.setTableName('puestodescripcion')} className='sideMenuButton' style={{'fontSize':'1vw'}}>Descripción de puesto</button>
     <button onClick={() => props.setTableName('manual')} className='sideMenuButton' style={{'fontSize':'1vw'}}>Manual</button>
     <button onClick={() => props.setTableName('politica')} className='sideMenuButton' style={{'fontSize':'1vw'}}>Politica</button>     
     <button onClick={() => props.setTableName('politica')} className='sideMenuButton' style={{'fontSize':'1vw'}}>Formatos e instructivos</button>
     {/* <button onClick={() => props.setTableName('terminologiasdef')} className='sideMenuButton'>Terminologias def</button>      */}
     {/* <button onClick={() => props.setTableName('descripcionesprocedimiento')} className='sideMenuButton'>Descripciones proc</button>      */}
     {/* <button onClick={() => props.setTableName('subdescripciones')} className='sideMenuButton'>Subdescripciones</button> */}
     {/* <button onClick={() => props.setTableName('anexos')} className='sideMenuButton'>Anexos</button> */}
     {/* <button onClick={() => props.setTableName('revaprobacion')} className='sideMenuButton'>revaprobacion</button>      */}
     {/* <button onClick={() => props.setTableName('historialcambios')} className='sideMenuButton'>Historial cambios</button> */}
    </div>
  )  
}