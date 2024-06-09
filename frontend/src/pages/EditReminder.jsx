import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReminder, updateReminder } from '../actions/Reminder.action';

const EditReminder = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [remindedAt, setRemindedAt] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchReminder = async () => {
            try {
                const response = await getReminder(id);
                if (response.success) {
                    const reminder = response.data;
                    setTitle(reminder.title);
                    setBody(reminder.body);
                    setRemindedAt(reminder.reminded_at);
                    setStatus(reminder.status);
                } else {
                    console.error('Failed to fetch reminder:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching reminder:', error);
            }
        };
        fetchReminder();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateReminder(id, title, body, remindedAt, status);
            if (response.success) {
                navigate('/reminder');
            } else {
                console.error('Failed to update reminder:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating reminder:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Edit Reminder</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">Body</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="remindedAt" className="block text-gray-700 font-bold mb-2">Remind At</label>
                        <input
                            type="datetime-local"
                            id="remindedAt"
                            value={remindedAt}
                            onChange={(e) => setRemindedAt(e.target.value)}
                            className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
                        <input
                            type="text"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                        Update Reminder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditReminder;
