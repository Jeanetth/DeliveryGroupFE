import { getTipoComercios } from "./boundary/obtenerTipoComercio.js";
mocha.setup('bdd');
const expect = chai.expect;
const assert = chai.assert;

describe('Obtener tipoComercios', function() {
    beforeEach(function() {

    });

    it('debería obtener tipo comercios', function() {
        console.log(getTipoComercios())

        const resultado = getTipoComercios();

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