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
        const response = await axios.post(`${API_URL}/account/login`, { email, password });
        
        // Store user ID and access token in local storage
        if (response.data.success) {
            localStorage.setItem('userID', response.data.data.id);
            localStorage.setItem('accessToken', response.data.accessToken);
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            data: error.response.data,
        };
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