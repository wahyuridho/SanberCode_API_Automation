import { expect } from "chai";
import AuthService from "../function/authentication.module.js";
import UnitService from "../function/unit.module.js";
import { config } from "../data/config.js";


describe('Unit Skenario', () => {
    let authService = new AuthService();
    let unitService = new UnitService();
    let token, unitId;
    var nameUnit = 'Liter';
    var descriptionUnit = 'debit isi botol';
    var newNameUnit = 'pcs';
    var newDescriptionUnit = 'Satuan Picis';

    before('Get Token from Auth Login', async () => {
        const AuthToken = await authService.loginAuth(config.emailToko, config.passwordToko);
        token = (await AuthToken).body.data.accessToken;
    })

    it('Create Satuan Unit', async () => {
        const response = await unitService.createUnit(nameUnit, descriptionUnit, token);
        
        expect((await response).status).to.equal(201);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.message).to.contain('Unit berhasil ditambahkan');
        expect((await response).body.data.unitId).not.to.be.null;
        expect((await response).body.data.unitId).not.to.be.empty;
        expect((await response).body.data.name).to.contain(nameUnit);
        unitId = (await response).body.data.unitId;
    })

    it('Get Detail Unit', async () => {
        const response = await unitService.getUnitDetail(unitId,token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain('success');
        expect((await response).body.data.unit).to.have.property('name');
        expect((await response).body.data.unit).to.have.property('description');
    })

    it('Get list Unit', async () => {
        const response = await unitService.getListUnit(token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
        console.log((await response).body.data.units);
    })

    it('Update Unit', async () => {
        const response = await unitService.updateUnit(newNameUnit, newDescriptionUnit, token, unitId);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
        expect((await response).body.data.name).to.equal(newNameUnit);
    })

    it('Delete Unit', async () => {
        const response = await unitService.deleteUnit(unitId, token);

        expect((await response).status).to.equal(200);
        expect((await response).body.status).to.contain("success");
    })
})