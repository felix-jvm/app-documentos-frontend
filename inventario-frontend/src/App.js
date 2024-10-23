
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
   if (tableName) { 
    fetch(`http://127.0.0.1:8000/${tableName}/`)
      .then(res => res.json())
      .then(res => setData(res))       
    }},[tableName])
  
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
                             {tableName && <Table data={data} setTableName={tableName} setProcedData={setProcedData}/>}
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
