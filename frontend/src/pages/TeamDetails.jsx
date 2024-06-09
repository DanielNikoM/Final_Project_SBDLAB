import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import { HomeNavbar } from '../components/HomeNavbar';
import { getTeamByTeamId } from '../actions/Team.action';

export function TeamDetails ()  {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTeamDetails = async () => {
            try {
                const response = await getTeamByTeamId(teamId);
                if (response.success) {
                    setTeam(response.data);
                    localStorage.setItem('teamId', teamId); 
                } else {
                    throw new Error(response.data.message || 'Failed to fetch team');
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTeamDetails();
    }, [teamId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    }

    const getRandomImage = () => {
        const randomId = Math.floor(Math.random() * 1000);
        return `https://picsum.photos/seed/${randomId}/600/400`;
    };

    return (
        <div>
            <HomeNavbar />
            <div className="container mx-auto p-4">
                {team && (
                    <Card 
                        title={team.title} 
                        image={getRandomImage()} 
                        body={
                            <div className="space-y-4">
                                <Link 
                                    to={`/edit-team/${teamId}`} 
                                    className="block text-center text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
                                >
                                    Edit Team
                                </Link>
                                <Link 
                                    to={`/team/${teamId}/notes/`} 
                                    className="block text-center text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded"
                                >
                                    View Notes
                                </Link>
                                <Link 
                                    to={`/add-reminder/${teamId}`} 
                                    className="block text-center text-white bg-yellow-500 hover:bg-yellow-700 py-2 px-4 rounded"
                                >
                                    Add Reminder
                                </Link>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

