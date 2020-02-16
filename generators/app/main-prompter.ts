// import { Question } from 'inquirer';
// import Prompt from 'inquirer/lib/prompts/base';
// import ListPrompt from 'inquirer/lib/prompts/list';
// import { Interface as ReadLineInterface } from "readline";
import { askQuestions as promptDefaultNg2TemplateQuestions } from './about-us/about-us-ng-template-prompter';
import { askQuestions as promptDefaultReactTemplateQuestions } from './about-us/about-us-react-template-prompter';
import { TemplateType } from './constants';
import { askQuestions as promptNestedRoutesNg2TemplateQuestions } from './nested-routes/nested-routes-ng-template-prompter';

export function promptToChooseATemplate(generator: any) {
    const done = generator.async();

    // const question: Question = {
    //     default: TemplateType.DEFAULT,
    //     message: 'What would you like to generate? (More components will be added soon! Stay tuned...)',
    //     name: 'templateType',
    //     type: 'list'
    // };
    //
    // const readLine: ReadLineInterface = null;
    //
    // const p: Prompt = new ListPrompt(question, null, answers);

    generator.prompt({
        type: 'list',
        name: 'templateType',
        message: 'What would you like to generate? (More components will be added soon! Stay tuned...)',
        choices: [
            {
                name: 'A Simple Page (with a corresponding nav element)',
                value: TemplateType.DEFAULT
            },
            {
                name: 'A Page With Nested Routes',
                value: constants.TEMPLATE_TYPE.NESTED_ROUTES
            }
        ]
    }).then((prompt: any) => {
        generator.templateType = prompt.templateType;
        // To access props later use this.someOption;
        done();
    });
}

export function promptTemplateSpecificQuestions(generator: any) {
    switch (generator.templateType) {
    case TemplateType.DEFAULT:
        askDefaultTemplateQuestions(generator);
        break;
    case TemplateType.NESTED_ROUTES:
        askNestedRoutesTemplateQuestions(generator);
        break;
    default:
        break;
    }
}

function askDefaultTemplateQuestions(generator: any) {
    const clientFramework = generator.jhipsterAppConfig.clientFramework;
    if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        promptDefaultNg2TemplateQuestions(generator);
    } else if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT) {
        promptDefaultReactTemplateQuestions(generator);
    }
}
function askNestedRoutesTemplateQuestions(generator: any) {
    if (generator.jhipsterAppConfig.clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        promptNestedRoutesNg2TemplateQuestions(generator);
    }
}
