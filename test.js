import { getTipoComercios,getAllComercios,getComercioProducto, getComercioSucursales } from "./boundary/obtenerTipoComercio.js";

mocha.setup('bdd');
const expect = chai.expect;
const assert = chai.assert;

describe('Obtener tipoComercios', function() {
    beforeEach(function() {

    });

    it('debería obtener tipo comercios', async function() {
        console.log(getTipoComercios())

        const resultado = await getTipoComercios();

        expect(resultado).to.exist;
    });

    it('debería hacer algo más', function() {
        // Otra prueba aquí
        assert.strictEqual('hola'.length, 4);
    });

    afterEach(function() {
        // Limpiar después de cada prueba
    });
});
describe('Deberia obtener todos los comercios', function() {
    beforeEach(function() {

    });

    it('debería obtener tipo comercios', async function() {
        console.log(getTipoComercios())

        const resultado = await getAllComercios();

        expect(resultado).to.exist;
    });

    it('debería hacer algo más', function() {
        // Otra prueba aquí
        assert.strictEqual('hola'.length, 4);
    });

    afterEach(function() {
        // Limpiar después de cada prueba
    });
});
describe('Obtener comercioProducto', function() {
    beforeEach(function() {

    });

    it('debería obtener tipo comercios', async function() {
        console.log(getTipoComercios())

        const resultado = await getComercioProducto();

        expect(resultado).to.exist;
    });

    it('debería hacer algo más', function() {
        // Otra prueba aquí
        assert.strictEqual('hola'.length, 4);
    });

    afterEach(function() {
        // Limpiar después de cada prueba
    });
});
describe('Obtener comercioSucursales', function() {
    beforeEach(function() {

    });

    it('debería obtener tipo comercios', async function() {
        console.log(getTipoComercios())

        const resultado = await getComercioSucursales();

        expect(resultado).to.exist;
    });

    it('debería hacer algo más', function() {
        // Otra prueba aquí
        assert.strictEqual('hola'.length, 4);
    });

    afterEach(function() {
        // Limpiar después de cada prueba
    });
});


mocha.run();
