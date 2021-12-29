//Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_alex_buendia_pwa';

//archivos para la cache de la aplicación
var urlsToCache = [
	'./',
	'./css/styles.css',
	'./img/favicon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/favicon-1024.png',
	'./img/favicon-512.png',
	'./img/favicon-384.png',
	'./img/favicon-256.png',
	'./img/favicon-192.png',
	'./img/favicon-128.png',
	'./img/favicon-96.png',
	'./img/favicon-64.png',
	'./img/favicon-32.png',
	'./img/favicon-16.png'
];

//Eventos del service worker
//Evento install  .then( regresa una promesa ) 
//self es la variable del service worker
// instalación del service worker y guardar en cache los recursos estaticos a la cache
self.addEventListener('install',e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(urlsToCache)
					.then(() => {
						self.skipWaiting();
					});
					
			})
			.catch(err => console.log('No se ha registrado el cache', err))
		);
});


//Evento activate
//Que la app funciones sin conexión 
self.addEventListener('activate', e => {

	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(

		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1) {
							//Borrar los elementos que no se necesitan
							return caches.delete(cacheName);
						}
					})
				);
			})
			.then(() => {
				//activa la cache en el dispositivo
				self.clients.claim();
			})

		);
});

//Evento fetch

self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
			.then(res => {
				if(res){
					//devuelvo datos desde la cache
					return res;
				} 

				return fetch(e.request);
			})
		);
});