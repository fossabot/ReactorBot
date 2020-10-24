const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
    run: async (client, botUtils, message, args) => {
        if(!botUtils.isDev(message.author.id)) return message.channel.send("Voce não tem permissão para executar esse comando")

        newError = botUtils.newError;

        try {

            const user = message.mentions.users.first() || message.author
            
            if(isNaN(parseInt(args[1] || args[0])))return message.reply('Não foi possivel indentificar a quantia de dinheiro a se informar');

            botUtils.jsonChange('./dataBank/balance.json', balance => {
                balance[user.id] = parseInt(args[1] || args[0]);
                message.channel.send(`O valor de ${user.tag} foi definido como: ${balance[user.id]}\$.`);
                return balance
            });

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
            console.log(`=> ${newError(err, "moneyset", IDs)}`);
        }
    },

    config: {
        name: "moneyset",
        noalias: "Sem sinonimos",
        aliases: [],
        description: "Define a quantidade dinheiro que tal membro possui",
        usage: "moneyset [Membro] <Quantia>",
        accessableby: "Desenvolvedores"
    }
}