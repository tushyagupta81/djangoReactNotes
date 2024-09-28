import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note was deleted");
        } else {
          alert("Failed to delete note");
        }
        // Should be essentially be deleted from the list on the frontend not fetched again
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note Created");
        } else {
          alert("Failed to make note");
        }
        // Should be essentially be deleted from the list on the frontend not fetched again
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          required
          value={content}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Home;
