//Camera Authentication
var ip_address = '190.54.179.123';
//camera username and password
var username = 'admin';
var password = 'NutrAdm_20.20';
// rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1
//A channel of camera stream
const Stream = require('node-rtsp-stream');

const cams = [
	{
		streamUrl:
			'rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1',
		wsPort: 9999,
	},
];

const stream = cams.map((cam) => new Stream(cam));
