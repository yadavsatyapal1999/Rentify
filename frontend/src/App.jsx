import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUserForm from './User/CreateUser';
import LoginPage from './User/UserLogin';
import PropertyList from './Property/PropertyList';
import AddProperty from './Property/AddProperty';
import UpdateProperty from './Property/UpdateProperty';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<CreateUserForm />} />
        <Route path='/' element={<PropertyList />} />
        <Route path='/update' element={<UpdateProperty />} />
        <Route path='/add' element={<AddProperty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
