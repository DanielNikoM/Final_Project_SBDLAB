import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeamByTeamId, updateTeam } from "../actions/Team.action"; // Mengimport fungsi dari team.action.js

const EditTeam = () => {
    const [name, setName] = useState("");
    const { teamId } = useParams(); // Menggunakan useParams untuk mendapatkan id tim
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeam = async () => {
        try {
            const response = await getTeamByTeamId(teamId); // Menggunakan getTeamByTeamId untuk mengambil data tim
            if (response.success) {
            setName(response.data.name);
            } else {
            console.error("Failed to fetch team:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching team:", error);
        }
        };
        fetchTeam();
    }, [teamId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await updateTeam(teamId, name); // Menggunakan updateTeam untuk mengupdate data tim
        if (response.success) {
            navigate("/teams");
        } else {
            console.error("Failed to update team:", response.data.message);
        }
        } catch (error) {
        console.error("Error updating team:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container mx-auto px-4 py-8 relative">
            <div className="absolute inset-0 bg-white rounded-lg shadow-lg z-0"></div>
            <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Edit Team</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Team Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                />
                </div>
                <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/team")}
                >
                    Cancel
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default EditTeam;
