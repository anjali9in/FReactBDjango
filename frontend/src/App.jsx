import React from 'react'
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import './App.css'
import ProtectedRoute from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import Login from './pages/Login';
import { Logout } from './pages/Logout';

const LogOut = () => {
  localStorage.clear();
  return <Navigate to="/login" />
}

const registerAndLogout = () => {
  localStorage.clear();
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
