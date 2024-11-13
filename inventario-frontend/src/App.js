
import './App.css';
import Table from './Components/Table';
import SideMenu from './Components/SideMenu';
import Proced from './Components/Forms/Proced'
import { useState, useEffect, useRef} from 'react';

function App() {
  const [procedData, setProcedData] = useState(null);
  const [tableName, setTableName] = useState('');
  const [data, setData] = useState('');
  useEffect(() => {
   if (tableName && !tableName.includes('specificProcedRecord')) { 
    fetch(`http://${window.location.hostname}:8000/${tableName}/`)
      .then(res => res.json())
      .then(res => setData(res))       
    }else if(tableName.includes('specificProcedRecord')){
      setTableName('procedimiento')
      let codeToSearch = tableName.split('_')[1].replace(' ','')
      fetch(`http://${window.location.hostname}:8000/procedimiento/`,{
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        body:JSON.stringify({'mode':'fillForm','procedCodigo':codeToSearch})
       })
       .then(res=>res.json())
       .then((res)=>{
         let specificData = res.specificData
         setTableName('procedimiento')
         setData({'fields':['Còdigo','Descripcion','Objetivo','Fecha','Version'],
          'data':[
            {'Codigo':specificData.Procedimiento_Codigo,
            'Descripcion':specificData.Documentos.Descripcion ,
            'Objetivo':specificData.Procedimiento_Objetivo,
            'Fecha':specificData.Documentos.Fecha,
            'Version':specificData.Documentos.Version}]})
        })}},[tableName])
  
  function activateProcOutterCont() {
   let procedOutterCont = document.getElementsByClassName('procedOutterCont')[0];
   procedOutterCont.style.display = 'block';
  }

  return (


   <div className="App">

        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                          <SideMenu setTableName={setTableName}/>
                </nav>
            </div>
            
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Procedimientos</h1>

                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                Registros
                            </div>
                            <div className="card-body">
                             {tableName && <Table data={data} tableName={tableName} setTableName={setTableName} setData={setData} setProcedData={setProcedData}/>}                           
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        {procedData && activateProcOutterCont()}
        <div className='procedOutterCont'>{procedData && <Proced procedData={procedData} setProcedData={setProcedData}/>}</div>
   </div>

  )}

export default App;
