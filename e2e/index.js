// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../worker/worker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onmessage = void 0;
var Canvas, ctx, degreesNew;

var onmessage = function onmessage(ev) {
  console.log(ev);

  switch (ev.data.type) {
    case 'create':
      return create(ev.data, function () {
        //@ts-ignore
        postMessage({
          type: ev.data.type
        });
      });

    case 'update':
      var _degreesNew = action(ev.data.data, Canvas, 30);

      if (_degreesNew === degreesCurrent) return;
      degreesCurrent = _degreesNew;
      create({
        degrees: _degreesNew
      }, function () {
        //@ts-ignore
        postMessage({
          type: ev.data.type
        });
      });
  }

  function action(e, canvas, lineWidth) {
    var r = Math.sqrt(Math.pow(e.offsetX - canvas.width / 2, 2) + Math.pow(e.offsetY - canvas.width / 2, 2));
    if (r > canvas.width / 2 - lineWidth + lineWidth / 2 || r < canvas.width / 2 - lineWidth - lineWidth / 2) return;
    var quadrant = e.offsetY > 150 ? 180 : 0;
    if (e.offsetX < 150 && quadrant === 0) quadrant = 360;
    var angle = Math.ceil(Math.atan((e.offsetX - canvas.width / 2) / (e.offsetY - canvas.width / 2)) * 180 / Math.PI);
    return Math.abs(quadrant - Math.abs(Math.ceil(angle)));
  }

  function create(data, cb) {
    var canvas = data.canvas,
        _data$color = data.color,
        color = _data$color === void 0 ? 'limegreen' : _data$color,
        _data$bgColor = data.bgColor,
        bgColor = _data$bgColor === void 0 ? '#222' : _data$bgColor,
        _data$lineWidth = data.lineWidth,
        lineWidth = _data$lineWidth === void 0 ? 30 : _data$lineWidth,
        _data$fontSize = data.fontSize,
        fontSize = _data$fontSize === void 0 ? '50px' : _data$fontSize,
        _data$font = data.font,
        font = _data$font === void 0 ? 'arial' : _data$font,
        _data$units = data.units,
        units = _data$units === void 0 ? '' : _data$units,
        _data$degrees = data.degrees,
        degrees = _data$degrees === void 0 ? 0 : _data$degrees,
        _data$divisor = data.divisor,
        divisor = _data$divisor === void 0 ? 1 : _data$divisor; // shallow copy object
    // const canvas = new OffscreenCanvas(canvas.width,canvas.height),

    if (!Canvas) Canvas = canvas;
    if (!ctx) ctx = canvas.getContext('2d'); //Clear the canvas everytime a chart is drawn

    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    var text = ''; //Background 360 degree arc

    ctx.beginPath();
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = lineWidth;
    ctx.arc(Canvas.width / 2, Canvas.height / 2, Canvas.width / 2 - lineWidth, 0, Math.PI * 2, false); //you can see the arc now

    ctx.stroke(); //gauge will be a simple arc
    //Angle in radians = angle in degrees * PI / 180

    var radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth; //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
    //the arc will start from the topmost end

    ctx.arc(Canvas.width / 2, Canvas.height / 2, Canvas.width / 2 - lineWidth, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false); //you can see the arc now

    ctx.stroke(); //Lets add the text

    ctx.fillStyle = color;
    ctx.font = "".concat(fontSize, " ").concat(font);
    text = Math.ceil(degrees / 360 * divisor) + units; //Lets center the text
    //deducting half of text width from position x

    var text_width = ctx.measureText(text).width; //adding manual value to position y since the height of the text cannot
    //be measured easily. There are hacks but we will keep it manual for now.

    ctx.fillText(text, Canvas.width / 2 - text_width / 2, Canvas.height / 2 + 15);
    cb();
  }
};

exports.onmessage = onmessage;
},{}],"events.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports["default"] = [{
  name: 'onmouseup'
}, {
  name: 'onmousedown'
}, {
  name: 'onmousemove'
}];
},{}],"draw.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true; //@ts-ignore

var worker_1 = require("../worker/worker");

var events_1 = __importDefault(require("./events"));

function draw(container, degrees, cb) {
  if (degrees === void 0) {
    degrees = 0;
  }

  var blob, worker;
  console.log('var ctx \n' + worker_1.onmessage); //@ts-ignore

  blob = new Blob([('var ctx,  Canvas, degreesCurrent\n' + worker_1.onmessage).replace('function onmessage(ev)', 'onmessage = function(ev)')], {
    type: 'javascript/worker'
  });
  worker = new Worker(URL.createObjectURL(blob));
  var canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.append(canvas);
  var offscreen;

  try {
    offscreen = canvas.transferControlToOffscreen();
  } catch (_a) {}

  worker.postMessage({
    canvas: offscreen,
    degrees: degrees,
    type: 'create'
  }, [offscreen]);

  worker.onmessage = function (ev) {
    switch (ev.data.type) {
      case 'create':
        var _loop_1 = function _loop_1(event) {
          canvas[event.name] = function (_a) {
            var touches = _a.touches,
                target = _a.target,
                offsetX = _a.offsetX,
                offsetY = _a.offsetY;
            return worker.postMessage({
              event: event.name,
              type: 'update',
              data: {
                touches: touches,
                target: {
                  offsetLeft: target.offsetLeft
                },
                offsetX: offsetX,
                offsetY: offsetY
              }
            });
          };
        };

        for (var _i = 0, events_2 = events_1["default"]; _i < events_2.length; _i++) {
          var event = events_2[_i];

          _loop_1(event);
        }

      case 'update':
        return function updated() {};
    } // worker.terminate()
    //@ts-ignore


    container.postMessage = worker.postMessage; //@ts-ignore

    container.onmessage = worker.onmessage;
    cb(null, {
      data: ev.data,
      worker: worker
    });
  }; // cb()

}

exports["default"] = draw;
},{"../worker/worker":"../worker/worker.js","./events":"events.ts"}],"update.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

function update(container, degrees, worker, cb) {
  if (degrees === void 0) {
    degrees = 0;
  }

  worker.postMessage({
    type: 'update',
    degrees: degrees
  });

  worker.onmessage = function (ev) {
    cb(null, {
      data: {
        type: 'update'
      }
    });
  };
}

exports["default"] = update;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var draw_1 = __importDefault(require("./draw"));

var update_1 = __importDefault(require("./update"));

var state = {
  drawn: false,
  degreesCurrent: 0,
  color: 'lightgreen',
  bgColor: '#222',
  text: '',
  isDrawing: false,
  isSetting: false,
  animationLoop: null,
  canvas: null,
  ctx: null
};
exports["default"] = {
  create: draw_1["default"],
  update: update_1["default"]
};
},{"./draw":"draw.ts","./update":"update.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53426" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], "SimpleGauge")
//# sourceMappingURL=/index.js.map