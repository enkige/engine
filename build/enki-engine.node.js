(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EnkiEngine"] = factory();
	else
		root["EnkiEngine"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/dist/esm-node/bytesToUuid.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/bytesToUuid.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function bytesToUuid(buf, offset_) {
  const offset = offset_ || 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  return (byteToHex[buf[offset + 0]] + byteToHex[buf[offset + 1]] + byteToHex[buf[offset + 2]] + byteToHex[buf[offset + 3]] + '-' + byteToHex[buf[offset + 4]] + byteToHex[buf[offset + 5]] + '-' + byteToHex[buf[offset + 6]] + byteToHex[buf[offset + 7]] + '-' + byteToHex[buf[offset + 8]] + byteToHex[buf[offset + 9]] + '-' + byteToHex[buf[offset + 10]] + byteToHex[buf[offset + 11]] + byteToHex[buf[offset + 12]] + byteToHex[buf[offset + 13]] + byteToHex[buf[offset + 14]] + byteToHex[buf[offset + 15]]).toLowerCase();
}

/* harmony default export */ __webpack_exports__["default"] = (bytesToUuid);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/index.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/index.js ***!
  \**************************************************/
/*! exports provided: v1, v3, v4, v5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-node/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-node/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-node/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-node/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/md5.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/md5.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);


function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHash('md5').update(bytes).digest();
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/rng.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/rng.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);

const rnds8 = new Uint8Array(16);
function rng() {
  return crypto__WEBPACK_IMPORTED_MODULE_0___default.a.randomFillSync(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/sha1.js":
/*!*************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/sha1.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);


function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return crypto__WEBPACK_IMPORTED_MODULE_0___default.a.createHash('sha1').update(bytes).digest();
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v1.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v1.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-node/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-node/bytesToUuid.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v3.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v3.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-node/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-node/md5.js");


const v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v35.js":
/*!************************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v35.js ***!
  \************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-node/bytesToUuid.js");


function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  const bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
    bytes.push(parseInt(hex, 16));
  });
  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = uuidToBytes(namespace);
    }

    if (!Array.isArray(value)) {
      throw TypeError('value must be an array of bytes');
    }

    if (!Array.isArray(namespace) || namespace.length !== 16) {
      throw TypeError('namespace must be uuid string or an Array of 16 byte values');
    } // Per 4.3


    const bytes = hashfunc(namespace.concat(value));
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v4.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v4.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-node/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-node/bytesToUuid.js");



function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-node/v5.js":
/*!***********************************************!*\
  !*** ./node_modules/uuid/dist/esm-node/v5.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-node/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-node/sha1.js");


const v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "./src/componentManager.js":
/*!*********************************!*\
  !*** ./src/componentManager.js ***!
  \*********************************/
/*! exports provided: ComponentManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentManager", function() { return ComponentManager; });
/* harmony import */ var _utils_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/validate */ "./src/utils/validate.js");


const ComponentManager = (storage, verbose) => {

  const _storage = storage;
  const _registeredComponents = new Map();

  const _log = (...$msg) => {
    if (verbose) {
      console.log('Component Manager: ', ...$msg);
    }
  };

  const _validate = (ComponentId, componentValue) => {
    //check if component is registered
    const c = _registeredComponents.get(ComponentId);
    if (typeof c === 'undefined') {
      return false;
    }

    //check if values are correct
    for (let [k, v] of Object.entries(c)) {
      const validateFunctionName = 'is' + v['type'].charAt(0).toUpperCase() + v['type'].slice(1);
      //if value is not passed and we have a default or value is optional then we are good
      if (typeof componentValue[k] === 'undefined' && (
        (typeof (v.optional) !== 'undefined' && v.optional === true) ||
        typeof (v.default) !== 'undefined')
      ) {
        continue;
      }
      //we have a value so we test
      if (!_utils_validate__WEBPACK_IMPORTED_MODULE_0__[validateFunctionName](componentValue[k])) {
        _log(`${componentValue[k]} failed the validation ${validateFunctionName}`);
        return false;
      }
    }

    //check if extra non existent property were passed to component
    const defaultSchema = Object.keys(c);
    for (const k of Object.keys(componentValue)) {
      if (!defaultSchema.includes(k)) {
        _log(`${k} is not a valid property for the ${ComponentId} Component.`);
        return false;
      }
    }

    return true;
  };

  const add = (entityId, ComponentId, value = {}) => {
    if (_validate(ComponentId, value)) {
      const c = _registeredComponents.get(ComponentId);
      const defaultValues = Object.fromEntries(Object.entries(c).map(([k, v]) => {
        return [k, v.default];
      }));
      return _storage.addEntityComponent(entityId, ComponentId, Object.assign(defaultValues, value));
    } else {
      _log(`Component ${ComponentId} could not added to ${entityId} due to fail validation`);
      return false;
    }
  };

  const remove = (entityId, ComponentId) => {
    return _storage.removeEntityComponent(entityId, ComponentId);
  };

  const register = (component) => {
    if(!component.hasOwnProperty('name')) {
      return false;
    }
    _log(`Registering ${component.name} Component`)
    const data = component.data || {};
    return _registeredComponents.set(component.name, data);
  };

  return {
    add,
    remove,
    register,
  };
};


/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! exports provided: Components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Components", function() { return Components; });
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./position */ "./src/components/position.js");


const Components = {
  Position: _position__WEBPACK_IMPORTED_MODULE_0__["Position"],
}


/***/ }),

/***/ "./src/components/position.js":
/*!************************************!*\
  !*** ./src/components/position.js ***!
  \************************************/
/*! exports provided: Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
const Position = {
  name: 'Position',
  data: {
    x: {type: 'number', default: 0},
    y: {type: 'number', default: 0},
  },
};


/***/ }),

/***/ "./src/entityManager.js":
/*!******************************!*\
  !*** ./src/entityManager.js ***!
  \******************************/
/*! exports provided: EntityManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityManager", function() { return EntityManager; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-node/index.js");


const EntityManager = (storage) => {
  const _storage = storage;

  const add = (template) => {
    const entity = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])();
    _storage.addEntity(entity);
    return entity;
  };

  const remove = (entity) => {
    _storage.removeEntity(entity);
  };

  const get = (id) => {
    _storage.getEntity(id);
    return id;
  };

  const getAll = () => {
    return _storage.getEntities().values();
  };

  return {
    add,
    get,
    getAll,
    remove,
  };
};


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entityManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entityManager.js */ "./src/entityManager.js");
/* harmony import */ var _componentManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./componentManager.js */ "./src/componentManager.js");
/* harmony import */ var _systemManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systemManager.js */ "./src/systemManager.js");
/* harmony import */ var _storage_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage/index.js */ "./src/storage/index.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "./src/components/index.js");
/* harmony import */ var _systems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./systems */ "./src/systems/index.js");





// import predefined components and systems



/**
 * Create an Enki Engine instance
 * @param {string} storageType - The type of storage to use, either 'MemoryStorage' or 'custom'
 * @param {string} mode - debug or production.
 * @param {func} storageInstance - a Storage instance, only used if storageType is set to 'custom'
 * @param {any} rest - unused at the moment
 * @returns {{EntityManager: {add: (function(*): string), remove: remove}, ComponentManager: {add: add, remove: (function(*=, *=): boolean|*), register: register}, SystemManager: {execute: execute, register: register}}}
 * @constructor
 */
const Engine = ({storageType = 'MemoryStorage', mode = 'production', storageInstance = null, ...rest} = {}) => {

  //get storage
  console.log(`Starting Enki ECS Engine with ${storageType}`)

  const verbose = mode == 'debug' ? true : false;
  let storage = null;
  if(storageType == 'custom') {
    storage = storageInstance(verbose);
  } else {
    storage = _storage_index_js__WEBPACK_IMPORTED_MODULE_3__["Storage"][storageType](verbose);
  }

  const entityMgr = Object(_entityManager_js__WEBPACK_IMPORTED_MODULE_0__["EntityManager"])(storage, verbose);

  const componentMgr = Object(_componentManager_js__WEBPACK_IMPORTED_MODULE_1__["ComponentManager"])(storage, verbose);
  //register predefined Components
  for(let c of Object.values(_components__WEBPACK_IMPORTED_MODULE_4__["Components"])) {
    componentMgr.register(c)
  }

  const systemMgr = Object(_systemManager_js__WEBPACK_IMPORTED_MODULE_2__["SystemManager"])(storage, verbose);
  //register predefined Systems
  for(let s of Object.values(_systems__WEBPACK_IMPORTED_MODULE_5__["Systems"])) {
    systemMgr.register(s)
  }

  return {
    EntityManager: entityMgr,
    SystemManager: systemMgr,
    ComponentManager: componentMgr
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Engine);


/***/ }),

/***/ "./src/storage/index.js":
/*!******************************!*\
  !*** ./src/storage/index.js ***!
  \******************************/
/*! exports provided: Storage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
/* harmony import */ var _memoryStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memoryStorage */ "./src/storage/memoryStorage.js");


const Storage =  {
  MemoryStorage: _memoryStorage__WEBPACK_IMPORTED_MODULE_0__["MemoryStorage"]
}


/***/ }),

/***/ "./src/storage/memoryStorage.js":
/*!**************************************!*\
  !*** ./src/storage/memoryStorage.js ***!
  \**************************************/
/*! exports provided: MemoryStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryStorage", function() { return MemoryStorage; });
/**
 *
 * @param verbose
 * @returns {{addEntity: (function(*): Set<any>), removeEntityComponent: removeEntityComponent, getEntityComponents: (function(*): any), getEntities: (function(): Set<*>), addEntityComponent: addEntityComponent, getEntity: (function(*=): *), removeEntity: (function(*=): boolean), getEntityByComponents: (function(Array): *)}}
 * @constructor
 */
const MemoryStorage = (verbose) => {
  const _verbose = verbose;
  const Entities = new Set(); //list of entities created
  const ComponentMap = new Map(); //a map for quickly retrieve entity that have a given component (ComponentId => [entity1, entity2...])
  const EntityComponents = new Map(); // a 3D map with primary key being entity ID with a map of all components

  const _log = ( ...$msg) => {
    if(verbose) {
      console.log('Memory Store: ',...$msg)
    }
  }

  /**
   * Add an Entity to storage
   * @param {any} entityId - Any value that is unique
   * @returns {Set<any>}
   */
  const addEntity = (entityId) => {
    EntityComponents.set(entityId, new Map())
    _log(`Saving Entity ${entityId}`)
    return Entities.add(entityId)
  }

  /**
   * Remove an entity from storage
   * @param entityId
   * @returns {boolean}
   */
  const removeEntity = (entityId) => {
    _log(`Removing Entity ${entityId}`)
    return Entities.delete(entityId)
  }

  /**
   * Return EntityId or undefined if the entity does not exists
   * @param entityId
   * @returns {entityId}
   */
  const getEntity = (entityId) => {
    _log(`Get Entity ${entityId}`)
    const e = Entities.has(entityId) ? entityId : undefined;
    _log(`Found Entity ${entityId}`)
    return e
  }

  /**
   * Return a Set containing all entities
   * @returns {Set<any>}
   */
  const getEntities = () => {
    //returning a new set so users can not override the Entities Set by inadvertence
    return new Set(Entities);
  }

  /**
   * Get all components attached to an entity
   * @param {any} entityId - EntityId to retrieve components from
   * @returns {Set} - Set of components
   */
  const getEntityComponents = (entityId) => {
    _log(`Get Entity Components for ${entityId}`)
    return EntityComponents.has(entityId) ? EntityComponents.get(entityId) : new Set();
  }

  /**
   * List all entities that have the component attached
   * @param {array} components - array of components name
   * @returns {Set} - List of entities
   */
  const getEntityByComponents = (components) => {
    _log(`Get List of Entities by Components for `,components)
    const e =  components.reduce((acc, val) => {
      if(acc.size == 0){
        return ComponentMap.get(val) || new Set();
      }

      return new Set([...acc].filter(i => ComponentMap.get(val).has(i)))
    }, new Set());
    _log(`Found Entities`, e)
    return e;
  }

  /**
   * Add a component to an entity
   * @param {any} entityId - EntityId
   * @param {string} componentName - Name of Component to add to entity
   * @param {object} component - Component value for initialisation
   */
  const addEntityComponent = ( entityId, componentName, component) => {
    _log(`Add Component ${componentName} to Entity ${entityId}`)
    if(!ComponentMap.has(componentName)) {
      ComponentMap.set(componentName, new Set([entityId]));
      EntityComponents.get(entityId).set(componentName, component);
    } else {
      ComponentMap.get(componentName).add(entityId);
      EntityComponents.get(entityId).set(componentName, component);
    }
  }

  /**
   * Remove Component from an entity
   * @param {any }entityId - EntityId to remove component from
   * @param {string} componentName - Component Name
   * @returns {boolean|*}
   */
  const removeEntityComponent = (entityId, componentName) => {
    _log(`Remove Component ${componentName} to Entity ${entityId}`)
    if(!ComponentMap.has(componentName)) {
      return false;
    } else {
      return EntityComponents.get(entityId).delete(componentName) &&
        ComponentMap.get(componentName).delete(entityId);
    }
  }

  return {
    addEntity,
    removeEntity,
    getEntity,
    getEntities,
    addEntityComponent,
    removeEntityComponent,
    getEntityByComponents,
    getEntityComponents
  }
}


/***/ }),

/***/ "./src/systemManager.js":
/*!******************************!*\
  !*** ./src/systemManager.js ***!
  \******************************/
/*! exports provided: SystemManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemManager", function() { return SystemManager; });
/* harmony import */ var _utils_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/validate */ "./src/utils/validate.js");


const SystemManager = (storage, verbose) => {

  const _storage = storage;
  const _registeredSystems = new Map();


  const _log = ( ...$msg) => {
    if(verbose) {
      console.log('System Manager: ',...$msg)
    }
  }

  const _query = (q) => {
    return _storage.getEntityByComponents(q);
  }

  const _validate = (system) => {
    //check that system is a function with the correct prototype
    if(!typeof(system) === 'function' || !system.hasOwnProperty('query') || !system.hasOwnProperty('name')) {
      _log('Trying to register a system that is either not a function or does not have a name and query defined');
      return false;
    }
    if(!Object(_utils_validate__WEBPACK_IMPORTED_MODULE_0__["isString"])(system.name)){
      _log(`The name of a system must be a string`);
      return false
    }

    if(!Object(_utils_validate__WEBPACK_IMPORTED_MODULE_0__["isArrayOf"])(system.query, 'string')){
      _log(`System ${system.name} does not have a correct query. A query must be an array of string.`)
    }

    return true
  }

  const execute = () => {
    // loop through all systems
    for(let [name, system] of _registeredSystems){
      const entities = _query(system.query);
      entities.forEach((e) => {
        system(_storage.getEntityComponents(e))
      })
    }
  }

  const register = (system) => {
    if(_validate(system)){
      _log(`Registering ${system.name} System`)
      _registeredSystems.set(system.name, system);
    } else {
      return false;
    }
  }

  return {
    execute,
    register
  }

}


/***/ }),

/***/ "./src/systems/index.js":
/*!******************************!*\
  !*** ./src/systems/index.js ***!
  \******************************/
/*! exports provided: Systems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Systems", function() { return Systems; });
/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./move */ "./src/systems/move.js");


const Systems = {
  Move: _move__WEBPACK_IMPORTED_MODULE_0__["Move"],
}


/***/ }),

/***/ "./src/systems/move.js":
/*!*****************************!*\
  !*** ./src/systems/move.js ***!
  \*****************************/
/*! exports provided: Move */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Move", function() { return Move; });


const Move = (components, log) => {
  const position = components.get('Position')
  position.x += 10;
  position.y += 10;
  return components;
};

Move.query = ['Position'];


/***/ }),

/***/ "./src/utils/validate.js":
/*!*******************************!*\
  !*** ./src/utils/validate.js ***!
  \*******************************/
/*! exports provided: isNumber, isAny, isString, isEnum, isArrayOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAny", function() { return isAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnum", function() { return isEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayOf", function() { return isArrayOf; });

const isNumber = (value) => {
  return !isNaN(value)
}

const isAny = (value) => {
  if(typeof(value) !== 'undefined'){
    return true;
  }
  return false;
}

const isString = (value) => {
  if (typeof value === 'string' || value instanceof String) {
    return true;
  }
  return false;
}

const isEnum = (value, allowed) => {
  return allowed.includes(value)
}

const isArrayOf = (value, type) => {
  //check if array
  const isArray = Array.isArray(value);
  if(!isArray)  {
    return false
  }
  //check type

  let res = false;
  switch (type) {
    case 'string':
      res = value.reduce((acc,cur) => {
        return acc && isString(cur)
      }, true)
      break;
    case 'number':
      res = value.reduce((acc,cur) => {
        return acc && isNumber(cur)
      }, true)
      break;
    case 'mixed' : res = true; break;
    default:
      throw new TypeError(`Type ${type} not supported in Array`);
  }
  return res;
}


/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=enki-engine.node.js.map