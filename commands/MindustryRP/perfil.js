const Discord = require("discord.js");
const { Users, Clans, Bases } = require("../../database.js");

module.exports = {
  // Execução do comando
  run: (client, botUtils, message, args) => {
    newError = botUtils.newError;

    try {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      Users.findById(member.id, (errDB, doc) => {
        if (errDB) {
          let embed = new Discord.MessageEmbed()
            .setTitle("Erro inesperado")
            .setDescription("Um erro inesperado aconteceu. por favor contate os ADMs\n\nUm log foi criado com mais informações do erro");
          message.channel.send(embed);

          let IDs = {
            server: message.guild.id,
            user: message.author.id,
            msg: message.id
          }
          console.log(`=> ${newError(errDB, module.exports.config.name, IDs)}`);
          return;
        }

        if (!doc) {
          let newUser = new Users({
            _id: member.id
          });
          newUser.save();
          message.channel.send("Tente novamente");
          return;
        }

        try {
          let XPconfig = botUtils.jsonPull("./dataBank/levelSystem.json");

          let embedPerfil = new Discord.MessageEmbed()
            .setTitle(`Perfil de **${member.displayName}**`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
            .setDescription(`Dinheiro: ${doc.money}\n\nLevel: ${doc.levelSystem.level}\nXP: ${doc.levelSystem.xp} / ${XPconfig[doc.levelSystem.level - 1].XPNextLevel}\nTotal de XP: ${doc.levelSystem.txp}`)
            .setColor("RANDOM")
            .setTimestamp();

          Clans.find({}, (errDBclan, clans) => {
            if (errDBclan) {
              let embed = new Discord.MessageEmbed()
                .setTitle("Erro inesperado")
                .setDescription("Um erro inesperado aconteceu. por favor contate os ADMs\n\nUm log foi criado com mais informações do erro");
              message.channel.send(embed);

              let IDs = {
                server: message.guild.id,
                user: message.author.id,
                msg: message.id
              }
              console.log(`=> ${newError(errDBclan, module.exports.config.name, IDs)}`);
              return;
            }

            if (clans.length > 0) {
              clans.map(clan => {
                if (clan.members.indexOf(member.id) != -1 || clan.founders.indexOf(member.id) != -1) {
                  embedPerfil.addField("Clã", `Nome: ${clan.name}\nLevel: ${clan.level}`, true)
                }
              });
            }

            Bases.find({}, (errDBbase, bases) => {
              if (errDBbase) {
                let embed = new Discord.MessageEmbed()
                  .setTitle("Erro inesperado")
                  .setDescription("Um erro inesperado aconteceu. por favor contate os ADMs\n\nUm log foi criado com mais informações do erro");
                message.channel.send(embed);

                let IDs = {
                  server: message.guild.id,
                  user: message.author.id,
                  msg: message.id
                }
                console.log(`=> ${newError(errDBbase, module.exports.config.name, IDs)}`);
                return;
              }

              if(bases.lenght > 0) {
                bases.map(base => {
                  if(base._id == member.id) {
                    embedPerfil.addField("Base", `Nome: ${base.name ? base.name : "Base de " + member.displayName}\nNivel do nucleo: ${base.core}`, true)
                  }
                })
              }

              message.channel.send(embedPerfil);
            });
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
          console.log(`=> ${newError(err, module.exports.config.name, IDs)}`);
        }
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
      console.log(`=> ${newError(err, module.exports.config.name, IDs)}`);
    }
  },

  // Configuração do comando
  config: {
    name: "perfil",
    aliases: ["p", "profile"],
    description: "Veja o seu perfil ou o do usuario marcado",
    usage: "perfil [@user]",
    accessableby: "Membros"
  }
}