import { config } from "../data/config.js";
import request from 'supertest';

class UnitService {
    createUnit = async (name, description, token) => {
        const payload = {
            "name": name,
            "description" : description
        };

        const response = await request(config.baseURL)
            .post('/units')
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getUnitDetail = async (unitId, token) => {
        const response = await request(config.baseURL)
            .get(`/units/${unitId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getListUnit = async (token) => {
        const response = await request(config.baseURL)
            .get('/units')
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    updateUnit = async (name, description, token, unitId) => {
        const payload = {
            "name": name,
            "description": description   
        };


        const response = await request(config.baseURL)
            .put(`/units/${unitId}`)
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    deleteUnit = async (unitId, token) => {
        const response = await request(config.baseURL)
            .delete(`/units/${unitId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }
}

export default UnitService;