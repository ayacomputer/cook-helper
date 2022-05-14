import React from 'react'
import Footer from '../components/Footer'
import '../App.css'



export default function MainLayout(props) {
  return (
    <main>
      {props.children}
      <Footer />
    </main>
  )
}
