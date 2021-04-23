module.exports.run= async(client, message, args) => {

let user = message.mentions.users.first()
if (!user) return message.reply("birini etiketlemedin")
if (user.id === message.author.id) return message.channel.send("kendine mesaj atamazsın")
let mesaj = args.slice(1).join(' ')
if (!mesaj) return message.reply("mesaj yok")

message.channel.send("başarıyla gönderildi")
message.delete()

user.send(mesaj)
}
exports.conf = {
  aliases: ['dmmesaj'],
  permLevel: 0,
  kategori: 'Moderasyon'
};

exports.help = {
  name: 'dmg',
  description: 'Belirttiğiniz kişiye dm gönderir.',
  usage: 'dmgönder <@kullanıcı> <mesaj>',

};