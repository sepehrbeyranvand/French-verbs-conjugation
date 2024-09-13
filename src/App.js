import React, { useState } from 'react';
import Conjugation from './Components/Conjugation';
import VocabularyApp from './Components/words';
import University from './Assets/University.png'
import Footer from './Components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


function App() {
  const [darkMode,setDarkMode] = useState(false)
  return (
    <div className={darkMode?`bg-[#1F1B24]`:``}>
 
      <div className='inline-block m-2 bg-white rounded-full'>
        <img width={80} height={80} alt='University' className='mix-blend-multiply' src={University}/>
      </div>
      <div className='float-right m-3 p-2 cursor-pointer'>
        {
          !darkMode && <i onClick={()=>setDarkMode(!darkMode)} className={darkMode?`text-white fa fa-moon-o text-xl`:`fa fa-moon-o text-xl`}></i>
        }
        {
          darkMode && <i onClick={()=>setDarkMode(!darkMode)} className={darkMode?`text-white fa fa-sun-o text-xl`:`fa fa-sun-o text-xl`}></i>
        }
      </div>
      <div>
      {window.location.pathname === '/word' ? '' : <Conjugation darkMode={darkMode} />}
      <Router>
        <Routes>
          <Route path='/word' element={<VocabularyApp/>}/>
        </Routes>
    </Router>
      </div>
      
      <div>
        <Footer darkMode={darkMode}/>
      </div>
    </div>
  );
}

export default App;