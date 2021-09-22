(() => {
	try {
		const start = async () => {
			try {
				const streamUrl = document.querySelector('#streamUrl').value;
				// const streamUrl = `rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1`;

				const resp = await axios.post('http://localhost:5051/start/' + 9999, { streamUrl });

				const canvas = document.getElementById(`chanel1`);

				const websocket = new WebSocket(resp.data.info.url);

				console.log(websocket);

				new jsmpeg(websocket, { canvas, autoplay: true, loop: true });
			} catch (err) {
				console.log(err.response.data.message);
			}
		};

		document.querySelector('button#start').addEventListener('click', start);

		const stop = async () => {
			try {
				const streamUrl = `rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1`;
				const body = { streamUrl };

				const resp = await axios.post('http://localhost:5051/stop', body);

				const conten = document.getElementById(`conten-canvas`);

				conten.innerHTML =
					/* html */
					`<canvas id="chanel1" width="auto" height="auto"></canvas>`;
			} catch (err) {
				console.error(err);
			}
		};

		document.querySelector('button#stop').addEventListener('click', stop);
	} catch (err) {
		console.error(err);
	}
})();
