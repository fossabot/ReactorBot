const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  run: async (client, botUtils, message, args) => {

    try {
      awfasf
      //tira dps
      return message.reply('ainda não implementado');

    } catch (err) {
      let embed = new Discord.MessageEmbed()
        .setTitle("Erro inesperado")
        .setDescription("Um erro inesperado aconteceu. por favor contate os ADMs\n\nUm log foi criado com mais informações do erro");
      message.channel.send(embed);

      let IDs = {
        server: message.guild.id,
        user: message.author.id,
        msg: message.id
      }
      console.log(`=> ${newError(err, "fish", IDs)}`);
    }
  },

  config: {
    name: "fish",
    noalias: "sem apelidos",
    aliases: [],
    description: "Pesca um peixe para vender depois",
    usage: "fish",
    accessableby: "Membros"
  }
}