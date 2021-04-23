const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {

    const ozelmesajkontrol = new Discord.MessageEmbed()
    .setColor("36393F")
    .setTimestamp()
     .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(' **İşte beni yapan Kudretli şahsiyetler** \n<@376751166664736769> \n<@490590623745703937> ');
    message.channel.send(ozelmesajkontrol)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yapımcım','yapımcı','yapımcılarım','yapımcılar',],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: 'Yapımcımı Gosterir.',
  usage: 'yapımcım'
};