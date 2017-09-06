var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var cookieParser = require("cookie-parser");
var User = require("./models/user").User; /// exportamos nuestro modelo de user schema para la bd
//var ConnectRedisSessions = require( "connect-redis-sessions" );
var app = express()
var session = require("express-session"); /// importa el session de express  si se pondra falta el configure
//var RedisStore = require("connect-redis-sessions")(session); /// se le dice que lo manipulara redis
require('es6-shim');

var token = "EAAKz2t0egN0BALnwpnEaWzSX6A6TT66Dj265YipmQsrSu8rpXmCqdsP6cIzfetK3KYIsACAWe0FLMdaW74TzvoOie7s1bu7vMuFg56AdkfAX6YMdroeaMvpG5YxW0xoxXJFXLJmVoHqBBbwaroZADA1IYgBvQ1LlpWGPLtgZDZD"
  
var textGender= "NoSex" 
var newU = 0;     
var ReqNomb=false;
var If1= false;
var If2= false;
var Wtime = 1500;
var age= " ";    
var total = 0;
var num= 0;
var NoQuest=1; 
var nn;
app
    .use( express.query() )
    .use( cookieParser() )
    .use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    NoQuest: 1 ///donde ira?
 }))
  //  .use( ConnectRedisSessions( { app: "TdahBot" } ) )
  

const botBuilder = require('claudia-bot-builder');
const fbTemplate = botBuilder.fbTemplate;

app.set('port', (process.env.PORT || 5000))
/// https://hidden-peak-86868.herokuapp.com/
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('TDAH sample Bot')
    app.locals.NQ = 1;
})


// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === token) {  /// esto es del original
             res.send(req.query['hub.challenge'])  /// this    
              app.locals.NQ = 1;
                
    } /// this
    res.send('Error, wrong token') ///this
}) /// this

// Spin up server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
    app.locals.NQ = 1;
})

/// se crea la variable en la bd, se saca para leer su valor de aceurdo al sesion y despues de que se usa su valor se actualiza

// API End Point 

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    if (messaging_events == undefined)
        return 0;
    else    
        for (i = 0; i < messaging_events.length; i++) {
            event = req.body.entry[0].messaging[i]
            sender = event.sender.id
        //    const sessionId = findOrCreateSession(sender); //// sesion 
            if (event.message && event.message.text) {
                text = event.message.text /// NoQuest requiere in session? test it
                text = text.toLowerCase() ///Convierte a minusculas     
                console.log('Recibi: %s',text)
             //    console.log("El NoQuest vale " +app.locals.NQ+" para el SID " +req.sessionID)  

              NoQuest=app.locals.NQ;
               /// t Probar si se puede poner en un function para flujo de conversacion
                if ( text.includes("hola")   || text.includes("olis") || text.includes("que tal") || text.includes("que onda") || text.includes("hey") || text.includes("alo") || text.includes("hi") || text.includes("holi")|| text.includes("que pedo") || text.includes("olas") || text.includes("hello") ) {
   //                sendTextMessage(sender, text+", me llamo TdahBot,  \n Me da pena decirlo 😳 pero a veces me siento un poco inquieto o nervioso \n ")
//                   setTimeout(function(){
                             sendfstbuttons(sender,text+", me llamo TdahBot,  \n Me da pena decirlo 😳 pero a veces me siento un poco inquieto o nervioso \n Te has sentido asi? 😖 ")
  //                      }, 2000);
                  
                  //Me da pena decirlo 😳 pero a veces me siento un poco inquieto o nervioso \n Te has sentido asi? 😖 \n 
                }else if(text.includes("me ha pasado")){
                    sendTextMessage(sender,"Ay lo se es horrible 😩, incluso podriamos presentar sintomas de TDAH 😮 \n 🤔 sabes que es el TDAH? ")
                }else if (text.includes("prueba")){
                    SaveUser(sender,"88","dude",1,NoQuest)
                  
                    
                }else if(text.includes("limon")){
                   nn= FindNoQ(sender,"88","dude",1,NoQuest) +1 ;
                }else if(text.includes("ogt")){
                    sendTextMessage(sender," NoQuest: "+nn);
                }
                 else if(text.includes("casi no me pasa")){
                     sendTextMessage(sender,"Eso esta muy bien pero incluso podriamos presentar sintomas de TDAH 😮 \n 🤔 sabes que es el TDAH? ")
                }else if (text.includes("no") ){
                    sendTextMessage(sender, " 🙂🔍 El TDAH o Trastorno por Déficit de Atención e Hiperactividad es un trastorno neurobiológico de carácter crónico, sintomáticamente evolutivo y de probable transmisión genética \n 🙂🔍 Está caracterizado por una dificultad de mantener la atención voluntaria frente a actividades, tanto académicas como cotidianas y unido a la falta de control de impulsos. \n 🤔 Quedo claro?")
                }else if(text.includes("si")  ){

                   sendTextMessage(sender, " Perfecto 👍, me han creado para poder detectar estos sintomas, vamos a realizar un test ok?  \n Para iniciar, te voy a hacer unas preguntas \n Cual es tu sexo, hombre o mujer? 👫")
                }
                 else if(text.includes("hombre") || text.includes("mujer") ){
                   sendTextMessage(sender,"Que bien!, yo tambien, ok no 😅 la verdad es que no tengo sexo \n Cuantos años tienes?")
                    textGender = text;
                } else if(text.includes("puto")){
                    sendTextMessage(sender,"Puto el que lo lea")
                } else if(text.includes("achu")){
                    sendTextMessage(sender,"Salud")
                }else if(text.includes("gracias")){
                    sendTextMessage(sender,"Sabes que puedes contar conmigo 😉, estoy aqui para ayudar.")
                    url = "http://24.media.tumblr.com/tumblr_majp3gqXRK1qbu7fuo1_500.gif"
                    sendImageMessage(sender,url)
                }else if(text.includes("resultado")|| text.includes("calificacion")){
                     ShwResult(sender,total);
                }else if(parseInt(text) > 0){
                   sendTextMessage(sender,"Tienes casi lo mismo que yo, yo tengo 20siempre 😂 \n Bien, para iniciar el test solo escribe TEST ") 
                   //// guardamos datos 
                      age=text;
                     url = "http://68.media.tumblr.com/22519c79ea0298a83b5fa6a424ac8dc0/tumblr_mgnm6wg12F1qh59n0o1_500.gif"
                    sendImageMessage(sender,url)
                
                }else if(text.includes("ayuda")){
                    sendGenericMessage(sender)
                }else if(text.includes('test')){
                    TdahTest(sender,NoQuest)
                    
                }else if (text.includes('bmo')){
                      sendTextMessage(sender,"BMO? no se de quien me hablas, pero guardame ese secreto porfa.")
                      url = "https://media.tenor.com/images/4cd9169b5e6d7b598491c1600a6e5c72/tenor.gif"
                      sendImageMessage(sender,url)
                }else if (text.includes('mejor luego')){
                    sendTextMessage(sender,"Ok, no pasa nada")
                }
                else if(text.includes("nunca") || text.includes("rara vez") || text.includes("algunas veces") || text.includes("con frecuencia") || text.includes("muy frecuentemente")){
                        setTimeout(function(){
                            CountTotal(sender,text);
                        }, 1500);
                }else{
                    sendTextMessage(sender, text+"? Aun no soy tan listo, eso no lo entendi 😖😰")
                }  
            }/// ifff event.message
            if (event.postback) {
                text = JSON.stringify(event.postback)
                text = text.substring(12, 25)
                /// Aqui cuando se pase todo a una funcion aparte, aqui iria el recall a la funcion de decidir
                if (text.includes('mejor luego')){
                    sendTextMessage(sender,"Ok, no pasa nada")
                }
            }
        }
    res.sendStatus(200)
})




app.post('/hellotalk/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    if (messaging_events == undefined)
        return 0;
    else    
        for (i = 0; i < messaging_events.length; i++) {
            event = req.body.entry[0].messaging[i]
            sender = event.sender.id
            if (event.message && event.message.text) {
                text = event.message.text
                text = text.toLowerCase() ///Convierte a minusculas
                console.log('Recibi: %s',text)
                if(text === 'si' ){
                    sendTextMessage(sender, "Para iniciar, te voy a hacer unas preguntas")
                    sendTextMessage(sender, "Cual es tu sexo, hombre o mujer?")   
                    sendTextMessage(sender, "Perfecto, yo tambien se")
                 }else if( text == 'hola'){
                    sendTextMessage(sender, "Sabes que es un bot?")  
                 }else if (text === 'no'){
                    sendTextMessage(sender, "Un bot es un pedacito de Software que ayuda a realizar ciertas tareas como si fuera un asistente y entre mas listos seamos, mas cosas podemos hacer")
                    sendTextMessage(sender, "Quedo claro?") 
                } else if(text === 'hombre' || text === 'mujer' ){
                   sendTextMessage(sender,"Cuantos años tienes?") 
                   sendTextMessage(sender,"Que bien!, yo tambien, ok no 😅 la verdad es que no tengo sexo")
                   let textGender = text;
                } else if(parseInt(text) > 0){
                   sendTextMessage(sender,"Tienes casi lo mismo que yo, yo tengo 20siempre 😂") 
                   sendTextMessage(sender,"Bien, para iniciar el test solo escribe TEST ")
                   //// guardamos datos 
                   var User = new User({
                                        fb_id: sender, /// id de usu de fb
                                        sex: textGender,
                                        age: text,
                                        NoQuest: NoQuest
                   });
                    user.save(function(){  //////***********save */
                                        console.log("Saved User: "+ User.fb_id)
                                         });
                } else if(text === 'test'){
                    TdahTest(sender)
                }
                  else{
                    sendTextMessage(sender, text.substring(0, 200)+ " ? Aun no soy tan listo, eso no lo entendi 😖😰")
                }
            }//if
        }///for
})       

 

 // SESSIONS

const sessions = {};
const numbs = {};

/*
const findOrCreateSession = (sender) => {

  let sessionId;
  var k1=0;
  // Let's see if we already have a session for the user sender
  Object.keys(sessions).forEach(k => {
    if (sessions[k].sender === sender) {
      // Yep, got it!
      sessionId = k;
      numbs[k]= num;
      num= num++;
      k1=1;
      console.log("Se inicio session "+sessionId)
    }
  });
  if (!sessionId) {
    // No session found for user sender, let's create a new one
    sessionId = new Date().toISOString() +" "+ sender;
    sessions[sessionId] = {sender: sender, context: {}};
    NoQuest = 1 ; 
      numbs[k1]= num;
      num= num++;
    console.log("Se creo session")
  }
  return sessionId;
};
*/
// end SESSIONS

function CountTotal(sender,text){
    //sendTextMessage(sender,"Total: "+total)
        newU = newU +1;
        if(text.includes("nunca")){
              setTimeout(function(){
                            TdahTest(sender,NoQuest)
                        }, Wtime);
            
         
        }
        else if(text.includes("rara vez")){
            setTimeout(function(){
                          TdahTest(sender,NoQuest)
                        }, Wtime);
           
          
        }
        else if(text.includes("algunas veces") &&  newU >= 4){ /// test porque se come 1
            total=total+0;
            setTimeout(function(){
                          TdahTest(sender,NoQuest)
                        }, Wtime);
           
          
        }
        else if(text.includes("algunas veces")) {
            total=total+1;
            setTimeout(function(){
                            TdahTest(sender,NoQuest)
                        }, Wtime);
            
            
        }

        else if(text.includes("con frecuencia")) {
            total=total+1;
            setTimeout(function(){
                           TdahTest(sender,NoQuest)
                        }, Wtime);
           
            
        }
        else if(text.includes("muy frecuentemente")) {
            total=total+1;
            setTimeout(function(){
                          TdahTest(sender,NoQuest)
                        }, Wtime);
            
           
        }
        else {
            sendTextMessage(sender,"Oops algo salio mal con el test, intentalo despues")
        }
    }
           ///sino solo poner el set cuando se llame a ttest y agregar al if    


function SaveUser(sender,text,textGender,total, NoQuest){
       var user = new User({fb_id: sender,
                            sex: textGender,
                            age: text,
                            resultado: total,
                            NoQuest: NoQuest

                            }); // creamos usuario con los datos que obtenemos del post
         total=0; 
         newU=1;
  user.save(function(){  //////***********save */
    console.log("Tengo el fb_id "+user.fb_id+" NoQuest: "+ user.NoQuest); 
 
  });

}

function UpdateNoq(sender,text,textGender,total,NoQuest){
   console.log("ENTRE AL UPDATE")
    var user = new User({fb_id: sender,
                            sex: textGender,
                            age: text,
                            resultado: total,
                            NoQuest: NoQuest
                        }); 
    user.save(function(){
        console.log("fb_id "+user.fb_id+" update NoQuest"+ user.NoQuest);
    })                    
}

function FindNoQ(sender,text,textGender,total,NoQuest){

    User.find({"fb_id":sender},function(err, user1){
        if(err)
            console.log(err)
        else{
            console.log("Encontre el json"+JSON.stringify(user1))
        /// tomar el dato NoQ y retornarlo
          //  var jscont = JSON.parse(JSON.stringify(user1));
            console.log(typeof user1)
            var nn= user1.NoQuest;
            console.log("nn: "+nn+" nn2: "+parseInt(nn)+ " \n nn3: "+JSON.parse(JSON.stringify(user1)))
            return parseInt(nn);
        }    
        
    })
}

function sendTextMessage(sender, text) {
    messageData = {
      //// en el recipient abajo de [id] va el "sender_action":"typing_on"
        "text":text
    }
    sendRequest(sender, messageData)
}

function sendButtonMessage(sender, text){
    let messageData= {
             "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":text,
                "buttons":[
                {
                    "type":"postback",
                    "title":"Nunca",
                    "payload":"Ya veo"
                },
                {
                    "type":"postback",
                    "title":"Algunas veces",
                    "payload":"Vaya vaya"
                },
                {
                    "type":"postback",
                    "title":"Siempre",
                    "payload":"Perfecto"
                }
                ]
            }
            }
    }///messagedata
    sendRequest(sender, messageData)
}

 
                    
            

function sendfstbuttons(senderID, text){
    console.log("entre a quick reply")
    let messageData= {
	"recipient": {
			"id": senderID
		},
		"message": {
			"text": text,
			"quick_replies": [
					{
						"content_type":"text",
						"title":"Me ha pasado",
						"payload":"ayuda",
						 "image_url":"http://pix.iemoji.com/images/emoji/apple/ios-9/256/persevering-face.png"
					},
					{
						"content_type":"text",
						"title":"Casi no me pasa",
						"payload":"ayuda",
						 "image_url":"http://pix.iemoji.com/images/emoji/apple/ios-9/256/thinking-face.png"
					}										
			]
		}
    }///Messagedata
    sendRequestQuick(messageData)
}/// quickreply

function ShwResult(sender,total){
    sendTextMessage(sender,"Te recordamos que la informacion que nos proporcionaste es totalmente confidencial ")
    if(total<4){
        sendTextMessage(sender,"Obtuviste "+total+" Todo parace ir normal, no presentas sintomas de TDAH, cuando gustes puedes tomar el test de nuevo escribiendo TEST")

    }else{
        sendTextMessage(sender,"Obtuviste "+total+" de 6, esto no es un diagnostico pero probablemente presentas sintomas de TDAH \n si gustas puedes tomar de nuevo el test cuando gustes, solo escribe TEST \n si te interesa obtener ayuda puedes preguntarme")
       
    }
    

}

function waitSender(sender){
 messageData= {
  	"recipient": {
			"id": senderID
		},
  "sender_action":"typing_on"
    }
   sendRequestQuick(messageData)
}

function sendQuickReply(senderID, text){
    console.log("entre a quick reply")
    let messageData= {
	"recipient": {
			"id": senderID
		},
		"message": {
			"text": text,
			"quick_replies": [
					{
						"content_type":"text",
						"title":"Nunca",
						"payload":"ayuda",
						// "image_url":"https://s-media-cache-ak0.pinimg.com/736x/cb/06/cf/cb06cfc39ac3d3c2774433694f47660e.jpg"
					},
					{
						"content_type":"text",
						"title":"Rara Vez",
						"payload":"ayuda",
						 //"image_url":"https://s-media-cache-ak0.pinimg.com/736x/7d/df/b1/7ddfb13e8e1f1c28693d0cbb34ecf586--happy-faces-emojis.jpg"
					},
					{
						"content_type":"text",
						"title":"Algunas Veces",
						"payload":"ayuda",
						 //"image_url":"https://s-media-cache-ak0.pinimg.com/736x/3d/82/cf/3d82cfa926bfd2a70843d177c67c4b00--kiss-emoji-the-emoji.jpg",
						
					},
					{
						"content_type":"text",
						"title":"Con Frecuencia",
						"payload":"ayuda",
						 //"image_url":"https://s-media-cache-ak0.pinimg.com/originals/cc/6a/92/cc6a920bdc9893ef5ade08f018d73d66.png"
					},
					{
						"content_type":"text",
						"title":"Muy Frecuentemente",
						"payload":"ayuda",
						 //"image_url":"https://cdn.shopify.com/s/files/1/1061/1924/files/Woman_Saying_Yes_Emoji_42x42.png?6223256659691880029"
					}										
			]
		}
    }///Messagedata
    sendRequestQuick(messageData)
}/// quickreply

function sendRequest(sender, messageData){  /// Metodo que envia los msj
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function  sendRequestQuick(messageData){
	///api facebook, uri and more info can be checked on docu of fb apis
        console.log("entre desde quick reply")
		request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token}, // la api necesita el token con el cual acceder y esta en esa var
		method: 'POST', /// vamos a mandar algo POST oseaos como json y es la var mese respuesta
		json: messageData /// lo mandamssageData de arribita	
		}, function(error, response, data){
				if(error)
					console.error("Fallo Send API", response.statusCode, response.statusMessage, data.error);
				else if (response.statusCode = 200)
					console.log('Envie %s', JSON.stringify(messageData));
					console.log(JSON.stringify(response));
				})
}


function sendImageMessage(sender, ImgUrl){  /// se puede poner como parametro imageURL para tener varias
    let messageData= {
            "attachment":{
            "type":"image",
            "payload":{
                "url": ImgUrl
                }   
            }
        } /// mssgdata
        sendRequest(sender, messageData)
    }


///function to generate the test using the buttons

function TdahTest(sender,NoQuest,req){
    console.log("Es la pregunta:  "+ NoQuest)
    console.log("Probando locals: "+ app.locals.NQ)
    switch(NoQuest){

        case 1: {
          
            
            text="¿Con qué frecuencia tienes dificultad para acabar los detalles finales de un proyecto, cuando ya acabaste con las partes difíciles? " + NoQuest;
            NoQuest = NoQuest+1;
            app.locals.NQ=NoQuest;
            var url = "https://media.tenor.com/images/046c5cfdfb264975a4ed2bb10f71d778/tenor.gif"
               
            sendQuickReply(sender,text)
          //  sendImageMessage(sender,url)
            break;
        }

        case 2: {

            text="¿Con qué frecuencia tienes dificultad para ordenar las cosas cuando estás realizando una tarea que requiere organización?" + NoQuest;
             NoQuest = NoQuest+1;
              app.locals.NQ=NoQuest;
            sendQuickReply(sender,text)
            // sendImageMessage(sender)
                   // continue
                   break;
         }

        case 3: {
            
            text="¿Con qué frecuencia tienes problemas para recordar citas u obligaciones?"+ NoQuest;
               NoQuest = NoQuest+1;
                app.locals.NQ=NoQuest;
            var url = "https://media.tenor.com/images/3bb812af3f9726ad44ac48327ea0bb34/tenor.gif"
            sendQuickReply(sender,text)
          //  sendImageMessage(sender, url)
                   // continue 
                   break;
        }

        case 4: {
            
            text="Cuando tienes que realizar una tarea que requiere pensar mucho, \n ¿con qué frecuencia evitas o retrasas empezarla?"+ NoQuest;
               NoQuest = NoQuest+1;
                app.locals.NQ=NoQuest;
            sendQuickReply(sender,text)
           // sendImageMessage(sender)
                   // continue
                   break;
        }

        case 5: {
        
            text="¿Con qué frecuencia mueves o retuerces las manos (dedos) o los pies cuando tienes que estar sentado por mucho tiempo?"+ NoQuest;
              NoQuest = NoQuest+1;
               app.locals.NQ=NoQuest;
            var url = "https://media.tenor.com/images/cad4b28d7f5e2c599679e3cc612b9e95/tenor.gif"
            sendQuickReply(sender,text)
          //  sendImageMessage(sender, url)
                   // continue
                   break;
        }

        case 6: {
            text="¿Con qué frecuencia te sientes demasiado activo e impulsado a hacer cosas, como si te empujara un motor?"+ NoQuest;
               NoQuest = NoQuest+1;
                app.locals.NQ=NoQuest;
           // var url= "http://www.speakgif.com/wp-content/uploads/2015/09/thanks.gif"
           sendQuickReply(sender,text)
            //sendImageMessage(sender)
                   // continue
                   break;
        }     

        case 7: {
                    NoQuest = NoQuest+1;
                     app.locals.NQ=NoQuest;
                var url= "https://media.tenor.com/images/2386d12e54aa11ce0298d100954d982a/tenor.gif"
                sendImageMessage(sender,url)
                sendTextMessage(sender, "Bien, ya terminamos, pideme tus resultados cuando quieras \n Para volver a tomar el test solo escribe TEST "+ NoQuest)
                //sendButtonMessage(sender,text)
                SaveUser(sender,age,textGender,total); ///guardamos al usu con sus respuestas
                break;
            }
        default: {
               NoQuest =1;
              //  app.locals.NQ=NoQuest;
            break;
        }                    
                  
    }/// fin case

     
    
}

/// end of TdahTest




// Send an test message back as cards.

function sendGenericMessage(sender) {
    messageData = {
        "recipient":{
    "id":sender
    },
    "message":{
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"generic",
                "elements":
                [
                        {
                            "title":"Controla tu TDAH",
                            "image_url":"http://www.tdahytu.es/wp-content/uploads/2016/10/Logo-TDAH-y-Tu-web.png",
                            "subtitle":"Consejos y mas para controlar el TDAH en adultos",
                            "default_action": {
                            "type": "web_url",
                            "url": "http://www.tdahytu.es/consejos-para-adultos-con-tdah/",
                            "webview_height_ratio": "tall",
                            },
                            "buttons":[
                            {
                                "type":"web_url",
                                "url":"http://www.tdahytu.es/consejos-para-adultos-con-tdah/",
                                "title":"Entra a la pagina web"
                            },{
                                "type":"postback",
                                "title":"Mejor luego",
                                "payload":"Mejor luego"
                            }              
                            ]      
                        }, 
                        {
                            "title":"Visita la DAU",
                            "image_url":"https://scontent.fpbc1-1.fna.fbcdn.net/v/t1.0-9/14469694_1833335150233187_2548142393710787758_n.jpg?oh=0b3e860b8b21f06b38bf3d6d4748004c&oe=59DA8D2A",
                            "subtitle":"Consigue atencion personal acudiendo a DAU",
                            "default_action": {
                            "type": "web_url",
                            "url": "https://www.facebook.com/dau.acompanamiento.buap/",
                            "webview_height_ratio": "tall",
                            },
                            "buttons":[
                            {
                                "type":"web_url",
                                "url":"https://www.facebook.com/dau.acompanamiento.buap/",
                                "title":"Entra a la pagina"
                            },{
                                "type":"postback",
                                "title":"Mejor luego",
                                "payload":"Mejor luego"
                              }              
                            ]      
                        },
                         {
                            "title":"Ve el videos de gatitos",
                            "image_url":"http://mycatsarefamily.com/wp-content/uploads/2013/11/The_Cutest_Cat_Ever.png",
                            "subtitle":"Ver videos de gatitos siempre es bueno.",
                            "default_action": {
                            "type": "web_url",
                            "url": "https://www.youtube.com/watch?v=tntOCGkgt98",
                            "webview_height_ratio": "tall",
                            },
                            "buttons":[
                            {
                                "type":"web_url",
                                "url":"https://www.youtube.com/watch?v=tntOCGkgt98",
                                "title":"Ver el video"
                            },{
                                "type":"postback",
                                "title":"Mejor luego",
                                "payload":"Mejor luego"
                            }              
                            ]      
                         } 
                ]
            }
        }
  }
    }
     sendRequestQuick(messageData)
} 

