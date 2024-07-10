import { config } from "../data/config.js";
import request from 'supertest';

class CategoryService {
    createCategory = async (name, description, token) => {
        const payload = {
            "name": name,
            "description" : description
        };

        const response = await request(config.baseURL)
            .post('/categories')
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getCategoryDetail = async (categoryId, token) => {
        const response = await request(config.baseURL)
            .get(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getListCategory = async (token) => {
        const response = await request(config.baseURL)
            .get('/categories')
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    updateCategory = async (name, description, token, categoryId) => {
        const payload = {
            "name": name,
            "description": description   
        };


        const response = await request(config.baseURL)
            .put(`/categories/${categoryId}`)
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    deleteCategory = async (categoryId, token) => {
        const response = await request(config.baseURL)
            .delete(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }
}

export default CategoryService;