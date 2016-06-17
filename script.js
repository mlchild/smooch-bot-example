'use strict';

// const _ = require('lodash');
const Script = require('smooch-bot').Script;
const scriptRules = require('./script.json');

module.exports = new Script({
    processing: {
        // prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },
    
     start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Chef Child\'s Bot...Say BOT!')
                .then(() => 'speak');
        }
    },

    
    speak: {
        receive: (bot, message) => {

            let upperText = message.text.trim().toUpperCase();


                if (!_.has(scriptRules, upperText)) {
                    return bot.say(`I didn't understand that.`).then(() => 'speak');
                }

                var response = scriptRules[upperText];
                var lines = response.split('\n');

                var p = Promise.resolve();
                _.each(lines, function(line) {
                    line = line.trim();
                    p = p.then(function() {
                        console.log(line);
                        return bot.say(line);
                    });
                })

                return p.then(() => 'speak');
            }
    }

/*
   
    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}
Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
    */
});
