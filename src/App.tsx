import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Registration from './components/Registration';
import { Routes, Route } from "react-router-dom";
import FamilyPage from './components/FamilyPage';
import Profilepage from './components/Profilepage';
import EditProfilepage from './components/EditProfilepage';
import TipsPage from './components/TipsPage';
import ForumsPage from './components/ForumsPage';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './store';




export default function App() {
    const loginState = useSelector((store:RootState) => store.login.isLoggedIn)
    return (
      <div className='App'>
        <div className='App-container'>
            <NavBar />
                <Routes>
                  <Route path="/" element={ loginState? <Dashboard/>:<LandingPage/>}></Route>
                  <Route path="/register" element={<Registration/>}></Route>
                  <Route path="/forums" element={<ForumsPage/>}></Route>
                  <Route path="/family" element={<FamilyPage/>}></Route>
                  <Route path="/tips" element={<TipsPage/>}></Route>
                  <Route path="/profile" element={<Profilepage/>}></Route>
                  <Route path="/editprofile" element ={<EditProfilepage/>}></Route>
                </Routes>
        </div>
      </div>
    );
  
}
