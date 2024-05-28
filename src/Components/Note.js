import React,{useContext} from "react";
import '../App.css';
import NotesContext from "../Context/NoteContext";

const Note = (props) => {
    const {deleteNote}=useContext(NotesContext);
    const {note}=props;
  return (
    <div className="col-md-4 my-2">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">
          {note.description}
        </p>
        <p className="text-muted my-0">Label: {note.label}</p>
        <p className="text-muted my-2">Posted on: {note.date}</p>
        <i onClick={()=>props.editNote(props)} className="fa-regular fa-pen-to-square"></i>
        <i onClick={()=>deleteNote(note._id)} className="fa-sharp fa-solid fa-trash mx-3"></i>
      </div>
    </div>
    </div>
  );
};

export default Note;
