import pino from "pino";
import axios from "axios";
const logger = pino({
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  formatters: {
    level: (level) => ({
      level: level.toUpperCase(),
    }),
  },
});

const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

// bad
logger.info(
  "When the first parameter is string",
  "Second and all parameters are ignored!"
);
// {
//   "level":"INFO",
//   "time":"2025-02-09T18:39:01.002Z",
//   "pid":2213,
//   "hostname":"6nfdgn",
//   "msg":"String error"
// }
// ok
logger.info("It's work!");
// {
// 	"level":"INFO",
// 	"time":"2025-02-09T18:48:55.587Z",
// 	"pid":5794,
// 	"hostname":"6nfdgn",
// 	"msg":"It's work!"
// }

// ok
logger.info(
  obj,
  "When the first parameter its not any string, the second parameter it`s required a string"
);
// {
// 	"level":"INFO",
// 	"time":"2025-02-09T18:50:47.143Z",
// 	"pid":6285,
// 	"hostname":"6nfdgn",
// 	"a":1,
// 	"b":{
// 		"c":2
// 	},
// 	"msg":"When the first parameter itsnt an string, the second parameter it`s required a string"
// }

// bad
logger.error("This is bad to show error", new Error("MANUAL ERROR"));
// {
// 	"level":"ERROR",
// 	"time":"2025-02-09T18:53:38.880Z",
// 	"pid":7391,
// 	"hostname":"6nfdgn",
// 	"msg":"This is bad to show error"
// }

// OK
logger.error(
  new Error("MANUAL ERROR"),
  "When the first parameter is an Error, the second parameter its required a string"
);
// {
// 	"level":"ERROR",
// 	"time":"2025-02-09T18:54:52.760Z",
// 	"pid":7705,
// 	"hostname":"6nfdgn",
// 	"err":{
// 		"type":"Error",
// 		"message":"MANUAL ERROR",
// 		"stack":"Error: MANUAL ERROR\n    at Object.<anonymous> (/project/workspace/index.js:43:3)\n    at Module._compile (node:internal/modules/cjs/loader:1369:14)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1427:10)\n    at Module.load (node:internal/modules/cjs/loader:1206:32)\n    at Module._load (node:internal/modules/cjs/loader:1022:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)\n    at node:internal/main/run_main_module:28:49"
// 	},
// 	"msg":"When the first parameter is an Error, the second parameter its required a string"
// }

// bad
logger.error(
  {
    data: {
      err: new Error("ERROR GENERIC"),
      input: {
        name: "lukete",
        age: "31",
      },
    },
  },
  "Other format to show error logger"
);
// {
// 	"level":"ERROR",
// 	"time":"2025-02-09T19:03:46.434Z",
// 	"pid":10443,
// 	"hostname":"6nfdgn",
// 	"data":{
// 		"err":{

// 		},
// 		"input":{
// 			"name":"lukete",
// 			"age":"31"
// 		}
// 	},
// 	"msg":"Other format to show error logger"
// }

// ok
logger.error(
  {
    err: new Error("ERROR GENERIC"),
    input: {
      name: "lukete",
      age: "31",
    },
  },
  "Other format to show error logger"
);
// {
// 	"level":"ERROR",
// 	"time":"2025-02-09T19:01:48.520Z",
// 	"pid":9796,
// 	"hostname":"6nfdgn",
// 	"err":{
// 		"type":"Error",
// 		"message":"ERROR GENERIC",
// 		"stack":"Error: ERROR GENERIC\n    at Object.<anonymous> (/project/workspace/index.js:89:10)\n    at Module._compile (node:internal/modules/cjs/loader:1369:14)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1427:10)\n    at Module.load (node:internal/modules/cjs/loader:1206:32)\n    at Module._load (node:internal/modules/cjs/loader:1022:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)\n    at node:internal/main/run_main_module:28:49"
// 	},
// 	"input":{
// 		"name":"lukete",
// 		"age":"31"
// 	},
// 	"msg":"Other format to show error logger"
// }
