const env = require('./.env');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');

const tecladoOptions = Markup.keyboard([
    'Astronomia', 'Fisica', 'Historia'
]).resize().oneTime().extra();

const bot = new Telegraf(env.token);

let user = '';

bot.start(async context => {
    user = context.update.message.from.first_name;
    await context.reply(`Ola, ${user}.`)
    await context.reply(`Do que você gosta?`, tecladoOptions);
})
bot.hears(/astronomia/i, async context => {
    await context.reply(`Olha, ${user}, eu também amo astronomia`);
    await context.reply(`Do que você gosta em astronomia? `, Markup.keyboard(
        ['Galáxias', 'Planetas', 'Estrelas', 'Buracos negros', 'Matéria escura']).resize().oneTime().extra()
    )
})

bot.hears(['Galáxias', 'Planetas'], async context => {
    await context.reply(`Eu também amo ${context.match}.`)
})

bot.startPolling();