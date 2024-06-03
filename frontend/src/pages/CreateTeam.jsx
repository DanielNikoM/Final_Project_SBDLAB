import React, { useState } from 'react';
import { createTeam } from '../actions/Team.action';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [member, setMember] = useState('');
    const [members, setMembers] = useState([]);

    const handleAddMember = () => {
        if (member.trim() !== '') {
            setMembers([...members, member]);
            setMember('');
        }
    };

    const handleRemoveMember = (index) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createTeam(teamName, description, members);
            if (response.success) {
                // Handle success, maybe redirect
            } else {
                console.error('Failed to create team:', response.data.message);
            }
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6">Create New Team</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="teamName" className="block text-gray-700 font-bold mb-2">Team Name</label>
                        <input type="text" id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="member" className="block text-gray-700 font-bold mb-2">Add Member</label>
                        <div className="flex">
                            <input type="text" id="member" value={member} onChange={(e) => setMember(e.target.value)} className="border-2 border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 mr-2" />
                            <button type="button" onClick={handleAddMember} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Add</button>
                        </div>
                    </div>
                    <div className="mb-4">
                        {members.map((member, index) => (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {member}
                                <button type="button" onClick={() => handleRemoveMember(index)} className="ml-2 text-red-500">X</button>
                            </span>
                        ))}
                    </div>
                    <button type="submit" className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">Create Team</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTeam;
