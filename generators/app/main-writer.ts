import { TemplateType } from './constants';
import { write as writeDefaultNg2Template } from './about-us/about-us-ng-template-writer';
import { write as writeNestedRoutesNg2Template } from './nested-routes/nested-routes-ng-template-writer';
import { write as writeCookieConsentNg2Template } from './cookie-consent/cookie-consent-ng-template-writer';

export function writeTemplate(generator: any) {
    switch (generator.templateType) {
        case TemplateType.DEFAULT:
            writeDefaultTemplate(generator);
            break;
        case TemplateType.NESTED_ROUTES:
            writeNestedRoutesTemplate(generator);
            break;
        default:
            break;
    }
}

function writeDefaultTemplate(generator: any) {
    const clientFramework = generator.jhipsterAppConfig.clientFramework;
    if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        writeDefaultNg2Template(generator);
    } else if (clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.REACT) {
        defaultReactTemplateWriter.write(generator);
    }
}
function writeNestedRoutesTemplate(generator: any) {
    if (generator.jhipsterAppConfig.clientFramework === jhipsterConstants.SUPPORTED_CLIENT_FRAMEWORKS.ANGULAR) {
        writeNestedRoutesNg2Template(generator);
    }
}
