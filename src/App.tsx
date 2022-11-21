import Database from './components/Database';
import { Input } from './components/Input'
import { ListItems } from './components/ListItems';
import Moon from './assets/images/icon-moon.svg'
import Sun from './assets/images/icon-sun.svg'
import { useEffect, useState } from 'react';
function App() {

  const [isDarkMode, setIsDarkMode] = useState((localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)))
  function getDarkMode(mode?: string) {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
  useEffect(() => {

    // const mode =  ? 'dark' : 'light'
    getDarkMode(isDarkMode ? 'dark' : 'light')
  },)

  return (
    <Database>
      <div className={'w-screen bg-[hsl(236,33%,92%)] min-h-screen md:h-screen  dark:bg-[#181824]' + (isDarkMode ? ' darkBackground' : ' lightBackground')}>
        <div className='m-auto lg:w-2/5 md:w-3/4 px-4 pt-[4.8rem]'>
          <div className="flex">
            <h1 className='text-4xl font-extrabold tracking-[.5em] text-white'>TODO</h1>
            <img onClick={() => setIsDarkMode(!isDarkMode)} src={isDarkMode ? Sun : Moon} className="h-full ml-auto cursor-pointer" />
          </div>
          <Input />
          <ListItems />
        </div>
      </div>
    </Database>

  )
}

export default App
