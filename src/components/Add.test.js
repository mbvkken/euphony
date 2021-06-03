const assert = require('chai').assert;

const add = require('./Add.js');

describe('add.js', () => {
    it('adding review works', () => {
        const result = add.addReview;
        assert.equal(result, undefined);
    })
})