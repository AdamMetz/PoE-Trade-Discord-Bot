const dotenv = require('dotenv').config();
const price = require('./price');
const store_json = require('./store_json')
const Discord = require('discord.js');
const request = require('request');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = '-price'

client.once('ready', () => {
    console.log('PoE Trade Search is online!');
    store_json.check_daily_data();
});

client.on('messageCreate', message =>{
    if (!message.content.startsWith(prefix)) return;
    
    console.log(message.content)

    const args = message.content.split(" ").slice(1).join(" ")
    console.log("Args Passed In: "+args)
    const command = args.toLowerCase();

    if (command === "test"){
        message.channel.send("The value of 'Exalted Orb' is 169 Chaos Orbs");
    } else {
        let item_val = price.price_from_json(command)
        if (item_val >= 0){
            message.channel.send("The value of "+command+" is "+item_val+" Chaos Orbs")
        } else {
            message.channel.send("Unable to find to find the item: "+command)
        }
    }
});

client.login(process.env.discord_client_key);