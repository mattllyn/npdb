/* AMMBR Chat Bot por: !Psyko-Mattz */


var MattB = {
versao: "v0.1.4.1",
credito: "!Psyko Mattz",
songTimeLimit: 7,
joined: new Date().getTime(),
status: {
       cmdslink: "http://goo.gl/tD4yhU",
	   TempoMax: "420",
	   listae: "-",
},
relogar: function(data){
	API.off(API.WAIT_LIST_UPDATE);
	API.off(API.USER_JOIN);
	API.off(API.USER_LEAVE);
	API.off(API.ADVANCE);
	API.off(API.CHAT);
     Msg("Relogando MBot...");
     setTimeout (function(){
          API.moderateDeleteChat(data.cid);
     }
     ,1600);
     setTimeout (function(){
          $.getScript("https://dl.dropboxusercontent.com/s/auvthoks1o1s2hc/AMMBot.js");
     }
     , 1000);
},
desligar: function(data){
	API.off(API.WAIT_LIST_UPDATE);
	API.off(API.USER_JOIN);
	API.off(API.USER_LEAVE);
	API.off(API.ADVANCE);
	API.off(API.CHAT);
     Msg("Desligando MBot...");
     setTimeout (function(){
          API.moderateDeleteChat(data.cid);
     }
     ,1600);
},
f5: function(){
       Msg("Atualizando a pÃ¡gina!");
       setTimeout (function(){
              location.reload(true);
       }
       , (1*1000));
},
limparchat:  function(){
var currentchat = $('#chat-messages').children();
for (var i = 0; i < currentchat.length; i++) {
API.moderateDeleteChat(currentchat[i].getAttribute("data-chatID"));							
}
},
pula:  function(){
	   API.moderateForceSkip();
},
trava:  function (){
		MattB.status.listae = "travada";
       API.moderateLockWaitList(true);
},
destrava:  function (){
		 MattB.status.listae = "destravada";
       API.moderateLockWaitList(false);
},
limparl:  function(){
       API.moderateLockWaitList(true, true);
},
linkm:  function(data){
		var nome = data.un;
       if(API.getMedia().format == 1){
              Msg("@" +nome+ " " + "http://youtu.be/" + API.getMedia().cid);
       }
       else{
              var id = API.getMedia().cid;
              SC.get('/tracks', {
                     ids: id,
              }
              , function(tracks) {
                     Msg("@"+nome+" "+tracks[0].permalink_url);
              }
              );
       }
}							
}

function Msg(message) {
	API.sendChat(message);
}

API.on(API.CHAT, function(data){
        var msg = data.message;
	    var ID = data.uid;
		var nome = data.un;
		var res = data.message.trim().split(" ");
		res[0] = res[0].substring(1).toLowerCase();
        if(data.message.trim().charAt(0) === '!'){
		API.moderateDeleteChat(data.cid);
			
                switch(res[0]){
		
               case "rel":
                    if(API.getUser(ID).role > 3  ) {
                         MattB.relogar(data);
                    }
                    else{
                                                             
                         Msg("/me@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+CoanfitriÃ£o]");
                    }
                    break;
               case "desligar":
                    if(API.getUser(ID).role > 3  ) {
                         MattB.desligar(data);
                    }
                    else{
                         Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+CoanfitriÃ£o]");
                    }
                    break;
					
                     case "travar":
                            if(API.getUser(ID).role > 1  ) {
                                   MattB.trava();
                            }
                            else{
                                   Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
                                                         
                     case "destravar":
                            if(API.getUser(ID).role > 1  ) {
                                   MattB.destrava();
                            }
                            else{
                                   Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
                                                         
                     case "pular":
                            if(API.getUser(ID).role > 1  ) {
                                   MattB.pula();
                            }
                            else{
                                   Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
							
                     case "ciclo":
                            if(API.getUser(ID).role > 1  ) {
                                   var toggle = $(".cycle-toggle");
                                   if(toggle.hasClass("disabled")) {
                                          toggle.click();
                                   }
                                   else{
                                          toggle.click();
                                   }
                            }
                            else{
                                                         
                                   Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
                                                         
                     case "limparlista":
                            if(API.getUser(ID).role > 2  ) {
                                   MattB.limparl();
                            }
                            else{
                                                         
                                   Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+Coordenador]");
                                                         
                            }
                            break;
							
                     case "f5":
                            if(API.getUser(ID).role > 3 ) {
                                   MattB.f5();
                            }
                            else{
                                                         
                                   Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+CoanfitriÃ£o]");
                            }
                            break;
                                                         
                     case "limparchat":
                            if(API.getUser(ID).role > 2  ) {
                                   MattB.limparchat();
                            }
                            else{
                                                         
                                   Msg("@"+nome+", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+Coordenador]");
                            }
                            break;							

                     case "diz":
                            if(API.getUser(ID).role > 1  ) {
                                   var sayMsg = data.message.substr(5).trim();
                                   Msg("" + sayMsg);
                            }
                            else{
                                                         
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
 
                    case "tempo":
                            if(API.getUser(ID).role > 2  ) {
                                   var tempom = msg.substr(msg.indexOf(' ')+1);
                                   MattB.status.TempoMax = tempom;
                                   Msg("["+nome+"] Tempo de vÃ­deos definido para " + strTempo(tempom) + "!");
                            }
                            else{
                                                         
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+Coordenador]");
                            }
                            break;
                            // **** AVISOS *****
                     case "warning":
                            if(API.getUser(ID).role > 1  ) {
                                   var warnings = msg.substr(msg.indexOf(' ')+1);
                                   Msg("["+nome+"][Warning]  "+warnings+", if you want to keep on the wait list you need to continue voting!");
                            }
                            else{
                                                         
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
 
					case "warn1":
                    if(API.getUser(ID).role > 1  ) {
                         var username = msg.substr(msg.indexOf('@')+1);
                         Msg("["+nome+"][Warning 1] @"+username+", rate videos, or will be removed from the wait list.");
                    }
                    else{
                         Msg("/me@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                    }
                    break;
					case "warn2":
                    if(API.getUser(ID).role > 1  ) {
                         var username = msg.substr(msg.indexOf('@')+1);
                         Msg("["+nome+"][Warning 2] @"+username+", please rate videos, or will be removed from the wait list(last warning).");
                    }
                    else{
                         Msg("/me@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                    }
                    break;
					/*case "warn3":
                    if(API.getUser(ID).role > 1  ) {
                         var username = msg.substr(msg.indexOf('@')+1);
                         API.moderateRemoveDJ(user.id);
                         Msg("["+nome+"][Warning 3] @"+username+", you were warned 2 times, will now be removed of the wait list, use !autowoot.");
                    }
                    else{
                                                             
                         Msg("/me@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                    }
                    break;
					*/
					
					
                     case "avisos":
                            if(API.getUser(ID).role > 1  ) {
                                   var avisoss = msg.substr(msg.indexOf(' ')+1);
                                   Msg("["+nome+"][Aviso +]  "+avisoss+", avaliem os vÃ­deos, ou serÃ£o removidos da lista de espera!");
                            }
                            else{
                                                         
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
                                             
                     case "aviso1":
                            if(API.getUser(ID).role > 1  ) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   Msg("["+nome+"][Aviso 1] @"+username+", avalie os vÃ­deos, caso contrÃ¡rio serÃ¡ removido da lista de espera.");
                            }
                            else{
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
                                                               
                     case "aviso2":
                            if(API.getUser(ID).role > 1  ) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   Msg("["+nome+"][Aviso 2] @"+username+", por favor, avalie os vÃ­deos, ou serÃ¡ removido da lista de espera (ultimo aviso).");
                            }
                            else{
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
							case "aviso3":
							if(API.getUser(ID).role > 1  ) {
							Msg("@" +nome+ ", FunÃ§Ã£o desativada! Breve estarÃ¡ disponÃ­vel.");
							}
                            else{
                                                         
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
							break;
							/*
                            case "aviso3":
                            if(API.getUser(ID).role > 1  ) {
								   var name = msg.substr(cmd.length + 2);
								   var user = getUser(name);
                                   API.moderateRemoveDJ(user.id);
                                   Msg("["+nome+"][Aviso 3] @"+name+", vocÃª foi avisado 2 vezes, agora serÃ¡ removido da lista de espera, da prÃ³xima vez use auto woot.");
                            }
                            else{
                                                         
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
							*/
							
					case "stat":
                            if(API.getUser(ID).role > 1 ){
                                   var response = "";
                                   var currentTime = new Date().getTime();
                                   var minutes = Math.floor((currentTime - MattB.joined) / 60000);
                                   var hours = 0;
                                   while(minutes > 60){
                                          minutes = minutes - 60;
                                          hours++;
                                   }
                                   hours == 0 ? response = "Iniciado hÃ¡ " + minutes + "m " : response = "Iniciado hÃ¡ " + hours + "h " + minutes + "m";
                                   response = response + " | VersÃ£o: "+ MattB.versao;
                                   response = response + " | Criado por: "+ MattB.credito;
                                   response = response + " | Lista: "+ MattB.status.listae;
                                   //response = response + " | HistÃ³rico: "+ MattB.status.historico;
                                   response = response + " | Tempo p/ vÃ­deos: "+strTempo(MattB.status.TempoMax);
                                   Msg(response);
                            }
                            else{
                                                         
                                   Msg("@" +nome+ ", VocÃª nÃ£o tem permissÃ£o para usar este comando! [+SeguranÃ§a]");
                            }
                            break;
							
                     case "id":
                            Msg("@"+nome+" Seu ID Ã©: "+ ID);
                            break;
                                                                        
                     case "comandos":
                     case "commands":
                     case "cmds":
                            Msg("["+nome+"] >  Clique no link: "+MattB.status.cmdslink+", para ver os comandos!");
                            break;	
                     case "legal":
                            Msg("@"+nome+" gostou do seu video @"+ API.getDJ().username +", continue assim! :star2: :revolving_hearts:");
                            break;
                                                         
                     case "chato":
                            Msg("@"+nome+" nÃ£o gostou do seu video @"+ API.getDJ().username +", melhore na prÃ³xima! :-1: :broken_heart: ");
                            break;
                     case "link":
                     case "musica":
                     case "url":
                            MattB.linkm(data);
                            break;
                     case "autowoot":
                            Msg("["+nome+"] > [TUTORIAL] Auto-Woot >> http://goo.gl/mpByzP");
                            break;
                     case "rules":
                     case "themes":
                            Msg("["+nome+"] To see the rules and themes >> http://goo.gl/mz733J !");
                            break;
                     case "regras":
                     case "temas":
                            Msg("["+nome+"] > Regras e Temas da sala >> http://goo.gl/i7JUIX; O documento tem 2 pÃ¡ginas, leia-as!");
                            break;
                     case "adblock":
                            Msg("["+nome+"] > Para remover as propagandas dos videos use AdBlock > http://www.adblockplus.org/");
                            break;							
						
						
                     case "legalbot": 
						var LglRandom = Math.floor(Math.random() * legalbot.length);
						Msg(legalbot[LglRandom] +" @"+nome);
						 $("#woot").click();
						break;
						
                     case "chatobot": 
						var CbRandom = Math.floor(Math.random() * chatobot.length);
						Msg(chatobot[CbRandom] +" @"+nome);
						 $("#meh").click();
						break;

                     case "vota": 
						var AcrRandom = Math.floor(Math.random() * acordabot.length);
						Msg(acordabot[AcrRandom] +" @"+nome);
						 $("#woot").click();
						break;
						
					case "optard":
                     if(typeof res[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomopt = Math.floor(Math.random() * optards.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+optards[randomopt]);
                                   break;
                            }
                     }
                     else{
                            if(res[1].indexOf("@") === 0) res[1] = res[1].substring(1);
                            var randomopt = Math.floor(Math.random() * optards.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+optards[randomopt]);
                                   break;
                            }
                     }
					 break;
						
					case "narutard":
                     if(typeof res[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomNrt = Math.floor(Math.random() * narutards.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+narutards[randomNrt]);
                                   break;
                            }
                     }
                     else{
                            if(res[1].indexOf("@") === 0) res[1] = res[1].substring(1);
                            var randomNrt = Math.floor(Math.random() * narutards.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+narutards[randomNrt]);
                                   break;
                            }
                     }
					 break;
						
                     case "otaco":
                     if(typeof res[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomOtk = Math.floor(Math.random() * otacoviado.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+otacoviado[randomOtk]);
                                   break;
                            }
                     }
                     else{
                            if(res[1].indexOf("@") === 0) res[1] = res[1].substring(1);
                            var randomOtk = Math.floor(Math.random() * otacoviado.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+otacoviado[randomOtk]);
                                   break;
                            }
                     }
					 break;
                     case "beber":
                     if(typeof res[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomBb = Math.floor(Math.random() * beber.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+beber[randomBb]);
                                   break;
                            }
                     }
                     else{
                            if(res[1].indexOf("@") === 0) res[1] = res[1].substring(1);
                            var randomBb = Math.floor(Math.random() * beber.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   Msg("@"+res[1]+", "+beber[randomBb]);
                                   break;
                            }
                     }	
					break;					 
}
}

       //Autowoot Link
       for(var i = 0; i < mattbot.awlink.length; i++){
              if(msg.indexOf(mattbot.awlink[i].toLowerCase()) > -1){
                     var autowootlinkRandom = Math.floor(Math.random() * mattbot.autowootlink.length);
                     Msg(mattbot.autowootlink[autowootlinkRandom] +" @"+nome+" ");
              }
       }
       //Oi
       for(var i = 0; i < mattbot.falaoi.length; i++){
              if(msg.indexOf(mattbot.falaoi[i].toLowerCase()) > -1){
                     var respondeoiRandom = Math.floor(Math.random() * mattbot.respondeoi.length);
                     Msg(mattbot.respondeoi[respondeoiRandom] +" @"+nome+" ");
              }
       }
       //On?
       for(var i = 0; i < mattbot.boton.length; i++){
              if(msg.indexOf(mattbot.boton[i].toLowerCase()) > -1){
                     var toonRandom = Math.floor(Math.random() * mattbot.toon.length);
                     Msg(mattbot.toon[toonRandom] +" @"+nome+" ");
              }
       }
       //ola pessoas
       for(var i = 0; i < mattbot.olapessoas.length;i++){
              if(msg.indexOf(mattbot.olapessoas[i].toLowerCase()) > -1){
                     var welcomebotRandom = Math.floor(Math.random() * mattbot.welcomebot.length);
                     Msg(mattbot.welcomebot[welcomebotRandom] +" @"+nome+" !");
              }
       }
       //bomdia
       for(var i = 0; i < mattbot.bomdia.length; i++){
              if(msg.indexOf(mattbot.bomdia[i].toLowerCase()) > -1){
                     var bomdiabotRandom = Math.floor(Math.random() * mattbot.bomdiabot.length);
                     Msg(mattbot.bomdiabot[bomdiabotRandom] +" @"+nome+" ");
              }
       }
       //boatarde
       for(var i = 0; i < mattbot.boatarde.length;i++){
              if(msg.indexOf(mattbot.boatarde[i].toLowerCase()) > -1){
                     var boatardebotRandom = Math.floor(Math.random() * mattbot.boatardebot.length);
                     Msg(mattbot.boatardebot[boatardebotRandom] +" @"+nome+" ");
              }
       }
       //boanoite
       for(var i = 0; i < mattbot.boanoite.length;i++){
              if(msg.indexOf(mattbot.boanoite[i].toLowerCase()) > -1){
                     var boanoitebotRandom = Math.floor(Math.random() * mattbot.boanoitebot.length);
                     Msg(mattbot.boanoitebot[boanoitebotRandom] +" @"+nome+" ");
              }
       }
	   
});

beber = [
" ta na hora de beber o toddynho em crianÃ§a!",
" jÃ¡ passou a hora do remÃ©dio em!"
];

legalbot = [ 
"Dahora mesmo sa porra aÃª!!!","VÃ­deo/MÃºsica legal pra caralho :D"
];
chatobot = [
"Chato pra porra esse vÃ­deo...","Que barulho irritante Ã© esse aÃ­???","Essa mÃºsica Ã© tÃ£o bosta, que parece A7X!","Essa mÃºsica Ã© tÃ£o bosta que parece Screamo!"
];
acordabot = [ 
"Pronto! TÃ´ votando porra.","Qual foi? Toma, enfia esse woot no seu rabo!","Seu desejo Ã© uma ordem, bastardo!"
];
otacoviado = [
"ei seu otaco, tÃ¡ na hora de pegar uma mulher, nÃ£o concorda?",
"desenhos japoneses nÃ£o te dÃ£o tesÃ£o, vÃ¡ chupar uma vagina seu viadinho.",
];
narutards = [
"Naroto Ã© um lixo :D","Naruto e Sasuke fazem sexo lesbo :3"
];
optards = [
"One Piece Ã© uma bosta sem fim..."
];

mattbot = {
       falaoi: ["oi bot","ola bot","eae bot","olÃ¡ bot"],
       respondeoi: [":D Oi",":D OlÃ¡"],
       boton: ["bot on?","bot tae?","bot esta ativado?","bot ta ativado?","bot ta on?","bot ligado?"],
       toon: ["Estou aqui"],
       olapessoas: ["oi gente","yo minna","ola pessoas","ola gente","eae galera","oi galera","eae gente","ola galera","yo galera","yo gente","oi pessoas","oi pessoal","oi minna"],
       welcomebot: ["OlÃ¡, seja bem-vindo a nossa sala. Divirta-se "],
       bomdia: ["bom dia gente","bom dia galera","bom dia pessoal"], bomdiabot: [":D Bom  Dia"],
       boatarde: ["boa tarde gente","boa tarde galera","boa tarde pessoal"], boatardebot: [":D Boa  Tarde"],
       boanoite: ["boa noite gente","boa noite galera","boa noite pessoal"], boanoitebot: [":D Boa  Noite"],
       autowootlink: ["Como usar Auto-Woot > http://goo.gl/mpByzP"],
       awlink: ["link do autowoot bot","como usar autowoot","o que Ã© autowoot","como usa o autowoot"],
}



function strTempo(segundos)
{
       var horas = 0, minutos = 0;
	
       while ( segundos >=3600 )
       {
              horas++;
              segundos -= 3600;
       }
       while ( segundos >=60 )
       {
              minutos++;
              segundos -= 60;
       }
       var str = "";
       if ( horas > 0 )	str = horas + " h ";
       if ( minutos > 0 )	str += minutos + " min ";
       if ( segundos > 0 )	str += segundos + " seg";
	
       return str;
}

API.on(API.USER_JOIN, function(user) {		
              if (API.hasPermission(user.id, API.ROLE.ADMIN)) {
                     setTimeout (function(){
                            Msg(":sunglasses:Admin: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.AMBASSADOR)) {
                     setTimeout (function(){
                            Msg(":sunglasses:Embaixador(a): @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.HOST)) {
                     setTimeout (function(){
                            Msg(":sunglasses:AnfitriÃ£o: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.COHOST)) {
                     setTimeout (function(){
                            Msg(":sunglasses:Co-AnfitriÃ£o: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.MANAGER)) {
                     setTimeout (function(){
                            Msg(":sunglasses:Coordenador(a): @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.BOUNCER)) {
                     setTimeout (function(){
                            Msg(":sunglasses:SeguranÃ§a: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
       });
	   
API.on(API.USER_LEAVE, function(user){
});
		
API.on(API.ADVANCE, function(data){
$("#woot").click();
API.djJoin();

var DJNome = API.getDJ().username;
	if (data.media) {
		currentSong = {
			id: data.media.cid,
			title: data.media.title,
			artist: data.media.author,
			format: data.media.format,
			duration: data.media.duration
		};
		}

        if(data.media.duration > MattB.status.TempoMax){
			Msg('@'+DJNome+' seu vÃ­deo: '+currentSong.title+' - '+currentSong.artist+', ultrapassa o limite do tempo definido('+strTempo(MattB.status.TempoMax)+'). Pulando...');
			setTimeout (function(){
			API.moderateForceSkip();
			},1000); 
         }	
		
		
       var hist = API.getHistory();
	   var djID = API.getHistory()[0].user.username;
       for (var i in hist) {
              if (hist[i].media.cid == data.media.cid) {
                     API.sendChat("@"+ djID +" seu vÃ­deo estÃ¡ no histÃ³rico! Pulando...");
                     API.moderateForceSkip();
                     break;
              }
       }
		 
});	   


////////////////
$("#woot").click();

       Msg("MBot ativado "+MattB.versao+"! :white_check_mark:");
       Msg("Comandos do MBot >> "+MattB.status.cmdslink);
/* AMMBR Chat Bot por: !Psyko-Mattz */
