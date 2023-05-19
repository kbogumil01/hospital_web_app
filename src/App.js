import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPatient from './components/AddPatient';
import Navbar from './components/Navbar';
import PatientList from './components/PatientList';
import UpdatePatient from './components/UpdatePatient';
import WorkerMenu from './components/WorkerMenu';
import LoginPage from './components/LoginPage';
import AddUser from './components/AddUser';
import MainMenu from './components/MainMenu';
function App() {
  return(
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<MainMenu/>}/>
          <Route path="/" element={<MainMenu/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/workerMenu" element={<WorkerMenu/>}></Route>
          <Route path="/patientList" element={<PatientList/>}/>
          <Route path="/addPatient" element={<AddPatient/>}/>
          <Route path="/addUser" element={<AddUser/>}/>
          <Route path='/updatePatient/:id' element={<UpdatePatient/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
