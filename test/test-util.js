const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');
const _ = require('lodash');

module.exports = {
    commonSetup,
    commonTests
};

function commonSetup(setupConfig) {
    const {
        answers,
        playgroundDir
    } = setupConfig;

    beforeAll((done) => {
        jest.setTimeout(1000);
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .inTmpDir((dir) => fs.copySync(playgroundDir, dir))
            .withOptions({
                skipInstall: true
            })
            .withPrompts(answers)
            .then(() => done());
    });
}

function commonTests(testConfig) {
    const { expectedFiles } = testConfig;

    // _.forEach(expectedFiles.client.added, (file) => {
    //     test(`creates expected production file: ${file}`, () => {
    //         assert.file(file);
    //     });
    //
    //     // test(`production file has right content: ${file}`, () => {
    //     //     // const actualContent = fs.readFileSync(file, 'utf8');
    //     //     // const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
    //     //     // assert.textEqual(actualContent, expectedContent);
    //     // });
    // });

    const addedFiles = expectedFiles.client.added.map((i) => [i]);
    test.each(addedFiles)('creates expected production file: %s', assert.file);

    // _.forEach(expectedFiles.client.addedTests, (file) => {
    //     test(`creates expected test file: ${file}`, () => {
    //         // eslint-disable-next-line no-console
    //         console.log(`file: ${file}`);
    //         assert.file(file);
    //     });
    //
    //     // test(`test file has right content: ${file}`, () => {
    //     //     // const actualContent = fs.readFileSync(file, 'utf8');
    //     //     // const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
    //     //     // assert.textEqual(actualContent, expectedContent);
    //     // });
    // });
    //
    // _.forEach(expectedFiles.client.changed, (file) => {
    //     // test(`modifies expected production file: ${file}`, () => {
    //     //     // const actualContent = fs.readFileSync(file, 'utf8');
    //     //     // const expectedContent = fs.readFileSync(resultsDir + file, 'utf8');
    //     //     // assert.textEqual(actualContent, expectedContent);
    //     // });
    // });
}
