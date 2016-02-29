/**********
Matt Bot
**********/
var MattB = {
}

MattB.versao = "v1.6.7";
MattB.credito = "-Psyko-Mattz";

MattB.status = {
       grabou: "off",
       chato: "off",
       entradastaff: "on",
       listae: "-",
       ciclodj: "-",
       cmdslink: "site off...",
       fandel: "off",
       cargosdel: "on",
       historico: "on",
       rdjpromo: "off",
       autoskip: "on",
       TempoMax: "660",
       annc: "on",
}

MattB.joined = new Date().getTime();

MattB.adm = [""];

MattB.relogar = function(data){
       API.off(API.USER_JOIN, StaffEntrou);
       API.off(API.DJ_ADVANCE, ups);
       API.off(API.CHAT, Comandos);
       API.off(API.CURATE_UPDATE, grabou);
       API.off(API.VOTE_UPDATE, chato);
       API.off(API.CHAT, bChat2);
       API.off(API.CHAT, fandelete);
       API.off(API.USER_JOIN, rdjpromo);
       //API.off(API.DJ_ADVANCE, lengthCheck);
       API.off(API.DJ_ADVANCE, tempo2);
       API.off(API.USER_LEAVE, leave2);
       API.off(API.USER_JOIN, user2);
       API.off(API.CHAT, antilinks);
       API.off(API.WAIT_LIST_UPDATE, autojj);
       API.off(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
       API.off(API.USER_JOIN, UserJoin);
       API.off(API.USER_LEAVE, left);
       API.off(API.CURATE_UPDATE, grabs);
       API.off(API.CHAT_COMMAND, cmdsbs);
       API.off(API.CHAT, autoRespond3);
       //Games
       API.off(API.CHAT, GamesBot);
       API.off(API.CHAT,DialogBot);
       //PLE
       API.off(API.USER_JOIN, pwl.userJoinCallback);
       API.off(API.USER_LEAVE, pwl.userLeaveCallback);
       API.off(API.CHAT, pwl.chatCallback);
       API.sendChat("/emRelogando MBot...");
       setTimeout (function(){
              API.moderateDeleteChat(data.chatID);
       }
       ,1600);
       setTimeout (function(){
              $.getScript("https://rawgit.com/mattllyn/npdb/master/mBot.js");
       }
       , 1000);
}

MattB.desligar = function(data){
       API.off(API.USER_JOIN, StaffEntrou);
       API.off(API.DJ_ADVANCE, ups);
       API.off(API.CHAT, Comandos);
       API.off(API.CURATE_UPDATE, grabou);
       API.off(API.VOTE_UPDATE, chato);
       API.off(API.CHAT, bChat2);
       API.off(API.CHAT, fandelete);
       API.off(API.USER_JOIN, rdjpromo);
       // API.off(API.DJ_ADVANCE, lengthCheck);
       API.off(API.DJ_ADVANCE, tempo2);
       API.off(API.USER_LEAVE, leave2);
       API.off(API.USER_JOIN, user2);
       API.off(API.CHAT, antilinks);
       API.off(API.WAIT_LIST_UPDATE, autojj);
       API.off(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
       API.off(API.USER_JOIN, UserJoin);
       API.off(API.USER_LEAVE, left);
       API.off(API.CURATE_UPDATE, grabs);
       API.off(API.CHAT_COMMAND, cmdsbs);
       API.off(API.CHAT, autoRespond3);
       //Games
       API.off(API.CHAT, GamesBot);
       API.off(API.CHAT,DialogBot);
       //PLE
       API.off(API.USER_JOIN, pwl.userJoinCallback);
       API.off(API.USER_LEAVE, pwl.userLeaveCallback);
       API.off(API.CHAT, pwl.chatCallback);
       API.sendChat("/emDesligando MBot...");
       setTimeout (function(){
              API.moderateDeleteChat(data.chatID);
       }
       ,1600);
}

function getUserID(username) {
       var users = API.getUsers();
       for (var i in users) {
              if (users[i].username == username) {
                     return users[i].id;
              }
       }
       return "Usuário não encontrado!";
}

var ids = null;
function existe(id)
{
       for (var x = 0; x < ids.length; x++)
       {
              if ( ids[x] == id )	return true;
       }
       return false;
}

function GetUser(nick)
{
       var user = nick.trim().substring(1);
       var usuarios = API.getUsers();
	
       for (var i = 0; i < usuarios.length; i++)
       {
              if ( user.localeCompare(usuarios[i].username) == 0 )	return usuarios[i].id;
       }
	
       return -1;
}

var userData = {
}
var usersinroom = API.getUsers();
for(var i in usersinroom) {
       userData[usersinroom[i].id] = {
              username: usersinroom[i].username,
              muted: false
       }
}

function user2(user) {
       userData[user.id] = {
              username: user.username,
              muted: false
       }
}

function leave2(user) {
       delete userData[user.id];
}

function Comandos(data) {
       var msg = data.message;
       var ccmd = msg.substring(1).split(' ');
       var arg1 = msg.split(" ")[1];
       var arg2 = msg.split(" ")[2];
       var ID = data.fromID;
       var nome = data.from;
       var chat = data.chatID;
       var userfrom = data.from;
       var userfromid = data.fromID;
       var getpos = API.getWaitListPosition(userfromid);
       var res = data.message.trim().split(" ");
       res[0] = res[0].toLowerCase();
       if (userData[data.fromID].mute === true) API.moderateDeleteChat(data.chatID);
       if (msg.indexOf("!") == 0 || msg.indexOf(".") == 0 ) {
              API.moderateDeleteChat(chat);
       }
      
      
       if(data.message.indexOf('!') === 0){
              switch(ccmd[0].toLowerCase()){
                                                         
                            //Staff
                            //Permissões: 1 = Bouncer, 2 = Manager, 3 = CoHost
                     case "r1el":
                            if(API.getUser(ID).permission > 3 || MattB.adm.indexOf(ID) > -1) {
                                   MattB.relogar(data);
                            }
                            else{
                                                         
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Coanfitrião]");
                            }
                            break;
                     case "d1esligar":
                            if(API.getUser(ID).permission > 3 || MattB.adm.indexOf(ID) > -1) {
                                   MattB.desligar(data);
                            }
                            else{
                                   API.sendChat("@"+nome+", Você não tem permissão para usar este comando! [+Coanfitrião]");
                            }
                            break;
                     case "rdjpromo":
                            if(API.getUser(ID).permission > 3 || MattB.adm.indexOf(ID) > -1) {
                                   if (arg1 === "on") {
                                          MattB.status.rdjpromo = "on";
                                          API.sendChat("/me["+nome+"] DJ Residente para os que entrarem na sala [Ativado]");
                                   }
                                   if (arg1 === "off") {
                                          MattB.status.rdjpromo = "off";
                                          API.sendChat("/me["+nome+"] DJ Residente para os que entrarem na sala [Desativado]");
                                   }
                            }
                            else{
                                   API.sendChat("/me@" + data.from + ", você não tem permissão para usar este comando.[+ Co anfitrião]");
                            }
                            break;
                     case "allrdj":
                            if(API.getUser(ID).permission > 3 || MattB.adm.indexOf(ID) > -1) {
                                   if (arg1 === "on") {
                                          allusers = API.getUsers();
                                          for (var i = 0; i < allusers.length; i++) {
                                                 if(API.getUsers(allusers[i].id).permission > -1){
                                                        API.moderateSetRole(allusers[i].id, API.ROLE.RESIDENTDJ);
                                                 }
                                          }
                                          API.sendChat("/me["+nome+"] DJ Residente a todos [Ativado]");
                                   }
                                   if (arg1 === "off") {
                                          allusers = API.getUsers();
                                          for (var i = 0; i < allusers.length; i++) {
                                                 if(API.hasPermission(allusers[i].id, API.ROLE.RESIDENTDJ)) {
                                                        API.moderateSetRole(allusers[i].id, API.ROLE.NONE);
                                                 }
                                          }
                                          MattB.status.rdjpromo = "off";
                                          API.sendChat("/me["+nome+"] DJ Residente a todos [Desativado]");
                                   }
                            }
                            else{
                                   API.sendChat("/me@" + data.from + ", você não tem permissão para usar este comando.[+ Co anfitrião]");
                            }
                            break;
                     case "travar":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   MattB.trava();
                            }
                            else{
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                                         
                     case "destravar":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   MattB.destrava();
                            }
                            else{
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                                         
                     case "pular":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   MattB.pula();
                            }
                            else{
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                                         
                     case "ciclo":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var toggle = $(".cycle-toggle");
                                   if(toggle.hasClass("disabled")) {
                                          toggle.click();
                                   }
                                   else{
                                          toggle.click();
                                   }
                            }
                            else{
                                                         
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                                         
                     case "limparlista":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   MattB.limparl();
                            }
                            else{
                                                         
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Coordenador]");
                                                         
                            }
                            break;
                                                         
                     case "set":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   if(arg1 == "chato"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Notificações de Chatos ativada!");
                                                 MattB.status.chato = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Notificações de Chatos desativada!");
                                                 MattB.status.chato = "off";
                                          }
                                   }
                                   if(arg1 == "add"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Notificações de Adds ativada!");
                                                 MattB.status.grabou = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Notificações de Adds desativada!");
                                                 MattB.status.grabou = "off";
                                          }
                                   }
                                   if(arg1 == "entradastaff"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Notificações de Entrada de Staff ativada!");
                                                 MattB.status.entradastaff = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Notificações de Entrada de Staff desativada!");
                                                 MattB.status.entradastaff = "off";
                                          }
                                   }
                                   if(arg1 == "mendigos"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Anti-Mendigos ativado!");
                                                 MattB.status.fandel = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Anti-Mendigos desativado!");
                                                 MattB.status.fandel = "off";
                                          }
                                   }
                                   if(arg1 == "cargos"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Anti-Mendigos de cargo ativado!");
                                                 MattB.status.cargosdel = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Anti-Mendigos de cargo desativado!");
                                                 MattB.status.cargosdel = "off";
                                          }
                                   }
                                   if(arg1 == "historico"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Histórico de vídeos ativado!");
                                                 MattB.status.historico = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Histórico de vídeos desativado!");
                                                 MattB.status.historico = "off";
                                          }
                                   }
                                   if(arg1 == "tempo"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Tempo de vídeos ativado!");
                                                 MattB.status.autoskip = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Tempo de vídeos desativado!");
                                                 MattB.status.autoskip = "off";
                                          }
                                   }
                                   if(arg1 == "anuncio"){
                                          if(arg2 == "on"){
                                                 API.sendChat("/me["+nome+"] Anuncio ativado!");
                                                 MattB.status.annc = "on";
                                          }
                                          if(arg2 == "off"){
                                                 API.sendChat("/me["+nome+"] Anuncio desativado!");
                                                 MattB.status.annc = "off";
                                          }
                                   }
                            }
                            else{
                                                         
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Coordenador]");
                            }
                            break;
                     case "f5":
                            if(API.getUser(ID).permission > 3 || MattB.adm.indexOf(ID) > -1) {
                                   MattB.f5();
                            }
                            else{
                                                         
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Coanfitrião]");
                            }
                            break;
                                                         
                     case "limparchat":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   MattB.limparchat();
                            }
                            else{
                                                         
                                   API.sendChat("/me@"+nome+", Você não tem permissão para usar este comando! [+Coordenador]");
                            }
                            break;
                                                         
                     case "bloqchat":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   if(arg1 == "on"){
                                          MattB.status.bloqchat = "on";
                                          API.sendChat("/me["+nome+"] Chat bloqueado!");
                                          bblockChat = true;
                                   }
                                   if(arg1 == "off"){
                                          MattB.status.bloqchat = "off";
                                          API.sendChat("/me["+nome+"] Chat desbloqueado!");
                                          bblockChat = false;
                                   }
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coordenador]");
                            }
                            break;
                                                                        
                     case "diz":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var sayMsg = data.message.substr(5).trim();
                                   API.sendChat("/em" + sayMsg);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                                                        
                     case "mover" :
                            if(API.getUser(ID).permission > 2 || MattB.adm.indexOf(ID) > -1) {
                                   if ( res.length >= 3 )
                                   {
                                          var user = res[2];
                                                         				
                                          for (var x = 3; x < res.length; x++)	user += " " + res[x];
                                                         				
                                          var id = GetUser(user);
                                                         				
                                          if ( id == -1 )
                                          {
                                                 API.sendChat("/me Usuário não encontrado!");
                                                 break;
                                          }
                                          API.moderateAddDJ(id);
                                          setTimeout (function(){
                                                 API.moderateMoveDJ(id, parseInt(res[1]));
                                          }
                                          ,1000);
                                   }
                                   else
                                   {
                                          API.sendChat("/me Usuário não encontrado!!");
                                   }
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coordenador]");
                            }
                                                         			
                            break;
                                                         			
                     case "tempo":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   var tempom = msg.substr(msg.indexOf(' ')+1);
                                   MattB.status.TempoMax = tempom;
                                   API.sendChat("/me["+nome+"] Tempo de vídeos definido para " + strTempo(tempom) + "!");
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coordenador]");
                            }
                            break;
                                             
                            // **** AVISOS *****
                     case "warning":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var warnings = msg.substr(msg.indexOf(' ')+1);
                                   API.sendChat("["+nome+"][Warning]  "+warnings+", if you want to keep on the wait list you need to continue voting!");
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                             
                     case "avisos":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var avisoss = msg.substr(msg.indexOf(' ')+1);
                                   API.sendChat("["+nome+"][Aviso +]  "+avisoss+", avaliem os vídeos, ou serão removidos da lista de espera!");
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                             
                     case "aviso1":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.sendChat("["+nome+"][Aviso 1] @"+username+", avalie os vídeos, caso contrário será removido da lista de espera.");
                            }
                            else{
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                                               
                     case "aviso2":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.sendChat("["+nome+"][Aviso 2] @"+username+", por favor, avalie os vídeos, ou será removido da lista de espera (ultimo aviso).");
                            }
                            else{
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                     case "aviso3":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateRemoveDJ(userid);
                                   API.sendChat("["+nome+"][Aviso 3] @"+username+", você foi avisado 2 vezes, agora será removido da lista de espera, da próxima vez use auto woot.");
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                             
                                              
                     case "add":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateAddDJ(userid);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                     case "remover":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateRemoveDJ(userid);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                     case "kick":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var messkick = data.message;
                                   var splitkick = messkick.split("@");
                                   var userskick = API.getUsers();
                                   for(var i in userskick) {
                                          if (userskick[i].username == splitkick[1]) {
                                                 var userkick = userskick[i].id;
                                                 API.sendChat("/me[" + data.from + "] @" + splitkick[1] + " Você será kickado em 5 segundos.")
                                                 setTimeout(function(){
                                                        API.moderateBanUser(userkick, 1, API.BAN.HOUR)
                                                 }
                                                 , 5000);
                                                 setTimeout(function(){
                                                        API.moderateUnbanUser(userkick)
                                                 }
                                                 , 8000);
                                                 setTimeout(function(){
                                                        API.moderateUnbanUser(userkick)
                                                 }
                                                 , 12000);
                                          }
                                   }
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                     case "banir":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateBanUser(userid, 0, API.BAN.PERMA);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando.[+Coordenador]");
                            }
                            break;
                     //               case "desbanir":
                            //               if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                            //               }
                            //               else{
                                                         
                            //                    API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coordenador]");
                            //               }
                            //               break;
                     case "rdj":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateSetRole(userid, API.ROLE.RESIDENTDJ);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coordenador]");
                            }
                            break;
                     case "bouncer":
                            if(API.getUser(ID).permission > 2  || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateSetRole(userid, API.ROLE.BOUNCER);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coodenador]");
                            }
                            break;
                     case "manager":
                            if(API.getUser(ID).permission > 3 || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateSetRole(userid, API.ROLE.MANAGER);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coanfitrião]");
                            }
                            break;
                     case "recargo":
                            if(API.getUser(ID).permission > 3 || MattB.adm.indexOf(ID) > -1) {
                                   var username = msg.substr(msg.indexOf('@')+1);
                                   var userid = getUserID(username);
                                   API.moderateSetRole(userid, API.ROLE.NONE);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Coanfitrião]");
                            }
                            break;
                     case "mutar":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var msg = data.message.split("@");
                                   var user = msg[1];
                                   var users = API.getUsers();
                                   for (var i in users) {
                                          if (users[i].username == user) {
                                                 userData[users[i].id].mute = true;
                                                 API.sendChat("/me [" + data.from + "] mutou o usuário @" + user);
                                          }
                                   }
                            }
                            else {
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                     case "desmutar":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var msg = data.message.split("@");
                                   var user = msg[1];
                                   var users = API.getUsers();
                                   for (var i in users) {
                                          if (users[i].username == user) {
                                                 userData[users[i].id].mute = false;
                                                 API.sendChat("/me [" + data.from + "] desmutou o usuário @" + user);
                                          }
                                   }
                            }
                            else {
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                     case "stat":
                            if(API.getUser(ID).permission > 1  || MattB.adm.indexOf(ID) > -1) {
                                   var response = "";
                                   var currentTime = new Date().getTime();
                                   var minutes = Math.floor((currentTime - MattB.joined) / 60000);
                                   var hours = 0;
                                   while(minutes > 60){
                                          minutes = minutes - 60;
                                          hours++;
                                   }
                                   hours == 0 ? response = "Iniciado há " + minutes + "m " : response = "Iniciado há " + hours + "h " + minutes + "m";
                                   response = response + " | Versão: "+ MattB.versao;
                                   response = response + " | Criado por: "+ MattB.credito;
                                   response = response + " | Lista: "+ MattB.status.listae;
                                   response = response + " | Ciclo: " + MattB.status.ciclodj;
                                   response = response + " | Mendigos: " + MattB.status.fandel;
                                   response = response + " | Mendigos de Cargos: " + MattB.status.cargosdel;
                                   response = response + " | Histórico: " + MattB.status.historico;
                                   response = response + " | Tempo vídeos: " + MattB.status.autoskip;
                                   response = response + " | Tempo definido: "+strTempo(MattB.status.TempoMax);
                                   response = response + " | RDJ Promo: " + MattB.status.rdjpromo;
                                   response = response + " | Entrada Staff: "+ MattB.status.entradastaff;
                                   response = response + " | Add: "+ MattB.status.grabou;
                                   response = response + " | Chato: "+ MattB.status.chato;
                                   response = response + " | Anuncio: "+ MattB.status.annc;
                                   API.sendChat(response);
                            }
                            else{
                                                         
                                   API.sendChat("/me@" + data.from + ", Você não tem permissão para usar este comando! [+Segurança]");
                            }
                            break;
                                                         
                                                         
                            //Usuários
                     //                     case "eta":
                            //                            //var a = data.message.split("@");
                            //                            // var y = a[1];
                            //                            var y = data.from;
                            //                            var b = API.getUsers();
                            //                            for (var i in b) {
                            //                                   if(b[i].username == y) {
                            //                                          var c = API.getUser(b[i].id).wlIndex + 1;
                            //                                          var d = 5;
                            //                                          if(c == 1) {
                            //                                                 var e = $("#now-playing-time").children('span').text();
                            //                                                 API.sendChat("/em@" + y + " tempo para ser DJ: " + e + " minutos.");
                            //                                          }
                            //                                          else if(c > 1) {
                            //                                                 var f = Math.floor(c*d);
                            //                                                 API.sendChat("/em@" + y + " tempo para ser DJ: " + f + " minutos.");
                            //                                          }
                            //                                          else API.sendChat("/em@" + y + " você está tocando, ou não está na lista.");
                            //                                   }
                            //                            }
                            //                            break;
                     case "eta":
                            var y = data.from;
                            var b = API.getUsers();
                            for (var i in b) {
                                   if(b[i].username == y) {
                                          var c = API.getUser(b[i].id).wlIndex + 1;
                                          var d = 5;
                                          if(c == 1) {
                                                 var e = $("#now-playing-time").children('span').text();
                                                 API.sendChat("/em ETA > [" + y + "] faltam " + e + " minutos para você ser DJ.");
                                          }
                                          else if(c > 1) {
                                                 var f = Math.floor(c*d);
                                                 API.sendChat("/em ETA > [" + y + "] faltam " + f + " minutos para você ser DJ.");
              
                                          }
                                          else{
                                                 API.sendChat("/em ETA > [" + y + "] você está tocando, ou não está na lista de espera.");
                                          }
                                   }
                            }
                            break;
                     case "id":
                            API.sendChat("/me@"+ data.from +" Seu ID é: "+ data.fromID);
                            break;
                                                                        
                     case "comandos":
                     case "commands":
                     case "cmds":
                            API.sendChat("/em["+data.from+"] >  Clique no link: "+MattB.status.cmdslink+", para ver os comandos!");
                            break;
                                                         
                     case "pontos":
                            MattB.pontos(data);
                            break;
                                                         
                     case "legal":
                            API.sendChat("@"+ data.from +" gostou do seu video @"+ API.getDJ().username +", continue assim! :star2: :revolving_hearts:");
                            break;
                                                         
                     case "chato":
                            API.sendChat("@"+ data.from +" não gostou do seu video @"+ API.getDJ().username +", melhore na próxima! :-1: :broken_heart: ");
                            break;
                     case "link":
                     case "musica":
                     case "url":
                            MattB.linkm(data);
                            break;
                     case "autowoot":
                            API.sendChat("/em["+data.from+"] > Auto-Woot >> https://rcs.radiant.dj/install");
                            break;
                     case "rules":
                     case "themes":
                            API.sendChat("/em["+data.from+"] To see the rules and themes >> http://goo.gl/mz733J !");
                            break;
                     case "regras":
                     case "temas":
                            API.sendChat("/em["+data.from+"] > Regras e Temas da sala >> http://goo.gl/i7JUIX; O documento tem 2 páginas, leia-as!");
                            break;
                     case "adblock":
                            API.sendChat("/em["+data.from+"] > Para remover as propagandas dos videos use AdBlock > http://www.adblockplus.org/");
                            break;
              }
       }
}
//************************************************************************************
//EntrouStaff
function StaffEntrou(user){
       if(MattB.status.entradastaff == "on"){
              if (API.hasPermission(user.id, API.ROLE.ADMIN)) {
                     setTimeout (function(){
                            API.sendChat(":sunglasses:Admin: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.AMBASSADOR)) {
                     setTimeout (function(){
                            API.sendChat(":sunglasses:Embaixador(a): @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.HOST)) {
                     setTimeout (function(){
                            API.sendChat(":sunglasses:Anfitrião: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.COHOST)) {
                     setTimeout (function(){
                            API.sendChat(":sunglasses:Co-Anfitrião: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.MANAGER)) {
                     setTimeout (function(){
                            API.sendChat(":sunglasses:Coordenador(a): @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
              else
              if (API.hasPermission(user.id, API.ROLE.BOUNCER)) {
                     setTimeout (function(){
                            API.sendChat(":sunglasses:Segurança: @" + user.username + ", entrou na sala.");
                     }
                     , 1600);
              }
       }
}

function grabou(obj)
{
       if(MattB.status.grabou == "on"){
              var song3 = API.getMedia().author + '  -  ' + API.getMedia().title;
              API.sendChat("@" + obj.user.username + " adicionou o video: " + song3);
       }
}

function chato(obj)
{
       if(MattB.status.chato == "on"){
              var song2 = API.getMedia().author + '  -  ' + API.getMedia().title;
              var vote = obj.vote == 1 ? "woot" : "meh";
              if (vote == "meh")
              {
                     API.sendChat("@" + obj.user.username + " votou Chato em: " + song2);
              }
       }
}


MattB.f5 = function(){
       API.sendChat("Atualizando a página!");
       setTimeout (function(){
              location.reload(true);
       }
       , (1*1000));
}

MattB.limparchat = function(){
       var messages = $('#chat-messages').children();
       for (var i = 0; i < messages.length; i++) {
              for (var j = 0; j < messages[i].classList.length;
              j++) {
                     if (messages[i].classList[j].indexOf('cid-') == 0) {
                            API.moderateDeleteChat(messages[i].classList[j].substr(4));
                            break;
                     }
              }
       }
}

MattB.pula = function(){
       API.moderateForceSkip();
}

MattB.trava = function (){
       MattB.status.listae = "travada";
       API.moderateLockWaitList(true);
}

MattB.destrava = function (){
       MattB.status.listae = "destravada";
       API.moderateLockWaitList(false);
}

MattB.limparl = function(){
       MattB.status.listae = "travada";
       API.moderateLockWaitList(true, true);
}

MattB.pontos = function(data){
       ID = data.fromID;
       var points = API.getUser(ID).djPoints + API.getUser(ID).listenerPoints + API.getUser(ID).curatorPoints;
       var fans = API.getUser(ID).fans;
       var listenerPoints = API.getUser(ID).listenerPoints;
       var curatorPoints = API.getUser(ID).curatorPoints;
       API.sendChat(":+1: " + points + " | :musical_note: " + listenerPoints + " | :star: " + curatorPoints + " @" + data.from);
}

MattB.linkm = function(data){
       if(API.getMedia().format == 1){
              API.sendChat("@" + data.from + " " + "http://youtu.be/" + API.getMedia().cid);
       }
       else{
              var id = API.getMedia().cid;
              SC.get('/tracks', {
                     ids: id,
              }
              , function(tracks) {
                     API.sendChat("@"+data.from+" "+tracks[0].permalink_url);
              }
              );
       }
}

bblockChat = false;
bblockChat = function( data )
{
       var id = data.fromID;
       var msg = data.message;
       if ( msg.indexOf( '' ) > - 1 )
       {
              API.moderateDeleteChat( data.chatID );
       }
}

function bChat2( data )
{
       if ( bblockChat == true )
       {
              var id = data.fromID;
              var msg = data.message;
              if ( msg.indexOf( '' ) > - 1 )
              {
                     API.moderateDeleteChat( data.chatID );
              }
       }
}

MattB.fandel = ["vire meu fa",
"fan back",
"rt fa",
"agora é seu fa",
"retribuo fa",
"seja meu fa",
"fan for fan",
"fan 4 fan",
"f4f",
"fan4fan",
"fanback",
"fanbot",
"fan pls",
"fan me",
"quem vira meu fa",
"vira meu fa",];

MattB.cargosdel = ["me da cargo",
"me coloca de adm",
"me coloca na equipe",
"me coloca na staff",
"da cargo",
"aumenta meu cargo",
"me da adm",
];

MattB.alink = [
".xvideos",
".pornhub",
".xnxx",
"plug.dj/","/plug.","plug .dj/","plug . dj/"," .dj/",
".redtube",
".brazzers",
".sambaporno",
"porno/",".porno/",".porno","-porno","porno-","-sexy",".sexy",
"-sensual",".sensual",".playboy","bucetas.","-buceta","funk.","-funk","/porno","/sexy","sexo/",
];

function antilinks(data){
       msg = data.message.toLowerCase();

       for(var i = 0; i < MattB.alink.length; i++){
              if(msg.indexOf(MattB.alink[i].toLowerCase()) > -1){
                     API.moderateDeleteChat(data.chatID);
                     API.sendChat("@"+ data.from +" Não mande isso, aqui.");
              }
       }
}

          
function fandelete(data){
       if(MattB.status.fandel === "on"){
              msg = data.message.toLowerCase();

              for(var i = 0; i < MattB.fandel.length; i++){
                     if(msg.indexOf(MattB.fandel[i].toLowerCase()) > -1){
                            API.moderateDeleteChat(data.chatID);
                            API.sendChat("@" + data.from + " não mendigue fãs.");
                     }
              }
       }
}
function fandelete(data){
       if(MattB.status.cargosdel === "on"){
              msg = data.message.toLowerCase();

              for(var i = 0; i < MattB.cargosdel.length;
              i++){
                     if(msg.indexOf(MattB.cargosdel[i].toLowerCase()) > -1){
                            API.moderateDeleteChat(data.chatID);
                            API.sendChat("@" + data.from + " não mendigue cargos.");
                     }
              }
       }
}

function rdjpromo(user){
       if (MattB.status.rdjpromo === "on") {
              if (API.hasPermission(user.id, API.ROLE.BOUNCER)) {
                     setTimeout (function(){
                            API.moderateSetRole(user.id, API.ROLE.BOUNCER);
                     }
                     ,1000);
              }
              else
              if(API.getUser(user.id).permission > -1) {
                     setTimeout (function(){
                            API.moderateSetRole(user.id, API.ROLE.RESIDENTDJ);
                     }
                     ,1000);
              }

       }
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

function tempo2(obj){
       if(MattB.status.autoskip === "on"){
              if (obj === null) return;
              var tempoSeg = obj.media.duration;
   
              if(tempoSeg > MattB.status.TempoMax){
                     API.sendChat("/me@" + API.getDJ().username  + " seu vídeo tem mais de "+strTempo(MattB.status.TempoMax)+", pulando...");
                     API.moderateForceSkip();
              }
       }
}

function ups(update) {
       var hist = API.getHistory();
       var djID = API.getHistory()[0].user.id;
       for (var i in hist) {
              if (hist[i].media.id == update.media.id) {
                     API.sendChat("/me@"+ API.getDJ().username +" seu vídeo está no histórico! Pulando...");
                     API.moderateForceSkip();
                     break;
              }
       }
}
  
//var skipping = false, skipThreshold = 5;
//API.on(API.ROOM_SCORE_UPDATE,function(score){
//          if (score.negative >= skipThreshold && !skipping) {
//                skipping = true;
//                API.once(API.DJ_ADVANCE,function(){skipping = false;});
//                API.moderateForceSkip();
//}
//});
   
var pwl = {};
pwl.data = {};
pwl.engaged = false;
pwl.userLeaveCallback = function(user) {
  pwl.data[user.id] = {};
  pwl.data[user.id].leftAt = new Date().getTime();
  pwl.data[user.id].wlIndex = user.wlIndex;
  //console.log('user ' + user.username + ' left. saving data: leftAt = ' + pwl.data[user.id].leftAt + ' & wlIndex = ' + pwl.data[user.id].wlIndex);
}
pwl.userJoinCallback = function(user) {
  if(pwl.data[user.id]) {
    if(pwl.shouldUserBeRestored(pwl.data[user.id])) {
      var restoreToPosition = Math.min(API.getWaitList().length, pwl.data[user.id].wlIndex + 1);
      if(pwl.fullAuto && API.hasPermission(null,API.ROLE.MANAGER)) {
        var moveDJ = function(usersInWaitList) {
          var userFound = false;
          for(var i=0;i<usersInWaitList.length;i++) {
            if(usersInWaitList[i].id = user.id) {
              API.moderateMoveDJ(user.id, restoreToPosition);
              API.off(API.WAIT_LIST_UPDATE, moveDJ);
              break;
            }
          }
        };
        API.on(API.WAIT_LIST_UPDATE, moveDJ);
        API.moderateAddDJ(user.id);
        API.sendChat('/em[DC] O usuário @' + user.username + ' reconectou dentro de 2hs, estava em: ' + restoreToPosition + '.');
      } else {
        API.sendChat('/em[DC] O usuário @' + user.username + ' reconectou dentro de 2hs, estava em: ' + restoreToPosition + '.');
      }
    }
  }
}
//API.sendChat('PWL: ' + user.username + ' rejoined within 1 hour of leaving and has been restored to position ' + restoreToPosition + ' in the wait list.');
//      } else {
//        API.sendChat('PWL: ' + user.username + ' rejoined within 1 hour of leaving and should be restored to position ' + restoreToPosition + ' in the wait list.');
pwl.shouldUserBeRestored = function(storedUserData) {
  var now = new Date().getTime();                                         //2h
  return storedUserData.leftAt + 5000 < now && storedUserData.leftAt + 7200000 > now && storedUserData.wlIndex > -1;
}
pwl.chatCallback = function(chatData) {
  if(chatData.message[0] !== ';' && chatData.message[0] !== '!') return;
  if(chatData.message.toLowerCase().substring(1) === 'dc') {
    if(pwl.engaged) {
      API.sendChat('DC está ativado, @' + chatData.from);
    }
  }
}
pwl.init = function(fullAuto) {
  pwl.stop(true);
  pwl.fullAuto = fullAuto;
  if(fullAuto) {
    API.chatLog('DC Ativado.');
  } else {
    API.chatLog('Ativado.');
  }
  API.on(API.USER_JOIN, pwl.userJoinCallback);
  API.on(API.USER_LEAVE, pwl.userLeaveCallback);
  API.on(API.CHAT, pwl.chatCallback);
  pwl.engaged = true;
}
pwl.stop = function(stealth) {
  if(!stealth) {
    API.chatLog('DC Desativado.');
  }
  API.off(API.USER_JOIN, pwl.userJoinCallback);
  API.off(API.USER_LEAVE, pwl.userLeaveCallback);
  API.off(API.CHAT, pwl.chatCallback);
  pwl.engaged = false;
}
pwl.showControls = function() {
  $('#room').append($('<div id="pwlDiv" style="padding-top:10px;text-align:center;cursor:pointer;background:#282C35;border-radius:5px;width:100px;height:30px;position:absolute;left:10px;top:50px">DC Off</div>'));
  $('#pwlDiv').click(function(){
    if(pwl.engaged) {
      pwl.stop();
      $(this).html('DC Off');
    } else {
      pwl.init(API.hasPermission(null, API.ROLE.MANAGER));
      $(this).html('DC On');
    }
  });
  
}();
     

//Bot On

MattB.IniciarC = function(){
       //Funções
       API.on(API.CHAT, antilinks);
       API.on(API.USER_JOIN, StaffEntrou);
       API.on(API.DJ_ADVANCE, ups);
       //API.on(API.DJ_ADVANCE, lengthCheck);
       API.on(API.DJ_ADVANCE, tempo2);
       API.on(API.CHAT, Comandos);
       API.on(API.CURATE_UPDATE, grabou);
       API.on(API.VOTE_UPDATE, chato);
       API.on(API.CHAT, bChat2);
       API.on(API.CHAT, fandelete);
       API.on(API.USER_JOIN, rdjpromo);
       API.on(API.USER_LEAVE, leave2);
       API.on(API.USER_JOIN, user2);
       // CMBS
       API.on(API.WAIT_LIST_UPDATE, autojj);
       API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
       API.on(API.USER_JOIN, UserJoin);
       API.on(API.USER_LEAVE, left);
       API.on(API.CURATE_UPDATE, grabs);
       API.on(API.CHAT_COMMAND, cmdsbs);
       API.on(API.CHAT, autoRespond3);
       //Games
       API.on(API.CHAT, GamesBot);
       API.on(API.CHAT,DialogBot);
       //MSG INICIAL
       API.sendChat("/emMBot ativado "+MattB.versao+"! :white_check_mark:");
       API.sendChat("/emComandos do MBot >> "+MattB.status.cmdslink);
       API.chatLog("Games e Dialogos ativados...",true);
       API.chatLog("DC: faz com que cada player que sair da lista de espera(levar disconnect) voltará automáticamente para a posição!",true);
       setTimeout (function(){
              API.chatLog("Comandos básicos ativados, digite: /cmbs para ver os comandos.",true);
       }
       ,1000);
}

MattB.VerifCargo = function(id){
       //if(API.getUser(IDc).permission > 2){
       if (API.hasPermission(id, API.ROLE.MANAGER)){
              MattB.IniciarC();
       }
       else
       //if(API.getUser(IDc).permission > 1){
       if (API.hasPermission(id, API.ROLE.BOUNCER)){
              API.chatLog("Você precisa ter cargo de Coordenador ou superior para usar o Matt Bot!",true);
       }
       else
       //if(API.getUser(IDc).permission > 0){
       if (API.hasPermission(id, API.ROLE.RESIDENTDJ)){
              API.chatLog("Você precisa ter cargo de Coordenador ou superior para usar o Matt Bot!",true);
       }
       else
       if (API.hasPermission(id, API.ROLE.NONE)){
              API.chatLog("Você precisa ter cargo de Coordenador ou superior para usar o Matt Bot!",true);
       }

}

MattB.VerifCargo();

//Games e Dialogos

       
//Bot Dialogo
mattbot = {
       falaoi: ["oi bot","ola bot","eae bot","olá bot"],
       respondeoi: [":D Oi",":D Olá"],
       boton: ["bot on?","bot tae?","bot esta ativado?","bot ta ativado?","bot ta on?","bot ligado?"],
       toon: ["Estou aqui"],
       olapessoas: ["oi gente","yo minna","ola pessoas","ola gente","eae galera","oi galera","eae gente","ola galera","yo galera","yo gente","oi pessoas","oi pessoal","oi minna"],
       welcomebot: ["Olá, seja bem-vindo a nossa sala. Divirta-se "],
       bomdia: ["bom dia gente","bom dia galera","bom dia pessoal"], bomdiabot: [":D Bom  Dia"],
       boatarde: ["boa tarde gente","boa tarde galera","boa tarde pessoal"], boatardebot: [":D Boa  Tarde"],
       boanoite: ["boa noite gente","boa noite galera","boa noite pessoal"], boanoitebot: [":D Boa  Noite"],
       autowootlink: ["Como usar Auto-Woot > http://goo.gl/mpByzP"],
       awlink: ["link do autowoot bot","como usar autowoot","o que é autowoot","como usa o autowoot"],
}

function DialogBot(data){
       msg = data.message.toLowerCase();

       //Autowoot Link
       for(var i = 0; i < mattbot.awlink.length; i++){
              if(msg.indexOf(mattbot.awlink[i].toLowerCase()) > -1){
                     var autowootlinkRandom = Math.floor(Math.random() * mattbot.autowootlink.length);
                     API.sendChat(mattbot.autowootlink[autowootlinkRandom] +" @"+ data.from +" ");
              }
       }
       //Oi
       for(var i = 0; i < mattbot.falaoi.length; i++){
              if(msg.indexOf(mattbot.falaoi[i].toLowerCase()) > -1){
                     var respondeoiRandom = Math.floor(Math.random() * mattbot.respondeoi.length);
                     API.sendChat(mattbot.respondeoi[respondeoiRandom] +" @"+ data.from +" ");
              }
       }
       //On?
       for(var i = 0; i < mattbot.boton.length; i++){
              if(msg.indexOf(mattbot.boton[i].toLowerCase()) > -1){
                     var toonRandom = Math.floor(Math.random() * mattbot.toon.length);
                     API.sendChat(mattbot.toon[toonRandom] +" @"+ data.from +" ");
              }
       }
       //ola pessoas
       for(var i = 0; i < mattbot.olapessoas.length;
       i++){
              if(msg.indexOf(mattbot.olapessoas[i].toLowerCase()) > -1){
                     var welcomebotRandom = Math.floor(Math.random() * mattbot.welcomebot.length);
                     API.sendChat(mattbot.welcomebot[welcomebotRandom] +" @"+ data.from +" !");
              }
       }
       //bomdia
       for(var i = 0; i < mattbot.bomdia.length; i++){
              if(msg.indexOf(mattbot.bomdia[i].toLowerCase()) > -1){
                     var bomdiabotRandom = Math.floor(Math.random() * mattbot.bomdiabot.length);
                     API.sendChat(mattbot.bomdiabot[bomdiabotRandom] +" @"+ data.from +" ");
              }
       }
       //boatarde
       for(var i = 0; i < mattbot.boatarde.length;
       i++){
              if(msg.indexOf(mattbot.boatarde[i].toLowerCase()) > -1){
                     var boatardebotRandom = Math.floor(Math.random() * mattbot.boatardebot.length);
                     API.sendChat(mattbot.boatardebot[boatardebotRandom] +" @"+ data.from +" ");
              }
       }
       //boanoite
       for(var i = 0; i < mattbot.boanoite.length;
       i++){
              if(msg.indexOf(mattbot.boanoite[i].toLowerCase()) > -1){
                     var boanoitebotRandom = Math.floor(Math.random() * mattbot.boanoitebot.length);
                     API.sendChat(mattbot.boanoitebot[boanoitebotRandom] +" @"+ data.from +" ");
              }
       }
}

//Games Bot
tacos = new Array();
tacos = ["cigarro","cigarro de maconha","marlboro","narguilé","caximbo da paz"];
cookie = ["um biscoito de chocolate","uma bolacha","um cookie de aveia e passas","um biscoito 'especial'","um cracker animal","um Biscoito Scooby"];
drink = ["Caipirinha", "Wisk", "Tequila", "Champagne", "VODKA", "Capeta"];
abraco = ["deu um abraço de urso em","deu um abraço gostosinho em","da um abraço por traz de","da um abraço de motoqueiro em"];
safado = ["morde a orelha de","aperta a bundinha de","lambe os mamilos de","morde os lábios de","faz um 69 com","lambe o umbigo de","chupa o dedo de","lambe a virilha de"];
punirr = ["penetra uma caneta em","cutuca os olhos de","aperta os mamilos de","cospe em"];
punir2 = ["dá uma piruzada na cara de","passa DST para","penetra um dildo em","enfia um peixe elétrico no rabo de","da um tapa no saco de"];


function GamesBot(data) {
       if(data.message.indexOf('!') === 0){
              var msg = data.message, from = data.from, fromID = data.fromID;
              var command = msg.substring(1).split(' ')
              if(typeof command[2] != "undefined"){
                     for(var i = 2; i<command.length; i++){
                            command[1] = command[1] + ' ' + command[i];
                     }
              }
              switch(command[0].toLowerCase()){
                     ////////////////////////////////////////////////////////////////////////////////
                     case "punir":
                     if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomPunirr = Math.floor(Math.random() * punirr.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+punirr[randomPunirr]+" @"+command[1]+" ");
                                   break;
                            }
                     }
                     else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomPunirr = Math.floor(Math.random() * punirr.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+punirr[randomPunirr]+" @"+command[1]+" ");
                                   break;
                            }

                     }
                     break;

                     case "punir2":
                     if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomPunir2 = Math.floor(Math.random() * punir2.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+punir2[randomPunir2]+" @"+command[1]+" ");
                                   break;
                            }
                     }
                     else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomPunir2 = Math.floor(Math.random() * punir2.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+punir2[randomPunir2]+" @"+command[1]+" ");
                                   break;
                            }

                     }
                     break;
                     ////////////////////////////////////////////////////////////////////////////////
                     case "bolacha":
                     if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomCookie = Math.floor(Math.random() * cookie.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + cookie[randomCookie]+ ". Divirta-se!");
                                   break;
                                   case 1:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + cookie[randomCookie]+ ". Divirta-se!");
                                   break;
                                   case 2:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + cookie[randomCookie]+ ". Divirta-se!");
                                   break;
                            }
                     }
                     else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomCookie = Math.floor(Math.random() * cookie.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + cookie[randomCookie]+ ". Divirta-se!");
                                   break;
                                   case 1:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + cookie[randomCookie]+ ". Divirta-se!");
                                   break;
                                   case 2:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + cookie[randomCookie]+ ". Divirta-se!");
                                   break;
                            }
                     }
                     break;
                     ////////////////////////////////////////////////////////////////////////////////
                     case "bebida":
                     if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomDrink = Math.floor(Math.random() * drink.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + drink[randomDrink]+ ". Divirta-se!");
                                   break;
                                   case 1:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + drink[randomDrink]+ ". Divirta-se!");
                                   break;
                                   case 2:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + drink[randomDrink]+ ". Divirta-se!");
                                   break;
                            }
                     }
                     else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomDrink = Math.floor(Math.random() * drink.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@" + data.from + " recompensou @" +command[1]+ " com " + drink[randomDrink]+ ". Divirta-se!");
                                   break;
                            }
                     }
                     break;
                     ////////////////////////////////////////////////////////////////////////////////
                     case "drogas":
                     if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomTaco = Math.floor(Math.random() * tacos.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@" + crowd[randomUser].username + ", fuma esse " + tacos[randomTaco] + ", seu vagabundo!");
                                   break;
                                   case 1:
                                   API.sendChat("@" + crowd[randomUser].username + ", pega um " + tacos[randomTaco] + " ae bro!");
                                   break;
                                   case 2:
                                   API.sendChat("Um " + tacos[randomTaco] + " para você, @" + crowd[randomUser].username + ".");
                                   break;
                                   case 3:
                                   API.sendChat(" deu " + tacos[randomTaco] + " para @" + crowd[randomUser].username + "!");
                                   break;
                            }
                     }
                     else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomTaco = Math.floor(Math.random() * tacos.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@" + command[1] + ", fuma esse " + tacos[randomTaco] + ", seu vagabundo!");
                                   break;
                                   case 1:
                                   API.sendChat("@" + command[1] + ", pega um " + tacos[randomTaco] + " ae bro!");
                                   break;
                                   case 2:
                                   API.sendChat("Um " + tacos[randomTaco] + " para você, @" + command[1] + ".");
                                   break;
                                   case 3:
                                   API.sendChat(" Deu " + tacos[randomTaco] + " para @" + command[1] + "!");
                                   break;
                            }
                     }
                     break;
                     ////////////////////////////////////////////////////////////////////////////////
                     case "safado":
                     if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSafado = Math.floor(Math.random() * safado.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+safado[randomSafado]+" @"+command[1]+"!");
                                   break;
                            }
                     }
                     else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomSafado = Math.floor(Math.random() * safado.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+safado[randomSafado]+" @"+command[1]+"!");
                                   break;
                            }
                     }
                     break;
                     case "abraço":
                     if(typeof command[1] == "@"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomAbraco = Math.floor(Math.random() * abraco.length);
                            var randomSentence = Math.floor(Math.random() * 2);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+abraco[randomAbraco]+" @"+command[1]+"!");
                                   break;
                            }
                     }
                     else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomAbraco = Math.floor(Math.random() * abraco.length);
                            var randomSentence = Math.floor(Math.random() * 1);
                            switch(randomSentence){
                                   case 0:
                                   API.sendChat("@"+data.from+" "+abraco[randomAbraco]+" @"+command[1]+"!");
                                   break;
                            }
                     }
                     break;
              }
       }
}

//Comandos básicos para MBOT.

var a = $('#chat-messages'), b = a.scrollTop() > a[0].scrollHeight - a.height() -20;

//Chat colors
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.Green { color: rgb(24, 219, 46)!important; lest().position().top-; first().position().top+100; border-left: rgb(24, 219, 46) 3px solid!important; }';
//green
document.getElementsByTagName('head')[0].appendChild(style);

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.Purple { color: rgb(160, 32, 240)!important;border-left: rgb(160, 32, 240) 3px solid!important; }';
//Purple
document.getElementsByTagName('head')[0].appendChild(style);

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.Blue { color: rgb(0, 191, 255)!important;border-left: rgb(0, 191, 255) 3px solid!important; }';
//blue
document.getElementsByTagName('head')[0].appendChild(style);

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.Yellow { color: rgb(255, 255, 0)!important;border-left: rgb(255, 255, 0) 3px solid!important; }';
//yellow
document.getElementsByTagName('head')[0].appendChild(style);

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.Orange { color: rgb(255, 165, 0)!important;border-left: rgb(255, 165, 0) 3px solid!important; }';
//orange
document.getElementsByTagName('head')[0].appendChild(style);

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.Limag { color: rgb(50, 205, 50)!important;border-left: rgb(50, 205, 50) 3px solid!important; }';
//lima green
document.getElementsByTagName('head')[0].appendChild(style);

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.BlueViolet { color: rgb(138, 43, 226)!important;border-left: rgb(138, 43, 226) 3px solid!important; }';
//Blue Violet
document.getElementsByTagName('head')[0].appendChild(style);

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.LGreen { color: rgb(124, 252, 0)!important;border-left: rgb(124, 252, 0) 3px solid!important; }';
//verded
document.getElementsByTagName('head')[0].appendChild(style);

Matt2 ={
       afkmsg: "off",
}

var mentioned = false;
var timeToWait = 10000;
var timePassed = 0;
var timer = null;

function cmdsbs(value)
{
       cmd = value.split(" ");
     
       if (cmd[0] == "/cmbs")
       {
              $("#chat-messages").append("<div class='Yellow system'><span class='text'>/chatos -> Mostra a lista de quem votou chato.<br/>/on /aus /trab /jog /ina -> Para alterar seu status.<br/> /mutar /desmutar -> Para mutar o video ou desmutar.<br/> /vol 0 - 100 -> Para setar o volume do video.<br/> /atvideo -> Para atualizar o video.<br/> /video -> Para ativar/desativar o audio e o video.<br/> /dancar -> Para ativar/desativar a danca dos Avatares.<br/>/u5 -> Para ver os ultimos 5 videos que foram reproduzidos.<br/>/aj [on, off] -> Para ativar/desativar o autojoin.<br/> /aw [on, off] -> Para ativar/desativar o autowoot. <br/>/set [entrada, add] [on, off] -> Para ativar/desativar as notificacoes.<br/>/afk [mensagem] -> Para por uma mensagem AFK. <br/>/msg [atual/on/off] -> Para ver a mensagem atual, ativar ou desativar.<br/>/matt [azul/rosa/vermelho] -> Para alterar a cor do mbot.</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
       }

       if(cmd[0] == "/afk"){
              Matt2.afkmsg = "on";
              userStatusMsg = "";
              for (var i = 1; i < cmd.length; i++) {
                     userStatusMsg += cmd[i] + " ";
              }
              //mentioned = true;
              MattAFK.respondeafk = userStatusMsg;
              $("#chat-messages").append("<div class='Blue system'></i><span class='text'>Msg alterada para: "+MattAFK.respondeafk+" <br/> O sistema comecara a contar assim que seu chat ficar inativo por 10 segundos.</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
       }
      
       if(cmd[0] == "/msg"){
              if(cmd[1] == "atual"){
                     $("#chat-messages").append("<div class='Blue system'></i><span class='text'>Msg AFK: "+MattAFK.respondeafk+" </span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
              }
            
              if(cmd[1] == "on"){
                     Matt2.afkmsg = "on";
                     //mentioned = true;
                     $("#chat-messages").append("<div class='Blue system'></i><span class='text'>Mensagem afk ativada! </span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
              }
                  
              if(cmd[1] == "off"){
                     Matt2.afkmsg = "off";
                     //mentioned = false;
                     $("#chat-messages").append("<div class='Blue system'></i><span class='text'>Mensagem afk desativada! </span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
              }
              if(cmd[1] == "matt"){
                     Matt2.afkmsg = "on";
                     MattAFK.respondeafk = "Estou ausente/jogando, entre em contato comigo pelo facebook > http://fb.com/umattlinda1/ :)";
                     setTimeout (function(){
                            $("#chat-messages").append("<div class='Blue system'></i><span class='text'>Msg AFK: "+MattAFK.respondeafk+" </span></div>");
                            b && a.scrollTop(a[0].scrollHeight);
                     }
                     ,1000);
              }
       }
       if (cmd[0] == "/matt")
       {
              if (cmd[1] == "azul")
              {
                     $("#chat-messages").append("<div class='Blue system'></i><span class='text'> Alterando cor do helper para: Azul (Padrao) </span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
                     $('head').append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/jizfd7yvi790amz/HEADMHELPER.css">');
                     $('head').append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/ch0exbr5o4o2bj2/chatstylematt.css">');
              }
              if (cmd[1] == "rosa")
              {
                     $("#chat-messages").append("<div class='Purple system'></i><span class='text'> Alterando cor do helper para: Rosa/Roxo </span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
                     $('head').append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/cof5djg5016iqfz/chatstylemattrosaroxo.css">');
                     $('head').append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/maujvktnsj4szpj/HEADMHELPERrosaroxo.css">');
              }
  
              if (cmd[1] == "vermelho")
              {
                     $("#chat-messages").append("<div class='system'></i><span class='text'> Alterando cor do helper para: Vermelho </span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
                     $('head').append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/vexgfp0uhnrz95l/chatstylematt%20vermelho.css">');
                     $('head').append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/s/qc4ysl0yd7uzeql/HEADMHELPER%20vermelho.css">');
              }
       }
       if (cmd[0] == "/chatos")
       {
              haters();
       }
       if (cmd[0] == "/mutar")
       {
              $("#chat-messages").append("<div class='system'><i class='icon icon-volume-off'></i><span class='text'> Volume: 0% </span></div>");
              b && a.scrollTop(a[0].scrollHeight);
              API.setVolume(0);
       }
       if (cmd[0] == "/desmutar")
       {
              $("#chat-messages").append("<div class='system'><i class='icon icon-volume-on'></i><span class='text'> Volume: 100% </span></div>");
              b && a.scrollTop(a[0].scrollHeight);
              API.setVolume(100);
       }
       if (cmd[0] == "/vol")
       {
              API.setVolume(parseInt(cmd[1]));
       }
       if (cmd[0] == "/autojoin" || cmd[0] == "/aj")
       {
              if (cmd[1] === "on")
              {
                     $("#chat-messages").append("<div class='system'><i class='icon icon-join-booth'></i><span class='text'>Auto Join Ativado! Voce entrara na lista de espera automaticamente apos tocar.</span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
                     API.on(API.WAIT_LIST_UPDATE, autojj);
                     API.djJoin();

              }
              if (cmd[1] === "off")
              {
                     $("#chat-messages").append("<div class='system'><i class='icon icon-leave-booth'></i><span class='text'>Auto Join Desativado!</span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
                     API.djLeave();
                     API.off(API.WAIT_LIST_UPDATE, autojj);
              }
       }
       if (cmd[0] == "/autowoot" || cmd[0] == "/aw")
       {
              if (cmd[1] === "on")
              {
                     $("#chat-messages").append("<div class='system'><i class='icon icon-woot'></i><span class='text'>AutoWoot Ativado!</span></div>");
                     $("#woot").click();
                     API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
                     b && a.scrollTop(a[0].scrollHeight);
              }
              if (cmd[1] === "off")
              {
                     $("#chat-messages").append("<div class='system'><i class='icon icon-woot'></i><span class='text'>AutoWoot Desativado!</span></div>");
                     API.off(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
                     b && a.scrollTop(a[0].scrollHeight);
              }
       }
     
       if (cmd[0] == "/autojoin" || cmd[0] == "/aj")
       {
              if(cmd[1] == "off"){
                     API.djLeave();
                     API.off(API.WAIT_LIST_UPDATE, autojj);
                     API.chatLog("Auto Join desativado, você não entrará mais na lista de espera!");
              }
              if(cmd[1] == "on"){
                     API.djJoin();
                     API.on(API.WAIT_LIST_UPDATE, autojj);
                     API.chatLog("Auto Join ativado, você entrará na lista de espera automaticamente!");
              }
       }
       if (cmd[0] == "/atvideo")
       {
              $("#chat-messages").append("<div class='Blue system'><i class='icon icon-refresh-video'></i><span class='text'> Atualizando video...</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
              $('#refresh-button').click();
       }
       if (cmd[0] == "/video")
       {
              _$context.trigger("settings:show");
              $(".item.s-av").click();
              _$context.trigger("settings:hide");
       }

       if (cmd[0] == "/dancar")
       {
              _$context.trigger("settings:show");
              $(".item.s-dancing").click();
              _$context.trigger("settings:hide");
       }
       if (cmd[0] == "/u5")
       {
              var l = API.getHistory().slice(0, 5), i;
              $("#chat-messages").append("<div class='Orange system'></i><span class='text'>Ultimos 5 videos...</span></div>");
              for(i in l)
              {

                     $("#chat-messages").append("<div class='system'></i><span class='text'> " + (Number(i) + 1) + ". " + l[i].media.author + " - " + l[i].media.title + " </span></div>");
                     b && a.scrollTop(a[0].scrollHeight);
              }
       }
  
       if (cmd[0] == "/on"){
              API.chatLog("Disponivel");
              $.ajax({
                     type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["0"] }'
              }
              )
       }
       if (cmd[0] == "/aus"){
              API.chatLog("Ausente");
              $.ajax({
                     type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["1"] }'
              }
              )
       }
       if (cmd[0] == "/trab"){
              API.chatLog("Trabalhando");
              $.ajax({
                     type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["2"] }'
              }
              )
       }
       if (cmd[0] == "/jog"){
              API.chatLog("Jogando");
              $.ajax({
                     type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["3"] }'
              }
              )
       }
       if (cmd[0] == "/ina"){
              API.chatLog("Inativo");
              $.ajax({
                     type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["4"] }'
              }
              )
       }

       if (cmd[0] == "/set")
       {
              if (cmd[1] === "entrada")
              {
                     if (cmd[2] === "on")
                     {
                            $("#chat-messages").append("<div class='system'><i class='icon icon-settings'></i><span class='text'> Notificacoes de Entrou/Saiu ativadas </span></div>");
                            b && a.scrollTop(a[0].scrollHeight);
                            API.on(API.USER_JOIN, UserJoin);
                            API.on(API.USER_LEAVE, left);
                     }
                     if (cmd[2] === "off")
                     {
                            $("#chat-messages").append("<div class='system'><i class='icon icon-settings'></i><span class='text'> Notificacoes de Entrou/Saiu desativadas </span></div>");
                            b && a.scrollTop(a[0].scrollHeight);
                            API.off(API.USER_JOIN, UserJoin);
                            API.off(API.USER_LEAVE, left);
                     }
              }
              if (cmd[1] === "add")
              {
                     if (cmd[2] === "on")
                     {
                            $("#chat-messages").append("<div class='system'><i class='icon icon-settings'></i><span class='text'> Notificacoes de Add/Grab ativadas</span></div>");
                            b && a.scrollTop(a[0].scrollHeight);
                            API.on(API.CURATE_UPDATE, grabs);
                     }
                     if (cmd[2] === "off")
                     {
                            $("#chat-messages").append("<div class='system'><i class='icon icon-settings'></i><span class='text'> Notificacoes de Add/Grab desativadas </span></div>");
                            b && a.scrollTop(a[0].scrollHeight);
                            API.off(API.CURATE_UPDATE, grabs);
                     }
              }
       }
}

function autoRespond3(data) {
       if(Matt2.afkmsg == "on"){
              var ba = data.type == "mention" && API.getStaff[data.fromID] && API.getStaff[data.fromID] >= API.ROLE.BOUNCER, bb = data.message.indexOf('@') >0;
              if (data.type == "mention" && mentioned == false) {
                     if (API.getUser(data.fromID)) {
                            mentioned = true;
                            timer = setInterval("checkMentioned();", 10000);
                            if (API.getUser()) {
                                   API.sendChat("@" + data.from + " [AFK] " + MattAFK.respondeafk);
                            }
                     }
              }
       }
}
function checkMentioned() {
       if(timePassed >= timeToWait) {
              clearInterval(timer);
              mentioned = false;
              timePassed = 0;
       }
       else {
              timePassed = timePassed + 1000;
       }
}

MattAFK = {
       respondeafk: "Tente novamente mais tarde!",
}

API.djJoin();
function autojj()
{
       var waitingCount = API.getWaitList().length;
       if (waitingCount < 50)
       {
              API.djJoin();
       }
}

var wooting = true;
wootSong();
function DJ_ADVANCE_LISTENER(obj)
{
       wootSong();
}

function wootSong()
{
       if(wooting)
       {
              $("#woot").click();
       }
}

function UserJoin(user)
{
       if (API.hasPermission(user.id, API.ROLE.ADMIN))
       {
              $("#chat-messages").append("<div class='Blue system'><i class='icon icon-users'></i><span class='text'>Admin: " + user.username + " entrou na sala.</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
       }
       else
       if (API.hasPermission(user.id, API.ROLE.AMBASSADOR))
       {
              $("#chat-messages").append("<div class='Yellow system'><i class='icon icon-users'></i><span class='text'>Embaixador(a): " + user.username + " entrou na sala.</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
       }
       else
       if (API.hasPermission(user.id, API.ROLE.HOST))
       {
              $("#chat-messages").append("<div class='Purple system'><i class='icon icon-users'></i><span class='text'>Host: " + user.username + " entrou na sala.</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
       }
       else
       if(MattB.adm.indexOf(user.id) > -1)
       {
              $("#chat-messages").append("<div class='Orange system'><i class='icon icon-users'></i><span class='text'>*MBot*: " + user.username + " entrou na sala.</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
       }
       else
       if (API.getUser(user.id).permission > -1)
       {
              $("#chat-messages").append("<div class='Green system'><i class='icon icon-users'></i><span class='text'> " + user.username + " entrou na sala. [" + user.language + "]</span></div>");
              b && a.scrollTop(a[0].scrollHeight);
       }
}


function left(user)
{
       $("#chat-messages").append("<div class='Green system'><i class='icon icon-users'></i><span class='text'> " + user.username + " saiu da sala. Estava em: " + user.wlIndex + " na lista!</span></div>");
       b && a.scrollTop(a[0].scrollHeight);
}



function grabs(obj)
{
       var song3 = API.getMedia().author + '  -  ' + API.getMedia().title;
       $("#chat-messages").append("<div class='BlueViolet system'><i class='icon icon-curate'></i><span class='text'> " + obj.user.username + " adicionou o video: " + song3 + ". </span></div>");
       b && a.scrollTop(a[0].scrollHeight);
}

function haters()
{
       var users = API.getUsers();
       var usuarios = '';
 
       for(var i in users)
       {
              if (users[i].vote === -1)
              {
                     usuarios  += users[i].username + ', ';
              }
       }
       $("#chat-messages").append("<div class='system'><i class='icon icon-meh'></i><span class='text'> Usuarios que votaram Chato:<br/> "+usuarios+"</span></div>");
       b && a.scrollTop(a[0].scrollHeight);
}
