const API_AI_TOKEN ='1f117928905e44999b05d2b0ae41b965';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAACkmNB2MUABAJPBOKpmCpFw6pabyjHfUrwZClx2z1kn1g8lZC2qQGEvhZBqHq5Tzp3twD9ZBCMdRS6ZAlZBGelVAyKZBZB5oQ92inB28l0t9V18ulnn8hMjvpgGtVOjlFGCZAFC7BSPEdlFXCr1eEMxHoMBABuKPWBSLeuZA62b43RgZDZD';
const request = require('request');
var sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: "POST",
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};

module.exports={
sendToFacebook:function (senderId, text)
{
	console.log("exported");
	request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: "POST",
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
},
sendParsedNlbMessage:function(event)
{
	const senderId = event.sender.id;
 const message = event.message.text;
 console.log(message);
 console.log("message");
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => sendTextMessage(senderId, "may be in the future i will be able to reply to this type of messages"));
 apiaiSession.end();
}

}

/*module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
 console.log(message);
 console.log("message");
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};*/