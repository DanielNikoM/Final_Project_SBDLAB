import axios from "axios";

const API_URL = "http://localhost:3000"; 

const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};

export const createReminder = async (team_id, title, body, reminded_at) => {
    try {
        const response = await axios.post(`${API_URL}/reminder/create`, {
            team_id,
            title,
            body,
            reminded_at,
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
};

export const getReminder = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/reminder/${teamId}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
};


export const deleteReminder = async (reminderId) => {
    try {
        const response = await axios.delete(`${API_URL}/reminder/${reminderId}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
};

export const updateReminder = async (reminderId, title, body, reminded_at, status) => {
    try {
        const response = await axios.put(`${API_URL}/reminder/update/${reminderId}`, {
            title,
            body,
            reminded_at,
            status,
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
};
