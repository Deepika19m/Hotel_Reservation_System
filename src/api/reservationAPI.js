import axios from "axios";
const API_URL = "http://localhost:4000/api/reservations";

export const fetchReservations = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Fetched reservations:", response);
        return response.data;
    } catch (err) {
        console.error("Error fetching reservations:", err);
        throw err;
    }
};

export const createReservation = async (reservationData) => {
    try {
        const response = await axios.post(API_URL, reservationData);
        console.log("Created reservation:", response);
        return response.data;
    } catch (err) {
        console.error("Error creating reservation:", err);
        throw err;
    }
};

export const editReservation = async (id, reservationData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, reservationData);
        console.log("Edited reservation:", response);
        return response.data;
    } catch (err) {
        console.error("Error editing reservation:", err);
        throw err;
    }
};

export const deleteReservation = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log("Deleted reservation:", response);
        return response.data;
    } catch (err) {
        console.error("Error deleting reservation:", err);
        throw err;
    }
};
