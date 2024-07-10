import { config } from "../data/config.js";
import request from 'supertest';

class UserService {
    registrationUser = async (name, email, password, token) => {
        const payload = {
            "name": name,
            "email": email,
            "password": password
        };

        const response = await request(config.baseURL)
            .post('/users')
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getUserDetail = async (userId, token) => {
        const response = await request(config.baseURL)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getListUser = async (token) => {
        const response = await request(config.baseURL)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    updateUser = async (name, email, token, userId) => {
        const payload = {
            "name": name,
            "email": email   
        };


        const response = await request(config.baseURL)
            .put(`/users/${userId}`)
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    deleteUser = async (userId, token) => {
        const response = await request(config.baseURL)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }
}

export default UserService;