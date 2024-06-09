import React, { useState, useEffect } from 'react';
import { createTeam } from '../actions/Team.action';
import { useNavigate } from 'react-router-dom';

export function CreateTeamPage() {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      // Retrieve ownerId from local storage
      const storedOwnerId = localStorage.getItem('userID');
      if (storedOwnerId) {
          setOwnerId(storedOwnerId);
      } else {
          setMessage('Owner ID is missing. Please log in.');
      }
  }, []);

    const handleCreateTeam = async (e) => {
        e.preventDefault();

        if (!title) {
            setMessage('Please enter a team name.');
            return;
        }

        if (!ownerId) {
            setMessage('Owner ID is missing. Please log in.');
            return;
        }

        console.log('Creating team with:', { ownerId, title }); // Debug log

        try {
            const response = await createTeam(ownerId, title);
            if (response.success) {
                navigate('/teams');  
            } else {
                setMessage(response.message || 'Failed to create team. Please try again.');
            }
            setTitle('');
        } catch (error) {
            setMessage('Failed to create team. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Team</h1>
            <form onSubmit={handleCreateTeam} className="mb-4">
                <div className="mb-2">
                    <label className="block text-gray-700">Team Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter team name"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create Team
                </button>
            </form>
            {message && <p className="mt-4 text-lg">{message}</p>}
        </div>
    );
}
