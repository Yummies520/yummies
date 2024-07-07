import './App.css';
import MenuListPage from './Menu Cart/Menu List Page/menulistpage';
import Records from './Records Page/records';
import MenuPage from './Menu Page/menuPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './LoginPage/LoginPage';
import HomePage from './common components/HomePage';
import AdminForm from './Menu Page/AdminForm/AdminForm';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LoginForm/>}/>
        <Route path='/HomePage' exact element={<HomePage />} />
        <Route path='/MenuListPage' exact element={<MenuListPage />} />
        <Route path='/AdminPage' exact element={<AdminForm />} />
        <Route path='/Records' exact element={<Records />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
