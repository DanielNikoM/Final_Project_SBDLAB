import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReminder } from '../actions/Reminder.action';

const CreateReminder = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [remindedAt, setRemindedAt] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const teamId = localStorage.getItem('team_id'); // Assuming team_id is stored in localStorage
            if (!teamId) {
                console.error('No team ID found');
                return;
            }
            const response = await createReminder(teamId, title, body, remindedAt);
            if (response.success) {
                setTitle('');
                setBody('');
                setRemindedAt('');
                navigate('/reminder'); // Redirect to reminders page
            } else {
                console.error('Failed to create reminder:', response.data.message);
            }
        } catch (error) {
            console.error('Error creating reminder:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Create New Reminder</h1>
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
                    <button type="submit" className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                        Create Reminder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateReminder;
