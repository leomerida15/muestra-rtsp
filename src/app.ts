import app from './apps/app';
import app2 from './apps/cams';

app.listen(app.get('port'), () => {
	console.log('                                                                  ()_()');
	console.log(`app corriendo en el puerto http://localhost:${app.get('port')} leoM             (o.o)`);
	console.log('                                                                  (|_|)*');
});

app.listen(app2.get('port'), () => {
	console.log('                                                                  ()_()');
	console.log(`app corriendo en el puerto http://localhost:${app2.get('port')} leoM             (o.o)`);
	console.log('                                                                  (|_|)*');
});
