import React, { useEffect, useState } from "react";
import NotesContext from "./NoteContext";

const StateContext = (props) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchAllNotesFromDB();
  }, []);
  const fetchAllNotesFromDB = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/notes/getNotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-Token": localStorage.getItem("token"),
        },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData.allNotes);
    setNotes(jsonData.allNotes);
  };
  const addNote = (note) => {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/notes/addnote`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-Token":localStorage.getItem("token")
        },
        body: JSON.stringify(note),
      } )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Note is added");
        fetchAllNotesFromDB();
      });
  };
  const editNote = (note) => {
    console.log("Edit note", note);
    fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/notes/updateNote/${note.eid}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-Token":localStorage.getItem("token")
        },
        body: JSON.stringify({
          title: note.etitle,
          description: note.edescription,
          label: note.elabel,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Note is Updated");
        fetchAllNotesFromDB();
      });
  };
  const deleteNote = (id) => {
    fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/notes/deleteNote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-Token":localStorage.getItem("token")
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Note is deleted");
      });
    console.log("Delete note", id);
    const newNotes = notes.filter((data) => data._id !== id);
    setNotes(newNotes);
  };
  return (
    <NotesContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote,fetchAllNotesFromDB }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default StateContext;
