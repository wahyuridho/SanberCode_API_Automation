import { config } from "../data/config.js";
import Authservice from "../function/authentication.module.js";
import ProductService from "../function/product.module.js";
import { expect } from "chai";

describe('Product Scenario', () => {
    const authservice = new Authservice();
    const productService = new ProductService();
    let token, productId;
    let categoryId = 'be408e28-b4a8-49bf-b5ff-2b2fca0f6d4e';
    var code = '001';
    var nameProduct = 'Tiara';
    var price = '2000';
    var cost = '1500';
    var stock = '10';
    var upNameProduct = 'Chitos';

    before('Get token from Auth', async () => {
        const authToken = authservice.loginAuth(config.emailToko, config.passwordToko);
        token = (await authToken).body.data.accessToken;
    })

    it('Success Add Product',async () => {
        const response = await productService.createProduct(categoryId, code, nameProduct, price, cost, stock, token);
        
        expect((await response).status).to.equal(201);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.message).to.contain('Product berhasil ditambahkan');
        expect((await response).body.data.productId).not.to.be.null;
        expect((await response).body.data.productId).not.to.be.empty;
        expect((await response).body.data.name).to.contain(nameProduct);
        productId = (await response).body.data.productId;
    })

    it('Success Get Detail Product', async () => {
        const response = await productService.getProductDetail(productId, token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.data.product).to.have.property('code');
        expect((await response).body.data.product).to.have.property('name');
        expect((await response).body.data.product).to.have.property('category_id');
    })

    it('Success Get List Product', async () => {
        const response = await productService.getListProduct(token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        // console.log((await response).body.data.products);
    })

    it('Success Update Product', async () => {
        const response = await productService.updateProduct(categoryId, code, upNameProduct, price, cost, stock, token, productId);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.message).to.contain('Product berhasil diupdate');
        expect((await response).body.data.name).to.equal(upNameProduct);
    })

    it('Success Delete Product', async () => {
        const response = await productService.deleteProduct(productId, token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.message).to.contain('Product berhasil dihapus');
    })
})