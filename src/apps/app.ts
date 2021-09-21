import express, { Application, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

// @ts-expect-error
import Stream from 'node-rtsp-stream';

const app: Application = express();

// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views'));

app.get('/', (req: Request, res: Response) => {
	res.render('index', { titulo: 'inicio EJS' });
});

const cams = [
	{
		streamUrl: `rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1`,
		wsPort: 9999,
		nombre: 'camara',
	},
];

let streams: any = {};

app.get('/:streamUrl/strat', (req, res) => {
	try {
		const { streamUrl } = req.body;
		console.log('streamUrl');
		console.log(streamUrl);

		const cam: any = cams.find((cam) => cam.streamUrl == streamUrl);
		if (!cam) streams[`${streamUrl}`] = { ...cam, active: new Stream(cam) };

		const url = 'ws://localhost:' + cam.wsPort;

		res.status(200).json({ message: `camara ${cam.wsPort} encendida`, data: { url } });
	} catch (err) {
		res.status(400).json({ message: `error al encender la camara ` });
	}
});

app.post('/:streamUrl/stop', (req, res) => {
	try {
		const { streamUrl } = req.body;

		const cam: any = cams.find((cam) => cam.streamUrl == streamUrl);
		const stream = new Stream(cam);
		stream.stop();

		res.status(200).json({ message: `camara ${cam.wsPort} apagada` });
	} catch (err) {
		res.status(400).json({ message: `error al apagar la camara ` });
	}
});

// Settings
app.use(require('express').static(path.resolve('src/public')));
app.set('port', process.env.PORT || 5050);

// print process.argv
const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';

app.listen(app.get('port'), () => {
	console.log('                                                                  ()_()');
	console.log(`app corriendo en el puerto http://localhost:${app.get('port')} leoM             (o.o)`);
	console.log('                                                                  (|_|)*');
});
