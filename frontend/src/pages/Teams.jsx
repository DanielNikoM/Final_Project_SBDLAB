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
                setTeams(teams.map(team => (team.id === teamId ? { ...team, name: newName, description: newDescription } : team)));
                setEditing(null);
                setNewName('');
                setNewDescription('');
            } else {
                console.error('Failed to update team:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container mx-auto px-4 py-8 relative">
                {/* Background Box */}
                <div className="absolute inset-0 bg-white rounded-lg shadow-lg z-0"></div>
                <div className="relative z-10">
                    {/* Title */}
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Teams</h1>
                    
                    {/* Create Team Button */}
                    <div className="mb-8 text-center">
                        <Link to="/create-team" className="inline-block text-white bg-black hover:bg-gray-900 font-bold py-2 px-4 rounded">
                            Create New Team
                        </Link>
                    </div>
                    
                    {/* Teams List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {teams.map(team => (
                            <div key={team.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg">
                                {editing === team.id ? (
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Team Name</label>
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                className="border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2">Description</label>
                                            <textarea
                                                value={newDescription}
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                className="border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-between">
                                            <button
                                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleSaveEdit(team.id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{team.name}</h2>
                                        <p className="text-gray-600 text-base mb-4">{team.description}</p>
                                        <div className="flex justify-end">
                                            <button
                                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleEditClick(team.id, team.name, team.description)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teams;
