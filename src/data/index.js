const cams = [
	{
		streamUrl: `rtsp://admin:NutrAdm_20.20@190.54.179.123:8082/cam/realmonitor?channel=1>&subtype=1`,
		wsPort: 9999,
		nombre: 'camara',
	},
];

let streams = {};

const addstreamUrl = (streamUrl) => {
	const urls = cams.map((cam) => cam.streamUrl);

	if (!urls.includes(streamUrl)) {
		cams.push({
			streamUrl,
			wsPort: cams[cams.length].wsPort++,
			nombre: 'camara ' + cams.length,
		});
	}
};

module.exports = { cams, streams, addstreamUrl };
