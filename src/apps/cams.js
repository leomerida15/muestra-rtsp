// Modules
const express = require('express');
const Routes = require('../router');
const cors = require('cors');
const app = express();

//database

// middleware preRoutes
app.use(cors('*'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
Routes(app);

// Settings
app.set('port', process.env.PORT || 5051);

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
