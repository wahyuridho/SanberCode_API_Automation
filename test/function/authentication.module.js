import { config } from '../data/config.js';
import request from 'supertest';

class AuthService {
    registrationAuth = async (name, email, password) => {
        const payload = {
            "name": name,
            "email": email,
            "password": password
        };

        const response = await request(config.baseURL)
            .post('/registration')
            .send(payload);

        return response;
    }

    loginAuth = async (email, password) => {
        const payload = {
            "email": email,
            "password": password
        };

        const response = await request(config.baseURL)
            .post('/authentications')
            .send(payload);

        return response;
    }

    refreshToken = async (refreshToken) => {
        const payload = {
            "refreshToken" : refreshToken
        }

        const response = await request(config.baseURL)
            .put('/authentications')
            .send(payload);

        return response;
    }

    logoutAuth = async (refreshToken) => {
        const payload = {
            "refreshToken" : refreshToken
        }

        const response = await request(config.baseURL)
            .delete('/authentications')
            .send(payload);

        return response;
    }
}

export default AuthService;