const processMessage = require('../helpers/processMessage');
const API = require('../API/API.js');
var firedEvent;
function send(data)
			{
				if(data!=null)
					{
				processMessage.sendToFacebook(firedEvent.sender.id,constructWeatherMessage(data));
					}
				else{
					processMessage.sendParsedNlbMessage(firedEvent);
					}

			}

function constructWeatherMessage(data)
{
	var message="";
	if(data.weather.description!=undefined)
	message+="Weather short description:"+data.weather.description+"\n";
	if(data.weather.main!=undefined)
	message+="Weather main state:"+data.weather.main+"\n";
	message+="Temperature:"+(data.main.temp-273).toFixed(1)+"\n";
	message+="Humidity:"+data.main.humidity+"%"+"\n";
	message+="pressure:"+data.main.pressure+"\n";

	return message;
}
module.exports = (req, res) => {
 if (req.body.object === 'page') {
 req.body.entry.forEach(entry => {
 entry.messaging.forEach(event => {
 	firedEvent=event;
 if (event.message && event.message.text) {
 	var splittedString=event.message.text.split(" ");
 	var english = /^[A-Za-z]*$/
	 if(event.message.text.includes( "what is the weather in" ) && splittedString.length>=6 && english.test(splittedString[5]))
	 {
			var option={
				q: splittedString[5],
          		APPID: API.getAppId()
			}
			API.test(option,send);
     }
	 else if(event.message.text.includes("weather")||event.message.text.includes("Weather")||event.message.text.includes("WEATER"))
	 {
		processMessage.sendToFacebook(firedEvent.sender.id,"you have to enter your question about weather like this 'what is the weather in country ?'"); 
	 }
	 else
	 {
	 	processMessage.sendParsedNlbMessage(event);
	 }
		
 }
 else if(event.message.attachments)
	 {
	 	console.log("lat");
	 	var lat = null;
            var long = null;
            messageAttachments=event.message.attachments;
            if(messageAttachments[0].payload.coordinates)
            {
                lat = messageAttachments[0].payload.coordinates.lat;
                long = messageAttachments[0].payload.coordinates.long;
            }

            var msg = "lat : " + lat + " ,long : " + long + "\n";
             console.log(msg);
             var option={
             	lat:lat,
             	lon:long,
             	APPID: API.getAppId()
             };

           API.test(option,send);

	 }

 });
 });
res.status(200).end();
 }
};




