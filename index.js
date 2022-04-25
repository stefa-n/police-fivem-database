// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

// MariaDB required stuff
const db = require('./db.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'cnp') {
        //reply with the integer CNP
        const cnp = interaction.options.getInteger('cnp');
        if (cnp) {
            const nume = await db.pool.query(`SELECT firstName, secondName, faction, bankMoney, iban FROM vrp_users WHERE id = ${cnp}`);
            if (nume[0].faction == 'Politie' || nume[0].faction == 'Smurd') {
                var factiuneLegala = 'Face parte dintr-o organizatie guvernamentala';
            } else {
                var factiuneLegala = 'Nu face parte dintr-o organizatie guvernamentala';
            }
                
            const embed = new MessageEmbed()
            .setColor('#3440eb')
            .setTitle('Politia Romana')
            .addFields(
                { name: 'CNP', value: `02090401573**${cnp}**` },
                { name: 'Prenume', value: `${nume[0].firstName}`, inline: true },
                { name: 'Nume', value: `${nume[0].secondName}`, inline: true },
                { name: 'Organizatie', value: `${factiuneLegala}`, inline: false },
                { name: 'Bani in banca', value: `${nume[0].bankMoney}`, inline: true },
                { name: 'IBAN banca', value: `${nume[0].iban}`, inline: true },
            )

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply('CNP is missing');
        }
    }
});

// Login to Discord with your client's token
client.login(token);