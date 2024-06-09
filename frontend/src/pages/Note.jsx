import React, { useState, useEffect } from 'react';
import { HomeNavbar } from '../components/HomeNavbar';
import { getNotes, createNote } from '../actions/Notes.action';

export function Note() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const [teamId, setTeamId] = useState('');

    useEffect(() => {
        const storedTeamId = localStorage.getItem('teamId');
        if (storedTeamId) {
            setTeamId(storedTeamId);
        } else {
            setMessage('Team ID is missing. Please select a team.');
        }
    }, []);

    useEffect(() => {
        if (teamId) {
            setNotes([]); // Clear notes on teamId change
            fetchNotes();
        }
    }, [teamId]);

    const fetchNotes = async () => {
        try {
            const response = await getNotes(teamId);
            if (response.success) {
                const fetchedNotes = response.notes;
                if (Array.isArray(fetchedNotes)) {
                    setNotes(fetchedNotes);
                } else {
                    setMessage('Unexpected data format. Please check the response.');
                    console.error('Expected an array, but got:', fetchedNotes);
                }
            } else {
                setMessage(response.message || 'Failed to fetch notes.');
            }
        } catch (error) {
            setMessage('Error fetching notes.');
            console.error('Error fetching notes:', error);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();

        if (!title || !body) {
            setMessage('Please enter both a title and body for the note.');
            return;
        }

        if (!teamId) {
            setMessage('Team ID is missing. Please select a team.');
            return;
        }

        try {
            const response = await createNote(teamId, title, body);
            if (response.success) {
                const newNote = { id: notes.length + 1, title, body };
                const updatedNotes = [...notes, newNote];
                setNotes(updatedNotes);
                setTitle('');
                setBody('');
                setMessage('Note added successfully!');
            } else {
                setMessage(response.data.message || 'Failed to add note.');
            }
        } catch (error) {
            setMessage('Failed to add note.');
        }
    };

    return (
        <div>
            <HomeNavbar />
            <div className="container mx-auto p-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Add Note</h1>
                    <form onSubmit={handleAddNote} className="mb-4 w-full max-w-lg">
                        <div className="mb-2">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Enter note title"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Body</label>
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Enter note body"
                                rows="4"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
                        >
                            Add Note
                        </button>
                    </form>
                </div>
                {message && <p className="mt-4 text-lg text-center">{message}</p>}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Notes</h2>
                    {notes.length === 0 ? (
                        <div className="text-center text-gray-500">No notes found</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {notes.map(note => (
                                <div key={note.id} className="p-4 bg-white rounded shadow-md">
                                    <h3 className="text-lg font-semibold">{note.title}</h3>
                                    <p className="text-gray-600">{note.body}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
