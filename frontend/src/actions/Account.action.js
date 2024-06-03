import axios from "axios";

const API_URL = "http://localhost:3000"; 

const baseApiResponse = (data, isSuccess) => {
    return {
        success: isSuccess,
        data: data || null,
    };
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/account/login`, {
            email,
            password,
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/account/register`, {
            name,
            email,
            password,
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
}

export const updateAccount = async (accountId, name, email, password) => {
    try {
        const response = await axios.put(`${API_URL}/account/update/${accountId}`, {
            name,
            email,
            password,
        });
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
}

export const deleteAccount = async (accountId) => {
    try {
        const response = await axios.delete(`${API_URL}/account/${accountId}`);
        return baseApiResponse(response.data, true);
    } catch (error) {
        return baseApiResponse(error.response.data, false);
    }
}