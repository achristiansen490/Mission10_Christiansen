import { useState } from 'react'
import './App.css'
import GoButton from './GoButton'
import GoLabel from './GoLabel'

function Welcome() {
  return <h1>Welcome to Mission 10 Assignment</h1>
}

function Footer() {
  return <footer>© 2026 Mission 10 Assignment. All rights reserved.</footer>
}

function Content() {
  return <p>Here is a random number for you:
     <br /> {Math.floor(Math.random() * 100)}</p>
}




function App() {
  const [goLevel, updateGo] = useState(1);
  const incrementGo = () => {
    updateGo(goLevel * 2);
  }
  return (
    <>
      <Welcome />
      <Content />
      <GoButton goButtonFunction = {incrementGo} />
      <br />
      <br />
      <GoLabel numToDisplay={goLevel} />
      <Footer />
    </>
  )
}

export default App
