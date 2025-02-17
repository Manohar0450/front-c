  import { useState } from 'react'
  import {BrowserRouter as Router, Routes, Route} from  'react-router-dom'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import HomePage from './components/homePage' 
  import Subjectspage from './components/SubjectsPage'
  import Layout from './components/Layout'
  import CategoryPage from './components/CategoryPage'
  import FilesDisplay from './components/FilesDisplay'
  import AdminLogin from './components/AdminLogin'
  import ChangePassword from './components/ChangePassword'
  import ChangeUserName from './components/ChangeUserName'


  function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/files/:semester" element={<Subjectspage />} />
                    <Route path="/file-details/:Regulation/:Semester/:fileName" element={<CategoryPage />} />
                    <Route path='/file-display/:Regulation/:Semester/:fileName/:category' element={<FilesDisplay />} />
                    <Route path='/admin' element={<AdminLogin />} />
                    <Route path='/ChangePassword' element={<ChangePassword />} />
                    <Route path='/ChangeUserName' element={<ChangeUserName />} />
                </Route>
            </Routes>
        </Router>
    );
}


  export default App
