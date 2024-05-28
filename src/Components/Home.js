import React, { useContext, useState, useRef, useEffect } from "react";
import NotesContext from "../Context/NoteContext";
import Note from "./Note";
import { useNavigate } from "react-router-dom";
import {} from 'react-dom'

export default function Home() {
  const navigator=useNavigate();
  const { notes, setNotes, addNote, editNote,fetchAllNotesFromDB } = useContext(NotesContext);
  const [note, setNote] = useState({ title: "", description: "", label: "" });
  const [enote, esetNote] = useState({
    eid:"",
    etitle: "",
    edescription: "",
    elabel: "",
  });
  useEffect(()=>{
    fetchAllNotesFromDB();
    if(!localStorage.getItem("token")){
      navigator('/login')
    }
  },[])
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef();
  const closeRef=useRef();

  const showModal = (enotes) => {
    ref.current.click();
    esetNote({eid:enotes.note._id,etitle:enotes.note.title,edescription:enotes.note.description,elabel:enotes.note.label});
    console.log(enotes.note);
  };
  const ehandleChange = (e) => {
    esetNote({ ...enote, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
  };
  const editNotes=()=>{
    closeRef.current.click();
    editNote(enote)
  }
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Note title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            described="emailHelp"
            placeholder="Enter title"
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Note description</label>
          <input
            type="text"
            class="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Note label</label>
          <input
            type="text"
            class="form-control"
            id="label"
            name="label"
            placeholder="Enter label"
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Add a note
        </button>
      </form>
      <h3 className="my-4">Notes</h3>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div class="form-group">
                <label for="exampleInputEmail">Note title</label>
                <input
                  type="text"
                  class="form-control"
                  id="etitle"
                  name="etitle"
                  described="emailHelp"
                  placeholder="Enter title"
                  onChange={ehandleChange}
                  value={enote.etitle}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword">Note description</label>
                <input
                  type="text"
                  class="form-control"
                  id="edescription"
                  name="edescription"
                  placeholder="Enter description"
                  onChange={ehandleChange}
                  value={enote.edescription}
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Note label</label>
                <input
                  type="text"
                  class="form-control"
                  id="elabel"
                  name="elabel"
                  placeholder="Enter label"
                  onChange={ehandleChange}
                  value={enote.elabel}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                onClick={() => editNotes()}
                type="button"
                className="btn btn-primary"
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {notes?.map((data) => (
          <Note editNote={showModal} note={data} />
        ))}
      </div>
    </div>
  );
}
