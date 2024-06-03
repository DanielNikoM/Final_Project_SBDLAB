import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeams, updateTeam } from '../actions/Team.action';

const Teams = ({ accountId }) => {
    const [teams, setTeams] = useState([]);
    const [editing, setEditing] = useState(null);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams(accountId);
                if (response.success) {
                    setTeams(response.data);
                } else {
                    console.error('Failed to fetch teams:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, [accountId]);

    const handleEditClick = (teamId, currentName, currentDescription) => {
        setEditing(teamId);
        setNewName(currentName);
        setNewDescription(currentDescription);
    };

    const handleCancelEdit = () => {
        setEditing(null);
        setNewName('');
        setNewDescription('');
    };

    const handleSaveEdit = async (teamId) => {
        try {
            const response = await updateTeam(teamId, newName, newDescription);
            if (response.success) {
                setEditing(null);
                setNewName('');
                setNewDescription('');
                // Handle success
            } else {
                console.error('Failed to update team:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Teams</h1>
                <div className="mb-8">
                    <Link to="/create-team" className="block text-center text-white bg-black hover:bg-gray-900 font-bold py-2 px-4 rounded">
                        Create New Team
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teams.map(team => (
                        <div key={team.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                            {editing === team.id ? (
                                <div className="p-6">
                                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 mb-2" />
                                    <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 mb-2"></textarea>
                                    <div className="flex justify-between">
                                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleSaveEdit(team.id)}>Save</button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-2">{team.name}</h2>
                                    <p className="text-gray-700 text-base mb-4">{team.description}</p>
                                    <div className="flex justify-end">
                                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEditClick(team.id, team.name, team.description)}>Edit</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Teams;
