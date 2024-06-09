import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNote, updateNote } from '../actions/Notes.action';

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [teamId, setTeamId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        try {
            const response = await getNote(id);
            if (response.success) {
                const { team_id, title, body } = response.data;
                setTeamId(team_id);
                setTitle(title);
                setBody(body);
            } else {
                console.error('Failed to fetch note:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateNote(id, teamId, title, body);
            if (response.success) {
                navigate('/note');
            } else {
                console.error('Failed to update note:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Edit Note</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="teamId" className="block text-gray-700 font-bold mb-2">Team ID</label>
                        <input type="text" id="teamId" value={teamId} onChange={(e) => setTeamId(e.target.value)} className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Body</label>
                        <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <button type="submit" className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full">Update Note</button>
                </form>
                <div className="text-center">
                    <Link to="/note" className="text-sm text-gray-700 underline">Back to Notes</Link>
                </div>
            </div>
        </div>
    );
};

export default EditNote;
