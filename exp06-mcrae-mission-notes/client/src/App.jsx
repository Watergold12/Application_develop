import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/notes";

function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("General");
    const [pinned, setPinned] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const loadNotes = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNotes(data);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const saveNote = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Title and content are required.");
            return;
        }

        const note = {
            title,
            content,
            category,
            pinned
        };

        if (editingId) {
            await fetch(`${API_URL}/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(note)
            });
        }

        clearForm();
        loadNotes();
    };

    const editNote = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
        setPinned(note.pinned);
        setEditingId(note._id);
    };

    const deleteNote = async (id) => {
        if (!confirm("Delete this note?")) return;

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadNotes();
    };

    const clearForm = () => {
        setTitle("");
        setContent("");
        setCategory("General");
        setPinned(false);
        setEditingId(null);
    };

    return (
        <div className="app">
            <header>
                <h1>McRae Mission Notes</h1>
                <p>Engineering notes powered by MongoDB</p>
            </header>

            <main>
                <section className="editor">
                    <h2>{editingId ? "Edit Note" : "Create Note"}</h2>

                    <form onSubmit={saveNote}>
                        <input
                            type="text"
                            placeholder="Note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Write your note..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>General</option>
                            <option>ROS2</option>
                            <option>AI / ML</option>
                            <option>Web Development</option>
                            <option>Hardware</option>
                        </select>

                        <label>
                            <input
                                type="checkbox"
                                checked={pinned}
                                onChange={(e) => setPinned(e.target.checked)}
                            />
                            Pin this note
                        </label>

                        <div className="buttons">
                            <button type="submit">
                                {editingId ? "Update Note" : "Save Note"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="cancel"
                                    onClick={clearForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section className="notes">
                    <h2>My Notes</h2>

                    {notes.length === 0 ? (
                        <p>No notes available.</p>
                    ) : (
                        notes.map((note) => (
                            <article
                                className={`note ${note.pinned ? "pinned" : ""}`}
                                key={note._id}
                            >
                                <div className="note-header">
                                    <h3>{note.title}</h3>

                                    {note.pinned && (
                                        <span>📌</span>
                                    )}
                                </div>

                                <span className="category">
                                    {note.category}
                                </span>

                                <p>{note.content}</p>

                                <small>
                                    {new Date(
                                        note.createdAt
                                    ).toLocaleString()}
                                </small>

                                <div className="actions">
                                    <button onClick={() => editNote(note)}>
                                        Edit
                                    </button>

                                    <button
                                        className="delete"
                                        onClick={() =>
                                            deleteNote(note._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;