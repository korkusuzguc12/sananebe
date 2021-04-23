const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on("ready", () => {
  client.channels.cache.get("834819156616413265").join();
})

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};





client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("ready" , () => {
let durumlar = [
"🔥Merlins Bot v0.1",//Kardeş Burayı Kopyala Yapıştır Yaparak İstediğin Kadar Değiştirtebilirsin - Bayramö
"🌍31!yardım",// Kopyala yapıştır yaparken virgül koymayı unutma yoksa olmuyor!
"🔨Özel Ban Komutu İçin Bana DM At"  
]
  var durums = durumlar[Math.floor(Math.random() * (durumlar.length))]
setInterval(function() {
client.user.setActivity(`${durums}`)
}, 2 * 1)
})

client.on("message", async msg => { 
const dcskelime = ["490590623745703937","<@490590623745703937>","376751166664736769","<@376751166664736769>"]; 
if (dcskelime.some(dcss => msg.content.includes(dcss))) {
msg.reply("Amına kodumun malı ne varda etiketliyon banlimmi seni")
msg.delete()
}}) 

client.on("message", msg => {
var dm = client.channels.cache.get("823186964790116392")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});

client.on("guildCreate", guild => {
  let xfalcon = client.channels.get("823186964790116392") //Eklenince ve Atılınca Mesaj Atılcak Kanal ID.

 const darkmo = new Discord.RichEmbed()
.setTitle("Sunucuya Eklendim")
.setColor("GREEN")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
.addField('▪ Davet', `\`${guild.createInvite}\``)
xfalcon.send(darkmo)
});

client.on("guildDelete", guild => {
  let xfalcon = client.channels.get("K823186964790116392") //Eklenince ve Atılınca Mesaj Atılcak Kanal ID.

 const devtr = new Discord.RichEmbed()
.setTitle("Sunucudan Atıldım")
.setColor("RED")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
xfalcon.send(devtr)
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


