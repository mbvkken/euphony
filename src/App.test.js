const assert = require('chai').assert;

const app = require('./App.js');

describe('app.js', () => {
    it('adding two numbers work', () => {
        const result = app.addNumbers(3, 4);
        assert.equal(result, 7);
    })

    it('adding 2 numbers results in a number', () => {
        const result = app.addNumbers(3, 4);
        assert.typeOf(result, 'number');
    })

    it('subtracting 2 numbers works', () => {
        const result = app.subtractNumbers(10, 4);
        assert.equal(result, 6);
    })
})