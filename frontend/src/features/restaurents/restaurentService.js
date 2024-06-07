import axios from 'axios'

const API_URL = '/api/restaurents'

// Create new restaurent
const createRestaurent = async (restaurentData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, restaurentData, config)

    return response.data
};

// Get restaurents
const getRestaurents = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config)

    return response.data
};

// Delete Restaurent
const deleteRestaurent = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(`${API_URL}/${id}`, config);

    return response.data;
};

// Update restaurant
const updateRestaurent = async (id, restaurentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(`${API_URL}/${id}`, restaurentData, config);
    return response.data;
};

const restaurentService = {
    createRestaurent,
    getRestaurents,
    deleteRestaurent,
    updateRestaurent,
}

export default restaurentService