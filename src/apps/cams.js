//A channel of camera stream
const Stream = require('node-rtsp-stream');

const cams = [
	{
		streamUrl: `rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1`,
		wsPort: 9999,
		nombre: 'camara',
	},
];

const streams = cams.map((cam) => new Stream(cam));

// streams[0].stop();

// streams.map((stream) => stream.stop());
