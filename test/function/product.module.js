import { config } from "../data/config.js";
import request from 'supertest';

class ProductService {
    createProduct = async (categoryId, code, name, price, cost, stock, token) => {
        const payload = {
            "category_id" : categoryId,
            "code": code,
            "name": name,
            "price": price,
            "cost": cost,
            "stock": stock
        };

        const response = await request(config.baseURL)
            .post('/products')
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getProductDetail = async (productId, token) => {
        const response = await request(config.baseURL)
            .get(`/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    getListProduct = async (token) => {
        const response = await request(config.baseURL)
            .get('/products')
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    updateProduct = async (categoryId, code, name, price, cost, stock, token, productId) => {
        const payload = {
            "category_id" : categoryId,
            "code": code,
            "name": name,
            "price": price,
            "cost": cost,
            "stock": stock
        };


        const response = await request(config.baseURL)
            .put(`/products/${productId}`)
            .send(payload)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }

    deleteProduct = async (productId, token) => {
        const response = await request(config.baseURL)
            .delete(`/products/${productId}`)
            .set('Authorization', `Bearer ${token}`);

        return response;
    }
}

export default ProductService;