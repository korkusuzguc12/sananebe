const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
let guild = message.guild.id;   
var prefix = ayarlar.prefix;

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`);
  
	let user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.client.users.cache.find(m => m.username === args.slice(0).join(" ")) || message.author;
  let reason = args.slice(1).join(' ');
  
  if (!user) return message.channel.send(`Sunucudan yasaklamak istediğiniz kullanıcıyı etiketlemelisiniz; \`${prefix}ban @Gnarge Reklam\` `);
  if (user.id === message.author.id) return message.channel.send('Kendini yasaklayamazsın.');
  if (user.position > message.member.roles.highest.position) return message.channel.send(`Bu kullanıcının senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
    if (!reason) reason = 'Belirtilmemiş.'
    if (!user) return message.channel.send(`Etiketlediğin kullanıcıyı sunucuda bulamadım.`)
    let member = message.guild.member(user)
    if (!member) return message.channel.send(`Etiketlediğin kullanıcıyı sunucuda bulamadım.`)

 if (!message.guild.member(user).bannable) return message.channel.send(`Bu kişiyi sunucudan yasaklayamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);

   if (!message.guild.member(user).bannable) return message.channel.send('Sunucudaki yetkilileri yasaklayamam!');

  message.guild.members.ban(user.id)
  message.channel.send(`<@${user.id}> **Adlı kullanıcı Cool Team Tarafından tarafından yasaklandı!** **Sebep: \`${reason}\`**`)
  
  let embed = new Discord.MessageEmbed()
  .setAuthor('You Are Banned', message.author.avatarURL())
  .setThumbnail(client.user.avatarURL())
  .setColor('RANDOM')
  .addField('Bilgiler:', `
  **\nAvadalanan Şerefsiz:<@${user.id}>** 
  **\nAvadalayan Kudretli Büyücü:<@${message.author.tag}**
  **\nAvada Sebebi:${reason}\**
  `)
  .setImage('https://i.pinimg.com/originals/42/54/b8/4254b8aeca553a85cb3b68d928f94dee.gif')
  .setFooter('Bu komutu kullanan kudretli kişi ' + message.author.tag, message.author.displayAvatarURL())
  message.channel.send(embed)


};




exports.conf = {
  aliases: ['amınakoy'],
  permLevel: 0,
  kategori: 'Moderasyon'
};

exports.help = {
  name: 'avada',
  description: 'Belirttiğiniz kişiyi sunucudan yasaklar.',
  usage: 'avada <@kullanıcı> <sebep>',

};
