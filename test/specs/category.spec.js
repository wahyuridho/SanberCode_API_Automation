import { config } from "../data/config.js";
import CategoryService from "../function/category.module.js";
import AuthService from "../function/authentication.module.js";
import { expect } from "chai";


describe('Category Skenario', () => {
    const authService = new AuthService();
    const categoryService = new CategoryService();
    let token, categoryId;
    var nameCategory = 'Snack';
    var descCategory = 'Makanan Ringan';
    var upNameCategory = 'Drink'
    var upDescCategory = 'Minuman Segar'

    before('Get Token from Auth', async () => {
        const AuthToken = await authService.loginAuth(config.emailToko, config.passwordToko);
        token = (await AuthToken).body.data.accessToken;
    })

    it('Success Add Category', async () => {
        const response = await categoryService.createCategory(nameCategory, descCategory, token);

        expect((await response).status).to.equal(201);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.message).to.contain('Category berhasil ditambahkan');
        expect((await response).body.data.categoryId).not.to.be.null;
        expect((await response).body.data.categoryId).not.to.be.empty;
        expect((await response).body.data.name).to.contain(nameCategory);
        categoryId = (await response).body.data.categoryId;
    })
    
    it('Success Get Detail Category', async () => {
        const response = await categoryService.getCategoryDetail(categoryId, token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.data.category).to.have.property('name');
        expect((await response).body.data.category).to.have.property('description');
    })

    it('Success Get List Category', async () => {
        const response = await categoryService.getListCategory(token);
        
        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        // console.log((await response).body.data.categories);
    })

    it('Success Update Category', async () => {
        const response = await categoryService.updateCategory(upNameCategory, upDescCategory, token, categoryId);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
        expect((await response).body.data.name).to.equal(upNameCategory);
    })

    it('Success Delete Category', async () => {
        const response = await categoryService.deleteCategory(categoryId, token);
        
        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
    })
})