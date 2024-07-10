import { expect } from "chai";
import AuthService from "../function/authentication.module.js";
import UserService from "../function/user.module.js";
import { config } from "../data/config.js";

describe('User Scenario', () => {
    let authService = new AuthService();
    let userService = new UserService();
    let token, userId;
    var nameUser = "Kasir Gwe";
    var emailUser = "kasir01@asa.com";
    var passwordUser = "PasswordKasir";
    var upNameUser = "Kasir 23";
    var upEmailUser = "kasir02@asa.com";

    // Get Token
    before('Get Token from Auth Login', async () => {
        const AuthToken = await authService.loginAuth(config.emailToko, config.passwordToko);
        token = (await AuthToken).body.data.accessToken;
    })

    it('Succes Create new User Kasir', async() => {
        const response = await userService.registrationUser(nameUser, emailUser, passwordUser, token);

        expect((await response).status).to.equal(201);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.message).to.contain('User berhasil ditambahkan');
        expect((await response).body.data.userId).not.to.be.null;
        expect((await response).body.data.userId).not.to.be.empty;
        expect((await response).body.data.name).to.contain('Kasir Gwe');
        userId = (await response).body.data.userId;
    })

    it('Succes Get Detail User', async () => {
        const response = await userService.getUserDetail(userId, token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.data.user.id).to.equal(userId)
        expect((await response).body.data.user).to.have.property('name');
        expect((await response).body.data.user).to.have.property('email');
        expect((await response).body.data.user).to.have.property('role');
    })

    it('Succes Get List User', async () => {
        const response = await userService.getListUser(token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
        console.log((await response).body.data.users)
    })

    it('Succes Update Data User', async () => {
        const response = await userService.updateUser(upNameUser, upEmailUser, token, userId);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
        expect((await response).body.message).to.contain("User berhasil diupdate");
        expect((await response).body.data.name).to.equal(upNameUser);
    })

    it('Success Delete User', async () => {
        const response = await userService.deleteUser(userId, token);
        
        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
        expect((await response).body.message).to.contain("User berhasil dihapus");
    })

})