import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAllTeams, getTeams } from '../actions/Team.action';
import Card from '../components/Card';
import { HomeNavbar } from '../components/HomeNavbar';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getAllTeams();
                if (response.success) {
                    setTeams(response.data.data); 
                } else {
                    throw new Error(response.data.message || "Failed to fetch teams");
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    }

    const getRandomImage = () => {
        const randomId = Math.floor(Math.random() * 1000); 
        return `https://picsum.photos/seed/${randomId}/300/200`; 
    };

    const handleCardClick = (id) => {
        navigate(`/team/${id}`);
    };

    return (
        <div>
            <HomeNavbar />
            <div className="container mx-auto p-4">
                {teams.length === 0 ? (
                    <div className="text-center text-gray-500">No teams found</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 mt-5">
                        {teams.map(team => (
                            <div key={team.id} onClick={() => handleCardClick(team.id)}>
                                <Card 
                                    title={team.title} 
                                    image={getRandomImage()} 
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="text-center mt-8">
                    <Link to="/create_team" className="inline-block text-white bg-black hover:bg-gray-900 font-bold py-2 px-4 rounded">
                        Create New Team
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Teams;
