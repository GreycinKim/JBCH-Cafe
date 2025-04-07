import { useState } from 'react'
import logo from '/JBCH_Logo.png';

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <h1 className={'text-center text-color'}>Hello World</h1>
      <div className={'container'}>
        <img className={'logo'} src={logo} alt="logo" />
      </div>
      </>

  )
}

export default App
