import * as BaseGenerator from 'generator-jhipster/generators/generator-base.js'
import { promptTemplateSpecificQuestions, promptToChooseATemplate } from './main-prompter';
import { writeTemplate } from './main-writer';

const chalk = require('chalk');
const semver = require('semver');
import _ from 'lodash';

const packageJson = require('../../package.json');

export class AppGenerator implements BaseGenerator {

    private templateDir: string;
    private templateType: string;
    private jhipsterAppConfig: any;

    // public constructor(args: string | string[], options: {}) {
    //     super(args, options);
    // }

    public initializing() {

        this.jhipsterAppConfig = this.getAllJhipsterConfig(this, false);

        // it's here to show that you can use functions from generator-jhipster
        // this function is in: generator-jhipster/generators/generator-base.js
        this.printJHipsterLogo();

        // Have Yeoman greet the user.
        console.log(`\nWelcome to the ${chalk.bold.yellow('JHipster Navigation Element')} generator! ${chalk.yellow(`v${packageJson.version}\n`)}`);

        const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
        const minimumJhipsterVersion = packageJson.dependencies['generator-jhipster'];
        if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
            console.log(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
        }

    }

    public prompting() {
        return {
            chooseATemplate: promptToChooseATemplate,
            templateSpecificQuestions: () => promptTemplateSpecificQuestions(this)
        };
    }

    public configuring() {
        this.templateDir = `${_.toLower(this.templateType)}/`;
    }

    public writing() {
        return {
            writeTemplateSpecificFiles() {
                writeTemplate(this);
            }
        };
    }

    public end() {
        console.log('End of navigation element generation');
    }
}
