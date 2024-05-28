import React,{ useContext,useEffect } from 'react'
import notesContext from '../Context/NoteContext';
import { useNavigate } from 'react-router-dom';
export default function About() {
    const a=useContext(notesContext);
    const navigator=useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem("token")){
        navigator('/login')
      }
    },[])
  return (
    <div>
      This is about {a.Name}
    </div>
  )
}
