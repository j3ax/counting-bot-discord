/*

__________.__        __   /\        __________     ___.    
\______   \__| ____ |  | _)/ ______ \______   \__ _\_ |__  
 |       _/  |/ ___\|  |/ / /  ___/  |     ___/  |  \ __ \ 
 |    |   \  \  \___|    <  \___ \   |    |   |  |  / \_\ \ BOT Creato per Rick's Pub Discord Server - Creato da J3ax#8367
 |____|_  /__|\___  >__|_ \/____  >  |____|   |____/|___  /
        \/        \/     \/     \/                      \/ 

    */




const { Client, GatewayIntentBits, Events } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
})

const serverID = "SERVER-ID-HERE";
const channelID = "COUNTING-CHANNEL-HERE";
let expectedNumber = 1
let currentNumber = 0
let lastSender = 0

client.once(Events.ClientReady, c => {
	console.log(`Mi sono connesso come: ${c.user.tag}`);
    client.guilds.cache.get(serverID).channels.cache.get(channelID).send(`Bella sono spawnato!`);
    client.guilds.cache.get(serverID).channels.cache.get(channelID).send(`Inziamo da 0, digitate 1!`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return false;    
    if (message.channel.id != channelID) return false;
    if (Number(message.author.id) === lastSender){
        client.guilds.cache.get(serverID).channels.cache.get(channelID).send(`Complimentoni <@` + message.member + `>` + ` volevi fare il figo e mandarne piu di uno? L'hai rovinato a ` + currentNumber + `. Ricominciamo: 0`);
        expectedNumber = 1
        currentNumber = 0
        lastSender = 0;
        message.react("💩");
        return false;
    }
    if(message.content === expectedNumber.toString()){
       expectedNumber++
       currentNumber++
       message.react("✅");
       lastSender = Number(message.author.id);

   } else { 
       message.react("💩");
       client.guilds.cache.get(serverID).channels.cache.get(channelID).send(`<@` + message.member + `>` + `L'ha rovinato a ` + currentNumber + `. Ricominciamo: 0`);
       expectedNumber = 1
       currentNumber = 0
    }
  });

client.login("BOT-TOKEN-HERE");