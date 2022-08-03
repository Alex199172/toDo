import React from 'react';
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Auth from './pages/Auth';
import Entry from './pages/Entry';
import ToDoList from './pages/ToDoList'
import Error from './pages/Error';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Entry />} />
            <Route path="/registration" element={<Auth />} />
            <Route path="/list" element={<ToDoList />} />
            <Route path="*" element={<Error />} />
            </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
