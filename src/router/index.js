const router = require('express').Router();
const { cams, streams, addstreamUrl } = require('../data');
const Stream = require('node-rtsp-stream');

router.post('/start', (req, res) => {
	try {
		const { streamUrl } = req.body;

		addstreamUrl(streamUrl);

		console.log('streamUrl');
		console.log(streamUrl);

		const cam = cams.find((cam) => cam.streamUrl == streamUrl);
		streams[`${streamUrl}`] = new Stream(cam);

		const url = 'ws://localhost:' + cam.wsPort;

		res.status(200).json({ message: `camara ${cam.wsPort} encendida`, info: { url } });
	} catch (err) {
		console.clear();
		console.log(err);
		res.status(400).json({ message: `error al encender la camara` });
	}
});

router.post('/stop', (req, res) => {
	try {
		const { streamUrl } = req.body;

		console.log('streamUrl');
		console.log(streamUrl);

		streams[`${streamUrl}`].stop();

		res.status(200).json({ message: `camara apagada` });
	} catch (err) {
		console.clear();
		console.log(err);
		res.status(400).json({ message: `error al apagar la camara` });
	}
});

module.exports = (app) => {
	app.use(router);
};
