import { expect } from "chai";
import AuthService from "../function/authentication.module.js";


describe("Authorization Scenario", () => {
  let authService = new AuthService();
  let refreshToken;

  it("Should Succes Registration Toko", async () => {

    const response = await authService.registrationAuth("Tokomu", "Adalah@asa.com", "Yeyeyey");

    expect((await response).status).to.equal(201);
    expect((await response).body.status).to.contain("succes");
    expect((await response).body.message).to.contain("Toko berhasil didaftarkan");
    expect((await response).body.data.name).to.contain("Tokomu");

  });


  it("Should Succes Login as Admin", async () => {

    const response = await authService.loginAuth("Adalah@asa.com", "Yeyeyey");

    expect((await response).status).to.equal(201);
    expect((await response).body.status).to.contain("succes");
    expect((await response).body.message).to.contain("Authentication berhasil ditambahkan");
    expect((await response).body.data.accessToken).not.to.be.null;
    expect((await response).body.data.accessToken).not.to.be.empty;
    expect((await response).body.data.refreshToken).not.to.be.null;
    expect((await response).body.data.refreshToken).not.to.be.empty;
    
    refreshToken = (await response).body.data.refreshToken;

  });


  it("Should Succes Update AccesToken", async () => {

    const response = await authService.refreshToken(refreshToken);

    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.contain("succes");
    expect((await response).body.message).to.contain("Access Token berhasil diperbarui");
    expect((await response).body.data.accessToken).not.to.be.null;
    expect((await response).body.data.accessToken).not.to.be.empty;

  })


  it("Should Succes Logout Account", async () => {

    const response = await authService.logoutAuth(refreshToken);

    expect((await response).status).to.equal(200);
    expect((await response).body.status).to.contain("succes");
    expect((await response).body.message).to.contain("Refresh token berhasil dihapus");

  })

});