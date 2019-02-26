const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	
	if(msg.author.bot || msg.deleted) return;

	let attachments = '';
	for (var i =  0; i < msg.attachments.array().length; i++) {
		attachments += (msg.attachments.array()[i].url) + '\n';
	}

	const solution = {
		author:msg.author.tag,
		answer: msg.content,
		attachments
	}

   if (msg.channel.name === 'eureka') {

	    msg.reply('Thanks for your solution.');  
    
		const channel = msg.guild.channels.find(ch => ch.name === "private-solution-channel");
		channel.send(`Solution by ${solution.author}\n${solution.answer}${solution.attachments}`)
		.then(x => {
			return msg.delete()
		})
    	.catch(console.log);
  }

});

client.login(process.env.BOT_TOKEN);
