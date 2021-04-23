const Discord = require("discord.js");
const axios = require('axios');

exports.run = async (client, message, args) => {
    const city = args[0];
    if (!city) return message.channel.send('Şehir adı girmelisiniz.');
    axios.get(`https://api.collectapi.com/pray/single?ezan=Ak%C5%9Fam&data.city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
            "authorization": "apikey 5JtZQnz76DMNL9Q6VRWeW9:3B8cDNDymTVTakXNB0pk4B"
        }
    }).then(res => {
        const messageEmbed = new Discord.MessageEmbed().setDescription(`
           > **${city}** şehri için iftar saati **${res.data.result[0].time}.**
           \`\`\`Kalan Süre: ${res.data.result[0].hour} ${res.data.result[0].min}\`\`\`     
        `);

        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun. Şehir harflerini küçük harfle yazınız.');
        console.log(err);
    });
};

exports.conf = {
  aliases: [],
  permLevel: 0,
  kategori: 'Eğlence'
};

exports.help = {
    name: "iftar",
    description: 'İftara Kaç Saat kaldığını öğrenmek için kullanabilirsiniz.',
};