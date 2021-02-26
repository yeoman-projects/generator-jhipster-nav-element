const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const navElementConstants = require('../../../generators/app/constants');

describe('☯ core', () => {
    beforeAll((done) => {
        jest.useFakeTimers();
        helpers.run(path.join(__dirname, '../../../generators/app'))
            .withPrompts({ templateType: navElementConstants.TEMPLATE_TYPE.DEFAULT })
            // .on('error', (error) => {
            //     assert.textEqual(error.message, 'Can\'t read .yo-rc.json');
            // })
            .toPromise()
            .then(() => done(), (error) => {
                assert.textEqual(error.message, 'Can\'t read .yo-rc.json');
            });
    });

    test('throws error when .yo-rc.json is not found', () => {});
});
