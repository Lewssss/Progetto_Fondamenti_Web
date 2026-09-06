import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import './ThemeSwitch.css'

function ThemeSwitch(){
  const [light,setLight] = useState(localStorage.getItem("theme") == "light")

  function toggle(){
    if(light){
      document.body.classList.remove("light")
      localStorage.setItem("theme","dark")
      setLight(false)
    } else {
      document.body.classList.add("light")
      localStorage.setItem("theme","light")
      setLight(true)
    }
  }

  return(
    <button type="button" className="theme-switch" onClick={toggle}>
      {light ? <Moon/> : <Sun/>}
    </button>
  )
}
export default ThemeSwitch
