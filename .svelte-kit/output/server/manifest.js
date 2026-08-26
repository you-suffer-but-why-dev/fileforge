export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.Dmb6Ig5D.js",app:"_app/immutable/entry/app.FNm261hB.js",imports:["_app/immutable/entry/start.Dmb6Ig5D.js","_app/immutable/chunks/DKrHqI3f.js","_app/immutable/chunks/BfUdIRTo.js","_app/immutable/chunks/y2-jam33.js","_app/immutable/entry/app.FNm261hB.js","_app/immutable/chunks/CaLvqlWL.js","_app/immutable/chunks/DKrHqI3f.js","_app/immutable/chunks/BJZ7K6pq.js","_app/immutable/chunks/htZNzMS5.js","_app/immutable/chunks/y2-jam33.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
