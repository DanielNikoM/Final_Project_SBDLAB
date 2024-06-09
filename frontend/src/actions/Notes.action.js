import axios from "axios";

const API_URL = "http://localhost:3000"; 

const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};

export const createNote = async (teamId, title, body) => {
    try {
        const response = await axios.post(`${API_URL}/note/create`, { teamId, title, body });
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(null, false);
    }
};

export const getTeamId = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/team/${teamId}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(null, false);
    }
};

export const getNotes = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/note/${teamId}`);
        const { success, data } = response.data;

        if (success && Array.isArray(data)) {
            return {
                success: true,
                notes: data,
                message: response.data.message
            };
        } else {
            return {
                success: false,
                notes: [],
                message: 'Unexpected data format'
            };
        }
    } catch (error) {
        return {
            success: false,
            notes: [],
            message: 'Failed to fetch notes'
        };
    }
};


export const updateNote = async (noteId, title, body) => {
    try {
        const response = await axios.put(`${API_URL}/note/update/${noteId}`, { title, body });
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(null, false);
    }
};

export const deleteNote = async (noteId) => {
    try {
        const response = await axios.delete(`${API_URL}/${noteId}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(null, false);
    }
};