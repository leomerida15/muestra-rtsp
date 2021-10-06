const router = require('express').Router();
// @ts-expect-error
import Stream from 'node-rtsp-stream';
import { Request, Response, Application } from 'express';
import { Api } from '../interface';

const db: any = {};

const ffmpegOptions: any = { '-r': 30 };

router.post('/start/:wsPort', (req: Request<Api.id, Api.Resp, Api.body>, res: Response<Api.Resp>): void => {
	try {
		const { streamUrl } = req.body;
		console.log('streamUrl', streamUrl);

		const wsPort: number = parseInt(`${req.params.wsPort}`);
		console.log('wsPort', wsPort);

		const valid = Object.keys(db).includes(`${wsPort}`);
		if (valid) throw { message: `el puerto ${wsPort} ya esta ocupado`, info: { url: 'ws://localhost:' + wsPort } };

		const cam: any = new Stream({ streamUrl, wsPort, ffmpegOptions });
		console.log('cam', cam);

		db[wsPort] = { streamUrl, wsPort, ffmpegOptions, cam };
		console.log('db', db);

		const url: string = 'ws://localhost:' + cam.wsPort;

		setTimeout(() => res.status(200).json({ message: `camara ${cam.wsPort} encendida`, info: { url } }), 30000);
	} catch (err: any) {
		console.log('err', err);

		res.status(400).json(err);
	}
});

router.delete('/stop/:wsPort', (req: Request<Api.id, Api.Resp>, res: Response<Api.Resp>): void => {
	try {
		const wsPort: number = parseInt(`${req.params.wsPort}`);

		const valid = Object.keys(db).length;
		if (!valid) throw { message: `el puerto ${wsPort} no esta ocupado` };

		db[wsPort].cam.stop();

		delete db[wsPort];

		console.clear();

		console.log('db', db);

		res.status(200).json({ message: `camara ${wsPort} a sido apagada encendida` });
	} catch (err: any) {
		console.log('err', err);

		res.status(400).json(err);
	}
});

router.get('/wsPorts', (req: Request<Api.id, Api.Resp, Api.body>, res: Response<Api.Resp>): void => {
	try {
		const wsPorts: number[] = Object.keys(db).map((key: any) => key);

		res.status(200).json({ message: `camara apagada`, info: { wsPorts } });
	} catch (err) {
		console.clear();
		console.log(err);
		res.status(400).json({ message: `error al apagar la camara` });
	}
});

export default (app: Application) => {
	app.use(router);
};
