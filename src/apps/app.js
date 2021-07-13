const app = require('express')();
const http = require('http');
const fs = require('fs/promises');
const ejs = require('ejs');
const path = require('path');
const Stream = require('node-rtsp-stream');

// Motor de plantilla
app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views'));

app.get('/', (req, res) => {
	res.render('index', { titulo: 'inicio EJS' });
});

const cams = [
	{
		streamUrl: `rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1`,
		wsPort: 9999,
		nombre: 'camara',
	},
];

let streams = {};

app.get('/:streamUrl/strat', (req, res) => {
	try {
		const { streamUrl } = req.body;
		console.log('streamUrl');
		console.log(streamUrl);

		const cam = cams.find((cam) => cam.streamUrl == streamUrl);
		streams[`${streamUrl}`] = { ...cam, active: new Stream(cam) };

		const url = 'ws://localhost:' + cam.wsPort;

		res.status(200).json({ message: `camara ${cam.wsPort} encendida`, data: { url } });
	} catch (err) {
		res.status(400).json({ message: `error al encender la camara ${cam.wsPort}` });
	}
});

app.post('/:streamUrl/stop', (req, res) => {
	try {
		const { streamUrl } = req.body;

		const cam = cams.find((cam) => cam.streamUrl == streamUrl);
		const stream = new Stream(cam);
		stream.stop();

		res.status(200).json({ message: `camara ${cam.wsPort} apagada` });
	} catch (err) {
		res.status(400).json({ message: `error al apagar la camara ${cam.wsPort}` });
	}
});

// Settings
app.use(require('express').static(path.resolve('src/public')));
app.set('port', process.env.PORT || 5050);

// print process.argv
const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';

if (prod) {
	const options = {
		key: fs.readFileSync(
			'/etc/letsencrypt/live/api.node.devceres.cloud/privkey.pem',
			'utf8'
		),
		cert: fs.readFileSync(
			'/etc/letsencrypt/live/api.node.devceres.cloud/fullchain.pem',
			'utf8'
		),
	};

	https.createServer(options, app).listen(app.get('port'), () => {
		console.log(
			'                                                                  ()_()'
		);
		console.log(
			`app corriendo en el puerto http://localhost:${app.get(
				'port'
			)} leoM             (o.o)`
		);
		console.log(
			'                                                                  (|_|)*'
		);
	});
} else {
	app.listen(app.get('port'), () => {
		console.log(
			'                                                                  ()_()'
		);
		console.log(
			`app corriendo en el puerto http://localhost:${app.get(
				'port'
			)} leoM             (o.o)`
		);
		console.log(
			'                                                                  (|_|)*'
		);
	});
}
