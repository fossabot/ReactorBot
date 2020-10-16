const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    run: async (client, botUtils, message, args) => {
        if(!botUtils.isDev(message.author.id)) return message.channel.send("Voce não tem permissão para executar esse comando")

        newError = botUtils.newError;
        isDir = botUtils.isDir;

        try {

            message.channel.send("Shutting down...").then(() => {
                client.destroy();
            })

        } catch (err) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Erro inesperado")
                .setDescription("Um erro inesperado aconteceu. por favor contate os ADMs\n\nUm log foi criado com mais informações do erro");
            message.channel.send(embed)
            console.log(`=> ${newError(err, "error", message.guild.id)}`);
        }
    },

    config: {
        name: "shutdown",
        noalias: "Sem sinonimos",
        aliases: [],
        description: "desliga o bot",
        usage: "shutdown",
        accessableby: "Desenvolvedores"
    }
}