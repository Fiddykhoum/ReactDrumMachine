import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './components/UI/Layout.js'
import Home from './components/Home/index'
import About from './components/About/index'

export default function App(){
  return (
  <Router>
    <Layout>
      <Routes>
        <Route path='/about' element={<About/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </Layout>
  </Router>
)}
