const router = require('express').Router();
import { cams, streams, addstreamUrl } from '../data';
// @ts-expect-error
import Stream from 'node-rtsp-stream';
import { Request, Response, Application } from 'express';

router.post('/start', (req: Request, res: Response) => {
	try {
		const { streamUrl } = req.body;

		addstreamUrl(streamUrl);

		console.log('streamUrl');
		console.log(streamUrl);

		const cam: any = cams.find((cam) => cam.streamUrl == streamUrl);
		streams[`${streamUrl}`] = new Stream(cam);

		const url = 'ws://localhost:' + cam.wsPort;

		res.status(200).json({ message: `camara ${cam.wsPort} encendida`, info: { url } });
	} catch (err) {
		console.clear();
		console.log(err);
		res.status(400).json({ message: `error al encender la camara` });
	}
});

router.post('/stop', (req: Request, res: Response) => {
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

export default (app: Application) => {
	app.use(router);
};
