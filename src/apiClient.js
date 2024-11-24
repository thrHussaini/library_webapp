// apiClient.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8085/api/v1/book';

export const fetchBooks = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data; // Assuming the response contains the list of books in data
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};
