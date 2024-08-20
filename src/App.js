import React, { useState } from 'react';
import Conjugation from './Components/Conjugation';
import University from './Assets/University.png'
import Footer from './Components/footer';

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
        <Conjugation darkMode={darkMode}/>
      </div>
      <div>
        <Footer darkMode={darkMode}/>
      </div>
    </div>
  );
}

export default App;