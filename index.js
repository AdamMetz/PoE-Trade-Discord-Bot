const dotenv = require('dotenv').config()
const handle_logic = require('./handle_logic')
const Discord = require('discord.js');
const request = require('request')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = '-poetb'

client.once('ready', () => {
    console.log('PoE Trade Search is online!')
});

client.on('messageCreate', message =>{
    if (!message.content.startsWith(prefix)) return;
    
    console.log(message.content)

    const args = message.content.split(" ").slice(1).join(" ")
    console.log("Args Passed In: "+args)
    const command = args.toLowerCase();

    //Poe Ninja Request Test
    request("https://poe.ninja/api/data/CurrencyHistory?league=Archnemesis&type=Currency&currencyId=22", {json: true}, (err, res, body) => {
        console.log("?")
        if (!err) {handle_logic.price_from_json(body)};
    });

    if (command === "ping"){
        message.channel.send("The value of 'Exalted Orb' is 169 Chaos Orbs");
    } else {
        message.channel.send("Invalid Command!")
    }
});

client.login(process.env.discord_client_key);