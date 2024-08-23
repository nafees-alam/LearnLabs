import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({children}) => {
    const {theme} = useSelector((state) => state.theme);
  return (
    <div className={theme}>
        <div className= 'bg-white text-gray-700 min-h-screen dark:bg-[rgb(16,23,42)] dark:text-gray-200'>
            {children}
        </div>
    </div>
  )
}

export default ThemeProvider