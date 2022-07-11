import App from '@/App';
import { textSync } from 'figlet';
import { magentaBright, yellow, cyanBright, red, blueBright, grey } from 'chalk';

console.log(magentaBright(textSync('Fyre  API', { horizontalLayout: 'fitted' })));
console.log(`${yellow.bold('#======================')} ${magentaBright.bold('Fyre API')} ${yellow.bold('========================#')}`);
console.log(`${yellow.bold('#')}          ${blueBright.bold('Created by: Liam L <TheFallenSpirit>')}          ${yellow.bold('#')}`);
console.log(`${yellow.bold('#')}             ${red.bold(`Copyright © ${new Date().getFullYear()}`)} ${cyanBright.bold('FyreNodes LTD')}             ${yellow.bold('#')}`);
console.log(`${yellow.bold('#')}                  ${grey.bold('Starting Fyre API...')}                  ${yellow.bold('#')}`);
console.log(yellow.bold('#========================================================#'));
App();