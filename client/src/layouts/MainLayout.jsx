import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
// import '../App.css'



export default function MainLayout(props) {
  return (
    <main>
      <NavBar />
      {props.children}
      <Footer />
    </main>
  )
}
