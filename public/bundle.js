(function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.10' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol =  _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	// 19.1.2.5 Object.freeze(O)

	var meta = _meta.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)

	var meta$1 = _meta.onFreeze;

	_objectSap('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)

	var meta$2 = _meta.onFreeze;

	_objectSap('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)


	_objectSap('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)


	_objectSap('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)


	_objectSap('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	// 19.1.2.1 Object.assign(target, source, ...)






	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	// 19.1.3.10 Object.is(value1, value2)

	_export(_export.S, 'Object', { is: _sameValue });

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


	_export(_export.P, 'Function', { bind: _bind });

	var dP$2 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$2(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var HAS_INSTANCE = _wks('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
	  if (typeof this != 'function' || !_isObject(O)) return false;
	  if (!_isObject(this.prototype)) return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while (O = _objectGpo(O)) if (this.prototype === O) return true;
	  return false;
	} });

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var $parseFloat = _global.parseFloat;
	var $trim$1 = _stringTrim.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$1(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 18.2.4 parseFloat(string)
	_export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var gOPN$2 = _objectGopn.f;
	var gOPD$2 = _objectGopd.f;
	var dP$3 = _objectDp.f;
	var $trim$2 = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim$2(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN$2(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
	    if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
	      dP$3($Number, key, gOPD$2(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	var _aNumberValue = function (it, msg) {
	  if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};

	var _stringRepeat = function repeat(count) {
	  var str = String(_defined(this));
	  var res = '';
	  var n = _toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var $toFixed = 1.0.toFixed;
	var floor$1 = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor$1(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor$1(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	_export(_export.P + _export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = _aNumberValue(this, ERROR);
	    var f = _toInteger(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + _stringRepeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

	var $toPrecision = 1.0.toPrecision;

	_export(_export.P + _export.F * (_fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !_fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});

	// 20.1.2.1 Number.EPSILON


	_export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

	// 20.1.2.2 Number.isFinite(number)

	var _isFinite = _global.isFinite;

	_export(_export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)

	var floor$2 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	// 20.1.2.4 Number.isNaN(number)


	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.5 Number.isSafeInteger(number)


	var abs = Math.abs;

	_export(_export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.6 Number.MAX_SAFE_INTEGER


	_export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

	// 20.1.2.10 Number.MIN_SAFE_INTEGER


	_export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

	// 20.1.2.12 Number.parseFloat(string)
	_export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', { parseFloat: _parseFloat });

	// 20.1.2.13 Number.parseInt(string, radix)
	_export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', { parseInt: _parseInt });

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	// 20.2.2.3 Math.acosh(x)


	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	_export(_export.S + _export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)

	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	_export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

	// 20.2.2.7 Math.atanh(x)

	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	_export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.9 Math.cbrt(x)



	_export(_export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)


	_export(_export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)

	var exp = Math.exp;

	_export(_export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	var _mathExpm1 = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

	// 20.2.2.14 Math.expm1(x)



	_export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

	// 20.2.2.16 Math.fround(x)

	var pow$1 = Math.pow;
	var EPSILON = pow$1(2, -52);
	var EPSILON32 = pow$1(2, -23);
	var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
	var MIN32 = pow$1(2, -126);

	var roundTiesToEven = function (n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	var _mathFround = Math.fround || function fround(x) {
	  var $abs = Math.abs(x);
	  var $sign = _mathSign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  // eslint-disable-next-line no-self-compare
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	};

	// 20.2.2.16 Math.fround(x)


	_export(_export.S, 'Math', { fround: _mathFround });

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

	var abs$1 = Math.abs;

	_export(_export.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs$1(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)

	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	_export(_export.S + _export.F * _fails(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.21 Math.log10(x)


	_export(_export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.20 Math.log1p(x)


	_export(_export.S, 'Math', { log1p: _mathLog1p });

	// 20.2.2.22 Math.log2(x)


	_export(_export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)


	_export(_export.S, 'Math', { sign: _mathSign });

	// 20.2.2.30 Math.sinh(x)


	var exp$1 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	_export(_export.S + _export.F * _fails(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (_mathExpm1(x) - _mathExpm1(-x)) / 2
	      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)


	var exp$2 = Math.exp;

	_export(_export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = _mathExpm1(x = +x);
	    var b = _mathExpm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)


	_export(_export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	_export(_export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = _toIobject(callSite.raw);
	    var len = _toLength(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _iterators = {};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if ( typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ( (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var $at$1 = _stringAt(false);
	_export(_export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at$1(this, pos);
	  }
	});

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = _stringContext(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = _toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_export(_export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: _stringRepeat
	});

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = _stringContext(this, searchString, STARTS_WITH);
	    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(_defined(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	var _stringHtml = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  _export(_export.P + _export.F * _fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

	// B.2.3.2 String.prototype.anchor(name)
	_stringHtml('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});

	// B.2.3.3 String.prototype.big()
	_stringHtml('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});

	// B.2.3.4 String.prototype.blink()
	_stringHtml('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});

	// B.2.3.5 String.prototype.bold()
	_stringHtml('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});

	// B.2.3.6 String.prototype.fixed()
	_stringHtml('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});

	// B.2.3.7 String.prototype.fontcolor(color)
	_stringHtml('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});

	// B.2.3.8 String.prototype.fontsize(size)
	_stringHtml('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});

	// B.2.3.9 String.prototype.italics()
	_stringHtml('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});

	// B.2.3.10 String.prototype.link(url)
	_stringHtml('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});

	// B.2.3.11 String.prototype.small()
	_stringHtml('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});

	// B.2.3.12 String.prototype.strike()
	_stringHtml('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});

	// B.2.3.13 String.prototype.sub()
	_stringHtml('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});

	// B.2.3.14 String.prototype.sup()
	_stringHtml('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});

	// 20.3.3.1 / 15.9.4.4 Date.now()


	_export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

	_export(_export.P + _export.F * _fails(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = _toObject(this);
	    var pv = _toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

	var getTime = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	var _dateToIsoString = (_fails(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !_fails(function () {
	  $toISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()



	// PhantomJS / old WebKit has a broken implementations
	_export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
	  toISOString: _dateToIsoString
	});

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var $toString = DateProto[TO_STRING];
	var getTime$1 = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefine(DateProto, TO_STRING, function toString() {
	    var value = getTime$1.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

	var NUMBER$1 = 'number';

	var _dateToPrimitive = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
	  return _toPrimitive(_anObject(this), hint != NUMBER$1);
	};

	var TO_PRIMITIVE$1 = _wks('toPrimitive');
	var proto$1 = Date.prototype;

	if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive);

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	// WebKit Array.of isn't generic
	_export(_export.S + _export.F * _fails(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) _createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	// 22.1.3.13 Array.prototype.join(separator)


	var arrayJoin = [].join;

	// fallback for not array-like strings
	_export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
	  }
	});

	var arraySlice$1 = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	_export(_export.P + _export.F * _fails(function () {
	  if (_html) arraySlice$1.call(_html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = _toLength(this.length);
	    var klass = _cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice$1.call(this, begin, end);
	    var start = _toAbsoluteIndex(begin, len);
	    var upTo = _toAbsoluteIndex(end, len);
	    var size = _toLength(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

	var $sort = [].sort;
	var test$1 = [1, 2, 3];

	_export(_export.P + _export.F * (_fails(function () {
	  // IE8-
	  test$1.sort(undefined);
	}) || !_fails(function () {
	  // V8 bug
	  test$1.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(_toObject(this))
	      : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var $some = _arrayMethods(3);

	_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var $every = _arrayMethods(4);

	_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
	  _aFunction(callbackfn);
	  var O = _toObject(that);
	  var self = _iobject(O);
	  var length = _toLength(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

	_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

	_export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

	var $indexOf = _arrayIncludes(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var $native$1 = [].lastIndexOf;
	var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;
	    var O = _toIobject(this);
	    var length = _toLength(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});

	var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = _toObject(this);
	  var len = _toLength(O.length);
	  var to = _toAbsoluteIndex(target, len);
	  var from = _toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


	_export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

	_addToUnscopables('copyWithin');

	var _arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = _toObject(this);
	  var length = _toLength(O.length);
	  var aLen = arguments.length;
	  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


	_export(_export.P, 'Array', { fill: _arrayFill });

	_addToUnscopables('fill');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(6);
	var KEY$1 = 'findIndex';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	_export(_export.P + _export.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	_setSpecies('Array');

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var dP$4 = _objectDp.f;
	var gOPN$3 = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base$1 = $RegExp;
	var proto$2 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base$1(piRE && !fiU ? p.source : p, f)
	        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$2, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$4($RegExp, key, {
	      configurable: true,
	      get: function () { return Base$1[key]; },
	      set: function (it) { Base$1[key] = it; }
	    });
	  };
	  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
	  proto$2.constructor = $RegExp;
	  $RegExp.prototype = proto$2;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING$1 = 'toString';
	var $toString$1 = /./[TO_STRING$1];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING$1, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString$1.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString$1.name != TO_STRING$1) {
	  define(function toString() {
	    return $toString$1.call(this);
	  });
	}

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	var SPECIES$2 = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$2] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      if (!rx.global) return _regexpExecAbstract(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$3 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$3(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative($search, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      var previousLastIndex = rx.lastIndex;
	      if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = _regexpExecAbstract(rx, S);
	      if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$3 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$3]) == undefined ? D : _aFunction(S);
	};

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails(function () { RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var process$1 = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$2 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$2) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator$1 = _global.navigator;

	var _userAgent = navigator$1 && navigator$1.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$3 = _global.process;
	var versions = process$3 && process$3.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$3) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$3.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * ( !USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve( this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$5 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$5(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	var getWeak = _meta.getWeak;







	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var es6_weakMap = createCommonjsModule(function (module) {

	var each = _arrayMethods(0);






	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	_collection(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
	  }
	}, _collectionWeak, false, true);

	var TYPED = _uid('typed_array');
	var VIEW = _uid('view');
	var ABV = !!(_global.ArrayBuffer && _global.DataView);
	var CONSTR = ABV;
	var i$1 = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i$1 < l) {
	  if (Typed = _global[TypedArrayConstructors[i$1++]]) {
	    _hide(Typed.prototype, TYPED, true);
	    _hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};

	// https://tc39.github.io/ecma262/#sec-toindex


	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = _toInteger(it);
	  var length = _toLength(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	var _typedBuffer = createCommonjsModule(function (module, exports) {











	var gOPN = _objectGopn.f;
	var dP = _objectDp.f;


	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = _global[ARRAY_BUFFER];
	var $DataView = _global[DATA_VIEW];
	var Math = _global.Math;
	var RangeError = _global.RangeError;
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = _global.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = _descriptors ? '_b' : BUFFER;
	var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
	var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	function packIEEE754(value, mLen, nBytes) {
	  var buffer = new Array(nBytes);
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var i = 0;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  var e, m, c;
	  value = abs(value);
	  // eslint-disable-next-line no-self-compare
	  if (value != value || value === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	}
	function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = eLen - 7;
	  var i = nBytes - 1;
	  var s = buffer[i--];
	  var e = s & 127;
	  var m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	}

	function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}
	function packI8(it) {
	  return [it & 0xff];
	}
	function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	}
	function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}
	function packF64(it) {
	  return packIEEE754(it, 52, 8);
	}
	function packF32(it) {
	  return packIEEE754(it, 23, 4);
	}

	function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
	}

	function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	}
	function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = _toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	}

	if (!_typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = _toIndex(length);
	    this._b = _arrayFill.call(new Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    _anInstance(this, $DataView, DATA_VIEW);
	    _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH];
	    var offset = _toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (_descriptors) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  _redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!_fails(function () {
	    $ArrayBuffer(1);
	  }) || !_fails(function () {
	    new $ArrayBuffer(-1); // eslint-disable-line no-new
	  }) || _fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	    new $ArrayBuffer(1.5); // eslint-disable-line no-new
	    new $ArrayBuffer(NaN); // eslint-disable-line no-new
	    return $ArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      _anInstance(this, $ArrayBuffer);
	      return new BaseBuffer(_toIndex(length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
	    }
	    ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	_setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	_setToStringTag($DataView, DATA_VIEW);
	_hide($DataView[PROTOTYPE], _typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	});

	var ArrayBuffer$1 = _global.ArrayBuffer;

	var $ArrayBuffer = _typedBuffer.ArrayBuffer;
	var $DataView = _typedBuffer.DataView;
	var $isView = _typed.ABV && ArrayBuffer$1.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW$1 = _typed.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';

	_export(_export.G + _export.W + _export.F * (ArrayBuffer$1 !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	_export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
	  }
	});

	_export(_export.P + _export.U + _export.F * _fails(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
	    var len = _anObject(this).byteLength;
	    var first = _toAbsoluteIndex(start, len);
	    var fin = _toAbsoluteIndex(end === undefined ? len : end, len);
	    var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
	    var viewS = new $DataView(this);
	    var viewT = new $DataView(result);
	    var index = 0;
	    while (first < fin) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	_setSpecies(ARRAY_BUFFER);

	_export(_export.G + _export.W + _export.F * !_typed.ABV, {
	  DataView: _typedBuffer.DataView
	});

	var _typedArray = createCommonjsModule(function (module) {
	if (_descriptors) {
	  var LIBRARY = _library;
	  var global = _global;
	  var fails = _fails;
	  var $export = _export;
	  var $typed = _typed;
	  var $buffer = _typedBuffer;
	  var ctx = _ctx;
	  var anInstance = _anInstance;
	  var propertyDesc = _propertyDesc;
	  var hide = _hide;
	  var redefineAll = _redefineAll;
	  var toInteger = _toInteger;
	  var toLength = _toLength;
	  var toIndex = _toIndex;
	  var toAbsoluteIndex = _toAbsoluteIndex;
	  var toPrimitive = _toPrimitive;
	  var has = _has;
	  var classof = _classof;
	  var isObject = _isObject;
	  var toObject = _toObject;
	  var isArrayIter = _isArrayIter;
	  var create = _objectCreate;
	  var getPrototypeOf = _objectGpo;
	  var gOPN = _objectGopn.f;
	  var getIterFn = core_getIteratorMethod;
	  var uid = _uid;
	  var wks = _wks;
	  var createArrayMethod = _arrayMethods;
	  var createArrayIncludes = _arrayIncludes;
	  var speciesConstructor = _speciesConstructor;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators = _iterators;
	  var $iterDetect = _iterDetect;
	  var setSpecies = _setSpecies;
	  var arrayFill = _arrayFill;
	  var arrayCopyWithin = _arrayCopyWithin;
	  var $DP = _objectDp;
	  var $GOPD = _objectGopd;
	  var dP = $DP.f;
	  var gOPD = $GOPD.f;
	  var RangeError = global.RangeError;
	  var TypeError = global.TypeError;
	  var Uint8Array = global.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR = wks('iterator');
	  var TAG = wks('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject(arrayLike);
	    var len = toLength(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails(function () {
	      TypedArray(1);
	    }) || !fails(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () { /* empty */ };
	});

	_typedArray('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	_typedArray('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	_typedArray('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)



	var rApply = (_global.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	_export(_export.S + _export.F * !_fails(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = _aFunction(target);
	    var L = _anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







	var rConstruct = (_global.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = _fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)





	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	_export(_export.S + _export.F * _fails(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    _anObject(target);
	    propertyKey = _toPrimitive(propertyKey, true);
	    _anObject(attributes);
	    try {
	      _objectDp.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)

	var gOPD$3 = _objectGopd.f;


	_export(_export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$3(_anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.5 Reflect.enumerate(target)


	var Enumerate = function (iterated) {
	  this._t = _anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = [];      // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	_iterCreate(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	_export(_export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])







	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (_anObject(target) === receiver) return target[propertyKey];
	  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
	}

	_export(_export.S, 'Reflect', { get: get });

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)




	_export(_export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return _objectGopd.f(_anObject(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)




	_export(_export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return _objectGpo(_anObject(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)


	_export(_export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)


	var $isExtensible = Object.isExtensible;

	_export(_export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    _anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// 26.1.11 Reflect.ownKeys(target)


	_export(_export.S, 'Reflect', { ownKeys: _ownKeys });

	// 26.1.12 Reflect.preventExtensions(target)


	var $preventExtensions = Object.preventExtensions;

	_export(_export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    _anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])









	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = _objectGopd.f(_anObject(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (_isObject(proto = _objectGpo(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = _propertyDesc(0);
	  }
	  if (_has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !_isObject(receiver)) return false;
	    if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      _objectDp.f(receiver, propertyKey, existingDescriptor);
	    } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	_export(_export.S, 'Reflect', { set: set });

	// 26.1.14 Reflect.setPrototypeOf(target, proto)



	if (_setProto) _export(_export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    _setProto.check(target, proto);
	    try {
	      _setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	var includes = _core.Array.includes;

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray




	var IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

	function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
	  var element, spreadable;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      spreadable = false;
	      if (_isObject(element)) {
	        spreadable = element[IS_CONCAT_SPREADABLE];
	        spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
	      }

	      if (spreadable && depth > 0) {
	        targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	}

	var _flattenIntoArray = flattenIntoArray;

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap







	_export(_export.P, 'Array', {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = _toObject(this);
	    var sourceLen, A;
	    _aFunction(callbackfn);
	    sourceLen = _toLength(O.length);
	    A = _arraySpeciesCreate(O, 0);
	    _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
	    return A;
	  }
	});

	_addToUnscopables('flatMap');

	var flatMap = _core.Array.flatMap;

	// https://github.com/tc39/proposal-string-pad-start-end




	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(_defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = _toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

	_export(_export.P + _export.F * WEBKIT_BUG, 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	var padStart = _core.String.padStart;

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

	_export(_export.P + _export.F * WEBKIT_BUG$1, 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	var padEnd = _core.String.padEnd;

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');

	var trimStart = _core.String.trimLeft;

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	_stringTrim('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

	var trimEnd = _core.String.trimRight;

	_wksDefine('asyncIterator');

	var asyncIterator = _wksExt.f('asyncIterator');

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!_descriptors || isEnum$1.call(O, key)) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var values = _core.Object.values;

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	var _finally = _core.Promise['finally'];

	// ie9- setTimeout & setInterval additional parameters fix



	var slice = [].slice;
	var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check
	var wrap$1 = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	_export(_export.G + _export.B + _export.F * MSIE, {
	  setTimeout: wrap$1(_global.setTimeout),
	  setInterval: wrap$1(_global.setInterval)
	});

	_export(_export.G + _export.B, {
	  setImmediate: _task.set,
	  clearImmediate: _task.clear
	});

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
	  var NAME$1 = collections[i$2];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto$3 = Collection && Collection.prototype;
	  var key$1;
	  if (proto$3) {
	    if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
	    if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key$1 in es6_array_iterator) if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
	  }
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.10' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$3 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$3.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$6 = Object.defineProperty;

	var f$8 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$6(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$8
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var PROTOTYPE$3 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var IS_WRAP = type & $export$1.W;
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$3];
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$3];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has$1(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx$1(out, _global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE$3] = C[PROTOTYPE$3];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	// https://github.com/tc39/proposal-global


	_export$1(_export$1.G, { global: _global$1 });

	var global$1 = _core$1.global;

	var lib = createCommonjsModule(function (module) {



	var _global = _interopRequireDefault(global$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	if (_global["default"]._babelPolyfill && typeof console !== "undefined" && console.warn) {
	  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
	}

	_global["default"]._babelPolyfill = true;
	});

	unwrapExports(lib);

	/**
	 * @license
	 * Copyright 2019 Google LLC. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * =============================================================================
	 */
	var t=function(e,n){return (t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);})(e,n)};function e(e,n){function r(){this.constructor=e;}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r);}function n(t,e,n,r){return new(n||(n=Promise))(function(o,a){function i(t){try{s(r.next(t));}catch(t){a(t);}}function u(t){try{s(r.throw(t));}catch(t){a(t);}}function s(t){t.done?o(t.value):new n(function(e){e(t.value);}).then(i,u);}s((r=r.apply(t,e||[])).next());})}function r(t,e){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i);}catch(t){a=[6,t],r=0;}finally{n=o=0;}if(5&a[0])throw a[1];return {value:a[0]?a[1]:void 0,done:!0}}([a,u])}}}var o=function(){function t(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.populateURLFlags();}return t.prototype.setPlatform=function(t,e){null!=this.platform&&console.warn("Platform "+this.platformName+" has already been set. Overwriting the platform with "+e+"."),this.platformName=t,this.platform=e;},t.prototype.registerFlag=function(t,e,n){if(this.flagRegistry[t]={evaluationFn:e,setHook:n},null!=this.urlFlags[t]){var r=this.urlFlags[t];console.warn("Setting feature override from URL "+t+": "+r+"."),this.set(t,r);}},t.prototype.get=function(t){return t in this.flags?this.flags[t]:(this.flags[t]=this.evaluateFlag(t),this.flags[t])},t.prototype.getNumber=function(t){return this.get(t)},t.prototype.getBool=function(t){return this.get(t)},t.prototype.getFlags=function(){return this.flags},Object.defineProperty(t.prototype,"features",{get:function(){return this.flags},enumerable:!0,configurable:!0}),t.prototype.set=function(t,e){if(null==this.flagRegistry[t])throw new Error("Cannot set flag "+t+" as it has not been registered.");this.flags[t]=e,null!=this.flagRegistry[t].setHook&&this.flagRegistry[t].setHook(e);},t.prototype.evaluateFlag=function(t){if(null==this.flagRegistry[t])throw new Error("Cannot evaluate flag '"+t+"': no evaluation function found.");return this.flagRegistry[t].evaluationFn()},t.prototype.setFlags=function(t){this.flags=Object.assign({},t);},t.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags();},t.prototype.populateURLFlags=function(){var t=this;if(void 0!==this.global&&void 0!==this.global.location&&void 0!==this.global.location.search){var e,n,r=(e=this.global.location.search,n={},e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return function(t,e,n){t[decodeURIComponent(e)]=decodeURIComponent(n||"");}(n,e[0],e[1]),e.join("=")}),n);if("tfjsflags"in r)r.tfjsflags.split(",").forEach(function(e){var n=e.split(":"),r=n[0],o=n[1];t.urlFlags[r]=function(t,e){if("true"===(e=e.toLowerCase())||"false"===e)return "true"===e;if(""+ +e===e)return +e;throw new Error("Could not parse value flag value "+e+" for flag "+t+".")}(r,o);});}},t}();function a(){return i$3}var i$3=null;var u=new Map;function s(t,e){var n=f$9(t,e);return u.get(n)}function c(t){for(var e=u.entries(),n=[];;){var r=e.next(),o=r.done,a=r.value;if(o)break;var i=a[0],s=a[1];i.split("_")[0]===t&&n.push(s);}return n}function l$1(t){var e=t.kernelName,n=t.backendName,r=f$9(e,n);if(u.has(r))throw new Error("The kernel '"+e+"' for backend '"+n+"' is already registered");u.set(r,t);}function h(t,e){var n=f$9(t,e);if(!u.has(n))throw new Error("The kernel '"+t+"' for backend '"+e+"' is not registered");u.delete(n);}function f$9(t,e){return e+"_"+t}function p(t){for(var e=t.length,n=0,r=0;e>0;)r=Math.random()*e|0,n=t[--e],t[e]=t[r],t[r]=n;}function d(t,e,n){return Math.max(t,Math.min(e,n))}function v(t){return t%2==0?t:t+1}function m(t){for(var e=0,n=0;n<t.length;n++)e+=t[n];return e}function g(t,e){if(!t)throw new Error("string"==typeof e?e:e())}function y(t,e,n){void 0===n&&(n=""),g(C(t,e),function(){return n+" Shapes "+t+" and "+e+" must match"});}function x(t){g(null!=t,function(){return "The input to the tensor constructor must be a non-null value."});}function b(t,e,n){if(void 0===e&&(e=[]),void 0===n&&(n=!1),null==e&&(e=[]),Array.isArray(t)||B(t)&&!n)for(var r=0;r<t.length;++r)b(t[r],e,n);else e.push(t);return e}function w(t){if(0===t.length)return 1;for(var e=t[0],n=1;n<t.length;n++)e*=t[n];return e}function C(t,e){if(t===e)return !0;if(null==t||null==e)return !1;if(t.length!==e.length)return !1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return !1;return !0}function E(t){return t%1==0}function R(t){if(null!=Math.tanh)return Math.tanh(t);if(t===1/0)return 1;if(t===-1/0)return -1;var e=Math.exp(2*t);return (e-1)/(e+1)}function I(t){var e=Math.ceil(Math.sqrt(t));return [e,Math.ceil(t/e)]}function k$1(t,e){return e<=t.length?t:t+" ".repeat(e-t.length)}function S(t,e,n){return void 0===e&&(e=function(t){return 0}),new Promise(function(r,o){var a=0,i=function(){if(t())r();else{var u=e(++a);null!=n&&a>=n?o():setTimeout(i,u);}};i();})}function A(t,e){for(var n=1,r=-1,o=0;o<t.length;++o)if(t[o]>=0)n*=t[o];else if(-1===t[o]){if(-1!==r)throw Error("Shapes can only have 1 implicit size. Found -1 at dim "+r+" and dim "+o);r=o;}else if(t[o]<0)throw Error("Shapes can not be < 0. Found "+t[o]+" at dim "+o);if(-1===r){if(e>0&&e!==n)throw Error("Size("+e+") must match the product of shape "+t);return t}if(0===n)throw Error("Cannot infer the missing size in ["+t+"] when there are 0 elements");if(e%n!=0)throw Error("The implicit shape can't be a fractional number. Got "+e+" / "+n);var a=t.slice();return a[r]=e/n,a}function D(t,e){var n=e.length;return g((t=null==t?e.map(function(t,e){return e}):[].concat(t)).every(function(t){return t>=-n&&t<n}),function(){return "All values in axis param must be in range [-"+n+", "+n+") but got axis "+t}),g(t.every(function(t){return E(t)}),function(){return "All values in axis param must be integers but got axis "+t}),t.map(function(t){return t<0?n+t:t})}function T(t,e){for(var n=[],r=[],o=null!=e&&Array.isArray(e)&&0===e.length,a=null==e||o?null:D(e,t).sort(),i=0,u=0;u<t.length;++u){if(null!=a){if(a[i]===u&&1!==t[u])throw new Error("Can't squeeze axis "+u+" since its dim '"+t[u]+"' is not 1");(null==a[i]||a[i]>u)&&1===t[u]&&(n.push(t[u]),r.push(u)),a[i]<=u&&i++;}1!==t[u]&&(n.push(t[u]),r.push(u));}return {newShape:n,keptDims:r}}function N(t,e){var n=null;if(null==t||"float32"===t)n=new Float32Array(e);else if("int32"===t)n=new Int32Array(e);else{if("bool"!==t)throw new Error("Unknown data type "+t);n=new Uint8Array(e);}return n}function F(t,e){var n=null;if(null==t||"float32"===t)n=new Float32Array(e);else if("int32"===t)n=new Int32Array(e);else if("bool"===t)n=new Uint8Array(e);else{if("string"!==t)throw new Error("Unknown data type "+t);n=new Array(e);}return n}function O(t,e){for(var n=0;n<t.length;n++){var r=t[n];if(isNaN(r)||!isFinite(r))throw Error("A tensor of type "+e+" being uploaded contains "+r+".")}}function _(t){return "bool"===t||"complex64"===t||"float32"===t||"int32"===t||"string"===t}function M(t,e){return "complex64"!==e&&(("float32"!==e||"complex64"===t)&&(("int32"!==e||"float32"===t||"complex64"===t)&&("bool"!==e||"bool"!==t)))}function B(t){return t instanceof Float32Array||t instanceof Int32Array||t instanceof Uint8Array}function P(t){if("float32"===t||"int32"===t)return 4;if("complex64"===t)return 8;if("bool"===t)return 1;throw new Error("Unknown dtype "+t)}function L(t){if(null==t)return 0;var e=0;return t.forEach(function(t){return e+=t.length}),e}function W(t){return "string"==typeof t||t instanceof String}function U(t){return "boolean"==typeof t}function V(t){return "number"==typeof t}function z(t){return Array.isArray(t)?z(t[0]):t instanceof Float32Array?"float32":t instanceof Int32Array||t instanceof Uint8Array?"int32":V(t)?"float32":W(t)?"string":U(t)?"bool":"float32"}function G(t){return !!(t&&t.constructor&&t.call&&t.apply)}function H(t,e){for(var n=e;n<t;++n)if(t%n==0)return n;return t}function q(t){var e=t.length;if(e<2)return [];var n=new Array(e-1);n[e-2]=t[e-1];for(var r=e-3;r>=0;--r)n[r]=n[r+1]*t[r+1];return n}function K(t,e,n){if("string"===e)throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(t)&&(t=b(t)),n&&O(t,e),function(t,e){return t instanceof Float32Array&&"float32"===e||t instanceof Int32Array&&"int32"===e||t instanceof Uint8Array&&"bool"===e}(t,e))return t;if(null==e||"float32"===e||"complex64"===e)return new Float32Array(t);if("int32"===e)return new Int32Array(t);if("bool"===e){for(var r=new Uint8Array(t.length),o=0;o<r.length;++o)0!==Math.round(t[o])&&(r[o]=1);return r}throw new Error("Unknown data type "+e)}function j$2(t,e){if(0===t.length)return e[0];var n=t.reduce(function(t,e){return t*e});if(0===n)return [];if(n!==e.length)throw new Error("["+t+"] does not match the input size.");return function t(e,n,r){var o=new Array;if(1===n.length)for(var a=n[0],i=0;i<a;i++)o[i]=r[e+i];else{a=n[0];var u=n.slice(1),s=u.reduce(function(t,e){return t*e});for(i=0;i<a;i++)o[i]=t(e+i*s,u,r);}return o}(0,t,e)}function X(t,e){for(var n=$(t,e),r=0;r<n.length;r++)n[r]=1;return n}function $(t,e){if(null==e||"float32"===e||"complex64"===e)return new Float32Array(t);if("int32"===e)return new Int32Array(t);if("bool"===e)return new Uint8Array(t);throw new Error("Unknown data type "+e)}function Y(){return a().platform.now()}function Q(t){t.forEach(function(e){g(Number.isInteger(e)&&e>=0,function(){return "Tensor must have a shape comprised of positive integers but got shape ["+t+"]."});});}function J(t,e){return void 0===e&&(e="utf-8"),e=e||"utf-8",a().platform.encode(t,e)}function Z(t,e){return void 0===e&&(e="utf-8"),e=e||"utf-8",a().platform.decode(t,e)}var tt=Object.freeze({shuffle:p,clamp:d,nearestLargerEven:v,sum:m,randUniform:function(t,e){var n=Math.random();return e*n+(1-n)*t},distSquared:function(t,e){for(var n=0,r=0;r<t.length;r++){var o=Number(t[r])-Number(e[r]);n+=o*o;}return n},assert:g,assertShapesMatch:y,assertNonNull:x,flatten:b,sizeFromShape:w,isScalarShape:function(t){return 0===t.length},arraysEqual:C,isInt:E,tanh:R,sizeToSquarishShape:I,createShuffledIndices:function(t){for(var e=new Uint32Array(t),n=0;n<t;++n)e[n]=n;return p(e),e},rightPad:k$1,repeatedTry:S,inferFromImplicitShape:A,parseAxisParam:D,squeezeShape:T,getTypedArrayFromDType:N,getArrayFromDType:F,checkConversionForErrors:O,isValidDtype:_,hasEncodingLoss:M,isTypedArray:B,bytesPerElement:P,bytesFromStringArray:L,isString:W,isBoolean:U,isNumber:V,inferDtype:z,isFunction:G,nearestDivisor:H,computeStrides:q,toTypedArray:K,toNestedArray:j$2,makeOnesTypedArray:X,makeZerosTypedArray:$,now:Y,assertNonNegativeIntegerDimensions:Q,fetch:function(t,e){return a().platform.fetch(t,e)},encodeString:J,decodeString:Z}),et=function(){function t(t,e){this.backendTimer=t,this.logger=e,null==e&&(this.logger=new nt);}return t.prototype.profileKernel=function(t,e,n){var r,o=this,a=this.backendTimer.time(function(){r=n();});return r.forEach(function(n){n.data().then(function(r){!function(t,e,n){if("float32"!==e)return !1;for(var r=0;r<t.length;r++){var o=t[r];if(isNaN(o)||!isFinite(o))return console.warn("Found "+o+" in the result of '"+n+"'"),!0}}(r,n.dtype,t),a.then(function(a){var i="";null!=a.getExtraProfileInfo&&(i=a.getExtraProfileInfo()),o.logger.logKernelProfile(t,n,r,a.kernelMs,e,i);});});}),r},t}();var nt=function(){function t(){}return t.prototype.logKernelProfile=function(t,e,n,r,o,a){var i=k$1(r+"ms",9),u=k$1(t,25),s=e.rank,c=e.size,l=k$1(e.shape.toString(),14),h="";for(var f in o){var p=o[f].shape,d=p.length;h+=f+": "+d+"D "+(d>0?p:"")+" ";}console.log("%c"+u+"\t%c"+i+"\t%c"+s+"D "+l+"\t%c"+c+"\t%c"+h+"\t%c"+a,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue");},t}();var rt=20,ot=3,at$1=7;function it(t,e,n,r){var o=q(e),a=function(t,e,n,r){var o=w(e),a=r[r.length-1],i=new Array(a).fill(0),u=e.length,s="complex64"===n?ct(t):t;if(u>1)for(var c=0;c<o/a;c++)for(var l=c*a,h=0;h<a;h++)i[h]=Math.max(i[h],ut(s[l+h],0,n).length);return i}(t,e,n,o),i=e.length,u=function t(e,n,r,o,a,i){void 0===i&&(i=!0);var u="complex64"===r?2:1;var s=n[0];var c=n.length;if(0===c){if("complex64"===r){var l=ct(e);return [ut(l[0],0,r)]}return "bool"===r?[st(e[0])]:[e[0].toString()]}if(1===c){if(s>rt){var h=ot*u,f=Array.from(e.slice(0,h)),p=Array.from(e.slice((s-ot)*u,s*u));return "complex64"===r&&(f=ct(f),p=ct(p)),["["+f.map(function(t,e){return ut(t,a[e],r)}).join(", ")+", ..., "+p.map(function(t,e){return ut(t,a[s-ot+e],r)}).join(", ")+"]"]}var d="complex64"===r?ct(e):Array.from(e);return ["["+d.map(function(t,e){return ut(t,a[e],r)}).join(", ")+"]"]}var v=n.slice(1);var m=o.slice(1);var g=o[0]*u;var y=[];if(s>rt){for(var x=0;x<ot;x++){var b=x*g,w=b+g;y.push.apply(y,t(e.slice(b,w),v,r,m,a,!1));}y.push("...");for(var x=s-ot;x<s;x++){var b=x*g,w=b+g;y.push.apply(y,t(e.slice(b,w),v,r,m,a,x===s-1));}}else for(var x=0;x<s;x++){var b=x*g,w=b+g;y.push.apply(y,t(e.slice(b,w),v,r,m,a,x===s-1));}var C=2===c?",":"";y[0]="["+y[0]+C;for(var x=1;x<y.length-1;x++)y[x]=" "+y[x]+C;var E=",\n";for(var x=2;x<c;x++)E+="\n";y[y.length-1]=" "+y[y.length-1]+"]"+(i?"":E);return y}(t,e,n,o,a),s=["Tensor"];return r&&(s.push("  dtype: "+n),s.push("  rank: "+i),s.push("  shape: ["+e+"]"),s.push("  values:")),s.push(u.map(function(t){return "    "+t}).join("\n")),s.join("\n")}function ut(t,e,n){return k$1(Array.isArray(t)?parseFloat(t[0].toFixed(at$1))+" + "+parseFloat(t[1].toFixed(at$1))+"j":W(t)?"'"+t+"'":"bool"===n?st(t):parseFloat(t.toFixed(at$1)).toString(),e)}function st(t){return 0===t?"false":"true"}function ct(t){for(var e=[],n=0;n<t.length;n+=2)e.push([t[n],t[n+1]]);return e}var lt=function(){function t(t,e,n){var r=this;if(this.dtype=e,this.shape=t.slice(),this.size=w(t),null!=n){var o=n.length;g(o===this.size,function(){return "Length of values '"+o+"' does not match the size inferred by the shape '"+r.size+"'."});}if("complex64"===e)throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||F(e,this.size),this.strides=q(t);}return t.prototype.set=function(t){for(var e=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];0===n.length&&(n=[0]),g(n.length===this.rank,function(){return "The number of provided coordinates ("+n.length+") must match the rank ("+e.rank+")"});var o=this.locToIndex(n);this.values[o]=t;},t.prototype.get=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];0===t.length&&(t=[0]);for(var n=0,r=0,o=t;r<o.length;r++){var a=o[r];if(a<0||a>=this.shape[n]){var i="Requested out of range element at "+t+".   Buffer shape="+this.shape;throw new Error(i)}n++;}for(var u=t[t.length-1],s=0;s<t.length-1;++s)u+=this.strides[s]*t[s];return this.values[u]},t.prototype.locToIndex=function(t){if(0===this.rank)return 0;if(1===this.rank)return t[0];for(var e=t[t.length-1],n=0;n<t.length-1;++n)e+=this.strides[n]*t[n];return e},t.prototype.indexToLoc=function(t){if(0===this.rank)return [];if(1===this.rank)return [t];for(var e=new Array(this.shape.length),n=0;n<e.length-1;++n)e[n]=Math.floor(t/this.strides[n]),t-=e[n]*this.strides[n];return e[e.length-1]=t,e},Object.defineProperty(t.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),t.prototype.toTensor=function(){return ht().makeTensor(this.values,this.shape,this.dtype)},t}(),ht=null,ft=null,pt=null;var dt=function(){function t(t,e,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=w(t),this.strides=q(t),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():"higher";}return t.prototype.flatten=function(){return this.throwIfDisposed(),this.as1D()},t.prototype.asScalar=function(){return this.throwIfDisposed(),g(1===this.size,function(){return "The array must have only 1 element."}),this.reshape([])},t.prototype.as1D=function(){return this.throwIfDisposed(),this.reshape([this.size])},t.prototype.as2D=function(t,e){return this.throwIfDisposed(),this.reshape([t,e])},t.prototype.as3D=function(t,e,n){return this.throwIfDisposed(),this.reshape([t,e,n])},t.prototype.as4D=function(t,e,n,r){return this.throwIfDisposed(),this.reshape([t,e,n,r])},t.prototype.as5D=function(t,e,n,r,o){return this.throwIfDisposed(),this.reshape([t,e,n,r,o])},t.prototype.asType=function(t){return this.throwIfDisposed(),ft.cast(this,t)},Object.defineProperty(t.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),t.prototype.buffer=function(){return n(this,void 0,void 0,function(){var t;return r(this,function(e){switch(e.label){case 0:return [4,this.data()];case 1:return t=e.sent(),[2,ft.buffer(this.shape,this.dtype,t)]}})})},t.prototype.bufferSync=function(){return ft.buffer(this.shape,this.dtype,this.dataSync())},t.prototype.array=function(){return n(this,void 0,void 0,function(){var t;return r(this,function(e){switch(e.label){case 0:return [4,this.data()];case 1:return t=e.sent(),[2,j$2(this.shape,t)]}})})},t.prototype.arraySync=function(){return j$2(this.shape,this.dataSync())},t.prototype.data=function(){return n(this,void 0,void 0,function(){var t,e;return r(this,function(n){switch(n.label){case 0:return this.throwIfDisposed(),t=ht().read(this.dataId),"string"!==this.dtype?[3,2]:[4,t];case 1:e=n.sent();try{return [2,e.map(function(t){return Z(t)})]}catch(t){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}n.label=2;case 2:return [2,t]}})})},t.prototype.dataSync=function(){this.throwIfDisposed();var t=ht().readSync(this.dataId);if("string"===this.dtype)try{return t.map(function(t){return Z(t)})}catch(t){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t},t.prototype.bytes=function(){return n(this,void 0,void 0,function(){var t;return r(this,function(e){switch(e.label){case 0:return this.throwIfDisposed(),[4,ht().read(this.dataId)];case 1:return t=e.sent(),"string"===this.dtype?[2,t]:[2,new Uint8Array(t.buffer)]}})})},t.prototype.dispose=function(){this.isDisposed||(ht().disposeTensor(this),this.isDisposedInternal=!0);},Object.defineProperty(t.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!0,configurable:!0}),t.prototype.throwIfDisposed=function(){if(this.isDisposed)throw new Error("Tensor is disposed.")},t.prototype.toFloat=function(){return this.asType("float32")},t.prototype.toInt=function(){return this.asType("int32")},t.prototype.toBool=function(){return this.asType("bool")},t.prototype.print=function(t){return void 0===t&&(t=!1),ft.print(this,t)},t.prototype.reshape=function(t){return this.throwIfDisposed(),ft.reshape(this,t)},t.prototype.reshapeAs=function(t){return this.throwIfDisposed(),this.reshape(t.shape)},t.prototype.expandDims=function(t){return void 0===t&&(t=0),ft.expandDims(this,t)},t.prototype.cumsum=function(t,e,n){return void 0===t&&(t=0),void 0===e&&(e=!1),void 0===n&&(n=!1),ft.cumsum(this,t,e,n)},t.prototype.squeeze=function(t){return this.throwIfDisposed(),ft.squeeze(this,t)},t.prototype.clone=function(){return this.throwIfDisposed(),ft.clone(this)},t.prototype.oneHot=function(t,e,n){return this.throwIfDisposed(),ft.oneHot(this,t,e,n)},t.prototype.toString=function(t){return void 0===t&&(t=!1),it(this.dataSync(),this.shape,this.dtype,t)},t.prototype.tile=function(t){return this.throwIfDisposed(),ft.tile(this,t)},t.prototype.gather=function(t,e){return void 0===e&&(e=0),this.throwIfDisposed(),ft.gather(this,t,e)},t.prototype.matMul=function(t,e,n){return void 0===e&&(e=!1),void 0===n&&(n=!1),this.throwIfDisposed(),ft.matMul(this,t,e,n)},t.prototype.dot=function(t){return this.throwIfDisposed(),ft.dot(this,t)},t.prototype.norm=function(t,e,n){return void 0===t&&(t="euclidean"),void 0===e&&(e=null),void 0===n&&(n=!1),this.throwIfDisposed(),ft.norm(this,t,e,n)},t.prototype.slice=function(t,e){return this.throwIfDisposed(),ft.slice(this,t,e)},t.prototype.reverse=function(t){return this.throwIfDisposed(),ft.reverse(this,t)},t.prototype.concat=function(e,n){return void 0===n&&(n=0),this.throwIfDisposed(),e instanceof t&&(e=[e]),ft.concat([this].concat(e),n)},t.prototype.split=function(t,e){return void 0===e&&(e=0),this.throwIfDisposed(),ft.split(this,t,e)},t.prototype.stack=function(t,e){return void 0===e&&(e=0),ft.stack([this,t],e)},t.prototype.unstack=function(t){return void 0===t&&(t=0),ft.unstack(this,t)},t.prototype.pad=function(t,e){return void 0===e&&(e=0),ft.pad(this,t,e)},t.prototype.batchNormalization=function(t,e,n,r,o){return void 0===n&&(n=.001),pt("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon"),this.batchNorm(t,e,o,r,n)},t.prototype.batchNorm=function(t,e,n,r,o){return void 0===o&&(o=.001),this.throwIfDisposed(),ft.batchNorm(this,t,e,n,r,o)},t.prototype.all=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.all(this,t,e)},t.prototype.any=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.any(this,t,e)},t.prototype.logSumExp=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.logSumExp(this,t,e)},t.prototype.sum=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.sum(this,t,e)},t.prototype.prod=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.prod(this,t,e)},t.prototype.mean=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.mean(this,t,e)},t.prototype.min=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.min(this,t,e)},t.prototype.max=function(t,e){return void 0===t&&(t=null),void 0===e&&(e=!1),this.throwIfDisposed(),ft.max(this,t,e)},t.prototype.argMin=function(t){return void 0===t&&(t=null),this.throwIfDisposed(),ft.argMin(this,t)},t.prototype.argMax=function(t){return void 0===t&&(t=null),this.throwIfDisposed(),ft.argMax(this,t)},t.prototype.cast=function(t){return this.throwIfDisposed(),ft.cast(this,t)},t.prototype.add=function(t){return this.throwIfDisposed(),ft.add(this,t)},t.prototype.addStrict=function(t){return this.throwIfDisposed(),ft.addStrict(this,t)},t.prototype.atan2=function(t){return this.throwIfDisposed(),ft.atan2(this,t)},t.prototype.sub=function(t){return this.throwIfDisposed(),ft.sub(this,t)},t.prototype.subStrict=function(t){return this.throwIfDisposed(),ft.subStrict(this,t)},t.prototype.pow=function(t){return this.throwIfDisposed(),ft.pow(this,t)},t.prototype.powStrict=function(t){return this.throwIfDisposed(),ft.powStrict(this,t)},t.prototype.mul=function(t){return this.throwIfDisposed(),ft.mul(this,t)},t.prototype.mulStrict=function(t){return this.throwIfDisposed(),ft.mulStrict(this,t)},t.prototype.div=function(t){return this.throwIfDisposed(),ft.div(this,t)},t.prototype.divNoNan=function(t){return this.throwIfDisposed(),ft.divNoNan(this,t)},t.prototype.floorDiv=function(t){return this.throwIfDisposed(),ft.floorDiv(this,t)},t.prototype.divStrict=function(t){return this.throwIfDisposed(),ft.divStrict(this,t)},t.prototype.minimum=function(t){return this.throwIfDisposed(),ft.minimum(this,t)},t.prototype.minimumStrict=function(t){return this.throwIfDisposed(),ft.minimumStrict(this,t)},t.prototype.maximum=function(t){return this.throwIfDisposed(),ft.maximum(this,t)},t.prototype.maximumStrict=function(t){return this.throwIfDisposed(),ft.maximumStrict(this,t)},t.prototype.mod=function(t){return this.throwIfDisposed(),ft.mod(this,t)},t.prototype.modStrict=function(t){return this.throwIfDisposed(),ft.modStrict(this,t)},t.prototype.squaredDifference=function(t){return this.throwIfDisposed(),ft.squaredDifference(this,t)},t.prototype.squaredDifferenceStrict=function(t){return this.throwIfDisposed(),ft.squaredDifferenceStrict(this,t)},t.prototype.transpose=function(t){return this.throwIfDisposed(),ft.transpose(this,t)},t.prototype.notEqual=function(t){return this.throwIfDisposed(),ft.notEqual(this,t)},t.prototype.notEqualStrict=function(t){return this.throwIfDisposed(),ft.notEqualStrict(this,t)},t.prototype.less=function(t){return this.throwIfDisposed(),ft.less(this,t)},t.prototype.lessStrict=function(t){return this.throwIfDisposed(),ft.lessStrict(this,t)},t.prototype.equal=function(t){return this.throwIfDisposed(),ft.equal(this,t)},t.prototype.equalStrict=function(t){return this.throwIfDisposed(),ft.equalStrict(this,t)},t.prototype.lessEqual=function(t){return this.throwIfDisposed(),ft.lessEqual(this,t)},t.prototype.lessEqualStrict=function(t){return this.throwIfDisposed(),ft.lessEqualStrict(this,t)},t.prototype.greater=function(t){return this.throwIfDisposed(),ft.greater(this,t)},t.prototype.greaterStrict=function(t){return this.throwIfDisposed(),ft.greaterStrict(this,t)},t.prototype.greaterEqual=function(t){return this.throwIfDisposed(),ft.greaterEqual(this,t)},t.prototype.greaterEqualStrict=function(t){return this.throwIfDisposed(),ft.greaterEqualStrict(this,t)},t.prototype.logicalAnd=function(t){return this.throwIfDisposed(),ft.logicalAnd(this,t)},t.prototype.logicalOr=function(t){return this.throwIfDisposed(),ft.logicalOr(this,t)},t.prototype.logicalNot=function(){return this.throwIfDisposed(),ft.logicalNot(this)},t.prototype.logicalXor=function(t){return this.throwIfDisposed(),ft.logicalXor(this,t)},t.prototype.where=function(t,e){return this.throwIfDisposed(),ft.where(t,this,e)},t.prototype.neg=function(){return this.throwIfDisposed(),ft.neg(this)},t.prototype.ceil=function(){return this.throwIfDisposed(),ft.ceil(this)},t.prototype.floor=function(){return this.throwIfDisposed(),ft.floor(this)},t.prototype.sign=function(){return this.throwIfDisposed(),ft.sign(this)},t.prototype.isNaN=function(){return this.throwIfDisposed(),ft.isNaN(this)},t.prototype.isInf=function(){return this.throwIfDisposed(),ft.isInf(this)},t.prototype.isFinite=function(){return this.throwIfDisposed(),ft.isFinite(this)},t.prototype.exp=function(){return this.throwIfDisposed(),ft.exp(this)},t.prototype.expm1=function(){return this.throwIfDisposed(),ft.expm1(this)},t.prototype.log=function(){return this.throwIfDisposed(),ft.log(this)},t.prototype.log1p=function(){return this.throwIfDisposed(),ft.log1p(this)},t.prototype.sqrt=function(){return this.throwIfDisposed(),ft.sqrt(this)},t.prototype.rsqrt=function(){return this.throwIfDisposed(),ft.rsqrt(this)},t.prototype.square=function(){return this.throwIfDisposed(),ft.square(this)},t.prototype.reciprocal=function(){return this.throwIfDisposed(),ft.reciprocal(this)},t.prototype.abs=function(){return this.throwIfDisposed(),ft.abs(this)},t.prototype.clipByValue=function(t,e){return this.throwIfDisposed(),ft.clipByValue(this,t,e)},t.prototype.relu=function(){return this.throwIfDisposed(),ft.relu(this)},t.prototype.relu6=function(){return this.throwIfDisposed(),ft.relu6(this)},t.prototype.elu=function(){return this.throwIfDisposed(),ft.elu(this)},t.prototype.selu=function(){return this.throwIfDisposed(),ft.selu(this)},t.prototype.leakyRelu=function(t){return void 0===t&&(t=.2),this.throwIfDisposed(),ft.leakyRelu(this,t)},t.prototype.prelu=function(t){return this.throwIfDisposed(),ft.prelu(this,t)},t.prototype.sigmoid=function(){return this.throwIfDisposed(),ft.sigmoid(this)},t.prototype.logSigmoid=function(){return this.throwIfDisposed(),ft.logSigmoid(this)},t.prototype.softplus=function(){return this.throwIfDisposed(),ft.softplus(this)},t.prototype.zerosLike=function(){return this.throwIfDisposed(),ft.zerosLike(this)},t.prototype.onesLike=function(){return this.throwIfDisposed(),ft.onesLike(this)},t.prototype.sin=function(){return this.throwIfDisposed(),ft.sin(this)},t.prototype.cos=function(){return this.throwIfDisposed(),ft.cos(this)},t.prototype.tan=function(){return this.throwIfDisposed(),ft.tan(this)},t.prototype.asin=function(){return this.throwIfDisposed(),ft.asin(this)},t.prototype.acos=function(){return this.throwIfDisposed(),ft.acos(this)},t.prototype.atan=function(){return this.throwIfDisposed(),ft.atan(this)},t.prototype.sinh=function(){return this.throwIfDisposed(),ft.sinh(this)},t.prototype.cosh=function(){return this.throwIfDisposed(),ft.cosh(this)},t.prototype.tanh=function(){return this.throwIfDisposed(),ft.tanh(this)},t.prototype.asinh=function(){return this.throwIfDisposed(),ft.asinh(this)},t.prototype.acosh=function(){return this.throwIfDisposed(),ft.acosh(this)},t.prototype.atanh=function(){return this.throwIfDisposed(),ft.atanh(this)},t.prototype.erf=function(){return this.throwIfDisposed(),ft.erf(this)},t.prototype.round=function(){return this.throwIfDisposed(),ft.round(this)},t.prototype.step=function(t){return void 0===t&&(t=0),this.throwIfDisposed(),ft.step(this,t)},t.prototype.softmax=function(t){return void 0===t&&(t=-1),this.throwIfDisposed(),ft.softmax(this,t)},t.prototype.logSoftmax=function(t){return void 0===t&&(t=-1),this.throwIfDisposed(),ft.logSoftmax(this,t)},t.prototype.resizeBilinear=function(t,e){return void 0===e&&(e=!1),this.throwIfDisposed(),ft.image.resizeBilinear(this,t,e)},t.prototype.resizeNearestNeighbor=function(t,e){return void 0===e&&(e=!1),this.throwIfDisposed(),ft.image.resizeNearestNeighbor(this,t,e)},t.prototype.conv1d=function(t,e,n,r,o,a){return void 0===r&&(r="NWC"),void 0===o&&(o=1),this.throwIfDisposed(),ft.conv1d(this,t,e,n,r,o,a)},t.prototype.conv2d=function(t,e,n,r,o,a){return void 0===r&&(r="NHWC"),void 0===o&&(o=[1,1]),this.throwIfDisposed(),ft.conv2d(this,t,e,n,r,o,a)},t.prototype.conv2dTranspose=function(t,e,n,r,o){return this.throwIfDisposed(),ft.conv2dTranspose(this,t,e,n,r,o)},t.prototype.depthwiseConv2D=function(t,e,n,r,o,a){return void 0===r&&(r="NHWC"),void 0===o&&(o=[1,1]),this.throwIfDisposed(),ft.depthwiseConv2d(this,t,e,n,r,o,a)},t.prototype.separableConv2d=function(t,e,n,r,o,a){return void 0===o&&(o=[1,1]),void 0===a&&(a="NHWC"),this.throwIfDisposed(),ft.separableConv2d(this,t,e,n,r,o,a)},t.prototype.avgPool=function(t,e,n,r){return this.throwIfDisposed(),ft.avgPool(this,t,e,n,r)},t.prototype.maxPool=function(t,e,n,r){return this.throwIfDisposed(),ft.maxPool(this,t,e,n,r)},t.prototype.localResponseNormalization=function(t,e,n,r){return void 0===t&&(t=5),void 0===e&&(e=1),void 0===n&&(n=1),void 0===r&&(r=.5),ft.localResponseNormalization(this,t,e,n,r)},t.prototype.pool=function(t,e,n,r,o){return this.throwIfDisposed(),ft.pool(this,t,e,n,r,o)},t.prototype.variable=function(t,e,n){return void 0===t&&(t=!0),this.throwIfDisposed(),ht().makeVariable(this,t,e,n)},t.prototype.unsortedSegmentSum=function(t,e){return this.throwIfDisposed(),ft.unsortedSegmentSum(this,t,e)},t.prototype.batchToSpaceND=function(t,e){return this.throwIfDisposed(),ft.batchToSpaceND(this,t,e)},t.prototype.spaceToBatchND=function(t,e){return this.throwIfDisposed(),ft.spaceToBatchND(this,t,e)},t.prototype.topk=function(t,e){return void 0===t&&(t=1),void 0===e&&(e=!0),this.throwIfDisposed(),ft.topk(this,t,e)},t.prototype.stridedSlice=function(t,e,n,r,o,a,i,u){return void 0===r&&(r=0),void 0===o&&(o=0),void 0===a&&(a=0),void 0===i&&(i=0),void 0===u&&(u=0),this.throwIfDisposed(),ft.stridedSlice(this,t,e,n,r,o,a,i,u)},t.prototype.depthToSpace=function(t,e){return this.throwIfDisposed(),ft.depthToSpace(this,t,e)},t.prototype.fft=function(){return this.throwIfDisposed(),ft.spectral.fft(this)},t.prototype.ifft=function(){return this.throwIfDisposed(),ft.spectral.ifft(this)},t.prototype.rfft=function(){return this.throwIfDisposed(),ft.spectral.rfft(this)},t.prototype.irfft=function(){return this.throwIfDisposed(),ft.spectral.irfft(this)},t}();Object.defineProperty(dt,Symbol.hasInstance,{value:function(t){return !!t&&null!=t.dataId&&null!=t.shape&&null!=t.dtype}});var vt,mt,gt,yt,xt,bt=function(t){function n(e,n,r,o){var a=t.call(this,e.shape,e.dtype,e.dataId,o)||this;return a.trainable=n,a.name=r,a}return e(n,t),n.prototype.assign=function(t){if(t.dtype!==this.dtype)throw new Error("dtype of the new value ("+t.dtype+") and previous value ("+this.dtype+") must match");if(!C(t.shape,this.shape))throw new Error("shape of the new value ("+t.shape+") and previous value ("+this.shape+") must match");ht().disposeTensor(this),this.dataId=t.dataId,ht().incRef(this,null);},n.prototype.dispose=function(){ht().disposeVariable(this),this.isDisposedInternal=!0;},n}(dt);Object.defineProperty(bt,Symbol.hasInstance,{value:function(t){return t instanceof dt&&null!=t.assign&&t.assign instanceof Function}}),function(t){t.R0="R0",t.R1="R1",t.R2="R2",t.R3="R3",t.R4="R4",t.R5="R5",t.R6="R6";}(vt||(vt={})),function(t){t.float32="float32",t.int32="int32",t.bool="int32",t.complex64="complex64";}(mt||(mt={})),function(t){t.float32="float32",t.int32="int32",t.bool="bool",t.complex64="complex64";}(gt||(gt={})),function(t){t.float32="float32",t.int32="float32",t.bool="float32",t.complex64="complex64";}(yt||(yt={})),function(t){t.float32="complex64",t.int32="complex64",t.bool="complex64",t.complex64="complex64";}(xt||(xt={}));var wt={float32:yt,int32:mt,bool:gt,complex64:xt};function Ct(t,e){if("string"===t||"string"===e){if("string"===t&&"string"===e)return "string";throw new Error("Can not upcast "+t+" with "+e)}return wt[t][e]}function Et(t){return Ct(t,"int32")}function Rt(t,e){if(t.dtype===e.dtype)return [t,e];var n=Ct(t.dtype,e.dtype);return [t.cast(n),e.cast(n)]}function It(t,e){g(t.dtype===e.dtype,function(){return "The dtypes of the first("+t.dtype+") and second("+e.dtype+") input must match"});}function kt(t){var e=[];return function t(e,n,r){if(null==e)return;if(e instanceof dt)return void n.push(e);if(o=e,!Array.isArray(o)&&"object"!=typeof o)return;var o;var a=e;for(var i in a){var u=a[i];r.has(u)||(r.add(u),t(u,n,r));}}(t,e,new Set),e}var St,At=Object.freeze({makeTypesMatch:Rt,assertTypesMatch:It,isTensorInList:function(t,e){for(var n=0;n<e.length;n++)if(e[n].id===t.id)return !0;return !1},getTensorsInContainer:kt}),Dt=function(){function t(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null};}return t.prototype.dispose=function(){for(var t in this.registeredVariables)this.registeredVariables[t].dispose();},t}(),Tt=function(){function t(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Dt;}return t.prototype.ready=function(){return n(this,void 0,void 0,function(){var t,e,n;return r(this,function(r){switch(r.label){case 0:if(null!=this.pendingBackendInit)return [2,this.pendingBackendInit.then(function(){})];if(null!=this.backendInstance)return [2];t=this.getSortedBackends(),e=0,r.label=1;case 1:return e<t.length?(n=t[e],[4,this.initializeBackend(n).success]):[3,5];case 2:return r.sent()?[4,this.setBackend(n)]:[3,4];case 3:return r.sent(),[2];case 4:return e++,[3,1];case 5:throw new Error("Could not initialize any backends, all backend initializations failed.")}})})},Object.defineProperty(t.prototype,"backend",{get:function(){if(null!=this.pendingBackendInit)throw new Error("Backend '"+this.backendName+"' has not yet been initialized. Make sure to await tf.ready() before calling other methods");if(null==this.backendInstance){var t=this.initializeBackendsAndReturnBest(),e=t.name;if(t.asyncInit)throw new Error("The highest priority backend '"+e+"' has not yet been initialized. Make sure to await tf.ready() before calling other methods");this.setBackend(e);}return this.backendInstance},enumerable:!0,configurable:!0}),t.prototype.backendNames=function(){return Object.keys(this.registryFactory)},t.prototype.findBackend=function(t){if(!(t in this.registry)){if(!(t in this.registryFactory))return null;if(this.initializeBackend(t).asyncInit)return null}return this.registry[t]},t.prototype.findBackendFactory=function(t){return t in this.registryFactory?this.registryFactory[t].factory:null},t.prototype.registerBackend=function(t,e,n){return void 0===n&&(n=1),t in this.registryFactory?(console.warn(t+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[t]={factory:e,priority:n},!0)},t.prototype.setBackend=function(t){return n(this,void 0,void 0,function(){var e,n,o;return r(this,function(r){switch(r.label){case 0:if(null==this.registryFactory[t])throw new Error("Backend name '"+t+"' not found in registry");return this.backendName=t,null!=this.registry[t]?[3,4]:(this.backendInstance=null,e=this.initializeBackend(t),n=e.success,e.asyncInit?[4,n]:[3,2]);case 1:return o=r.sent(),[3,3];case 2:o=n,r.label=3;case 3:if(!o)return [2,!1];r.label=4;case 4:return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new et(this.backendInstance),[2,!0]}})})},t.prototype.setupRegisteredKernels=function(){var t=this;c(this.backendName).forEach(function(e){null!=e.setupFunc&&e.setupFunc(t.backendInstance);});},t.prototype.disposeRegisteredKernels=function(t){var e=this;c(t).forEach(function(n){null!=n.disposeFunc&&n.disposeFunc(e.registry[t]);});},t.prototype.initializeBackend=function(t){var e=this,n=this.registryFactory[t];if(null==n)throw new Error("Cannot initialize backend "+t+", no registration found.");try{var r=n.factory();if(Promise.resolve(r)===r){var o=++this.pendingBackendInitId,a=r.then(function(n){return !(o<e.pendingBackendInitId)&&(e.registry[t]=n,e.pendingBackendInit=null,!0)}).catch(function(n){return !(o<e.pendingBackendInitId)&&(e.pendingBackendInit=null,console.warn("Initialization of backend "+t+" failed"),console.warn(n.stack||n.message),!1)});return this.pendingBackendInit=a,{success:a,asyncInit:!0}}return this.registry[t]=r,{success:!0,asyncInit:!1}}catch(e){return console.warn("Initialization of backend "+t+" failed"),console.warn(e.stack||e.message),{success:!1,asyncInit:!1}}},t.prototype.removeBackend=function(t){if(!(t in this.registryFactory))throw new Error(t+" backend not found in registry");this.backendName===t&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null);},t.prototype.getSortedBackends=function(){var t=this;if(0===Object.keys(this.registryFactory).length)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort(function(e,n){return t.registryFactory[n].priority-t.registryFactory[e].priority})},t.prototype.initializeBackendsAndReturnBest=function(){for(var t=this.getSortedBackends(),e=0;e<t.length;e++){var n=t[e],r=this.initializeBackend(n),o=r.success,a=r.asyncInit;if(a||o)return {name:n,asyncInit:a}}throw new Error("Could not initialize any backends, all backend initializations failed.")},t.prototype.moveData=function(t,e){var n=this.state.tensorInfo.get(e),r=n.backend,o=this.readSync(e);r.disposeData(e),n.backend=t,t.move(e,o,n.shape,n.dtype),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++;},t.prototype.tidy=function(t,e){var n,r=this,o=null;if(null==e){if("function"!=typeof t)throw new Error("Please provide a function to tidy()");e=t;}else{if("string"!=typeof t&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof e)throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=t;}return this.scopedRun(function(){return r.startScope(o)},function(){return r.endScope(n)},function(){return (n=e())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n})},t.prototype.scopedRun=function(t,e,n){t();try{var r=n();return e(),r}catch(t){throw e(),t}},t.prototype.nextTensorId=function(){return t.nextTensorId++},t.prototype.nextVariableId=function(){return t.nextVariableId++},t.prototype.clone=function(t){var e=this.makeTensorFromDataId(t.dataId,t.shape,t.dtype),n={x:t};return this.addTapeNode(this.state.activeScope.name,n,[e],function(t){return {x:function(){return t.toFloat()}}},[]),e},t.prototype.runKernel=function(t,e,n,r,o){return this.runKernelFunc(null,e,null,t,n,r,o)},t.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},t.prototype.checkKernelForMemLeak=function(t,e,n){var r=this.backend.numDataIds(),o=0;n.forEach(function(t){o+="complex64"===t.dtype?3:1;});var a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=r-e-o-a;if(i>0)throw new Error("Backend '"+this.backendName+"' has an internal memory leak ("+i+" data ids) after running '"+t+"'")},t.prototype.runKernelFunc=function(t,e,n,r,o,a,i){var u,c=this;void 0===a&&(a=[]),void 0===i&&(i=[]);var l,h=[],f=this.isTapeOn(),p=null!=this.state.activeScope?this.state.activeScope.name:"",d=function(t){f&&(h=t.map(function(t){return c.keep(c.clone(t))}));},v=this.state.numBytes,m=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);var g,y=s(r,this.backendName);return l=null!=y?function(){var t=c.backend.numDataIds();g=y.kernelFunc({inputs:e,attrs:o,backend:c.backend});var n=Array.isArray(g)?g:[g];c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(p,t,n);var r=n.map(function(t){var e=t.dataId,n=t.shape,r=t.dtype;return c.makeTensorFromDataId(e,n,r)}),u=r.filter(function(t,e){return i[e]});return d(a.slice().concat(u)),r}:function(){var e=c.backend.numDataIds();g=c.tidy(function(){return t(c.backend,d)});var n=Array.isArray(g)?g:[g];return c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(p,e,n),n},this.scopedRun(function(){return c.state.kernelDepth++},function(){return c.state.kernelDepth--},function(){u=c.ENV.getBool("DEBUG")?c.profiler.profileKernel(p,e,function(){return l()}):l();}),f&&this.addTapeNode(p,e,u,n,h),this.state.profiling&&this.state.activeProfile.kernels.push({name:p,bytesAdded:this.state.numBytes-v,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-m,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(e).map(function(t){return e[t].shape}),outputShapes:u.map(function(t){return t.shape})}),Array.isArray(g)?u:u[0]},t.prototype.makeTensor=function(t,e,n,r){if(null==t)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",r=r||this.backend;var o=t;"string"===n&&W(t[0])&&(o=t.map(function(t){return J(t)}));var a=r.write(o,e,n),i=new dt(e,n,a,this.nextTensorId());if(this.incRef(i,r),"string"===n){var u=this.state.tensorInfo.get(a),s=L(o);this.state.numBytes+=s-u.bytes,u.bytes=s;}return i},t.prototype.makeTensorFromDataId=function(t,e,n,r){var o=new dt(e,n=n||"float32",t,this.nextTensorId());return this.incRef(o,r),o},t.prototype.makeVariable=function(t,e,n,r){void 0===e&&(e=!0),n=n||this.nextVariableId().toString(),null!=r&&r!==t.dtype&&(t=t.asType(r));var o=new bt(t,e,n,this.nextTensorId());if(null!=this.state.registeredVariables[o.name])throw new Error("Variable with name "+o.name+" was already registered");return this.state.registeredVariables[o.name]=o,this.incRef(o,this.backend),o},t.prototype.incRef=function(t,e){var n=this.state.tensorInfo.has(t.dataId)?this.state.tensorInfo.get(t.dataId).refCount:0;if(this.state.numTensors++,"string"===t.dtype&&this.state.numStringTensors++,0===n){this.state.numDataBuffers++;var r=0;"complex64"!==t.dtype&&"string"!==t.dtype&&(r=t.size*P(t.dtype)),this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:r,refCount:0}),this.state.numBytes+=r;}this.state.tensorInfo.get(t.dataId).refCount++,t instanceof bt||this.track(t);},t.prototype.disposeTensor=function(t){if(this.state.tensorInfo.has(t.dataId)){this.state.numTensors--,"string"===t.dtype&&this.state.numStringTensors--;var e=this.state.tensorInfo.get(t.dataId);e.refCount<=1?("complex64"!==t.dtype&&(this.state.numBytes-=e.bytes),this.state.numDataBuffers--,e.backend.disposeData(t.dataId),this.state.tensorInfo.delete(t.dataId)):this.state.tensorInfo.get(t.dataId).refCount--;}},t.prototype.disposeVariables=function(){for(var t in this.state.registeredVariables){var e=this.state.registeredVariables[t];this.disposeVariable(e);}},t.prototype.disposeVariable=function(t){this.disposeTensor(t),null!=this.state.registeredVariables[t.name]&&delete this.state.registeredVariables[t.name];},t.prototype.memory=function(){var t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,null==t.reasons&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t},t.prototype.profile=function(t){return n(this,void 0,void 0,function(){var e,n;return r(this,function(r){return this.state.profiling=!0,e=this.state.numBytes,n=this.state.numTensors,this.state.activeProfile.kernels=[],this.state.activeProfile.result=t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,this.state.activeProfile.kernels.map(function(t){return t.totalBytesSnapshot})),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-n,[2,this.state.activeProfile]})})},t.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&0===this.state.kernelDepth},t.prototype.addTapeNode=function(t,e,n,r,o){var a=this,i={id:this.state.nextTapeNodeId++,name:t,inputs:e,outputs:n,saved:o};null!=r&&(i.gradient=function(t){return t=t.map(function(t,e){if(null==t){var r=n[e],o=$(r.size,r.dtype);return a.makeTensor(o,r.shape,r.dtype)}return t}),r(t.length>1?t:t[0],o)}),this.state.activeTape.push(i);},t.prototype.keep=function(t){return t.kept=!0,t},t.prototype.startTape=function(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++;},t.prototype.endTape=function(){this.state.gradientDepth--;},t.prototype.startScope=function(t){var e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e;},t.prototype.endScope=function(t){for(var e=this,n=kt(t),r=new Set(n.map(function(t){return t.id})),o=0;o<this.state.activeScope.track.length;o++){var a=this.state.activeScope.track[o];a.kept||r.has(a.id)||a.dispose();}var i=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(function(t){t.kept||t.scopeId!==i.id||e.track(t);});},t.prototype.gradients=function(t,e,n,r){var o=this;if(void 0===r&&(r=!1),g(e.length>0,function(){return "gradients() received an empty list of xs."}),null!=n&&"float32"!==n.dtype)throw new Error("dy must have 'float32' dtype, but has '"+n.dtype+"'");var a=this.scopedRun(function(){return o.startTape()},function(){return o.endTape()},function(){return o.tidy("forward",t)});g(a instanceof dt,function(){return "The result y returned by f() must be a tensor."});var i=function(t,e,n){for(var r={},o={},a=0;a<e.length;a++)r[e[a].id]=!0;for(a=0;a<t.length;a++){var i=(d=t[a]).inputs;for(var u in i){for(var s=i[u],c=!1,l=0;l<e.length;l++)if(r[s.id]){d.outputs.forEach(function(t){return r[t.id]=!0}),c=!0,o[d.id]=!0;break}if(c)break}}var h={};h[n.id]=!0;var f={};for(a=t.length-1;a>=0;a--)for(i=(d=t[a]).inputs,l=0;l<d.outputs.length;l++)if(h[d.outputs[l].id]){for(var u in i)h[i[u].id]=!0,f[d.id]=!0;break}var p=[];for(a=0;a<t.length;a++){var d;if(o[(d=t[a]).id]&&f[d.id]){var v={};for(var u in d.inputs){var m=d.inputs[u];r[m.id]&&(v[u]=m);}var g=Object.assign({},d);g.inputs=v,g.outputs=d.outputs,p.push(g);}}return p}(this.state.activeTape,e,a);if(!r&&0===i.length&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",function(){var t,r,u={};u[a.id]=null==n?(t=a.shape,r=X(w(t),"float32"),Nt.makeTensor(r,t,"float32")):n,function(t,e,n){for(var r=function(r){var o=e[r],a=[];if(o.outputs.forEach(function(e){var n=t[e.id];null!=n?a.push(n):a.push(null);}),null==o.gradient)throw new Error("Cannot compute gradient: gradient function not found for "+o.name+".");var i=o.gradient(a),u=function(e){if(!(e in i))throw new Error("Cannot backprop through input "+e+". Available gradients found: "+Object.keys(i)+".");var r=n(function(){return i[e]()});if("float32"!==r.dtype)throw new Error("Error in gradient for op "+o.name+". The gradient of input "+e+" must have 'float32' dtype, but has '"+r.dtype+"'");var a=o.inputs[e];if(!C(r.shape,a.shape))throw new Error("Error in gradient for op "+o.name+". The gradient of input '"+e+"' has shape '"+r.shape+"', which does not match the shape of the input '"+a.shape+"'");if(null==t[a.id])t[a.id]=r;else{var u=t[a.id];t[a.id]=u.add(r),u.dispose();}};for(var s in o.inputs)u(s);},o=e.length-1;o>=0;o--)r(o);}(u,i,function(t){return o.tidy(t)});var s=e.map(function(t){return u[t.id]});return 0===o.state.gradientDepth&&(o.state.activeTape.forEach(function(t){for(var e in t.saved)t.saved[e].dispose();}),o.state.activeTape=null),{value:a,grads:s}})},t.prototype.customGrad=function(t){var e=this;return g(G(t),function(){return "The f passed in customGrad(f) must be a function."}),function(){for(var n,r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];g(r.every(function(t){return t instanceof dt}),function(){return "The args passed in customGrad(f)(x1, x2,...) must all be tensors"});var a={};return r.forEach(function(t,e){a[e]=t;}),e.runKernelFunc(function(e,o){return g((n=t.apply(void 0,r.concat([o]))).value instanceof dt,function(){return "The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"}),g(G(n.gradFunc),function(){return "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."}),n.value},a,function(t,e){var o=n.gradFunc(t,e),a=Array.isArray(o)?o:[o];g(a.length===r.length,function(){return "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."}),g(a.every(function(t){return t instanceof dt}),function(){return "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."});var i={};return a.forEach(function(t,e){i[e]=function(){return t};}),i})}},t.prototype.readSync=function(t){return this.state.tensorInfo.get(t).backend.readSync(t)},t.prototype.read=function(t){return this.state.tensorInfo.get(t).backend.read(t)},t.prototype.fromPixels=function(t,e){return this.backend.fromPixels(t,e)},t.prototype.time=function(t){return n(this,void 0,void 0,function(){var e,n;return r(this,function(r){switch(r.label){case 0:return e=Y(),[4,this.backend.time(t)];case 1:return (n=r.sent()).wallMs=Y()-e,[2,n]}})})},t.prototype.track=function(t){return null!=this.state.activeScope&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t},Object.defineProperty(t.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!0,configurable:!0}),t.prototype.reset=function(){for(var t in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Dt,this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null;},t.nextTensorId=0,t.nextVariableId=0,t}();var Nt=function(){var t=function(){if(null==St){var t=void 0;if("undefined"!=typeof window)t=window;else if("undefined"!=typeof global)t=global;else if("undefined"!=typeof process)t=process;else{if("undefined"==typeof self)throw new Error("Could not find a global object");t=self;}St=t;}return St}();if(null==t._tfengine){var e=new o(t);t._tfengine=new Tt(e);}return function(t){i$3=t;}(t._tfengine.ENV),ht=function(){return t._tfengine},t._tfengine}();function Ft(){return "undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}var Ot=a();Ot.registerFlag("DEBUG",function(){return !1},function(t){t&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.");}),Ot.registerFlag("IS_BROWSER",function(){return Ft()}),Ot.registerFlag("IS_NODE",function(){return "undefined"!=typeof process&&void 0!==process.versions&&void 0!==process.versions.node}),Ot.registerFlag("IS_CHROME",function(){return "undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}),Ot.registerFlag("PROD",function(){return !1}),Ot.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",function(){return Ot.getBool("DEBUG")}),Ot.registerFlag("DEPRECATION_WARNINGS_ENABLED",function(){return !0}),Ot.registerFlag("IS_TEST",function(){return !1});var _t,Mt,Bt,Pt={},Lt={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function Wt(t,e){Pt[t]=e;}function Ut(t){t in Pt||(Pt[t]=function(t){if(1!==t&&2!==t)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");var e=Vt(t);if(e.addEventListener("webglcontextlost",function(e){e.preventDefault(),delete Pt[t];},!1),1===t)return e.getContext("webgl",Lt)||e.getContext("experimental-webgl",Lt);return e.getContext("webgl2",Lt)}(t));var e=Pt[t];return e.isContextLost()?(delete Pt[t],Ut(t)):(e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.DITHER),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SAMPLE_COVERAGE),e.enable(e.SCISSOR_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),Pt[t])}function Vt(t){if("undefined"!=typeof OffscreenCanvas&&2===t)return new OffscreenCanvas(300,150);if("undefined"!=typeof document)return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function zt(t,e){return [e,t]}function Gt(t){var e=w(t);return I(Math.ceil(e/4))}function Ht(t,e){return [Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(t/2))]}function qt(t,e){var n,r,o,i,u,s,c,l,h,f=t;return 2===a().getNumber("WEBGL_VERSION")?(n=f.R32F,r=f.R16F,o=f.RGBA16F,i=f.RGBA32F,u=f.RED,s=4,c=1,l=f.HALF_FLOAT,h=f.FLOAT):(n=t.RGBA,r=t.RGBA,o=t.RGBA,i=f.RGBA,u=t.RGBA,s=4,c=4,l=null!=e?e.HALF_FLOAT_OES:null,h=t.FLOAT),{internalFormatFloat:n,internalFormatHalfFloat:r,internalFormatPackedHalfFloat:o,internalFormatPackedFloat:i,textureFormatFloat:u,downloadTextureFormat:t.RGBA,downloadUnpackNumChannels:s,defaultNumChannels:c,textureTypeHalfFloat:l,textureTypeFloat:h}}function Kt(t,e,n){var r=n();return e&&function(t){var e=t.getError();if(e!==t.NO_ERROR)throw new Error("WebGL Error: "+Yt(t,e))}(t),r}!function(t){t[t.DENSE=0]="DENSE",t[t.SHARED_BATCH=1]="SHARED_BATCH";}(_t||(_t={})),function(t){t[t.RENDER=0]="RENDER",t[t.UPLOAD=1]="UPLOAD",t[t.PIXELS=2]="PIXELS",t[t.DOWNLOAD=3]="DOWNLOAD";}(Mt||(Mt={})),function(t){t[t.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",t[t.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",t[t.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",t[t.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",t[t.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16";}(Bt||(Bt={}));var jt=5.96e-8,Xt=65504;function $t(t){return !!(a().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||0===t||jt<Math.abs(t)&&Math.abs(t)<Xt)}function Yt(t,e){switch(e){case t.NO_ERROR:return "NO_ERROR";case t.INVALID_ENUM:return "INVALID_ENUM";case t.INVALID_VALUE:return "INVALID_VALUE";case t.INVALID_OPERATION:return "INVALID_OPERATION";case t.INVALID_FRAMEBUFFER_OPERATION:return "INVALID_FRAMEBUFFER_OPERATION";case t.OUT_OF_MEMORY:return "OUT_OF_MEMORY";case t.CONTEXT_LOST_WEBGL:return "CONTEXT_LOST_WEBGL";default:return "Unknown error code "+e}}function Qt(t,e,n){return be(t,e,function(){return t.getExtension(n)},'Extension "'+n+'" not supported on this browser.')}function Jt(t,e,n){var r=be(t,e,function(){return t.createShader(t.VERTEX_SHADER)},"Unable to create vertex WebGLShader.");if(Kt(t,e,function(){return t.shaderSource(r,n)}),Kt(t,e,function(){return t.compileShader(r)}),!1===t.getShaderParameter(r,t.COMPILE_STATUS))throw console.log(t.getShaderInfoLog(r)),new Error("Failed to compile vertex shader.");return r}function Zt(t,e,n){var r=be(t,e,function(){return t.createShader(t.FRAGMENT_SHADER)},"Unable to create fragment WebGLShader.");if(Kt(t,e,function(){return t.shaderSource(r,n)}),Kt(t,e,function(){return t.compileShader(r)}),!1===t.getShaderParameter(r,t.COMPILE_STATUS))throw function(t,e){var n=ne.exec(e);if(null==n)return console.log("Couldn't parse line number in error: "+e),void console.log(t);for(var r=+n[1],o=t.split("\n"),a=o.length.toString().length+2,i=o.map(function(t,e){return k$1((e+1).toString(),a)+t}),u=0,s=0;s<i.length;s++)u=Math.max(i[s].length,u);var c=i.slice(0,r-1),l=i.slice(r-1,r),h=i.slice(r);console.log(c.join("\n")),console.log(e.split("\n")[0]),console.log("%c "+k$1(l[0],u),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(h.join("\n"));}(n,t.getShaderInfoLog(r)),new Error("Failed to compile fragment shader.");return r}var te,ee,ne=/ERROR: [0-9]+:([0-9]+):/g;function re(t,e){return be(t,e,function(){return t.createProgram()},"Unable to create WebGLProgram.")}function oe(t,e,n){if(Kt(t,e,function(){return t.linkProgram(n)}),!1===t.getProgramParameter(n,t.LINK_STATUS))throw console.log(t.getProgramInfoLog(n)),new Error("Failed to link vertex and fragment shaders.")}function ae(t,e,n){if(Kt(t,e,function(){return t.validateProgram(n)}),!1===t.getProgramParameter(n,t.VALIDATE_STATUS))throw console.log(t.getProgramInfoLog(n)),new Error("Shader program validation failed.")}function ie(t,e,n){var r=be(t,e,function(){return t.createBuffer()},"Unable to create WebGLBuffer");return Kt(t,e,function(){return t.bindBuffer(t.ARRAY_BUFFER,r)}),Kt(t,e,function(){return t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW)}),r}function ue(t,e,n){var r=be(t,e,function(){return t.createBuffer()},"Unable to create WebGLBuffer");return Kt(t,e,function(){return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r)}),Kt(t,e,function(){return t.bufferData(t.ELEMENT_ARRAY_BUFFER,n,t.STATIC_DRAW)}),r}function se(t,e){return be(t,e,function(){return t.createTexture()},"Unable to create WebGLTexture.")}function ce(t,e){var n=a().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(t<=0||e<=0){var r="["+t+"x"+e+"]";throw new Error("Requested texture size "+r+" is invalid.")}if(t>n||e>n){r="["+t+"x"+e+"]";throw new Error("Requested texture size "+r+" greater than WebGL maximum on this browser / GPU "+("["+n+"x"+n+"]")+".")}}function le(t,e){return be(t,e,function(){return t.createFramebuffer()},"Unable to create WebGLFramebuffer.")}function he(t,e,n,r,o,a,i,u){var s=t.getAttribLocation(n,r);return -1!==s&&(Kt(t,e,function(){return t.bindBuffer(t.ARRAY_BUFFER,o)}),Kt(t,e,function(){return t.vertexAttribPointer(s,a,t.FLOAT,!1,i,u)}),Kt(t,e,function(){return t.enableVertexAttribArray(s)}),!0)}function fe(t,e,n,r){we(t,r),Kt(t,e,function(){return t.activeTexture(t.TEXTURE0+r)}),Kt(t,e,function(){return t.bindTexture(t.TEXTURE_2D,n)});}function pe(t,e,n,r){return be(t,e,function(){return t.getUniformLocation(n,r)},'uniform "'+r+'" not present in program.')}function de(t,e,n){return t.getUniformLocation(e,n)}function ve(t,e,n,r,o,a){Kt(t,e,function(){return fe(t,e,r,a)}),Kt(t,e,function(){return t.uniform1i(o,a)});}function me(t,e,n,r){Kt(t,e,function(){return t.bindFramebuffer(t.FRAMEBUFFER,r)}),Kt(t,e,function(){return t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)});}function ge(t,e,n){Kt(t,e,function(){return t.bindFramebuffer(t.FRAMEBUFFER,n)}),Kt(t,e,function(){return t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,null,0)});}function ye(t){var e=t.checkFramebufferStatus(t.FRAMEBUFFER);if(e!==t.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+xe(t,e))}function xe(t,e){switch(e){case t.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case t.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case t.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case t.FRAMEBUFFER_UNSUPPORTED:return "FRAMEBUFFER_UNSUPPORTED";default:return "unknown error "+e}}function be(t,e,n,r){var o=Kt(t,e,function(){return n()});if(null==o)throw new Error(r);return o}function we(t,e){var n=t.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,r=e+t.TEXTURE0;if(r<t.TEXTURE0||r>n)throw new Error("textureUnit must be in "+("[gl.TEXTURE0, gl.TEXTURE"+n+"]")+".")}function Ce(t,e){return void 0===e&&(e=2),w(t.slice(0,t.length-e))}function Ee(t){if(0===t.length)throw Error("Cannot get rows and columns of an empty shape array.");return [t.length>1?t[t.length-2]:1,t[t.length-1]]}function Re(t){var e=[1,1,1];return 0===t.length||1===t.length&&1===t[0]||(e=[Ce(t)].concat(Ee(t))),e}function Ie(t,e){var n;void 0===e&&(e=!1);var r=a().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e&&(r*=2,1===(t=t.map(function(e,n){return n>=t.length-2?v(t[n]):t[n]})).length&&(t=[2,t[0]])),2!==t.length){var o=T(t);t=o.newShape;}var i=w(t);if(t.length<=1&&i<=r)return [1,i];if(2===t.length&&t[0]<=r&&t[1]<=r)return t;if(3===t.length&&t[0]*t[1]<=r&&t[2]<=r)return [t[0]*t[1],t[2]];if(3===t.length&&t[0]<=r&&t[1]*t[2]<=r)return [t[0],t[1]*t[2]];if(4===t.length&&t[0]*t[1]*t[2]<=r&&t[3]<=r)return [t[0]*t[1]*t[2],t[3]];if(4===t.length&&t[0]<=r&&t[1]*t[2]*t[3]<=r)return [t[0],t[1]*t[2]*t[3]];if(e){var u=Ce(t),s=2,c=2;return t.length&&(s=(n=Ee(t))[0],c=n[1]),I(i=u*(s/2)*(c/2)).map(function(t){return 2*t})}return I(i)}function ke(t){return t%2==0}function Se(t,e){if(C(t=t.slice(-2),e=e.slice(-2)))return !0;if(!t.length||!e.length)return !0;if(0===t[0]||0===t[1]||0===e[0]||0===e[1])return !0;if(t.length!==e.length){var n=t.slice(-1)[0],r=e.slice(-1)[0];if(n===r)return !0;if(ke(n)&&ke(r)&&(1===t[0]||1===e[0]))return !0}return t[1]===e[1]&&ke(t[0])&&ke(e[0])}function Ae(t){if(null==te){var e=Ut(t);te=e.getParameter(e.MAX_TEXTURE_SIZE);}return te}function De(t){if(null==ee){var e=Ut(t);ee=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);}return Math.min(16,ee)}function Te(t){if(0===t)return 0;var e=Ut(t);return Ne(e,"EXT_disjoint_timer_query_webgl2")&&2===t?2:Ne(e,"EXT_disjoint_timer_query")?1:0}function Ne(t,e){return null!=t.getExtension(e)}function Fe(t){try{if(null!=Ut(t))return !0}catch(t){return !1}return !1}function Oe(t){if(0===t)return !1;var e=Ut(t);if(1===t){if(!Ne(e,"OES_texture_float"))return !1}else if(!Ne(e,"EXT_color_buffer_float"))return !1;return Me(e)}function _e(t){if(0===t)return !1;var e=Ut(t);if(1!==t){if(Ne(e,"EXT_color_buffer_float"))return Me(e);if(Ne(e,"EXT_color_buffer_half_float")){var n=e.getExtension("EXT_color_buffer_half_float");return function(t,e){var n=qt(t,e),r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r);t.texImage2D(t.TEXTURE_2D,0,n.internalFormatHalfFloat,1,1,0,n.textureFormatFloat,n.textureTypeHalfFloat,null);var o=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0);var a=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;return t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteTexture(r),t.deleteFramebuffer(o),a}(e,n)}return !1}return !!Ne(e,"OES_texture_float")&&(!!Ne(e,"WEBGL_color_buffer_float")&&Me(e))}function Me(t){var e=qt(t),n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n);t.texImage2D(t.TEXTURE_2D,0,e.internalFormatFloat,1,1,0,e.textureFormatFloat,e.textureTypeFloat,null);var r=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0);var o=t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE;return t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteTexture(n),t.deleteFramebuffer(r),o}function Be(t){return 2===t&&null!=Ut(t).fenceSync}var Pe=Object.freeze({callAndCheck:Kt,canBeRepresented:$t,getWebGLErrorMessage:Yt,getExtensionOrThrow:Qt,createVertexShader:Jt,createFragmentShader:Zt,createProgram:re,linkProgram:oe,validateProgram:ae,createStaticVertexBuffer:ie,createStaticIndexBuffer:ue,getNumChannels:function(){return 2===a().getNumber("WEBGL_VERSION")?1:4},createTexture:se,validateTextureSize:ce,createFramebuffer:le,bindVertexBufferToProgramAttribute:he,bindTextureUnit:fe,unbindTextureUnit:function(t,e,n){we(t,n),Kt(t,e,function(){return t.activeTexture(t.TEXTURE0+n)}),Kt(t,e,function(){return t.bindTexture(t.TEXTURE_2D,null)});},getProgramUniformLocationOrThrow:pe,getProgramUniformLocation:de,bindTextureToProgramUniformSampler:ve,bindCanvasToFramebuffer:function(t,e){Kt(t,e,function(){return t.bindFramebuffer(t.FRAMEBUFFER,null)}),Kt(t,e,function(){return t.viewport(0,0,t.canvas.width,t.canvas.height)}),Kt(t,e,function(){return t.scissor(0,0,t.canvas.width,t.canvas.height)});},bindColorTextureToFramebuffer:me,unbindColorTextureFromFramebuffer:ge,validateFramebuffer:ye,getFramebufferErrorMessage:xe,getBatchDim:Ce,getRowsCols:Ee,getShapeAs3D:Re,getTextureShapeFromLogicalShape:Ie,isReshapeFree:Se,getWebGLMaxTextureSize:Ae,resetMaxTextureSize:function(){te=null;},resetMaxTexturesInShader:function(){ee=null;},getMaxTexturesInShader:De,getWebGLDisjointQueryTimerVersion:Te,hasExtension:Ne,isWebGLVersionEnabled:Fe,isCapableOfRenderingToFloatTexture:Oe,isDownloadFloatTextureEnabled:_e,isWebGLFenceEnabled:Be}),Le=a();function We(){a().set("PROD",!0);}function Ue(){a().set("DEBUG",!0);}function Ve(){a().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.");}function ze(t){a().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(t+" You can disable deprecation warnings with tf.disableDeprecationWarnings().");}function Ge(){Nt.disposeVariables();}function He(){return Nt}function qe(){return Nt.memory()}function Ke(t){return Nt.profile(t)}function je(t,e){return Nt.tidy(t,e)}function Xe(t){kt(t).forEach(function(t){return t.dispose()});}function $e(t){return Nt.keep(t)}function Ye(t){return Nt.time(t)}function Qe(t){return Nt.setBackend(t)}function Je(){return Nt.ready()}function Ze(){return Nt.backendName}function tn(t){Nt.removeBackend(t);}function en(t){return Nt.findBackend(t)}function nn(t){return Nt.findBackendFactory(t)}function rn(t,e,n){return void 0===n&&(n=1),Nt.registerBackend(t,e,n)}function on(){return Nt.backend}function an(t,e){a().setPlatform(t,e);}function un(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];a().getBool("IS_TEST")||console.warn.apply(console,t);}function sn(t,e){var n=t;if(B(t))return "string"===e?[]:[t.length];if(!Array.isArray(t))return [];for(var r=[];Array.isArray(n)||B(n)&&"string"!==e;)r.push(n.length),n=n[0];return Array.isArray(t)&&a().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function t(e,n,r){r=r||[];if(!Array.isArray(e)&&!B(e))return void g(0===n.length,function(){return "Element arr["+r.join("][")+"] is a primitive, but should be an array/TypedArray of "+n[0]+" elements"});g(n.length>0,function(){return "Element arr["+r.join("][")+"] should be a primitive, but is an array of "+e.length+" elements"});g(e.length===n[0],function(){return "Element arr["+r.join("][")+"] should have "+n[0]+" elements, but has "+e.length+" elements"});var o=n.slice(1);for(var a=0;a<e.length;++a)t(e[a],o,r.concat(a));}(t,r,[]),r}function cn(t,e,n,r){if(null!=t&&("numeric"!==t&&t!==e||"numeric"===t&&"string"===e))throw new Error("Argument '"+n+"' passed to '"+r+"' must be "+t+" tensor, but got "+e+" tensor")}function ln(t,e,n,r){if(void 0===r&&(r="numeric"),t instanceof dt)return cn(r,t.dtype,e,n),t;var o=z(t);if("string"!==o&&["bool","int32","float32"].indexOf(r)>=0&&(o=r),cn(r,o,e,n),null==t||!B(t)&&!Array.isArray(t)&&"number"!=typeof t&&"boolean"!=typeof t&&"string"!=typeof t){var i=null==t?"null":t.constructor.name;throw new Error("Argument '"+e+"' passed to '"+n+"' must be a Tensor or TensorLike, but got '"+i+"'")}var u=sn(t,o);B(t)||Array.isArray(t)||(t=[t]);var s="string"!==o?K(t,o,a().getBool("DEBUG")):b(t,[],!0);return Nt.makeTensor(s,u,o)}function hn(t,e,n,r){if(void 0===r&&(r="numeric"),!Array.isArray(t))throw new Error("Argument "+e+" passed to "+n+" must be a `Tensor[]` or `TensorLike[]`");return t.map(function(t,r){return ln(t,e+"["+r+"]",n)},r)}function fn(t,e){for(var n=0;n<t.length;++n)if(t[t.length-n-1]!==e-1-n)return !1;return !0}function pn(t,e,n){for(var r=t.length+e.length,o=[],a=0,i=0,u=0;u<r;u++)-1===n.indexOf(u)?o.push(t[a++]):o.push(e[i++]);return o}function dn(t,e){for(var n=[],r=t.length,o=0;o<r;o++)-1===e.indexOf(o)&&n.push(t[o]);return [n,e.map(function(e){return t[e]})]}function vn(t,e){return pn(t,e.map(function(t){return 1}),e)}function mn(t,e,n){g(fn(e,n),function(){return t+" supports only inner-most axes for now. Got axes "+e+" and rank-"+n+" input."});}function gn(t,e){if(fn(t,e))return null;for(var n=[],r=0;r<e;++r)-1===t.indexOf(r)&&n.push(r);return t.forEach(function(t){return n.push(t)}),n}function yn(t){return t.map(function(t,e){return [e,t]}).sort(function(t,e){return t[1]-e[1]}).map(function(t){return t[0]})}function xn(t,e){for(var n=[],r=e-t;r<e;++r)n.push(r);return n}function bn(t,e){var n=t[0].length;t.forEach(function(t,e){g(t.length===n,function(){return "Error in concat"+n+"D: rank of tensors["+e+"] must be the same as the rank of the rest ("+n+")"});}),g(e>=0&&e<n,function(){return "Error in concat"+n+"D: axis must be between 0 and "+(n-1)+"."});var r=t[0];t.forEach(function(t,o){for(var a=0;a<n;a++)g(a===e||t[a]===r[a],function(){return "Error in concat"+n+"D: Shape of tensors["+o+"] ("+t+") does not match the shape of the rest ("+r+") along the non-concatenated axis "+o+"."});});}function wn(t,e){for(var n=t[0].slice(),r=1;r<t.length;r++)n[e]+=t[r][e];return n}function Cn(t){var e=Object.keys(t);if(1!==e.length)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+e.length+" keys.");var n=e[0],r=t[n];n.endsWith("_")&&(n=n.substring(0,n.length-1));var o=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];Nt.startScope(n);try{var o=r.apply(void 0,t);return o instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),Nt.endScope(o),o}catch(t){throw Nt.endScope(null),t}};return Object.defineProperty(o,"name",{value:n,configurable:!0}),o}Le.registerFlag("HAS_WEBGL",function(){return Le.getNumber("WEBGL_VERSION")>0}),Le.registerFlag("WEBGL_VERSION",function(){return Fe(2)?2:Fe(1)?1:0}),Le.registerFlag("WEBGL_BUFFER_SUPPORTED",function(){return 2===Le.get("WEBGL_VERSION")}),Le.registerFlag("WEBGL_CPU_FORWARD",function(){return !0}),Le.registerFlag("WEBGL_FORCE_F16_TEXTURES",function(){return !1}),Le.registerFlag("WEBGL_PACK",function(){return Le.getBool("HAS_WEBGL")}),Le.registerFlag("WEBGL_PACK_NORMALIZATION",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_PACK_CLIP",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_PACK_DEPTHWISECONV",function(){return !1}),Le.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_PACK_REDUCE",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_LAZILY_UNPACK",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_CONV_IM2COL",function(){return Le.getBool("WEBGL_PACK")}),Le.registerFlag("WEBGL_MAX_TEXTURE_SIZE",function(){return Ae(Le.getNumber("WEBGL_VERSION"))}),Le.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",function(){return De(Le.getNumber("WEBGL_VERSION"))}),Le.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",function(){var t=Le.getNumber("WEBGL_VERSION");return 0===t?0:Te(t)}),Le.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",function(){return Le.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&(t=navigator.userAgent||navigator.vendor||window.opera,!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))));var t;}),Le.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",function(){return Oe(Le.getNumber("WEBGL_VERSION"))}),Le.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",function(){return !Le.getBool("WEBGL_FORCE_F16_TEXTURES")&&Le.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")}),Le.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",function(){return _e(Le.getNumber("WEBGL_VERSION"))}),Le.registerFlag("WEBGL_FENCE_API_ENABLED",function(){return Be(Le.getNumber("WEBGL_VERSION"))}),Le.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",function(){return Le.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0}),pt=ze;var En=Cn({complex_:function(t,e){var n=ln(t,"real","complex"),r=ln(e,"imag","complex");return y(n.shape,r.shape,"real and imag shapes, "+n.shape+" and "+r.shape+", must match in call to tf.complex()."),Nt.runKernelFunc(function(t){return t.complex(n,r)},{$real:n,$imag:r})}}),Rn=Cn({real_:function(t){var e=ln(t,"input","real");return Nt.runKernelFunc(function(t){return t.real(e)},{$input:e})}}),In=Cn({imag_:function(t){var e=ln(t,"input","imag");return Nt.runKernelFunc(function(t){return t.imag(e)},{$input:e})}});function kn(t,e,n){return Sn(t,e,sn(t,n),n)}function Sn(t,e,n,r){if(null==r&&(r=z(t)),"complex64"===r)throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!B(t)&&!Array.isArray(t)&&"number"!=typeof t&&"boolean"!=typeof t&&"string"!=typeof t)throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=e){Q(e);var o=w(e),i=w(n);g(o===i,function(){return "Based on the provided shape, ["+e+"], the tensor should have "+o+" values but has "+i});for(var u=0;u<n.length;++u){var s=n[u],c=u!==n.length-1||s!==w(e.slice(u));g(n[u]===e[u]||!c,function(){return "Error creating a new Tensor. Inferred shape ("+n+") does not match the provided shape ("+e+"). "});}}return B(t)||Array.isArray(t)||(t=[t]),e=e||n,t="string"!==r?K(t,r,a().getBool("DEBUG")):b(t,[],!0),Nt.makeTensor(t,e,r)}function An(t,e){if((B(t)&&"string"!==e||Array.isArray(t))&&"complex64"!==e)throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===e&&B(t)&&!(t instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return Sn(t,[],[],e)}function Dn(t,e){x(t);var n=sn(t,e);if(1!==n.length)throw new Error("tensor1d() requires values to be a flat/TypedArray");return Sn(t,null,n,e)}function Tn(t,e,n){if(x(t),null!=e&&2!==e.length)throw new Error("tensor2d() requires shape to have two numbers");var r=sn(t,n);if(2!==r.length&&1!==r.length)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===r.length&&null==e)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return Sn(t,e,r,n)}function Nn(t,e,n){if(x(t),null!=e&&3!==e.length)throw new Error("tensor3d() requires shape to have three numbers");var r=sn(t,n);if(3!==r.length&&1!==r.length)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(1===r.length&&null==e)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return Sn(t,e,r,n)}function Fn(t,e,n){if(x(t),null!=e&&4!==e.length)throw new Error("tensor4d() requires shape to have four numbers");var r=sn(t,n);if(4!==r.length&&1!==r.length)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(1===r.length&&null==e)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return Sn(t,e,r,n)}function On(t,e,n){if(x(t),null!=e&&5!==e.length)throw new Error("tensor5d() requires shape to have five numbers");var r=sn(t,n);if(5!==r.length&&1!==r.length)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(1===r.length&&null==e)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return Sn(t,e,r,n)}function _n(t,e,n){if(x(t),null!=e&&6!==e.length)throw new Error("tensor6d() requires shape to have six numbers");var r=sn(t,n);if(6!==r.length&&1!==r.length)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(1===r.length&&null==e)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return Sn(t,e=e||r,r,n)}function Mn(t,e,n,r){return void 0===e&&(e=!0),Nt.makeVariable(t,e,n,r)}function Bn(t,e){if(void 0===e&&(e="float32"),"complex64"===e){var n=Bn(t,"float32"),r=Pn(t,"float32");return En(n,r)}var o=X(w(t),e);return Nt.makeTensor(o,t,e)}function Pn(t,e){if(void 0===e&&(e="float32"),"complex64"===e){var n=Pn(t,"float32"),r=Pn(t,"float32");return En(n,r)}var o=$(w(t),e);return Nt.makeTensor(o,t,e)}function Ln(t,e,n){return Nt.runKernelFunc(function(r){return r.fill(t,e,n)},{})}function Wn(t,e,n){if(n<=0)throw new Error("The number of values should be positive.");return Nt.runKernelFunc(function(r){return r.linspace(t,e,n)},{})}function Un(t,e,n,r){if(void 0===n&&(n=1),void 0===r&&(r="float32"),0===n)throw new Error("Cannot have a step of zero");if(t===e||t<e&&n<0||e<t&&n>1)return Pn([0],r);var o=$(Math.abs(Math.ceil((e-t)/n)),r);e<t&&1===n&&(n=-1),o[0]=t;for(var a=1;a<o.length;a++)o[a]=o[a-1]+n;return Dn(o,r)}var Vn=Cn({onesLike_:function(t){var e=ln(t,"x","onesLike");if("complex64"===e.dtype){var n=Vn(Rn(e)),r=zn(In(e));return En(n,r)}return Nt.runKernelFunc(function(t){return t.onesLike(e)},{$x:e},function(t,e){return {$x:function(){return zn(t)}}})}}),zn=Cn({zerosLike_:function(t){var e=ln(t,"x","zerosLike");return Nt.runKernelFunc(function(t){return t.zerosLike(e)},{$x:e},function(t,e){return {$x:function(){return zn(t)}}})}});var Gn=Cn({concat_:function(t,e){void 0===e&&(e=0),g(t.length>=1,function(){return "Pass at least one tensor to concat"});var n=hn(t,"tensors","concat");"complex64"===n[0].dtype&&n.forEach(function(t){if("complex64"!==t.dtype)throw new Error("Cannot concatenate complex64 tensors with a tensor\n          with dtype "+t.dtype+". ")}),e=D(e,n[0].shape)[0];var r=wn(n.map(function(t){return t.shape}),e);if(0===w(r))return kn([],r);if(1===(n=n.filter(function(t){return t.size>0})).length)return n[0];var o=n.map(function(t){return t.shape});bn(o,e);var a=n,i={axis:e};return Nt.runKernelFunc(function(t){return t.concat(n,e)},a,function(t){var n=o.map(function(t){return t[e]});return Xn(t,n,e).map(function(t){return function(){return t}})},"Concat",i)}}),Hn=Cn({concat1d_:function(t){return Gn(t,0)}}),qn=Cn({concat2d_:function(t,e){return Gn(t,e)}}),Kn=Cn({concat3d_:function(t,e){return Gn(t,e)}}),jn=Cn({concat4d_:function(t,e){return Gn(t,e)}}),Xn=Cn({split_:function(t,e,n){void 0===n&&(n=0);var r,o=ln(t,"x","split");return n=D(n,o.shape)[0],"number"==typeof e?(g(o.shape[n]%e==0,function(){return "Number of splits must evenly divide the axis."}),r=new Array(e).fill(o.shape[n]/e)):(g(o.shape[n]===e.reduce(function(t,e){return t+e}),function(){return "The sum of sizes must match the size of the axis dimension."}),r=e),Nt.runKernelFunc(function(t){return t.split(o,r,n)},{$x:o},function(t){return {$x:function(){return Gn(t,n)}}})}});function $n(t,e){return t(e={exports:{}},e.exports),e.exports}var Yn=$n(function(t){!function(t,e,n){function r(t){var e,n=this,r=(e=4022871197,function(t){t=t.toString();for(var n=0;n<t.length;n++){var r=.02519603282416938*(e+=t.charCodeAt(n));r-=e=r>>>0,e=(r*=e)>>>0,e+=4294967296*(r-=e);}return 2.3283064365386963e-10*(e>>>0)});n.next=function(){var t=2091639*n.s0+2.3283064365386963e-10*n.c;return n.s0=n.s1,n.s1=n.s2,n.s2=t-(n.c=0|t)},n.c=1,n.s0=r(" "),n.s1=r(" "),n.s2=r(" "),n.s0-=r(t),n.s0<0&&(n.s0+=1),n.s1-=r(t),n.s1<0&&(n.s1+=1),n.s2-=r(t),n.s2<0&&(n.s2+=1),r=null;}function o(t,e){return e.c=t.c,e.s0=t.s0,e.s1=t.s1,e.s2=t.s2,e}function a(t,e){var n=new r(t),a=e&&e.state,i=n.next;return i.int32=function(){return 4294967296*n.next()|0},i.double=function(){return i()+1.1102230246251565e-16*(2097152*i()|0)},i.quick=i,a&&("object"==typeof a&&o(a,n),i.state=function(){return o(n,{})}),i}e&&e.exports?e.exports=a:n&&n.amd?n(function(){return a}):this.alea=a;}(0,t,!1);}),Qn=$n(function(t){!function(t,e,n){function r(t){var e=this,n="";e.x=0,e.y=0,e.z=0,e.w=0,e.next=function(){var t=e.x^e.x<<11;return e.x=e.y,e.y=e.z,e.z=e.w,e.w^=e.w>>>19^t^t>>>8},t===(0|t)?e.x=t:n+=t;for(var r=0;r<n.length+64;r++)e.x^=0|n.charCodeAt(r),e.next();}function o(t,e){return e.x=t.x,e.y=t.y,e.z=t.z,e.w=t.w,e}function a(t,e){var n=new r(t),a=e&&e.state,i=function(){return (n.next()>>>0)/4294967296};return i.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===t);return t},i.int32=n.next,i.quick=i,a&&("object"==typeof a&&o(a,n),i.state=function(){return o(n,{})}),i}e&&e.exports?e.exports=a:n&&n.amd?n(function(){return a}):this.xor128=a;}(0,t,!1);}),Jn=$n(function(t){!function(t,e,n){function r(t){var e=this,n="";e.next=function(){var t=e.x^e.x>>>2;return e.x=e.y,e.y=e.z,e.z=e.w,e.w=e.v,(e.d=e.d+362437|0)+(e.v=e.v^e.v<<4^t^t<<1)|0},e.x=0,e.y=0,e.z=0,e.w=0,e.v=0,t===(0|t)?e.x=t:n+=t;for(var r=0;r<n.length+64;r++)e.x^=0|n.charCodeAt(r),r==n.length&&(e.d=e.x<<10^e.x>>>4),e.next();}function o(t,e){return e.x=t.x,e.y=t.y,e.z=t.z,e.w=t.w,e.v=t.v,e.d=t.d,e}function a(t,e){var n=new r(t),a=e&&e.state,i=function(){return (n.next()>>>0)/4294967296};return i.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===t);return t},i.int32=n.next,i.quick=i,a&&("object"==typeof a&&o(a,n),i.state=function(){return o(n,{})}),i}e&&e.exports?e.exports=a:n&&n.amd?n(function(){return a}):this.xorwow=a;}(0,t,!1);}),Zn=$n(function(t){!function(t,e,n){function r(t){var e=this;e.next=function(){var t,n,r=e.x,o=e.i;return t=r[o],n=(t^=t>>>7)^t<<24,n^=(t=r[o+1&7])^t>>>10,n^=(t=r[o+3&7])^t>>>3,n^=(t=r[o+4&7])^t<<7,t=r[o+7&7],n^=(t^=t<<13)^t<<9,r[o]=n,e.i=o+1&7,n},function(t,e){var n,r=[];if(e===(0|e))r[0]=e;else for(e=""+e,n=0;n<e.length;++n)r[7&n]=r[7&n]<<15^e.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&0===r[n];++n);for(8==n?r[7]=-1:r[n],t.x=r,t.i=0,n=256;n>0;--n)t.next();}(e,t);}function o(t,e){return e.x=t.x.slice(),e.i=t.i,e}function a(t,e){null==t&&(t=+new Date);var n=new r(t),a=e&&e.state,i=function(){return (n.next()>>>0)/4294967296};return i.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===t);return t},i.int32=n.next,i.quick=i,a&&(a.x&&o(a,n),i.state=function(){return o(n,{})}),i}e&&e.exports?e.exports=a:n&&n.amd?n(function(){return a}):this.xorshift7=a;}(0,t,!1);}),tr=$n(function(t){!function(t,e,n){function r(t){var e=this;e.next=function(){var t,n,r=e.w,o=e.X,a=e.i;return e.w=r=r+1640531527|0,n=o[a+34&127],t=o[a=a+1&127],n^=n<<13,t^=t<<17,n^=n>>>15,t^=t>>>12,n=o[a]=n^t,e.i=a,n+(r^r>>>16)|0},function(t,e){var n,r,o,a,i,u=[],s=128;for(e===(0|e)?(r=e,e=null):(e+="\0",r=0,s=Math.max(s,e.length)),o=0,a=-32;a<s;++a)e&&(r^=e.charCodeAt((a+32)%e.length)),0===a&&(i=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,a>=0&&(i=i+1640531527|0,o=0==(n=u[127&a]^=r+i)?o+1:0);for(o>=128&&(u[127&(e&&e.length||0)]=-1),o=127,a=512;a>0;--a)r=u[o+34&127],n=u[o=o+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,u[o]=r^n;t.w=i,t.X=u,t.i=o;}(e,t);}function o(t,e){return e.i=t.i,e.w=t.w,e.X=t.X.slice(),e}function a(t,e){null==t&&(t=+new Date);var n=new r(t),a=e&&e.state,i=function(){return (n.next()>>>0)/4294967296};return i.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===t);return t},i.int32=n.next,i.quick=i,a&&(a.X&&o(a,n),i.state=function(){return o(n,{})}),i}e&&e.exports?e.exports=a:n&&n.amd?n(function(){return a}):this.xor4096=a;}(0,t,!1);}),er=$n(function(t){!function(t,e,n){function r(t){var e=this,n="";e.next=function(){var t=e.b,n=e.c,r=e.d,o=e.a;return t=t<<25^t>>>7^n,n=n-r|0,r=r<<24^r>>>8^o,o=o-t|0,e.b=t=t<<20^t>>>12^n,e.c=n=n-r|0,e.d=r<<16^n>>>16^o,e.a=o-t|0},e.a=0,e.b=0,e.c=-1640531527,e.d=1367130551,t===Math.floor(t)?(e.a=t/4294967296|0,e.b=0|t):n+=t;for(var r=0;r<n.length+20;r++)e.b^=0|n.charCodeAt(r),e.next();}function o(t,e){return e.a=t.a,e.b=t.b,e.c=t.c,e.d=t.d,e}function a(t,e){var n=new r(t),a=e&&e.state,i=function(){return (n.next()>>>0)/4294967296};return i.double=function(){do{var t=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===t);return t},i.int32=n.next,i.quick=i,a&&("object"==typeof a&&o(a,n),i.state=function(){return o(n,{})}),i}e&&e.exports?e.exports=a:n&&n.amd?n(function(){return a}):this.tychei=a;}(0,t,!1);}),nr=$n(function(t){!function(e,n){var r,o=this,a=256,i=6,u="random",s=n.pow(a,i),c=n.pow(2,52),l=2*c,h=a-1;function f(t,h,f){var g=[],y=v(function t(e,n){var r,o=[],a=typeof e;if(n&&"object"==a)for(r in e)try{o.push(t(e[r],n-1));}catch(t){}return o.length?o:"string"==a?e:e+"\0"}((h=1==h?{entropy:!0}:h||{}).entropy?[t,m(e)]:null==t?function(){try{var t;return r&&(t=r.randomBytes)?t=t(a):(t=new Uint8Array(a),(o.crypto||o.msCrypto).getRandomValues(t)),m(t)}catch(t){var n=o.navigator,i=n&&n.plugins;return [+new Date,o,i,o.screen,m(e)]}}():t,3),g),x=new p(g),b=function(){for(var t=x.g(i),e=s,n=0;t<c;)t=(t+n)*a,e*=a,n=x.g(1);for(;t>=l;)t/=2,e/=2,n>>>=1;return (t+n)/e};return b.int32=function(){return 0|x.g(4)},b.quick=function(){return x.g(4)/4294967296},b.double=b,v(m(x.S),e),(h.pass||f||function(t,e,r,o){return o&&(o.S&&d(o,x),t.state=function(){return d(x,{})}),r?(n[u]=t,e):t})(b,y,"global"in h?h.global:this==n,h.state)}function p(t){var e,n=t.length,r=this,o=0,i=r.i=r.j=0,u=r.S=[];for(n||(t=[n++]);o<a;)u[o]=o++;for(o=0;o<a;o++)u[o]=u[i=h&i+t[o%n]+(e=u[o])],u[i]=e;(r.g=function(t){for(var e,n=0,o=r.i,i=r.j,u=r.S;t--;)e=u[o=h&o+1],n=n*a+u[h&(u[o]=u[i=h&i+e])+(u[i]=e)];return r.i=o,r.j=i,n})(a);}function d(t,e){return e.i=t.i,e.j=t.j,e.S=t.S.slice(),e}function v(t,e){for(var n,r=t+"",o=0;o<r.length;)e[h&o]=h&(n^=19*e[h&o])+r.charCodeAt(o++);return m(e)}function m(t){return String.fromCharCode.apply(0,t)}if(n["seed"+u]=f,v(n.random(),e),t.exports){t.exports=f;try{r=require("crypto");}catch(t){}}}([],Math);});nr.alea=Yn,nr.xor128=Qn,nr.xorwow=Jn,nr.xorshift7=Zn,nr.xor4096=tr,nr.tychei=er;var rr=nr.alea,or=function(){function t(t,e,n,r,o){this.mean=t,this.stdDev=e,this.dtype=n,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var a=o||Math.random();this.random=rr(a.toString());}return t.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var t=this.nextVal;return this.nextVal=NaN,t}for(var e,n,r=!1;!r;){var o=void 0,a=void 0,i=void 0;do{i=(o=2*this.random()-1)*o+(a=2*this.random()-1)*a;}while(i>=1||0===i);var u=Math.sqrt(-2*Math.log(i)/i);e=this.mean+this.stdDev*o*u,n=this.mean+this.stdDev*a*u,this.truncated&&!this.isValidTruncated(e)||(r=!0);}return this.truncated&&!this.isValidTruncated(n)||(this.nextVal=this.convertValue(n)),this.convertValue(e)},t.prototype.convertValue=function(t){return null==this.dtype||"float32"===this.dtype?t:Math.round(t)},t.prototype.isValidTruncated=function(t){return t<=this.upper&&t>=this.lower},t}(),ar=function(){function t(t,e,n,r){this.alpha=t,this.beta=1/e,this.dtype=n;var o=r||Math.random();this.randu=rr(o.toString()),this.randn=new or(0,1,n,!1,this.randu()),this.d=t<1?t+2/3:t-1/3,this.c=1/Math.sqrt(9*this.d);}return t.prototype.nextValue=function(){for(var t,e,n,r,o,a;;){do{r=this.randn.nextValue(),a=1+this.c*r;}while(a<=0);if(a*=a*a,e=1-.331*(t=r*r)*t,n=.5*t+this.d*(1-a+Math.log(a)),(o=this.randu())<e||Math.log(o)<n)break}return a=1/this.beta*this.d*a,this.alpha<1&&(a*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(a)},t.prototype.convertValue=function(t){return "float32"===this.dtype?t:Math.round(t)},t}(),ir=function(){function t(t,e,n,r){var o=this;if(void 0===t&&(t=0),void 0===e&&(e=1),this.canReturnFloat=function(){return null==o.dtype||"float32"===o.dtype},this.min=t,this.range=e-t,this.dtype=n,null==r&&(r=Math.random()),"number"==typeof r&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error("The difference between "+t+" - "+e+" <= 1 and dtype is not float");this.random=rr(r);}return t.prototype.convertValue=function(t){return this.canReturnFloat()?t:Math.round(t)},t.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},t}();function ur(t,e,n){return void 0===e&&(e="float32"),e=e||"float32",Q(t),new lt(t,e,n)}function sr(t,e){void 0===e&&(e=!1),console.log(t.toString(e));}var cr=Cn({batchToSpaceND_:function(t,e,n){var r=ln(t,"x","batchToSpaceND"),o=e.reduce(function(t,e){return t*e});return g(r.rank>=1+e.length,function(){return "input rank is "+r.rank+" but should be > than blockShape.length "+e.length}),g(n.length===e.length,function(){return "crops.length is "+n.length+" but should be equal to blockShape.length  "+e.length}),g(r.shape[0]%o==0,function(){return "input tensor batch is "+r.shape[0]+" but is not divisible by the product of the elements of blockShape "+e.join(" * ")+" === "+o}),Nt.runKernelFunc(function(t){return t.batchToSpaceND(r,e,n)},{$x:r},function(t){return {$x:function(){return t.spaceToBatchND(e,n)}}})}}),lr=Cn({cast_:function(t,e){var n=ln(t,"x","cast");if(!_(e))throw new Error("Failed to cast to unknown dtype "+e);if("string"===e&&"string"!==n.dtype||"string"!==e&&"string"===n.dtype)throw new Error("Only strings can be casted to strings");var r={dtype:e};return Nt.runKernelFunc(function(t){return t.cast(n,e)},{x:n},function(t){return {x:function(){return t.clone()}}},"Cast",r)}}),hr=Cn({clone_:function(t){var e=ln(t,"x","clone",null);return Nt.runKernelFunc(function(){return Nt.makeTensorFromDataId(e.dataId,e.shape,e.dtype)},{$x:e},function(t){return {$x:function(){return t.toFloat()}}})}}),fr=Cn({cumsum_:function(t,e,n,r){void 0===e&&(e=0),void 0===n&&(n=!1),void 0===r&&(r=!1);var o=ln(t,"x","cumsum"),a=gn([e|=0],o.rank),i=o;null!=a&&(i=o.transpose(a));var u=xn(1,o.rank)[0],s=Nt.runKernelFunc(function(t){return t.cumsum(i,u,n,r)},{permutedX:i},function(t){return {permutedX:function(){return t.cumsum(e,n,!r)}}});return null!=a&&(s=s.transpose(a)),s}}),pr=Cn({depthToSpace_:function(t,e,n){void 0===n&&(n="NHWC");var r=ln(t,"x","depthToSpace"),o="NHWC"===n?r.shape[1]:r.shape[2],a="NHWC"===n?r.shape[2]:r.shape[3],i="NHWC"===n?r.shape[3]:r.shape[1];return g(o*e>=0,function(){return "Negative dimension size caused by overflow when multiplying\n      "+o+" and "+e+"  for depthToSpace with input shape\n      "+r.shape}),g(a*e>=0,function(){return "Negative dimension size caused by overflow when multiplying\n      "+a+" and "+e+" for depthToSpace with input shape\n          "+r.shape}),g(i%(e*e)==0,function(){return "Dimension size must be evenly divisible by "+e*e+" but is "+i+" for depthToSpace with input shape "+r.shape}),Nt.runKernelFunc(function(t){return t.depthToSpace(r,e,n)},{$x:r})}}),dr=Cn({expandDims_:function(t,e){void 0===e&&(e=0);var n=ln(t,"x","expandDims",null);g(e<=n.rank,function(){return "Axis must be <= rank of the tensor"});var r=n.shape.slice();return e<0&&(g(-(n.rank+1)<=e,function(){return "Axis must be in the interval ["+-(n.rank+1)+", "+n.rank+"]"}),e=n.rank+e+1),r.splice(e,0,1),Sr(n,r)}}),vr=Cn({eye_:function(t,e,n,r){void 0===r&&(r="float32"),null==e&&(e=t);for(var o=ur([t,e],r),a=t<=e?t:e,i=0;i<a;++i)o.set(1,i,i);var u=o.toTensor().as2D(t,e);if(null==n)return u;if(1===n.length)return Nr(dr(u,0),[n[0],1,1]);if(2===n.length)return Nr(dr(dr(u,0),0),[n[0],n[1],1,1]);if(3===n.length)return Nr(dr(dr(dr(u,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error("eye() currently supports only 1D and 2D batchShapes, but received "+n.length+"D.")}}),mr=Cn({multinomial_:function(t,e,n,r){void 0===r&&(r=!1);var o=ln(t,"logits","multinomial"),a=o.size,i=o.rank;if(a<2)throw new Error("Error in multinomial: you need at least 2 outcomes, but got "+a+".");if(i>2)throw new Error("Rank of probabilities must be 1 or 2, but is "+i);n=n||Math.random();var u=1===i?o.as2D(1,-1):o,s=Nt.runKernelFunc(function(t){return t.multinomial(u,r,e,n)},{logits2D:u});return 1===i?s.as1D():s}}),gr=Cn({oneHot_:function(t,e,n,r){if(void 0===n&&(n=1),void 0===r&&(r=0),e<2)throw new Error("Error in oneHot: depth must be >=2, but it is "+e);var o=ln(t,"indices","oneHot","int32"),a=o.shape.concat([e]);return o=o.flatten(),Nt.runKernelFunc(function(t){return t.oneHot(o,e,n,r)},{$indices:o},function(t){return {$indices:function(){return Pn(o.shape,"float32")}}}).reshape(a)}}),yr=Cn({pad_:function(t,e,n){void 0===n&&(n=0);var r=ln(t,"x","pad");if(0===r.rank)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");var o=e.map(function(t){return t[0]});return Nt.runKernelFunc(function(t){return t.pad(r,e,n)},{$x:r},function(t){return {$x:function(){return t.slice(o,r.shape)}}})}}),xr=Cn({pad1d_:function(t,e,n){return void 0===n&&(n=0),g(2===e.length,function(){return "Invalid number of paddings. Must be length of 2."}),yr(t,[e],n)}}),br=Cn({pad2d_:function(t,e,n){return void 0===n&&(n=0),g(2===e.length&&2===e[0].length&&2===e[1].length,function(){return "Invalid number of paddings. Must be length of 2 each."}),yr(t,e,n)}}),wr=Cn({pad3d_:function(t,e,n){return void 0===n&&(n=0),g(3===e.length&&2===e[0].length&&2===e[1].length&&2===e[2].length,function(){return "Invalid number of paddings. Must be length of 2 each."}),yr(t,e,n)}}),Cr=Cn({pad4d_:function(t,e,n){return void 0===n&&(n=0),g(4===e.length&&2===e[0].length&&2===e[1].length&&2===e[2].length&&2===e[3].length,function(){return "Invalid number of paddings. Must be length of 2 each."}),yr(t,e,n)}}),Er=Cn({rand_:function(t,e,n){var r=w(t),o=null;if(null==n||"float32"===n)o=new Float32Array(r);else if("int32"===n)o=new Int32Array(r);else{if("bool"!==n)throw new Error("Unknown data type "+n);o=new Uint8Array(r);}for(var a=0;a<r;a++)o[a]=e();return Nt.makeTensor(o,t,n)}}),Rr=Cn({randomNormal_:function(t,e,n,r,o){if(void 0===e&&(e=0),void 0===n&&(n=1),null!=r&&"bool"===r)throw new Error("Unsupported data type "+r);for(var a=new or(e,n,r,!1,o),i=ur(t,r),u=0;u<i.values.length;u++)i.values[u]=a.nextValue();return i.toTensor()}}),Ir=Cn({randomGamma_:function(t,e,n,r,o){if(void 0===n&&(n=1),void 0===r&&(r="float32"),null==n&&(n=1),null==r&&(r="float32"),"float32"!==r&&"int32"!==r)throw new Error("Unsupported data type "+r);for(var a=new ar(e,n,r,o),i=ur(t,r),u=0;u<i.values.length;u++)i.values[u]=a.nextValue();return i.toTensor()}}),kr=Cn({randomUniform_:function(t,e,n,r,o){void 0===e&&(e=0),void 0===n&&(n=1),void 0===r&&(r="float32");for(var a=ur(t,r),i=new ir(e,n,null,o),u=0;u<a.values.length;u++)a.values[u]=i.nextValue();return a.toTensor()}}),Sr=Cn({reshape_:function(t,e){var n=ln(t,"x","reshape",null);e=A(e,n.size),g(n.size===w(e),function(){return "new shape and old shape must have the same number of elements."});var r={shape:e};return Nt.runKernelFunc(function(t){return t.reshape(n,e)},{x:n},function(t){return {x:function(){return t.reshape(n.shape)}}},"Reshape",r)}}),Ar=Cn({spaceToBatchND_:function(t,e,n){var r=ln(t,"x","spaceToBatchND");return g(r.rank>=1+e.length,function(){return "input rank "+r.rank+" should be > than [blockShape] "+e.length}),g(n.length===e.length,function(){return "paddings.shape[0] "+n.length+" must be equal to [blockShape] "+e.length}),g(r.shape.reduce(function(t,r,o){return o>0&&o<=e.length?t&&(r+n[o-1][0]+n[o-1][1])%e[o-1]==0:t},!0),function(){return "input spatial dimensions "+r.shape.slice(1)+" with paddings "+n.toString()+" must be divisible by blockShapes "+e.toString()}),Nt.runKernelFunc(function(t){return t.spaceToBatchND(r,e,n)},{$x:r},function(t){return {$x:function(){return t.batchToSpaceND(e,n)}}})}}),Dr=Cn({squeeze_:function(t,e){var n=ln(t,"x","squeeze");return Sr(n,T(n.shape,e).newShape)}}),Tr=Cn({stack_:function(t,e){void 0===e&&(e=0);var n=hn(t,"tensors","stack");if(g(n.length>=1,function(){return "Pass at least one tensor to tf.stack"}),1===n.length)return n[0].expandDims(e);var r=n[0].rank,o=n[0].shape,a=n[0].dtype;g(e<=r,function(){return "Axis must be <= rank of the tensor"}),n.forEach(function(t){y(o,t.shape,"All tensors passed to stack must have matching shapes");}),n.forEach(function(t){g(a===t.dtype,function(){return "All tensors passed to stack must have matching dtypes"});});var i=n.map(function(t){return t.expandDims(e)});return Gn(i,e)}}),Nr=Cn({tile_:function(t,e){var n=ln(t,"x","tile",null);return g(n.rank===e.length,function(){return "Error in transpose: rank of input "+n.rank+" must match length of reps "+e+"."}),Nt.runKernelFunc(function(t,r){var o=t.tile(n,e);return r([n]),o},{$x:n},function(t,n){var r=n[0];return {$x:function(){var n=zn(r);if(1===r.rank)for(var o=0;o<e[0];++o)n=n.add(t.slice([o*r.shape[0]],[r.shape[0]]));else if(2===r.rank)for(o=0;o<e[0];++o)for(var a=0;a<e[1];++a)n=n.add(t.slice([o*r.shape[0],a*r.shape[1]],[r.shape[0],r.shape[1]]));else if(3===r.rank)for(o=0;o<e[0];++o)for(a=0;a<e[1];++a)for(var i=0;i<e[2];++i)n=n.add(t.slice([o*r.shape[0],a*r.shape[1],i*r.shape[2]],[r.shape[0],r.shape[1],r.shape[2]]));else{if(4!==r.rank)throw new Error("Gradient for tile operation is not implemented for rank-"+r.rank+" tensors yet.");for(o=0;o<e[0];++o)for(a=0;a<e[1];++a)for(i=0;i<e[2];++i)for(var u=0;u<e[3];++u)n=n.add(t.slice([o*r.shape[0],a*r.shape[1],i*r.shape[2],u*r.shape[3]],[r.shape[0],r.shape[1],r.shape[2],r.shape[3]]));}return n}}})}}),Fr=Cn({truncatedNormal_:function(t,e,n,r,o){if(void 0===e&&(e=0),void 0===n&&(n=1),null!=r&&"bool"===r)throw new Error("Unsupported data type "+r);for(var a=new or(e,n,r,!0,o),i=ur(t,r),u=0;u<i.values.length;u++)i.values[u]=a.nextValue();return i.toTensor()}}),Or=Cn({unstack_:function(t,e){void 0===e&&(e=0),e=e||0;var n=ln(t,"x","unstack");return g(e>=-n.shape.length&&e<n.shape.length,function(){return "Axis = "+e+" is not in [-"+n.shape.length+", "+n.shape.length+")"}),e<0&&(e+=n.shape.length),Nt.runKernelFunc(function(t){return t.unstack(n,e)},{$x:n},function(t){return {$x:function(){return Tr(t,e)}}})}}),_r=function(t,e){return n(this,void 0,void 0,function(){var n,o,a,i,u,s,c,l,h,f;return r(this,function(r){switch(r.label){case 0:return n=ln(t,"x","setdiff1d"),o=ln(e,"y","setdiff1d"),g(n.dtype===o.dtype,function(){return "x and y should have the same dtype, but got x ("+n.dtype+") and y ("+o.dtype+")."}),g(1===n.rank,function(){return "x should be 1D tensor, but got x ("+n.shape+")."}),g(1===o.rank,function(){return "y should be 1D tensor, but got y ("+o.shape+")."}),[4,n.data()];case 1:return a=r.sent(),[4,o.data()];case 2:for(i=r.sent(),u=new Set(i),s=0,h=0;h<a.length;h++)u.has(a[h])||s++;for(c=new lt([s],n.dtype),l=new lt([s],"int32"),h=0,f=0;h<a.length;h++)u.has(a[h])||(c.values[f]=a[h],l.values[f]=h,f++);return [2,[c.toTensor(),l.toTensor()]]}})})};function Mr(t,e,n,r){void 0===r&&(r=!0);var o=[];if(r)(o=o.concat(e.slice(0))).push(t[0]/n),o=o.concat(t.slice(1));else{o=o.concat(t[0]);for(var a=e.length,i=0;i<a;++i)o=o.concat([t[i+1]/e[i],e[i]]);o=o.concat(t.slice(a+1));}return o}function Br(t,e,n){void 0===n&&(n=!0);var r=[];if(n){r.push(e);for(var o=e+1;o<t;++o)o<=2*e?(r.push(o),r.push(o-(e+1))):r.push(o);}else{var a=[],i=[];for(o=1;o<t;++o)o>=2*e+1||o%2==1?i.push(o):a.push(o);r.push.apply(r,a),r.push(0),r.push.apply(r,i);}return r}function Pr(t,e,n,r){void 0===r&&(r=!0);var o=[];r?o.push(t[0]/n):o.push(t[0]*n);for(var a=1;a<t.length;++a)a<=e.length?r?o.push(e[a-1]*t[a]):o.push(t[a]/e[a-1]):o.push(t[a]);return o}function Lr(t,e){for(var n=[0],r=0;r<e;++r)n.push(t[r][0]);return n}function Wr(t,e,n){for(var r=t.slice(0,1),o=0;o<n;++o)r.push(t[o+1]-e[o][0]-e[o][1]);return r}function Ur(t,e){if(t.rank<1)throw new Error("tf.gatherND() expects the input to be rank 1 or higher, but the rank was "+t.rank+".");if(e.rank<1)throw new Error("tf.gatherND() expects the indices to be rank 1 or higher, but the rank was "+e.rank+".");if("int32"!==e.dtype)throw new Error("tf.gatherND() expects the indices to be int32 type, but the dtype was "+e.dtype+".");if(e.shape[e.rank-1]>t.rank)throw new Error("index innermost dimension length must be <= tensor rank; saw: "+e.shape[e.rank-1]+" vs. "+t.rank);if(0===t.size)throw new Error("Requested more than 0 entries, but input is empty. Input shape: "+t.shape+".");for(var n=e.shape,r=n[n.length-1],o=1,a=0;a<n.length-1;++a)o*=n[a];var i=t.shape,u=n.slice();u.pop();var s=1;for(a=r;a<t.rank;++a)s*=i[a],u.push(i[a]);var c=q(t.shape).map(function(t){return t/s}).concat([1]).slice(0,r);return [u,o,s,c]}var Vr=30;function zr(t){return t<=Vr?t:H(t,Math.floor(Math.sqrt(t)))}function Gr(t,e,n){if(e.rank<1)throw new Error("tf.scatterND() expects the indices to be rank 1 or higher, but the rank was "+e.rank+".");if(t.rank<1)throw new Error("tf.scatterND() expects the updates to be rank 1 or higher, but the rank was "+t.rank+".");if("int32"!==e.dtype)throw new Error("The dtype of 'indices' should be int32, but got dtype: "+e.dtype);if(n.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+n);if(0===n.length){if(0===e.size)throw new Error("Indices specified for empty output. indices shape: "+e.shape);if(0===t.size)throw new Error("Updates specified for empty output. updates shape: "+t.shape)}!function(t,e,n){var r=e.rank>1?e.shape[e.rank-1]:1,o=e.rank>1?e.rank-1:1,a="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+n.shape+", indices.shape: "+e.shape+", shape: "+t+", sliceDim: "+r+", and batchDim: "+o+".";if(n.rank<o)throw new Error(a+" update.rank < "+o+". ");if(t.length<r+(n.rank-o))throw new Error(a+" Output shape length < "+(r+(n.rank-o)));if(n.rank!==o+t.length-r)throw new Error(a+" update.rank != "+(o+t.length-r));for(var i=0;i<o;++i)if(n.shape[i]!==e.shape[i])throw new Error(a+" updates.shape["+i+"] ("+n.shape[i]+") != indices.shape["+i+"] ("+e.shape[i]+").");for(i=0;i<n.rank-o;++i)if(n.shape[i+o]!==t[i+r])throw new Error(a+" updates.shape["+(i+o)+"] ("+n.shape[i+o]+") != shape["+(i+o)+"] ("+t[i+o]+")")}(n,e,t);}function Hr(t,e,n){for(var r=e.rank>1?e.shape[e.rank-1]:1,o=n.length,a=1,i=r;i<o;++i)a*=n[i];var u=r<1?1:r;return {sliceRank:r,numUpdates:e.size/u,sliceSize:a,strides:q(n.slice(0,r)).concat([1]),outputSize:w(n)}}function qr(t,e,n){g(t.rank===e.length,function(){return "Error in slice"+t.rank+"D: Length of begin "+e+" must match the rank of the array ("+t.rank+")."}),g(t.rank===n.length,function(){return "Error in slice"+t.rank+"D: Length of size "+n+" must match the rank of the array ("+t.rank+")."});for(var r=function(r){g(e[r]+n[r]<=t.shape[r],function(){return "Error in slice"+t.rank+"D: begin["+r+"] + size["+r+"] ("+(e[r]+n[r])+") would overflow input.shape["+r+"] ("+t.shape[r]+")"});},o=0;o<t.rank;++o)r(o);}function Kr(t){for(var e=[],n=0;t>0;)1&t&&e.push(n),t/=2,n++;return e}function jr(t,e,n){for(var r=[],o=0;o<t.length;o++)r[o]=Math.ceil((e[o]-t[o])/n[o]);return r}function Xr(t,e,n,r,o){var a=e[o],i=n[o]||1;(t&1<<o||null==a)&&(a=i>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var u=r[o];return a<0&&(a+=u),a=d(0,a,u-1)}function $r(t,e,n,r,o){var a=e[o],i=n[o]||1;(t&1<<o||null==a)&&(a=i>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var u=r[o];return a<0&&(a+=u),a=i>0?d(0,a,u):d(-1,a,u-1)}function Yr(t,e,n){for(var r=n.length,o=0;o<n.length;o++)if(n[o]>1){r=o;break}for(o=r+1;o<n.length;o++)if(e[o]>0||n[o]!==t[o])return !1;return !0}function Qr(t,e){for(var n=t.length>0?t[t.length-1]:1,r=0;r<t.length-1;r++)n+=t[r]*e[r];return n}var Jr=Object.freeze({assertParamsValid:qr,maskToAxes:Kr,computeOutShape:jr,startForAxis:Xr,stopForAxis:$r,isSliceContinous:Yr,computeFlatOffset:Qr});function Zr(t){return g(G(t),function(){return "The f passed in grad(f) must be a function"}),function(e,n){var r=ln(e,"x","tf.grad",null),o=null!=n?ln(n,"dy","tf.grad"):null;return Nt.tidy(function(){var e=Nt.gradients(function(){return t(r)},[r],o),n=e.value,a=e.grads;return null!=o&&y(n.shape,o.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),ao(a),a[0]})}}function to(t){return g(G(t),function(){return "The f passed in grads(f) must be a function"}),function(e,n){g(Array.isArray(e),function(){return "The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s"});var r=hn(e,"args","tf.grads",null),o=null!=n?ln(n,"dy","tf.grads"):null;return Nt.tidy(function(){var e=Nt.gradients(function(){return t.apply(void 0,r)},r,o),n=e.value,a=e.grads;return null!=o&&y(n.shape,o.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),ao(a),a})}}function eo(t){return g(G(t),function(){return "The f passed in valueAndGrad(f) must be a function"}),function(e,n){g(e instanceof dt,function(){return "The x passed in valueAndGrad(f)(x) must be a tensor"}),g(null==n||n instanceof dt,function(){return "The dy passed in valueAndGrad(f)(x, dy) must be a tensor"});var r=Nt.gradients(function(){return t(e)},[e],n),o=r.grads,a=r.value;return ao(o),{grad:o[0],value:a}}}function no(t){return g(G(t),function(){return "The f passed in valueAndGrads(f) must be a function"}),function(e,n){g(Array.isArray(e)&&e.every(function(t){return t instanceof dt}),function(){return "The args passed in valueAndGrads(f)(args) must be array of tensors"}),g(null==n||n instanceof dt,function(){return "The dy passed in valueAndGrads(f)(args, dy) must be a tensor"});var r=Nt.gradients(function(){return t.apply(void 0,e)},e,n);return null!=n&&y(r.value.shape,n.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),ao(r.grads),r}}function ro(t,e){g(G(t),function(){return "The f passed in variableGrads(f) must be a function"}),g(null==e||Array.isArray(e)&&e.every(function(t){return t instanceof bt}),function(){return "The varList passed in variableGrads(f, varList) must be an array of variables"});var n=null!=e;if(!n)for(var r in e=[],Nt.registeredVariables)e.push(Nt.registeredVariables[r]);var o=n?e.filter(function(t){return !t.trainable}):null,a=e.length;g((e=e.filter(function(t){return t.trainable})).length>0,function(){return "variableGrads() expects at least one of the input variables to be trainable, but none of the "+a+" variables is trainable."});var i=Nt.gradients(t,e,null,!0),u=i.value,s=i.grads;g(s.some(function(t){return null!=t}),function(){return "Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."}),g(0===u.rank,function(){return "The f passed in variableGrads(f) must return a scalar, but it returned a rank-"+u.rank+" tensor"});var c={};return e.forEach(function(t,e){null!=s[e]&&(c[t.name]=s[e]);}),null!=o&&o.forEach(function(t){return c[t.name]=null}),{value:u,grads:c}}function oo(t){return Nt.customGrad(t)}function ao(t){if(t.filter(function(t){return null==t}).length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.")}var io=Cn({softmax_:function(t,e){void 0===e&&(e=-1);var n=ln(t,"logits","softmax");if(-1===e&&(e=n.rank-1),e!==n.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank "+n.rank+" and dim was "+e);return oo(function(t,n){var r=t.logSumExp([e],!0),o=t.toFloat().sub(r).exp();return n([o]),{value:o,gradFunc:function(t,n){var r=n[0],o=t.mul(r);return o.sub(o.sum([e],!0).mul(r))}}})(n)}}),uo=Cn({logSoftmax_:function(t,e){void 0===e&&(e=-1);var n=ln(t,"logits","logSoftmax");if(-1===e&&(e=n.rank-1),e!==n.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. Logits was rank "+n.rank+" and axis was "+e);return oo(function(t,n){var r=t.max(e,!0),o=t.sub(r),a=o.toFloat().sub(o.exp().sum(e,!0).log());return n([a]),{value:a,gradFunc:function(t,n){var r=n[0].exp();return t.sub(t.sum(e,!0).mul(r))}}})(n)}}),so=function(){function t(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0;}return t.prototype.get=function(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)},t.prototype.set=function(t,e){this.dataIdsCount++,this.data.set(t,e);},t.prototype.has=function(t){return this.data.has(t)},t.prototype.delete=function(t){return this.dataIdsCount--,this.data.delete(t)},t.prototype.numDataIds=function(){return this.dataIdsCount},t}(),co=function(){function t(){}return t.prototype.time=function(t){return lo("time")},t.prototype.read=function(t){return lo("read")},t.prototype.readSync=function(t){return lo("readSync")},t.prototype.numDataIds=function(){return lo("numDataIds")},t.prototype.disposeData=function(t){return lo("disposeData")},t.prototype.fromPixels=function(t,e){return lo("fromPixels")},t.prototype.write=function(t,e,n){return lo("write")},t.prototype.move=function(t,e,n,r){return lo("move")},t.prototype.memory=function(){return lo("memory")},t.prototype.floatPrecision=function(){return lo("floatPrecision")},t.prototype.epsilon=function(){return 32===this.floatPrecision()?1e-7:1e-4},t.prototype.batchMatMul=function(t,e,n,r){return lo("batchMatMul")},t.prototype.fusedBatchMatMul=function(t){t.a,t.b,t.transposeA,t.transposeB,t.bias,t.activation,t.preluActivationWeights;return lo("fusedBatchMatMul")},t.prototype.slice=function(t,e,n){return lo("slice")},t.prototype.stridedSlice=function(t,e,n,r){return lo("stridedSlice")},t.prototype.unstack=function(t,e){return lo("unstack")},t.prototype.reverse=function(t,e){return lo("reverse")},t.prototype.concat=function(t,e){return lo("concat")},t.prototype.neg=function(t){return lo("neg")},t.prototype.add=function(t,e){return lo("add")},t.prototype.addN=function(t){return lo("addN")},t.prototype.subtract=function(t,e){return lo("subtract")},t.prototype.multiply=function(t,e){return lo("multiply")},t.prototype.realDivide=function(t,e){return lo("realDivide")},t.prototype.floorDiv=function(t,e){return lo("floorDiv")},t.prototype.sum=function(t,e){return lo("sum")},t.prototype.prod=function(t,e){return lo("prod")},t.prototype.unsortedSegmentSum=function(t,e,n){return lo("unsortedSegmentSum")},t.prototype.argMin=function(t,e){return lo("argMin")},t.prototype.argMax=function(t,e){return lo("argMax")},t.prototype.equal=function(t,e){return lo("equal")},t.prototype.notEqual=function(t,e){return lo("notEqual")},t.prototype.less=function(t,e){return lo("less")},t.prototype.lessEqual=function(t,e){return lo("lessEqual")},t.prototype.greater=function(t,e){return lo("greater")},t.prototype.greaterEqual=function(t,e){return lo("greaterEqual")},t.prototype.logicalNot=function(t){return lo("logicalNot")},t.prototype.logicalAnd=function(t,e){return lo("logicalAnd")},t.prototype.logicalOr=function(t,e){return lo("logicalOr")},t.prototype.where=function(t){return lo("where")},t.prototype.select=function(t,e,n){return lo("select")},t.prototype.topk=function(t,e,n){return lo("topk")},t.prototype.min=function(t,e){return lo("min")},t.prototype.minimum=function(t,e){return lo("minimum")},t.prototype.mod=function(t,e){return lo("mod")},t.prototype.max=function(t,e){return lo("max")},t.prototype.maximum=function(t,e){return lo("maximum")},t.prototype.all=function(t,e){return lo("all")},t.prototype.any=function(t,e){return lo("any")},t.prototype.squaredDifference=function(t,e){return lo("squaredDifference")},t.prototype.ceil=function(t){return lo("ceil")},t.prototype.floor=function(t){return lo("floor")},t.prototype.round=function(t){return lo("round")},t.prototype.sign=function(t){return lo("sign")},t.prototype.isNaN=function(t){return lo("isNaN")},t.prototype.isInf=function(t){return lo("isInf")},t.prototype.isFinite=function(t){return lo("isFinite")},t.prototype.pow=function(t,e){return lo("pow")},t.prototype.exp=function(t){return lo("exp")},t.prototype.expm1=function(t){return lo("expm1")},t.prototype.log=function(t){return lo("log")},t.prototype.log1p=function(t){return lo("log1p")},t.prototype.sqrt=function(t){return lo("sqrt")},t.prototype.rsqrt=function(t){return lo("rsqrt")},t.prototype.square=function(t){return lo("square")},t.prototype.reciprocal=function(t){return lo("reciprocal")},t.prototype.relu=function(t){return lo("relu")},t.prototype.relu6=function(t){return lo("relu6")},t.prototype.prelu=function(t,e){return lo("prelu")},t.prototype.elu=function(t){return lo("elu")},t.prototype.eluDer=function(t,e){return lo("eluDer")},t.prototype.selu=function(t){return lo("selu")},t.prototype.int=function(t){return lo("int")},t.prototype.clip=function(t,e,n){return lo("clip")},t.prototype.abs=function(t){return lo("abs")},t.prototype.complexAbs=function(t){return lo("complexAbs")},t.prototype.sigmoid=function(t){return lo("sigmoid")},t.prototype.softplus=function(t){return lo("softplus")},t.prototype.sin=function(t){return lo("sin")},t.prototype.cos=function(t){return lo("cos")},t.prototype.tan=function(t){return lo("tan")},t.prototype.asin=function(t){return lo("asin")},t.prototype.acos=function(t){return lo("acos")},t.prototype.atan=function(t){return lo("atan")},t.prototype.atan2=function(t,e){return lo("atan2")},t.prototype.sinh=function(t){return lo("sinh")},t.prototype.cosh=function(t){return lo("cosh")},t.prototype.tanh=function(t){return lo("tanh")},t.prototype.asinh=function(t){return lo("asinh")},t.prototype.acosh=function(t){return lo("acosh")},t.prototype.atanh=function(t){return lo("atanh")},t.prototype.erf=function(t){return lo("erf")},t.prototype.step=function(t,e){return lo("step")},t.prototype.fusedConv2d=function(t){t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights;return lo("fusedConv2d")},t.prototype.conv2d=function(t,e,n){return lo("conv2d")},t.prototype.conv2dDerInput=function(t,e,n){return lo("conv2dDerInput")},t.prototype.conv2dDerFilter=function(t,e,n){return lo("conv2dDerFilter")},t.prototype.fusedDepthwiseConv2D=function(t){t.input,t.filter,t.convInfo,t.bias,t.activation,t.preluActivationWeights;return lo("fusedDepthwiseConv2D")},t.prototype.depthwiseConv2D=function(t,e,n){return lo("depthwiseConv2D")},t.prototype.depthwiseConv2DDerInput=function(t,e,n){return lo("depthwiseConv2DDerInput")},t.prototype.depthwiseConv2DDerFilter=function(t,e,n){return lo("depthwiseConv2DDerFilter")},t.prototype.conv3d=function(t,e,n){return lo("conv3d")},t.prototype.conv3dDerInput=function(t,e,n){return lo("conv3dDerInput")},t.prototype.conv3dDerFilter=function(t,e,n){return lo("conv3dDerFilter")},t.prototype.maxPool=function(t,e){return lo("maxPool")},t.prototype.maxPoolBackprop=function(t,e,n,r){return lo("maxPoolBackprop")},t.prototype.avgPool=function(t,e){return lo("avgPool")},t.prototype.avgPoolBackprop=function(t,e,n){return lo("avgPoolBackprop")},t.prototype.avgPool3d=function(t,e){return lo("avgPool3d")},t.prototype.avgPool3dBackprop=function(t,e,n){return lo("avgPool3dBackprop")},t.prototype.maxPool3d=function(t,e){return lo("maxPool3d")},t.prototype.maxPool3dBackprop=function(t,e,n,r){return lo("maxPool3dBackprop")},t.prototype.reshape=function(t,e){return lo("reshape")},t.prototype.cast=function(t,e){return lo("cast")},t.prototype.tile=function(t,e){return lo("tile")},t.prototype.pad=function(t,e,n){return lo("pad")},t.prototype.transpose=function(t,e){return lo("transpose")},t.prototype.gather=function(t,e,n){return lo("gather")},t.prototype.gatherND=function(t,e){return lo("gatherND")},t.prototype.scatterND=function(t,e,n){return lo("scatterND")},t.prototype.batchToSpaceND=function(t,e,n){return lo("batchToSpaceND")},t.prototype.spaceToBatchND=function(t,e,n){return lo("spaceToBatchND")},t.prototype.resizeBilinear=function(t,e,n,r){return lo("resizeBilinear")},t.prototype.resizeBilinearBackprop=function(t,e,n){return lo("resizeBilinearBackprop")},t.prototype.resizeNearestNeighbor=function(t,e,n,r){return lo("resizeNearestNeighbor")},t.prototype.resizeNearestNeighborBackprop=function(t,e,n){return lo("resizeNearestNeighborBackprop")},t.prototype.batchNormalization=function(t,e,n,r,o,a){return lo("batchNormalization")},t.prototype.localResponseNormalization4D=function(t,e,n,r,o){return lo("localResponseNormalization4D")},t.prototype.LRNGrad=function(t,e,n,r,o,a,i){return lo("LRNGrad")},t.prototype.multinomial=function(t,e,n,r){return lo("multinomial")},t.prototype.oneHot=function(t,e,n,r){return lo("oneHot")},t.prototype.cumsum=function(t,e,n,r){return lo("cumsum")},t.prototype.nonMaxSuppression=function(t,e,n,r,o){return lo("nonMaxSuppression")},t.prototype.fft=function(t){return lo("fft")},t.prototype.ifft=function(t){return lo("ifft")},t.prototype.complex=function(t,e){return lo("complex")},t.prototype.real=function(t){return lo("real")},t.prototype.imag=function(t){return lo("imag")},t.prototype.cropAndResize=function(t,e,n,r,o,a){return lo("cropAndResize")},t.prototype.depthToSpace=function(t,e,n){return lo("depthToSpace")},t.prototype.split=function(t,e,n){return lo("split")},t.prototype.sparseToDense=function(t,e,n,r){return lo("sparseToDense")},t.prototype.diag=function(t){return lo("diag")},t.prototype.fill=function(t,e,n){return lo("fill")},t.prototype.onesLike=function(t){return lo("onesLike")},t.prototype.zerosLike=function(t){return lo("zerosLike")},t.prototype.linspace=function(t,e,n){return lo("linspace")},t.prototype.dispose=function(){return lo("dispose")},t}();function lo(t){throw new Error("'"+t+"' not yet implemented or not found in the registry. Did you forget to import the kernel?")}function ho(t,e){for(var n=t.length,r=[],o=0;o<n;o++){var a=n-1-o,i=t[a]||1;(e[e.length-1-o]||1)>1&&1===i&&r.unshift(a);}return r}function fo(t,e){for(var n=[],r=0;r<e.length;r++){var o=t[t.length-r-1],a=e.length-r-1,i=e[a];(null==o||1===o&&i>1)&&n.unshift(a);}return n}function po(t,e){for(var n=[],r=Math.max(t.length,e.length),o=0;o<r;o++){var a=t[t.length-o-1];null==a&&(a=1);var i=e[e.length-o-1];if(null==i&&(i=1),1===a)n.unshift(i);else if(1===i)n.unshift(a);else{if(a!==i)throw Error("Operands could not be broadcast together with shapes "+t+" and "+e+".");n.unshift(a);}}return n}function vo(t,e,n,r,o,a,i){void 0===i&&(i="channelsLast");var u,s=bo(e),c=s[0],l=s[1];if("channelsLast"===i)u=[c,l,t[3],t[3]];else{if("channelsFirst"!==i)throw new Error("Unknown dataFormat "+i);u=[c,l,t[1],t[1]];}return go(t,u,n,r,o,a,!1,i)}function mo(t,e,n,r,o,a,i){void 0===i&&(i="NDHWC");var u,s,c=wo(e),l=c[0],h=c[1],f=c[2];if("NDHWC"===i)s="channelsLast",u=[l,h,f,t[4],t[4]];else{if("NCDHW"!==i)throw new Error("Unknown dataFormat "+i);s="channelsFirst",u=[l,h,f,t[1],t[1]];}return yo(t,u,n,r,o,!1,s,a)}function go(t,e,n,r,o,a,i,u){void 0===i&&(i=!1),void 0===u&&(u="channelsLast");var s=[-1,-1,-1,-1],c=s[0],l=s[1],h=s[2],f=s[3];if("channelsLast"===u)c=t[0],l=t[1],h=t[2],f=t[3];else{if("channelsFirst"!==u)throw new Error("Unknown dataFormat "+u);c=t[0],f=t[1],l=t[2],h=t[3];}var p,d=e[0],v=e[1],m=e[3],y=bo(n),x=y[0],b=y[1],w=bo(r),C=w[0],R=w[1],I=Co(d,C),k=Co(v,R),S=function(t,e,n,r,o,a,i,u){var s,c,l;if("number"==typeof t){var h=0===t?"VALID":"NUMBER";s={top:t,bottom:t,left:t,right:t,type:h};var f=function(t,e,n,r,o){null==r&&(r=xo(t,e,n));var a=t[0],i=t[1],u=Eo((a-e+2*r)/n+1,o);g(E(u),function(){return "The output # of rows ("+u+") must be an integer. Change the stride and/or zero pad parameters"});var s=Eo((i-e+2*r)/n+1,o);return g(E(s),function(){return "The output # of columns ("+s+") must be an integer. Change the stride and/or zero pad parameters"}),[u,s]}([e,n],a,r,t,u);c=f[0],l=f[1];}else if("same"===t){c=Math.ceil(e/r),l=Math.ceil(n/o);var p=Math.max(0,(c-1)*r+a-e),d=Math.max(0,(l-1)*o+i-n),v=Math.floor(p/2),m=p-v,y=Math.floor(d/2),x=d-y;s={top:v,bottom:m,left:y,right:x,type:"SAME"};}else{if("valid"!==t)throw Error("Unknown padding parameter: "+t);s={top:0,bottom:0,left:0,right:0,type:"VALID"},c=Math.ceil((e-a+1)/r),l=Math.ceil((n-i+1)/o);}return {padInfo:s,outHeight:c,outWidth:l}}(o,l,h,x,b,I,k,a),A=S.padInfo,D=S.outHeight,T=S.outWidth,N=i?m*f:m;return "channelsFirst"===u?p=[c,N,D,T]:"channelsLast"===u&&(p=[c,D,T,N]),{batchSize:c,dataFormat:u,inHeight:l,inWidth:h,inChannels:f,outHeight:D,outWidth:T,outChannels:N,padInfo:A,strideHeight:x,strideWidth:b,filterHeight:d,filterWidth:v,effectiveFilterHeight:I,effectiveFilterWidth:k,dilationHeight:C,dilationWidth:R,inShape:t,outShape:p,filterShape:e}}function yo(t,e,n,r,o,a,i,u){void 0===a&&(a=!1),void 0===i&&(i="channelsLast");var s=[-1,-1,-1,-1,-1],c=s[0],l=s[1],h=s[2],f=s[3],p=s[4];if("channelsLast"===i)c=t[0],l=t[1],h=t[2],f=t[3],p=t[4];else{if("channelsFirst"!==i)throw new Error("Unknown dataFormat "+i);c=t[0],p=t[1],l=t[2],h=t[3],f=t[4];}var d,v=e[0],m=e[1],y=e[2],x=e[4],b=wo(n),w=b[0],C=b[1],R=b[2],I=wo(r),k=I[0],S=I[1],A=I[2],D=Co(v,k),T=Co(m,S),N=Co(y,A),F=function(t,e,n,r,o,a,i,u,s,c,l){var h,f,p,d;if("number"==typeof t){var v=0===t?"VALID":"NUMBER";h={top:t,bottom:t,left:t,right:t,front:t,back:t,type:v};var m=function(t,e,n,r,o,a){null==o&&(o=xo(t,e,r));var i=t[0],u=t[1],s=t[2],c=Eo((i-e+2*o)/r+1,a);g(E(c),function(){return "The output # of depths ("+c+") must be an integer. Change the stride and/or zero pad parameters"});var l=Eo((u-e+2*o)/r+1,a);g(E(l),function(){return "The output # of rows ("+l+") must be an integer. Change the stride and/or zero pad parameters"});var h=Eo((s-e+2*o)/r+1,a);return g(E(h),function(){return "The output # of columns ("+h+") must be an integer. Change the stride and/or zero pad parameters"}),[c,l,h,n]}([e,n,r,1],u,1,o,t,l);f=m[0],p=m[1],d=m[2];}else if("same"===t){f=Math.ceil(e/o),p=Math.ceil(n/a),d=Math.ceil(r/i);var y=(f-1)*o+u-e,x=(p-1)*a+s-n,b=(d-1)*i+c-r,w=Math.floor(y/2),C=y-w,R=Math.floor(x/2),I=x-R,k=Math.floor(b/2),S=b-k;h={top:R,bottom:I,left:k,right:S,front:w,back:C,type:"SAME"};}else{if("valid"!==t)throw Error("Unknown padding parameter: "+t);h={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},f=Math.ceil((e-u+1)/o),p=Math.ceil((n-s+1)/a),d=Math.ceil((r-c+1)/i);}return {padInfo:h,outDepth:f,outHeight:p,outWidth:d}}(o,l,h,f,w,C,R,D,T,N,u),O=F.padInfo,_=F.outDepth,M=F.outHeight,B=F.outWidth,P=a?x*p:x;return "channelsFirst"===i?d=[c,P,_,M,B]:"channelsLast"===i&&(d=[c,_,M,B,P]),{batchSize:c,dataFormat:i,inDepth:l,inHeight:h,inWidth:f,inChannels:p,outDepth:_,outHeight:M,outWidth:B,outChannels:P,padInfo:O,strideDepth:w,strideHeight:C,strideWidth:R,filterDepth:v,filterHeight:m,filterWidth:y,effectiveFilterDepth:D,effectiveFilterHeight:T,effectiveFilterWidth:N,dilationDepth:k,dilationHeight:S,dilationWidth:A,inShape:t,outShape:d,filterShape:e}}function xo(t,e,n,r){void 0===r&&(r=1);var o=Co(e,r);return Math.floor((t[0]*(n-1)-n+o)/2)}function bo(t){return "number"==typeof t?[t,t,t]:2===t.length?[t[0],t[1],1]:t}function wo(t){return "number"==typeof t?[t,t,t]:t}function Co(t,e){return e<=1?t:t+(t-1)*(e-1)}function Eo(t,e){if(!e)return t;switch(e){case"round":return Math.round(t);case"ceil":return Math.ceil(t);case"floor":return Math.floor(t);default:throw new Error("Unknown roundingMode "+e)}}function Ro(t){var e=bo(t),n=e[0],r=e[1],o=e[2];return 1===n&&1===r&&1===o}function Io(t,e){return Ro(t)||Ro(e)}function ko(t){if("NHWC"===t)return "channelsLast";if("NCHW"===t)return "channelsFirst";throw new Error("Unknown dataFormat "+t)}function So(t,e,n){if("complex64"===e){if("complex64"===t.dtype)return t.clone();var r=Pn(t.shape),o=t.toFloat(),a=n.complex(o,r);return r.dispose(),o.dispose(),a}if(!M(t.dtype,e))return Nt.makeTensorFromDataId(t.dataId,t.shape,e);if("complex64"===t.dtype){var i=n.real(t);a=i.cast(e);return i.dispose(),a}if("int32"===e)return n.int(t);if("bool"===e){var u=An(0,t.dtype);a=n.notEqual(t,u);return u.dispose(),a}throw new Error("Error in Cast: failed to cast "+t.dtype+" to "+e)}function Ao(t,e){return Nt.makeTensorFromDataId(t.dataId,e,t.dtype)}function Do(t,e,n){var r=(e-t)/(n-1),o=$(n,"float32");o[0]=t;for(var a=1;a<o.length;a++)o[a]=o[a-1]+r;return Dn(o,"float32")}var To=Object.freeze({castTensor:So,reshapeTensor:Ao,linspaceImpl:Do,upcastType:Ct,axesAreInnerMostDims:fn,combineLocations:pn,computeOutAndReduceShapes:dn,expandShapeToKeepDim:vn,assertAxesAreInnerMostDims:mn,getAxesPermutation:gn,getUndoAxesPermutation:yn,getInnerMostAxes:xn,getBroadcastDims:ho,getReductionAxes:fo,assertAndGetBroadcastShape:po,assertParamsConsistent:bn,computeOutShape:wn,computePool2DInfo:vo,computePool3DInfo:mo,computeConv2DInfo:go,computeConv3DInfo:yo,computeDefaultPad:xo,tupleValuesAreOne:Ro,eitherStridesOrDilationsAreOne:Io,convertConv2DDataFormat:ko});function No(t,e){if(t.length!==e.length)throw new Error("Cannot merge real and imag arrays of different lengths. real:"+t.length+", imag: "+e.length+".");for(var n=new Float32Array(2*t.length),r=0;r<n.length;r+=2)n[r]=t[r/2],n[r+1]=e[r/2];return n}function Fo(t,e){return {real:t[2*e],imag:t[2*e+1]}}function Oo(t,e,n,r){t[2*r]=e,t[2*r+1]=n;}function _o(t,e,n){var r=(n?2:-2)*Math.PI*(t/e);return {real:Math.cos(r),imag:Math.sin(r)}}function Mo(t,e,n,r,o){for(var a=Array.from(e).map(function(t,e){return {score:t,boxIndex:e}}).filter(function(t){return t.score>o}).sort(function(t,e){return e.score-t.score}),i=[],u=0;u<a.length;u++){var s=a[u],c=s.score,l=s.boxIndex;if(c<o)break;for(var h=!1,f=i.length-1;f>=0;--f){if(Bo(t,l,i[f])>=r){h=!0;break}}if(!h&&(i.push(l),i.length>=n))break}return Dn(i,"int32")}function Bo(t,e,n){var r=t.subarray(4*e,4*e+4),o=t.subarray(4*n,4*n+4),a=Math.min(r[0],r[2]),i=Math.min(r[1],r[3]),u=Math.max(r[0],r[2]),s=Math.max(r[1],r[3]),c=Math.min(o[0],o[2]),l=Math.min(o[1],o[3]),h=Math.max(o[0],o[2]),f=Math.max(o[1],o[3]),p=(u-a)*(s-i),d=(h-c)*(f-l);if(p<=0||d<=0)return 0;var v=Math.max(a,c),m=Math.max(i,l),g=Math.min(u,h),y=Math.min(s,f),x=Math.max(g-v,0)*Math.max(y-m,0);return x/(p+d-x)}function Po(t,e,n){var r=new Array(t.rank).fill(0),o=t.shape.slice();return e.map(function(e){o[n]=e;var a=t.slice(r,o);return r[n]+=e,a})}function Lo(t,e){for(var n=new Array(t.rank),r=0;r<n.length;r++)n[r]=t.shape[r]*e[r];var o=ur(n,t.dtype);for(r=0;r<o.values.length;++r){for(var a=o.indexToLoc(r),i=new Array(t.rank),u=0;u<i.length;u++)i[u]=a[u]%t.shape[u];var s=t.locToIndex(i);o.values[r]=t.values[s];}return o.toTensor()}function Wo(t,e,n,r,o){for(var a=e[e.length-1],i=[t.length/a,a],u=i[0],s=i[1],c=N(n,u*r),l=N("int32",u*r),h=0;h<u;h++){for(var f=h*s,p=t.subarray(f,f+s),d=[],v=0;v<p.length;v++)d.push({value:p[v],index:v});d.sort(function(t,e){return e.value-t.value});var m=h*r,g=c.subarray(m,m+r),y=l.subarray(m,m+r);for(v=0;v<r;v++)g[v]=d[v].value,y[v]=d[v].index;}var x=e.slice();return x[x.length-1]=r,[kn(c,x,n),kn(l,x,"int32")]}function Uo(t,e){for(var n=[],r=0;r<e.length;r++)e[r]&&n.push(r);var o=ur(t,"int32"),a=ur([n.length,t.length],"int32");for(r=0;r<n.length;r++){var i=o.indexToLoc(n[r]),u=r*t.length;a.values.set(i,u);}return a.toTensor()}var Vo=function(){return function(t,e){this.outputShape=[],this.outputShape=t,this.variableNames=e.map(function(t,e){return "T"+e});var n=[];this.variableNames.forEach(function(t){n.push("float v"+t+" = get"+t+"AtOutCoords();");});var r=this.variableNames.map(function(t){return "v"+t}).join(" + ");this.userCode="\n      void main() {\n        "+n.join("\n        ")+"\n\n        float result = "+r+";\n        setOutput(result);\n      }\n    ";}}(),zo=function(){return function(t,e){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.variableNames=e.map(function(t,e){return "T"+e});var n=[];this.variableNames.forEach(function(t){n.push("vec4 v"+t+" = get"+t+"AtOutCoords();");});var r=this.variableNames.map(function(t){return "v"+t}).join(" + ");this.userCode="\n      void main() {\n        "+n.join("\n        ")+"\n\n        vec4 result = "+r+";\n        setOutput(result);\n      }\n    ";}}(),Go=function(){return function(t,e,n){this.variableNames=["A"];var r=t.windowSize,o=t.batchSize,a=t.inSize,i=Math.ceil(a/r);n||this.variableNames.push("bestIndicesA"),this.outputShape=[o,i];var u="max"===e?">":"<",s=n?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode="\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * "+r+";\n\n        int bestIndex = inOffset;\n        float bestValue = getA(batch, bestIndex);\n\n        for (int i = 0; i < "+r+"; i++) {\n          int inIdx = "+s+";\n          float candidate = getA(batch, inIdx);\n          if (candidate "+u+" bestValue) {\n            bestValue = candidate;\n            bestIndex = inIdx;\n          }\n        }\n        setOutput(float(bestIndex));\n      }\n    ";}}();function Ho(t,e){return ["x","y","z","w","u","v"].slice(0,e).map(function(e){return t+"."+e})}function qo(t,e){return 1===e?[t]:Ho(t,e)}function Ko(){var t,e,n,r,o,i,u,s,c,l;return 2===a().getNumber("WEBGL_VERSION")?(t="#version 300 es",e="in",n="out",r="in",o="texture",i="outputColor",u="out vec4 outputColor;",s="\n      bool isnan_custom(float val) {\n        return (val > 0.0 || val < 0.0) ? false : val != 0.0;\n      }\n\n      bvec4 isnan_custom(vec4 val) {\n        return bvec4(isnan_custom(val.x),\n          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));\n      }\n\n      #define isnan(value) isnan_custom(value)\n    ",c="",l="\n      #define round(value) newRound(value)\n      int newRound(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 newRound(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    "):(t="",e="attribute",n="varying",r="varying",o="texture2D",i="gl_FragColor",u="",s="\n      #define isnan(value) isnan_custom(value)\n      bool isnan_custom(float val) {\n        return (val > 0. || val < 1. || val == 0.) ? false : true;\n      }\n      bvec4 isnan_custom(vec4 val) {\n        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));\n      }\n    ",c="\n      uniform float INFINITY;\n\n      bool isinf(float val) {\n        return abs(val) == INFINITY;\n      }\n      bvec4 isinf(vec4 val) {\n        return equal(abs(val), vec4(INFINITY));\n      }\n    ",l="\n      int round(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 round(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    "),{version:t,attribute:e,varyingVs:n,varyingFs:r,texture2D:o,output:i,defineOutput:u,defineSpecialNaN:s,defineSpecialInf:c,defineRound:l}}function jo(t,e,n){void 0===n&&(n="index");var r=q(e);return r.map(function(e,o){return "int "+t[o]+" = "+n+" / "+e+"; "+(o===r.length-1?"int "+t[o+1]+" = "+n+" - "+t[o]+" * "+e:"index -= "+t[o]+" * "+e)+";"}).join("")}function Xo(t){var e=q(t).map(function(t){return t.toString()});return "\n  int getFlatIndex(ivec3 coords) {\n    return coords.x * "+e[0]+" + coords.y * "+e[1]+" + coords.z;\n  }\n"}var $o="\n  const float FLOAT_MAX = 1.70141184e38;\n  const float FLOAT_MIN = 1.17549435e-38;\n\n  lowp vec4 encode_float(highp float v) {\n    if (isnan(v)) {\n      return vec4(255, 255, 255, 255);\n    }\n\n    highp float av = abs(v);\n\n    if(av < FLOAT_MIN) {\n      return vec4(0.0, 0.0, 0.0, 0.0);\n    } else if(v > FLOAT_MAX) {\n      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;\n    } else if(v < -FLOAT_MAX) {\n      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;\n    }\n\n    highp vec4 c = vec4(0,0,0,0);\n\n    highp float e = floor(log2(av));\n    highp float m = exp2(fract(log2(av))) - 1.0;\n\n    c[2] = floor(128.0 * m);\n    m -= c[2] / 128.0;\n    c[1] = floor(32768.0 * m);\n    m -= c[1] / 32768.0;\n    c[0] = floor(8388608.0 * m);\n\n    highp float ebias = e + 127.0;\n    c[3] = floor(ebias / 2.0);\n    ebias -= c[3] * 2.0;\n    c[2] += floor(ebias) * 128.0;\n\n    c[3] += 128.0 * step(0.0, -v);\n\n    return c / 255.0;\n  }\n";function Yo(t,e,n,r){var o=[];t.forEach(function(t){var e=w(t.shapeInfo.logicalShape);t.shapeInfo.isUniform?o.push("uniform float "+t.name+(e>1?"["+e+"]":"")+";"):(o.push("uniform sampler2D "+t.name+";"),o.push("uniform int offset"+t.name+";"));});var a,i,u=o.join("\n"),s=t.map(function(t){return function(t,e,n){void 0===n&&(n=!1);var r="";r+=n?Jo(t):Qo(t);var o=t.shapeInfo.logicalShape,a=e.logicalShape;o.length<=a.length&&(r+=n?function(t,e){var n,r=t.name,o=r.charAt(0).toUpperCase()+r.slice(1),a="get"+o+"AtOutCoords",i=t.shapeInfo.logicalShape.length,u=e.logicalShape.length,s=ho(t.shapeInfo.logicalShape,e.logicalShape),c=aa(u),l=u-i,h=["x","y","z","w","u","v"];n=0===i?"":u<2&&s.length>=1?"coords = 0;":s.map(function(t){return "coords."+h[t+l]+" = 0;"}).join("\n");var f="";f=u<2&&i>0?"coords":t.shapeInfo.logicalShape.map(function(t,e){return "coords."+h[e+l]}).join(", ");var p="return outputValue;",d=1===w(t.shapeInfo.logicalShape),v=1===w(e.logicalShape);if(1!==i||d||v){if(d&&!v)p=1===u?"\n        return vec4(outputValue.x, outputValue.x, 0., 0.);\n      ":"\n        return vec4(outputValue.x);\n      ";else if(s.length){var m=i-2,g=i-1;s.indexOf(m)>-1&&s.indexOf(g)>-1?p="return vec4(outputValue.x);":s.indexOf(m)>-1?p="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":s.indexOf(g)>-1&&(p="return vec4(outputValue.xx, outputValue.zz);");}}else p="\n      return vec4(outputValue.xy, outputValue.xy);\n    ";return "\n    vec4 "+a+"() {\n      "+c+" coords = getOutputCoords();\n      "+n+"\n      vec4 outputValue = get"+o+"("+f+");\n      "+p+"\n    }\n  "}(t,e):function(t,e){var n=t.name,r=n.charAt(0).toUpperCase()+n.slice(1),o="get"+r+"AtOutCoords",a=e.texShape,i=t.shapeInfo.texShape,u=t.shapeInfo.logicalShape.length,s=e.logicalShape.length;if(!t.shapeInfo.isUniform&&u===s&&null==t.shapeInfo.flatOffset&&C(i,a))return "\n      float "+o+"() {\n        return sampleTexture("+n+", resultUV);\n      }\n    ";var c,l=aa(s),h=ho(t.shapeInfo.logicalShape,e.logicalShape),f=s-u,p=["x","y","z","w","u","v"];c=0===u?"":s<2&&h.length>=1?"coords = 0;":h.map(function(t){return "coords."+p[t+f]+" = 0;"}).join("\n");var d="";d=s<2&&u>0?"coords":t.shapeInfo.logicalShape.map(function(t,e){return "coords."+p[e+f]}).join(", ");return "\n    float "+o+"() {\n      "+l+" coords = getOutputCoords();\n      "+c+"\n      return get"+r+"("+d+");\n    }\n  "}(t,e));return r}(t,e,r)}).join("\n"),c=e.texShape,l=Ko(),h=function(t){return "\n    float sampleTexture(sampler2D textureSampler, vec2 uv) {\n      return "+t.texture2D+"(textureSampler, uv).r;\n    }\n  "}(l),f=function(t){return t.version+"\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    "+t.varyingFs+" vec2 resultUV;\n    "+t.defineOutput+"\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    uniform float NAN;\n    "+t.defineSpecialNaN+"\n    "+t.defineSpecialInf+"\n    "+t.defineRound+"\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    int idiv(int a, int b, float sign) {\n      int res = a / b;\n      int mod = imod(a, b);\n      if (sign < 0. && mod != 0) {\n        res -= 1;\n      }\n      return res;\n    }\n\n    //Based on the work of Dave Hoskins\n    //https://www.shadertoy.com/view/4djSRW\n    #define HASHSCALE1 443.8975\n    float random(float seed){\n      vec2 p = resultUV * seed;\n      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);\n      p3 += dot(p3, p3.yzx + 19.19);\n      return fract((p3.x + p3.y) * p3.z);\n    }\n\n    "+Zo+"\n    "+ta+"\n    "+ea+"\n  "}(l);return e.isPacked?(a=function(t,e){switch(t.length){case 0:return "\n    int getOutputCoords() {\n      return 0;\n    }\n  ";case 1:return function(t,e){var n=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];if(1===n[0])return "\n      int getOutputCoords() {\n        return 2 * int(resultUV.x * "+n[1]+".0);\n      }\n    ";if(1===n[1])return "\n      int getOutputCoords() {\n        return 2 * int(resultUV.y * "+n[0]+".0);\n      }\n    ";return "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2("+n[0]+", "+n[1]+"));\n      return 2 * (resTexRC.x * "+n[1]+" + resTexRC.y);\n    }\n  "}(0,e);case 2:return function(t,e){var n=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)];if(C(t,e))return "\n      ivec2 getOutputCoords() {\n        return 2 * ivec2(resultUV.yx * vec2("+n[0]+", "+n[1]+"));\n      }\n    ";var r=Math.ceil(t[1]/2);return "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2("+n[0]+", "+n[1]+"));\n\n      int index = resTexRC.x * "+n[1]+" + resTexRC.y;\n      int r = 2 * (index / "+r+");\n      int c = imod(index, "+r+") * 2;\n\n      return ivec2(r, c);\n    }\n  "}(t,e);case 3:return n=t,r=e,o=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)],a=Math.ceil(n[2]/2),i=a*Math.ceil(n[1]/2),"\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2("+o[0]+", "+o[1]+"));\n      int index = resTexRC.x * "+o[1]+" + resTexRC.y;\n\n      int b = index / "+i+";\n      index -= b * "+i+";\n\n      int r = 2 * (index / "+a+");\n      int c = imod(index, "+a+") * 2;\n\n      return ivec3(b, r, c);\n    }\n  ";default:return function(t,e){for(var n=[Math.ceil(e[0]/2),Math.ceil(e[1]/2)],r=Math.ceil(t[t.length-1]/2),o=r*Math.ceil(t[t.length-2]/2),a=o,i="",u="b, r, c",s=2;s<t.length-1;s++)a*=t[t.length-s-1],i="\n      int b"+s+" = index / "+a+";\n      index -= b"+s+" * "+a+";\n    "+i,u="b"+s+", "+u;return "\n    ivec"+t.length+" getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2("+n[0]+", "+n[1]+"));\n      int index = resTexRC.x * "+n[1]+" + resTexRC.y;\n\n      "+i+"\n\n      int b = index / "+o+";\n      index -= b * "+o+";\n\n      int r = 2 * (index / "+r+");\n      int c = imod(index, "+r+") * 2;\n\n      return ivec"+t.length+"("+u+");\n    }\n  "}(t,e)}var n,r,o,a,i;}(e.logicalShape,c),i=function(t){return "\n    void setOutput(vec4 val) {\n      "+t.output+" = val;\n    }\n  "}(l)):(a=function(t,e){switch(t.length){case 0:return "\n    int getOutputCoords() {\n      return 0;\n    }\n  ";case 1:return function(t,e){if(1===e[0])return "\n      int getOutputCoords() {\n        return int(resultUV.x * "+e[1]+".0);\n      }\n    ";if(1===e[1])return "\n      int getOutputCoords() {\n        return int(resultUV.y * "+e[0]+".0);\n      }\n    ";return "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2("+e[0]+", "+e[1]+"));\n      return resTexRC.x * "+e[1]+" + resTexRC.y;\n    }\n  "}(0,e);case 2:return function(t,e){if(C(t,e))return "\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2("+e[0]+", "+e[1]+"));\n      }\n    ";if(1===t[1])return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2("+e[0]+", "+e[1]+"));\n        int index = resTexRC.x * "+e[1]+" + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    ";if(1===t[0])return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2("+e[0]+", "+e[1]+"));\n        int index = resTexRC.x * "+e[1]+" + resTexRC.y;\n        return ivec2(0, index);\n      }\n    ";return "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2("+e[0]+", "+e[1]+"));\n      int index = resTexRC.x * "+e[1]+" + resTexRC.y;\n      int r = index / "+t[1]+";\n      int c = index - r * "+t[1]+";\n      return ivec2(r, c);\n    }\n  "}(t,e);case 3:return n=e,r=jo(["r","c","d"],t),"\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2("+n[0]+", "+n[1]+"));\n      int index = resTexRC.x * "+n[1]+" + resTexRC.y;\n      "+r+"\n      return ivec3(r, c, d);\n    }\n  ";case 4:return function(t,e){var n=jo(["r","c","d","d2"],t);return "\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2("+e[0]+", "+e[1]+"));\n      int index = resTexRC.x * "+e[1]+" + resTexRC.y;\n      "+n+"\n      return ivec4(r, c, d, d2);\n    }\n  "}(t,e);case 5:return function(t,e){var n=jo(["r","c","d","d2","d3"],t);return "\n    ivec5 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx * vec2("+e[0]+",\n                             "+e[1]+"));\n\n      int index = resTexRC.x * "+e[1]+" + resTexRC.y;\n\n      "+n+"\n\n      ivec5 outShape = ivec5(r, c, d, d2, d3);\n      return outShape;\n    }\n  "}(t,e);case 6:return function(t,e){var n=jo(["r","c","d","d2","d3","d4"],t);return "\n    ivec6 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2("+e[0]+", "+e[1]+"));\n      int index = resTexRC.x * "+e[1]+" + resTexRC.y;\n\n      "+n+"\n\n      ivec6 result = ivec6(r, c, d, d2, d3, d4);\n      return result;\n    }\n  "}(t,e);default:throw new Error(t.length+"-D output sampling is not yet supported")}var n,r;}(e.logicalShape,c),i=function(t){return "\n    void setOutput(float val) {\n      "+t.output+" = vec4(val, 0, 0, 0);\n    }\n  "}(l)),r&&(f+=na),[f,h,i,u,a,s,n].join("\n")}function Qo(t){var e=t.shapeInfo.logicalShape;switch(e.length){case 0:return function(t){var e=t.name,n="get"+e.charAt(0).toUpperCase()+e.slice(1);if(t.shapeInfo.isUniform)return "float "+n+"() {return "+e+";}";var r=t.shapeInfo.texShape,o=r[0],a=r[1];if(1===o&&1===a)return "\n      float "+n+"() {\n        return sampleTexture("+e+", halfCR);\n      }\n    ";var i=t.shapeInfo.texShape,u=i[0],s=i[1],c=ra(e);return "\n    float "+n+"() {\n      vec2 uv = uvFromFlat("+u+", "+s+", "+c+");\n      return sampleTexture("+e+", uv);\n    }\n  "}(t);case 1:return function(t){var e=t.name,n="get"+e.charAt(0).toUpperCase()+e.slice(1);if(t.shapeInfo.isUniform)return "\n      float "+n+"(int index) {\n        "+oa(t)+"\n      }\n    ";var r=t.shapeInfo.texShape,o=r[0],a=r[1];if(1===a&&1===o)return "\n      float "+n+"(int index) {\n        return sampleTexture("+e+", halfCR);\n      }\n    ";var i=ra(e);if(1===a)return "\n      float "+n+"(int index) {\n        vec2 uv = vec2(0.5, (float(index + "+i+") + 0.5) / "+o+".0);\n        return sampleTexture("+e+", uv);\n      }\n    ";if(1===o)return "\n      float "+n+"(int index) {\n        vec2 uv = vec2((float(index + "+i+") + 0.5) / "+a+".0, 0.5);\n        return sampleTexture("+e+", uv);\n      }\n    ";return "\n    float "+n+"(int index) {\n      vec2 uv = uvFromFlat("+o+", "+a+", index + "+i+");\n      return sampleTexture("+e+", uv);\n    }\n  "}(t);case 2:return function(t){var e=t.shapeInfo.logicalShape,n=t.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t.shapeInfo.texShape;if(null!=o&&C(e,o)){var a=o[0],i=o[1];return "\n    float "+r+"(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2("+i+".0, "+a+".0);\n      return sampleTexture("+n+", uv);\n    }\n  "}var u=T(e),s=u.newShape,c=u.keptDims,l=s;if(l.length<e.length){var h=ia(t,l);return "\n      "+Qo(h)+"\n      float "+r+"(int row, int col) {\n        return "+r+"("+ua(["row","col"],c)+");\n      }\n    "}if(t.shapeInfo.isUniform)return "\n      float "+r+"(int row, int col) {\n        int index = round(dot(vec2(row, col), vec2("+e[1]+", 1)));\n        "+oa(t)+"\n      }\n    ";var f=o[0],p=o[1],d=ra(n);if(1===p)return "\n    float "+r+"(int row, int col) {\n      float index = dot(vec3(row, col, "+d+"), vec3("+e[1]+", 1, 1));\n      vec2 uv = vec2(0.5, (index + 0.5) / "+f+".0);\n      return sampleTexture("+n+", uv);\n    }\n  ";if(1===f)return "\n    float "+r+"(int row, int col) {\n      float index = dot(vec3(row, col, "+d+"), vec3("+e[1]+", 1, 1));\n      vec2 uv = vec2((index + 0.5) / "+p+".0, 0.5);\n      return sampleTexture("+n+", uv);\n    }\n  ";return "\n  float "+r+"(int row, int col) {\n    // Explicitly use integer operations as dot() only works on floats.\n    int index = row * "+e[1]+" + col + "+d+";\n    vec2 uv = uvFromFlat("+f+", "+p+", index);\n    return sampleTexture("+n+", uv);\n  }\n"}(t);case 3:return function(t){var e=t.shapeInfo.logicalShape,n=t.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e[1]*e[2],a=e[2],i=T(e),u=i.newShape,s=i.keptDims,c=u;if(c.length<e.length){var l=ia(t,c);return "\n        "+Qo(l)+"\n        float "+r+"(int row, int col, int depth) {\n          return "+r+"("+ua(["row","col","depth"],s)+");\n        }\n      "}if(t.shapeInfo.isUniform)return "\n      float "+r+"(int row, int col, int depth) {\n        int index = round(dot(vec3(row, col, depth),\n                          vec3("+o+", "+a+", 1)));\n        "+oa(t)+"\n      }\n    ";var h=t.shapeInfo.texShape,f=h[0],p=h[1],d=t.shapeInfo.flatOffset;if(p===o&&null==d)return "\n        float "+r+"(int row, int col, int depth) {\n          float texR = float(row);\n          float texC = dot(vec2(col, depth), vec2("+a+", 1));\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2("+p+".0, "+f+".0);\n          return sampleTexture("+n+", uv);\n        }\n      ";if(p===a&&null==d)return "\n    float "+r+"(int row, int col, int depth) {\n      float texR = dot(vec2(row, col), vec2("+e[1]+", 1));\n      float texC = float(depth);\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2("+p+".0, "+f+".0);\n      return sampleTexture("+n+", uv);\n    }\n  ";var v=ra(n);return "\n      float "+r+"(int row, int col, int depth) {\n        // Explicitly use integer operations as dot() only works on floats.\n        int index = row * "+o+" + col * "+a+" + depth + "+v+";\n        vec2 uv = uvFromFlat("+f+", "+p+", index);\n        return sampleTexture("+n+", uv);\n      }\n  "}(t);case 4:return function(t){var e=t.shapeInfo.logicalShape,n=t.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e[3],a=e[2]*o,i=e[1]*a,u=T(e),s=u.newShape,c=u.keptDims;if(s.length<e.length){var l=ia(t,s);return "\n      "+Qo(l)+"\n      float "+r+"(int row, int col, int depth, int depth2) {\n        return "+r+"("+ua(["row","col","depth","depth2"],c)+");\n      }\n    "}if(t.shapeInfo.isUniform)return "\n      float "+r+"(int row, int col, int depth, int depth2) {\n        int index = round(dot(vec4(row, col, depth, depth2),\n                          vec4("+i+", "+a+", "+o+", 1)));\n        "+oa(t)+"\n      }\n    ";var h=t.shapeInfo.flatOffset,f=t.shapeInfo.texShape,p=f[0],d=f[1];if(d===i&&null==h)return "\n      float "+r+"(int row, int col, int depth, int depth2) {\n        float texR = float(row);\n        float texC =\n            dot(vec3(col, depth, depth2),\n                vec3("+a+", "+o+", 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2("+d+".0, "+p+".0);\n        return sampleTexture("+n+", uv);\n      }\n    ";if(d===o&&null==h)return "\n      float "+r+"(int row, int col, int depth, int depth2) {\n        float texR = dot(vec3(row, col, depth),\n                         vec3("+e[1]*e[2]+", "+e[2]+", 1));\n        float texC = float(depth2);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2("+d+".0, "+p+".0);\n        return sampleTexture("+n+", uv);\n      }\n    ";var v=ra(n);return "\n    float "+r+"(int row, int col, int depth, int depth2) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * "+i+" + col * "+a+" +\n          depth * "+o+" + depth2;\n      vec2 uv = uvFromFlat("+p+", "+d+", index + "+v+");\n      return sampleTexture("+n+", uv);\n    }\n  "}(t);case 5:return function(t){var e=t.shapeInfo.logicalShape,n=t.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e[4],a=e[3]*o,i=e[2]*a,u=e[1]*i,s=T(e),c=s.newShape,l=s.keptDims;if(c.length<e.length){var h=ia(t,c);return "\n      "+Qo(h)+"\n      float "+r+"(int row, int col, int depth, int depth2, int depth3) {\n        return "+r+"("+ua(["row","col","depth","depth2","depth3"],l)+");\n      }\n    "}if(t.shapeInfo.isUniform)return "\n      float "+r+"(int row, int col, int depth, int depth2, int depth3) {\n        float index = dot(\n          vec4(row, col, depth, depth2),\n          vec4("+u+", "+i+", "+a+", "+o+")) +\n          depth3;\n        "+oa(t)+"\n      }\n    ";var f=t.shapeInfo.flatOffset,p=t.shapeInfo.texShape,d=p[0],v=p[1];if(v===u&&null==f)return "\n      float "+r+"(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n                         vec4("+i+", "+a+", "+o+", 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2("+v+".0, "+d+".0);\n        return sampleTexture("+n+", uv);\n      }\n    ";if(v===o&&null==f)return "\n      float "+r+"(int row, int col, int depth, int depth2, int depth3) {\n        float texR = dot(\n          vec4(row, col, depth, depth2),\n          vec4("+e[1]*e[2]*e[3]+",\n               "+e[2]*e[3]+", "+e[3]+", 1));\n        int texC = depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2("+v+".0, "+d+".0);\n        return sampleTexture("+n+", uv);\n      }\n    ";var m=ra(n);return "\n    float "+r+"(int row, int col, int depth, int depth2, int depth3) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * "+u+" + col * "+i+" + depth * "+a+" +\n          depth2 * "+o+" + depth3 + "+m+";\n      vec2 uv = uvFromFlat("+d+", "+v+", index);\n      return sampleTexture("+n+", uv);\n    }\n  "}(t);case 6:return function(t){var e=t.shapeInfo.logicalShape,n=t.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=T(e),a=o.newShape,i=o.keptDims;if(a.length<e.length){var u=ia(t,a);return "\n      "+Qo(u)+"\n      float "+r+"(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        return "+r+"("+ua(["row","col","depth","depth2","depth3","depth4"],i)+");\n      }\n    "}var s=e[5],c=e[4]*s,l=e[3]*c,h=e[2]*l,f=e[1]*h;if(t.shapeInfo.isUniform)return "\n      float "+r+"(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n        int index = round(dot(\n          vec4(row, col, depth, depth2),\n          vec4("+f+", "+h+", "+l+", "+c+")) +\n          dot(\n            vec2(depth3, depth4),\n            vec2("+s+", 1)));\n        "+oa(t)+"\n      }\n    ";var p=t.shapeInfo.flatOffset,d=t.shapeInfo.texShape,v=d[0],m=d[1];if(m===f&&null==p)return "\n      float "+r+"(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n          vec4("+h+", "+l+", "+c+", "+s+")) +\n               float(depth4);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2("+m+".0, "+v+".0);\n        return sampleTexture("+n+", uv);\n      }\n    ";if(m===s&&null==p)return "\n      float "+r+"(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        float texR = dot(vec4(row, col, depth, depth2),\n          vec4("+e[1]*e[2]*e[3]*e[4]+",\n               "+e[2]*e[3]*e[4]+",\n               "+e[3]*e[4]+",\n               "+e[4]+")) + float(depth3);\n        int texC = depth4;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2("+m+".0, "+v+".0);\n        return sampleTexture("+n+", uv);\n      }\n    ";var g=ra(n);return "\n    float "+r+"(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * "+f+" + col * "+h+" + depth * "+l+" +\n          depth2 * "+c+" + depth3 * "+s+" + depth4 + "+g+";\n      vec2 uv = uvFromFlat("+v+", "+m+", index);\n      return sampleTexture("+n+", uv);\n    }\n  "}(t);default:throw new Error(e.length+"-D input sampling is not yet supported")}}function Jo(t){var e,n,r;switch(t.shapeInfo.logicalShape.length){case 0:return e=t.name,n="get"+e.charAt(0).toUpperCase()+e.slice(1),r=Ko(),"\n    vec4 "+n+"() {\n      return "+r.texture2D+"("+e+", halfCR);\n    }\n  ";case 1:return function(t){var e=t.name,n="get"+e.charAt(0).toUpperCase()+e.slice(1),r=t.shapeInfo.texShape,o=[Math.ceil(r[0]/2),Math.ceil(r[1]/2)],a=Ko();return "\n    vec4 "+n+"(int index) {\n      vec2 uv = packedUVfrom1D(\n        "+o[0]+", "+o[1]+", index);\n      return "+a.texture2D+"("+e+", uv);\n    }\n  "}(t);case 2:return function(t){var e=t.shapeInfo.logicalShape,n=t.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t.shapeInfo.texShape,a=o[0],i=o[1],u=Ko();if(null!=o&&C(e,o))return "\n      vec4 "+r+"(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2("+i+".0, "+a+".0);\n\n        return "+u.texture2D+"("+n+", uv);\n      }\n    ";var s=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)],c=Math.ceil(e[1]/2);return "\n    vec4 "+r+"(int row, int col) {\n      vec2 uv = packedUVfrom2D("+c+", "+s[0]+", "+s[1]+", row, col);\n      return "+u.texture2D+"("+n+", uv);\n    }\n  "}(t);case 3:return function(t){var e=t.shapeInfo.logicalShape,n=t.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=t.shapeInfo.texShape,a=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];if(1===e[0]){var i=e.slice(1),u=ia(t,i);return "\n        "+Jo(u)+"\n        vec4 "+r+"(int b, int row, int col) {\n          return "+r+"("+ua(["b","row","col"],[1,2])+");\n        }\n      "}var s=a[0],c=a[1],l=Math.ceil(e[2]/2),h=l*Math.ceil(e[1]/2),f=Ko();return "\n    vec4 "+r+"(int b, int row, int col) {\n      vec2 uv = packedUVfrom3D(\n        "+s+", "+c+", "+h+", "+l+", b, row, col);\n      return "+f.texture2D+"("+n+", uv);\n    }\n  "}(t);default:return function(t){for(var e=t.shapeInfo.logicalShape,n=e.length,r=t.name,o="get"+r.charAt(0).toUpperCase()+r.slice(1),a=t.shapeInfo.texShape,i=[Math.ceil(a[0]/2),Math.ceil(a[1]/2)],u=i[0],s=i[1],c=Math.ceil(e[n-1]/2),l=c*Math.ceil(e[n-2]/2),h="int b, int row, int col",f="b * "+l+" + (row / 2) * "+c+" + (col / 2)",p=2;p<n-1;p++)h="int b"+p+", "+h,l*=e[n-p-1],f="b"+p+" * "+l+" + "+f;var d=Ko();return "\n    vec4 "+o+"("+h+") {\n      int index = "+f+";\n      int texR = index / "+s+";\n      int texC = index - texR * "+s+";\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2("+s+", "+u+");\n      return "+d.texture2D+"("+r+", uv);\n    }\n  "}(t)}}var Zo="\nvec2 uvFromFlat(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\nvec2 packedUVfrom1D(int texNumR, int texNumC, int index) {\n  int texelIndex = index / 2;\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",ta="\nvec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,\n  int texNumC, int row, int col) {\n  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",ea="\nvec2 packedUVfrom3D(int texNumR, int texNumC,\n    int texelsInBatch, int texelsInLogicalRow, int b,\n    int row, int col) {\n  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",na="\n  float getChannel(vec4 frag, vec2 innerDims) {\n    vec2 modCoord = mod(innerDims, 2.);\n    return modCoord.x == 0. ?\n      (modCoord.y == 0. ? frag.r : frag.g) :\n      (modCoord.y == 0. ? frag.b : frag.a);\n  }\n  float getChannel(vec4 frag, int dim) {\n    float modCoord = mod(float(dim), 2.);\n    return modCoord == 0. ? frag.r : frag.g;\n  }\n";function ra(t){return "offset"+t}function oa(t){var e=t.name,n=w(t.shapeInfo.logicalShape);return n<2?"return "+e+";":"\n    for (int i = 0; i < "+n+"; i++) {\n      if (i == index) {\n        return "+e+"[i];\n      }\n    }\n  "}function aa(t){if(t<=1)return "int";if(2===t)return "ivec2";if(3===t)return "ivec3";if(4===t)return "ivec4";if(5===t)return "ivec5";if(6===t)return "ivec6";throw Error("GPU for rank "+t+" is not yet supported")}function ia(t,e){var n=JSON.parse(JSON.stringify(t));return n.shapeInfo.logicalShape=e,n}function ua(t,e){return e.map(function(e){return t[e]}).join(", ")}var sa=function(){return function(t,e,n,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,g(t.length>2,function(){return "Packed arg"+(n.charAt(0).toUpperCase()+n.slice(1))+" supports only inputs with rank above 2."});var o=t[t.length-1],a=Math.ceil(o/e);this.outputShape=t.slice(0,-1),a>1&&this.outputShape.push(a),r||this.variableNames.push("bestIndicesA");var i,u,s=this.outputShape,c=s.length,l=aa(c),h=qo("coords",c);if(1===a){var f=aa(u=c+1);i="\n        "+f+" sourceLocR = "+f+"("+h.join()+", 0);\n        ++"+h[c-1]+";\n        "+f+" sourceLocG = "+f+"("+h.join()+", 0);\n        ++"+h[c-2]+";\n        "+f+" sourceLocA = "+f+"("+h.join()+", 0);\n        --"+h[c-1]+";\n        "+f+" sourceLocB = "+f+"("+h.join()+", 0);\n        --"+h[c-2]+";";}else u=c,i="\n        "+l+" sourceLocR = coords;\n        ++"+h[c-1]+";\n        "+l+" sourceLocG = coords;\n        ++"+h[c-2]+";\n        "+l+" sourceLocA = coords;\n        --"+h[c-1]+";\n        "+l+" sourceLocB = coords;\n        --"+h[c-2]+";";var p=["x","y","z","w","u","v"].slice(0,u),d="."+p[u-1],v=p.map(function(t){return "int "+t}),m=qo("sourceLocR",u-1).concat("inIdx.r"),y=qo("sourceLocG",u-1).concat("inIdx.g"),x=qo("sourceLocB",u-1).concat("inIdx.b"),b=qo("sourceLocA",u-1).concat("inIdx.a"),w="max"===n?"greaterThan":"lessThan",C=r?"":"\n          inIdx = round(vec4(getBestIndicesAChannel("+m.join()+"),\n                             getBestIndicesAChannel("+y.join()+"),\n                             getBestIndicesAChannel("+x.join()+"),\n                             getBestIndicesAChannel("+b.join()+")));",E="vec4(\n            getAChannel("+m.join()+"),\n            hasNextCol ? getAChannel("+y.join()+") : 0.,\n            hasNextRow ? getAChannel("+x.join()+") : 0.,\n            hasNextRow && hasNextCol ? getAChannel("+b.join()+") : 0.)",R=r?"":"\n      float getBestIndicesAChannel("+v.join()+") {\n        return getChannel(getBestIndicesA("+p.join()+"),\n                                          vec2("+p.slice(-2).join()+"));\n      }";this.userCode="\n      float getAChannel("+v.join()+") {\n        return getChannel(getA("+p.join()+"),\n                               vec2("+p.slice(-2).join()+"));\n      }\n      "+R+"\n      void main() {\n        "+l+" coords = getOutputCoords();\n        bool hasNextCol = "+h[c-1]+" < "+(s[c-1]-1)+";\n        bool hasNextRow = "+h[c-2]+" < "+(s[c-2]-1)+";\n        "+i+"\n        ivec4 srcIdx = ivec4(sourceLocR"+d+", sourceLocG"+d+",\n          sourceLocB"+d+", sourceLocA"+d+") * "+e+";\n        ivec4 inIdx = srcIdx;\n        vec4 bestIndex = vec4(inIdx);\n        vec4 bestValue = "+E+";\n\n        for (int i = 0; i < "+e+"; i++) {\n          inIdx = srcIdx;\n          "+C+"\n          vec4 candidate = "+E+";\n          bvec4 nan = isnan(candidate);\n          bvec4 replace = bvec4(\n            vec4("+w+"(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));\n\n          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,\n                           replace.y  ? candidate.y : bestValue.y,\n                           replace.z  ? candidate.z : bestValue.z,\n                           replace.w  ? candidate.w : bestValue.w);\n          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));\n          srcIdx++;\n        }\n        setOutput(bestIndex);\n      }\n    ";}}(),ca=function(){return function(t){this.variableNames=["dy"],this.outputShape=t.inShape;var e=t.filterHeight,n=t.filterWidth,r=t.strideHeight,o=t.strideWidth,a=t.dilationHeight,i=t.dilationWidth,u=t.effectiveFilterHeight,s=t.effectiveFilterWidth,c=u-1-t.padInfo.top,l=s-1-t.padInfo.left,h=1/(e*n);this.userCode="\n      const ivec2 pads = ivec2("+c+", "+l+");\n      const float avgMultiplier = float("+h+");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < "+u+";\n            wR += "+a+") {\n          float dyR = float(dyRCorner + wR) / "+r+".0;\n\n          if (dyR < 0.0 || dyR >= "+t.outHeight+".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < "+s+";\n            wC+= "+i+") {\n            float dyC = float(dyCCorner + wC) / "+o+".0;\n\n            if (dyC < 0.0 || dyC >= "+t.outWidth+".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n\n            dotProd += dyValue * avgMultiplier;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),la=function(){return function(t){this.variableNames=["dy"],this.outputShape=t.inShape;var e=t.filterDepth,n=t.filterHeight,r=t.filterWidth,o=t.strideDepth,a=t.strideHeight,i=t.strideWidth,u=t.dilationDepth,s=t.dilationHeight,c=t.dilationWidth,l=t.effectiveFilterDepth,h=t.effectiveFilterHeight,f=t.effectiveFilterWidth,p=l-1-t.padInfo.front,d=h-1-t.padInfo.top,v=f-1-t.padInfo.left,m=1/(e*n*r);this.userCode="\n      const ivec3 pads = ivec3("+p+", "+d+", "+v+");\n      const float avgMultiplier = float("+m+");\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyDCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get\n        // dx(xD, xR, xC, ch).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int wD = 0; wD < "+l+";\n            wD += "+u+") {\n          float dyD = float(dyDCorner + wD) / "+o+".0;\n\n          if (dyD < 0.0 || dyD >= "+t.outDepth+".0 || fract(dyD) > 0.0) {\n            continue;\n          }\n          int idyD = int(dyD);\n\n          for (int wR = 0; wR < "+h+";\n              wR += "+s+") {\n            float dyR = float(dyRCorner + wR) / "+a+".0;\n\n            if (dyR < 0.0 || dyR >= "+t.outHeight+".0 ||\n                fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            for (int wC = 0; wC < "+f+";\n                wC += "+c+") {\n              float dyC = float(dyCCorner + wC) / "+i+".0;\n\n              if (dyC < 0.0 || dyC >= "+t.outWidth+".0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              float dyValue = getDy(batch, idyD, idyR, idyC, ch);\n\n              dotProd += dyValue * avgMultiplier;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),ha=function(){return function(t,e,n,r,o,a){this.outputShape=[],this.variableNames=["x","mean","variance"],po(t,e),po(t,n);var i="0.0";null!=r&&(po(t,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var u="1.0";null!=o&&(po(t,o),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=t,this.userCode="\n      void main() {\n        float x = getXAtOutCoords();\n        float mean = getMeanAtOutCoords();\n        float variance = getVarianceAtOutCoords();\n        float offset = "+i+";\n        float scale = "+u+";\n        float inv = scale * inversesqrt(variance + float("+a+"));\n        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));\n      }\n    ";}}(),fa=function(){return function(t,e,n,r,o,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],po(t,e),po(t,n);var i="vec4(0.0)";null!=r&&(po(t,r),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var u="vec4(1.0)";null!=o&&(po(t,o),this.variableNames.push("scale"),u="getScaleAtOutCoords()"),this.outputShape=t,this.userCode="\n      void main() {\n        vec4 offset = "+i+";\n        vec4 scale = "+u+";\n\n        vec4 x = getXAtOutCoords();\n        vec4 mean = getMeanAtOutCoords();\n        vec4 variance = getVarianceAtOutCoords();\n\n        vec4 inv = scale * inversesqrt(variance + vec4("+a+"));\n\n        setOutput((x - mean) * inv + offset);\n      }\n    ";}}(),pa="return areal * breal - aimag * bimag;",da="return areal * bimag + aimag * breal;",va=function(){return function(t,e,n){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=po(e,n),this.userCode="\n      float binaryOpComplex(\n          float areal, float aimag, float breal, float bimag) {\n        "+t+"\n      }\n\n      void main() {\n        float areal = getARealAtOutCoords();\n        float aimag = getAImagAtOutCoords();\n        float breal = getBRealAtOutCoords();\n        float bimag = getBImagAtOutCoords();\n        setOutput(binaryOpComplex(areal, aimag, breal, bimag));\n      }\n    ";}}(),ma="return a + b;",ga="return a - b;",ya="return a * b;",xa="return (a < 0.) ? b * a : a;",ba=function(){return function(t,e,n){this.variableNames=["A","B"],this.outputShape=po(e,n),this.userCode="\n      float binaryOperation(float a, float b) {\n        "+t+"\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    ";}}(),wa="\n  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));\n  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);\n",Ca=function(){return function(t,e,n,r){void 0===r&&(r=!1),this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=po(e,n);var o=this.outputShape.length,a="";if(r)if(0===o||1===w(this.outputShape))a="\n          result.y = 0.;\n          result.z = 0.;\n          result.w = 0.;\n        ";else if(a="\n          "+aa(o)+" coords = getOutputCoords();\n        ",1===o)a+="\n            result.y = (coords + 1) >= "+this.outputShape[0]+" ? 0. : result.y;\n            result.z = 0.;\n            result.w = 0.;\n          ";else{var i=qo("coords",o);a+="\n            bool nextRowOutOfBounds =\n              ("+i[o-2]+" + 1) >= "+this.outputShape[o-2]+";\n            bool nextColOutOfBounds =\n              ("+i[o-1]+" + 1) >= "+this.outputShape[o-1]+";\n            result.y = nextColOutOfBounds ? 0. : result.y;\n            result.z = nextRowOutOfBounds ? 0. : result.z;\n            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;\n          ";}this.userCode="\n      vec4 binaryOperation(vec4 a, vec4 b) {\n        "+t+"\n      }\n\n      void main() {\n        vec4 a = getAAtOutCoords();\n        vec4 b = getBAtOutCoords();\n\n        vec4 result = binaryOperation(a, b);\n        "+a+"\n\n        setOutput(result);\n      }\n    ";}}(),Ea=function(){function t(t){this.variableNames=["A"],this.outputShape=t,this.userCode="\n      uniform float minVal;\n      uniform float maxVal;\n\n      void main() {\n        float value = getAAtOutCoords();\n        if (isnan(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, minVal, maxVal));\n      }\n    ";}return t.prototype.getCustomSetupFunc=function(t,e){var n=this;return function(r,o){null==n.minLoc&&(n.minLoc=r.getUniformLocationNoThrow(o,"minVal"),n.maxLoc=r.getUniformLocationNoThrow(o,"maxVal")),r.gl.uniform1f(n.minLoc,t),r.gl.uniform1f(n.maxLoc,e);}},t}(),Ra=function(){function t(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.userCode="\n      uniform float minVal;\n      uniform float maxVal;\n\n      void main() {\n        vec4 value = getAAtOutCoords();\n\n        if (any(isnan(value))) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));\n      }\n    ";}return t.prototype.getCustomSetupFunc=function(t,e){var n=this;return function(r,o){null==n.minLoc&&(n.minLoc=r.getUniformLocationNoThrow(o,"minVal"),n.maxLoc=r.getUniformLocationNoThrow(o,"maxVal")),r.gl.uniform1f(n.minLoc,t),r.gl.uniform1f(n.maxLoc,e);}},t}(),Ia=function(){return function(t){this.variableNames=["real","imag"],this.outputShape=t,this.userCode="\n      void main() {\n        float re = abs(getRealAtOutCoords());\n        float im = abs(getImagAtOutCoords());\n        float mx = max(re, im);\n\n        // sadly the length function in glsl is not underflow-safe\n        // (at least not on Intel GPUs). So the safe solution is\n        // to ensure underflow-safety in all cases.\n        setOutput(\n          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))\n        );\n      }\n    ";}}(),ka=function(){return function(t){this.outputShape=[],this.outputShape=wn(t,1),this.variableNames=t.map(function(t,e){return "T"+e});var e=new Array(t.length-1);e[0]=t[0][1];for(var n=1;n<e.length;n++)e[n]=e[n-1]+t[n][1];var r=["if (yC < "+e[0]+") setOutput(getT0(yR, yC));"];for(n=1;n<e.length;n++){var o=e[n-1];r.push("else if (yC < "+e[n]+") setOutput(getT"+n+"(yR, yC-"+o+"));");}var a=e.length,i=e[e.length-1];r.push("else setOutput(getT"+a+"(yR, yC-"+i+"));"),this.userCode="\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int yR = coords.x;\n        int yC = coords.y;\n\n        "+r.join("\n        ")+"\n      }\n    ";}}(),Sa=function(){return function(t,e){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=wn(t,e);var n=this.outputShape,r=n.length,o=aa(r),a=qo("coords",r),i=["x","y","z","w","u","v"].slice(0,r);this.variableNames=t.map(function(t,e){return "T"+e});var u=new Array(t.length-1);u[0]=t[0][e];for(var s=1;s<u.length;s++)u[s]=u[s-1]+t[s][e];var c=i[e],l=i.slice(-2),h=i.join(),f="if ("+c+" < "+u[0]+") {\n        return getChannel(\n            getT0("+h+"), vec2("+l.join()+"));\n        }";for(s=1;s<u.length;s++){var p=u[s-1];f+="\n        if ("+c+" < "+u[s]+"  && "+c+" >= "+u[s-1]+") {\n          return getChannel(\n            getT"+s+"("+Aa(i,c,p)+"),\n            vec2("+Aa(l,c,p)+"));\n        }";}var d=u.length,v=u[u.length-1];f+="\n        return getChannel(\n          getT"+d+"("+Aa(i,c,v)+"),\n          vec2("+Aa(l,c,v)+"));",this.userCode="\n      float getValue("+i.map(function(t){return "int "+t})+") {\n        "+f+"\n      }\n\n      void main() {\n        "+o+" coords = getOutputCoords();\n        vec4 result = vec4(getValue("+a+"), 0., 0., 0.);\n\n        "+a[r-1]+" = "+a[r-1]+" + 1;\n        if ("+a[r-1]+" < "+n[r-1]+") {\n          result.g = getValue("+a+");\n        }\n\n        "+a[r-2]+" = "+a[r-2]+" + 1;\n        if ("+a[r-2]+" < "+n[r-2]+") {\n          result.a = getValue("+a+");\n        }\n\n        "+a[r-1]+" = "+a[r-1]+" - 1;\n        if ("+a[r-2]+" < "+n[r-2]+" &&\n            "+a[r-1]+" < "+n[r-1]+") {\n          result.b = getValue("+a+");\n        }\n        setOutput(result);\n      }\n    ";}}();function Aa(t,e,n){var r=t.indexOf(e);return t.map(function(t,e){return e===r?t+" - "+n:t}).join()}var Da=function(){return function(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;var e=t.strideHeight,n=t.strideWidth,r=t.padInfo.top,o=t.padInfo.left,a="channelsLast"===t.dataFormat;this.userCode="\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int b = 0; b < "+t.batchSize+"; b++) {\n          for (int yR = 0; yR < "+t.outHeight+"; yR++) {\n            int xR = wR + yR * "+e+" - "+r+";\n\n            if (xR < 0 || xR >= "+t.inHeight+") {\n              continue;\n            }\n\n            for (int yC = 0; yC < "+t.outWidth+"; yC++) {\n              int xC = wC + yC * "+n+" - "+o+";\n\n              if (xC < 0 || xC >= "+t.inWidth+") {\n                continue;\n              }\n\n              if ("+a+") {\n                float dyValue = getDy(b, yR, yC, d2);\n                float xValue = getX(b, xR, xC, d1);\n                dotProd += (xValue * dyValue);\n              } else {\n                float dyValue = getDy(b, d2, yR, yC);\n                float xValue = getX(b, d1, xR, xC);\n                dotProd += (xValue * dyValue);\n              }\n\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Ta=function(){return function(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;var e=t.filterHeight,n=t.filterWidth,r=t.strideHeight,o=t.strideWidth,a="channelsLast"===t.dataFormat,i=e-1-t.padInfo.top,u=n-1-t.padInfo.left,s=a?1:2,c=a?2:3,l=a?3:1;this.userCode="\n      const ivec2 pads = ivec2("+i+", "+u+");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords["+l+"];\n\n        ivec2 dyCorner = ivec2(coords["+s+"], coords["+c+"]) - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < "+e+"; wR++) {\n          float dyR = float(dyRCorner + wR) / "+r+".0;\n\n          if (dyR < 0.0 || dyR >= "+t.outHeight+".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = "+e+" - 1 - wR;\n\n          for (int wC = 0; wC < "+n+"; wC++) {\n            float dyC = float(dyCCorner + wC) / "+o+".0;\n\n            if (dyC < 0.0 || dyC >= "+t.outWidth+".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = "+n+" - 1 - wC;\n\n            for (int d2 = 0; d2 < "+t.outChannels+"; d2++) {\n\n              if ("+a+") {\n                float xValue = getDy(batch, idyR, idyC, d2);\n                float wValue = getW(wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              } else {\n                float xValue = getDy(batch, d2, idyR, idyC);\n                float wValue = getW(wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              }\n\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Na=function(){return function(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;var e=t.strideDepth,n=t.strideHeight,r=t.strideWidth,o=t.padInfo.front,a=t.padInfo.top,i=t.padInfo.left;this.userCode="\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int wF = coords.x;\n        int wR = coords.y;\n        int wC = coords.z;\n        int d1 = coords.w;\n        int d2 = coords.u;\n\n        float dotProd = 0.0;\n\n        for (int b = 0; b < "+t.batchSize+"; b++) {\n          for (int yF = 0; yF < "+t.outDepth+"; yF++) {\n            int xF = wF + yF * "+e+" - "+o+";\n\n            if (xF < 0 || xF >= "+t.inDepth+") {\n              continue;\n            }\n\n            for (int yR = 0; yR < "+t.outHeight+"; yR++) {\n              int xR = wR + yR * "+n+" - "+a+";\n\n              if (xR < 0 || xR >= "+t.inHeight+") {\n                continue;\n              }\n\n              for (int yC = 0; yC < "+t.outWidth+"; yC++) {\n                int xC = wC + yC * "+r+" - "+i+";\n\n                if (xC < 0 || xC >= "+t.inWidth+") {\n                  continue;\n                }\n\n                float dyValue = getDy(b, yF, yR, yC, d2);\n                float xValue = getX(b, xF, xR, xC, d1);\n                dotProd += (xValue * dyValue);\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Fa=function(){return function(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;var e=t.filterDepth,n=t.filterHeight,r=t.filterWidth,o=t.strideDepth,a=t.strideHeight,i=t.strideWidth,u=e-1-t.padInfo.front,s=n-1-t.padInfo.top,c=r-1-t.padInfo.left;this.userCode="\n      const ivec3 pads = ivec3("+u+", "+s+", "+c+");\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int d1 = coords.u;\n\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyFCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        float dotProd = 0.0;\n        for (int wF = 0; wF < "+e+"; wF++) {\n          float dyF = float(dyFCorner + wF) / "+o+".0;\n\n          if (dyF < 0.0 || dyF >= "+t.outDepth+".0 || fract(dyF) > 0.0) {\n            continue;\n          }\n          int idyF = int(dyF);\n\n          int wFPerm = "+e+" - 1 - wF;\n\n          for (int wR = 0; wR < "+n+"; wR++) {\n            float dyR = float(dyRCorner + wR) / "+a+".0;\n\n            if (dyR < 0.0 || dyR >= "+t.outHeight+".0 ||\n              fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            int wRPerm = "+n+" - 1 - wR;\n\n            for (int wC = 0; wC < "+r+"; wC++) {\n              float dyC = float(dyCCorner + wC) / "+i+".0;\n\n              if (dyC < 0.0 || dyC >= "+t.outWidth+".0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              int wCPerm = "+r+" - 1 - wC;\n\n              for (int d2 = 0; d2 < "+t.outChannels+"; d2++) {\n                float xValue = getDy(batch, idyF, idyR, idyC, d2);\n                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Oa=function(){return function(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;var e=t.strideHeight,n=t.strideWidth,r=t.padInfo.top,o=t.padInfo.left,a=t.outChannels/t.inChannels;this.userCode="\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int dm = coords.w;\n        int d2 = d1 * "+a+" + dm;\n\n        float dotProd = 0.0;\n\n        // TO DO: Vec4 over the batch size\n        for (int b = 0; b < "+t.batchSize+"; b++) {\n          for (int yR = 0; yR < "+t.outHeight+"; yR++) {\n            int xR = wR + yR * "+e+" - "+r+";\n\n            if (xR < 0 || xR >= "+t.inHeight+") {\n              continue;\n            }\n\n            for (int yC = 0; yC < "+t.outWidth+"; yC++) {\n              int xC = wC + yC * "+n+" - "+o+";\n\n              if (xC < 0 || xC >= "+t.inWidth+") {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),_a=function(){return function(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;var e=t.filterHeight,n=t.filterWidth,r=t.strideHeight,o=t.strideWidth,a=e-1-t.padInfo.top,i=n-1-t.padInfo.left,u=t.outChannels/t.inChannels;this.userCode="\n      const ivec2 pads = ivec2("+a+", "+i+");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        float dotProd = 0.0;\n\n        for (int wR = 0; wR < "+e+"; wR++) {\n          float dyR = float(dyRCorner + wR) / "+r+".0;\n\n          if (dyR < 0.0 || dyR >= "+t.outHeight+".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = "+e+" - 1 - wR;\n\n          for (int wC = 0; wC < "+n+"; wC++) {\n            float dyC = float(dyCCorner + wC) / "+o+".0;\n\n            if (dyC < 0.0 || dyC >= "+t.outWidth+".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = "+n+" - 1 - wC;\n\n            // TO DO: Vec4 over the channelMul\n            for (int dm = 0; dm < "+u+"; dm++) {\n              int d2 = d1 * "+u+" + dm;\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, dm);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Ma=function(){return function(t,e,n,r){void 0===e&&(e=!1),void 0===n&&(n=null),void 0===r&&(r=!1),this.variableNames=["x","W"],this.outputShape=t.outShape;var o=t.padInfo.top,a=t.padInfo.left,i=t.strideHeight,u=t.strideWidth,s=t.dilationHeight,c=t.dilationWidth,l=t.filterHeight,h=t.filterWidth,f=4*Math.floor(t.inChannels/4),p=t.inChannels%4,d="channelsLast"===t.dataFormat,v=d?1:2,m=d?2:3,g=d?3:1,y="",x="";n&&(y=r?"float activation(float a) {\n          float b = getPreluActivationWeightsAtOutCoords();\n          "+n+"\n        }":"\n          float activation(float x) {\n            "+n+"\n          }\n        ",x="result = activation(result);");var b=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode="\n      "+y+"\n\n      const ivec2 strides = ivec2("+i+", "+u+");\n      const ivec2 pads = ivec2("+o+", "+a+");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d2 = coords["+g+"];\n\n        ivec2 xRCCorner =\n            ivec2(coords["+v+"], coords["+m+"]) * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < "+l+"; wR++) {\n          int xR = xRCorner + wR * "+s+";\n\n          if (xR < 0 || xR >= "+t.inHeight+") {\n            continue;\n          }\n\n          for (int wC = 0; wC < "+h+"; wC++) {\n            int xC = xCCorner + wC * "+c+";\n\n            if (xC < 0 || xC >= "+t.inWidth+") {\n              continue;\n            }\n\n            for (int d1 = 0; d1 < "+f+"; d1 += 4) {\n              vec4 wValues = vec4(\n                getW(wR, wC, d1, d2),\n                getW(wR, wC, d1 + 1, d2),\n                getW(wR, wC, d1 + 2, d2),\n                getW(wR, wC, d1 + 3, d2)\n              );\n\n              if ("+d+") {\n                vec4 xValues = vec4(\n                  getX(batch, xR, xC, d1),\n                  getX(batch, xR, xC, d1 + 1),\n                  getX(batch, xR, xC, d1 + 2),\n                  getX(batch, xR, xC, d1 + 3)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec4 xValues = vec4(\n                  getX(batch, d1, xR, xC),\n                  getX(batch, d1 + 1, xR, xC),\n                  getX(batch, d1 + 2, xR, xC),\n                  getX(batch, d1 + 3, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n            }\n\n            if ("+(1===p)+") {\n\n              if ("+d+") {\n                dotProd +=\n                    getX(batch, xR, xC, "+f+") *\n                    getW(wR, wC, "+f+", d2);\n              } else {\n                dotProd +=\n                    getX(batch, "+f+", xR, xC) *\n                    getW(wR, wC, "+f+", d2);\n              }\n\n            } else if ("+(2===p)+") {\n              vec2 wValues = vec2(\n                getW(wR, wC, "+f+", d2),\n                getW(wR, wC, "+f+" + 1, d2)\n              );\n\n              if ("+d+") {\n                vec2 xValues = vec2(\n                  getX(batch, xR, xC, "+f+"),\n                  getX(batch, xR, xC, "+f+" + 1)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec2 xValues = vec2(\n                  getX(batch, "+f+", xR, xC),\n                  getX(batch, "+f+" + 1, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n\n            } else if ("+(3===p)+") {\n              vec3 wValues = vec3(\n                getW(wR, wC, "+f+", d2),\n                getW(wR, wC, "+f+" + 1, d2),\n                getW(wR, wC, "+f+" + 2, d2)\n              );\n\n              if ("+d+") {\n                vec3 xValues = vec3(\n                  getX(batch, xR, xC, "+f+"),\n                  getX(batch, xR, xC, "+f+" + 1),\n                  getX(batch, xR, xC, "+f+" + 2)\n                );\n                dotProd += dot(xValues, wValues);\n              } else {\n                vec3 xValues = vec3(\n                  getX(batch, "+f+", xR, xC),\n                  getX(batch, "+f+" + 1, xR, xC),\n                  getX(batch, "+f+" + 2, xR, xC)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n\n            }\n          }\n        }\n\n        float result = dotProd;\n        "+b+"\n        "+x+"\n        setOutput(result);\n      }\n    ";}}(),Ba=function(){return function(t){this.variableNames=["x","W"],this.outputShape=t.outShape;var e=t.padInfo.front,n=t.padInfo.top,r=t.padInfo.left,o=t.strideDepth,a=t.strideHeight,i=t.strideWidth,u=t.dilationDepth,s=t.dilationHeight,c=t.dilationWidth,l=t.filterDepth,h=t.filterHeight,f=t.filterWidth,p=4*Math.floor(t.inChannels/4),d=t.inChannels%4;this.userCode="\n      const ivec3 strides = ivec3("+o+", "+a+", "+i+");\n      const ivec3 pads = ivec3("+e+", "+n+", "+r+");\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int d2 = coords.u;\n\n        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n        int xFCorner = xFRCCorner.x;\n        int xRCorner = xFRCCorner.y;\n        int xCCorner = xFRCCorner.z;\n\n        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get\n        // y(yF, yR, yC, d2). ? = to be determined. : = across all\n        // values in that axis.\n        float dotProd = 0.0;\n        for (int wF = 0; wF < "+l+"; wF++) {\n          int xF = xFCorner + wF * "+u+";\n\n          if (xF < 0 || xF >= "+t.inDepth+") {\n            continue;\n          }\n\n          for (int wR = 0; wR < "+h+"; wR++) {\n            int xR = xRCorner + wR * "+s+";\n\n            if (xR < 0 || xR >= "+t.inHeight+") {\n              continue;\n            }\n\n            for (int wC = 0; wC < "+f+"; wC++) {\n              int xC = xCCorner + wC * "+c+";\n\n              if (xC < 0 || xC >= "+t.inWidth+") {\n                continue;\n              }\n\n              for (int d1 = 0; d1 < "+p+"; d1 += 4) {\n                vec4 xValues = vec4(\n                  getX(batch, xF, xR, xC, d1),\n                  getX(batch, xF, xR, xC, d1 + 1),\n                  getX(batch, xF, xR, xC, d1 + 2),\n                  getX(batch, xF, xR, xC, d1 + 3)\n                );\n                vec4 wValues = vec4(\n                  getW(wF, wR, wC, d1, d2),\n                  getW(wF, wR, wC, d1 + 1, d2),\n                  getW(wF, wR, wC, d1 + 2, d2),\n                  getW(wF, wR, wC, d1 + 3, d2)\n                );\n\n                dotProd += dot(xValues, wValues);\n              }\n\n              if ("+(1===d)+") {\n                dotProd +=\n                  getX(batch, xF, xR, xC, "+p+") *\n                  getW(wF, wR, wC, "+p+", d2);\n              } else if ("+(2===d)+") {\n                vec2 xValues = vec2(\n                  getX(batch, xF, xR, xC, "+p+"),\n                  getX(batch, xF, xR, xC, "+p+" + 1)\n                );\n                vec2 wValues = vec2(\n                  getW(wF, wR, wC, "+p+", d2),\n                  getW(wF, wR, wC, "+p+" + 1, d2)\n                );\n                dotProd += dot(xValues, wValues);\n              } else if ("+(3===d)+") {\n                vec3 xValues = vec3(\n                  getX(batch, xF, xR, xC, "+p+"),\n                  getX(batch, xF, xR, xC, "+p+" + 1),\n                  getX(batch, xF, xR, xC, "+p+" + 2)\n                );\n                vec3 wValues = vec3(\n                  getW(wF, wR, wC, "+p+", d2),\n                  getW(wF, wR, wC, "+p+" + 1, d2),\n                  getW(wF, wR, wC, "+p+" + 2, d2)\n                );\n                dotProd += dot(xValues, wValues);\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Pa=function(){return function(t,e,n,r){void 0===e&&(e=!1),void 0===n&&(n=null),void 0===r&&(r=!1),this.variableNames=["x","W"],this.outputShape=t.outShape;var o=t.inHeight,a=t.inWidth,i=t.padInfo.top,u=t.padInfo.left,s=t.strideHeight,c=t.strideWidth,l=t.dilationHeight,h=t.dilationWidth,f=t.filterHeight,p=t.filterWidth,d=t.outChannels/t.inChannels,v="",m="";n&&(v=r?"float activation(float a) {\n          float b = getPreluActivationWeightsAtOutCoords();\n          "+n+"\n        }":"\n          float activation(float x) {\n            "+n+"\n          }\n        ",m="result = activation(result);");var g=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode="\n      "+v+"\n\n      const ivec2 strides = ivec2("+s+", "+c+");\n      const ivec2 pads = ivec2("+i+", "+u+");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / "+d+";\n        int q = d2 - d1 * "+d+";\n\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.\n        for (int wR = 0; wR < "+f+"; wR++) {\n          int xR = xRCorner + wR * "+l+";\n\n          if (xR < 0 || xR >= "+o+") {\n            continue;\n          }\n\n          for (int wC = 0; wC < "+p+"; wC++) {\n            int xC = xCCorner + wC * "+h+";\n\n            if (xC < 0 || xC >= "+a+") {\n              continue;\n            }\n\n            float xVal = getX(batch, xR, xC, d1);\n            float wVal = getW(wR, wC, d1, q);\n            dotProd += xVal * wVal;\n          }\n        }\n\n        float result = dotProd;\n        "+g+"\n        "+m+"\n        setOutput(result);\n      }\n    ";}}(),La=function(){return function(t,e,n,r){void 0===e&&(e=!1),void 0===n&&(n=null),void 0===r&&(r=!1),this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t.outShape;for(var o=t.inHeight,a=t.inWidth,i=t.padInfo.top,u=t.padInfo.left,s=t.strideHeight,c=t.strideWidth,l=t.dilationHeight,h=t.dilationWidth,f=t.filterHeight,p=t.filterWidth,d=p,m="int xR; int xC; int xCOffset;",g=0;g<f;g++)for(var y=0;y<p;y++)m+="\n          vec4 xTexelR"+g+"C"+2*y+" = vec4(0.);\n          vec4 wR"+g+"C"+y+" = vec4(0.);\n          vec4 xR"+g+"C"+y+" = vec4(0.);";for(g=0;g<f;g++)for(var x=0;x<d;x++){if(m+="\n          xR = xRCorner + "+g*l+";\n          xC = xCCorner + "+(y=2*x)*h+";\n        ",1===c){if(y<p&&(m+=u%2==1?"\n                xCOffset = xC + 1;\n                if(xR >= 0 && xR < "+o+" && xCOffset >= 0 && xCOffset < "+a+") {\n                  xTexelR"+g+"C"+y+" = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR"+g+"C"+y+" = vec4(0.);\n                }\n\n                xCOffset = xC + 1 - 2;\n                if(xR >= 0 && xR < "+o+" && xCOffset >= 0 && xCOffset < "+a+") {\n                  vec4 previous = getX(batch, xR, xCOffset, d1);\n                  xR"+g+"C"+y+" = vec4(previous.zw, xTexelR"+g+"C"+y+".xy);\n                } else {\n                  xR"+g+"C"+y+" = vec4(0, 0, xTexelR"+g+"C"+y+".xy);\n                }\n              ":"\n                if(xR >= 0 && xR < "+o+" && xC >= 0 && xC < "+a+") {\n                  xTexelR"+g+"C"+y+" = getX(batch, xR, xC, d1);\n                } else {\n                  xTexelR"+g+"C"+y+" = vec4(0.);\n                }\n\n                xR"+g+"C"+y+" = xTexelR"+g+"C"+y+";\n              ",y+1<p)){var b=u%2==0?v(h):h;h%2==0&&u%2==1||h%2!=0&&u%2!=1?(m+="\n                  xCOffset = xC + "+u%2+" + "+b+";\n\n                  if(xR >= 0 && xR < "+o+" &&\n                    xCOffset >= 0 && xCOffset < "+a+") {\n                    xTexelR"+g+"C"+(y+2)+" = getX(batch, xR, xCOffset, d1);\n                  }\n                ",h>1&&(m+="\n                    xCOffset -= 2;\n                    if(xR >= 0 && xR < "+o+" &&\n                      xCOffset >= 0 && xCOffset < "+a+") {\n                      xTexelR"+g+"C"+y+" = getX(batch, xR, xCOffset, d1);\n                    } else {\n                      xTexelR"+g+"C"+y+" = vec4(0.);\n                    }\n                  "),m+="\n                  xR"+g+"C"+(y+1)+" = vec4(\n                    xTexelR"+g+"C"+y+".zw, xTexelR"+g+"C"+(y+2)+".xy);\n                "):m+="\n                  xCOffset = xC + "+b+";\n\n                  if(xR >= 0 && xR < "+o+" &&\n                    xCOffset >= 0 && xCOffset < "+a+") {\n                    xTexelR"+g+"C"+(y+2)+" = getX(batch, xR, xCOffset, d1);\n                  }\n\n                  xR"+g+"C"+(y+1)+" = xTexelR"+g+"C"+(y+2)+";\n                ";}}else y<p&&(m+="\n              if(xR >= 0 && xR < "+o+") {\n            ",u%2==1?(m+="\n                xCOffset = xC + 1 - "+c+";\n                if(xCOffset >= 0 && xCOffset < "+a+") {\n                  xTexelR"+g+"C"+y+" = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR"+g+"C"+y+" = vec4(0.);\n                }\n\n                if(xC + 1 >= 0 && xC + 1 < "+a+") {\n                  xTexelR"+g+"C"+(y+2)+" = getX(batch, xR, xC + 1, d1);\n                } else {\n                  xTexelR"+g+"C"+(y+2)+" = vec4(0.);\n                }\n\n                xR"+g+"C"+y+" = vec4(\n                  xTexelR"+g+"C"+y+".zw, xTexelR"+g+"C"+(y+2)+".zw);\n              ",y+1<p&&(m+="\n                  vec4 final = vec4(0.);\n                  xCOffset = xC + 1 + "+c+";\n                  if(xCOffset >= 0 && xCOffset < "+a+") {\n                    final = getX(batch, xR, xCOffset, d1);\n                  }\n                  xR"+g+"C"+(y+1)+" = vec4(xTexelR"+g+"C"+(y+2)+".xy, final.xy);\n                ")):(m+="\n                if(xC >= 0 && xC < "+a+") {\n                  xTexelR"+g+"C"+y+" = getX(batch, xR, xC, d1);\n                } else {\n                  xTexelR"+g+"C"+y+" = vec4(0.);\n                }\n\n                xCOffset = xC + "+c+";\n                if(xCOffset >= 0 && xCOffset < "+a+") {\n                  xTexelR"+g+"C"+(y+2)+" = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR"+g+"C"+(y+2)+" = vec4(0.);\n                }\n\n                xR"+g+"C"+y+" = vec4(\n                  xTexelR"+g+"C"+y+".xy, xTexelR"+g+"C"+(y+2)+".xy);\n              ",y+1<p&&(m+="\n                  xR"+g+"C"+(y+1)+" = vec4(\n                    xTexelR"+g+"C"+y+".zw, xTexelR"+g+"C"+(y+2)+".zw);\n                ")),m+="}");y<p&&(m+="\n            vec4 wTexelR"+g+"C"+y+" = getW("+g+", "+y+", d1, q);\n            wR"+g+"C"+y+" = vec4(wTexelR"+g+"C"+y+".xz, wTexelR"+g+"C"+y+".xz);\n          ",y+1<p&&(m+="\n              vec4 wTexelR"+g+"C"+(y+1)+" = getW("+g+", "+(y+1)+", d1, q);\n              wR"+g+"C"+(y+1)+" =\n                vec4(wTexelR"+g+"C"+(y+1)+".xz, wTexelR"+g+"C"+(y+1)+".xz);"));}for(g=0;g<f;g++)for(y=0;y<p;y++)m+="dotProd += xR"+g+"C"+y+" * wR"+g+"C"+y+";";var w="",C="";n&&(w=r?"vec4 activation(vec4 a) {\n          vec4 b = getPreluActivationWeightsAtOutCoords();\n          "+n+"\n        }":"vec4 activation(vec4 x) {\n          "+n+"\n        }",C="result = activation(result);");var E=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),r&&this.variableNames.push("preluActivationWeights"),this.userCode="\n      "+w+"\n\n      const ivec2 strides = ivec2("+s+", "+c+");\n      const ivec2 pads = ivec2("+i+", "+u+");\n\n      void main() {\n\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2;\n        int q = 0;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        vec4 dotProd = vec4(0.);\n\n        "+m+"\n\n        vec4 result = dotProd;\n        "+E+"\n        "+C+"\n        setOutput(result);\n      }\n    ";}}(),Wa=function(){return function(t,e,n,r,o){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];var a=t[0],i=t[1],u=t[2],s=t[3],c=e[0],l=n[0],h=n[1];this.outputShape=[c,l,h,s];var f="bilinear"===r?1:0,p=[i-1+".0",u-1+".0"],d=p[0],v=p[1],m=l>1?[""+(i-1)/(l-1),"(y2-y1) * height_ratio","y1*"+d+" + float(y)*(height_scale)"]:["0.0","0.0","0.5 * (y1+y2) * "+d],g=m[0],y=m[1],x=m[2],b=h>1?[""+(u-1)/(h-1),"(x2-x1) * width_ratio","x1*"+v+" + float(x)*(width_scale)"]:["0.0","0.0","0.5 * (x1+x2) * "+v],w=b[0],C=b[1],E=b[2];this.userCode="\n      const float height_ratio = float("+g+");\n      const float width_ratio = float("+w+");\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int y = coords[1];\n        int x = coords[2];\n        int d = coords[3];\n\n        // get box vals\n        float y1 = getBoxes(b,0);\n        float x1 = getBoxes(b,1);\n        float y2 = getBoxes(b,2);\n        float x2 = getBoxes(b,3);\n\n        // get image in batch index\n        int bInd = round(getBoxInd(b));\n        if(bInd < 0 || bInd >= "+a+") {\n          return;\n        }\n\n        float height_scale = "+y+";\n        float width_scale = "+C+";\n\n        float in_y = "+x+";\n        if( in_y < 0.0 || in_y > "+d+" ) {\n          setOutput(float("+o+"));\n          return;\n        }\n        float in_x = "+E+";\n        if( in_x < 0.0 || in_x > "+v+" ) {\n          setOutput(float("+o+"));\n          return;\n        }\n\n        vec2 sourceFracIndexCR = vec2(in_x,in_y);\n        if("+f+" == 1) {\n          // Compute the four integer indices.\n          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);\n          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));\n\n          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);\n          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);\n          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);\n          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);\n\n          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);\n\n          float top = topLeft + (topRight - topLeft) * fracCR.x;\n          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;\n          float newValue = top + (bottom - top) * fracCR.y;\n          setOutput(newValue);\n        } else {\n          // Compute the coordinators of nearest neighbor point.\n          ivec2 sourceNearestCR = ivec2(floor(\n            sourceFracIndexCR + vec2(0.5,0.5)));\n          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);\n          setOutput(newValue);\n        }\n      }\n    ";}}(),Ua=function(){return function(t,e,n){this.variableNames=["x"],this.outputShape=t;var r=t.length,o=t[t.length-1],a=n?"<":">";this.userCode="\n      int getIndex(int i) {\n        "+(n?"return "+o+" -i - 1;":"return i;")+"\n      }\n\n      void main() {\n        "+aa(r)+" coords = getOutputCoords();\n        int end = "+Va(r,"coords")+";\n        float val = 0.0;\n        for (int i = "+o+" - 1; i >= 0; i -= 1) {\n          int idx = getIndex(i);\n          if (idx "+a+" end) {\n            continue;\n          }\n          if (idx == end && "+e+") {\n            continue;\n          }\n          "+Va(r,"coords")+" = idx;\n          val += getX("+function(t,e){if(1===t)return ""+e;if(2===t)return e+".x, "+e+".y";if(3===t)return e+".x, "+e+".y, "+e+".z";if(4===t)return e+".x, "+e+".y, "+e+".z, "+e+".w";throw Error("Cumulative sum for rank "+t+" is not yet supported")}(r,"coords")+");\n        }\n        setOutput(val);\n      }\n    ";}}();function Va(t,e){if(1===t)return ""+e;if(2===t)return e+".y";if(3===t)return e+".z";if(4===t)return e+".w";throw Error("Cumulative sum for rank "+t+" is not yet supported")}var za=function(){return function(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=_t.DENSE;var e=Gt(t),n=Ko();this.outputShape=t,this.userCode="\n      ivec3 outCoordsFromFlatIndex(int index) {\n        "+jo(["r","c","d"],t)+"\n        return ivec3(r, c, d);\n      }\n\n      void main() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n          vec2("+e[0]+", "+e[1]+"));\n        int index = 4 * (resTexRC.x * "+e[1]+" + resTexRC.y);\n\n        vec4 result = vec4(0.);\n\n        for (int i=0; i<4; i++) {\n          int flatIndex = index + i;\n          ivec3 rc = outCoordsFromFlatIndex(flatIndex);\n          result[i] = getA(rc.x, rc.y, rc.z);\n        }\n\n        "+n.output+" = result;\n      }\n    ";}}(),Ga=function(){return function(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=_t.DENSE;var e=Gt(t),n=Ko();this.outputShape=t,this.userCode="\n      ivec3 outCoordsFromFlatIndex(int index) {\n        "+jo(["r","c","d"],t)+"\n        return ivec3(r, c, d);\n      }\n\n      void main() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n          vec2("+e[0]+", "+e[1]+"));\n        int index = 4 * (resTexRC.x * "+e[1]+" + resTexRC.y);\n\n        vec4 result = vec4(0.);\n\n        for (int i=0; i<4; i++) {\n          int flatIndex = index + i;\n          ivec3 rc = outCoordsFromFlatIndex(flatIndex);\n          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));\n        }\n\n        "+n.output+" = result;\n      }\n    ";}}(),Ha=function(){function t(t,e,n){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=n,this.userCode="\n    void main() {\n      ivec4 coords = getOutputCoords();\n      int b = coords[0];\n      int h = "+this.getHeightCoordString()+";\n      int w = "+this.getWidthCoordString()+";\n      int d = "+this.getDepthCoordString()+";\n\n      int in_h = h / "+e+";\n      int offset_h = imod(h, "+e+");\n      int in_w = w / "+e+";\n      int offset_w = imod(w, "+e+");\n      int offset_d = (offset_h * "+e+" + offset_w) *\n        "+this.getOutputDepthSize()+";\n      int in_d = d + offset_d;\n\n      float result = "+this.getInputSamplingString()+";\n      setOutput(result);\n    }\n  ";}return t.prototype.getHeightCoordString=function(){return "NHWC"===this.dataFormat?"coords[1]":"coords[2]"},t.prototype.getWidthCoordString=function(){return "NHWC"===this.dataFormat?"coords[2]":"coords[3]"},t.prototype.getDepthCoordString=function(){return "NHWC"===this.dataFormat?"coords[3]":"coords[1]"},t.prototype.getOutputDepthSize=function(){return "NHWC"===this.dataFormat?this.outputShape[3]:this.outputShape[1]},t.prototype.getInputSamplingString=function(){return "NHWC"===this.dataFormat?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"},t}(),qa=function(){return function(t){this.variableNames=["X"],this.outputShape=[t,t],this.userCode="\n      void main() {\n          ivec2 coords = getOutputCoords();\n          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;\n          setOutput(val);\n      }\n    ";}}(),Ka=function(){return function(t){this.variableNames=["A"],this.outTexUsage=Mt.DOWNLOAD;var e=Ko();this.outputShape=t,this.userCode="\n      "+$o+"\n\n      void main() {\n        float x = getAAtOutCoords();\n        "+e.output+" = encode_float(x);\n      }\n    ";}}(),ja=function(){return function(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=Mt.DOWNLOAD;var e=Ko();this.outputShape=t,this.userCode="\n      "+$o+"\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));\n        "+e.output+" = encode_float(x);\n      }\n    ";}}(),Xa=function(){return function(t,e,n){void 0===n&&(n=!1),this.variableNames=["A"];var r=Ko(),o=e[0],a=e[1];this.outputShape=t;var i="result";n&&(i="floor(result * 255. + 0.5)"),this.userCode="\n      "+Xo(t)+"\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n\n        int flatIndex = getFlatIndex(coords);\n        int offset = imod(flatIndex, 4);\n\n        flatIndex = idiv(flatIndex, 4, 1.);\n        \n        int r = flatIndex / "+a+";\n        int c = imod(flatIndex, "+a+");\n        vec2 uv = (vec2(c, r) + halfCR) / vec2("+a+".0, "+o+".0);\n        vec4 values = "+r.texture2D+"(A, uv);\n\n        float result;\n\n        if(offset == 0) {\n          result = values[0];\n        } else if(offset == 1) {\n          result = values[1];\n        } else if(offset == 2) {\n          result = values[2];\n        } else {\n          result = values[3];\n        }\n\n        "+r.output+" = vec4("+i+", 0., 0., 0.);\n      }\n    ";}}(),$a=function(){return function(t,e,n){void 0===n&&(n=!1),this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var r=Ko(),o=e[0],a=e[1];this.outputShape=t;var i="",u="result";n&&(u="floor(result * 255. + 0.5)");for(var s=0;s<=1;s++)for(var c=0;c<=1;c++){var l=2*s+c;i+="\n          localCoords = coords;\n          if(localCoords[2] + "+c+" < "+t[2]+") {\n            localCoords[2] += "+c+";\n            if(localCoords[1] + "+s+" < "+t[1]+") {\n              localCoords[1] += "+s+";\n\n              flatIndex = getFlatIndex(localCoords);\n              offset = imod(flatIndex, 4);\n\n              flatIndex = idiv(flatIndex, 4, 1.);\n\n              r = flatIndex / "+a+";\n              c = imod(flatIndex, "+a+");\n              uv = (vec2(c, r) + halfCR) / vec2("+a+".0, "+o+".0);\n              values = "+r.texture2D+"(A, uv);\n\n              if(offset == 0) {\n                result["+l+"] = values[0];\n              } else if(offset == 1) {\n                result["+l+"] = values[1];\n              } else if(offset == 2) {\n                result["+l+"] = values[2];\n              } else {\n                result["+l+"] = values[3];\n              }\n            }\n          }\n        ";}this.userCode="\n      "+Xo(t)+"\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n\n        vec4 result = vec4(0.);\n        int flatIndex, r, c, offset;\n        ivec3 localCoords;\n        vec2 uv;\n        vec4 values;\n\n        "+i+"\n\n        "+r.output+" = "+u+";\n      }\n    ";}}(),Ya="return real * expR - imag * expI;",Qa="return real * expI + imag * expR;",Ja=function(){return function(t,e,n){this.variableNames=["real","imag"];var r=e[1];this.outputShape=e;var o=n?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,a=n?r+".0":"1.0";this.userCode="\n      const float exponentMultiplier = "+o+";\n\n      float unaryOpComplex(float real, float expR, float imag, float expI) {\n        "+t+"\n      }\n\n      float mulMatDFT(int batch, int index) {\n        float indexRatio = float(index) / float("+r+");\n        float exponentMultiplierTimesIndexRatio =\n            exponentMultiplier * indexRatio;\n\n        float result = 0.0;\n\n        for (int i = 0; i < "+r+"; i++) {\n          // x = (-2|2 * PI / N) * index * i;\n          float x = exponentMultiplierTimesIndexRatio * float(i);\n          float expR = cos(x);\n          float expI = sin(x);\n          float real = getReal(batch, i);\n          float imag = getImag(batch, i);\n\n          result +=\n              unaryOpComplex(real, expR, imag, expI) / "+a+";\n        }\n\n        return result;\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        setOutput(mulMatDFT(coords[0], coords[1]));\n      }\n    ";}}(),Za=function(){function t(t,e){this.outputShape=[],this.variableNames=["x"],this.outputShape=t,this.userCode="\n      uniform float value;\n      void main() {\n        // Input can be obtained from uniform value.\n        setOutput(value);\n      }\n    ";}return t.prototype.getCustomSetupFunc=function(t){var e=this;return function(n,r){null==e.valueLoc&&(e.valueLoc=n.getUniformLocationNoThrow(r,"value")),n.gl.uniform1f(e.valueLoc,t);}},t}(),ti=function(){return function(t){this.variableNames=["A"];var e=Ko(),n=t[0],r=t[1];this.outputShape=t,this.userCode="\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n        vec2 uv = (vec2(texC, texR) + halfCR) / vec2("+r+".0, "+n+".0);\n\n        vec4 values = "+e.texture2D+"(A, uv);\n        float value;\n        if (depth == 0) {\n          value = values.r;\n        } else if (depth == 1) {\n          value = values.g;\n        } else if (depth == 2) {\n          value = values.b;\n        } else if (depth == 3) {\n          value = values.a;\n        }\n\n        setOutput(floor(value * 255.0 + 0.5));\n      }\n    ";}}(),ei=function(){return function(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var e=Ko(),n=t[0],r=t[1];this.outputShape=t,this.userCode="\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n\n        vec4 result = vec4(0.);\n\n        for(int row=0; row<=1; row++) {\n          for(int col=0; col<=1; col++) {\n            texC = coords[1] + row;\n            depth = coords[2] + col;\n\n            vec2 uv = (vec2(texC, texR) + halfCR) /\n                       vec2("+r+".0, "+n+".0);\n            vec4 values = "+e.texture2D+"(A, uv);\n            float value;\n            if (depth == 0) {\n              value = values.r;\n            } else if (depth == 1) {\n              value = values.g;\n            } else if (depth == 2) {\n              value = values.b;\n            } else if (depth == 3) {\n              value = values.a;\n            }\n\n            result[row * 2 + col] = floor(value * 255.0 + 0.5);\n          }\n        }\n\n        "+e.output+" = result;\n      }\n    ";}}(),ni=function(){return function(t,e,n){this.variableNames=["A","indices"];var r=t.slice();r[n]=e,this.outputShape=r,this.rank=r.length;var o=aa(this.rank),a=function(t,e){var n=t.length;if(n>4)throw Error("Gather for rank "+n+" is not yet supported");if(1===n)return "int(getIndices(resRC))";for(var r=["resRC.x","resRC.y","resRC.z","resRC.w"],o=[],a=0;a<t.length;a++)a===e?o.push("int(getIndices("+r[a]+"))"):o.push(""+r[a]);return o.join()}(t,n);this.userCode="\n      void main() {\n        "+o+" resRC = getOutputCoords();\n        setOutput(getA("+a+"));\n      }\n    ";}}();var ri=function(){return function(t,e,n){this.sliceDim=t,this.strides=e,this.variableNames=["x","indices"],this.outputShape=n;var r=aa(e.length),o=aa(n.length),a=this.sliceDim>1?"strides[j]":"strides";this.userCode="\n        "+r+" strides = "+r+"("+this.strides+");\n         void main() {\n          "+o+" coords = getOutputCoords();\n          int flattenIndex = 0;\n          for (int j = 0; j < "+this.sliceDim+"; j++) {\n            int index = round(getIndices(coords[0], j));\n            flattenIndex += index * "+a+";\n          }\n          setOutput(getX(flattenIndex, coords[1]));\n        }\n      ";}}();function oi(t,e){var n=Ko();return Jt(t,e,n.version+"\n    precision highp float;\n    "+n.attribute+" vec3 clipSpacePos;\n    "+n.attribute+" vec2 uv;\n    "+n.varyingVs+" vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }")}function ai(t,e){return ie(t,e,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function ii(t,e){return ue(t,e,new Uint16Array([0,1,2,2,1,3]))}function ui(t,e,n,r,o,a,i){ce(n,r);var u=se(t,e),s=t.TEXTURE_2D;return Kt(t,e,function(){return t.bindTexture(s,u)}),Kt(t,e,function(){return t.texParameteri(s,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE)}),Kt(t,e,function(){return t.texParameteri(s,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}),Kt(t,e,function(){return t.texParameteri(s,t.TEXTURE_MIN_FILTER,t.NEAREST)}),Kt(t,e,function(){return t.texParameteri(s,t.TEXTURE_MAG_FILTER,t.NEAREST)}),Kt(t,e,function(){return t.texImage2D(s,0,o,n,r,0,a,i,null)}),Kt(t,e,function(){return t.bindTexture(t.TEXTURE_2D,null)}),u}function si(t,e,n,r,o){var a=zt(n,r);return ui(t,e,a[0],a[1],o.internalFormatFloat,o.textureFormatFloat,t.FLOAT)}function ci(t,e,n,r,o){var a=zt(n,r);return ui(t,e,a[0],a[1],o.internalFormatHalfFloat,o.textureFormatFloat,o.textureTypeHalfFloat)}function li(t,e,n,r,o){var a=zt(n,r);return ui(t,e,a[0],a[1],t.RGBA,t.RGBA,t.UNSIGNED_BYTE)}function hi(t,e,n,r,o){var a=Ht(n,r);return ui(t,e,a[0],a[1],o.internalFormatPackedFloat,t.RGBA,t.FLOAT)}function fi(t,e,n,r,o){var a=Ht(n,r);return ui(t,e,a[0],a[1],o.internalFormatPackedHalfFloat,t.RGBA,o.textureTypeHalfFloat)}function pi(t,e,n,r){return Kt(t,e,function(){return t.bindBuffer(t.ARRAY_BUFFER,r)}),he(t,e,n,"clipSpacePos",r,3,20,0)&&he(t,e,n,"uv",r,2,20,12)}function di(t,e,n,r,o,a,i){var u,s,c;Kt(t,e,function(){return t.bindTexture(t.TEXTURE_2D,n)}),a instanceof Uint8Array?(u=new Uint8Array(r*o*4),s=t.UNSIGNED_BYTE,c=t.RGBA):(u=new Float32Array(r*o*4),s=t.FLOAT,c=i.internalFormatPackedFloat),u.set(a),Kt(t,e,function(){return t.texImage2D(t.TEXTURE_2D,0,c,r,o,0,t.RGBA,s,u)}),Kt(t,e,function(){return t.bindTexture(t.TEXTURE_2D,null)});}function vi(t,e,n,r){Kt(t,e,function(){return t.bindTexture(t.TEXTURE_2D,n)}),r.data instanceof Uint8Array?Kt(t,e,function(){return t.texImage2D(t.TEXTURE_2D,0,t.RGBA,r.width,r.height,0,t.RGBA,t.UNSIGNED_BYTE,r.data)}):Kt(t,e,function(){return t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r)}),Kt(t,e,function(){return t.bindTexture(t.TEXTURE_2D,null)});}function mi(t,e,n,r,o){var a=t.createBuffer();Kt(t,e,function(){return t.bindBuffer(t.PIXEL_PACK_BUFFER,a)});var i=16*n*r;return Kt(t,e,function(){return t.bufferData(t.PIXEL_PACK_BUFFER,i,t.STREAM_READ)}),Kt(t,e,function(){return t.readPixels(0,0,r,n,t.RGBA,t.FLOAT,0)}),Kt(t,e,function(){return t.bindBuffer(t.PIXEL_PACK_BUFFER,null)}),a}function gi(t,e,n){var r=t,o=new Float32Array(n);return r.bindBuffer(r.PIXEL_PACK_BUFFER,e),r.getBufferSubData(r.PIXEL_PACK_BUFFER,0,o),r.bindBuffer(r.PIXEL_PACK_BUFFER,null),o}function yi(t,e,n,r,o){var a=zt(n,r),i=a[0],u=a[1],s=new Uint8Array(n*r*4);return Kt(t,e,function(){return t.readPixels(0,0,i,u,o.downloadTextureFormat,t.UNSIGNED_BYTE,s)}),new Float32Array(s.buffer)}function xi(t,e,n,r,o,a,i,u){var s=t,c=new Float32Array(function(t,e){var n=Ht(t,e);return n[0]*n[1]*4}(a,i));return s.bindBuffer(s.PIXEL_PACK_BUFFER,e),s.getBufferSubData(s.PIXEL_PACK_BUFFER,0,c),s.bindBuffer(s.PIXEL_PACK_BUFFER,null),c}function bi(t,e,n,r){var o=new Float32Array(n*r*4);return Kt(t,e,function(){return t.readPixels(0,0,r,n,t.RGBA,t.FLOAT,o)}),o}var wi=Object.freeze({createVertexShader:oi,createVertexBuffer:ai,createIndexBuffer:ii,createFloat32MatrixTexture:si,createFloat16MatrixTexture:ci,createUnsignedBytesMatrixTexture:li,createPackedMatrixTexture:hi,createFloat16PackedMatrixTexture:fi,bindVertexProgramAttributeStreams:pi,uploadDenseMatrixToTexture:di,uploadPixelDataToTexture:vi,createBufferFromOutputTexture:mi,downloadFloat32MatrixFromBuffer:gi,downloadByteEncodedFloatMatrixFromOutputTexture:yi,downloadPackedMatrixFromBuffer:xi,downloadMatrixFromPackedOutputTexture:bi}),Ci=function(){function t(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];var e=a().getNumber("WEBGL_VERSION");if(null!=t?(this.gl=t,Wt(e,t)):this.gl=Ut(e),1===a().getNumber("WEBGL_VERSION"))this.textureFloatExtension=Qt(this.gl,this.debug,"OES_texture_float"),this.colorBufferFloatExtension=this.gl.getExtension("WEBGL_color_buffer_float"),this.textureHalfFloatExtension=Qt(this.gl,this.debug,"OES_texture_half_float"),this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float");else{if(Ne(this.gl,"EXT_color_buffer_float"))this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float");else{if(!Ne(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float");}}this.vertexBuffer=ai(this.gl,this.debug),this.indexBuffer=ii(this.gl,this.debug),this.framebuffer=le(this.gl,this.debug),this.textureConfig=qt(this.gl,this.textureHalfFloatExtension);}return Object.defineProperty(t.prototype,"debug",{get:function(){return a().getBool("DEBUG")},enumerable:!0,configurable:!0}),t.prototype.dispose=function(){var t=this;if(!this.disposed){null!=this.program&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),null!=this.outputTexture&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");var e=this.gl;Kt(e,this.debug,function(){return e.finish()}),Kt(e,this.debug,function(){return e.bindFramebuffer(e.FRAMEBUFFER,null)}),Kt(e,this.debug,function(){return e.deleteFramebuffer(t.framebuffer)}),Kt(e,this.debug,function(){return e.bindBuffer(e.ARRAY_BUFFER,null)}),Kt(e,this.debug,function(){return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)}),Kt(e,this.debug,function(){return e.deleteBuffer(t.indexBuffer)}),this.disposed=!0;}},t.prototype.createFloat32MatrixTexture=function(t,e){return this.throwIfDisposed(),si(this.gl,this.debug,t,e,this.textureConfig)},t.prototype.createFloat16MatrixTexture=function(t,e){return this.throwIfDisposed(),ci(this.gl,this.debug,t,e,this.textureConfig)},t.prototype.createUnsignedBytesMatrixTexture=function(t,e){return this.throwIfDisposed(),li(this.gl,this.debug,t,e,this.textureConfig)},t.prototype.uploadPixelDataToTexture=function(t,e){this.throwIfDisposed(),vi(this.gl,this.debug,t,e);},t.prototype.uploadDenseMatrixToTexture=function(t,e,n,r){this.throwIfDisposed(),di(this.gl,this.debug,t,e,n,r,this.textureConfig);},t.prototype.createFloat16PackedMatrixTexture=function(t,e){return this.throwIfDisposed(),fi(this.gl,this.debug,t,e,this.textureConfig)},t.prototype.createPackedMatrixTexture=function(t,e){return this.throwIfDisposed(),hi(this.gl,this.debug,t,e,this.textureConfig)},t.prototype.deleteMatrixTexture=function(t){var e=this;this.throwIfDisposed(),this.outputTexture===t&&(ge(this.gl,this.debug,this.framebuffer),this.outputTexture=null),Kt(this.gl,this.debug,function(){return e.gl.deleteTexture(t)});},t.prototype.downloadByteEncodedFloatMatrixFromOutputTexture=function(t,e,n){var r=this;return this.downloadMatrixDriver(t,function(){return yi(r.gl,r.debug,e,n,r.textureConfig)})},t.prototype.downloadPackedMatrixFromBuffer=function(t,e,n,r,o,a){return xi(this.gl,t,0,0,0,o,a,this.textureConfig)},t.prototype.downloadFloat32MatrixFromBuffer=function(t,e){return gi(this.gl,t,e)},t.prototype.createBufferFromTexture=function(t,e,n){this.bindTextureToFrameBuffer(t);var r=mi(this.gl,this.debug,e,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),r},t.prototype.createAndWaitForFence=function(){var t=this.createFence(this.gl);return this.pollFence(t)},t.prototype.createFence=function(t){var e,n,r=this;if(a().getBool("WEBGL_FENCE_API_ENABLED")){var o=t,i=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),n=function(){var t=o.clientWaitSync(i,0,0);return t===o.ALREADY_SIGNALED||t===o.CONDITION_SATISFIED},e=i;}else a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),n=function(){return r.isQueryAvailable(e,a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}):n=function(){return !0};return {query:e,isFencePassed:n}},t.prototype.downloadMatrixFromPackedTexture=function(t,e,n){var r=this;return this.downloadMatrixDriver(t,function(){return bi(r.gl,r.debug,e,n)})},t.prototype.createProgram=function(t){this.throwIfDisposed();var e=this.gl,n=Zt(e,this.debug,t),r=oi(e,this.debug),o=re(e,this.debug);return Kt(e,this.debug,function(){return e.attachShader(o,r)}),Kt(e,this.debug,function(){return e.attachShader(o,n)}),oe(e,this.debug,o),this.debug&&ae(e,this.debug,o),this.vertexAttrsAreBound||(this.setProgram(o),this.vertexAttrsAreBound=pi(e,this.debug,this.program,this.vertexBuffer)),o},t.prototype.deleteProgram=function(t){var e=this;this.throwIfDisposed(),t===this.program&&(this.program=null),null!=t&&Kt(this.gl,this.debug,function(){return e.gl.deleteProgram(t)});},t.prototype.setProgram=function(t){var e=this;this.throwIfDisposed(),this.program=t,null!=this.program&&this.debug&&ae(this.gl,this.debug,this.program),Kt(this.gl,this.debug,function(){return e.gl.useProgram(t)});},t.prototype.getUniformLocation=function(t,e,n){return void 0===n&&(n=!0),this.throwIfDisposed(),n?pe(this.gl,this.debug,t,e):de(this.gl,t,e)},t.prototype.getAttributeLocation=function(t,e){var n=this;return this.throwIfDisposed(),Kt(this.gl,this.debug,function(){return n.gl.getAttribLocation(t,e)})},t.prototype.getUniformLocationNoThrow=function(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)},t.prototype.setInputMatrixTexture=function(t,e,n){this.throwIfDisposed(),this.throwIfNoProgram(),ve(this.gl,this.debug,this.program,t,e,n);},t.prototype.setOutputMatrixTexture=function(t,e,n){this.setOutputMatrixTextureDriver(t,n,e);},t.prototype.setOutputPackedMatrixTexture=function(t,e,n){this.throwIfDisposed();var r=Ht(e,n),o=r[0],a=r[1];this.setOutputMatrixTextureDriver(t,o,a);},t.prototype.setOutputMatrixWriteRegion=function(t,e,n,r){this.setOutputMatrixWriteRegionDriver(n,t,r,e);},t.prototype.setOutputPackedMatrixWriteRegion=function(t,e,n,r){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")},t.prototype.debugValidate=function(){null!=this.program&&ae(this.gl,this.debug,this.program),ye(this.gl);},t.prototype.executeProgram=function(){this.throwIfDisposed(),this.throwIfNoProgram();var t=this.gl;this.debug&&this.debugValidate(),Kt(t,this.debug,function(){return t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});},t.prototype.blockUntilAllProgramsCompleted=function(){var t=this;this.throwIfDisposed(),Kt(this.gl,this.debug,function(){return t.gl.finish()});},t.prototype.getQueryTimerExtension=function(){return null==this.disjointQueryTimerExtension&&(this.disjointQueryTimerExtension=Qt(this.gl,this.debug,2===a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension},t.prototype.getQueryTimerExtensionWebGL2=function(){return this.getQueryTimerExtension()},t.prototype.getQueryTimerExtensionWebGL1=function(){return this.getQueryTimerExtension()},t.prototype.beginQuery=function(){if(2===a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){var t=this.gl,e=this.getQueryTimerExtensionWebGL2(),n=t.createQuery();return t.beginQuery(e.TIME_ELAPSED_EXT,n),n}var r=this.getQueryTimerExtensionWebGL1(),o=r.createQueryEXT();return r.beginQueryEXT(r.TIME_ELAPSED_EXT,o),o},t.prototype.endQuery=function(){if(2!==a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")){var t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT);}else{var e=this.gl,n=this.getQueryTimerExtensionWebGL2();e.endQuery(n.TIME_ELAPSED_EXT);}},t.prototype.waitForQueryAndGetTime=function(t){return n(this,void 0,void 0,function(){var e=this;return r(this,function(n){switch(n.label){case 0:return [4,S(function(){return e.disposed||e.isQueryAvailable(t,a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))})];case 1:return n.sent(),[2,this.getQueryTime(t,a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))]}})})},t.prototype.getQueryTime=function(t,e){if(0===e)return null;if(2===e){var n=this.gl;return n.getQueryParameter(t,n.QUERY_RESULT)/1e6}var r=this.getQueryTimerExtensionWebGL1();return r.getQueryObjectEXT(t,r.QUERY_RESULT_EXT)/1e6},t.prototype.isQueryAvailable=function(t,e){if(0===e)return !0;if(2===e){var n=this.gl,r=this.getQueryTimerExtensionWebGL2(),o=n.getQueryParameter(t,n.QUERY_RESULT_AVAILABLE);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),o&&!this.disjoint}o=(r=this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(t,r.QUERY_RESULT_AVAILABLE_EXT);return null==this.disjoint&&(this.disjoint=this.gl.getParameter(r.GPU_DISJOINT_EXT)),o&&!this.disjoint},t.prototype.pollFence=function(t){var e=this;return new Promise(function(n){e.addItemToPoll(function(){return t.isFencePassed()},function(){return n()});})},t.prototype.pollItems=function(){for(var t=function(t){for(var e=0;e<t.length;++e){var n=t[e]();if(!n)break}return e-1}(this.itemsToPoll.map(function(t){return t.isDoneFn})),e=0;e<=t;++e){(0, this.itemsToPoll[e].resolveFn)();}this.itemsToPoll=this.itemsToPoll.slice(t+1);},t.prototype.addItemToPoll=function(t,e){var n=this;this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1||S(function(){return n.pollItems(),0===n.itemsToPoll.length});},t.prototype.bindTextureToFrameBuffer=function(t){this.throwIfDisposed(),me(this.gl,this.debug,t,this.framebuffer),this.debug&&ye(this.gl);},t.prototype.unbindTextureToFrameBuffer=function(){null!=this.outputTexture?(me(this.gl,this.debug,this.outputTexture,this.framebuffer),this.debug&&ye(this.gl)):ge(this.gl,this.debug,this.framebuffer);},t.prototype.downloadMatrixDriver=function(t,e){this.bindTextureToFrameBuffer(t);var n=e();return this.unbindTextureToFrameBuffer(),n},t.prototype.setOutputMatrixTextureDriver=function(t,e,n){this.throwIfDisposed();var r=this.gl;me(r,this.debug,t,this.framebuffer),this.debug&&ye(r),this.outputTexture=t,Kt(r,this.debug,function(){return r.viewport(0,0,e,n)}),Kt(r,this.debug,function(){return r.scissor(0,0,e,n)});},t.prototype.setOutputMatrixWriteRegionDriver=function(t,e,n,r){var o=this;this.throwIfDisposed(),Kt(this.gl,this.debug,function(){return o.gl.scissor(t,e,n,r)});},t.prototype.throwIfDisposed=function(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")},t.prototype.throwIfNoProgram=function(){if(null==this.program)throw new Error("No GPU program is currently set.")},t}();function Ei(t,e){if(t.length!==e.length)throw Error("Binary was compiled with "+t.length+" inputs, but was executed with "+e.length+" inputs");t.forEach(function(t,n){var r=t.logicalShape,o=e[n],a=o.shape;if(!C(r,a))throw Error("Binary was compiled with different shapes than the current args. Shapes "+r+" and "+a+" must match");if(!t.isUniform||!o.isUniform){var i=t.texShape,u=o.isUniform?null:o.texData.texShape;if(!C(i,u))throw Error("Binary was compiled with different texture shapes than the current args. Shape "+i+" and "+u+" must match")}});}var Ri=function(){return function(t,e,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t;for(var r=n.filterWidth,o=n.inChannels,a=n.strideWidth,i=n.strideHeight,u=n.padInfo,s=n.outWidth,c=n.dilationWidth,l=n.dilationHeight,h=n.dataFormat,f=u.left,p=u.top,d=o*r,v=Ko(),m="channelsLast"===h,g=m?0:1,y=m?1:2,x="",b=0;b<=1;b++)for(var w=0;w<=1;w++)x+="\n          blockIndex = rc.y + "+w+";\n          pos = rc.x + "+b+";\n\n          if(blockIndex < "+t[1]+" && pos < "+t[0]+") {\n            offsetY = int(blockIndex / ("+s+")) * "+i+" - "+p+";\n            d0 = offsetY + "+l+" * (pos / "+d+");\n\n            if(d0 < "+e[g]+" && d0 >= 0) {\n\n              offsetX = int(mod(float(blockIndex), "+s+".) * "+a+". - "+f+".);\n              d1 = offsetX + "+c+" * (int(mod(float(pos), "+d+".) / "+o+".));\n\n              if(d1 < "+e[y]+" && d1 >= 0) {\n\n                ch = int(mod(float(pos), "+o+".));\n\n                if ("+m+") {\n                  innerDims = vec2(d1, ch);\n                  result["+(2*b+w)+"] = getChannel(\n                    getA(d0, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                } else {\n                  innerDims = vec2(d0, d1);\n                  result["+(2*b+w)+"] = getChannel(\n                    getA(ch, int(innerDims.x),\n                    int(innerDims.y)), innerDims);\n                }\n              }\n            }\n          }\n        ";this.userCode="\n      void main() {\n        ivec2 rc = getOutputCoords();\n\n        vec4 result = vec4(0);\n\n        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;\n        vec2 innerDims;\n\n        "+x+"\n\n        "+v.output+" = result;\n      }\n    ";}}(),Ii=function(){return function(t,e,n,r,o){this.variableNames=["x"],this.outputShape=[];var a,i=e,u=t[3]-1;this.outputShape=t;var s="float("+n+") + float("+r+") * sum";a=.5===o?"inversesqrt("+s+")":1===o?"1.0/("+s+")":"exp(log("+s+") * float(-"+o+"));",this.userCode="\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n        int d = coords[3];\n        float x = getX(b, r, c, d);\n        float sum = 0.0;\n        for (int j = -"+i+"; j <= "+i+"; j++) {\n          int idx = d + j;\n          if (idx >= 0 && idx <=  "+u+") {\n            float z = getX(b, r, c, idx);\n            sum += z * z;\n          }\n        }\n        float val = x * "+a+";\n        setOutput(val);\n      }\n    ";}}(),ki=function(){return function(t,e,n,r,o){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=t,this.depth=t[3],this.depthRadius=e,this.bias=n,this.alpha=r,this.beta=o,this.userCode="\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n\n        float result = 0.0;\n        for (int d = 0; d < "+this.depth+"; ++d) {\n          int depthBegin = int(max(0.0, float(d - "+e+")));\n          int depthEnd = int(min(float("+this.depth+"),\n              float(d + "+e+" + 1)));\n\n          const int MIN_DEPTH_BEGIN = 0;\n          const int MAX_DEPTH_END = "+this.depth+";\n\n          float norm = 0.0;\n          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {\n            if (k < depthBegin){\n              continue;\n            }\n            else if (k >= depthBegin && k < depthEnd) {\n              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);\n            }\n            else {\n              break;\n            }\n          }\n\n          norm = float("+r+") * norm + float("+n+");\n\n          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){\n            if (k < depthBegin){\n              continue;\n            }\n            else if (k >= depthBegin && k < depthEnd){\n              float dyi = -2.0 * float("+r+")\n                * float("+o+")\n                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)\n                / norm;\n              if (k == d) {\n                dyi += pow(norm, -1.0 * "+o+");\n              }\n              if (k == coords[3]) {\n                dyi *= getDy(b, r, c, d);\n                result += dyi;\n              }\n            }\n            else {\n              break;\n            }\n          }\n      }\n      setOutput(result);\n      }\n    ";}}(),Si=function(){return function(t,e,n,r,o){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;var a,i=e,u=t[3]-1;this.outputShape=t;var s="float("+n+") + float("+r+") * sum";a=.5===o?"inversesqrt("+s+")":1===o?"1.0/("+s+")":"exp(log("+s+") * float(-"+o+"));",this.userCode="\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords.x;\n        int r = coords.y;\n        int c = coords.z;\n        int d = coords.w;\n\n        bool hasNextCol = d < "+this.outputShape[3]+";\n        bool hasNextRow = c < "+this.outputShape[2]+";\n\n        vec4 sum = vec4(0.);\n        vec4 xFragAtOutputCoords = getX(b, r, c, d);\n\n        vec4 xAtOutputCoords = vec4(\n          getChannel(xFragAtOutputCoords, vec2(c, d)),\n          hasNextCol ?\n            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,\n          hasNextRow ?\n            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0\n        );\n\n        int firstChannel = d - "+i+";\n        vec2 cache = vec2(0.);\n        if(firstChannel >= 0){\n          vec4 firstChannelFrag = getX(b, r, c, firstChannel);\n          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));\n            if(hasNextRow){\n              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));\n            }\n        }\n\n        ivec2 depth = ivec2(d, d + 1);\n        for (int j = - "+i+"; j <= "+i+"; j++) {\n          ivec2 idx = depth + j;\n          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));\n          bvec2 belowUpperBound = lessThanEqual(idx, ivec2("+u+"));\n\n          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;\n          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;\n\n          if(depthInRange || depthPlusOneInRange){\n            vec4 z = vec4(0.);\n            vec4 xFragAtCurrentDepth;\n            z.xz = cache.xy;\n            if(depthPlusOneInRange && hasNextCol){\n              xFragAtCurrentDepth = idx.y != d ?\n                getX(b, r, c, idx.y) : xFragAtOutputCoords;\n              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));\n              if(hasNextRow){\n                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));\n              }\n            }\n            cache.xy = z.yw;\n            sum += z * z;\n          }\n        }\n        vec4 result = xAtOutputCoords * "+a+";\n        setOutput(result);\n      }\n    ";}}(),Ai=function(){return function(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;var e=t.strideHeight,n=t.strideWidth,r=t.dilationHeight,o=t.effectiveFilterHeight,a=t.effectiveFilterWidth,i=o-1-t.padInfo.top,u=a-1-t.padInfo.left,s=o*a-1;this.userCode="\n      const ivec2 pads = ivec2("+i+", "+u+");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < "+o+";\n          wR += "+r+") {\n          float dyR = float(dyRCorner + wR) / "+e+".0;\n\n          if (dyR < 0.0 || dyR >= "+t.outHeight+".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < "+a+"; wC++) {\n            float dyC = float(dyCCorner + wC) / "+n+".0;\n\n            if (dyC < 0.0 || dyC >= "+t.outWidth+".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n            int maxPosValue = "+s+" - int(getMaxPos(b, idyR, idyC, d));\n\n            // Get the current value, check it against the value from the\n            // position matrix.\n            int curPosValue = wR * "+a+" + wC;\n            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n            dotProd += dyValue * mask;\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Di=function(){return function(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;var e=t.strideDepth,n=t.strideHeight,r=t.strideWidth,o=t.dilationDepth,a=t.dilationHeight,i=t.dilationWidth,u=t.effectiveFilterDepth,s=t.effectiveFilterHeight,c=t.effectiveFilterWidth,l=u-1-t.padInfo.front,h=s-1-t.padInfo.top,f=c-1-t.padInfo.left,p=u*s*c-1;this.userCode="\n      const ivec3 pads = ivec3("+l+", "+h+", "+f+");\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyDCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get\n        // dx(xD, xR, xC, ch).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int wD = 0; wD < "+u+";\n           wD += "+o+") {\n          float dyD = float(dyDCorner + wD) / "+e+".0;\n\n          if (dyD < 0.0 || dyD >= "+t.outDepth+".0 || fract(dyD) > 0.0) {\n            continue;\n          }\n          int idyD = int(dyD);\n\n          for (int wR = 0; wR < "+s+";\n              wR += "+a+") {\n            float dyR = float(dyRCorner + wR) / "+n+".0;\n\n            if (dyR < 0.0 || dyR >= "+t.outHeight+".0 ||\n                fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            for (int wC = 0; wC < "+c+";\n                wC += "+i+") {\n              float dyC = float(dyCCorner + wC) / "+r+".0;\n\n              if (dyC < 0.0 || dyC >= "+t.outWidth+".0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              float dyValue = getDy(batch, idyD, idyR, idyC, ch);\n              int maxPosValue = "+p+" -\n                  int(getMaxPos(batch, idyD, idyR, idyC, ch));\n\n              // Get the current value, check it against the value from the\n              // position matrix.\n              int curPosValue =\n                  wD * "+s+" * "+c+" +\n                  wR * "+c+" + wC;\n              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n              dotProd += dyValue * mask;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";}}(),Ti=function(){return function(t,e,n,r,o,a,i){void 0===n&&(n=!1),void 0===r&&(r=!1),void 0===o&&(o=!1),void 0===a&&(a=null),void 0===i&&(i=!1),this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;var u=n?t[1]:t[2],s=Math.ceil(u/2),c=n?"i * 2, rc.y":"rc.y, i * 2",l=r?"rc.z, i * 2":"i * 2, rc.z",h=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],f=r?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],p="",d="";a&&(p=i?"vec4 activation(vec4 a) {\n          vec4 b = getPreluActivationWeightsAtOutCoords();\n          "+a+"\n        }":"vec4 activation(vec4 x) {\n          "+a+"\n        }",d="result = activation(result);");var v=o?"result += getBiasAtOutCoords();":"";o&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.userCode="\n      "+p+"\n\n      const float sharedDimension = "+s+".0;\n\n      vec4 dot2x2ARowBCol(ivec3 rc) {\n        vec4 result = vec4(0);\n        for (int i = 0; i < "+s+"; i++) {\n          vec4 a = getMatrixA(rc.x, "+c+");\n          vec4 b = getMatrixB(rc.x, "+l+");\n\n          // These swizzled products need to be separately added.\n          // See: https://github.com/tensorflow/tfjs/issues/1735\n          result += ("+h[0]+" * "+f[0]+");\n          result += ("+h[1]+" * "+f[1]+");\n        }\n        return result;\n      }\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n        vec4 result = dot2x2ARowBCol(rc);\n\n        "+v+"\n\n        "+d+"\n\n        setOutput(result);\n      }\n    ";}}(),Ni=function(){function t(t,e,n){this.variableNames=["probs"],this.outputShape=[t,n],this.userCode="\n      uniform float seed;\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n\n        float r = random(seed);\n        float cdf = 0.0;\n\n        for (int i = 0; i < "+(e-1)+"; i++) {\n          cdf += getProbs(batch, i);\n\n          if (r < cdf) {\n            setOutput(float(i));\n            return;\n          }\n        }\n\n        // If no other event happened, last event happened.\n        setOutput(float("+(e-1)+"));\n      }\n    ";}return t.prototype.getCustomSetupFunc=function(t){var e=this;return function(n,r){null==e.seedLoc&&(e.seedLoc=n.getUniformLocation(r,"seed")),n.gl.uniform1f(e.seedLoc,t);}},t}(),Fi=function(){return function(t,e,n,r){this.variableNames=["indices"],this.outputShape=[t,e],this.userCode="\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int index = round(getIndices(coords.x));\n        setOutput(mix(float("+r+"), float("+n+"),\n                      float(index == coords.y)));\n      }\n    ";}}(),Oi=function(){return function(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=t;var e=t.length;if(0===e)this.userCode="\n        void main() {\n          setOutput(vec4(getA(), 0., 0., 0.));\n        }\n      ";else{var n=qo("rc",e),r=aa(e),o=function(t,e,n){if(1===t)return "rc > "+e[0];for(var r="",o=t-2;o<t;o++)r+=n[o]+" >= "+e[o],o<t-1&&(r+="||");return r}(e,t,n),a=function(t,e,n,r){if(1===t)return "";var o=r.slice(-2);return "\n    int r = "+o[0]+";\n    int c = "+o[1]+";\n    int rp1 = r + 1;\n    int cp1 = c + 1;\n\n    bool cEdge = cp1 >= "+e+";\n    bool rEdge = rp1 >= "+n+";\n  "}(e,t[t.length-1],t[t.length-2],n),i=function(t,e){var n=t.length,r=function(t,e){for(var n=[],r=0;r<=1;r++)for(var o=0;o<=1;o++){for(var a=(0===r?"r":"rp1")+", "+(0===o?"c":"cp1"),i=2;i<t;i++)a=e[e.length-1-i]+","+a;n.push(a);}return n}(n,e);return 1===n?"getA(rc),\n            rc + 1 >= "+t[0]+" ? 0. : getA(rc + 1),\n            0, 0":"getA("+r[0]+"),\n          cEdge ? 0. : getA("+r[1]+"),\n          rEdge ? 0. : getA("+r[2]+"),\n          rEdge || cEdge ? 0. : getA("+r[3]+")"}(t,n);this.userCode="\n        void main() {\n          "+r+" rc = getOutputCoords();\n\n          if("+o+") {\n            setOutput(vec4(0));\n          } else {\n            "+a+"\n\n            setOutput(vec4("+i+"));\n          }\n        }\n      ";}}}();var _i=function(){return function(t,e,n){this.variableNames=["x"],this.outputShape=e.map(function(e,n){return e[0]+t[n]+e[1]});var r=t.length,o=aa(r),a=e.map(function(t){return t[0]}).join(","),i=e.map(function(e,n){return e[0]+t[n]}).join(","),u=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,r);this.userCode=1!==r?"\n      "+o+" start = "+o+"("+a+");\n      "+o+" end = "+o+"("+i+");\n\n      void main() {\n        "+o+" outC = getOutputCoords();\n        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {\n          setOutput(float("+n+"));\n        } else {\n          "+o+" coords = outC - start;\n          setOutput(getX("+u+"));\n        }\n      }\n    ":"\n        int start = "+a+";\n        int end = "+i+";\n\n        void main() {\n          int outC = getOutputCoords();\n          if (outC < start || outC >= end) {\n            setOutput(float("+n+"));\n          } else {\n            setOutput(getX(outC - start));\n          }\n        }\n      ";}}(),Mi=function(){return function(t,e,n){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.map(function(e,n){return e[0]+t[n]+e[1]});for(var r=t.length,o=aa(r),a=e.map(function(t){return t[0]}).join(","),i=e.map(function(e,n){return e[0]+t[n]}).join(","),u=qo("rc",r),s=qo("source",r),c=u[r-1]+" < "+this.outputShape[r-1],l=1===r?"source":"vec2("+s.slice(-2).join()+")",h=[o+" rc = outputLoc;",u[r-1]+" += 1;\n       if("+c+") {\n      ",1===r?"":"}\n       rc = outputLoc;\n       "+u[r-2]+" += 1;\n       if("+u[r-2]+" < "+this.outputShape[r-2]+") {",1===r?"":"  "+u[r-1]+" += 1;\n         if("+c+") {"],f=1===r?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",p="",d=0,v=1===r?2:4;d<v;d++)p+="\n        "+h[d]+"\n        if ("+f+") {\n          result["+d+"] = float("+n+");\n        } else {\n          "+o+" source = rc - start;\n          result["+d+"] = getChannel(getX("+s.join()+"), "+l+");\n        }\n      ";p+=1===r?"} ":"}}",this.userCode="\n      const "+o+" start = "+o+"("+a+");\n      const "+o+" end = "+o+"("+i+");\n\n      void main() {\n        "+o+" outputLoc = getOutputCoords();\n        vec4 result = vec4(0.);\n        "+p+"\n        setOutput(result);\n      }\n    ";}}(),Bi=function(){return function(t,e,n){if(this.variableNames=["x"],"avg"===e&&n)throw new Error("Cannot compute positions for average pool.");var r=t.filterWidth,o=t.strideHeight,a=t.strideWidth,i=t.dilationHeight,u=t.dilationWidth,s=t.effectiveFilterHeight,c=t.effectiveFilterWidth,l=t.padInfo.top,h=t.padInfo.left;this.outputShape=t.outShape;var f="avg"===e,p="0.0";if(f||(p="-1.0 / 1e-20"),n)this.userCode="\n        const ivec2 strides = ivec2("+o+", "+a+");\n        const ivec2 pads = ivec2("+l+", "+h+");\n\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int batch = coords[0];\n          int d = coords[3];\n\n          ivec2 xRCCorner = coords.yz * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < "+s+";\n              wR += "+i+") {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= "+t.inHeight+") {\n              continue;\n            }\n\n            for (int wC = 0; wC < "+c+";\n                wC += "+u+") {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= "+t.inWidth+") {\n                continue;\n              }\n\n              float value = getX(batch, xR, xC, d);\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value >= currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = wR * "+c+" + wC;\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";else{var d=e+"("+e+"("+e+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";"avg"===e&&(d="avgValue / count");var v=4*Math.floor(r/4),m=r%4,g="\n      if ("+f+") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    ";this.userCode="\n      const ivec2 strides = ivec2("+o+", "+a+");\n      const ivec2 pads = ivec2("+l+", "+h+");\n      const float initializationValue = "+p+";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xR, int xC, int d) {\n        if (xC < 0 || xC >= "+t.inWidth+") {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xR, xC, d);\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4("+p+");\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wR = 0; wR < "+s+";\n            wR += "+i+") {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= "+t.inHeight+") {\n            continue;\n          }\n\n          for (int wC = 0; wC < "+v+"; wC += 4) {\n            int xC = xCCorner + wC * "+u+";\n\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + "+u+", d),\n              getValue(batch, xR, xC + 2 * "+u+", d),\n              getValue(batch, xR, xC + 3 * "+u+", d)\n            );\n\n            "+g+"\n          }\n\n          int xC = xCCorner + "+v+";\n          if ("+(1===m)+") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n\n            "+g+"\n          } else if ("+(2===m)+") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + "+u+", d),\n              initializationValue,\n              initializationValue\n            );\n\n            "+g+"\n          } else if ("+(3===m)+") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + "+u+", d),\n              getValue(batch, xR, xC + 2 * "+u+", d),\n              initializationValue\n            );\n\n            "+g+"\n          }\n        }\n        setOutput("+d+");\n      }\n    ";}}}(),Pi=function(){return function(t,e,n){if(this.variableNames=["x"],"avg"===e&&n)throw new Error("Cannot compute positions for average pool.");var r=t.filterWidth,o=t.strideDepth,a=t.strideHeight,i=t.strideWidth,u=t.dilationDepth,s=t.dilationHeight,c=t.dilationWidth,l=t.effectiveFilterDepth,h=t.effectiveFilterHeight,f=t.effectiveFilterWidth,p=t.padInfo.front,d=t.padInfo.top,v=t.padInfo.left;this.outputShape=t.outShape;var m="avg"===e,g="0.0";if(m||(g="-1.0 / 1e-20"),n)this.userCode="\n        const ivec3 strides =\n            ivec3("+o+", "+a+", "+i+");\n        const ivec3 pads = ivec3("+p+", "+d+", "+v+");\n\n        void main() {\n          ivec5 coords = getOutputCoords();\n          int batch = coords.x;\n          int ch = coords.u;\n\n          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n          int xDCorner = xCorner.x;\n          int xRCorner = xCorner.y;\n          int xCCorner = xCorner.z;\n\n          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n\n          for (int wD = 0; wD < "+l+";\n              wD += "+u+") {\n            int xD = xDCorner + wD;\n\n            if (xD < 0 || xD >= "+t.inDepth+") {\n              continue;\n            }\n\n            for (int wR = 0; wR < "+h+";\n                wR += "+s+") {\n              int xR = xRCorner + wR;\n\n              if (xR < 0 || xR >= "+t.inHeight+") {\n                continue;\n              }\n\n              for (int wC = 0; wC < "+f+";\n                  wC += "+c+") {\n                int xC = xCCorner + wC;\n\n                if (xC < 0 || xC >= "+t.inWidth+") {\n                  continue;\n                }\n\n                float value = getX(batch, xD, xR, xC, ch);\n\n                // If a min / max value has already been found, use it. If not,\n                // use the current value.\n                float currMinMaxValue = mix(\n                    value, minMaxValue, minMaxValueFound);\n                if (value >= currMinMaxValue) {\n                  minMaxValue = value;\n                  minMaxValueFound = 1.0;\n                  minMaxPosition =\n                      wD * "+h+" * "+f+" +\n                      wR * "+f+" + wC;;\n                }\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";else{var y=e+"("+e+"("+e+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";"avg"===e&&(y="avgValue / count");var x=4*Math.floor(r/4),b=r%4,w="\n      if ("+m+") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    ";this.userCode="\n      const ivec3 strides =\n        ivec3("+o+", "+a+", "+i+");\n      const ivec3 pads = ivec3("+p+", "+d+", "+v+");\n      const float initializationValue = "+g+";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xD, int xR, int xC, int ch) {\n        if (xC < 0 || xC >= "+t.inWidth+") {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xD, xR, xC, ch);\n      }\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int ch = coords.u;\n\n        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;\n        int xDCorner = xCorner.x;\n        int xRCorner = xCorner.y;\n        int xCCorner = xCorner.z;\n\n        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).\n        // ? = to be determined\n        vec4 minMaxValue = vec4("+g+");\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wD = 0; wD < "+l+";\n            wD += "+u+") {\n          int xD = xDCorner + wD;\n\n          if (xD < 0 || xD >= "+t.inDepth+") {\n            continue;\n          }\n\n          for (int wR = 0; wR < "+h+";\n            wR += "+s+") {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= "+t.inHeight+") {\n              continue;\n            }\n\n            for (int wC = 0; wC < "+x+"; wC += 4) {\n              int xC = xCCorner + wC * "+c+";\n\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + "+c+", ch),\n                getValue(batch, xD, xR, xC + 2 * "+c+", ch),\n                getValue(batch, xD, xR, xC + 3 * "+c+", ch)\n              );\n\n              "+w+"\n            }\n\n            int xC = xCCorner + "+x+";\n            if ("+(1===b)+") {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                initializationValue,\n                initializationValue,\n                initializationValue\n              );\n\n              "+w+"\n            } else if ("+(2===b)+") {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + "+c+", ch),\n                initializationValue,\n                initializationValue\n              );\n\n              "+w+"\n            } else if ("+(3===b)+") {\n              vec4 values = vec4(\n                getValue(batch, xD, xR, xC, ch),\n                getValue(batch, xD, xR, xC + "+c+", ch),\n                getValue(batch, xD, xR, xC + 2 * "+c+", ch),\n                initializationValue\n              );\n\n              "+w+"\n            }\n          }\n          setOutput("+y+");\n        }\n      }\n    ";}}}(),Li=function(){return function(t,e){this.variableNames=["x"];var n=t.windowSize,r=t.batchSize,o=t.inSize,a=Math.ceil(o/n);this.outputShape=[r,a];var i="0.0",u="";"prod"===e?i="1.0":"min"===e?(i="1.0 / 1e-20",u="min"):"max"===e&&(i="-1.0 / 1e-20",u="max");var s=e+"("+e+"("+e+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";"sum"===e?s="sumValue":"prod"===e?s="prodValue":"all"===e?s="allValue":"any"===e&&(s="anyValue");var c=4*Math.floor(n/4),l=n%4,h="\n      if ("+("sum"===e)+") {\n        sumValue += dot(values, ones);\n      } else if ("+("prod"===e)+") {\n        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);\n        prodValue *= tmp[0] * tmp[1];\n      } else {\n        minMaxValue = "+u+"(values, minMaxValue);\n      }\n    ",f="vec4";"all"===e?(i="1.0",h="\n        bool reducedAllValue = all(values);\n        float floatedReducedAllValue = float(reducedAllValue);\n        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);\n      ",f="bvec4"):"any"===e&&(i="0.0",h="\n        bool reducedAnyValue = any(values);\n        float floatedReducedAnyValue = float(reducedAnyValue);\n        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);\n      ",f="bvec4");var p="";o%n>0&&(p="\n        if (inIdx < 0 || inIdx >= "+o+") {\n          return initializationValue;\n        }\n      "),this.userCode="\n      const float initializationValue = "+i+";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        "+p+"\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * "+n+";\n\n        vec4 minMaxValue = vec4("+i+");\n        float prodValue = 1.0;\n        float sumValue = 0.0;\n        float allValue = 1.0;\n        float anyValue = 0.0;\n\n        for (int i = 0; i < "+c+"; i += 4) {\n          int inIdx = inOffset + i;\n          "+f+" values = "+f+"(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          "+h+"\n        }\n\n        int inIdx = inOffset + "+c+";\n        if ("+(1===l)+") {\n          "+f+" values = "+f+"(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          "+h+"\n        } else if ("+(2===l)+") {\n          "+f+" values = "+f+"(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          "+h+"\n        } else if ("+(3===l)+") {\n          "+f+" values = "+f+"(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          "+h+"\n        }\n        setOutput("+s+");\n      }\n    ";}}(),Wi=function(){return function(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t;for(var n="",r=0;r<4;r++){var o="thisRC = rc;";r%2==1&&(o+="thisRC.z += 1;"),r>1&&(o+="thisRC.y += 1;"),n+="\n        "+o+"\n        "+(r>0?"if(thisRC.y < rows && thisRC.z < cols){":"")+"\n          int flatIndex = getFlatIndex(thisRC);\n\n          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);\n          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));\n\n          result["+r+"] =\n            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);\n        "+(r>0?"}":"")+"\n      ";}this.userCode="\n      \n    ivec3 inputCoordsFromReshapedOutCoords(int index) {\n      "+jo(["r","c","d"],e)+"\n      return ivec3(r, c, d);\n    }\n  \n      "+Xo(t)+"\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n\n        vec4 result = vec4(0.);\n\n        ivec3 thisRC;\n        int rows = "+t[1]+";\n        int cols = "+t[2]+";\n\n        "+n+"\n\n        setOutput(result);\n      }\n    ";}}();var Ui=function(){return function(t,e,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e.shape;var r=e.shape,o=r[1],a=r[2],i=t.shape,u=i[1],s=i[2],c=[n&&u>1?o-1:o,n&&s>1?a-1:a],l=[n&&u>1?u-1:u,n&&s>1?s-1:s],h=c[0]/l[0],f=c[1]/l[1],p=1/h,d=1/f,v=2*Math.ceil(p)+2,m=2*Math.ceil(d)+2;this.userCode="\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float("+h+");\n        const float widthScale = float("+f+");\n\n        const float invHeightScale = float("+p+");\n        const float invWidthScale = float("+d+");\n\n        const int winHeight = int("+v+");\n        const int winWidth = int("+m+");\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(startRLerp - float(winHeight / 2));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(startCLerp - float(winWidth / 2));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= "+u+") {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= "+s+") {\n              continue;\n            }\n\n            float dxR = float(dyR) * heightScale;\n            int topDxRIndex = int(floor(dxR));\n            int bottomDxRIndex = int(min(ceil(dxR), "+(o-1)+".0));\n            float dxRLerp = dxR - float(topDxRIndex);\n            float inverseDxRLerp = 1.0 - dxRLerp;\n\n            float dxC = float(dyC) * widthScale;\n            int leftDxCIndex = int(floor(dxC));\n            int rightDxCIndex = int(min(ceil(dxC), "+(a-1)+".0));\n            float dxCLerp = dxC - float(leftDxCIndex);\n            float inverseDxCLerp = 1.0 - dxCLerp;\n\n            if (r == topDxRIndex && c == leftDxCIndex) {\n              // topLeft\n              accumulator +=\n                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;\n            }\n\n            if (r == topDxRIndex && c == rightDxCIndex) {\n              // topRight\n              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == leftDxCIndex) {\n              // bottomLeft\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == rightDxCIndex) {\n              // bottomRight\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    ";}}(),Vi=function(){return function(t,e,n,r){this.variableNames=["A"],this.outputShape=[];var o=t[0],a=t[1],i=t[2],u=t[3];this.outputShape=[o,e,n,u];var s=[r&&e>1?a-1:a,r&&n>1?i-1:i],c=[r&&e>1?e-1:e,r&&n>1?n-1:n];this.userCode="\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          "+s[0]/c[0]+",\n          "+s[1]/c[1]+");\n      const vec2 inputShapeRC = vec2("+a+".0, "+i+".0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);\n        ivec2 sourceCeilRC = ivec2(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);\n        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);\n        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);\n        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);\n\n        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);\n\n        float top = topLeft + (topRight - topLeft) * fracRC.y;\n        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;\n        float newValue = top + (bottom - top) * fracRC.x;\n\n        setOutput(newValue);\n      }\n    ";}}(),zi=function(){return function(t,e,n,r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];var o=t[0],a=t[1],i=t[2],u=t[3];this.outputShape=[o,e,n,u];var s=[r&&e>1?a-1:a,r&&n>1?i-1:i],c=[r&&e>1?e-1:e,r&&n>1?n-1:n];this.userCode="\n      const vec3 effectiveInputOverOutputRatioRC = vec3(\n          "+s[0]/c[0]+",\n          "+s[1]/c[1]+",\n          "+s[1]/c[1]+");\n      const vec3 inputShapeRC = vec3("+a+".0, "+i+".0,\n                                     "+i+".0);\n\n      float getAValue(int b, int r, int c, int d) {\n        return getChannel(getA(b, r, c, d), vec2(c, d));\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        // Calculate values for next column in yRC.z.\n        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);\n\n        // Fractional source index.\n        vec3 sourceFracIndexRC = vec3(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec3 sourceFloorRC = ivec3(sourceFracIndexRC);\n        ivec3 sourceCeilRC = ivec3(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        // Should we calculate next column and row elements in 2x2 packed cell.\n        bool hasNextCol = d < "+(u-1)+";\n        bool hasNextRow = coords.z < "+(n-1)+";\n\n        // In parallel, construct four corners for all four components in\n        // packed 2x2 cell.\n        vec4 topLeft = vec4(\n          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),\n          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);\n\n        vec4 bottomLeft = vec4(\n          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),\n          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);\n\n        vec4 topRight = vec4(\n          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),\n          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);\n\n        vec4 bottomRight = vec4(\n          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),\n          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)\n                     : 0.0,\n          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)\n                     : 0.0,\n          (hasNextRow && hasNextCol) ?\n            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);\n\n        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);\n\n        vec4 top = mix(topLeft, topRight, fracRC.yyzz);\n        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);\n        vec4 newValue = mix(top, bottom, fracRC.x);\n\n        setOutput(newValue);\n      }\n    ";}}(),Gi=function(){return function(t,e,n){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e.shape;var r=e.shape,o=r[1],a=r[2],i=t.shape,u=i[1],s=i[2],c=[n&&u>1?o-1:o,n&&s>1?a-1:a],l=[n&&u>1?u-1:u,n&&s>1?s-1:s],h=c[0]/l[0],f=c[1]/l[1],p=1/h,d=1/f,v=2*Math.ceil(p)+2,m=2*Math.ceil(d)+2;this.userCode="\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float("+h+");\n        const float widthScale = float("+f+");\n\n        const float invHeightScale = float("+p+");\n        const float invWidthScale = float("+d+");\n\n        const int winHeight = int("+v+");\n        const int winWidth = int("+m+");\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(floor(startRLerp - float(winHeight / 2)));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(floor(startCLerp - float(winWidth / 2)));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= "+u+") {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= "+s+") {\n              continue;\n            }\n\n            float sourceFracRow =\n              float("+c[0]+") *\n                (float(dyR) / float("+l[0]+"));\n\n            float sourceFracCol =\n                float("+c[1]+") *\n                  (float(dyC) / float("+l[1]+"));\n\n            int sourceNearestRow = int(min(\n                float(int("+o+") - 1),\n                "+n+" ? float(round(sourceFracRow)) :\n                                  float(floor(sourceFracRow))));\n\n            int sourceNearestCol = int(min(\n                float(int("+a+") - 1),\n                "+n+" ? float(round(sourceFracCol)) :\n                                  float(floor(sourceFracCol))));\n\n            if (r == sourceNearestRow && c == sourceNearestCol) {\n              accumulator += getDy(b, dyR, dyC, d);\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    ";}}(),Hi=function(){return function(t,e,n,r){this.variableNames=["A"],this.outputShape=[];var o=t[0],a=t[1],i=t[2],u=t[3];this.outputShape=[o,e,n,u];var s=[r&&e>1?a-1:a,r&&n>1?i-1:i],c=[r&&e>1?e-1:e,r&&n>1?n-1:n],l=r?"0.5":"0.0";this.userCode="\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          "+s[0]/c[0]+",\n          "+s[1]/c[1]+");\n      const vec2 inputShapeRC = vec2("+a+".0, "+i+".0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the coordinators of nearest neighbor point.\n        ivec2 sourceNearestRC = ivec2(\n          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + "+l+")));\n\n        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);\n\n        setOutput(newValue);\n      }\n    ";}}(),qi=function(){return function(t,e){this.variableNames=["x"];var n=t.length;if(n>4)throw new Error("WebGL backend: Reverse of rank-"+n+" tensor is not yet supported");if(this.outputShape=t,1!==n){var r=t.map(function(n,r){return function(n){return -1!==e.indexOf(n)&&1!==t[n]?t[n]+" - coords["+n+"] - 1":"coords["+n+"]"}(r)}).join(","),o=aa(n);this.userCode="\n      void main() {\n        "+o+" coords = getOutputCoords();\n        setOutput(getX("+r+"));\n      }\n    ";}else this.userCode="\n        void main() {\n          int coord = getOutputCoords();\n          setOutput(getX("+t[0]+" - coord - 1));\n        }\n      ";}}(),Ki=function(){return function(t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;var n=t.length;if(n>4)throw new Error("WebGL backend: Reverse of rank-"+n+" tensor is not yet supported");this.outputShape=t;var r=qo("rc",n),o=r[n-1]+" + 1 < "+this.outputShape[n-1],a=r[n-2]+" + 1 < "+this.outputShape[n-2],i=aa(n);function u(n){var r=t.map(function(r,o){return function(n,r){return -1!==e.indexOf(n)&&1!==t[n]?t[n]+" - "+r[n]+" - 1":""+r[n]}(o,n)});return "getChannel(getX("+r.join(",")+"), vec2("+r.slice(-2).join(",")+"))"}this.userCode=1===n?"\n        void main(){\n          int rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = getChannel(getX("+t[0]+" - rc - 1),\n            "+t[0]+" - rc - 1);\n          if("+o+"){\n              result.g = getChannel(getX("+t[0]+" - (rc  + 1) - 1),\n                "+t[0]+" - (rc  + 1) - 1);\n          }\n          setOutput(result);\n        }\n      ":"\n        void main() {\n          "+i+" rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = "+function(t){return u(t)}(r.slice())+";\n          if("+o+"){\n            result.g = "+function(t){return t[n-1]="("+t[n-1]+" + 1)",u(t)}(r.slice())+";\n          }\n          if("+a+") {\n            result.b = "+function(t){return t[n-2]="("+t[n-2]+" + 1)",u(t)}(r.slice())+";\n            if("+o+") {\n              result.a = "+function(t){return t[n-1]="("+t[n-1]+" + 1)",t[n-2]="("+t[n-2]+" + 1)",u(t)}(r.slice())+";\n            }\n          }\n          setOutput(result);\n        }\n    ";}}(),ji=function(){return function(t,e,n,r,o,a,i){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;var u=aa(o.length),s=aa(a.length),c="";1===n?c="i":2===n&&(c="i, j");var l="getIndices("+c+")",h="";1===r?h="i":2===r&&(h="i, coords[1]");var f="getUpdates("+h+")",p=e>1?"strides[j]":"strides";this.userCode="\n        "+u+" strides = "+u+"("+o+");\n\n        void main() {\n          "+s+" coords = getOutputCoords();\n          float sum = 0.0;\n          bool found = false;\n          for (int i = 0; i < "+t+"; i++) {\n            int flattenedIndex = 0;\n            for (int j = 0; j < "+e+"; j++) {\n              int index = round("+l+");\n              flattenedIndex += index * "+p+";\n            }\n            if (flattenedIndex == coords[0]) {\n              sum += "+f+";\n              found = true;\n            }\n          }\n          setOutput(mix(getDefaultValue(), sum, float(found)));\n        }\n      ";}}(),Xi=function(){return function(t,e){this.variableNames=["x","segmentIds"];var n=t.windowSize,r=t.batchSize,o=t.inSize,a=t.numSegments,i=a*Math.ceil(o/n);this.outputShape=[r,i];var u=4*Math.floor(n/4),s=n%4,c="\n        sumValue += dot(values, segFilter);\n    ",l="";o%n>0&&(l="\n        if (inIdx < 0 || inIdx >= "+o+") {\n          return initializationValue;\n        }\n      ");var h="";o%n>0&&(h="\n        if (inIdx < 0 || inIdx >= "+o+") {\n          return -1.0;\n        }\n      "),this.userCode="\n      const float initializationValue = 0.0;\n\n      float getValue(int batch, int inIdx) {\n        "+l+"\n        return getX(batch, inIdx);\n      }\n\n      float getSegmentIdAtIndex(int inIdx) {\n        "+h+"\n        return getSegmentIds(inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = int(floor(float(outIdx) / float(\n          "+a+")) * float("+n+"));\n        int currentSeg = int(mod(float(outIdx), float("+a+")));\n\n        float sumValue = 0.0;\n\n        for (int i = 0; i < "+u+"; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0\n          );\n\n          "+c+"\n        }\n\n        int inIdx = inOffset + "+u+";\n        if ("+(1===s)+") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n\n          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            0,\n            0,\n            0\n          );\n\n          "+c+"\n        } else if ("+(2===s)+") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n              0,\n              0\n          );\n\n          "+c+"\n        } else if ("+(3===s)+") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n\n          vec4 segFilter = vec4(\n            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,\n            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,\n            0\n          );\n\n          "+c+"\n        }\n        setOutput(sumValue);\n      }\n    ";}}(),$i=function(){return function(t,e,n){var r,o;if(this.variableNames=["c","a","b"],this.outputShape=e,n>4)throw Error("Where for rank "+n+" is not yet supported");if(1===n)o="resRC",r="resRC";else{for(var a=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],u=[],s=0;s<e.length;s++)u.push(""+a[s]),s<t&&i.push(""+a[s]);r=i.join(),o=u.join();}var c=aa(n);this.userCode="\n      void main() {\n        "+c+" resRC = getOutputCoords();\n        float cVal = getC("+r+");\n        if (cVal >= 1.0) {\n          setOutput(getA("+o+"));\n        } else {\n          setOutput(getB("+o+"));\n        }\n      }\n    ";}}(),Yi=function(){function t(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;var e,n=aa(this.rank),r="uniform int start["+this.rank+"];",o=function(t){if(1===t)return "sourceLoc";if(t<=6)return Qi.slice(0,t).map(function(t){return "sourceLoc."+t}).join(",");throw Error("Slicing for rank "+t+" is not yet supported")}(this.rank);e="\n        "+n+" sourceLoc;\n        "+n+" coords = getOutputCoords();\n        "+t.map(function(t,e){return "sourceLoc."+Qi[e]+" = start["+e+"] + coords."+Qi[e]+";"}).join("\n")+"\n      ",this.userCode="\n      "+r+"\n      void main() {\n        "+e+"\n        setOutput(getSource("+o+"));\n      }\n    ";}return t.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(n,r){null==e.startLoc&&(e.startLoc=n.getUniformLocationNoThrow(r,"start"),null==e.startLoc)||n.gl.uniform1iv(e.startLoc,t);}},t}(),Qi=["x","y","z","w","u","v"];var Ji=function(){function t(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length;var e=aa(this.rank),n=qo("coords",this.rank),r=qo("sourceLoc",this.rank),o=1===this.rank?"sourceLoc":"vec2("+r.slice(-2).join()+")",a="getChannel(getSource("+r.join()+"), "+o+")",i="\n      result.x = "+a+";\n      if (++"+n[this.rank-1]+" < "+t[this.rank-1]+") {\n        ++"+r[this.rank-1]+";\n        result.y = "+a+";\n        --"+r[this.rank-1]+";\n      }\n    ",u=1===this.rank?"":"\n      --"+n[this.rank-1]+";\n      if (++"+n[this.rank-2]+" < "+t[this.rank-2]+") {\n        ++"+r[this.rank-2]+";\n        result.z = "+a+";\n        if (++"+n[this.rank-1]+" < "+t[this.rank-1]+") {\n          ++"+r[this.rank-1]+";\n          result.w = "+a+";\n        }\n      }\n    ",s=this.rank<=4?"sourceLoc = coords +\n            "+e+"("+t.map(function(t,e){return "start["+e+"]"}).join()+");":t.map(function(t,e){return r[e]+" = "+n[e]+" + start["+e+"];"}).join("\n");this.userCode="\n      uniform int start["+this.rank+"];\n      void main() {\n        "+e+" coords = getOutputCoords();\n        "+e+" sourceLoc;\n        "+s+"\n        vec4 result = vec4(0.);\n        "+i+"\n        "+u+"\n        setOutput(result);\n      }\n    ";}return t.prototype.getCustomSetupFunc=function(t){var e=this;if(t.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+t.length+")");return function(n,r){null==e.startLoc&&(e.startLoc=n.getUniformLocationNoThrow(r,"start"),null==e.startLoc)||n.gl.uniform1iv(e.startLoc,t);}},t}(),Zi=function(){return function(t,e,n){this.variableNames=["x"],this.outputShape=n;var r=n.length,o=aa(n.length),a=aa(n.length),i="";if(1===r)i="coords * strides + begin";else{var u=0;i=n.map(function(t,e){return u++,1===n.length?"coords * strides["+e+"] + begin["+e+"]":"coords["+(u-1)+"] * strides["+e+"] + begin["+e+"]"}).join(",");}this.userCode="\n      "+o+" begin = "+o+"("+t+");\n      "+o+" strides = "+o+"("+e+");\n\n      void main() {\n        "+a+" coords = getOutputCoords();\n        setOutput(getX("+i+"));\n      }\n    ";}}(),tu=function(){function t(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={};}return t.prototype.acquireTexture=function(t,e,n){var r,o=eu(e,n),a=nu(t,o,n);if(a in this.freeTextures||(this.freeTextures[a]=[]),a in this.usedTextures||(this.usedTextures[a]=[]),this.freeTextures[a].length>0){this.numFreeTextures--,this.numUsedTextures++,this.log();var i=this.freeTextures[a].shift();return this.usedTextures[a].push(i),i}return this.numUsedTextures++,this.log(),o===Bt.PACKED_2X2_FLOAT32?r=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):o===Bt.PACKED_2X2_FLOAT16?r=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):o===Bt.UNPACKED_FLOAT32?r=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):o===Bt.UNPACKED_FLOAT16?r=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):o===Bt.PACKED_4X1_UNSIGNED_BYTE&&(r=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[a].push(r),r},t.prototype.releaseTexture=function(t,e,n,r){if(null!=this.freeTextures){var o=nu(e,eu(n,r),r);o in this.freeTextures||(this.freeTextures[o]=[]),this.freeTextures[o].push(t),this.numFreeTextures++,this.numUsedTextures--;var a=this.usedTextures[o],i=a.indexOf(t);if(i<0)throw new Error("Cannot release a texture that was never provided by this texture manager");a.splice(i,1),this.log();}},t.prototype.log=function(){if(this.logEnabled){var t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",this.numFreeTextures+" / "+this.numUsedTextures,"("+t+")");}},t.prototype.getNumUsedTextures=function(){return this.numUsedTextures},t.prototype.getNumFreeTextures=function(){return this.numFreeTextures},t.prototype.dispose=function(){var t=this;if(null!=this.freeTextures){for(var e in this.freeTextures)this.freeTextures[e].forEach(function(e){t.gpgpu.deleteMatrixTexture(e);});for(var e in this.usedTextures)this.usedTextures[e].forEach(function(e){t.gpgpu.deleteMatrixTexture(e);});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0;}},t}();function eu(t,e){if(t===Mt.UPLOAD)return Bt.PACKED_2X2_FLOAT32;if(t===Mt.RENDER||null==t)return function(t){return a().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?t?Bt.PACKED_2X2_FLOAT32:Bt.UNPACKED_FLOAT32:t?Bt.PACKED_2X2_FLOAT16:Bt.UNPACKED_FLOAT16}(e);if(t===Mt.DOWNLOAD||t===Mt.PIXELS)return Bt.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+t)}function nu(t,e,n){return t[0]+"_"+t[1]+"_"+e+"_"+n}var ru=function(){return function(t,e){this.variableNames=["A"];for(var n=new Array(t.length),r=0;r<n.length;r++)n[r]=t[r]*e[r];this.outputShape=n,this.rank=n.length;var o=aa(this.rank),a=function(t){var e=t.length;if(e>5)throw Error("Tile for rank "+e+" is not yet supported");if(1===e)return "imod(resRC, "+t[0]+")";for(var n=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],r=[],o=0;o<t.length;o++)r.push("imod("+n[o]+", "+t[o]+")");return r.join()}(t);this.userCode="\n      void main() {\n        "+o+" resRC = getOutputCoords();\n        setOutput(getA("+a+"));\n      }\n    ";}}();var ou=function(){return function(t,e){this.variableNames=["A"];for(var n=new Array(t.length),r=0;r<n.length;r++)n[r]=t[e[r]];this.outputShape=n,this.rank=n.length;var o=aa(this.rank),a=function(t){var e=t.length;if(e>6)throw Error("Transpose for rank "+e+" is not yet supported");for(var n=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],r=new Array(e),o=0;o<t.length;o++)r[t[o]]=n[o];return r.join()}(e);this.userCode="\n    void main() {\n      "+o+" resRC = getOutputCoords();\n      setOutput(getA("+a+"));\n    }\n    ";}}();var au=function(){return function(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;for(var n=new Array(t.length),r=0;r<n.length;r++)n[r]=t[e[r]];if(this.outputShape=n,this.rank=n.length,this.rank>6)throw Error("Packed transpose for rank "+this.rank+" is not yet supported.");var o=aa(this.rank),a=Ho("rc",this.rank),i=new Array(this.rank);for(r=0;r<e.length;r++)i[e[r]]=a[r];var u="vec2("+i.slice(-2).join()+")",s="++"+a[this.rank-1]+" < "+n[this.rank-1],c="getChannel(getA("+i.join()+"), "+u+")";this.userCode="\n    void main() {\n      "+o+" rc = getOutputCoords();\n      vec4 result = vec4(0.);\n      result[0] = "+c+";\n      if("+s+") {\n        result[1] = "+c+";\n      }\n      --"+a[this.rank-1]+";\n      if(++"+a[this.rank-2]+" < "+n[this.rank-2]+") {\n        result[2] = "+c+";\n        if("+s+") {\n          result[3] = "+c+";\n        }\n      }\n      setOutput(result);\n    }\n    ";}}(),iu=1.7580993408473768,uu=1.0507009873554805,su=function(){return function(t,e){this.variableNames=["A"],this.outputShape=t,this.userCode="\n      float unaryOperation(float x) {\n        "+e+"\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    ";}}(),cu="if (isnan(x)) return x;",lu="return x;",hu="return abs(x);",fu=cu+"\n  return (x < 0.0) ? 0.0 : x;\n",pu=cu+"\n  return (x < 0.0) ? 0.0 : min(6.0, x);\n",du="return (x >= 0.0) ? x : (exp(x) - 1.0);",vu="\n  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.\n  // see: https://arxiv.org/abs/1706.02515\n  float scaleAlpha = "+iu+";\n  float scale = "+uu+";\n  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);\n";var mu="return -x;",gu="return ceil(x);",yu="return floor(x);",xu="return exp(x);",bu="return exp(x) - 1.0;",wu=cu+"\n  return sin(x);\n",Cu=cu+"\n  return cos(x);\n",Eu=cu+"\n  if (abs(x) > 1.) {\n    return NAN;\n  }\n  return asin(x);\n",Ru=cu+"\n  if (abs(x) > 1.) {\n    return NAN;\n  }\n  return acos(x);\n",Iu=cu+"\n  return atan(x);\n",ku=cu+"return log(x + sqrt(x * x + 1.0));",Su=cu+"\n  if (x < 1.0) return NAN;\n  return log(x + sqrt(x * x - 1.0));",Au=cu+"\n  if ((x < -1.0) || (x > 1.0)) return NAN;\n  return (log(1.0 + x) - log(1.0 - x)) / 2.0;",Du="return x;",Tu="return x;",Nu="\n  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n",Fu="\n  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));\n  bvec4 isNaN = isnan(x);\n\n  result.r = isNaN.r ? x.r : result.r;\n  result.g = isNaN.g ? x.g : result.g;\n  result.b = isNaN.b ? x.b : result.b;\n  result.a = isNaN.a ? x.a : result.a;\n\n  return result;\n",Ou="\n  vec4 result;\n\n  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);\n  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);\n  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);\n  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);\n\n  return result;\n",_u=function(){return function(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.userCode="\n      vec4 unaryOperation(vec4 x) {\n        "+e+"\n      }\n\n      void main() {\n        vec4 x = getAAtOutCoords();\n        vec4 y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    ";}}(),Mu=function(){return function(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=t;var e=t.length,n=qo("rc",e),r=aa(e),o=function(t,e){if(1===t)return "rc";for(var n="",r=0;r<t;r++)n+=e[r],r<t-1&&(n+=",");return n}(e,n),a=n.slice(-2),i=e<=1?"rc":"vec2("+a.join(",")+")";this.userCode="\n      void main() {\n        "+r+" rc = getOutputCoords();\n        vec4 packedInput = getA("+o+");\n\n        setOutput(getChannel(packedInput, "+i+"));\n      }\n    ";}}(),Bu={};function Pu(t,e){if(void 0===e&&(e=!1),"linear"===t)return e?Tu:lu;if("relu"===t)return e?Nu:fu;if("elu"===t)return e?Ou:du;if("relu6"===t)return e?Fu:pu;if("prelu"===t)return e?wa:xa;throw new Error("Activation "+t+" has not been implemented for the WebGL backend.")}var Lu=600;var Wu=function(t){function o(e){var n,r=t.call(this)||this;if(r.gpgpu=e,r.pendingRead=new WeakMap,r.pendingDisposal=new WeakSet,r.dataRefCount=new WeakMap,r.numBytesInGPU=0,r.uploadWaitMs=0,r.downloadWaitMs=0,r.warnedAboutMemory=!1,r.pendingDeletes=0,r.disposed=!1,!a().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(null==e){var o=Ut(a().getNumber("WEBGL_VERSION"));r.binaryCache=(n=a().getNumber("WEBGL_VERSION"))in Bu?Bu[n]:(Bu[n]={},Bu[n]),r.gpgpu=new Ci(o),r.canvas=o.canvas,r.gpgpuCreatedLocally=!0;}else r.binaryCache={},r.gpgpuCreatedLocally=!1,r.canvas=e.gl.canvas;return r.textureManager=new tu(r.gpgpu),r.numMBBeforeWarning=null==a().global.screen?1024:a().global.screen.height*a().global.screen.width*window.devicePixelRatio*Lu/1024/1024,r.texData=new so(r,Nt),r}return e(o,t),o.prototype.numDataIds=function(){return this.texData.numDataIds()+(this.cpuBackend?this.cpuBackend.numDataIds():0)-this.pendingDeletes},o.prototype.fromPixels=function(t,e){if(null==t)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");var n="undefined"!=typeof OffscreenCanvas&&t instanceof OffscreenCanvas||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement,r=t.data instanceof Uint8Array,o="undefined"!=typeof ImageData&&t instanceof ImageData,i="undefined"!=typeof HTMLVideoElement&&t instanceof HTMLVideoElement,u="undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement,s=i?[t.videoWidth,t.videoHeight]:[t.width,t.height],c=s[0],l=s[1],h=[l,c],f=[l,c,e];if(!(n||r||o||i||u))throw new Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was "+t.constructor.name);(u||i)&&(null==this.fromPixels2DContext&&(this.fromPixels2DContext=Vt(a().getNumber("WEBGL_VERSION")).getContext("2d")),this.fromPixels2DContext.canvas.width=c,this.fromPixels2DContext.canvas.height=l,this.fromPixels2DContext.drawImage(t,0,0,c,l),t=this.fromPixels2DContext.canvas);var p,d,v=this.makeTensorInfo(h,"int32");return this.texData.get(v.dataId).usage=Mt.PIXELS,this.gpgpu.uploadPixelDataToTexture(this.getTexture(v.dataId),t),a().getBool("WEBGL_PACK")?(p=new ei(f),d=this.compileAndRun(p,[v])):(p=new ti(f),d=this.compileAndRun(p,[v])),this.disposeData(v.dataId),d},o.prototype.write=function(t,e,n){if(a().getBool("DEBUG")&&this.checkNumericalProblems(t),"complex64"===n&&null!=t)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");var r={};return this.texData.set(r,{shape:e,dtype:n,values:t,usage:Mt.UPLOAD}),r},o.prototype.move=function(t,e,n,r){if(a().getBool("DEBUG")&&this.checkNumericalProblems(e),"complex64"===r)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(t,{shape:n,dtype:r,values:e,usage:Mt.UPLOAD});},o.prototype.readSync=function(t){var e=this.texData.get(t),n=e.values,r=e.dtype,o=e.complexTensors,a=e.slice,i=e.shape,u=e.isPacked;if(null!=a){var s=void 0;s=u?new _u(i,Du):new su(i,Du);var c=this.runWebGLProgram(s,[{dataId:t,shape:i,dtype:r}],r),l=this.readSync(c.dataId);return this.disposeData(c.dataId),l}if(null!=n)return this.convertAndCacheOnCPU(t);if("string"===r)return n;var h,f,p=null!=this.activeTimers;(p&&(h=Y()),"complex64"===r)?f=No(o.real.dataSync(),o.imag.dataSync()):f=this.getValuesFromTexture(t);return p&&(this.downloadWaitMs+=Y()-h),this.convertAndCacheOnCPU(t,f)},o.prototype.read=function(t){return n(this,void 0,void 0,function(){var e,n,o,i,u,s,c,l,h,f,p,d,v,m,g,y,x,b,C,E,R,I;return r(this,function(r){switch(r.label){case 0:if(this.pendingRead.has(t))return e=this.pendingRead.get(t),[2,new Promise(function(t){return e.push(t)})];if(n=this.texData.get(t),o=n.values,i=n.shape,u=n.slice,s=n.dtype,c=n.complexTensors,l=n.isPacked,null!=u)return h=void 0,h=l?new _u(i,Du):new su(i,Du),f=this.runWebGLProgram(h,[{dataId:t,shape:i,dtype:s}],s),p=this.read(f.dataId),this.disposeData(f.dataId),[2,p];if(null!=o)return [2,this.convertAndCacheOnCPU(t)];if(!a().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&2===a().getNumber("WEBGL_VERSION"))throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");return d=null,"complex64"!==s&&a().get("WEBGL_BUFFER_SUPPORTED")&&(v=this.decode(t),m=this.texData.get(v.dataId),d=(I=this.gpgpu).createBufferFromTexture.apply(I,[m.texture].concat(Gt(i)))),this.pendingRead.set(t,[]),"complex64"===s?[3,2]:[4,this.gpgpu.createAndWaitForFence()];case 1:r.sent(),r.label=2;case 2:return "complex64"!==s?[3,4]:[4,Promise.all([c.real.data(),c.imag.data()])];case 3:return y=r.sent(),x=y[0],b=y[1],g=No(x,b),[3,5];case 4:null==d?g=this.getValuesFromTexture(t):(C=w(i),g=this.gpgpu.downloadFloat32MatrixFromBuffer(d,C)),r.label=5;case 5:return null!=v&&this.disposeData(v.dataId),E=this.convertAndCacheOnCPU(t,g),R=this.pendingRead.get(t),this.pendingRead.delete(t),R.forEach(function(t){return t(E)}),this.pendingDisposal.has(t)&&(this.pendingDisposal.delete(t),this.disposeData(t),this.pendingDeletes--),[2,E]}})})},o.prototype.checkNumericalProblems=function(t){if(null!=t)for(var e=0;e<t.length;e++){var n=t[e];if(!$t(n)){if(a().getBool("WEBGL_RENDER_FLOAT32_CAPABLE"))throw Error("The value "+n+" cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'");throw Error("The value "+n+" cannot be represented on this device.")}}},o.prototype.getValuesFromTexture=function(t){var e,n=this.texData.get(t),r=n.shape,o=n.dtype,i=n.isPacked,u=w(r);if(a().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){var s=this.decode(t),c=this.texData.get(s.dataId),l=(e=this.gpgpu).downloadMatrixFromPackedTexture.apply(e,[c.texture].concat(Gt(r))).subarray(0,u);return this.disposeData(s.dataId),l}var h=a().getBool("WEBGL_PACK")&&!0===i,f=h?Re(r):r,p=h?new ja(f):new Ka(f),d=this.runWebGLProgram(p,[{shape:f,dtype:o,dataId:t}],"float32"),v=this.texData.get(d.dataId),m=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(v.texture,v.texShape[0],v.texShape[1]).subarray(0,u);return this.disposeData(d.dataId),m},o.prototype.time=function(t){return n(this,void 0,void 0,function(){var e,n,o,a,i,u,s;return r(this,function(r){switch(r.label){case 0:return e=this.activeTimers,n=[],o=!1,null==this.programTimersStack?(this.programTimersStack=n,o=!0):this.activeTimers.push(n),this.activeTimers=n,t(),a=b(this.activeTimers.map(function(t){return t.query})).filter(function(t){return null!=t}),i=b(this.activeTimers.map(function(t){return t.name})).filter(function(t){return null!=t}),this.activeTimers=e,o&&(this.programTimersStack=null),[4,Promise.all(a)];case 1:return u=r.sent(),s={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:m(u),getExtraProfileInfo:function(){return u.map(function(t,e){return {name:i[e],ms:t}}).map(function(t){return t.name+": "+t.ms}).join(", ")},wallMs:null},this.uploadWaitMs=0,this.downloadWaitMs=0,[2,s]}})})},o.prototype.memory=function(){return {unreliable:!1,numBytesInGPU:this.numBytesInGPU}},o.prototype.startTimer=function(){return a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?this.gpgpu.beginQuery():{startMs:Y(),endMs:null}},o.prototype.endTimer=function(t){return a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(this.gpgpu.endQuery(),t):(t.endMs=Y(),t)},o.prototype.getQueryTime=function(t){return n(this,void 0,void 0,function(){var e;return r(this,function(n){return a().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?[2,this.gpgpu.waitForQueryAndGetTime(t)]:[2,(e=t).endMs-e.startMs]})})},o.prototype.disposeData=function(t){if(!this.pendingDisposal.has(t)){if(this.pendingRead.has(t))return this.pendingDisposal.add(t),void this.pendingDeletes++;if(this.texData.has(t)){this.releaseGPUData(t);var e=this.texData.get(t).complexTensors;null!=e&&(e.real.dispose(),e.imag.dispose()),this.texData.delete(t);}}},o.prototype.releaseGPUData=function(t){var e=this.texData.get(t),n=e.texture,r=e.dtype,o=e.texShape,a=e.usage,i=e.isPacked,u=e.slice,s=u&&u.origDataId||t,c=this.dataRefCount.get(s);c>1?this.dataRefCount.set(s,c-1):(this.dataRefCount.delete(s),null!=n&&(this.numBytesInGPU-=this.computeBytes(o,r),this.textureManager.releaseTexture(n,o,a,i)));var l=this.texData.get(t);l.texture=null,l.texShape=null,l.isPacked=!1,l.slice=null;},o.prototype.getTexture=function(t){return this.uploadToGPU(t),this.texData.get(t).texture},o.prototype.getDataInfo=function(t){return this.texData.get(t)},o.prototype.getCPUBackend=function(){return a().getBool("WEBGL_CPU_FORWARD")?(null==this.cpuBackend&&(this.cpuBackend=Nt.findBackend("cpu")),this.cpuBackend):null},o.prototype.shouldExecuteOnCPU=function(t,e){var n=this;return void 0===e&&(e=128),null!=this.getCPUBackend()&&t.every(function(t){return null==n.texData.get(t.dataId).texture&&t.size<e})},o.prototype.getGPGPUContext=function(){return this.gpgpu},o.prototype.complex=function(t,e){var n=this.makeOutput(t.shape,"complex64");return this.texData.get(n.dataId).complexTensors={real:Nt.keep(t.clone()),imag:Nt.keep(e.clone())},n},o.prototype.real=function(t){return this.texData.get(t.dataId).complexTensors.real.clone()},o.prototype.imag=function(t){return this.texData.get(t.dataId).complexTensors.imag.clone()},o.prototype.slice=function(t,e,n){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.slice(t,e,n);if(0===w(n))return kn([],n,t.dtype);var r=this.texData.get(t.dataId).isPacked,o=Yr(t.shape,e,n);if(r||!o){var i=a().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Ji(n):new Yi(n),u=i.getCustomSetupFunc(e);return this.compileAndRun(i,[t],null,u)}return this.uploadToGPU(t.dataId),this.shallowSlice(t,e,n)},o.prototype.shallowSlice=function(t,e,n){var r=this.texData.get(t.dataId),o=this.makeOutput(n,t.dtype),a=this.texData.get(o.dataId);Object.assign(a,r),a.shape=n,a.dtype=t.dtype;var i=Qr(e,t.strides);r.slice&&(i+=r.slice.flatOffset),a.slice={flatOffset:i,origDataId:r.slice&&r.slice.origDataId||t.dataId};var u=this.dataRefCount.get(a.slice.origDataId)||1;return this.dataRefCount.set(a.slice.origDataId,u+1),o},o.prototype.stridedSlice=function(t,e,n,r){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.stridedSlice(t,e,n,r);var o=jr(e,n,r);if(o.some(function(t){return 0===t}))return kn([],o);var a=new Zi(e,r,o);return this.compileAndRun(a,[t])},o.prototype.reverse=function(t,e){var n=a().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Ki(t.shape,e):new qi(t.shape,e);return this.compileAndRun(n,[t])},o.prototype.concat=function(t,e){if("complex64"===t[0].dtype){var n=t.map(function(t){return Rn(t)}),r=t.map(function(t){return In(t)});return En(this.concat(n,e),this.concat(r,e))}if(this.shouldExecuteOnCPU(t))return this.cpuBackend.concat(t,e);if(1===t.length)return t[0];if(t.length>a().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){var o=Math.floor(t.length/2),i=this.concat(t.slice(0,o),e),u=this.concat(t.slice(o),e);return this.concat([i,u],e)}if(a().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&t[0].rank>1){var s=new Sa(t.map(function(t){return t.shape}),e);return this.compileAndRun(s,t)}var c=wn(t.map(function(t){return t.shape}),e),l=t.map(function(t){return t.as2D(-1,w(t.shape.slice(e)))}),h=new ka(l.map(function(t){return t.shape}));return this.compileAndRun(h,l).reshape(c)},o.prototype.neg=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.neg(t);if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,mu,t.dtype);var e=new su(t.shape,mu);return this.compileAndRun(e,[t])},o.prototype.batchMatMul=function(t,e,n,r){var o=n?t.shape[2]:t.shape[1],a=r?e.shape[1]:e.shape[2],i=n?t.shape[1]:t.shape[2],u=t.shape[0];if((1===o||1===a)&&i>1e3){n&&(t=t.transpose([0,2,1])),r&&(e=e.transpose([0,2,1]));var s=1===a?t:t.as3D(u,i,1),c=1===a?2:1,l=1===a?e.as3D(u,1,i):e;return this.multiply(s,l).sum(c,!0)}var h=Ct(t.dtype,e.dtype),f=new Ti(t.shape,[u,o,a],n,r);return this.compileAndRun(f,[t,e],h)},o.prototype.fusedBatchMatMul=function(t){var e=t.a,n=t.b,r=t.transposeA,o=t.transposeB,a=t.bias,i=t.activation,u=t.preluActivationWeights,s=r?e.shape[2]:e.shape[1],c=o?n.shape[1]:n.shape[2],l=e.shape[0],h=Ct(e.dtype,n.dtype),f=null!=a,p=null!=u,d=i?Pu(i,!0):null,v=new Ti(e.shape,[l,s,c],r,o,f,d,p),m=[e,n];return a&&m.push(a),u&&m.push(u),this.compileAndRun(v,m,h)},o.prototype.multiply=function(t,e){if("complex64"===t.dtype){var n=this.texData.get(t.dataId),r=this.texData.get(e.dataId),o=new va(pa,t.shape,e.shape),i=new va(da,t.shape,e.shape),u=[this.makeComplexComponentTensorInfo(t,n.complexTensors.real),this.makeComplexComponentTensorInfo(t,n.complexTensors.imag),this.makeComplexComponentTensorInfo(e,r.complexTensors.real),this.makeComplexComponentTensorInfo(e,r.complexTensors.imag)],s=this.compileAndRun(o,u),c=this.compileAndRun(i,u),l=this.complex(s,c);return s.dispose(),c.dispose(),l}if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.multiply(t,e);if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,ya,t.dtype);var h=new ba(ya,t.shape,e.shape);return this.compileAndRun(h,[t,e],t.dtype)},o.prototype.batchNormalization=function(t,e,n,r,o,i){var u=[t,e,n],s=null;null!=i&&(s=i.shape,u.push(i));var c=null;if(null!=o&&(c=o.shape,u.push(o)),a().getBool("WEBGL_PACK_NORMALIZATION")){var l=new fa(t.shape,e.shape,n.shape,s,c,r);return this.compileAndRun(l,u)}var h=new ha(t.shape,e.shape,n.shape,s,c,r);return this.compileAndRun(h,u)},o.prototype.localResponseNormalization4D=function(t,e,n,r,o){var i=a().getBool("WEBGL_PACK_NORMALIZATION")?new Si(t.shape,e,n,r,o):new Ii(t.shape,e,n,r,o);return this.compileAndRun(i,[t])},o.prototype.LRNGrad=function(t,e,n,r,o,a,i){var u=new ki(e.shape,r,o,a,i);return this.compileAndRun(u,[e,n,t])},o.prototype.tile=function(t,e){if("string"===t.dtype){var n=this.readSync(t.dataId).map(function(t){return Z(t)});return Lo(ur(t.shape,t.dtype,n),e)}var r=new ru(t.shape,e);return this.compileAndRun(r,[t])},o.prototype.pad=function(t,e,n){var r=a().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Mi(t.shape,e,n):new _i(t.shape,e,n);return this.compileAndRun(r,[t])},o.prototype.transpose=function(t,e){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.transpose(t,e);var n=a().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new au(t.shape,e):new ou(t.shape,e);return this.compileAndRun(n,[t])},o.prototype.gather=function(t,e,n){if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.gather(t,e,n);var r=new ni(t.shape,e.size,n);return this.compileAndRun(r,[t,e])},o.prototype.batchToSpaceND=function(t,e,n){g(t.rank<=4,function(){return "batchToSpaceND for rank > 4 with a WebGL backend not implemented yet"});var r=e.reduce(function(t,e){return t*e}),o=Mr(t.shape,e,r),a=Br(o.length,e.length),i=Pr(t.shape,e,r),u=Lr(n,e.length),s=Wr(i,n,e.length);return t.reshape(o).transpose(a).reshape(i).slice(u,s)},o.prototype.spaceToBatchND=function(t,e,n){g(t.rank<=4,function(){return "spaceToBatchND for rank > 4 with a WebGL backend not implemented yet"});var r=e.reduce(function(t,e){return t*e}),o=[[0,0]];o.push.apply(o,n);for(var a=1+e.length;a<t.shape.length;++a)o.push([0,0]);var i=t.pad(o),u=Mr(i.shape,e,r,!1),s=Br(u.length,e.length,!1),c=Pr(i.shape,e,r,!1);return i.reshape(u).transpose(s).reshape(c)},o.prototype.reduce=function(t,e,n){var r=t.shape[0],o=t.shape[1],a=zr(o),i=new Li({windowSize:a,inSize:o,batchSize:r},e),u=this.compileAndRun(i,[t],n);return 1===u.shape[1]?u:this.reduce(u,e,n)},o.prototype.argReduce=function(t,e,n){void 0===n&&(n=null);var r=t.shape[0],o=t.shape[1];null!=n&&(r=n.shape[0],o=n.shape[1]);var a=zr(o),i=new Go({windowSize:a,inSize:o,batchSize:r},e,null==n),u=[t];null!=n&&u.push(n);var s=this.compileAndRun(i,u,"int32");return 1===s.shape[1]?s:this.argReduce(t,e,s)},o.prototype.argReducePacked=function(t,e,n){void 0===n&&(n=null);var r=null!=n?n.shape:t.shape,o=zr(r[r.length-1]),a=new sa(r,o,e,null==n),i=null==n?[t]:[t,n],u=this.compileAndRun(a,i,"int32");return u.rank===t.rank?this.argReducePacked(t,e,u):u},o.prototype.sum=function(t,e){mn("sum",e,t.rank);var n=dn(t.shape,e),r=n[0],o=w(n[1]),a=t.as2D(-1,o),i=Et(t.dtype);return this.reduce(a,"sum",i).reshape(r)},o.prototype.prod=function(t,e){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.prod(t,e);var n=dn(t.shape,e),r=n[0],o=w(n[1]),a=t.as2D(-1,o),i=Et(t.dtype);return this.reduce(a,"prod",i).reshape(r)},o.prototype.unsortedSegmentSum=function(t,e,n){var r=0,o=gn([r],t.rank),a=t;null!=o&&(a=t.transpose(o),r=xn(1,t.rank)[0]);var i=function(t,e,n){for(var r=[],o=t.length,a=0;a<o;a++)a!==e?r.push(t[a]):r.push(n);return r}(a.shape,r,n),u=w([a.shape[r]]),s=a.as2D(-1,u),c=Et(t.dtype),l=this.segOpCompute(s,"unsortedSegmentSum",e,c,n).reshape(i);return null!=o&&(l=l.transpose(yn(o))),l},o.prototype.segOpCompute=function(t,e,n,r,o){var a=t.shape[0],i=t.shape[1],u=function(t,e){var n,r=!1;for(t<=Vr?(n=t,r=!0):n=H(t,Math.floor(Math.sqrt(t)));!r;)n>e||n===t?r=!0:n=H(t,n+1);return n}(i,o),s=new Xi({windowSize:u,inSize:i,batchSize:a,numSegments:o},e),c=this.compileAndRun(s,[t,n],r);return c.shape[1]===o?c:(n=Un(0,o).tile([i/u]),this.segOpCompute(c,e,n,r,o))},o.prototype.argMinMaxReduce=function(t,e,n){var r=[e];if(mn("arg"+n.charAt(0).toUpperCase()+n.slice(1),r,t.rank),!a().getBool("WEBGL_PACK_REDUCE")||t.rank<=2){var o=dn(t.shape,r),i=o[0],u=w(o[1]),s=t.as2D(-1,u);return this.argReduce(s,n).reshape(i)}return this.argReducePacked(t,n)},o.prototype.argMin=function(t,e){return this.argMinMaxReduce(t,e,"min")},o.prototype.argMax=function(t,e){return this.argMinMaxReduce(t,e,"max")},o.prototype.cumsum=function(t,e,n,r){if(e!==t.rank-1)throw new Error("WebGL cumsum shader expects an inner-most axis="+(t.rank-1)+" but got axis="+e);var o=new Ua(t.shape,n,r);return this.compileAndRun(o,[t])},o.prototype.equal=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return vec4(equal(a, b));\n","bool");var n=new ba("return float(a == b);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.notEqual=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return vec4(notEqual(a, b));\n","bool");var n=new ba("return float(a != b);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.less=function(t,e){if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.less(t,e);if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return vec4(lessThan(a, b));\n","bool");var n=new ba("return float(a < b);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.lessEqual=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return vec4(lessThanEqual(a, b));\n","bool");var n=new ba("return float(a <= b);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.greater=function(t,e){if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.greater(t,e);if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return vec4(greaterThan(a, b));\n","bool");var n=new ba("return float(a > b);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.greaterEqual=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return vec4(greaterThanEqual(a, b));\n","bool");var n=new ba("return float(a >= b);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.logicalNot=function(t){var e=new su(t.shape,"return float(!(x >= 1.0));");return this.compileAndRun(e,[t])},o.prototype.logicalAnd=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return vec4(\n    vec4(greaterThanEqual(a, vec4(1.0))) *\n    vec4(greaterThanEqual(b, vec4(1.0))));\n","bool");var n=new ba("return float(a >= 1.0 && b >= 1.0);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.logicalOr=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  return min(\n    vec4(greaterThanEqual(a, vec4(1.0))) +\n    vec4(greaterThanEqual(b, vec4(1.0))),\n    vec4(1.0));\n","bool");var n=new ba("return float(a >= 1.0 || b >= 1.0);",t.shape,e.shape);return this.compileAndRun(n,[t,e],"bool")},o.prototype.select=function(t,e,n){var r=new $i(t.rank,e.shape,e.rank);return this.compileAndRun(r,[t,e,n],Ct(e.dtype,n.dtype))},o.prototype.where=function(t){un("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");var e=t.dataSync();return Uo(t.shape,e)},o.prototype.topk=function(t,e,n){return Wo(t.dataSync(),t.shape,t.dtype,e)},o.prototype.min=function(t,e){mn("min",e,t.rank);var n=dn(t.shape,e),r=n[0],o=w(n[1]),a=t.as2D(-1,o);return this.reduce(a,"min",a.dtype).reshape(r)},o.prototype.minimum=function(t,e){if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.minimum(t,e);var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca("\n  vec4 result = vec4(min(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",t.shape,e.shape):new ba("\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return min(a, b);\n",t.shape,e.shape);return this.compileAndRun(n,[t,e])},o.prototype.mod=function(t,e){var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca("\n  vec4 result = mod(a, b);\n  vec4 isNaN = vec4(equal(b, vec4(0.0)));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",t.shape,e.shape):new ba("if (b == 0.0) return NAN;\n  return mod(a, b);",t.shape,e.shape);return this.compileAndRun(n,[t,e])},o.prototype.max=function(t,e){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.max(t,e);mn("max",e,t.rank);var n=dn(t.shape,e),r=n[0],o=w(n[1]),a=t.as2D(-1,o);return this.reduce(a,"max",a.dtype).reshape(r)},o.prototype.maximum=function(t,e){if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.maximum(t,e);var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca("\n  vec4 result = vec4(max(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",t.shape,e.shape):new ba("\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return max(a, b);\n",t.shape,e.shape);return this.compileAndRun(n,[t,e])},o.prototype.all=function(t,e){mn("all",e,t.rank);var n=dn(t.shape,e),r=n[0],o=w(n[1]),a=t.as2D(-1,o);return this.reduce(a,"all",a.dtype).reshape(r)},o.prototype.any=function(t,e){mn("any",e,t.rank);var n=dn(t.shape,e),r=n[0],o=w(n[1]),a=t.as2D(-1,o);return this.reduce(a,"any",a.dtype).reshape(r)},o.prototype.squaredDifference=function(t,e){var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca("return (a - b) * (a - b);",t.shape,e.shape):new ba("return (a - b) * (a - b);",t.shape,e.shape);return this.compileAndRun(n,[t,e])},o.prototype.realDivide=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS")){return this.packedBinaryOp(t,e,"\n  // vec4 one = vec4(equal(a, b));\n  // return one + (vec4(1.0) - one) * a / b;\n  vec4 result = a / b;\n  if(a.x == b.x) {\n    result.x = 1.;\n  }\n  if(a.y == b.y) {\n    result.y = 1.;\n  }\n  if(a.z == b.z) {\n    result.z = 1.;\n  }\n  if(a.w == b.w) {\n    result.w = 1.;\n  }\n\n  return result;\n","float32",!0)}var n=new ba("\nif (a == b) {\n  return 1.0;\n};\nreturn a / b;",t.shape,e.shape);return this.compileAndRun(n,[t,e],"float32")},o.prototype.floorDiv=function(t,e){if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,"\n  ivec4 ia = round(a);\n  ivec4 ib = round(b);\n  bvec4 cond = notEqual(ib, ivec4(0));\n  ivec4 result = ivec4(0);\n  vec4 s = sign(a) * sign(b);\n\n  // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n  if (cond[0]) {\n    result[0] = idiv(ia[0], ib[0], s[0]);\n  }\n  if (cond[1]) {\n    result[1] = idiv(ia[1], ib[1], s[1]);\n  }\n  if (cond[2]) {\n    result[2] = idiv(ia[2], ib[2], s[2]);\n  }\n  if (cond[3]) {\n    result[3] = idiv(ia[3], ib[3], s[3]);\n  }\n  return vec4(result);\n","int32");var n=new ba("\n  float s = sign(a) * sign(b);\n  int ia = round(a);\n  int ib = round(b);\n  if (ib != 0) {\n    // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n    return float(idiv(ia, ib, s));\n  } else {\n    return NAN;\n  }\n",t.shape,e.shape);return this.compileAndRun(n,[t,e],"int32")},o.prototype.add=function(t,e){if("complex64"===t.dtype&&"complex64"===e.dtype)return this.complexSeparableBinaryOp(t,e,ma);if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.add(t,e);var n=Ct(t.dtype,e.dtype);if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,ma,n);var r=new ba(ma,t.shape,e.shape);return this.compileAndRun(r,[t,e],n)},o.prototype.packedUnaryOp=function(t,e,n){var r=new _u(t.shape,e);return this.compileAndRun(r,[t],n)},o.prototype.packedBinaryOp=function(t,e,n,r,o){void 0===o&&(o=!1);var a=new Ca(n,t.shape,e.shape,o);return this.compileAndRun(a,[t,e],r)},o.prototype.complexSeparableBinaryOp=function(t,e,n){var r=this,o=this.texData.get(t.dataId),a=this.texData.get(e.dataId),i=[[o.complexTensors.real,a.complexTensors.real],[o.complexTensors.imag,a.complexTensors.imag]].map(function(o){var a=o[0],i=o[1],u=r.makeComplexComponentTensorInfo(t,a),s=r.makeComplexComponentTensorInfo(e,i),c=new ba(n,t.shape,e.shape);return r.compileAndRun(c,[u,s],Ct(a.dtype,i.dtype))}),u=i[0],s=i[1],c=this.complex(u,s);return u.dispose(),s.dispose(),c},o.prototype.makeComplexComponentTensorInfo=function(t,e){return {dataId:e.dataId,dtype:e.dtype,shape:t.shape}},o.prototype.addN=function(t){if(1===t.length)return t[0];if(t.length>a().get("WEBGL_MAX_TEXTURES_IN_SHADER")){var e=Math.floor(t.length/2),n=this.addN(t.slice(0,e)),r=this.addN(t.slice(e));return this.addN([n,r])}var o=t.map(function(t){return t.dtype}).reduce(function(t,e){return Ct(t,e)}),i=t.map(function(t){return t.shape}),u=a().getBool("WEBGL_PACK")?new zo(t[0].shape,i):new Vo(t[0].shape,i);return this.compileAndRun(u,t,o)},o.prototype.subtract=function(t,e){if("complex64"===t.dtype&&"complex64"===e.dtype)return this.complexSeparableBinaryOp(t,e,ga);if(this.shouldExecuteOnCPU([t,e]))return this.cpuBackend.subtract(t,e);var n=Ct(t.dtype,e.dtype);if(a().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,e,ga,t.dtype);var r=new ba(ga,t.shape,e.shape);return this.compileAndRun(r,[t,e],n)},o.prototype.pow=function(t,e){var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca("\n  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.\n  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));\n  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);\n  vec4 result = multiplier * pow(abs(a), b);\n\n  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS\n  bvec4 isExpZero = equal(b, vec4(0.0));\n  result.r = isExpZero.r ? 1.0 : result.r;\n  result.g = isExpZero.g ? 1.0 : result.g;\n  result.b = isExpZero.b ? 1.0 : result.b;\n  result.a = isExpZero.a ? 1.0 : result.a;\n\n  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",t.shape,e.shape):new ba("\nif(a < 0.0 && floor(b) < b){\n  return NAN;\n}\nif (b == 0.0) {\n  return 1.0;\n}\nreturn (round(mod(b, 2.0)) != 1) ?\n    pow(abs(a), b) : sign(a) * pow(abs(a), b);\n",t.shape,e.shape),r=Ct(t.dtype,e.dtype);return this.compileAndRun(n,[t,e],r)},o.prototype.ceil=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.ceil(t);if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,gu,t.dtype);var e=new su(t.shape,gu);return this.compileAndRun(e,[t])},o.prototype.floor=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.floor(t);if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,yu,t.dtype);var e=new su(t.shape,yu);return this.compileAndRun(e,[t])},o.prototype.sign=function(t){var e=new su(t.shape,"\n  if (isnan(x)) { return 0.0; }\n  return sign(x);\n");return this.compileAndRun(e,[t])},o.prototype.isNaN=function(t){var e=new su(t.shape,"return float(isnan(x));");return this.compileAndRun(e,[t],"bool")},o.prototype.isInf=function(t){var e=new su(t.shape,"return float(isinf(x));");return this.compileAndRun(e,[t],"bool")},o.prototype.isFinite=function(t){var e=new su(t.shape,"return float(!isnan(x) && !isinf(x));");return this.compileAndRun(e,[t],"bool")},o.prototype.round=function(t){var e=new su(t.shape,"\n  // OpenGL ES does not support round function.\n  // The algorithm is based on banker's rounding.\n  float base = floor(x);\n  if ((x - base) < 0.5) {\n    return floor(x);\n  } else if ((x - base) > 0.5) {\n    return ceil(x);\n  } else {\n    if (mod(base, 2.0) == 0.0) {\n      return base;\n    } else {\n      return base + 1.0;\n    }\n  }\n");return this.compileAndRun(e,[t])},o.prototype.exp=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.exp(t);if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,xu,t.dtype);var e=new su(t.shape,xu);return this.compileAndRun(e,[t])},o.prototype.expm1=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.expm1(t);if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,bu,t.dtype);var e=new su(t.shape,bu);return this.compileAndRun(e,[t])},o.prototype.log=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.log(t);if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,"\n  vec4 result = log(x);\n  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));\n  result.r = isNaN.r == 1.0 ? NAN : result.r;\n  result.g = isNaN.g == 1.0 ? NAN : result.g;\n  result.b = isNaN.b == 1.0 ? NAN : result.b;\n  result.a = isNaN.a == 1.0 ? NAN : result.a;\n\n  return result;\n",t.dtype);var e=new su(t.shape,"if (x < 0.0) return NAN;\n  return log(x);");return this.compileAndRun(e,[t])},o.prototype.log1p=function(t){var e=new su(t.shape,"return log(1.0 + x);");return this.compileAndRun(e,[t])},o.prototype.sqrt=function(t){var e=new su(t.shape,"return sqrt(x);");return this.compileAndRun(e,[t])},o.prototype.rsqrt=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.rsqrt(t);var e=new su(t.shape,"return inversesqrt(x);");return this.compileAndRun(e,[t])},o.prototype.reciprocal=function(t){var e=new su(t.shape,"return 1.0 / x;");return this.compileAndRun(e,[t])},o.prototype.relu=function(t){var e;return e=a().getBool("WEBGL_PACK")?new _u(t.shape,Nu):new su(t.shape,fu),this.compileAndRun(e,[t])},o.prototype.relu6=function(t){var e;return e=a().getBool("WEBGL_PACK")?new _u(t.shape,Fu):new su(t.shape,pu),this.compileAndRun(e,[t])},o.prototype.prelu=function(t,e){var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca(wa,t.shape,e.shape):new ba(xa,t.shape,e.shape);return this.compileAndRun(n,[t,e])},o.prototype.elu=function(t){if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,Ou,t.dtype);var e=new su(t.shape,du);return this.compileAndRun(e,[t])},o.prototype.eluDer=function(t,e){var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca("\n  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));\n  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));\n",t.shape,e.shape):new ba("return (b >= 1.0) ? a : a * (b + 1.0);",t.shape,e.shape);return this.compileAndRun(n,[t,e])},o.prototype.selu=function(t){var e=new su(t.shape,vu);return this.compileAndRun(e,[t])},o.prototype.int=function(t){var e=new su(t.shape,"return float(int(x));");return this.compileAndRun(e,[t],"int32")},o.prototype.clip=function(t,e,n){var r,o=(r=a().getBool("WEBGL_PACK_CLIP")?new Ra(t.shape):new Ea(t.shape)).getCustomSetupFunc(e,n);return this.compileAndRun(r,[t],null,o)},o.prototype.abs=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.abs(t);if(a().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,hu,t.dtype);var e=new su(t.shape,hu);return this.compileAndRun(e,[t])},o.prototype.complexAbs=function(t){var e=this.texData.get(t.dataId),n=new Ia(t.shape),r=[this.makeComplexComponentTensorInfo(t,e.complexTensors.real),this.makeComplexComponentTensorInfo(t,e.complexTensors.imag)];return this.compileAndRun(n,r)},o.prototype.sigmoid=function(t){var e=new su(t.shape,"return 1.0 / (1.0 + exp(-1.0 * x));");return this.compileAndRun(e,[t])},o.prototype.softplus=function(t){var e=new su(t.shape,"\n  float epsilon = 1.1920928955078125e-7;\n  float threshold = log(epsilon) + 2.0;\n\n  bool too_large = x > -threshold;\n  bool too_small = x < threshold;\n\n  float result;\n  float exp_x = exp(x);\n\n  if (too_large){\n    result = x;\n  }\n  else if (too_small){\n    result = exp_x;\n  }\n  else{\n    result = log(exp_x + 1.0);\n  }\n  return result;\n");return this.compileAndRun(e,[t])},o.prototype.sin=function(t){var e=new su(t.shape,wu);return this.compileAndRun(e,[t])},o.prototype.cos=function(t){var e=new su(t.shape,Cu);return this.compileAndRun(e,[t])},o.prototype.tan=function(t){var e=new su(t.shape,"return tan(x);");return this.compileAndRun(e,[t])},o.prototype.asin=function(t){var e=new su(t.shape,Eu);return this.compileAndRun(e,[t])},o.prototype.acos=function(t){var e=new su(t.shape,Ru);return this.compileAndRun(e,[t])},o.prototype.atan=function(t){var e=new su(t.shape,Iu);return this.compileAndRun(e,[t])},o.prototype.atan2=function(t,e){var n=a().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ca("\n  vec4 result = atan(a, b);\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  \n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n\n  return result;\n",t.shape,e.shape):new ba("\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n\n  return atan(a, b);\n",t.shape,e.shape);return this.compileAndRun(n,[t,e])},o.prototype.sinh=function(t){var e=new su(t.shape,"\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n");return this.compileAndRun(e,[t])},o.prototype.cosh=function(t){var e=new su(t.shape,"\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n");return this.compileAndRun(e,[t])},o.prototype.tanh=function(t){var e=new su(t.shape,"\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n");return this.compileAndRun(e,[t])},o.prototype.asinh=function(t){var e=new su(t.shape,ku);return this.compileAndRun(e,[t])},o.prototype.acosh=function(t){var e=new su(t.shape,Su);return this.compileAndRun(e,[t])},o.prototype.atanh=function(t){var e=new su(t.shape,Au);return this.compileAndRun(e,[t])},o.prototype.erf=function(t){var e=new su(t.shape,'\n  // Error function is calculated approximately with elementary function.\n  // See "Handbook of Mathematical Functions with Formulas,\n  // Graphs, and Mathematical Tables", Abramowitz and Stegun.\n  float p = 0.3275911;\n  float a1 = 0.254829592;\n  float a2 = -0.284496736;\n  float a3 = 1.421413741;\n  float a4 = -1.453152027;\n  float a5 = 1.061405429;\n\n  float sign = sign(x);\n  x = abs(x);\n  float t = 1.0 / (1.0 + p * x);\n  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));\n');return this.compileAndRun(e,[t])},o.prototype.step=function(t,e){var n=new su(t.shape,function(t){return void 0===t&&(t=0),cu+"\n    return x > 0.0 ? 1.0 : float("+t+");\n  "}(e));return this.compileAndRun(n,[t])},o.prototype.conv2dByMatMul=function(t,e,n,r,o,i){var u=t.shape,s=this.texData.get(t.dataId),c=n.inChannels,l=u[0]*u[1]*u[2],h=n.outChannels,f="channelsLast"===n.dataFormat,p=(1===l||1===h)&&c>1e3,d=u[2]%2!=0&&!!s.isPacked;if(p||!a().getBool("WEBGL_LAZILY_UNPACK")||!a().getBool("WEBGL_PACK_BINARY_OPERATIONS")||!d){var v=f?u[0]*u[1]*u[2]:u[0]*u[2]*u[3],m=this.reshape(t,[1,v,n.inChannels]),y=this.reshape(e,[1,n.inChannels,n.outChannels]);return this.reshape(this.fusedBatchMatMul({a:m,b:y,transposeA:!1,transposeB:!1,bias:r,activation:o,preluActivationWeights:i}),n.outShape)}var x=f?u[0]*u[1]*(u[2]+1):u[0]*u[2]*(u[3]+1),b={dataId:t.dataId,shape:[1,x,n.inChannels],dtype:t.dtype},w=s.shape;s.shape=s.shape.slice(),s.shape[s.shape.length-2]++,g(Se(s.shape,b.shape),function(){return "packed reshape "+s.shape+" to "+b.shape+" isn't free"});var C=this.reshape(e,[1,n.inChannels,n.outChannels]),E=this.fusedBatchMatMul({a:b,b:C,transposeA:!1,transposeB:!1,bias:r,activation:o,preluActivationWeights:i}),R=this.texData.get(E.dataId);return g(R.isPacked,function(){return "batchMatMul result is expected to be packed"}),s.shape=w,R.shape=n.outShape,Nt.makeTensorFromDataId(E.dataId,n.outShape,E.dtype)},o.prototype.conv2dWithIm2Row=function(t,e,n,r,o,a){var i=n.filterWidth,u=n.filterHeight,s=n.inChannels,c=n.outWidth,l=n.outHeight,h="channelsLast"===n.dataFormat,f=i*u*s,p=l*c,d=[f,p],v=t.squeeze([0]),m=e.reshape([1,f,-1]),g=new Ri(d,v.shape,n),y=this.compileAndRun(g,[v]).reshape([1,d[0],d[1]]),x=null!=r,b=null!=a,w=o?Pu(o,!0):null,C=new Ti(y.shape,[1,p,n.outChannels],!0,!1,x,w,b),E=[y,m];r&&E.push(r),b&&E.push(a);var R=this.compileAndRun(C,E);return h?R.reshape([1,l,c,n.outChannels]):R.reshape([1,n.outChannels,l,c])},o.prototype.fusedConv2d=function(t){var e=t.input,n=t.filter,r=t.convInfo,o=t.bias,i=t.activation,u=t.preluActivationWeights;if(1===r.filterHeight&&1===r.filterWidth&&1===r.dilationHeight&&1===r.dilationWidth&&1===r.strideHeight&&1===r.strideWidth&&("SAME"===r.padInfo.type||"VALID"===r.padInfo.type))return this.conv2dByMatMul(e,n,r,o,i,u);if(a().getBool("WEBGL_CONV_IM2COL")&&1===e.shape[0])return this.conv2dWithIm2Row(e,n,r,o,i,u);var s=null!=o,c=null!=u,l=i?Pu(i,!1):null,h=new Ma(r,s,l,c),f=[e,n];return o&&f.push(o),u&&f.push(u),this.compileAndRun(h,f)},o.prototype.conv2d=function(t,e,n){if(1===n.filterHeight&&1===n.filterWidth&&1===n.dilationHeight&&1===n.dilationWidth&&1===n.strideHeight&&1===n.strideWidth&&("SAME"===n.padInfo.type||"VALID"===n.padInfo.type))return this.conv2dByMatMul(t,e,n);if(a().getBool("WEBGL_CONV_IM2COL")&&1===t.shape[0])return this.conv2dWithIm2Row(t,e,n);var r=new Ma(n);return this.compileAndRun(r,[t,e])},o.prototype.conv2dDerInput=function(t,e,n){var r=new Ta(n);return this.compileAndRun(r,[t,e])},o.prototype.conv2dDerFilter=function(t,e,n){var r=new Da(n);return this.compileAndRun(r,[t,e])},o.prototype.fusedDepthwiseConv2D=function(t){var e,n=t.input,r=t.filter,o=t.convInfo,i=t.bias,u=t.activation,s=t.preluActivationWeights,c=a().getBool("WEBGL_PACK_DEPTHWISECONV")&&o.strideWidth<=2&&o.outChannels/o.inChannels==1,l=u?Pu(u,c):null,h=[n,r],f=null!=i,p=null!=s;return f&&h.push(i),p&&h.push(s),c?(e=new La(o,f,l,p),this.compileAndRun(e,h)):(e=new Pa(o,f,l,p),this.compileAndRun(e,h))},o.prototype.depthwiseConv2D=function(t,e,n){var r;return a().getBool("WEBGL_PACK_DEPTHWISECONV")&&n.strideWidth<=2&&n.outChannels/n.inChannels==1?(r=new La(n),this.compileAndRun(r,[t,e])):(r=new Pa(n),this.compileAndRun(r,[t,e]))},o.prototype.depthwiseConv2DDerInput=function(t,e,n){var r=new _a(n);return this.compileAndRun(r,[t,e])},o.prototype.depthwiseConv2DDerFilter=function(t,e,n){var r=new Oa(n);return this.compileAndRun(r,[t,e])},o.prototype.conv3d=function(t,e,n){var r=new Ba(n);return this.compileAndRun(r,[t,e])},o.prototype.conv3dDerInput=function(t,e,n){var r=new Fa(n);return this.compileAndRun(r,[t,e])},o.prototype.conv3dDerFilter=function(t,e,n){var r=new Na(n);return this.compileAndRun(r,[t,e])},o.prototype.maxPool=function(t,e){var n=new Bi(e,"max",!1);return this.compileAndRun(n,[t])},o.prototype.avgPool=function(t,e){var n=new Bi(e,"avg",!1);return this.compileAndRun(n,[t],"float32")},o.prototype.maxPoolBackprop=function(t,e,n,r){var o=new Bi(r,"max",!0),a=this.compileAndRun(o,[e]),i=new Ai(r),u=this.compileAndRun(i,[t,a],e.dtype);return a.dispose(),u},o.prototype.avgPoolBackprop=function(t,e,n){var r=new ca(n);return this.compileAndRun(r,[t],e.dtype)},o.prototype.cast=function(t,e){return So(t,e,this)},o.prototype.unstack=function(t,e){for(var n=t.shape[e],r=new Array(t.rank-1),o=0,a=0;a<t.rank;a++)a!==e&&(r[o++]=t.shape[a]);var i=new Array(t.rank).fill(0),u=t.shape.slice();u[e]=1;var s=new Array(n);for(a=0;a<s.length;a++)i[e]=a,s[a]=this.slice(t,i,u).reshape(r);return s},o.prototype.avgPool3d=function(t,e){var n=new Pi(e,"avg",!1);return this.compileAndRun(n,[t],"float32")},o.prototype.avgPool3dBackprop=function(t,e,n){var r=new la(n);return this.compileAndRun(r,[t],e.dtype)},o.prototype.maxPool3d=function(t,e){var n=new Pi(e,"max",!1);return this.compileAndRun(n,[t],"float32")},o.prototype.maxPool3dBackprop=function(t,e,n,r){var o=new Pi(r,"max",!0),a=this.compileAndRun(o,[e]),i=new Di(r),u=this.compileAndRun(i,[t,a],e.dtype);return a.dispose(),u},o.prototype.reshape=function(t,e){var n=this.texData.get(t.dataId);if(n.isPacked&&!Se(t.shape,e)&&(null===n.texture||!Se(n.shape,e))){var r=this.packedReshape(t,e);return Nt.makeTensorFromDataId(r.dataId,r.shape,r.dtype)}return Ao(t,e)},o.prototype.resizeBilinear=function(t,e,n,r){var o=a().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new zi(t.shape,e,n,r):new Vi(t.shape,e,n,r);return this.compileAndRun(o,[t])},o.prototype.resizeBilinearBackprop=function(t,e,n){var r=new Ui(t,e,n);return this.compileAndRun(r,[t])},o.prototype.resizeNearestNeighbor=function(t,e,n,r){var o=new Hi(t.shape,e,n,r);return this.compileAndRun(o,[t])},o.prototype.resizeNearestNeighborBackprop=function(t,e,n){var r=new Gi(t,e,n);return this.compileAndRun(r,[t])},o.prototype.multinomial=function(t,e,n,r){var o=e?t:io(t),a=o.shape[0],i=o.shape[1],u=new Ni(a,i,n),s=u.getCustomSetupFunc(r);return this.compileAndRun(u,[o],"int32",s)},o.prototype.oneHot=function(t,e,n,r){var o=new Fi(t.size,e,n,r);return this.compileAndRun(o,[t])},o.prototype.diag=function(t){var e=new qa(t.size);return this.compileAndRun(e,[t])},o.prototype.nonMaxSuppression=function(t,e,n,r,o){return un("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead"),Mo(t.dataSync(),e.dataSync(),n,r,o)},o.prototype.cropAndResize=function(t,e,n,r,o,a){var i=new Wa(t.shape,e.shape,r,o,a);return this.compileAndRun(i,[t,e,n])},o.prototype.depthToSpace=function(t,e,n){g(e>1,function(){return "blockSize should be > 1 for depthToSpace, but was: "+e});var r=t.shape[0],o="NHWC"===n?t.shape[1]:t.shape[2],a="NHWC"===n?t.shape[2]:t.shape[3],i="NHWC"===n?t.shape[3]:t.shape[1],u=o*e,s=a*e,c=i/(e*e),l=new Ha("NHWC"===n?[r,u,s,c]:[r,c,u,s],e,n);return this.compileAndRun(l,[t])},o.prototype.split=function(t,e,n){return Po(t,e,n)},o.prototype.scatterND=function(t,e,n){var r=Hr(0,t,n),o=r.sliceRank,a=r.numUpdates,i=r.sliceSize,u=r.strides,s=r.outputSize,c=[s/i,i],l=t.reshape([a,o]),h=e.reshape([a,i]);if(0===s)return Ao(kn([]),n);var f=An(0),p=new ji(a,o,l.rank,h.rank,u,c);return this.compileAndRun(p,[h,l,f]).reshape(n)},o.prototype.sparseToDense=function(t,e,n,r){var o=Hr(0,t,n),a=o.sliceRank,i=o.numUpdates,u=o.strides,s=o.outputSize,c=new ji(i,a,t.rank,e.rank,u,[s,1],!1);return this.compileAndRun(c,[e,t,r]).reshape(n)},o.prototype.fft=function(t){return this.fftImpl(t,!1)},o.prototype.ifft=function(t){return this.fftImpl(t,!0)},o.prototype.fftImpl=function(t,e){var n=this.texData.get(t.dataId),r=new Ja(Ya,t.shape,e),o=new Ja(Qa,t.shape,e),a=[this.makeComplexComponentTensorInfo(t,n.complexTensors.real),this.makeComplexComponentTensorInfo(t,n.complexTensors.imag)],i=this.compileAndRun(r,a),u=this.compileAndRun(o,a),s=this.complex(i,u).as2D(t.shape[0],t.shape[1]);return i.dispose(),u.dispose(),s},o.prototype.gatherND=function(t,e){var n=e.shape,r=n[n.length-1],o=Ur(t,e),a=o[0],i=o[1],u=o[2],s=o[3],c=e.reshape([i,r]),l=t.reshape([t.size/u,u]),h=new ri(r,s,[i,u]);return this.compileAndRun(h,[l,c]).reshape(a)},o.prototype.fill=function(t,e,n){if("string"===(n=n||z(e))){var r=F(n,w(t));return r.fill(e),Nt.makeTensor(r,t,n,this)}var o=new Za(t,e),a=o.getCustomSetupFunc(e);return this.compileAndRun(o,[],n,a)},o.prototype.onesLike=function(t){if("string"===t.dtype)throw new Error("onesLike is not supported under string dtype");return this.fill(t.shape,1,t.dtype)},o.prototype.zerosLike=function(t){return this.fill(t.shape,"string"===t.dtype?"":0,t.dtype)},o.prototype.linspace=function(t,e,n){return Do(t,e,n)},o.prototype.makeTensorInfo=function(t,e){var n=this.write(null,t,e);return this.texData.get(n).usage=null,{dataId:n,shape:t,dtype:e}},o.prototype.makeOutput=function(t,e){var n=this.makeTensorInfo(t,e).dataId;return Nt.makeTensorFromDataId(n,t,e,this)},o.prototype.unpackTensor=function(t){var e=new Mu(t.shape);return this.runWebGLProgram(e,[t],t.dtype)},o.prototype.packTensor=function(t){var e=new Oi(t.shape);return this.runWebGLProgram(e,[t],t.dtype,null,!0)},o.prototype.packedReshape=function(t,e){var n=[Ce(t.shape)].concat(Ee(t.shape)),r={dtype:t.dtype,shape:n,dataId:t.dataId},o=[Ce(e)].concat(Ee(e)),a=new Wi(o,n),i=this.runWebGLProgram(a,[r],t.dtype,null,!0);return {dataId:i.dataId,shape:e,dtype:i.dtype}},o.prototype.decode=function(t){var e,n=this.texData.get(t),r=n.isPacked,o=n.shape,a=n.dtype,i=Re(o);e=r?new Ga(i):new za(i);return {dtype:a,shape:o,dataId:this.runWebGLProgram(e,[{shape:i,dtype:a,dataId:t}],a,null,!0).dataId}},o.prototype.runWebGLProgram=function(t,e,n,r,o){var i=this;void 0===o&&(o=!1);var u=this.makeTensorInfo(t.outputShape,n),s=this.texData.get(u.dataId);if(t.packedOutput&&(s.isPacked=!0),t.outPackingScheme===_t.DENSE){var c=Gt(t.outputShape);s.texShape=c.map(function(t){return 2*t});}if(null!=t.outTexUsage&&(s.usage=t.outTexUsage),0===w(u.shape))return s.values=N(u.dtype,0),u;var l=[],h=e.map(function(e){if("complex64"===e.dtype)throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");var n=i.texData.get(e.dataId);if(null==n.texture){if(!t.packedInputs&&w(e.shape)<=a().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return {shape:e.shape,texData:null,isUniform:!0,uniformValues:n.values};t.packedInputs&&(n.isPacked=!0,n.shape=e.shape);}else if(!!n.isPacked!=!!t.packedInputs)e=n.isPacked?i.unpackTensor(e):i.packTensor(e),l.push(e),n=i.texData.get(e.dataId);else if(n.isPacked&&!Se(n.shape,e.shape)){var r=e,o=e.shape;e.shape=n.shape,e=i.packedReshape(e,o),l.push(e),n=i.texData.get(e.dataId),r.shape=o;}return i.uploadToGPU(e.dataId),{shape:e.shape,texData:n,isUniform:!1}});this.uploadToGPU(u.dataId);var f,p={shape:u.shape,texData:s,isUniform:!1},d=function(t,e,n){var r="";e.concat(n).forEach(function(t){var e=null!=t.texData&&null!=t.texData.slice&&t.texData.slice.flatOffset>0,n=t.isUniform?"uniform":t.texData.texShape;r+=t.shape+"_"+n+"_"+e;});var o=t.userCode,a=t.constructor.name;return a+="_"+r+"_"+o}(t,h,p),v=this.getAndSaveBinary(d,function(){return function(t,e,n,r){var o=e.userCode,i=n.map(function(t,n){var r={logicalShape:t.shape,texShape:t.isUniform?null:t.texData.texShape,isUniform:t.isUniform,isPacked:!t.isUniform&&t.texData.isPacked,flatOffset:null};return null!=t.texData&&null!=t.texData.slice&&t.texData.slice.flatOffset>0&&(r.flatOffset=t.texData.slice.flatOffset),{name:e.variableNames[n],shapeInfo:r}}),u=i.map(function(t){return t.shapeInfo}),s={logicalShape:r.shape,texShape:r.texData.texShape,isUniform:!1,isPacked:r.texData.isPacked,flatOffset:null},c=Yo(i,s,o,e.packedInputs),l=t.createProgram(c),h=null,f=t.getUniformLocation(l,"NAN",!1);1===a().getNumber("WEBGL_VERSION")&&(h=t.getUniformLocation(l,"INFINITY",!1));for(var p={},d=0;d<e.variableNames.length;d++){var v=e.variableNames[d];p[v]=t.getUniformLocation(l,v,!1),p["offset"+v]=t.getUniformLocation(l,"offset"+v,!1);}return {program:e,source:c,webGLProgram:l,uniformLocations:p,inShapeInfos:u,outShapeInfo:s,infLoc:h,nanLoc:f}}(i.gpgpu,t,h,p)}),m=null!=this.activeTimers;if(m&&(f=this.startTimer()),function(t,e,n,r,o){Ei(e.inShapeInfos,n),Ei([e.outShapeInfo],[r]);var i=r.texData.texture,u=r.texData.texShape;r.texData.isPacked?t.setOutputPackedMatrixTexture(i,u[0],u[1]):t.setOutputMatrixTexture(i,u[0],u[1]),t.setProgram(e.webGLProgram),1===a().getNumber("WEBGL_VERSION")&&null!==e.infLoc&&t.gl.uniform1f(e.infLoc,1/0),null!==e.nanLoc&&t.gl.uniform1f(e.nanLoc,NaN),n.forEach(function(n,r){var o=e.program.variableNames[r],a=e.uniformLocations[o],i=e.uniformLocations["offset"+o];if(null!=a)if(n.isUniform)if(w(n.shape)<2)t.gl.uniform1f(a,n.uniformValues[0]);else{var u=n.uniformValues;u instanceof Float32Array||(u=new Float32Array(u)),t.gl.uniform1fv(a,u);}else null!=n.texData.slice&&null!=i&&t.gl.uniform1i(i,n.texData.slice.flatOffset),t.setInputMatrixTexture(n.texData.texture,a,r);}),null!=o&&o(t,e.webGLProgram),t.executeProgram();}(this.gpgpu,v,h,p,r),l.forEach(function(t){return i.disposeData(t.dataId)}),m&&(f=this.endTimer(f),this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime(f)})),!a().getBool("WEBGL_LAZILY_UNPACK")&&s.isPacked&&!1===o){var g=this.unpackTensor(u);return this.disposeData(u.dataId),g}return u},o.prototype.compileAndRun=function(t,e,n,r,o){void 0===o&&(o=!1),n=n||e[0].dtype;var a=this.runWebGLProgram(t,e,n,r,o);return Nt.makeTensorFromDataId(a.dataId,a.shape,a.dtype)},o.prototype.getAndSaveBinary=function(t,e){return t in this.binaryCache||(this.binaryCache[t]=e()),this.binaryCache[t]},o.prototype.getTextureManager=function(){return this.textureManager},o.prototype.dispose=function(){this.disposed||(this.textureManager.dispose(),null!=this.canvas&&"undefined"!=typeof HTMLCanvasElement&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,null!=this.fromPixels2DContext&&this.fromPixels2DContext.canvas.remove&&this.fromPixels2DContext.canvas.remove(),this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0);},o.prototype.floatPrecision=function(){var t=this;return null==this.floatPrecisionValue&&(this.floatPrecisionValue=je(function(){if(!a().get("WEBGL_RENDER_FLOAT32_ENABLED")){var e=a().getBool("DEBUG");a().set("DEBUG",!1);var n=t.abs(An(1e-8)).dataSync()[0];if(a().set("DEBUG",e),n>0)return 32}return 16})),this.floatPrecisionValue},o.prototype.epsilon=function(){return 32===this.floatPrecision()?1e-7:1e-4},o.prototype.uploadToGPU=function(t){var e,n=this.texData.get(t),r=n.shape,o=n.dtype,a=n.values,i=n.texture,u=n.usage,s=n.isPacked;if(null==i){var c,l=null!=this.activeTimers;l&&(c=Y());var h=n.texShape;if(null==h&&(h=Ie(r,s),n.texShape=h),null!=a){var f=Re(r),p=void 0,d=h[1],v=h[0],m=a instanceof Uint8Array;s?(d=(e=Ht(h[0],h[1]))[0],v=e[1],p=new $a(f,[v,d],m)):p=new Xa(f,[v,d],m);var g=this.makeTensorInfo([v,d],o);this.texData.get(g.dataId).usage=m?Mt.PIXELS:Mt.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(g.dataId),d,v,a);var y=this.runWebGLProgram(p,[g],o,null,!0),x=this.texData.get(y.dataId);n.texture=x.texture,n.texShape=x.texShape,n.isPacked=x.isPacked,n.usage=x.usage,this.disposeData(g.dataId),this.texData.delete(y.dataId),n.values=null,l&&(this.uploadWaitMs+=Y()-c);}else{var b=this.acquireTexture(h,u,o,s);n.texture=b;}}},o.prototype.convertAndCacheOnCPU=function(t,e){var n=this.texData.get(t),r=n.dtype;return this.releaseGPUData(t),null!=e&&(n.values=function(t,e){if("float32"===e||"complex64"===e)return t;if("int32"===e||"bool"===e){for(var n="int32"===e?new Int32Array(t.length):new Uint8Array(t.length),r=0;r<n.length;++r)n[r]=Math.round(t[r]);return n}throw new Error("Unknown dtype "+e)}(e,r)),n.values},o.prototype.acquireTexture=function(t,e,n,r){if(this.numBytesInGPU+=this.computeBytes(t,n),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){var o=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn("High memory usage in GPU: "+o+" MB, most likely due to a memory leak");}return this.textureManager.acquireTexture(t,e,r)},o.prototype.computeBytes=function(t,e){return t[0]*t[1]*P(e)},o}(co);Ft()&&Nt.registerBackend("webgl",function(){return new Wu},2);var Uu=Cn({square_:function(t){var e=ln(t,"x","square"),n=[e];return Nt.runKernelFunc(function(t,n){return n([e]),t.square(e)},{x:e},function(t,e){var n=e[0];return {x:function(){return t.mul(n.toFloat().mul(2))}}},"Square",{},n,[])}});var Vu=Cn({abs_:function(t){var e=ln(t,"x","abs");return "complex64"===e.dtype?Nt.runKernelFunc(function(t){return t.complexAbs(e)},{$x:e}):Nt.runKernelFunc(function(t,n){var r=t.abs(e);return n([e]),r},{x:e},function(t,e){var n=e[0];return {x:function(){return t.mul(n.toFloat().step(-1))}}},"Abs")}}),zu=Cn({acos_:function(t){var e=ln(t,"x","acos");return Nt.runKernelFunc(function(t,n){var r=t.acos(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.divStrict(An(1).sub(n.toFloat().square()).sqrt()).neg()}}})}}),Gu=Cn({acosh_:function(t){var e=ln(t,"x","acosh");return Nt.runKernelFunc(function(t,n){var r=t.acosh(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.divStrict(n.toFloat().square().sub(1).sqrt())}}})}}),Hu=Cn({asin_:function(t){var e=ln(t,"x","asin");return Nt.runKernelFunc(function(t,n){var r=t.asin(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.divStrict(An(1).sub(n.toFloat().square()).sqrt())}}})}}),qu=Cn({asinh_:function(t){var e=ln(t,"x","asinh");return Nt.runKernelFunc(function(t,n){var r=t.asinh(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.divStrict(An(1).add(n.toFloat().square()).sqrt())}}})}}),Ku=Cn({atan_:function(t){var e=ln(t,"x","atan");return Nt.runKernelFunc(function(t,n){var r=t.atan(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(n.toFloat().square().add(1))}}})}}),ju=Cn({atanh_:function(t){var e=ln(t,"x","atanh");return Nt.runKernelFunc(function(t,n){var r=t.atanh(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(An(1).sub(n.toFloat().square()))}}})}}),Xu=Cn({ceil_:function(t){var e=ln(t,"x","ceil");return Nt.runKernelFunc(function(t){return t.ceil(e)},{$x:e},function(t){return {$x:function(){return zn(t)}}})}}),$u=Cn({clipByValue_:function(t,e,n){var r=ln(t,"x","clipByValue");return g(e<=n,function(){return "Error in clip: min ("+e+") must be less than or equal to max ("+n+")."}),Nt.runKernelFunc(function(t,o){var a=t.clip(r,e,n);return o([r]),a},{$x:r},function(t,r){var o=r[0];return {$x:function(){return t.where(o.greaterEqual(e).logicalAnd(o.lessEqual(n)),zn(t))}}})}}),Yu=Cn({cos_:function(t){var e=ln(t,"x","cos");return Nt.runKernelFunc(function(t,n){var r=t.cos(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return n.toFloat().sin().neg().mul(t)}}})}}),Qu=Cn({cosh_:function(t){var e=ln(t,"x","cosh");return Nt.runKernelFunc(function(t,n){var r=t.cosh(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return n.toFloat().sinh().mulStrict(t)}}})}}),Ju=Cn({erf_:function(t){var e=ln(t,"x","erf");return g("int32"===e.dtype||"float32"===e.dtype,function(){return "Input dtype must be `int32` or `float32`."}),"int32"===e.dtype&&(e=e.toFloat()),Nt.runKernelFunc(function(t,n){var r=t.erf(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.mul(n.square().neg().exp().mul(2/Math.sqrt(Math.PI)))}}})}}),Zu=Cn({exp_:function(t){var e=ln(t,"x","exp");return Nt.runKernelFunc(function(t,n){var r=t.exp(e);return n([r]),r},{$x:e},function(t,e){return {$x:function(){return t.mulStrict(e[0])}}})}}),ts=Cn({expm1_:function(t){var e=ln(t,"x","expm1");return Nt.runKernelFunc(function(t,n){var r=t.expm1(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.mul(n.exp())}}})}}),es=Cn({floor_:function(t){var e=ln(t,"x","floor");return Nt.runKernelFunc(function(t){return t.floor(e)},{$x:e},function(t){return {$x:function(){return zn(t)}}})}}),ns=Cn({log_:function(t){var e=ln(t,"x","log");return Nt.runKernelFunc(function(t,n){var r=t.log(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(n.toFloat())}}})}}),rs=Cn({log1p_:function(t){var e=ln(t,"x","log1p");return Nt.runKernelFunc(function(t,n){var r=t.log1p(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(n.add(1))}}})}}),os=Cn({logSigmoid_:function(t){var e=ln(t,"x","logSigmoid");return Nt.runKernelFunc(function(t,n){var r=t.softplus(e.neg()).neg();return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.mul(n.neg().sigmoid())}}})}}),as=Cn({neg_:function(t){var e=ln(t,"x","neg");return Nt.runKernelFunc(function(t){return t.neg(e)},{$x:e},function(t){return {$x:function(){return t.neg()}}})}}),is$2=Cn({reciprocal_:function(t){var e=ln(t,"x","reciprocal");return Nt.runKernelFunc(function(t,n){var r=t.reciprocal(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(n.square().neg())}}})}}),us=Cn({round_:function(t){var e=ln(t,"x","round");return Nt.runKernelFunc(function(t){return t.round(e)},{$x:e},function(t){return {$x:function(){return zn(t)}}})}}),ss=Cn({rsqrt_:function(t){var e=ln(t,"x","rsqrt");return Nt.runKernelFunc(function(t,n){var r=t.rsqrt(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(n.pow(1.5).mul(2)).neg()}}})}}),cs=Cn({sigmoid_:function(t){var e=ln(t,"x","sigmoid");return Nt.runKernelFunc(function(t,n){var r=t.sigmoid(e);return n([r]),r},{x:e},function(t,e){var n=e[0];return {x:function(){return t.mul(n.mul(An(1).sub(n)))}}},"Sigmoid")}}),ls=Cn({sign_:function(t){var e=ln(t,"x","sign");return Nt.runKernelFunc(function(t){return t.sign(e)},{$x:e},function(t){return {$x:function(){return zn(t)}}})}}),hs=Cn({isNaN_:function(t){var e=ln(t,"x","isNaN");return Nt.runKernelFunc(function(t){return t.isNaN(e)},{$x:e},function(t){return {$x:function(){return zn(t)}}})}}),fs=Cn({isInf_:function(t){var e=ln(t,"x","isInf");return Nt.runKernelFunc(function(t){return t.isInf(e)},{$x:e},function(t){return {$x:function(){return zn(t)}}})}}),ps=Cn({isFinite_:function(t){var e=ln(t,"x","isFinite");return Nt.runKernelFunc(function(t){return t.isFinite(e)},{$x:e},function(t){return {$x:function(){return zn(t)}}})}}),ds=Cn({sin_:function(t){var e=ln(t,"x","sin");return Nt.runKernelFunc(function(t,n){var r=t.sin(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return n.toFloat().cos().mul(t)}}})}}),vs=Cn({sinh_:function(t){var e=ln(t,"x","sinh");return Nt.runKernelFunc(function(t,n){var r=t.sinh(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return n.toFloat().cosh().mulStrict(t)}}})}}),ms=Cn({softplus_:function(t){var e=ln(t,"x","softplus");return Nt.runKernelFunc(function(t,n){var r=t.softplus(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.mul(n.sigmoid())}}})}}),gs=Cn({sqrt_:function(t){var e=ln(t,"x","sqrt");return Nt.runKernelFunc(function(t,n){var r=t.sqrt(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(n.toFloat().sqrt().mul(2))}}})}}),ys=Cn({step_:function(t,e){void 0===e&&(e=0);var n=ln(t,"x","step");return Nt.runKernelFunc(function(t){return t.step(n,e)},{$x:n},function(t){return {$x:function(){return zn(t)}}})}}),xs=Cn({tan_:function(t){var e=ln(t,"x","tan");return Nt.runKernelFunc(function(t,n){var r=t.tan(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.div(n.cos().square())}}})}}),bs=Cn({tanh_:function(t){var e=ln(t,"x","tanh");return Nt.runKernelFunc(function(t,n){var r=t.tanh(e);return n([r]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return An(1).sub(n.square()).mulStrict(t)}}})}});function ws(t,e,n,r,o,a){var i,u,s=ln(t,"x","batchNorm"),c=ln(e,"mean","batchNorm"),l=ln(n,"variance","batchNorm");return null!=o&&(i=ln(o,"scale","batchNorm")),null!=r&&(u=ln(r,"offset","batchNorm")),g(2===s.rank,function(){return "Error in batchNorm3D: x must be rank 3 but got rank "+s.rank+"."}),g(2===c.rank||1===c.rank,function(){return "Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank "+c.rank+"."}),g(2===l.rank||1===l.rank,function(){return "Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank "+l.rank+"."}),null!=i&&g(2===i.rank||1===i.rank,function(){return "Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank "+i.rank+"."}),null!=u&&g(2===u.rank||1===u.rank,function(){return "Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank "+u.rank+"."}),Rs(s,c,l,u,i,a)}function Cs(t,e,n,r,o,a){var i,u,s=ln(t,"x","batchNorm"),c=ln(e,"mean","batchNorm"),l=ln(n,"variance","batchNorm");return null!=o&&(i=ln(o,"scale","batchNorm")),null!=r&&(u=ln(r,"offset","batchNorm")),g(3===s.rank,function(){return "Error in batchNorm3D: x must be rank 3 but got rank "+s.rank+"."}),g(3===c.rank||1===c.rank,function(){return "Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank "+c.rank+"."}),g(3===l.rank||1===l.rank,function(){return "Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank "+l.rank+"."}),null!=i&&g(3===i.rank||1===i.rank,function(){return "Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank "+i.rank+"."}),null!=u&&g(3===u.rank||1===u.rank,function(){return "Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank "+u.rank+"."}),Rs(s,c,l,u,i,a)}function Es(t,e,n,r,o,a){var i,u,s=ln(t,"x","batchNorm"),c=ln(e,"mean","batchNorm"),l=ln(n,"variance","batchNorm");return null!=o&&(i=ln(o,"scale","batchNorm")),null!=r&&(u=ln(r,"offset","batchNorm")),g(4===s.rank,function(){return "Error in batchNorm4D: x must be rank 4 but got rank "+s.rank+"."}),g(4===c.rank||1===c.rank,function(){return "Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank "+c.rank+"."}),g(4===l.rank||1===l.rank,function(){return "Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank "+l.rank+"."}),null!=i&&g(4===i.rank||1===i.rank,function(){return "Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank "+i.rank+"."}),null!=u&&g(4===u.rank||1===u.rank,function(){return "Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank "+u.rank+"."}),Rs(s,c,l,u,i,a)}function Rs(t,e,n,r,o,a){null==a&&(a=.001);var i,u,s,c=ln(t,"x","batchNorm"),l=ln(e,"mean","batchNorm"),h=ln(n,"variance","batchNorm");null!=o&&(i=ln(o,"scale","batchNorm")),null!=r&&(u=ln(r,"offset","batchNorm")),g(l.rank===h.rank,function(){return "Batch normalization gradient requires mean and variance to have equal ranks."}),g(null==u||l.rank===u.rank,function(){return "Batch normalization gradient requires mean and offset to have equal ranks."}),g(null==i||l.rank===i.rank,function(){return "Batch normalization gradient requires mean and scale to have equal ranks."}),s=0===c.rank||1===c.rank?c.as4D(1,1,1,c.size):2===c.rank?c.as4D(1,1,c.shape[0],c.shape[1]):3===c.rank?c.as4D(1,c.shape[0],c.shape[1],c.shape[2]):c;var f=[c,l,h,i];return Nt.runKernelFunc(function(t,e){var n=t.batchNormalization(s,Is(l),Is(h),a,Is(i),Is(u));return e([c,l,h,i]),n},{x:c,mean:l,variance:h,scale:i,offset:u},function(t,e){var n=e,r=n[0],o=n[1],i=n[2],u=n[3],c=null==u?An(1):u,l=fo(o.shape,s.shape),h=[];if(1===o.rank){for(var f=0;f<s.shape.length-1;++f)h.push(s.shape[f]);h.push(1);}var p=r.sub(o),d=t.mul(c),v=ss(i.add(An(a))),m=v.mul(v).mul(v).mul(An(-.5));return {x:function(){return 1===o.rank?t.mul(Nr(v.as4D(1,1,1,o.shape[0]),h)).mul(c).reshape(r.shape):t.mul(v).mul(c).reshape(r.shape)},mean:function(){var t=v.mul(An(-1)).mul(d);return 1===o.rank&&(t=t.sum(l)),t.reshape(o.shape)},variance:function(){var t=m.mul(p).mul(d);return 1===o.rank&&(t=t.sum(l)),t.reshape(o.shape)},scale:function(){var e=p.mul(v),n=t.mul(e);return 1===o.rank&&(n=n.sum(l)),n.reshape(o.shape)},offset:function(){var e=t;return 1===o.rank&&(e=e.sum(l)),e.reshape(o.shape)}}},"BatchNormalization",{varianceEpsilon:a},f).reshape(c.shape)}function Is(t){return null==t?null:0===t.rank?t.as1D():1===t.rank?t:2===t.rank?t.as4D(1,1,t.shape[0],t.shape[1]):3===t.rank?t.as4D(1,t.shape[0],t.shape[1],t.shape[2]):t}function ks(){ze("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon");}var Ss=Cn({batchNormalization2d_:function(t,e,n,r,o,a){return void 0===r&&(r=.001),ks(),ws(t,e,n,a,o,r)}}),As=Cn({batchNormalization3d_:function(t,e,n,r,o,a){return void 0===r&&(r=.001),ks(),Cs(t,e,n,a,o,r)}}),Ds=Cn({batchNormalization4d_:function(t,e,n,r,o,a){return void 0===r&&(r=.001),ks(),Es(t,e,n,a,o,r)}}),Ts=Cn({batchNormalization_:function(t,e,n,r,o,a){return void 0===r&&(r=.001),ks(),Rs(t,e,n,a,o,r)}}),Ns=Cn({batchNorm_:Rs}),Fs=Cn({batchNorm2d_:ws}),Os=Cn({batchNorm3d_:Cs}),_s=Cn({batchNorm4d_:Es});var Ms=Cn({logicalAnd_:function(t,e){var n=ln(t,"a","logicalAnd","bool"),r=ln(e,"b","logicalAnd","bool");return po(n.shape,r.shape),Nt.runKernelFunc(function(t){return t.logicalAnd(n,r)},{$a:n,$b:r})}}),Bs=Cn({logicalNot_:function(t){var e=ln(t,"x","logicalNot","bool");return Nt.runKernelFunc(function(t){return t.logicalNot(e)},{$x:e})}}),Ps=Cn({logicalOr_:function(t,e){var n=ln(t,"a","logicalOr","bool"),r=ln(e,"b","logicalOr","bool");return po(n.shape,r.shape),Nt.runKernelFunc(function(t){return t.logicalOr(n,r)},{$a:n,$b:r})}}),Ls=Cn({logicalXor_:function(t,e){var n=ln(t,"a","logicalXor","bool"),r=ln(e,"b","logicalXor","bool");return po(n.shape,r.shape),Ps(t,e).logicalAnd(Ms(t,e).logicalNot())}}),Ws=Cn({where_:function(t,e,n){var r=ln(e,"a","where"),o=ln(n,"b","where"),a=ln(t,"condition","where","bool");return y(r.shape,o.shape,"Error in where: "),1===a.rank?g(a.shape[0]===r.shape[0],function(){return "The first dimension of `a` must match the size of `condition`."}):y(a.shape,o.shape,"Error in where: "),Nt.runKernelFunc(function(t,e){var n=t.select(a,r,o);return e([a]),n},{$condition:a,$a:r,$b:o},function(t,e){var n=e[0];return {$condition:function(){return zn(n).toFloat()},$a:function(){return t.mul(n.cast(t.dtype))},$b:function(){return t.mul(n.logicalNot().cast(t.dtype))}}})}}),Us=function(t){return n(this,void 0,void 0,function(){var e,n,o;return r(this,function(r){switch(r.label){case 0:return [4,(e=ln(t,"condition","whereAsync","bool")).data()];case 1:return n=r.sent(),o=Uo(e.shape,n),t!==e&&e.dispose(),[2,o]}})})};var Vs=Cn({add_:function(t,e){var n,r=ln(t,"a","add"),o=ln(e,"b","add");n=Rt(r,o),r=n[0],o=n[1];var a=po(r.shape,o.shape);return Nt.runKernelFunc(function(t){return t.add(r,o)},{a:r,b:o},function(t){return {a:function(){var e=t,n=fo(r.shape,a);return n.length>0&&(e=e.sum(n)),e.reshape(r.shape)},b:function(){var e=t,n=fo(o.shape,a);return n.length>0&&(e=e.sum(n)),e.reshape(o.shape)}}},"Add")}}),zs=Cn({addN_:function(t){g(Array.isArray(t),function(){return "The argument passed to tf.addN() must be a list of tensors"}),g(t.length>=1,function(){return "Must pass at least one tensor to tf.addN(), but got "+t.length});var e=t.map(function(t,e){return ln(t,"tensors"+e,"addN")}),n=e[0];e.forEach(function(t){if(t.dtype!==n.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(function(t){if(!C(t.shape,n.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});var r=e;return Nt.runKernelFunc(function(t){return t.addN(e)},r,function(t){var n={};return e.forEach(function(e,r){n[r]=function(){return t.clone()};}),n})}}),Gs=Cn({addStrict_:function(t,e){var n=ln(t,"a","addStrict"),r=ln(e,"b","addStrict");return y(n.shape,r.shape,"Error in addStrict: "),n.add(r)}}),Hs=Cn({atan2_:function(t,e){var n,r=ln(t,"a","atan2"),o=ln(e,"b","atan2");n=Rt(r,o),r=n[0],o=n[1];var a=po(r.shape,o.shape);return Nt.runKernelFunc(function(t,e){var n=t.atan2(r,o);return e([r,o]),n},{$a:r,$b:o},function(t,e){var n=e[0],r=e[1];return {$a:function(){var e=Vs(n.square(),r.square()),o=t.mul(r.div(e)),i=fo(n.shape,a);return i.length>0&&(o=o.sum(i)),o.reshape(n.shape)},$b:function(){var e=Vs(n.square(),r.square()),o=as(t.mul(n.div(e))),i=fo(r.shape,a);return i.length>0&&(o=o.sum(i)),o.reshape(r.shape)}}})}}),qs=Cn({div_:function(t,e){var n,r=ln(t,"a","div"),o=ln(e,"b","div");if(n=Rt(r,o),r=n[0],o=n[1],"int32"===r.dtype&&"int32"===o.dtype)return Xs(r,o);var a=po(r.shape,o.shape);return Nt.runKernelFunc(function(t,e){var n=t.realDivide(r,o);return e([r,o]),n},{a:r,b:o},function(t,e){var n=e[0],r=e[1];return {a:function(){var e=t.div(r.toFloat()),o=fo(n.shape,a);return o.length>0?e.sum(o).reshape(n.shape):e},b:function(){var e=t.mul(n.toFloat()),o=fo(r.shape,a);o.length>0&&(e=e.sum(o).reshape(r.shape));var i=r.square();return e.div(i.toFloat()).neg()}}},"Div")}}),Ks=Cn({divNoNan_:function(t,e){var n,r=ln(t,"a","div"),o=ln(e,"b","div");r=(n=Rt(r,o))[0],o=n[1];var a=qs(r,o),i=zn(a),u=o.equal(i);return Ws(u,i,a)}}),js=Cn({divStrict_:function(t,e){var n=ln(t,"a","div"),r=ln(e,"b","div");return y(n.shape,r.shape,"Error in divideStrict: "),n.div(r)}}),Xs=Cn({floorDiv_:function(t,e){var n,r=ln(t,"a","floorDiv"),o=ln(e,"b","floorDiv");n=Rt(r,o),r=n[0],o=n[1];var a=po(r.shape,o.shape);return Nt.runKernelFunc(function(t,e){var n=t.floorDiv(r,o);return e([r,o]),n},{$a:r,$b:o},function(t,e){var n=e[0],r=e[1];return {$a:function(){var e=t.div(r.toFloat()),o=fo(n.shape,a);return o.length>0?e.sum(o).reshape(n.shape):e},$b:function(){var e=t.mul(n.toFloat()),o=fo(r.shape,a);o.length>0&&(e=e.sum(o).reshape(r.shape));var i=r.square();return e.div(i.toFloat()).neg()}}})}}),$s=Cn({maximum_:function(t,e){var n,r=ln(t,"a","maximum"),o=ln(e,"b","maximum");return n=Rt(r,o),r=n[0],o=n[1],"bool"===r.dtype&&(r=r.toInt(),o=o.toInt()),po(r.shape,o.shape),Nt.runKernelFunc(function(t,e){var n=t.maximum(r,o);return e([r,o]),n},{$a:r,$b:o},function(t,e){var n=e[0],r=e[1];return {$a:function(){return t.mul(n.greaterEqual(r).toFloat())},$b:function(){return t.mul(n.less(r).toFloat())}}})}}),Ys=Cn({maximumStrict_:function(t,e){var n=ln(t,"a","maximumStrict"),r=ln(e,"b","maximumStrict");return y(n.shape,r.shape,"Error in maximumStrict: "),n.maximum(r)}}),Qs=Cn({minimum_:function(t,e){var n,r=ln(t,"a","minimum"),o=ln(e,"b","minimum");return n=Rt(r,o),r=n[0],o=n[1],"bool"===r.dtype&&(r=r.toInt(),o=o.toInt()),po(r.shape,o.shape),Nt.runKernelFunc(function(t,e){var n=t.minimum(r,o);return e([r,o]),n},{$a:r,$b:o},function(t,e){var n=e[0],r=e[1];return {$a:function(){return t.mul(n.lessEqual(r).toFloat())},$b:function(){return t.mul(n.greater(r).toFloat())}}})}}),Js=Cn({minimumStrict_:function(t,e){var n=ln(t,"a","minimumStrict"),r=ln(e,"b","minimumStrict");return y(n.shape,r.shape,"Error in minimumStrict: "),n.minimum(r)}}),Zs=Cn({mod_:function(t,e){var n,r=ln(t,"a","mod"),o=ln(e,"b","mod");n=Rt(r,o),r=n[0],o=n[1];var a=po(r.shape,o.shape);return Nt.runKernelFunc(function(t,e){var n=t.mod(r,o);return e([r,o]),n},{$a:r,$b:o},function(t,e){var n=e[0],r=e[1];return {$a:function(){var e=fo(n.shape,a);return e.length>0?t.sum(e).reshape(n.shape):t},$b:function(){var e=t.mul(n.div(r).floor().neg()),o=fo(r.shape,a);return o.length>0?e.sum(o).reshape(r.shape):e}}})}}),tc=Cn({modStrict_:function(t,e){var n=ln(t,"a","modStrict"),r=ln(e,"b","modStrict");return y(n.shape,r.shape,"Error in modStrict: "),n.mod(r)}}),ec=Cn({mul_:function(t,e){var n,r=ln(t,"a","mul"),o=ln(e,"b","mul");n=Rt(r,o),r=n[0],o=n[1];var a=po(r.shape,o.shape);return Nt.runKernelFunc(function(t,e){var n=t.multiply(r,o);return e([r,o]),n},{a:r,b:o},function(t,e){var n=e[0],r=e[1];return {a:function(){var e=t.mul(r.toFloat()),o=fo(n.shape,a);return o.length>0?e.sum(o).reshape(n.shape):e},b:function(){var e=t.mul(n.toFloat()),o=fo(r.shape,a);return o.length>0?e.sum(o).reshape(r.shape):e}}},"Mul")}}),nc=Cn({mulStrict_:function(t,e){var n=ln(t,"a","mul"),r=ln(e,"b","mul");return y(n.shape,r.shape,"Error in multiplyStrict: "),n.mul(r)}}),rc=Cn({pow_:function(t,e){var n=ln(t,"base","pow"),r=ln(e,"exp","pow"),o=po(n.shape,r.shape);return t=n.cast(Ct(n.dtype,r.dtype)),e=r.cast(Ct(n.dtype,r.dtype)),Nt.runKernelFunc(function(t,e){var o=t.pow(n,r);return e([n,r,o]),o},{$base:n,$exp:r},function(t,e){var n=e[0],r=e[1],a=e[2];return {$base:function(){var e=r.toFloat(),a=t.mul(e.mul(n.pow(e.sub(An(1))))),i=fo(n.shape,o);return i.length>0&&(a=a.sum(i)),a.reshape(n.shape)},$exp:function(){var e=n.greater(0),i=n.log().where(e,zn(n)),u=t.mul(a.mul(i)),s=fo(r.shape,o);return s.length>0&&(u=u.sum(s)),u.reshape(r.shape)}}})}}),oc=Cn({powStrict_:function(t,e){return y(t.shape,e.shape,"Error in powStrict: "),t.pow(e)}}),ac=Cn({squaredDifference_:function(t,e){var n,r=ln(t,"a","squaredDifference"),o=ln(e,"b","squaredDifference");return n=Rt(r,o),r=n[0],o=n[1],po(r.shape,o.shape),Nt.runKernelFunc(function(t,e){var n=t.squaredDifference(r,o);return e([r,o]),n},{$a:r,$b:o},function(t,e){var n=e[0],r=e[1],o=An(2);return {$a:function(){return t.mul(n.sub(r).mul(o))},$b:function(){return t.mul(r.sub(n).mul(o))}}})}}),ic=Cn({squaredDifferenceStrict_:function(t,e){var n=ln(t,"a","squaredDifferenceStrict"),r=ln(e,"b","squaredDifferenceStrict");return y(n.shape,r.shape,"Error in squaredDifferenceStrict: "),n.squaredDifference(r)}}),uc=Cn({sub_:function(t,e){var n,r=ln(t,"a","sub"),o=ln(e,"b","sub");n=Rt(r,o),r=n[0],o=n[1];var a=po(r.shape,o.shape);return Nt.runKernelFunc(function(t){return t.subtract(r,o)},{a:r,b:o},function(t){return {a:function(){var e=t,n=fo(r.shape,a);return n.length>0&&(e=e.sum(n)),e.reshape(r.shape)},b:function(){var e=t,n=fo(o.shape,a);return n.length>0&&(e=e.sum(n)),e.neg().reshape(o.shape)}}},"Sub")}}),sc=Cn({subStrict_:function(t,e){var n=ln(t,"a","subStrict"),r=ln(e,"b","subStrict");return y(n.shape,r.shape,"Error in subStrict: "),n.sub(r)}});var cc=Cn({equal_:function(t,e){var n,r=ln(t,"a","equal"),o=ln(e,"b","equal");return n=Rt(r,o),r=n[0],o=n[1],po(r.shape,o.shape),Nt.runKernelFunc(function(t){return t.equal(r,o)},{$a:r,$b:o})}}),lc=Cn({equalStrict_:function(t,e){var n=ln(t,"a","equalStrict"),r=ln(e,"b","equalStrict");return y(n.shape,r.shape,"Error in equalStrict: "),n.equal(r)}}),hc=Cn({greater_:function(t,e){var n,r=ln(t,"a","greater"),o=ln(e,"b","greater");return n=Rt(r,o),r=n[0],o=n[1],po(r.shape,o.shape),Nt.runKernelFunc(function(t){return t.greater(r,o)},{$a:r,$b:o})}}),fc=Cn({greaterEqual_:function(t,e){var n,r=ln(t,"a","greaterEqual"),o=ln(e,"b","greaterEqual");return n=Rt(r,o),r=n[0],o=n[1],po(r.shape,o.shape),Nt.runKernelFunc(function(t,e){var n=t.greaterEqual(r,o);return e([r,o]),n},{$a:r,$b:o},function(t,e){var n=e[0],r=e[1];return {$a:function(){return zn(n)},$b:function(){return zn(r)}}})}}),pc=Cn({greaterEqualStrict_:function(t,e){var n=ln(t,"a","greaterEqualStrict"),r=ln(e,"b","greaterEqualStrict");return y(n.shape,r.shape,"Error in greaterEqualStrict: "),n.greaterEqual(r)}}),dc=Cn({greaterStrict_:function(t,e){var n=ln(t,"a","greaterStrict"),r=ln(e,"b","greaterStrict");return y(n.shape,r.shape,"Error in greaterStrict: "),n.greater(r)}}),vc=Cn({less_:function(t,e){var n,r=ln(t,"a","less"),o=ln(e,"b","less");return n=Rt(r,o),r=n[0],o=n[1],po(r.shape,o.shape),Nt.runKernelFunc(function(t){return t.less(r,o)},{$a:r,$b:o})}}),mc=Cn({lessEqual_:function(t,e){var n,r=ln(t,"a","lessEqual"),o=ln(e,"b","lessEqual");return n=Rt(r,o),r=n[0],o=n[1],po(r.shape,o.shape),Nt.runKernelFunc(function(t){return t.lessEqual(r,o)},{$a:r,$b:o})}}),gc=Cn({lessEqualStrict_:function(t,e){var n=ln(t,"a","lessEqualStrict"),r=ln(e,"b","lessEqualStrict");return y(n.shape,r.shape,"Error in lessEqualStrict: "),n.lessEqual(r)}}),yc=Cn({lessStrict_:function(t,e){var n=ln(t,"a","lessStrict"),r=ln(e,"b","lessStrict");return y(n.shape,r.shape,"Error in lessStrict: "),n.less(r)}}),xc=Cn({notEqual_:function(t,e){var n,r=ln(t,"a","notEqual"),o=ln(e,"b","notEqual");return n=Rt(r,o),r=n[0],o=n[1],po(r.shape,o.shape),Nt.runKernelFunc(function(t){return t.notEqual(r,o)},{$a:r,$b:o})}}),bc=Cn({notEqualStrict_:function(t,e){var n=ln(t,"a","notEqualStrict"),r=ln(e,"b","notEqualStrict");return y(n.shape,r.shape,"Error in notEqualStrict: "),n.notEqual(r)}});function wc(t,e){for(var n=[],r=t;r<e;++r)n.push(r);return n}function Cc(t){for(var e=[],n=0;n<t.length;++n)for(var r=0;r<t[n].length;++r)e.push(t[n][r]);return e}var Ec=Cn({gather_:function(t,e,n){void 0===n&&(n=0);var r=ln(t,"x","gather"),o=ln(e,"indices","gather","int32");n=D(n,r.shape)[0];var a=function(t,e,n){for(var r=t.shape[n],o=[],a=1,i=1,u=0;u<n;u++)o.push(t.shape[u]),a*=t.shape[u];for(u=0;u<e.rank;u++)o.push(e.shape[u]);for(u=n+1;u<t.rank;u++)o.push(t.shape[u]),i*=t.shape[u];return {batchSize:a,sliceSize:i,dimSize:r,outputShape:o}}(r,o,n);return Nt.runKernelFunc(function(t,e){var a=t.gather(r,o.flatten(),n);return e([o]),a},{$x:r},function(t,e){var o=e[0];return {$x:function(){var e=r.shape,a=o.size,i=e.slice(0,n),u=i.length,s=e.slice(n,e.length).slice(1),c=s.length,l=wc(0,u),h=wc(u+1,u+1+c),f=Cc([i,[a],s]),p=t.reshape(f),d=o.reshape([a]),v=Cc([[u],l,h]),m=p.transpose(v),g=Rc(m,d,r.shape[n]),y=yn(v);return g=g.transpose(y)}}}).reshape(a.outputShape)}}),Rc=Cn({unsortedSegmentSum_:function(t,e,n){var r=ln(t,"x","unsortedSegmentSum"),o=ln(e,"segmentIds","unsortedSegmentSum","int32");return g(E(n),function(){return "numSegments must be of dtype int"}),Nt.runKernelFunc(function(t,e){var a=t.unsortedSegmentSum(r,o,n);return e([o]),a},{$x:r},function(t,e){var n=e[0];return {$x:function(){return function(t,e){for(var n=$s(e,zn(e)),r=Ec(t,n),o=fc(e,An(0,"int32")),a=r.rank-o.rank,i=0;i<a;++i)o=dr(o,i+1);o=Ms(o,Bn(r.shape,"bool"));var u=zn(r);return Ws(o,r,u)}(t,n)}}})}});var Ic=function(t,e,o){return n(this,void 0,void 0,function(){var n,a,i,u,s,c,l,h,f,p,d,v,m;return r(this,function(r){switch(r.label){case 0:for(n=ln(t,"tensor","boolMask"),a=ln(e,"mask","boolMask","bool"),i=null==o?0:o,u=a.rank,s=n.shape,g(u>0,function(){return "mask cannot be scalar"}),y(s.slice(i,i+u),a.shape,"mask's shape must match the first K dimensions of tensor's shape,"),c=1,l=i;l<i+u;l++)c*=s[l];return h=s.slice(0,i).concat([c],s.slice(i+u)),f=n.reshape(h),p=a.reshape([-1]),[4,Us(p)];case 1:return d=r.sent(),v=d.squeeze([1]),m=Ec(f,v,i),t!==n&&n.dispose(),e!==a&&a.dispose(),v.dispose(),f.dispose(),p.dispose(),d.dispose(),[2,m]}})})};function kc(t,e,n,r,o,a,i){void 0===a&&(a="NHWC"),g(t.length===e.rank,function(){return "Length of inShape ("+t.length+") and rank of dy ("+e.rank+") must match"});var u=t,s=e,c=!1;3===e.rank&&(c=!0,s=e.as4D(1,e.shape[0],e.shape[1],e.shape[2]),u=[1,t[0],t[1],t[2]]),g(4===u.length,function(){return "Error in conv2dDerInput: inShape must be length 4, but got length "+u.length+"."}),g(4===s.rank,function(){return "Error in conv2dDerInput: dy must be rank 4, but got rank "+s.rank}),g(4===n.rank,function(){return "Error in conv2dDerInput: filter must be rank 4, but got rank "+n.rank});var l="NHWC"===a?u[3]:u[1],h="NHWC"===a?s.shape[3]:s.shape[1];g(l===n.shape[2],function(){return "Error in conv2dDerInput: depth of input ("+l+") must match input depth for filter "+n.shape[2]+"."}),g(h===n.shape[3],function(){return "Error in conv2dDerInput: depth of output ("+h+") must match output depth for filter "+n.shape[3]+"."}),null!=i&&g(E(o),function(){return "Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var f=ko(a),p=go(u,n.shape,r,1,o,i,!1,f),d=Nt.runKernelFunc(function(t,e){var r=t.conv2dDerInput(s,n,p);return e([n,s]),r},{dy4D:s,filter:n},function(t,e){var n=e[0],u=e[1];return {dy4D:function(){return Tc(t,n,r,o,a,1,i)},filter:function(){return Fc(t,u,n.shape,r,o,a,i)}}});return c?d.as3D(d.shape[1],d.shape[2],d.shape[3]):d}function Sc(t){var e=function(t){return "number"==typeof t?[t,t,t]:2===t.length?[t[0],t[1],1]:t}(t),n=e[0],r=e[1],o=e[2];return 1===n&&1===r&&1===o}function Ac(t,e,n,r,o){g(t.length===e.rank,function(){return "Length of inShape ("+t.length+") and rank of dy ("+e.rank+") must match"});var a=t,i=e,u=!1;4===e.rank&&(u=!0,i=e.as5D(1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]),a=[1,t[0],t[1],t[2],t[3]]);var s=a[4],c=i.shape[4];g(5===a.length,function(){return "Error in conv3dDerInput: inShape must be length 5, but got length "+a.length+"."}),g(5===i.rank,function(){return "Error in conv3dDerInput: dy must be rank 5, but got rank "+i.rank}),g(5===n.rank,function(){return "Error in conv3dDerInput: filter must be rank 5, but got rank "+n.rank}),g(s===n.shape[3],function(){return "Error in conv3dDerInput: depth of input ("+s+") must match input depth for filter "+n.shape[3]+"."}),g(c===n.shape[4],function(){return "Error in conv3dDerInput: depth of output ("+c+") must match output depth for filter "+n.shape[4]+"."});var l=yo(a,n.shape,r,1,o),h=Nt.runKernelFunc(function(t){return t.conv3dDerInput(i,n,l)},{dy5D:i});return u?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}var Dc=Cn({conv1d_:function(t,e,n,r,o,a,i){void 0===o&&(o="NWC"),void 0===a&&(a=1);var u=ln(t,"x","conv1d"),s=ln(e,"filter","conv1d"),c=u,l=!1;2===u.rank&&(l=!0,c=u.as3D(1,u.shape[0],u.shape[1])),g(3===c.rank,function(){return "Error in conv1d: input must be rank 3, but got rank "+c.rank+"."}),g(3===s.rank,function(){return "Error in conv1d: filter must be rank 3, but got rank "+s.rank+"."}),null!=i&&g(E(r),function(){return "Error in conv1d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+r+"."}),g(c.shape[2]===s.shape[1],function(){return "Error in conv1d: depth of input ("+c.shape[2]+") must match input depth for filter "+s.shape[1]+"."}),g(Io(n,a),function(){return "Error in conv1D: Either stride or dilation must be 1. Got stride "+n+" and dilation '"+a+"'"}),g("NWC"===o,function(){return "Error in conv1d: got dataFormat of "+o+" but only NWC is currently supported."});var h=s.as4D(1,s.shape[0],s.shape[1],s.shape[2]),f=c.as4D(c.shape[0],1,c.shape[1],c.shape[2]),p=Tc(f,h,[1,n],r,"NHWC",[1,a],i);return l?p.as2D(p.shape[2],p.shape[3]):p.as3D(p.shape[0],p.shape[2],p.shape[3])}}),Tc=Cn({conv2d_:function(t,e,n,r,o,a,i){void 0===o&&(o="NHWC"),void 0===a&&(a=[1,1]);var u=ln(t,"x","conv2d"),s=ln(e,"filter","conv2d"),c=u,l=!1;3===u.rank&&(l=!0,c=u.as4D(1,u.shape[0],u.shape[1],u.shape[2])),g(4===c.rank,function(){return "Error in conv2d: input must be rank 4, but got rank "+c.rank+"."}),g(4===s.rank,function(){return "Error in conv2d: filter must be rank 4, but got rank "+s.rank+"."}),null!=i&&g(E(r),function(){return "Error in conv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+r+"."});var h="NHWC"===o?c.shape[3]:c.shape[1];g(h===s.shape[2],function(){return "Error in conv2d: depth of input ("+h+") must match input depth for filter "+s.shape[2]+"."}),g(Io(n,a),function(){return "Error in conv2D: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+a+"'"});var f=ko(o),p=go(c.shape,s.shape,n,a,r,i,!1,f),d=[s,c],v=Nt.runKernelFunc(function(t,e){var n=t.conv2d(c,s,p);return e([s,c]),n},{x:c,filter:s},function(t,e){var i=e,u=i[0],s=i[1];return g(Ro(a),function(){return "Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+a+"'"}),{x:function(){return Oc(s.shape,t,u,n,r,o)},filter:function(){return Fc(s,t,u.shape,n,r,o)}}},"Conv2D",p,d);return l?v.as3D(v.shape[1],v.shape[2],v.shape[3]):v}}),Nc=Cn({conv3d_:function(t,e,n,r,o,a){void 0===o&&(o="NDHWC"),void 0===a&&(a=[1,1,1]);var i=ln(t,"x","conv3d"),u=ln(e,"filter","conv3d"),s=i,c=!1;4===i.rank&&(c=!0,s=i.as5D(1,i.shape[0],i.shape[1],i.shape[2],i.shape[3])),g(5===s.rank,function(){return "Error in conv3d: input must be rank 5, but got rank "+s.rank+"."}),g(5===u.rank,function(){return "Error in conv3d: filter must be rank 5, but got rank "+u.rank+"."}),g(s.shape[4]===u.shape[3],function(){return "Error in conv3d: depth of input ("+s.shape[4]+") must match input depth for filter "+u.shape[3]+"."}),g(function(t,e){return Sc(t)||Sc(e)}(n,a),function(){return "Error in conv3D: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+a+"'"}),g("NDHWC"===o,function(){return "Error in conv3d: got dataFormat of "+o+" but only NDHWC is currently supported."});var l=yo(s.shape,u.shape,n,a,r),h=Nt.runKernelFunc(function(t,e){var n=t.conv3d(s,u,l);return e([s,u]),n},{x:s,$filter:u},function(t,e){g(Sc(a),function(){return "Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+a+"'"});var o=e[0],i=e[1];return {x:function(){return Ac(o.shape,t,i,n,r)},$filter:function(){return function(t,e,n,r,o){var a=t;4===t.rank&&(a=t.as5D(1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]));var i=e;4===i.rank&&(i=e.as5D(1,e.shape[0],e.shape[1],e.shape[2],e.shape[3])),g(5===a.rank,function(){return "Error in conv3dDerFilter: input must be rank 5, but got shape "+a.shape+"."}),g(5===i.rank,function(){return "Error in conv3dDerFilter: dy must be rank 5, but got shape "+i.shape+"."}),g(5===n.length,function(){return "Error in conv3dDerFilter: filterShape must be length 5, but got "+n+"."}),g(a.shape[4]===n[3],function(){return "Error in conv3dDerFilter: depth of input "+a.shape[4]+") must match input depth in filter ("+n[3]+"."}),g(i.shape[4]===n[4],function(){return "Error in conv3dDerFilter: depth of dy ("+i.shape[4]+") must match output depth for filter ("+n[4]+")."});var u=yo(a.shape,n,r,1,o);return Nt.runKernelFunc(function(t){return t.conv3dDerFilter(a,i,u)},{x5D:a,dy5D:i})}(o,t,i.shape,n,r)}}});return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),Fc=Cn({conv2dDerFilter_:function(t,e,n,r,o,a,i){void 0===a&&(a="NHWC");var u=t;3===t.rank&&(u=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]));var s=e;3===s.rank&&(s=e.as4D(1,e.shape[0],e.shape[1],e.shape[2])),g(4===u.rank,function(){return "Error in conv2dDerFilter: input must be rank 4, but got shape "+u.shape+"."}),g(4===s.rank,function(){return "Error in conv2dDerFilter: dy must be rank 4, but got shape "+s.shape+"."}),g(4===n.length,function(){return "Error in conv2dDerFilter: filterShape must be length 4, but got "+n+"."});var c="NHWC"===a?u.shape[3]:u.shape[1],l="NHWC"===a?s.shape[3]:s.shape[1];g(c===n[2],function(){return "Error in conv2dDerFilter: depth of input "+c+") must match input depth in filter ("+n[2]+"."}),g(l===n[3],function(){return "Error in conv2dDerFilter: depth of dy ("+l+") must match output depth for filter ("+n[3]+")."}),null!=i&&g(E(o),function(){return "Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var h=ko(a),f=go(u.shape,n,r,1,o,i,!1,h);return Nt.runKernelFunc(function(t){return t.conv2dDerFilter(u,s,f)},{x4D:u,dy4D:s})}}),Oc=Cn({conv2dDerInput_:kc}),_c=Cn({depthwiseConv2d_:function(t,e,n,r,o,a,i){void 0===a&&(a=[1,1]);var u=ln(t,"x","depthwiseConv2d"),s=ln(e,"filter","depthwiseConv2d"),c=u,l=!1;3===u.rank&&(l=!0,c=u.as4D(1,u.shape[0],u.shape[1],u.shape[2])),g(4===c.rank,function(){return "Error in depthwiseConv2d: input must be rank 4, but got rank "+c.rank+"."}),g(4===s.rank,function(){return "Error in depthwiseConv2d: filter must be rank 4, but got rank "+s.rank+"."}),g(c.shape[3]===s.shape[2],function(){return "Error in depthwiseConv2d: number of input channels ("+c.shape[3]+") must match the inChannels dimension in filter "+s.shape[2]+"."}),null==a&&(a=[1,1]),g(Io(n,a),function(){return "Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+a+"'"}),null!=i&&g(E(r),function(){return "Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+r+"."});var h=go(c.shape,s.shape,n,a,r,i,!0),f=Nt.runKernelFunc(function(t,e){var n=t.depthwiseConv2D(c,s,h);return e([c,s]),n},{x:c,$filter:s},function(t,e){g(Ro(a),function(){return "Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+a+"'"});var n=e[0],r=e[1];return {x:function(){return Mc(n.shape,t,r,h)},$filter:function(){return Bc(n,t,r.shape,h)}}});return l?f.as3D(f.shape[1],f.shape[2],f.shape[3]):f}}),Mc=Cn({depthwiseConv2dDerInput_:function(t,e,n,r){var o=e,a=!1;3===e.rank&&(a=!0,o=e.as4D(1,e.shape[0],e.shape[1],e.shape[2]));var i=Nt.runKernelFunc(function(t){return t.depthwiseConv2DDerInput(o,n,r)},{dy4D:o});return a?i.as3D(i.shape[1],i.shape[2],i.shape[3]):i}}),Bc=Cn({depthwiseConv2dDerFilter_:function(t,e,n,r){var o=t;3===t.rank&&(o=t.as4D(1,t.shape[0],t.shape[1],t.shape[2]));var a=e;return 3===a.rank&&(a=e.as4D(1,e.shape[0],e.shape[1],e.shape[2])),Nt.runKernelFunc(function(t){return t.depthwiseConv2DDerFilter(o,a,r)},{x4D:o,dy4D:a})}}),Pc=Cn({separableConv2d_:function(t,e,n,r,o,a,i){void 0===a&&(a=[1,1]),void 0===i&&(i="NHWC");var u=ln(t,"x","separableConv2d"),s=ln(e,"depthwiseFilter","separableConv2d"),c=ln(n,"pointwiseFilter","separableConv2d"),l=u,h=!1;if(3===u.rank&&(h=!0,l=u.as4D(1,u.shape[0],u.shape[1],u.shape[2])),"NCHW"===i)throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");g(4===l.rank,function(){return "Error in separableConv2d: input must be rank 4, but got rank "+l.rank+"."}),g(4===s.rank,function(){return "Error in separableConv2d: depthwise filter must be rank 4, but got rank "+s.rank+"."}),g(4===c.rank,function(){return "Error in separableConv2d: pointwise filter must be rank 4, but got rank "+s.rank+"."}),g(1===c.shape[0],function(){return "Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got "+c.shape[0]+"."}),g(1===c.shape[1],function(){return "Error in separableConv2d: the second dimension of pointwise filter must be 1, but got "+c.shape[1]+"."});var f=s.shape[2],p=s.shape[3];g(c.shape[2]===f*p,function(){return "Error in separableConv2d: the third dimension of pointwise filter must be "+f*p+", but got "+c.shape[2]+"."});var d=_c(l,s,r,o,i,a),v=Tc(d,c,1,"valid",i);return h?v.as3D(v.shape[1],v.shape[2],v.shape[3]):v}}),Lc=Cn({conv2dTranspose_:function(t,e,n,r,o,a){return kc(n,ln(t,"x","conv2dTranspose"),ln(e,"filter","conv2dTranspose"),r,o,"NHWC",a)}}),Wc=Cn({conv3dTranspose_:function(t,e,n,r,o){return Ac(n,ln(t,"x","conv3dTranspose"),ln(e,"filter","conv3dTranspose"),r,o)}});var Uc=Cn({matMul_:function(t,e,n,r){var o;void 0===n&&(n=!1),void 0===r&&(r=!1);var a=ln(t,"a","matMul"),i=ln(e,"b","matMul");o=Rt(a,i),a=o[0],i=o[1];var u=n?a.shape[a.rank-2]:a.shape[a.rank-1],s=r?i.shape[i.rank-1]:i.shape[i.rank-2],c=n?a.shape[a.rank-1]:a.shape[a.rank-2],l=r?i.shape[i.rank-2]:i.shape[i.rank-1],h=a.shape.slice(0,-2),f=i.shape.slice(0,-2),p=w(h),d=w(f);g(a.rank>=2&&i.rank>=2&&a.rank===i.rank,function(){return "Error in matMul: inputs must have the same rank of at least 2, got ranks "+a.rank+" and "+i.rank+"."}),g(C(h,f),function(){return "Error in matMul: outer dimensions ("+h+") and ("+f+") of Tensors with shapes "+a.shape+" and "+i.shape+" must match."}),g(u===s,function(){return "Error in matMul: inner shapes ("+u+") and ("+s+") of Tensors with shapes "+a.shape+" and "+i.shape+" and transposeA="+n+" and transposeB="+r+" must match."});var v=a.shape.slice(0,-2).concat([c,l]),m=n?a.as3D(p,u,c):a.as3D(p,c,u),y=r?i.as3D(d,l,s):i.as3D(d,s,l),x={transposeA:n,transposeB:r};return Nt.runKernelFunc(function(t,e){var o=t.batchMatMul(m,y,n,r);return e([m,y]),o},{a:m,b:y},function(t,e){var o=e,a=o[0],i=o[1];return n||r?!n&&r?{a:function(){return t.matMul(i,!1,!1)},b:function(){return t.matMul(a,!0,!1)}}:n&&!r?{a:function(){return i.matMul(t,!1,!0)},b:function(){return a.matMul(t,!1,!1)}}:{a:function(){return i.matMul(t,!0,!0)},b:function(){return t.matMul(a,!0,!0)}}:{a:function(){return t.matMul(i,!1,!0)},b:function(){return a.matMul(t,!0,!1)}}},"BatchMatMul",x).reshape(v)}}),Vc=Cn({dot_:function(t,e){var n=ln(t,"t1","dot"),r=ln(e,"t2","dot");g(!(1!==n.rank&&2!==n.rank||1!==r.rank&&2!==r.rank),function(){return "Error in dot: inputs must all be rank 1 or 2, but got ranks "+n.rank+" and "+r.rank+"."});var o=1===n.rank?n.size:n.shape[1],a=1===r.rank?r.size:r.shape[0];return g(o===a,function(){return "Error in dot: inner dimensions of inputs must match, but got "+o+" and "+a+"."}),1===n.rank&&1===r.rank?n.as2D(1,-1).matMul(r.as2D(-1,1)).asScalar():1===n.rank&&2===r.rank?n.as2D(1,-1).matMul(r.as2D(r.shape[0],r.shape[1])).as1D():2===n.rank&&1===r.rank?n.matMul(r.as2D(-1,1)).as1D():n.matMul(r.as2D(r.shape[0],r.shape[1]))}}),zc=Cn({outerProduct_:function(t,e){var n=ln(t,"v1","outerProduct"),r=ln(e,"v2","outerProduct");return g(1===n.rank&&1===r.rank,function(){return "Error in outerProduct: inputs must be rank 1, but got ranks "+n.rank+" and "+r.rank+"."}),n.as2D(-1,1).matMul(r.as2D(1,-1))}});var Gc=Cn({reverse_:function(t,e){var n=ln(t,"x","reverse");if(0===n.rank)return n.clone();var r=D(e,n.shape);return Nt.runKernelFunc(function(t){return t.reverse(n,r)},{$x:n},function(t){return {$x:function(){return t.reverse(r)}}}).reshapeAs(n)}}),Hc=Cn({reverse1d_:function(t){var e=ln(t,"x","reverse");return g(1===e.rank,function(){return "Error in reverse1D: x must be rank 1 but got rank "+e.rank+"."}),Gc(e,0)}}),qc=Cn({reverse2d_:function(t,e){var n=ln(t,"x","reverse");return g(2===n.rank,function(){return "Error in reverse2D: x must be rank 2 but got rank "+n.rank+"."}),Gc(n,e)}}),Kc=Cn({reverse3d_:function(t,e){var n=ln(t,"x","reverse");return g(3===n.rank,function(){return "Error in reverse3D: x must be rank 3 but got rank "+n.rank+"."}),Gc(n,e)}}),jc=Cn({reverse4d_:function(t,e){var n=ln(t,"x","reverse");return g(4===n.rank,function(){return "Error in reverse4D: x must be rank 4 but got rank "+n.rank+"."}),Gc(n,e)}});function Xc(t,e,n,r,o,a){var i=ln(t,"x","maxPool"),u=i,s=!1;3===i.rank&&(s=!0,u=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),null==r&&(r=[1,1]),g(4===u.rank,function(){return "Error in maxPool: input must be rank 4 but got rank "+u.rank+"."}),g(Io(n,r),function(){return "Error in maxPool: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+r+"'"}),null!=a&&g(E(o),function(){return "Error in maxPool: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var c=vo(u.shape,e,n,r,o,a),l=Nt.runKernelFunc(function(t,e){var n=t.maxPool(u,c);return e([u,n]),n},{x:u},function(t,a){var i=a[0],u=a[1];return {x:function(){return function(t,e,n,r,o,a,i,u){var s=ln(t,"dy","maxPoolBackprop"),c=ln(e,"input","maxPoolBackprop"),l=ln(n,"output","maxPoolBackprop");g(c.rank===s.rank,function(){return "Rank of input ("+c.rank+") does not match rank of dy ("+s.rank+")"}),null==a&&(a=[1,1]),g(Io(o,a),function(){return "Error in maxPoolBackProp: Either strides or dilations must be 1. Got strides "+o+" and dilations '"+a+"'"}),g(4===s.rank,function(){return "Error in maxPoolBackprop: dy must be rank 4 but got rank "+s.rank+"."}),g(4===c.rank,function(){return "Error in maxPoolBackprop: input must be rank 4 but got rank "+c.rank+"."}),null!=u&&g(E(i),function(){return "Error in maxPoolBackprop: pad must be an integer when using, dimRoundingMode "+u+" but got pad "+i+"."});var h=vo(c.shape,r,o,a,i,u);return Nt.runKernelFunc(function(t){return t.maxPoolBackprop(s,c,l,h)},{$dy:s,$input:c})}(t,i,u,e,n,r,o)}}});return s?l.as3D(l.shape[1],l.shape[2],l.shape[3]):l}function $c(t,e,n,r,o,a){var i=ln(t,"x","avgPool","float32");null==r&&(r=[1,1]),g(Io(n,r),function(){return "Error in avgPool: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+r+"'"});var u=i,s=!1;3===i.rank&&(s=!0,u=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),g(4===u.rank,function(){return "Error in avgPool: x must be rank 4 but got rank "+u.rank+"."}),null!=a&&g(E(o),function(){return "Error in avgPool: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var c=vo(u.shape,e,n,r,o,a),l=Nt.runKernelFunc(function(t){return t.avgPool(u,c)},{x:u},function(t){return {x:function(){return function(t,e,n,r,o,a){var i=ln(t,"dy","avgPoolBackprop"),u=ln(e,"input","avgPoolBackprop");g(u.rank===i.rank,function(){return "Rank of input ("+u.rank+") does not match rank of dy ("+i.rank+")"}),null==o&&(o=[1,1]),g(Io(r,o),function(){return "Error in avgPoolBackprop: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+o+"'"});var s=u,c=i,l=!1;3===u.rank&&(l=!0,s=u.as4D(1,u.shape[0],u.shape[1],u.shape[2]),c=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),g(4===c.rank,function(){return "Error in avgPoolBackprop: dy must be rank 4 but got rank "+c.rank+"."}),g(4===s.rank,function(){return "Error in avgPoolBackprop: input must be rank 4 but got rank "+s.rank+"."});var h=vo(s.shape,n,r,o,a),f=Nt.runKernelFunc(function(t){return t.avgPoolBackprop(c,s,h)},{dy4D:c,input4D:s});return l?f.as3D(f.shape[1],f.shape[2],f.shape[3]):f}(t,u,e,n,r,o)}}});return l=l.cast(i.dtype),s?l.as3D(l.shape[1],l.shape[2],l.shape[3]):l}var Yc=Cn({maxPool_:function(t,e,n,r,o){return Xc(t,e,n,1,r,o)}}),Qc=Cn({avgPool_:function(t,e,n,r,o){return $c(t,e,n,1,r,o)}}),Jc=Cn({pool_:function(t,e,n,r,o,a){null==o&&(o=[1,1]),null==a&&(a=1),0===r&&(r="valid");var i=ln(t,"x","maxPool"),u=i,s=!1;3===i.rank&&(s=!0,u=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),g(Io(a,o),function(){return "Error in pool: Either strides or dilations must be 1. Got strides "+a+" and dilations '"+o+"'"});var c,l=vo(u.shape,e,a,o,r),h=[l.dilationHeight,l.dilationWidth];c="same"===r?function(t,e){var n=t.map(function(t,n){return t+(t-1)*(e[n]-1)}).map(function(t){return t-1}),r=n.map(function(t){return Math.floor(t/2)}),o=n.map(function(t,e){return t-r[e]});return n.map(function(t,e){return [r[e],o[e]]})}([l.filterHeight,l.filterWidth],h):[[0,0],[0,0]];var f=1===h[0]&&1===h[1],p=function(t,e,n){var r=n.map(function(t){return t[0]}),o=n.map(function(t){return t[1]}),a=t.concat(r,o),i=e.map(function(t,e){return (t-a[e]%t)%t}),u=o.map(function(t,e){return t+i[e]}),s=e.map(function(t,e){return [r[e],u[e]]}),c=e.map(function(t,e){return [0,i[e]]});return [s,c]}([l.inHeight,l.inWidth],h,c),d=p[0],v=p[1],m=f?r:"valid",y=f?u:Ar(u,h,d),x=("avg"===n?function(){return $c(y,e,a,1,m)}:function(){return Xc(y,e,a,1,m)})(),b=f?x:cr(x,h,v);return s?b.as3D(b.shape[1],b.shape[2],b.shape[3]):b}}),Zc=Cn({maxPool3d_:function(t,e,n,r,o,a,i){void 0===a&&(a="NDHWC");var u=ln(t,"x","maxPool3d"),s=u,c=!1;4===u.rank&&(c=!0,s=u.as5D(1,u.shape[0],u.shape[1],u.shape[2],u.shape[3])),null==i&&(i=[1,1,1]),g(5===s.rank,function(){return "Error in maxPool3d: x must be rank 5 but got rank "+s.rank+"."}),g("NDHWC"===a,function(){return "Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of "+a}),g(Io(n,i),function(){return "Error in maxPool3d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+i+"'"}),null!=o&&g(E(r),function(){return "Error in maxPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+r+"."});var l=mo(s.shape,e,n,i,r,o,a),h=Nt.runKernelFunc(function(t,e){var n=t.maxPool3d(s,l);return e([s,n]),n},{x:s},function(t,a){var u=a[0],s=a[1];return {x:function(){return function(t,e,n,r,o,a,i,u){var s=ln(t,"dy","maxPool3dBackprop"),c=ln(e,"input","maxPool3dBackprop"),l=ln(n,"output","maxPool3dBackprop"),h=s,f=c,p=l,d=!1;4===c.rank&&(d=!0,h=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3]),f=c.as5D(1,c.shape[0],c.shape[1],c.shape[2],c.shape[3]),p=l.as5D(1,l.shape[0],l.shape[1],l.shape[2],l.shape[3])),g(5===h.rank,function(){return "Error in maxPool3dBackprop: dy must be rank 5 but got rank "+h.rank+"."}),g(5===f.rank,function(){return "Error in maxPool3dBackprop: input must be rank 5 but got rank "+f.rank+"."}),g(5===p.rank,function(){return "Error in maxPool3dBackprop: output must be rank 5 but got rank "+p.rank+"."}),null==a&&(a=[1,1,1]),g(Io(o,a),function(){return "Error in maxPool3dBackprop: Either strides or dilations must be 1. Got strides "+o+" and dilations '"+a+"'"}),null!=u&&g(E(i),function(){return "Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+u+" but got pad "+i+"."});var v=mo(f.shape,r,o,a,i,u),m=Nt.runKernelFunc(function(t){return t.maxPool3dBackprop(h,f,p,v)},{dy5D:h,input5D:f});return d?m.as4D(m.shape[1],m.shape[2],m.shape[3],m.shape[4]):m}(t,u,s,e,n,i,r,o)}}});return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),tl=Cn({avgPool3d_:function(t,e,n,r,o,a,i){void 0===a&&(a="NDHWC");var u=ln(t,"x","avgPool3d","float32"),s=u,c=!1;4===u.rank&&(c=!0,s=u.as5D(1,u.shape[0],u.shape[1],u.shape[2],u.shape[3])),null==i&&(i=[1,1,1]),g(5===s.rank,function(){return "Error in avgPool3d: x must be rank 5 but got rank "+s.rank+"."}),g("NDHWC"===a,function(){return "Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of "+a}),g(Io(n,i),function(){return "Error in avgPool3d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+i+"'"}),null!=o&&g(E(r),function(){return "Error in avgPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+r+"."});var l=mo(s.shape,e,n,i,r,o,a),h=Nt.runKernelFunc(function(t){return t.avgPool3d(s,l)},{x:s},function(t){return {x:function(){return function(t,e,n,r,o,a,i){var u=ln(t,"dy","avgPool3dBackprop"),s=ln(e,"input","avgPool3dBackprop"),c=u,l=s,h=!1;4===s.rank&&(h=!0,c=u.as5D(1,u.shape[0],u.shape[1],u.shape[2],u.shape[3]),l=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),g(5===c.rank,function(){return "Error in avgPool3dBackprop: dy must be rank 5 but got rank "+c.rank+"."}),g(5===l.rank,function(){return "Error in avgPool3dBackprop: input must be rank 5 but got rank "+l.rank+"."}),null==o&&(o=[1,1,1]),g(Io(r,o),function(){return "Error in avgPool3dBackprop: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+o+"'"}),null!=i&&g(E(a),function(){return "Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+a+"."});var f=mo(l.shape,n,r,o,a,i),p=Nt.runKernelFunc(function(t){return t.avgPool3dBackprop(c,l,f)},{dy5D:c,input5D:l});return h?p.as4D(p.shape[1],p.shape[2],p.shape[3],p.shape[4]):p}(t,s,e,n,i,r,o)}}});return h=h.cast(s.dtype),c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}});var el=Cn({slice_:function(t,e,n){var r,o,a=ln(t,"x","slice");if(0===a.rank)throw new Error("Slicing scalar is not possible");(r="number"==typeof e?[e].concat(new Array(a.rank-1).fill(0)):e.length<a.rank?e.concat(new Array(a.rank-e.length).fill(0)):e.slice()).forEach(function(t){g(-1!==t,function(){return "slice() does not support negative begin indexing."});}),o=(o=null==n?new Array(a.rank).fill(-1):"number"==typeof n?[n].concat(new Array(a.rank-1).fill(-1)):n.length<a.rank?n.concat(new Array(a.rank-n.length).fill(-1)):n).map(function(t,e){return t>=0?t:(g(-1===t,function(){return "Negative size values should be exactly -1 but got "+t+" for the slice() size at index "+e+"."}),a.shape[e]-r[e])}),qr(a,r,o);var i=a.shape,u={begin:r,size:o};return Nt.runKernelFunc(function(t){return t.slice(a,r,o)},{x:a},function(t){for(var e=[],n=0;n<t.rank;n++)e.push([r[n],i[n]-r[n]-o[n]]);return {x:function(){return t.pad(e)}}},"Slice",u)}}),nl=Cn({slice1d_:function(t,e,n){var r=ln(t,"x","slice1d");return g(1===r.rank,function(){return "slice1d expects a rank-1 tensor, but got a rank-"+r.rank+" tensor"}),el(r,[e],[n])}}),rl=Cn({slice2d_:function(t,e,n){var r=ln(t,"x","slice2d");return g(2===r.rank,function(){return "slice2d expects a rank-2 tensor, but got a rank-"+r.rank+" tensor"}),el(r,e,n)}}),ol=Cn({slice3d_:function(t,e,n){var r=ln(t,"x","slice3d");return g(3===r.rank,function(){return "slice3d expects a rank-3 tensor, but got a rank-"+r.rank+" tensor"}),el(r,e,n)}}),al=Cn({slice4d_:function(t,e,n){var r=ln(t,"x","slice4d");return g(4===r.rank,function(){return "slice4d expects a rank-4 tensor, but got a rank-"+r.rank+" tensor"}),el(r,e,n)}});function il(t,e,n,r,o){return e.rank<n.rank&&(e=e.reshape(vn(e.shape,r))),t.rank<n.rank&&(t=t.reshape(vn(t.shape,r))),{x:function(){var r=t.mul(n.equal(e).cast(t.dtype));return null==o?r:r.transpose(o)}}}var ul=Cn({all_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","all","bool"),o=D(e,r.shape),a=o,i=gn(a,r.rank);null!=i&&(r=r.transpose(i),a=xn(a.length,r.rank));var u=Nt.runKernelFunc(function(t){return t.all(r,a)},{$x:r});if(n){var s=vn(u.shape,o);return u.reshape(s)}return u}}),sl=Cn({any_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","any","bool"),o=D(e,r.shape),a=o,i=gn(a,r.rank);null!=i&&(r=r.transpose(i),a=xn(a.length,r.rank));var u=Nt.runKernelFunc(function(t){return t.any(r,a)},{$x:r});if(n){var s=vn(u.shape,o);return u.reshape(s)}return u}}),cl=Cn({argMax_:function(t,e){void 0===e&&(e=0);var n=ln(t,"x","argMax");null==e&&(e=0);var r=D(e,n.shape),o=gn(r,n.rank);return null!=o&&(n=n.transpose(o),r=xn(r.length,n.rank)),Nt.runKernelFunc(function(t,e){var o=t.argMax(n,r[0]);return e([n]),o},{$x:n},function(t,e){var n=e[0];return {$x:function(){return zn(n)}}})}}),ll=Cn({argMin_:function(t,e){void 0===e&&(e=0);var n=ln(t,"x","argMin");null==e&&(e=0);var r=D(e,n.shape),o=gn(r,n.rank);return null!=o&&(n=n.transpose(o),r=xn(r.length,n.rank)),Nt.runKernelFunc(function(t,e){var o=t.argMin(n,r[0]);return e([n]),o},{$x:n},function(t,e){var n=e[0];return {$x:function(){return zn(n)}}})}}),hl=Cn({logSumExp_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","logSumExp"),o=D(e,r.shape),a=r.max(o,!0),i=r.sub(a).exp().sum(o).log(),u=a.reshape(i.shape).add(i);if(n){var s=vn(u.shape,o);return u.reshape(s)}return u}}),fl=Cn({max_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","max"),o=r,a=D(e,r.shape),i=a,u=gn(i,r.rank);null!=u&&(r=r.transpose(u),i=xn(i.length,r.rank));var s=[r],c=Nt.runKernelFunc(function(t,e){var n=t.max(r,i);return e([o,n]),n},{x:r},function(t,e){return il(t,e[1],e[0],a,u)},"Max",{axes:i},s,[!0]);if(n){var l=vn(c.shape,a);c=c.reshape(l);}return c}}),pl=Cn({mean_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","mean"),o=D(e,r.shape),a=w(dn(r.shape,o)[1]);return oo(function(t){var r=An(a);return {value:(r.dtype===t.dtype?t:t.cast(r.dtype)).div(r).sum(e,n),gradFunc:function(e){var n=t.shape.slice();return o.forEach(function(t){n[t]=1;}),e.reshape(n).mul(Bn(t.shape,"float32")).div(a)}}})(r)}}),dl=Cn({min_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","min"),o=r,a=D(e,r.shape),i=a,u=gn(i,r.rank);null!=u&&(r=r.transpose(u),i=xn(i.length,r.rank));var s=[r],c=Nt.runKernelFunc(function(t,e){var n=t.min(r,i);return e([o,n]),n},{x:r},function(t,e){return il(t,e[1],e[0],a,u)},"Min",{axes:i},s,[!0]);if(n){var l=vn(c.shape,a);c=c.reshape(l);}return c}}),vl=Cn({moments_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=D(e,(t=ln(t,"x","moments")).shape),o=t.mean(r,n),a=o.shape;n||(a=vn(o.shape,r));var i=t.toFloat().sub(o.reshape(a)).square();return {mean:o,variance:i.mean(r,n)}}}),ml=Cn({sum_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","sum");"bool"===r.dtype&&(r=r.toInt());var o=D(e,r.shape);return oo(function(t){var e=gn(o,t.rank),r=o,a=t;null!=e&&(a=t.transpose(e),r=xn(r.length,t.rank));var i=Nt.runKernelFunc(function(t){return t.sum(a,r)},{permutedX:a});if(n){var u=vn(i.shape,o);i=i.reshape(u);}return {value:i,gradFunc:function(e){var n=t.shape.slice();return o.forEach(function(t){n[t]=1;}),e.reshape(n).mul(Bn(t.shape,"float32"))}}})(r)}}),gl=Cn({prod_:function(t,e,n){void 0===e&&(e=null),void 0===n&&(n=!1);var r=ln(t,"x","prod");"bool"===r.dtype&&(r=r.toInt());var o=D(e,r.shape),a=gn(o,r.rank),i=o,u=r;null!=a&&(u=r.transpose(a),i=xn(i.length,r.rank));var s=Nt.runKernelFunc(function(t){return t.prod(u,i)},{permutedX:u});if(n){var c=vn(s.shape,o);s=s.reshape(c);}return s}});var yl=Cn({elu_:function(t){var e=ln(t,"x","elu");return Nt.runKernelFunc(function(t,n){var r=t.elu(e);return n([r]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return Nt.runKernelFunc(function(e){return e.eluDer(t,n)},{dy:t,y:n})}}})}}),xl=Cn({leakyRelu_:function(t,e){void 0===e&&(e=.2);var n=ln(t,"x","leakyRelu");return $s(An(e).mul(n),n)}}),bl=Cn({prelu_:function(t,e){var n=ln(t,"x","prelu"),r=ln(e,"alpha","prelu");return Nt.runKernelFunc(function(t,e){var o=t.prelu(n,r);return e([n,r]),o},{x:n,alpha:r},function(t,e){var n=e[0],r=e[1],o=n.greater(0);return {x:function(){return Ws(o,t,t.mul(r))},alpha:function(){var e=Ws(o,zn(t),t.mul(n)),a=fo(r.shape,t.shape);return a.length>0&&(e=e.sum(a)),e.reshape(r.shape)}}},"Prelu")}}),wl=Cn({relu_:function(t){var e=ln(t,"x","relu");return "bool"===e.dtype?e.toInt():Nt.runKernelFunc(function(t,n){var r=t.relu(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){return t.mulStrict(n.step().toFloat())}}})}}),Cl=Cn({relu6_:function(t){var e=ln(t,"x","relu6");return "bool"===e.dtype?e.toInt():Nt.runKernelFunc(function(t,n){var r=t.relu6(e);return n([e]),r},{$x:e},function(t,e){var n=e[0],r=n.lessEqual(6).mul(n.step());return {$x:function(){return t.mulStrict(r.toFloat())}}})}}),El=Cn({selu_:function(t){var e=ln(t,"x","selu");return Nt.runKernelFunc(function(t,n){var r=t.selu(e);return n([e]),r},{$x:e},function(t,e){var n=e[0];return {$x:function(){var e=n.greater(An(0)),r=An(iu),o=An(uu),a=t.mul(o),i=t.mul(r).mul(n.toFloat().exp());return Ws(e,a,i)}}})}});var Rl=Cn({transpose_:function(t,e){var n=ln(t,"x","transpose");if(null==e&&(e=n.shape.map(function(t,e){return e}).reverse()),g(n.rank===e.length,function(){return "Error in transpose: rank of input "+n.rank+" must match length of perm "+e+"."}),e.forEach(function(t){g(t>=0&&t<n.rank,function(){return "All entries in 'perm' must be between 0 and "+(n.rank-1)+" but got "+e});}),n.rank<=1)return n.clone();var r={perm:e};return Nt.runKernelFunc(function(t){return t.transpose(n,e)},{x:n},function(t){var n=yn(e);return {x:function(){return t.transpose(n)}}},"Transpose",r)}});var Il=Cn({localResponseNormalization_:function(t,e,n,r,o){void 0===e&&(e=5),void 0===n&&(n=1),void 0===r&&(r=1),void 0===o&&(o=.5);var a=ln(t,"x","localResponseNormalization");g(4===a.rank||3===a.rank,function(){return "Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank "+a.rank+"."}),g(E(e),function(){return "Error in localResponseNormalization: depthRadius must be an integer but got depthRadius "+e+"."});var i=a,u=!1;3===a.rank&&(u=!0,i=a.as4D(1,a.shape[0],a.shape[1],a.shape[2]));var s=Nt.runKernelFunc(function(t,a){var u=t.localResponseNormalization4D(i,e,n,r,o);return a([i,u]),u},{x4D:i},function(t,a){var i=a[0],u=a[1];return {x4D:function(){return Nt.runKernelFunc(function(a){return a.LRNGrad(t,i,u,e,n,r,o)},{})}}});return u?s.as3D(s.shape[1],s.shape[2],s.shape[3]):s}});var kl=Cn({norm_:function(t,e,n,r){void 0===e&&(e="euclidean"),void 0===n&&(n=null),void 0===r&&(r=!1);var o=function t(e,n,r){if(void 0===r&&(r=null),0===e.rank)return e.abs();if(1!==e.rank&&null===r)return t(e.reshape([-1]),n,r);if(1===e.rank||"number"==typeof r||Array.isArray(r)&&1===r.length){if(1===n)return e.abs().sum(r);if(n===1/0)return e.abs().max(r);if(n===-1/0)return e.abs().min(r);if("euclidean"===n||2===n)return e.abs().pow(An(2,"int32")).sum(r).sqrt();throw new Error("Error in norm: invalid ord value: "+n)}if(Array.isArray(r)&&2===r.length){if(1===n)return e.abs().sum(r[0]).max(r[1]-1);if(n===1/0)return e.abs().sum(r[1]).max(r[0]);if(n===-1/0)return e.abs().sum(r[1]).min(r[0]);if("fro"===n||"euclidean"===n)return e.square().sum(r).sqrt();throw new Error("Error in norm: invalid ord value: "+n)}throw new Error("Error in norm: invalid axis: "+r)}(t=ln(t,"x","norm"),e,n),a=o.shape;if(r){var i=D(n,t.shape);a=vn(o.shape,i);}return o.reshape(a)}});var Sl=Cn({basicLSTMCell_:function(t,e,n,r,o,a){var i=ln(t,"forgetBias","basicLSTMCell"),u=ln(e,"lstmKernel","basicLSTMCell"),s=ln(n,"lstmBias","basicLSTMCell"),c=ln(r,"data","basicLSTMCell"),l=ln(o,"c","basicLSTMCell"),h=ln(a,"h","basicLSTMCell"),f=c.concat(h,1).matMul(u).add(s),p=f.shape[0],d=f.shape[1]/4,v=[p,d],m=f.slice([0,0],v),g=f.slice([0,d],v),y=f.slice([0,2*d],v),x=f.slice([0,3*d],v),b=m.sigmoid().mulStrict(g.tanh()).addStrict(l.mulStrict(i.add(y).sigmoid())),w=b.tanh().mulStrict(x.sigmoid());return [b,w]}}),Al=Cn({multiRNNCell_:function(t,e,n,r){for(var o=ln(e,"data","multiRNNCell"),a=hn(n,"c","multiRNNCell"),i=hn(r,"h","multiRNNCell"),u=o,s=[],c=0;c<t.length;c++){var l=t[c](u,a[c],i[c]);s.push(l[0]),s.push(l[1]),u=l[1];}var h=[],f=[];for(c=0;c<s.length;c+=2)h.push(s[c]),f.push(s[c+1]);return [h,f]}});var Dl=Cn({movingAverage_:function(t,e,n,r,o){void 0===o&&(o=!0);var a=ln(t,"v","movingAverage"),i=ln(e,"x","movingAverage"),u=ln(n,"decay","movingAverage");It(a,i),g(C(a.shape,i.shape),function(){return "Shape mismatch in v and x"});var s=An(1),c=s.sub(u),l=i.sub(a).mul(c);if(o){g(null!=r,function(){return "When using zeroDebias: true, step is required."});var h=ln(r,"step","movingAverage");l=l.div(s.sub(rc(u,h)));}return a.add(l)}});var Tl=Cn({stridedSlice_:function(t,e,n,r,o,a,i,u,s){if(void 0===o&&(o=0),void 0===a&&(a=0),void 0===i&&(i=0),void 0===u&&(u=0),void 0===s&&(s=0),null==r&&(r=new Array(e.length)),0!==i)throw new Error("ellipsis mask is not yet supported");var c=ln(t,"x","stridedSlice"),l=Kr(u),h=c.shape.slice();l.forEach(function(t){e[t]=0,n[t]=1,h.splice(t,0,1);}),c=c.reshape(h);for(var f=0;f<c.rank;f++)e[f]=Xr(o,e,r,c.shape,f),n[f]=$r(a,n,r,c.shape,f),r[f]=r[f]||1;var p=Kr(s);p.forEach(function(t){n[t]=e[t]+1,r[t]=1;});var d=jr(e,n,r),v=d.filter(function(t,e){return -1===p.indexOf(e)});return r.every(function(t){return 1===t})?el(c,e,d).reshape(v):Nt.runKernelFunc(function(t){return t.stridedSlice(c,e,n,r)},{$x:c}).reshape(v)}});var Nl=Cn({topk_:function(t,e,n){void 0===e&&(e=1),void 0===n&&(n=!0);var r=ln(t,"x","topk");if(0===r.rank)throw new Error("topk() expects the input to be of rank 1 or higher");var o=r.shape[r.shape.length-1];if(e>o)throw new Error("'k' passed to topk() must be <= the last dimension ("+o+") but got "+e);var a=Nt.runKernelFunc(function(t){return t.topk(r,e,n)},{$x:r});return {values:a[0],indices:a[1]}}});var Fl=Cn({scatterND_:function(t,e,n){var r=ln(t,"indices","scatterND","int32"),o=ln(e,"updates","scatterND");return Gr(o,r,n),Nt.runKernelFunc(function(t){return t.scatterND(r,o,n)},{$indices:r,$updates:o})}});var Ol=Cn({fft_:function(t){g("complex64"===t.dtype,function(){return "The dtype for tf.spectral.fft() must be complex64 but got "+t.dtype+"."});var e=t.shape[t.shape.length-1],n=t.size/e,r=t.as2D(n,e);return Nt.runKernelFunc(function(t){return t.fft(r)},{input:t}).reshape(t.shape)}}),_l=Cn({ifft_:function(t){g("complex64"===t.dtype,function(){return "The dtype for tf.spectral.ifft() must be complex64 but got "+t.dtype+"."});var e=t.shape[t.shape.length-1],n=t.size/e,r=t.as2D(n,e);return Nt.runKernelFunc(function(t){return t.ifft(r)},{input:t}).reshape(t.shape)}}),Ml=Cn({rfft_:function(t,e){g("float32"===t.dtype,function(){return "The dtype for rfft() must be real value but got "+t.dtype});var n,r=t.shape[t.shape.length-1],o=t.size/r;if(null!=e&&e<r){var a=t.shape.map(function(t){return 0}),i=t.shape.map(function(t){return t});i[t.shape.length-1]=e,n=t.slice(a,i),r=e;}else if(null!=e&&e>r){var u=t.shape.map(function(t){return t});u[t.shape.length-1]=e-r,n=t.concat(Pn(u),t.shape.length-1),r=e;}else n=t;var s=n.zerosLike(),c=En(n,s).as2D(o,r),l=Ol(c),h=Math.floor(r/2)+1,f=Rn(l),p=In(l),d=f.split([h,r-h],f.shape.length-1),v=p.split([h,r-h],p.shape.length-1),m=n.shape.slice();return m[n.shape.length-1]=h,En(d[0],v[0]).reshape(m)}}),Bl=Cn({irfft_:function(t){var e=t.shape[t.shape.length-1],n=t.size/e;if(e<=2){var r=t.as2D(n,e),o=_l(r);return Rn(o)}var a=[n,2*(e-1)],i=Rn(t).as2D(n,e),u=In(t).as2D(n,e),s=i.slice([0,1],[n,e-2]).reverse(1),c=u.slice([0,1],[n,e-2]).reverse(1).mul(An(-1)),l=i.concat(s,1),h=u.concat(c,1);return r=En(l,h).as2D(a[0],a[1]),o=_l(r),Rn(o)}}),Pl=Object.freeze({fft:Ol,ifft:_l,rfft:Ml,irfft:Bl});var Ll=Cn({sparseToDense_:function(t,e,n,r){void 0===r&&(r=0);var o=ln(t,"sparseIndices","sparseToDense","int32"),a=ln(e,"sparseValues","sparseToDense"),i=ln(r,"defaultValue","sparseToDense",a.dtype);return function(t,e,n,r){if("int32"!==t.dtype)throw new Error("tf.sparseToDense() expects the indices to be int32 type, but the dtype was "+t.dtype+".");if(t.rank>2)throw new Error("sparseIndices should be a scalar, vector, or matrix, but got shape "+t.shape+".");var o=t.rank>0?t.shape[0]:1,a=t.rank>1?t.shape[1]:1;if(n.length!==a)throw new Error("outputShape has incorrect number of elements:, "+n.length+", should be: "+a+".");var i=e.size;if(0!==e.rank&&(1!==e.rank||i!==o))throw new Error("sparseValues has incorrect shape "+e.shape+", should be [] or ["+o+"]");if(e.dtype!==r.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}(o,a,n,i),Nt.runKernelFunc(function(t){return t.sparseToDense(o,a,n,i)},{$sparseIndices:o,$sparseValues:a,$defaultValue:i})}});var Wl=Cn({gatherND_:function(t,e){var n=ln(e,"indices","gatherND","int32"),r=ln(t,"x","gatherND");return Nt.runKernelFunc(function(t){return t.gatherND(r,n)},{$x:r,$indices:n})}});var Ul=Cn({diag_:function(t){var e=ln(t,"x","diag").flatten(),n=t.shape.concat(t.shape);return Nt.runKernelFunc(function(t){return t.diag(e)},{$x:e}).reshape(n)}});var Vl=Cn({dropout_:function(t,e,n,r){var o=ln(t,"x","dropout");if(g("float32"===o.dtype,function(){return "x has to be a floating point tensor since it's going to be scaled, but got a "+o.dtype+" tensor instead."}),g(e>=0&&e<1,function(){return "rate must be a float in the range [0, 1), but got "+e+"."}),0===e)return t instanceof dt?o.clone():o;var a=function(t,e){if(null==e)return t.shape.slice();if(C(t.shape,e))return e;if(t.shape.length===e.length){for(var n=[],r=0;r<t.shape.length;r++)null==e[r]&&null!=t.shape[r]?n.push(t.shape[r]):n.push(e[r]);return n}return e}(o,n),i=1-e,u=kr(a,0,1,"float32",r).add(i).floor().div(i);return o.mul(u)}});function zl(t,e,n){for(var r=1-t%2,o=new Float32Array(t),a=0;a<t;++a){var i=2*Math.PI*a/(t+r-1);o[a]=e-n*Math.cos(i);}return Dn(o,"float32")}var Gl=Cn({hannWindow_:function(t){return zl(t,.5,.5)}}),Hl=Cn({hammingWindow_:function(t){return zl(t,.54,.46)}}),ql=Cn({frame_:function(t,e,n,r,o){void 0===r&&(r=!1),void 0===o&&(o=0);for(var a=0,i=[];a+e<=t.size;)i.push(el(t,a,e)),a+=n;if(r)for(;a<t.size;){var u=a+e-t.size,s=Gn([el(t,a,e-u),Ln([u],o)]);i.push(s),a+=n;}return 0===i.length?Tn([],[0,e]):Gn(i).as2D(i.length,e)}}),Kl=Cn({stft_:function(t,e,n,r,o){var a;void 0===o&&(o=Gl),null==r&&(a=e,r=Math.floor(Math.pow(2,Math.ceil(Math.log(a)/Math.log(2)))));for(var i=ql(t,e,n),u=ec(i,o(e)),s=[],c=0;c<i.shape[0];c++)s.push(Ml(u.slice([c,0],[1,e]),r));return Gn(s)}}),jl=Object.freeze({hannWindow:Gl,hammingWindow:Hl,frame:ql,stft:Kl});var Xl,$l=function(t,e,o){return void 0===o&&(o=1),n(this,void 0,void 0,function(){var n,a,i,u,s,c,l,h,f,p,d,v,m,x;return r(this,function(r){switch(r.label){case 0:return n=ln(t,"predictions","inTopK"),a=ln(e,"targets","inTopK"),g(n.rank>1,function(){return "inTopK() expects the predictions to be of rank 2 or higher, but got "+n.rank}),g(n.rank-1===a.rank,function(){return "predictions rank should be 1 larger than targets rank, but got predictions rank "+n.rank+" and targets rank "+a.rank}),y(n.shape.slice(0,n.shape.length-1),a.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),i=n.shape[n.shape.length-1],g(o>0&&o<=i,function(){return "'k' passed to inTopK() must be > 0 && <= the predictions last dimension ("+i+"), but got "+o}),[4,n.data()];case 1:return u=r.sent(),[4,a.data()];case 2:for(s=r.sent(),c=[u.length/i,i],h=c[1],f=N("bool",l=c[0]),p=0;p<l;p++){for(d=p*h,v=u.subarray(d,d+h),m=[],x=0;x<v.length;x++)m.push({value:v[x],index:x});for(m.sort(function(t,e){return e.value-t.value}),f[p]=0,x=0;x<o;x++)if(m[x].index===s[p]){f[p]=1;break}}return t!==n&&n.dispose(),e!==a&&a.dispose(),[2,kn(f,a.shape,"bool")]}})})};!function(t){t[t.NONE=0]="NONE",t[t.MEAN=1]="MEAN",t[t.SUM=2]="SUM",t[t.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS";}(Xl||(Xl={}));var Yl=Cn({absoluteDifference_:function(t,e,n,r){void 0===r&&(r=Xl.SUM_BY_NONZERO_WEIGHTS);var o=ln(t,"labels","absoluteDifference"),a=ln(e,"predictions","absoluteDifference"),i=null;null!=n&&(i=ln(n,"weights","absoluteDifference")),y(o.shape,a.shape,"Error in absoluteDifference: ");var u=o.sub(a).abs();return Ql(u,i,r)}}),Ql=Cn({computeWeightedLoss_:function(t,e,n){void 0===n&&(n=Xl.SUM_BY_NONZERO_WEIGHTS);var r=ln(t,"losses","computeWeightedLoss"),o=null;null!=e&&(o=ln(e,"weights","computeWeightedLoss"));var a=null==o?r:r.mul(o);if(n===Xl.NONE)return a;if(n===Xl.SUM)return a.sum();if(n===Xl.MEAN){if(null==o)return a.mean();var i=r.size/o.size,u=a.sum().div(o.sum());return i>1?u.div(An(i)):u}if(n===Xl.SUM_BY_NONZERO_WEIGHTS){if(null==o)return a.sum().div(An(r.size));var s=o.mul(Bn(r.shape)).notEqual(An(0)).sum().toFloat();return a.sum().div(s)}throw Error("Unknown reduction: "+n)}}),Jl=Cn({cosineDistance_:function(t,e,n,r,o){void 0===o&&(o=Xl.SUM_BY_NONZERO_WEIGHTS);var a=ln(t,"labels","cosineDistance"),i=ln(e,"predictions","cosineDistance"),u=null;null!=r&&(u=ln(r,"weights","cosineDistance")),y(a.shape,i.shape,"Error in cosineDistance: ");var s=An(1).sub(a.mul(i).sum(n,!0));return Ql(s,u,o)}}),Zl=Cn({hingeLoss_:function(t,e,n,r){void 0===r&&(r=Xl.SUM_BY_NONZERO_WEIGHTS);var o=ln(t,"labels","hingeLoss"),a=ln(e,"predictions","hingeLoss"),i=null;null!=n&&(i=ln(n,"weights","hingeLoss")),y(o.shape,a.shape,"Error in hingeLoss: ");var u=An(1);o=An(2).mul(o).sub(u);var s=u.sub(o.mul(a)).relu();return Ql(s,i,r)}}),th=Cn({huberLoss_:function(t,e,n,r,o){void 0===r&&(r=1),void 0===o&&(o=Xl.SUM_BY_NONZERO_WEIGHTS);var a=ln(t,"labels","huberLoss"),i=ln(e,"predictions","huberLoss"),u=null;null!=n&&(u=ln(n,"weights","huberLoss")),y(a.shape,i.shape,"Error in huberLoss: ");var s=An(r),c=i.sub(a).abs(),l=Qs(c,s),h=c.sub(l),f=An(.5).mul(l.square()).add(s.mul(h));return Ql(f,u,o)}}),eh=Cn({logLoss_:function(t,e,n,r,o){void 0===r&&(r=1e-7),void 0===o&&(o=Xl.SUM_BY_NONZERO_WEIGHTS);var a=ln(t,"labels","logLoss"),i=ln(e,"predictions","logLoss"),u=null;null!=n&&(u=ln(n,"weights","logLoss")),y(a.shape,i.shape,"Error in logLoss: ");var s=An(1),c=An(r),l=a.mul(i.add(c).log()).neg().sub(s.sub(a).mul(s.sub(i).add(c).log()));return Ql(l,u,o)}}),nh=Cn({meanSquaredError_:function(t,e,n,r){void 0===r&&(r=Xl.SUM_BY_NONZERO_WEIGHTS);var o=ln(t,"labels","meanSquaredError"),a=ln(e,"predictions","meanSquaredError"),i=null;null!=n&&(i=ln(n,"weights","meanSquaredError")),y(o.shape,a.shape,"Error in meanSquaredError: ");var u=o.squaredDifference(a);return Ql(u,i,r)}}),rh=Cn({sigmoidCrossEntropy_:function(t,e,n,r,o){void 0===r&&(r=0),void 0===o&&(o=Xl.SUM_BY_NONZERO_WEIGHTS);var a=ln(t,"multiClassLabels","sigmoidCrossEntropy"),i=ln(e,"logits","sigmoidCrossEntropy"),u=null;if(null!=n&&(u=ln(n,"weights","sigmoidCrossEntropy")),y(a.shape,i.shape,"Error in sigmoidCrossEntropy: "),r>0){var s=An(r),c=An(1),l=An(.5);a=a.mul(c.sub(s)).add(l.mul(s));}var h=function(t,e){var n=ln(t,"labels","sigmoidCrossEntropyWithLogits"),r=ln(e,"logits","sigmoidCrossEntropyWithLogits");y(n.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");var o=r.relu(),a=r.mul(n),i=r.abs().neg().exp().log1p();return o.sub(a).add(i)}(a,i);return Ql(h,u,o)}}),oh=Cn({softmaxCrossEntropy_:function(t,e,n,r,o){void 0===r&&(r=0),void 0===o&&(o=Xl.SUM_BY_NONZERO_WEIGHTS);var a=ln(t,"onehotLabels","softmaxCrossEntropy"),i=ln(e,"logits","softmaxCrossEntropy"),u=null;if(null!=n&&(u=ln(n,"weights","softmaxCrossEntropy")),y(a.shape,i.shape,"Error in softmaxCrossEntropy: "),r>0){var s=An(r),c=An(1),l=An(a.shape[1]);a=a.mul(c.sub(s)).add(s.div(l));}var h=function(t,e,n){if(void 0===n&&(n=-1),-1===n&&(n=e.rank-1),n!==e.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank "+e.rank+" and dim was "+n);return oo(function(t,e,r){var o=e.logSumExp([n],!0),a=e.toFloat().sub(o);return r([t,a]),{value:a.mul(t).neg().sum([n]),gradFunc:function(t,e){var r=e[0],o=e[1],a=vn(t.shape,[n]);return [t.reshape(a).mul(r.toFloat().sub(o.exp())),t.reshape(a).mul(o.exp().sub(r.toFloat()))]}}})(t,e)}(a,i);return Ql(h,u,o)}}),ah=Object.freeze({get Reduction(){return Xl},absoluteDifference:Yl,computeWeightedLoss:Ql,cosineDistance:Jl,hingeLoss:Zl,huberLoss:th,logLoss:eh,meanSquaredError:nh,sigmoidCrossEntropy:rh,softmaxCrossEntropy:oh});function ih(t,e){return void 0===e&&(e=!1),Nt.tidy(function(){if(2!==t.shape.length)throw new Error("qr2d() requires a 2D Tensor, but got a "+t.shape.length+"D Tensor.");for(var n=t.shape[0],r=t.shape[1],o=vr(n),a=t.clone(),i=Tn([[1]],[1,1]),u=i.clone(),s=n>=r?r:n,c=function(t){var e,s=a,c=u,l=o;e=Nt.tidy(function(){var e=a.slice([t,t],[n-t,1]),s=e.norm(),c=a.slice([t,t],[1,1]),l=Tn([[-1]]).where(c.greater(0),Tn([[1]])),h=c.sub(l.mul(s)),f=e.div(h);u=1===f.shape[0]?i.clone():i.concat(f.slice([1,0],[f.shape[0]-1,f.shape[1]]),0);var p=l.matMul(h).div(s).neg(),d=a.slice([t,0],[n-t,r]),v=p.mul(u);if(0===t)a=d.sub(v.matMul(u.transpose().matMul(d)));else{var m=d.sub(v.matMul(u.transpose().matMul(d)));a=a.slice([0,0],[t,r]).concat(m,0);}var g=o.slice([0,t],[n,o.shape[1]-t]);if(0===t)o=g.sub(g.matMul(u).matMul(v.transpose()));else{var y=g.sub(g.matMul(u).matMul(v.transpose()));o=o.slice([0,0],[n,t]).concat(y,1);}return [u,a,o]}),u=e[0],a=e[1],o=e[2],Xe([s,c,l]);},l=0;l<s;++l)c(l);return !e&&n>r&&(o=o.slice([0,0],[n,r]),a=a.slice([0,0],[r,r])),[o,a]})}var uh=Cn({gramSchmidt_:function(t){var e;if(Array.isArray(t)){e=!1,g(null!=t&&t.length>0,function(){return "Gram-Schmidt process: input must not be null, undefined, or empty"});for(var n=t[0].shape[0],r=function(e){g(t[e].shape[0]===n,function(){return "Gram-Schmidt: Non-unique lengths found in the input vectors: ("+t[e].shape[0]+" vs. "+n+")"});},o=1;o<t.length;++o)r(o);}else e=!0,t=Xn(t,t.shape[0],0).map(function(t){return Dr(t,[0])});g(t.length<=t[0].shape[0],function(){return "Gram-Schmidt: Number of vectors ("+t.length+") exceeds number of dimensions ("+t[0].shape[0]+")."});var a=[],i=t,u=function(t){a.push(Nt.tidy(function(){var e=i[t];if(t>0)for(var n=0;n<t;++n){var r=ml(a[n].mulStrict(e)).mul(a[n]);e=e.sub(r);}return e.div(kl(e,"euclidean"))}));};for(o=0;o<t.length;++o)u(o);return e?Tr(a,0):a}}),sh=Cn({qr_:function(t,e){if(void 0===e&&(e=!1),t.rank<2)throw new Error("qr() requires input tensor to have a rank >= 2, but got rank "+t.rank);if(2===t.rank)return ih(t,e);var n=t.shape.slice(0,t.shape.length-2).reduce(function(t,e){return t*e}),r=Or(t.reshape([n,t.shape[t.shape.length-2],t.shape[t.shape.length-1]]),0),o=[],a=[];return r.forEach(function(t){var n=ih(t,e),r=n[0],i=n[1];o.push(r),a.push(i);}),[Tr(o,0).reshape(t.shape),Tr(a,0).reshape(t.shape)]}}),ch=Object.freeze({gramSchmidt:uh,qr:sh});function lh(t,e,n,r,o){null==r&&(r=.5),null==o&&(o=Number.NEGATIVE_INFINITY);var a=t.shape[0];return n=Math.min(n,a),g(0<=r&&r<=1,function(){return "iouThreshold must be in [0, 1], but was '"+r+"'"}),g(2===t.rank,function(){return "boxes must be a 2D tensor, but was of rank '"+t.rank+"'"}),g(4===t.shape[1],function(){return "boxes must have 4 columns, but 2nd dimension was "+t.shape[1]}),g(1===e.rank,function(){return "scores must be a 1D tensor"}),g(e.shape[0]===a,function(){return "scores has incompatible shape with boxes. Expected "+a+", but was "+e.shape[0]}),{maxOutputSize:n,iouThreshold:r,scoreThreshold:o}}var hh=Cn({resizeBilinear_:function(t,e,n){void 0===n&&(n=!1);var r=ln(t,"images","resizeBilinear");g(3===r.rank||4===r.rank,function(){return "Error in resizeBilinear: x must be rank 3 or 4, but got rank "+r.rank+"."}),g(2===e.length,function(){return "Error in resizeBilinear: new shape must 2D, but got shape "+e+"."});var o=r,a=!1;3===r.rank&&(a=!0,o=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var i=e[0],u=e[1],s=Nt.runKernelFunc(function(t,e){return e([o]),t.resizeBilinear(o,i,u,n)},{batchImages:o},function(t,e){return {batchImages:function(){return Nt.runKernelFunc(function(r){return r.resizeBilinearBackprop(t,e[0],n)},{})}}});return a?s.as3D(s.shape[1],s.shape[2],s.shape[3]):s}}),fh=Cn({resizeNearestNeighbor_:function(t,e,n){void 0===n&&(n=!1);var r=ln(t,"images","resizeNearestNeighbor");g(3===r.rank||4===r.rank,function(){return "Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank "+r.rank+"."}),g(2===e.length,function(){return "Error in resizeNearestNeighbor: new shape must 2D, but got shape "+e+"."}),g("float32"===r.dtype||"int32"===r.dtype,function(){return "`images` must have `int32` or `float32` as dtype"});var o=r,a=!1;3===r.rank&&(a=!0,o=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var i=e[0],u=e[1],s=Nt.runKernelFunc(function(t,e){return e([o]),t.resizeNearestNeighbor(o,i,u,n)},{batchImages:o},function(t,e){return {batchImages:function(){return Nt.runKernelFunc(function(r){return r.resizeNearestNeighborBackprop(t,e[0],n)},{})}}});return a?s.as3D(s.shape[1],s.shape[2],s.shape[3]):s}}),ph=Cn({nonMaxSuppression_:function(t,e,n,r,o){void 0===r&&(r=.5),void 0===o&&(o=Number.NEGATIVE_INFINITY);var a=ln(t,"boxes","nonMaxSuppression"),i=ln(e,"scores","nonMaxSuppression"),u=lh(a,i,n,r,o);return n=u.maxOutputSize,r=u.iouThreshold,o=u.scoreThreshold,Nt.runKernelFunc(function(t){return t.nonMaxSuppression(a,i,n,r,o)},{$boxes:a})}}),dh=function(t,e,o,a,i){return void 0===a&&(a=.5),void 0===i&&(i=Number.NEGATIVE_INFINITY),n(this,void 0,void 0,function(){var n,u,s,c,l,h,f;return r(this,function(r){switch(r.label){case 0:return n=ln(t,"boxes","nonMaxSuppressionAsync"),u=ln(e,"scores","nonMaxSuppressionAsync"),s=lh(n,u,o,a,i),o=s.maxOutputSize,a=s.iouThreshold,i=s.scoreThreshold,[4,Promise.all([n.data(),u.data()])];case 1:return c=r.sent(),l=c[0],h=c[1],f=Mo(l,h,o,a,i),n!==t&&n.dispose(),u!==e&&u.dispose(),[2,f]}})})},vh=Cn({cropAndResize_:function(t,e,n,r,o,a){var i=ln(t,"image","cropAndResize","float32"),u=ln(e,"boxes","cropAndResize","float32"),s=ln(n,"boxInd","cropAndResize","int32");o=o||"bilinear",a=a||0;var c=u.shape[0];return g(4===i.rank,function(){return "Error in cropAndResize: image must be rank 4,but got rank "+i.rank+"."}),g(2===u.rank&&4===u.shape[1],function(){return "Error in cropAndResize: boxes must be have size ["+c+",4] but had shape "+u.shape+"."}),g(1===s.rank&&s.shape[0]===c,function(){return "Error in cropAndResize: boxInd must be have size ["+c+"] but had shape "+u.shape+"."}),g(2===r.length,function(){return "Error in cropAndResize: cropSize must be of length 2, but got length "+r.length+"."}),g(r[0]>=1&&r[1]>=1,function(){return "cropSize must be atleast [1,1], but was "+r}),g("bilinear"===o||"nearest"===o,function(){return "method must be bilinear or nearest, but was "+o}),Nt.runKernelFunc(function(t,e){return t.cropAndResize(i,u,s,r,o,a)},{images:i,boxes:u,boxInd:s},null,"CropAndResize",{method:o,extrapolationValue:a,cropSize:r})}}),mh=Object.freeze({resizeBilinear:hh,resizeNearestNeighbor:fh,nonMaxSuppression:ph,nonMaxSuppressionAsync:dh,cropAndResize:vh}),gh=function(t,e){return !(t>0)&&("linear"===e||"relu"===e)},yh=function(t,e,n){if(null==n||"linear"===n)return t;if("relu"===n)return t.mul(e.step());throw new Error("Gradient for activation "+n+" has not been implemented yet.")},xh=function(t,e){var n=e,r=fo(t.shape,e.shape);return r.length>0&&(n=n.sum(r)),n.reshape(t.shape)},bh=function(t,e,n){if("linear"===e)return t;if("relu"===e)return wl(t);if("elu"===e)return yl(t);if("relu6"===e)return Cl(t);if("prelu"===e)return bl(t,n);throw new Error("Unknown fused activation "+e+".")};var wh=Cn({matMul_:function(t){var e,n=t.a,r=t.b,o=t.transposeA,a=void 0!==o&&o,i=t.transposeB,u=void 0!==i&&i,s=t.bias,c=t.activation,l=void 0===c?"linear":c,h=t.preluActivationWeights;if(!1===gh(Nt.state.gradientDepth,l)){var f=Uc(n,r,a,u);return null!=s&&(f=Vs(f,s)),bh(f,l,h)}var p=ln(n,"a","fused matMul"),d=ln(r,"b","fused matMul");e=Rt(p,d),p=e[0],d=e[1];var v=a?p.shape[p.rank-2]:p.shape[p.rank-1],m=u?d.shape[d.rank-1]:d.shape[d.rank-2],y=a?p.shape[p.rank-1]:p.shape[p.rank-2],x=u?d.shape[d.rank-2]:d.shape[d.rank-1],b=p.shape.slice(0,-2),E=d.shape.slice(0,-2),R=w(b),I=w(E);g(p.rank>=2&&d.rank>=2&&p.rank===d.rank,function(){return "Error in fused matMul: inputs must have the same rank of at least 2, got ranks "+p.rank+" and "+d.rank+"."}),g(C(b,E),function(){return "Error in fused matMul: outer dimensions ("+b+") and ("+E+") of Tensors with shapes "+p.shape+" and "+d.shape+" must match."}),g(v===m,function(){return "Error in fused matMul: inner shapes ("+v+") and ("+m+") of Tensors with shapes "+p.shape+" and "+d.shape+" and transposeA="+a+" and transposeB="+u+" must match."});var k,S,A=p.shape.slice(0,-2).concat([y,x]),D=a?p.as3D(R,v,y):p.as3D(R,y,v),T=u?d.as3D(I,x,m):d.as3D(I,m,x);null!=s&&po(A,(k=Rt(k=ln(s,"bias","fused matMul"),p)[0]).shape),null!=h&&(S=ln(h,"prelu weights","fused matMul"));var N={$a:D,$b:T};return null!=s&&(N.$bias=k),null!=h&&(N.$preluActivationWeights=S),Nt.runKernelFunc(function(t,e){var n=t.fusedBatchMatMul({a:D,b:T,transposeA:a,transposeB:u,bias:k,activation:l,preluActivationWeights:S});return e([D,T,n]),n},N,function(t,e){var n=e[0],r=e[1],o=e[2],i=yh(t,o,l),c={};return null!=s&&(c={$bias:function(){return xh(k,i)}}),a||u?!a&&u?Object.assign({$a:function(){return i.matMul(r,!1,!1)},$b:function(){return i.matMul(n,!0,!1)}},c):a&&!u?Object.assign({$a:function(){return r.matMul(i,!1,!0)},$b:function(){return n.matMul(i,!1,!1)}},c):Object.assign({$a:function(){return r.matMul(i,!0,!0)},$b:function(){return i.matMul(n,!0,!0)}},c):Object.assign({$a:function(){return i.matMul(r,!1,!0)},$b:function(){return n.matMul(i,!0,!1)}},c)}).reshape(A)}}),Ch=Cn({conv2d_:function(t){var e=t.x,n=t.filter,r=t.strides,o=t.pad,a=t.dataFormat,i=void 0===a?"NHWC":a,u=t.dilations,s=void 0===u?[1,1]:u,c=t.dimRoundingMode,l=t.bias,h=t.activation,f=void 0===h?"linear":h,p=t.preluActivationWeights;if(f=f||"linear",!1===gh(Nt.state.gradientDepth,f)){var d=Tc(e,n,r,o,i,s,c);return null!=l&&(d=Vs(d,l)),bh(d,f,p)}var v=ln(e,"x","conv2d"),m=ln(n,"filter","conv2d"),y=v,x=!1;3===v.rank&&(x=!0,y=v.as4D(1,v.shape[0],v.shape[1],v.shape[2])),g(4===y.rank,function(){return "Error in fused conv2d: input must be rank 4, but got rank "+y.rank+"."}),g(4===m.rank,function(){return "Error in fused conv2d: filter must be rank 4, but got rank "+m.rank+"."}),null!=c&&g(E(o),function(){return "Error in fused conv2d: pad must be an integer when using, dimRoundingMode "+c+" but got pad "+o+"."}),g(y.shape[3]===m.shape[2],function(){return "Error in conv2d: depth of input ("+y.shape[3]+") must match input depth for filter "+m.shape[2]+"."}),g(Io(r,s),function(){return "Error in conv2D: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+s+"'"}),g("NHWC"===i,function(){return "Error in conv2d: got dataFormat of "+i+" but only NHWC is currently supported."});var b,w,C=go(y.shape,m.shape,r,s,o,c);null!=l&&(b=Rt(b=ln(l,"bias","fused conv2d"),v)[0],po(C.outShape,b.shape)),null!=p&&(w=ln(p,"prelu weights","fused conv2d"));var R={x:y,filter:m};null!=l&&(R.bias=b),null!=p&&(R.preluActivationWeights=w);var I=[m,y],k=Nt.runKernelFunc(function(t,e){var n=t.fusedConv2d({input:y,filter:m,convInfo:C,bias:b,activation:f,preluActivationWeights:w});return e([m,y,n]),n},R,function(t,e){var n=e,a=n[0],i=n[1],u=n[2],c=yh(t,u,f);g(Ro(s),function(){return "Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+s+"'"});var h={};return null!=l&&(h={$bias:function(){return xh(b,c)}}),Object.assign({x:function(){return Oc(i.shape,c,a,r,o)},filter:function(){return Fc(i,c,a.shape,r,o)}},h)},"FusedConv2D",{convInfo:C,activation:f},I,[!0]);return x?k.as3D(k.shape[1],k.shape[2],k.shape[3]):k}}),Eh=Cn({depthwiseConv2d_:function(t){var e=t.x,n=t.filter,r=t.strides,o=t.pad,a=t.dataFormat,i=void 0===a?"NHWC":a,u=t.dilations,s=void 0===u?[1,1]:u,c=t.dimRoundingMode,l=t.bias,h=t.activation,f=void 0===h?"linear":h,p=t.preluActivationWeights;if(!1===gh(Nt.state.gradientDepth,f)){var d=_c(e,n,r,o,i,s,c);return null!=l&&(d=Vs(d,l)),bh(d,f,p)}var v=ln(e,"x","depthwiseConv2d"),m=ln(n,"filter","depthwiseConv2d"),y=v,x=!1;3===v.rank&&(x=!0,y=v.as4D(1,v.shape[0],v.shape[1],v.shape[2])),g(4===y.rank,function(){return "Error in fused depthwiseConv2d: input must be rank 4, but got rank "+y.rank+"."}),g(4===m.rank,function(){return "Error in fused depthwiseConv2d: filter must be rank 4, but got rank "+m.rank+"."}),g(y.shape[3]===m.shape[2],function(){return "Error in fused depthwiseConv2d: number of input channels ("+y.shape[3]+") must match the inChannels dimension in filter "+m.shape[2]+"."}),null==s&&(s=[1,1]),g(Io(r,s),function(){return "Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides "+r+" and dilations '"+s+"'"}),null!=c&&g(E(o),function(){return "Error in fused depthwiseConv2d: pad must be an integer when using dimRoundingMode "+c+" but got pad "+o+"."});var b,w,C=go(y.shape,m.shape,r,s,o,c,!0);null!=l&&(b=Rt(b=ln(l,"bias","fused conv2d"),v)[0],po(C.outShape,b.shape)),null!=p&&(w=ln(p,"prelu weights","fused depthwiseConv2d"));var R={x:y,$filter:m};null!=l&&(R.$bias=b),null!=p&&(R.$preluActivationWeights=w);var I=Nt.runKernelFunc(function(t,e){var n=t.fusedDepthwiseConv2D({input:y,filter:m,convInfo:C,bias:b,activation:f,preluActivationWeights:w});return e([y,m,n]),n},R,function(t,e){g(Ro(s),function(){return "Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+s+"'"});var n=e[0],r=e[1],o=e[2],a=yh(t,o,f),i={};return null!=l&&(i={$bias:function(){return xh(b,a)}}),Object.assign({x:function(){return Mc(n.shape,a,r,C)},$filter:function(){return Bc(n,a,r.shape,C)}},i)});return x?I.as3D(I.shape[1],I.shape[2],I.shape[3]):I}}),Rh=Object.freeze({matMul:wh,conv2d:Ch,depthwiseConv2d:Eh}),Ih=Object.freeze({image:mh,linalg:ch,losses:ah,spectral:Pl,fused:Rh,signal:jl,square:Uu,conv1d:Dc,conv2d:Tc,conv3d:Nc,depthwiseConv2d:_c,separableConv2d:Pc,conv2dTranspose:Lc,conv3dTranspose:Wc,op:Cn,batchNormalization2d:Ss,batchNormalization3d:As,batchNormalization4d:Ds,batchNormalization:Ts,batchNorm:Ns,batchNorm2d:Fs,batchNorm3d:Os,batchNorm4d:_s,booleanMaskAsync:Ic,complex:En,real:Rn,imag:In,concat:Gn,concat1d:Hn,concat2d:qn,concat3d:Kn,concat4d:jn,split:Xn,matMul:Uc,dot:Vc,outerProduct:zc,reverse:Gc,reverse1d:Hc,reverse2d:qc,reverse3d:Kc,reverse4d:jc,maxPool:Yc,avgPool:Qc,pool:Jc,maxPool3d:Zc,avgPool3d:tl,slice:el,slice1d:nl,slice2d:rl,slice3d:ol,slice4d:al,abs:Vu,acos:zu,acosh:Gu,asin:Hu,asinh:qu,atan:Ku,atanh:ju,ceil:Xu,clipByValue:$u,cos:Yu,cosh:Qu,erf:Ju,exp:Zu,expm1:ts,floor:es,log:ns,log1p:rs,logSigmoid:os,neg:as,reciprocal:is$2,round:us,rsqrt:ss,sigmoid:cs,sign:ls,isNaN:hs,isInf:fs,isFinite:ps,sin:ds,sinh:vs,softplus:ms,sqrt:gs,step:ys,tan:xs,tanh:bs,all:ul,any:sl,argMax:cl,argMin:ll,logSumExp:hl,max:fl,mean:pl,min:dl,moments:vl,sum:ml,prod:gl,equal:cc,equalStrict:lc,greater:hc,greaterEqual:fc,greaterEqualStrict:pc,greaterStrict:dc,less:vc,lessEqual:mc,lessEqualStrict:gc,lessStrict:yc,notEqual:xc,notEqualStrict:bc,add:Vs,addN:zs,addStrict:Gs,atan2:Hs,div:qs,divNoNan:Ks,divStrict:js,floorDiv:Xs,maximum:$s,maximumStrict:Ys,minimum:Qs,minimumStrict:Js,mod:Zs,modStrict:tc,mul:ec,mulStrict:nc,pow:rc,powStrict:oc,squaredDifference:ac,squaredDifferenceStrict:ic,sub:uc,subStrict:sc,elu:yl,leakyRelu:xl,prelu:bl,relu:wl,relu6:Cl,selu:El,logicalAnd:Ms,logicalNot:Bs,logicalOr:Ps,logicalXor:Ls,where:Ws,whereAsync:Us,buffer:ur,print:sr,batchToSpaceND:cr,cast:lr,clone:hr,cumsum:fr,depthToSpace:pr,expandDims:dr,eye:vr,multinomial:mr,oneHot:gr,pad:yr,pad1d:xr,pad2d:br,pad3d:wr,pad4d:Cr,rand:Er,randomNormal:Rr,randomGamma:Ir,randomUniform:kr,reshape:Sr,spaceToBatchND:Ar,squeeze:Dr,stack:Tr,tile:Nr,truncatedNormal:Fr,unstack:Or,setdiff1dAsync:_r,fill:Ln,linspace:Wn,ones:Bn,range:Un,scalar:An,tensor:kn,tensor1d:Dn,tensor2d:Tn,tensor3d:Nn,tensor4d:Fn,tensor5d:On,tensor6d:_n,variable:Mn,zeros:Pn,onesLike:Vn,zerosLike:zn,transpose:Rl,softmax:io,logSoftmax:uo,localResponseNormalization:Il,norm:kl,gather:Ec,unsortedSegmentSum:Rc,basicLSTMCell:Sl,multiRNNCell:Al,movingAverage:Dl,stridedSlice:Tl,topk:Nl,scatterND:Fl,fft:Ol,ifft:_l,rfft:Ml,irfft:Bl,sparseToDense:Ll,gatherND:Wl,diag:Ul,dropout:Vl,hannWindow:Gl,hammingWindow:Hl,frame:ql,stft:Kl,inTopKAsync:$l});function kh(t,e){Array.isArray(t)||(t=[t]),t.forEach(function(t){null!=t&&g("complex64"!==t.dtype,function(){return e+" does not support complex64 tensors."});});}function Sh(t,e,n,r){if("linear"===n)return t.linear(e);if("relu"===n)return t.relu(e);if("elu"===n)return t.elu(e);if("relu6"===n)return t.relu6(e);if("prelu"===n)return t.prelu(e,r);throw new Error("Activation "+n+" has not been implemented for the CPU backend.")}var Ah=function(t){function o(){var e=t.call(this)||this;if(e.blockSize=48,e.firstUse=!0,a().get("IS_BROWSER")){var n="undefined"!=typeof OffscreenCanvas?new OffscreenCanvas(300,150):"undefined"!=typeof document?document.createElement("canvas"):null;null!==n&&(e.fromPixels2DContext=n.getContext("2d"));}return e.data=new so(e,Nt),e}return e(o,t),o.prototype.write=function(t,e,n){this.firstUse&&(this.firstUse=!1,a().get("IS_NODE")&&un("\n============================\nHi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.\n============================\n"));var r={};return this.data.set(r,{values:t,dtype:n}),r},o.prototype.move=function(t,e,n,r){this.data.set(t,{values:e,dtype:r});},o.prototype.numDataIds=function(){return this.data.numDataIds()},o.prototype.fromPixels=function(t,e){if(null==t)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");var n,r,o=t.data instanceof Uint8Array,i="undefined"!=typeof ImageData&&t instanceof ImageData,u="undefined"!=typeof HTMLVideoElement&&t instanceof HTMLVideoElement,s="undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement,c=u?[t.videoWidth,t.videoHeight]:[t.width,t.height],l=c[0],h=c[1];if(a().get("IS_NODE")&&null==t.getContext)throw new Error("When running in node, pixels must be an HTMLCanvasElement like the one returned by the `canvas` npm package");if(null!=t.getContext)n=t.getContext("2d").getImageData(0,0,l,h).data;else if(i||o)n=t.data;else{if(!s&&!u)throw new Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData or {data: Uint32Array, width: number, height: number}, but was "+t.constructor.name);if(null==this.fromPixels2DContext)throw new Error("Can't read pixels from HTMLImageElement outside the browser.");this.fromPixels2DContext.canvas.width=l,this.fromPixels2DContext.canvas.height=h,this.fromPixels2DContext.drawImage(t,0,0,l,h),n=this.fromPixels2DContext.getImageData(0,0,l,h).data;}if(4===e)r=new Int32Array(n);else{var f=l*h;r=new Int32Array(f*e);for(var p=0;p<f;p++)for(var d=0;d<e;++d)r[p*e+d]=n[4*p+d];}return Nn(r,[h,l,e],"int32")},o.prototype.read=function(t){return n(this,void 0,void 0,function(){return r(this,function(e){return [2,this.readSync(t)]})})},o.prototype.readSync=function(t){var e=this.data.get(t),n=e.dtype,r=e.complexTensors;return "complex64"===n?No(this.readSync(r.real.dataId),this.readSync(r.imag.dataId)):this.data.get(t).values},o.prototype.bufferSync=function(t){var e=this.readSync(t.dataId),n=e;if("string"===t.dtype)try{n=e.map(function(t){return Z(t)});}catch(t){throw new Error("Failed to decode encoded string bytes into utf-8")}return ur(t.shape,t.dtype,n)},o.prototype.makeOutput=function(t,e,n){var r=this.write(t,e,n);return Nt.makeTensorFromDataId(r,e,n,this)},o.prototype.disposeData=function(t){if(this.data.has(t)){var e=this.data.get(t).complexTensors;null!=e&&(e.real.dispose(),e.imag.dispose()),this.data.delete(t);}},o.prototype.time=function(t){return n(this,void 0,void 0,function(){var e;return r(this,function(n){return e=Y(),t(),[2,{kernelMs:Y()-e}]})})},o.prototype.memory=function(){return {unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}},o.prototype.complex=function(t,e){var n=this.makeOutput(null,t.shape,"complex64");return this.data.get(n.dataId).complexTensors={real:Nt.keep(t.clone()),imag:Nt.keep(e.clone())},n},o.prototype.real=function(t){return this.data.get(t.dataId).complexTensors.real.clone()},o.prototype.imag=function(t){return this.data.get(t.dataId).complexTensors.imag.clone()},o.prototype.slice=function(t,e,n){if(kh(t,"slice"),Yr(t.shape,e,n)){var r=Qr(e,t.strides),o=w(n);return kn(this.readSync(t.dataId).subarray(r,r+o),n,t.dtype)}for(var a=ur(n,t.dtype),i=this.bufferSync(t),u=0;u<a.size;++u){var s=a.indexToLoc(u).map(function(t,n){return t+e[n]});a.values[u]=i.get.apply(i,s);}return a.toTensor()},o.prototype.stridedSlice=function(t,e,n,r){kh(t,"stridedSlice");var o=jr(e,n,r);if(o.some(function(t){return 0===t}))return kn([],o);for(var a=ur(o,t.dtype),i=this.bufferSync(t),u=0;u<a.size;u++){for(var s=a.indexToLoc(u),c=new Array(s.length),l=0;l<c.length;l++)c[l]=s[l]*r[l]+e[l];a.set.apply(a,[i.get.apply(i,c)].concat(s));}return a.toTensor()},o.prototype.diag=function(t){for(var e=this.readSync(t.dataId),n=ur([t.size,t.size],t.dtype),r=n.values,o=0;o<e.length;o++)r[o*t.size+o]=e[o];return n.toTensor()},o.prototype.unstack=function(t,e){for(var n=t.shape[e],r=new Array(t.rank-1),o=0,a=0;a<t.rank;a++)a!==e&&(r[o++]=t.shape[a]);var i=new Array(t.rank).fill(0),u=t.shape.slice();u[e]=1;var s=new Array(n);for(a=0;a<s.length;a++)i[e]=a,s[a]=this.slice(t,i,u).reshape(r);return s},o.prototype.reverse=function(t,e){kh(t,"reverse");for(var n=ur(t.shape,t.dtype),r=this.bufferSync(t),o=function(o){var a=n.indexToLoc(o),i=a.slice();e.forEach(function(e){return i[e]=t.shape[e]-1-i[e]}),n.set.apply(n,[r.get.apply(r,i)].concat(a));},a=0;a<n.size;a++)o(a);return n.toTensor()},o.prototype.concat=function(t,e){var n=this;if("complex64"===t[0].dtype){var r=t.map(function(t){return Rn(t)}),o=t.map(function(t){return In(t)});return En(this.concat(r,e),this.concat(o,e))}var a=t.map(function(t){var n=w(t.shape.slice(e));return t.as2D(-1,n)}),i=wn(a.map(function(t){return t.shape}),1),u=ur(i,t[0].dtype).values;if(1===a[0].shape[0]){var s=0;a.forEach(function(t){u.set(n.readSync(t.dataId),s),s+=t.size;});}else{var c=0;a.forEach(function(t){for(var e=n.readSync(t.dataId),r=0,o=0;o<t.shape[0];++o)for(var a=o*i[1]+c,s=0;s<t.shape[1];++s)u[a+s]=e[r++];c+=t.shape[1];});}var l=wn(t.map(function(t){return t.shape}),e);return kn(u,l,t[0].dtype)},o.prototype.neg=function(t){return kh(t,"neg"),this.multiply(An(-1),t)},o.prototype.add=function(t,e){return "complex64"===t.dtype||"complex64"===e.dtype?this.broadcastedBinaryComplexOp(t.cast("complex64"),e.cast("complex64"),function(t,e,n,r){return {real:t+n,imag:e+r}}):this.broadcastedBinaryOp(t,e,Ct(t.dtype,e.dtype),function(t,e){return t+e})},o.prototype.addN=function(t){var e=this;kh(t,"addN");for(var n=t.map(function(t){return e.readSync(t.dataId)}),r=ur(t[0].shape,t[0].dtype),o=r.values,a=0;a<t.length;a++)for(var i=n[a],u=0;u<o.length;u++)o[u]+=i[u];return r.toTensor()},o.prototype.subtract=function(t,e){return "complex64"===t.dtype||"complex64"===e.dtype?this.broadcastedBinaryComplexOp(t.cast("complex64"),e.cast("complex64"),function(t,e,n,r){return {real:t-n,imag:e-r}}):this.broadcastedBinaryOp(t,e,Ct(t.dtype,e.dtype),function(t,e){return t-e})},o.prototype.pow=function(t,e){return kh([t,e],"pow"),this.broadcastedBinaryOp(t,e,t.dtype,function(t,e){return Math.pow(t,e)})},o.prototype.batchMatMul=function(t,e,n,r){kh([t,e],"matMul");for(var o=n?t.shape[1]:t.shape[2],a=n?t.shape[2]:t.shape[1],i=r?e.shape[1]:e.shape[2],u=t.shape[0],s=this.readSync(t.dataId),c=this.readSync(e.dataId),l=n?[t.strides[0],1,t.strides[1]]:[t.strides[0],t.strides[1],1],h=l[0],f=l[1],p=l[2],d=r?[1,e.strides[1],e.strides[0]]:[e.strides[1],1,e.strides[0]],v=d[0],m=d[1],g=d[2],y=a*i,x=ur([u,a,i],t.dtype),b=x.values,w=this.blockSize,C=0;C<u;C++)for(var E=0;E<a;E+=w)for(var R=0;R<i;R+=w)for(var I=0;I<o;I+=w)for(var k=Math.min(E+w,a),S=Math.min(R+w,i),A=Math.min(I+w,o),D=E;D<k;D++)for(var T=R;T<S;T++){for(var N=0,F=I;F<A;F++)N+=s[C*h+D*f+F*p]*c[F*v+T*m+C*g];b[C*y+(D*i+T)]+=N;}return x.toTensor()},o.prototype.fusedBatchMatMul=function(t){var e=t.a,n=t.b,r=t.transposeA,o=t.transposeB,a=t.bias,i=t.activation,u=t.preluActivationWeights,s=this.batchMatMul(e,n,r,o);return a&&(s=this.add(s,a)),i&&(s=Sh(this,s,i,u)),s},o.prototype.multiply=function(t,e){return "complex64"===t.dtype||"complex64"===e.dtype?this.broadcastedBinaryComplexOp(t.cast("complex64"),e.cast("complex64"),function(t,e,n,r){return {real:t*n-e*r,imag:t*r+e*n}}):this.broadcastedBinaryOp(t,e,Ct(t.dtype,e.dtype),function(t,e){return t*e})},o.prototype.realDivide=function(t,e){kh([t,e],"realDivide");return this.broadcastedBinaryOp(t,e,"float32",function(t,e){return t/e})},o.prototype.floorDiv=function(t,e){kh([t,e],"floorDiv");return this.broadcastedBinaryOp(t,e,"int32",function(t,e){return Math.floor(t/e)})},o.prototype.sum=function(t,e){kh(t,"sum"),mn("sum",e,t.rank);for(var n=dn(t.shape,e),r=n[0],o=n[1],a=Pn(r,Ct(t.dtype,"int32")),i=w(o),u=this.readSync(a.dataId),s=this.readSync(t.dataId),c=0;c<u.length;++c){for(var l=c*i,h=0,f=0;f<i;++f)h+=s[l+f];u[c]=h;}return a},o.prototype.prod=function(t,e){kh(t,"sum");for(var n=dn(t.shape,e),r=n[0],o=n[1],a=Pn(r,Ct(t.dtype,"int32")),i=w(o),u=this.readSync(a.dataId),s=this.readSync(t.dataId),c=0;c<u.length;++c){for(var l=c*i,h=1,f=0;f<i;++f)h*=s[l+f];u[c]=h;}return a},o.prototype.unsortedSegmentSum=function(t,e,n){kh(t,"unsortedSegmentSum");for(var r=[],o=t.rank-e.rank,a=0;a<o;++a)e=e.expandDims(a+1);for(a=0;a<n;++a){var i=An(a,"int32"),u=cc(i,e).asType("float32").mul(t).sum(0);r.push(u);}return Tr(r)},o.prototype.argMin=function(t,e){kh(t,"argMin");var n=[e];mn("argMin",n,t.rank);for(var r=dn(t.shape,n),o=r[0],a=r[1],i=Pn(o,"int32"),u=w(a),s=this.readSync(i.dataId),c=this.readSync(t.dataId),l=0;l<s.length;++l){for(var h=l*u,f=c[h],p=0,d=0;d<u;++d){var v=c[h+d];v<f&&(f=v,p=d);}s[l]=p;}return i},o.prototype.argMax=function(t,e){kh(t,"argMax");var n=[e];mn("argMax",n,t.rank);for(var r=dn(t.shape,n),o=r[0],a=r[1],i=Pn(o,"int32"),u=w(a),s=this.readSync(i.dataId),c=this.readSync(t.dataId),l=0;l<s.length;++l){for(var h=l*u,f=c[h],p=0,d=0;d<u;++d){var v=c[h+d];v>f&&(f=v,p=d);}s[l]=p;}return i},o.prototype.cumsum=function(t,e,n,r){if(kh(t,"cumsum"),e!==t.rank-1)throw new Error("backend.cumsum in CPU expects an inner-most axis="+(t.rank-1)+" but got axis="+e);for(var o=Ct(t.dtype,"int32"),a=Pn(t.shape,o),i=this.readSync(a.dataId),u=this.readSync(t.dataId),s=t.shape[t.rank-1],c=r?function(t,e){return t+s-e-1}:function(t,e){return t+e},l=0;l<u.length;l+=s)for(var h=0;h<s;h++){var f=c(l,h);if(0===h)i[f]=n?0:u[f];else{var p=c(l,h-1);i[f]=n?u[p]+i[p]:u[f]+i[p];}}return a},o.prototype.equal=function(t,e){return kh([t,e],"equal"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t===e?1:0})},o.prototype.notEqual=function(t,e){return kh([t,e],"notEqual"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t!==e?1:0})},o.prototype.less=function(t,e){return kh([t,e],"less"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t<e?1:0})},o.prototype.lessEqual=function(t,e){return kh([t,e],"lessEqual"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t<=e?1:0})},o.prototype.greater=function(t,e){return kh([t,e],"greater"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t>e?1:0})},o.prototype.greaterEqual=function(t,e){return kh([t,e],"greaterEqual"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t>=e?1:0})},o.prototype.logicalNot=function(t){kh(t,"logicalNot");for(var e=this.readSync(t.dataId),n=new Uint8Array(e.length),r=0;r<e.length;++r)n[r]=e[r]?0:1;return this.makeOutput(n,t.shape,"bool")},o.prototype.logicalAnd=function(t,e){return kh([t,e],"logicalAnd"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t&&e})},o.prototype.logicalOr=function(t,e){return kh([t,e],"logicalOr"),this.broadcastedBinaryOp(t,e,"bool",function(t,e){return t||e})},o.prototype.select=function(t,e,n){kh([t,e,n],"select");for(var r=this.readSync(t.dataId),o=this.readSync(e.dataId),a=this.readSync(n.dataId),i=Pn(e.shape,Ct(e.dtype,n.dtype)),u=this.readSync(i.dataId),s=0,c=0===t.rank||t.rank>1||1===e.rank?1:w(e.shape.slice(1)),l=0;l<r.length;l++)for(var h=0;h<c;h++)1===r[l]?u[s++]=o[l]:u[s++]=a[l];return i},o.prototype.where=function(t){kh([t],"where");var e=this.readSync(t.dataId);return Uo(t.shape,e)},o.prototype.topk=function(t,e,n){return kh(t,"topk"),Wo(this.readSync(t.dataId),t.shape,t.dtype,e)},o.prototype.min=function(t,e){kh(t,"min"),mn("min",e,t.rank);for(var n=dn(t.shape,e),r=n[0],o=n[1],a=Pn(r,t.dtype),i=w(o),u=this.readSync(a.dataId),s=this.readSync(t.dataId),c=0;c<u.length;++c){for(var l=c*i,h=s[l],f=0;f<i;++f){var p=s[l+f];p<h&&(h=p);}u[c]=h;}return a},o.prototype.minimum=function(t,e){return kh([t,e],"minimum"),this.broadcastedBinaryOp(t,e,t.dtype,function(t,e){return Math.min(t,e)})},o.prototype.mod=function(t,e){return kh([t,e],"mod"),this.broadcastedBinaryOp(t,e,t.dtype,function(t,e){var n=t%e;return t<0&&e<0||t>=0&&e>=0?n:(n+e)%e})},o.prototype.max=function(t,e){kh(t,"max"),mn("max",e,t.rank);for(var n=dn(t.shape,e),r=n[0],o=n[1],a=Pn(r,t.dtype),i=w(o),u=this.readSync(a.dataId),s=this.readSync(t.dataId),c=0;c<u.length;++c){for(var l=c*i,h=s[l],f=0;f<i;++f){var p=s[l+f];p>h&&(h=p);}u[c]=h;}return a},o.prototype.maximum=function(t,e){return kh([t,e],"maximum"),this.broadcastedBinaryOp(t,e,t.dtype,function(t,e){return Math.max(t,e)})},o.prototype.all=function(t,e){kh(t,"all"),mn("all",e,t.rank);for(var n=dn(t.shape,e),r=n[0],o=n[1],a=Pn(r,t.dtype),i=w(o),u=this.readSync(a.dataId),s=this.readSync(t.dataId),c=0;c<u.length;++c){for(var l=c*i,h=s[l],f=0;f<i;++f){var p=s[l+f];h=h&&p;}u[c]=h;}return a},o.prototype.any=function(t,e){kh(t,"any"),mn("any",e,t.rank);for(var n=dn(t.shape,e),r=n[0],o=n[1],a=Pn(r,t.dtype),i=w(o),u=this.readSync(a.dataId),s=this.readSync(t.dataId),c=0;c<u.length;++c){for(var l=c*i,h=s[l],f=0;f<i;++f){var p=s[l+f];h=h||p;}u[c]=h;}return a},o.prototype.squaredDifference=function(t,e){return kh([t,e],"squaredDifference"),this.broadcastedBinaryOp(t,e,t.dtype,function(t,e){var n=t-e;return n*n})},o.prototype.ceil=function(t){kh(t,"ceil");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r)n[r]=Math.ceil(e[r]);return this.makeOutput(n,t.shape,"float32")},o.prototype.floor=function(t){kh(t,"floor");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r)n[r]=Math.floor(e[r]);return this.makeOutput(n,t.shape,"float32")},o.prototype.sign=function(t){kh(t,"x");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r)e[r]<0?n[r]=-1:e[r]>0?n[r]=1:n[r]=0;return this.makeOutput(n,t.shape,"float32")},o.prototype.isNaN=function(t){kh(t,"x");for(var e=this.readSync(t.dataId),n=new Uint8Array(e.length),r=0;r<e.length;++r)Number.isNaN(e[r])&&(n[r]=1);return this.makeOutput(n,t.shape,"bool")},o.prototype.isInf=function(t){kh(t,"x");for(var e=this.readSync(t.dataId),n=new Uint8Array(e.length),r=0;r<e.length;++r)Math.abs(e[r])===1/0&&(n[r]=1);return this.makeOutput(n,t.shape,"bool")},o.prototype.isFinite=function(t){kh(t,"x");for(var e=this.readSync(t.dataId),n=new Uint8Array(e.length),r=0;r<e.length;++r)Number.isFinite(e[r])&&(n[r]=1);return this.makeOutput(n,t.shape,"bool")},o.prototype.round=function(t){kh(t,"round");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r){var o=Math.floor(e[r]);e[r]-o<.5?n[r]=Math.floor(e[r]):e[r]-o>.5?n[r]=Math.ceil(e[r]):n[r]=o%2==0?o:o+1;}return this.makeOutput(n,t.shape,"float32")},o.prototype.exp=function(t){kh(t,"exp");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r)n[r]=Math.exp(e[r]);return this.makeOutput(n,t.shape,"float32")},o.prototype.expm1=function(t){kh(t,"expm1");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r)n[r]=Math.expm1(e[r]);return this.makeOutput(n,t.shape,"float32")},o.prototype.log=function(t){kh(t,"log");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r){var o=e[r];n[r]=Math.log(o);}return this.makeOutput(n,t.shape,"float32")},o.prototype.log1p=function(t){kh(t,"log1p");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r){var o=e[r];n[r]=Math.log1p(o);}return this.makeOutput(n,t.shape,"float32")},o.prototype.sqrt=function(t){kh(t,"sqrt");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r){var o=e[r];n[r]=Math.sqrt(o);}return this.makeOutput(n,t.shape,"float32")},o.prototype.rsqrt=function(t){kh(t,"rsqrt");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r){var o=e[r];n[r]=1/Math.sqrt(o);}return this.makeOutput(n,t.shape,"float32")},o.prototype.reciprocal=function(t){kh(t,"reciprocal");for(var e=this.readSync(t.dataId),n=new Float32Array(e.length),r=0;r<e.length;++r)n[r]=1/e[r];return this.makeOutput(n,t.shape,"float32")},o.prototype.linear=function(t){return t},o.prototype.relu=function(t){kh(t,"relu");for(var e=Pn(t.shape,t.dtype),n=this.readSync(e.dataId),r=this.readSync(t.dataId),o=0;o<r.length;++o)n[o]=Math.max(0,r[o]);return e},o.prototype.relu6=function(t){kh(t,"relu");for(var e=Pn(t.shape,t.dtype),n=this.readSync(e.dataId),r=this.readSync(t.dataId),o=0;o<r.length;++o)n[o]=Math.min(Math.max(0,r[o]),6);return e},o.prototype.prelu=function(t,e){return kh([t,e],"prelu"),this.broadcastedBinaryOp(t,e,t.dtype,function(t,e){return t<0?e*t:t})},o.prototype.elu=function(t){kh(t,"elu");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r){var o=n[r];e[r]=o>=0?o:Math.exp(o)-1;}return this.makeOutput(e,t.shape,"float32")},o.prototype.eluDer=function(t,e){kh([t,e],"eluDer");for(var n=new Float32Array(e.size),r=this.readSync(e.dataId),o=this.readSync(t.dataId),a=0;a<r.length;++a){var i=r[a];n[a]=i>=1?o[a]:o[a]*(i+1);}return this.makeOutput(n,e.shape,"float32")},o.prototype.selu=function(t){kh(t,"selu");for(var e=iu,n=uu,r=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a){var i=o[a];r[a]=i>=0?n*i:e*(Math.exp(i)-1);}return this.makeOutput(r,t.shape,"float32")},o.prototype.clip=function(t,e,n){kh(t,"clip");for(var r=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a){var i=o[a];r[a]=i>n?n:i<e?e:i;}return this.makeOutput(r,t.shape,"float32")},o.prototype.abs=function(t){for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.abs(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.complexAbs=function(t){for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<t.size;++r){var o=n[2*r],a=n[2*r+1];e[r]=Math.hypot(o,a);}return this.makeOutput(e,t.shape,"float32")},o.prototype.int=function(t){kh(t,"int");for(var e=new Int32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=n[r];return this.makeOutput(e,t.shape,"int32")},o.prototype.sigmoid=function(t){kh(t,"sigmoid");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=1/(1+Math.exp(-n[r]));return this.makeOutput(e,t.shape,"float32")},o.prototype.softplus=function(t){kh(t,"softplus");for(var e=Math.log(1.1920928955078125e-7)+2,n=new Float32Array(t.size),r=this.readSync(t.dataId),o=0;o<r.length;++o){var a=r[o]>-e,i=r[o]<e,u=Math.exp(r[o]),s=void 0;s=i?u:a?r[o]:Math.log(1+u),n[o]=s;}return this.makeOutput(n,t.shape,"float32")},o.prototype.sin=function(t){kh(t,"sin");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.sin(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.cos=function(t){kh(t,"cos");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.cos(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.tan=function(t){kh(t,"tan");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.tan(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.asin=function(t){kh(t,"asin");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.asin(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.acos=function(t){kh(t,"acos");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.acos(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.atan=function(t){kh(t,"atan");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.atan(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.atan2=function(t,e){return kh([t,e],"atan2"),this.broadcastedBinaryOp(t,e,t.dtype,function(t,e){return Math.atan2(t,e)})},o.prototype.sinh=function(t){kh(t,"sinh");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.sinh(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.cosh=function(t){kh(t,"cosh");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.cosh(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.tanh=function(t){kh(t,"tanh");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=R(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.asinh=function(t){kh(t,"asinh");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.asinh(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.acosh=function(t){kh(t,"acosh");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.acosh(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.atanh=function(t){kh(t,"atanh");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r)e[r]=Math.atanh(n[r]);return this.makeOutput(e,t.shape,"float32")},o.prototype.erf=function(t){kh(t,"erf");for(var e=new Float32Array(t.size),n=this.readSync(t.dataId),r=0;r<n.length;++r){var o=Math.sign(n[r]),a=Math.abs(n[r]),i=1/(1+.3275911*a);e[r]=o*(1-((((1.061405429*i-1.453152027)*i+1.421413741)*i-.284496736)*i+.254829592)*i*Math.exp(-a*a));}return this.makeOutput(e,t.shape,"float32")},o.prototype.step=function(t,e){void 0===e&&(e=0),kh(t,"step");for(var n=new Float32Array(t.size),r=this.readSync(t.dataId),o=0;o<r.length;++o){var a=r[o];isNaN(a)?n[o]=NaN:n[o]=a>0?1:e;}return this.makeOutput(n,t.shape,"float32")},o.prototype.fusedConv2d=function(t){var e=t.input,n=t.filter,r=t.convInfo,o=t.bias,a=t.activation,i=t.preluActivationWeights,u=this.conv2d(e,n,r);return o&&(u=this.add(u,o)),a&&(u=Sh(this,u,a,i)),u},o.prototype.conv2d=function(t,e,n){kh([t,e],"conv2d");for(var r=n.filterHeight,o=n.filterWidth,a=n.dilationHeight,i=n.dilationWidth,u=n.padInfo.left,s=n.padInfo.top,c="channelsLast"===n.dataFormat,l=ur(n.outShape,t.dtype),h=t.strides[0],f=c?t.strides[1]:t.strides[2],p=c?t.strides[2]:1,d=c?1:t.strides[1],v=l.strides[0],m=c?l.strides[1]:l.strides[2],g=c?l.strides[2]:1,y=c?1:l.strides[1],x=this.readSync(t.dataId),b=this.readSync(e.dataId),w=l.values,C=0;C<n.batchSize;++C)for(var E=C*h,R=C*v,I=0;I<n.outHeight;++I)for(var k=R+I*m,S=I*n.strideHeight-s,A=0;A<r;A++){var D=S+A*a;if(!(D<0||D>=n.inHeight))for(var T=A*e.strides[0],N=E+D*f,F=0;F<n.outWidth;++F)for(var O=k+F*g,_=F*n.strideWidth-u,M=0;M<o;M++){var B=_+M*i;if(!(B<0||B>=n.inWidth))for(var P=N+B*p,L=T+M*e.strides[1],W=0;W<n.inChannels;++W){for(var U=x[P+W*d],V=0;V<n.outChannels;++V)w[O+V*y]+=U*b[L+V];L+=n.outChannels;}}}return l.toTensor()},o.prototype.conv3d=function(t,e,n){for(var r=n.filterDepth,o=n.filterHeight,a=n.filterWidth,i=n.dilationDepth,u=n.dilationHeight,s=n.dilationWidth,c=n.padInfo.front,l=n.padInfo.left,h=n.padInfo.top,f=ur(n.outShape,t.dtype),p=this.readSync(t.dataId),d=this.readSync(e.dataId),v=f.values,m=0;m<n.batchSize;++m)for(var g=m*t.strides[0],y=m*f.strides[0],x=0;x<n.outDepth;++x)for(var b=y+x*f.strides[1],w=x*n.strideDepth-c,C=0;C<r;C++){var E=w+C*i;if(!(E<0||E>=n.inDepth))for(var R=C*e.strides[0],I=g+E*t.strides[1],k=0;k<n.outHeight;++k)for(var S=b+k*f.strides[2],A=k*n.strideHeight-h,D=0;D<o;D++){var T=A+D*u;if(!(T<0||T>=n.inHeight))for(var N=R+D*e.strides[1],F=I+T*t.strides[2],O=0;O<n.outWidth;++O)for(var _=S+O*n.outChannels,M=O*n.strideWidth-l,B=0;B<a;B++){var P=M+B*s;if(!(P<0||P>=n.inWidth))for(var L=N+B*e.strides[2],W=F+P*n.inChannels,U=L,V=0;V<n.inChannels;++V){for(var z=p[W+V],G=0;G<n.outChannels;++G)v[_+G]+=z*d[U+G];U+=n.outChannels;}}}}return f.toTensor()},o.prototype.conv2dDerInput=function(t,e,n){kh([t,e],"conv2dDerInput");for(var r=ur(n.inShape,"float32"),o=r.values,a=this.readSync(t.dataId),i=this.readSync(e.dataId),u=e.strides,s=u[0],c=u[1],l=u[2],h=n.batchSize,f=n.filterHeight,p=n.filterWidth,d=n.inChannels,v=n.inHeight,m=n.inWidth,g=n.outChannels,y=n.outHeight,x=n.outWidth,b=n.strideHeight,w=n.strideWidth,C=n.dataFormat,E=f-1-n.padInfo.top,R=p-1-n.padInfo.left,I="channelsLast"===C,k=r.strides[0],S=I?r.strides[1]:r.strides[2],A=I?r.strides[2]:1,D=I?1:r.strides[1],T=t.strides[0],N=I?t.strides[1]:t.strides[2],F=I?t.strides[2]:1,O=I?1:t.strides[1],_=0;_<h;++_)for(var M=0;M<d;++M)for(var B=0;B<v;++B)for(var P=B-E,L=Math.max(0,Math.ceil(P/b)),W=Math.min(y,(f+P)/b),U=0;U<m;++U){for(var V=U-R,z=Math.max(0,Math.ceil(V/w)),G=Math.min(x,(p+V)/w),H=0,q=L;q<W;++q)for(var K=q*b-P,j=z;j<G;++j)for(var X=T*_+N*q+F*j,$=s*(f-1-K)+c*(p-1-(j*w-V))+l*M,Y=0;Y<g;++Y){H+=a[X+O*Y]*i[$+Y];}o[k*_+S*B+A*U+D*M]=H;}return r.toTensor()},o.prototype.conv3dDerInput=function(t,e,n){for(var r=ur(n.inShape,"float32"),o=r.values,a=r.strides,i=a[0],u=a[1],s=a[2],c=a[3],l=this.readSync(t.dataId),h=t.strides,f=h[0],p=h[1],d=h[2],v=h[3],m=this.readSync(e.dataId),g=e.strides,y=g[0],x=g[1],b=g[2],w=g[3],C=n.batchSize,E=n.filterDepth,R=n.filterHeight,I=n.filterWidth,k=n.inChannels,S=n.inDepth,A=n.inHeight,D=n.inWidth,T=n.outChannels,N=n.outDepth,F=n.outHeight,O=n.outWidth,_=n.strideDepth,M=n.strideHeight,B=n.strideWidth,P=E-1-n.padInfo.front,L=R-1-n.padInfo.top,W=I-1-n.padInfo.left,U=0;U<C;++U)for(var V=0;V<k;++V)for(var z=0;z<S;++z)for(var G=z-P,H=Math.max(0,Math.ceil(G/_)),q=Math.min(N,(E+G)/_),K=0;K<A;++K)for(var j=K-L,X=Math.max(0,Math.ceil(j/M)),$=Math.min(F,(R+j)/M),Y=0;Y<D;++Y){for(var Q=Y-W,J=Math.max(0,Math.ceil(Q/B)),Z=Math.min(O,(I+Q)/B),tt=0,et=H;et<q;++et)for(var nt=et*_-G,rt=X;rt<$;++rt)for(var ot=rt*M-j,at=J;at<Z;++at)for(var it=f*U+p*et+d*rt+v*at,ut=y*(E-1-nt)+x*(R-1-ot)+b*(I-1-(at*B-Q))+w*V,st=0;st<T;++st){tt+=l[it+st]*m[ut+st];}o[i*U+u*z+s*K+c*Y+V]=tt;}return r.toTensor()},o.prototype.conv2dDerFilter=function(t,e,n){kh([t,e],"conv2dDerFilter");for(var r=n.strideHeight,o=n.strideWidth,a=n.filterHeight,i=n.filterWidth,u="channelsLast"===n.dataFormat,s=ur(n.filterShape,"float32"),c=n.padInfo.left,l=n.padInfo.top,h=this.bufferSync(t),f=this.bufferSync(e),p=0;p<a;++p)for(var d=Math.max(0,Math.ceil((l-p)/r)),v=Math.min(n.outHeight,(n.inHeight+l-p)/r),m=0;m<i;++m)for(var g=Math.max(0,Math.ceil((c-m)/o)),y=Math.min(n.outWidth,(n.inWidth+c-m)/o),x=0;x<n.inChannels;++x)for(var b=0;b<n.outChannels;++b){for(var w=0,C=0;C<n.batchSize;++C)for(var E=d;E<v;++E)for(var R=p+E*r-l,I=g;I<y;++I){var k=m+I*o-c;w+=u?h.get(C,R,k,x)*f.get(C,E,I,b):h.get(C,x,R,k)*f.get(C,b,E,I);}s.set(w,p,m,x,b);}return s.toTensor()},o.prototype.conv3dDerFilter=function(t,e,n){for(var r=n.strideDepth,o=n.strideHeight,a=n.strideWidth,i=n.filterDepth,u=n.filterHeight,s=n.filterWidth,c=ur(n.filterShape,"float32"),l=c.values,h=c.strides,f=h[0],p=h[1],d=h[2],v=h[3],m=this.readSync(e.dataId),g=e.strides,y=g[0],x=g[1],b=g[2],w=g[3],C=this.readSync(t.dataId),E=t.strides,R=E[0],I=E[1],k=E[2],S=E[3],A=n.padInfo.front,D=n.padInfo.left,T=n.padInfo.top,N=0;N<i;++N)for(var F=Math.max(0,Math.ceil((A-N)/r)),O=Math.min(n.outDepth,(n.inDepth+A-N)/r),_=N*f,M=0;M<u;++M)for(var B=Math.max(0,Math.ceil((T-M)/o)),P=Math.min(n.outHeight,(n.inHeight+T-M)/o),L=M*p+_,W=0;W<s;++W)for(var U=Math.max(0,Math.ceil((D-W)/a)),V=Math.min(n.outWidth,(n.inWidth+D-W)/a),z=W*d+L,G=0;G<n.inChannels;++G)for(var H=G*v+z,q=0;q<n.outChannels;++q){for(var K=0,j=0;j<n.batchSize;++j)for(var X=j*R,$=j*y,Y=F;Y<O;++Y)for(var Q=(N+Y*r-A)*I+X,J=Y*x+$,Z=B;Z<P;++Z)for(var tt=(M+Z*o-T)*k+Q,et=Z*b+J,nt=U;nt<V;++nt){var rt=nt*w+et;K+=C[(W+nt*a-D)*S+tt+G]*m[rt+q];}l[H+q]=K;}return c.toTensor()},o.prototype.fusedDepthwiseConv2D=function(t){var e=t.input,n=t.filter,r=t.convInfo,o=t.bias,a=t.activation,i=t.preluActivationWeights,u=this.depthwiseConv2D(e,n,r);return o&&(u=this.add(u,o)),a&&(u=Sh(this,u,a,i)),u},o.prototype.depthwiseConv2D=function(t,e,n){kh([t,e],"depthwiseConv2D");for(var r=n.filterHeight,o=n.filterWidth,a=n.dilationHeight,i=n.dilationWidth,u=n.padInfo.left,s=n.padInfo.top,c=n.outChannels/n.inChannels,l=ur(n.outShape,t.dtype),h=this.readSync(t.dataId),f=this.readSync(e.dataId),p=l.values,d=0;d<n.batchSize;++d)for(var v=d*t.strides[0],m=d*l.strides[0],g=0;g<n.outHeight;++g)for(var y=m+g*l.strides[1],x=g*n.strideHeight-u,b=0;b<r;++b){var w=x+b*a;if(!(w<0||w>=n.inHeight))for(var C=b*e.strides[0],E=v+w*t.strides[1],R=0;R<n.outWidth;++R)for(var I=y+R*l.strides[2],k=R*n.strideWidth-s,S=0;S<o;++S){var A=k+S*i;if(!(A<0||A>=n.inWidth))for(var D=C+S*e.strides[1],T=E+A*n.inChannels,N=I,F=D,O=0;O<n.inChannels;++O){for(var _=h[T+O],M=0;M<c;++M)p[N+M]+=_*f[F+M];N+=c,F+=c;}}}return l.toTensor()},o.prototype.depthwiseConv2DDerInput=function(t,e,n){kh([t,e],"depthwiseConv2DDerInput");for(var r=ur(n.inShape,"float32"),o=r.values,a=r.strides,i=a[0],u=a[1],s=a[2],c=this.readSync(t.dataId),l=t.strides,h=l[0],f=l[1],p=l[2],d=this.readSync(e.dataId),v=e.strides,m=v[0],g=v[1],y=v[2],x=n.batchSize,b=n.filterHeight,w=n.filterWidth,C=n.inChannels,E=n.inHeight,R=n.inWidth,I=n.outChannels,k=n.outHeight,S=n.outWidth,A=n.strideHeight,D=n.strideWidth,T=b-1-n.padInfo.top,N=w-1-n.padInfo.left,F=I/C,O=0;O<x;++O)for(var _=0;_<C;++_)for(var M=0;M<E;++M)for(var B=M-T,P=Math.max(0,Math.ceil(B/A)),L=Math.min(k,(b+B)/A),W=0;W<R;++W){for(var U=W-N,V=Math.max(0,Math.ceil(U/D)),z=Math.min(S,(w+U)/D),G=0,H=P;H<L;++H)for(var q=H*A-B,K=V;K<z;++K)for(var j=h*O+f*H+p*K,X=m*(b-1-q)+g*(w-1-(K*D-U))+y*_,$=0;$<F;++$){G+=c[j+(_*F+$)]*d[X+$];}o[i*O+u*M+s*W+_]=G;}return r.toTensor()},o.prototype.depthwiseConv2DDerFilter=function(t,e,n){kh([t,e],"depthwiseConv2DDerFilter");for(var r=n.strideHeight,o=n.strideWidth,a=n.filterHeight,i=n.filterWidth,u=ur(n.filterShape,"float32"),s=n.padInfo.left,c=n.padInfo.top,l=n.outChannels/n.inChannels,h=this.bufferSync(t),f=this.bufferSync(e),p=0;p<a;++p)for(var d=Math.max(0,Math.ceil((c-p)/r)),v=Math.min(n.outHeight,(n.inHeight+c-p)/r),m=0;m<i;++m)for(var g=Math.max(0,Math.ceil((s-m)/o)),y=Math.min(n.outWidth,(n.inWidth+s-m)/o),x=0;x<n.outChannels;++x){for(var b=Math.trunc(x/l),w=x%l,C=0,E=0;E<n.batchSize;++E)for(var R=d;R<v;++R)for(var I=p+R*r-c,k=g;k<y;++k){var S=m+k*o-s;C+=h.get(E,I,S,b)*f.get(E,R,k,x);}u.set(C,p,m,b,w);}return u.toTensor()},o.prototype.tile=function(t,e){return kh(t,"tile"),Lo(this.bufferSync(t),e)},o.prototype.pad=function(t,e,n){kh(t,"pad");var r=e.map(function(e,n){return e[0]+t.shape[n]+e[1]}),o=e.map(function(t){return t[0]}),a=this.bufferSync(t),i=ur(r,t.dtype);0!==n&&i.values.fill(n);for(var u=0;u<t.size;u++){var s=a.indexToLoc(u),c=s.map(function(t,e){return t+o[e]});i.set.apply(i,[a.get.apply(a,s)].concat(c));}return i.toTensor()},o.prototype.transpose=function(t,e){kh(t,"transpose");for(var n=new Array(t.rank),r=0;r<n.length;r++)n[r]=t.shape[e[r]];var o=this.readSync(t.dataId),a=ur(n,t.dtype),i=this.bufferSync(t);for(r=0;r<t.size;++r){for(var u=i.indexToLoc(r),s=new Array(u.length),c=0;c<s.length;c++)s[c]=u[e[c]];var l=a.locToIndex(s);a.values[l]=o[r];}return a.toTensor()},o.prototype.gather=function(t,e,n){kh([t,e],"gather");var r=t.shape.slice(),o=this.readSync(e.dataId);r[n]=o.length;for(var a=ur(r,t.dtype),i=this.bufferSync(t),u=0;u<a.size;++u){var s=a.indexToLoc(u),c=s.slice();c[n]=o[s[n]];var l=i.locToIndex(c);a.values[u]=i.values[l];}return a.toTensor()},o.prototype.batchToSpaceND=function(t,e,n){kh([t],"batchToSpaceND");var r=e.reduce(function(t,e){return t*e}),o=Mr(t.shape,e,r),a=Br(o.length,e.length),i=Pr(t.shape,e,r),u=Lr(n,e.length),s=Wr(i,n,e.length);return t.reshape(o).transpose(a).reshape(i).slice(u,s)},o.prototype.spaceToBatchND=function(t,e,n){kh([t],"spaceToBatchND");var r=e.reduce(function(t,e){return t*e}),o=[[0,0]];o.push.apply(o,n);for(var a=1+e.length;a<t.shape.length;++a)o.push([0,0]);var i=t.pad(o),u=Mr(i.shape,e,r,!1),s=Br(u.length,e.length,!1),c=Pr(i.shape,e,r,!1);return i.reshape(u).transpose(s).reshape(c)},o.prototype.pool=function(t,e,n){kh(t,"pool");for(var r=e.strideHeight,o=e.strideWidth,a=e.dilationHeight,i=e.dilationWidth,u=e.effectiveFilterHeight,s=e.effectiveFilterWidth,c=e.padInfo.top,l=e.padInfo.left,h="max"===n?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,f=this.readSync(t.dataId),p=ur(e.outShape,t.dtype),d=p.values,v=e.outShape[1]*e.outShape[2]*e.outShape[3],m=e.outShape[2]*e.outShape[3],g=e.outShape[3],y=0;y<e.batchSize;++y)for(var x=y*v,b=y*t.strides[0],w=0;w<e.inChannels;++w)for(var C=0;C<e.outHeight;++C)for(var E=C*r-c,R=Math.max(0,E),I=Math.min(e.inHeight,u+E),k=x+C*m,S=0;S<e.outWidth;++S){for(var A=S*o-l,D=Math.max(0,A),T=Math.min(e.inWidth,s+A),N=h,F=0,O=0,_=R;_<I;_+=a){for(var M=b+_*t.strides[1],B=D;B<T;B+=i){var P=f[M+B*t.strides[2]+w];"max"===n&&P>N?N=P:"avg"===n&&(F+=P,O++);}if(isNaN(N))break}d[k+S*g+w]="avg"===n?F/O:N;}return p.toTensor()},o.prototype.maxPool=function(t,e){return this.pool(t,e,"max")},o.prototype.maxPoolPositions=function(t,e){for(var n=ur(e.outShape,"int32"),r=e.strideHeight,o=e.strideWidth,a=e.dilationHeight,i=e.dilationWidth,u=e.effectiveFilterHeight,s=e.effectiveFilterWidth,c=e.padInfo.top,l=e.padInfo.left,h=this.bufferSync(t),f=0;f<e.batchSize;++f)for(var p=0;p<e.inChannels;++p)for(var d=0;d<e.outHeight;++d){for(var v=d*r-c,m=v;m<0;)m+=a;for(var g=Math.min(e.inHeight,u+v),y=0;y<e.outWidth;++y){for(var x=y*o-l,b=x;b<0;)b+=i;for(var w=Math.min(e.inWidth,s+x),C=Number.NEGATIVE_INFINITY,E=-1,R=m;R<g;R+=a)for(var I=R-v,k=b;k<w;k+=i){var S=k-x,A=h.get(f,R,k,p);A>C&&(C=A,E=I*s+S);}n.set(E,f,d,y,p);}}return n.toTensor()},o.prototype.maxPoolBackprop=function(t,e,n,r){kh([e,n],"maxPoolBackprop");for(var o=this.maxPoolPositions(e,r),a=r.strideHeight,i=r.strideWidth,u=r.dilationHeight,s=r.dilationWidth,c=r.effectiveFilterHeight,l=r.effectiveFilterWidth,h=l-1-r.padInfo.left,f=c-1-r.padInfo.top,p=ur(e.shape,"float32"),d=this.bufferSync(o),v=this.bufferSync(t),m=0;m<r.batchSize;++m)for(var g=0;g<r.inChannels;++g)for(var y=0;y<r.inHeight;++y)for(var x=0;x<r.inWidth;++x){for(var b=y-f,w=x-h,C=0,E=0;E<c;E+=u){var R=(b+E)/a;if(!(R<0||R>=r.outHeight||Math.floor(R)!==R))for(var I=0;I<l;I+=s){var k=(w+I)/i;if(!(k<0||k>=r.outWidth||Math.floor(k)!==k)){var S=c*l-1-d.get(m,R,k,g)===E*l+I?1:0;if(0!==S)C+=v.get(m,R,k,g)*S;}}}p.set(C,m,y,x,g);}return p.toTensor()},o.prototype.avgPoolBackprop=function(t,e,n){kh([t,e],"avgPoolBackprop");for(var r=n.strideHeight,o=n.strideWidth,a=n.filterHeight,i=n.filterWidth,u=n.dilationHeight,s=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,h=l-1-n.padInfo.left,f=c-1-n.padInfo.top,p=ur(e.shape,"float32"),d=1/(a*i),v=this.bufferSync(t),m=0;m<n.batchSize;++m)for(var g=0;g<n.inChannels;++g)for(var y=0;y<n.inHeight;++y)for(var x=0;x<n.inWidth;++x){for(var b=y-f,w=x-h,C=0,E=0;E<c;E+=u){var R=(b+E)/r;if(!(R<0||R>=n.outHeight||Math.floor(R)!==R))for(var I=0;I<l;I+=s){var k=(w+I)/o;if(!(k<0||k>=n.outWidth||Math.floor(k)!==k))C+=v.get(m,R,k,g);}}p.set(C*d,m,y,x,g);}return p.toTensor()},o.prototype.pool3d=function(t,e,n){kh(t,"pool3d");for(var r=e.strideDepth,o=e.strideHeight,a=e.strideWidth,i=e.dilationDepth,u=e.dilationHeight,s=e.dilationWidth,c=e.effectiveFilterDepth,l=e.effectiveFilterHeight,h=e.effectiveFilterWidth,f=e.padInfo.front,p=e.padInfo.top,d=e.padInfo.left,v="max"===n?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,m=this.readSync(t.dataId),g=ur(e.outShape,t.dtype),y=g.values,x=e.outShape[1]*e.outShape[2]*e.outShape[3]*e.outShape[4],b=e.outShape[2]*e.outShape[3]*e.outShape[4],w=e.outShape[3]*e.outShape[4],C=e.outShape[4],E=0;E<e.batchSize;++E)for(var R=E*x,I=E*t.strides[0],k=0;k<e.inChannels;++k)for(var S=0;S<e.outDepth;++S){for(var A=S*r-f,D=A;D<0;)D+=i;for(var T=Math.min(e.inDepth,c+A),N=R+S*b,F=0;F<e.outHeight;++F){for(var O=F*o-p,_=O;_<0;)_+=u;for(var M=Math.min(e.inHeight,l+O),B=N+F*w,P=0;P<e.outWidth;++P){for(var L=P*a-d,W=L;W<0;)W+=s;for(var U=Math.min(e.inWidth,h+L),V=B+P*C,z=v,G=0,H=0,q=D;q<T;q+=i){for(var K=I+q*t.strides[1],j=_;j<M;j+=u){for(var X=K+j*t.strides[2],$=W;$<U;$+=s){var Y=m[X+$*t.strides[3]+k];if("max"===n&&Y>z?z=Y:"avg"===n&&(G+=Y,H++),isNaN(z))break}if(isNaN(z))break}if(isNaN(z))break}y[V+k]="avg"===n?G/H:z;}}}return g.toTensor()},o.prototype.avgPool3d=function(t,e){return kh(t,"avgPool3d"),this.pool3d(t,e,"avg").toFloat()},o.prototype.avgPool3dBackprop=function(t,e,n){kh([t,e],"avgPool3dBackprop");for(var r=n.strideDepth,o=n.strideHeight,a=n.strideWidth,i=n.filterDepth,u=n.filterHeight,s=n.filterWidth,c=n.dilationDepth,l=n.dilationHeight,h=n.dilationWidth,f=n.effectiveFilterDepth,p=n.effectiveFilterHeight,d=n.effectiveFilterWidth,v=f-1-n.padInfo.front,m=d-1-n.padInfo.left,g=p-1-n.padInfo.top,y=ur(e.shape,"float32"),x=1/(i*u*s),b=this.bufferSync(t),w=0;w<n.batchSize;++w)for(var C=0;C<n.inChannels;++C)for(var E=0;E<n.inDepth;++E)for(var R=0;R<n.inHeight;++R)for(var I=0;I<n.inWidth;++I){for(var k=E-v,S=R-g,A=I-m,D=0,T=0;T<f;T+=c){var N=(k+T)/r;if(!(N<0||N>=n.outDepth||Math.floor(N)!==N))for(var F=0;F<p;F+=l){var O=(S+F)/o;if(!(O<0||O>=n.outHeight||Math.floor(O)!==O))for(var _=0;_<d;_+=h){var M=(A+_)/a;if(!(M<0||M>=n.outWidth||Math.floor(M)!==M))D+=b.get(w,N,O,M,C);}}}y.set(D*x,w,E,R,I,C);}return y.toTensor()},o.prototype.maxPool3d=function(t,e){return kh(t,"maxPool3d"),this.pool3d(t,e,"max").toFloat()},o.prototype.maxPool3dPositions=function(t,e){for(var n=ur(e.outShape,"int32"),r=e.strideDepth,o=e.strideHeight,a=e.strideWidth,i=e.dilationDepth,u=e.dilationHeight,s=e.dilationWidth,c=e.effectiveFilterDepth,l=e.effectiveFilterHeight,h=e.effectiveFilterWidth,f=e.padInfo.front,p=e.padInfo.top,d=e.padInfo.left,v=this.bufferSync(t),m=0;m<e.batchSize;++m)for(var g=0;g<e.inChannels;++g)for(var y=0;y<e.outDepth;++y){for(var x=y*r-f,b=x;b<0;)b+=i;for(var w=Math.min(e.inDepth,c+x),C=0;C<e.outHeight;++C){for(var E=C*o-p,R=E;R<0;)R+=u;for(var I=Math.min(e.inHeight,l+E),k=0;k<e.outWidth;++k){for(var S=k*a-d,A=S;A<0;)A+=s;for(var D=Math.min(e.inWidth,h+S),T=Number.NEGATIVE_INFINITY,N=-1,F=b;F<w;F+=i)for(var O=F-x,_=R;_<I;_+=u)for(var M=_-E,B=A;B<D;B+=s){var P=B-S,L=v.get(m,F,_,B,g);L>=T&&(T=L,N=O*l*h+M*l+P);}n.set(N,m,y,C,k,g);}}}return n.toTensor()},o.prototype.maxPool3dBackprop=function(t,e,n,r){kh([e,n],"maxPool3dBackprop");for(var o=this.maxPool3dPositions(e,r),a=r.strideDepth,i=r.strideHeight,u=r.strideWidth,s=r.dilationDepth,c=r.dilationHeight,l=r.dilationWidth,h=r.effectiveFilterDepth,f=r.effectiveFilterHeight,p=r.effectiveFilterWidth,d=h-1-r.padInfo.front,v=p-1-r.padInfo.left,m=f-1-r.padInfo.top,g=ur(e.shape,"float32"),y=this.bufferSync(o),x=this.bufferSync(t),b=0;b<r.batchSize;++b)for(var w=0;w<r.inChannels;++w)for(var C=0;C<r.inDepth;++C)for(var E=0;E<r.inHeight;++E)for(var R=0;R<r.inWidth;++R){for(var I=C-d,k=E-m,S=R-v,A=0,D=0;D<h;D+=s){var T=(I+D)/a;if(!(T<0||T>=r.outDepth||Math.floor(T)!==T))for(var N=0;N<f;N+=c){var F=(k+N)/i;if(!(F<0||F>=r.outHeight||Math.floor(F)!==F))for(var O=0;O<p;O+=l){var _=(S+O)/u;if(!(_<0||_>=r.outWidth||Math.floor(_)!==_)){var M=h*f*p-1-y.get(b,T,F,_,w)===D*f*p+N*p+O?1:0;if(0!==M)A+=x.get(b,T,F,_,w)*M;}}}}g.set(A,b,C,E,R,w);}return g.toTensor()},o.prototype.cast=function(t,e){return So(t,e,this)},o.prototype.reshape=function(t,e){return Ao(t,e)},o.prototype.avgPool=function(t,e){return kh(t,"avgPool"),this.pool(t,e,"avg").toFloat()},o.prototype.resizeBilinear=function(t,e,n,r){kh(t,"resizeBilinear");for(var o=t.shape,a=o[0],i=o[1],u=o[2],s=o[3],c=this.readSync(t.dataId),l=new Float32Array(w([a,e,n,s])),h=[r&&e>1?i-1:i,r&&n>1?u-1:u],f=[r&&e>1?e-1:e,r&&n>1?n-1:n],p=0,d=h[0]/f[0],v=h[1]/f[1],m=0;m<a;m++)for(var g=0;g<e;g++)for(var y=d*g,x=Math.floor(y),b=y-x,C=Math.min(i-1,Math.ceil(y)),E=m*t.strides[0]+x*t.strides[1],R=m*t.strides[0]+C*t.strides[1],I=0;I<n;I++)for(var k=v*I,S=Math.floor(k),A=k-S,D=Math.min(u-1,Math.ceil(k)),T=E+S*t.strides[2],N=R+S*t.strides[2],F=E+ +D*t.strides[2],O=R+D*t.strides[2],_=0;_<s;_++){var M=c[T+_],B=c[N+_],P=M+(c[F+_]-M)*A,L=P+(B+(c[O+_]-B)*A-P)*b;l[p++]=L;}return kn(l,[a,e,n,s])},o.prototype.resizeBilinearBackprop=function(t,e,n){kh([t,e],"resizeBilinearBackprop");for(var r=e.shape,o=r[0],a=r[1],i=r[2],u=r[3],s=t.shape,c=s[1],l=s[2],h=new Float32Array(o*a*i*u),f=[n&&c>1?a-1:a,n&&l>1?i-1:i],p=[n&&c>1?c-1:c,n&&l>1?l-1:l],d=f[0]/p[0],v=f[1]/p[1],m=this.readSync(t.dataId),g=0,y=0;y<o;y++)for(var x=y*e.strides[0],b=0;b<c;b++)for(var w=b*d,C=Math.floor(w),E=Math.min(Math.ceil(w),a-1),R=x+C*e.strides[1],I=x+E*e.strides[1],k=w-C,S=1-k,A=0;A<l;A++)for(var D=A*v,T=Math.floor(D),N=Math.min(Math.ceil(D),i-1),F=D-T,O=1-F,_=R+T*e.strides[2],M=R+N*e.strides[2],B=I+T*e.strides[2],P=I+N*e.strides[2],L=S*O,W=S*F,U=k*O,V=k*F,z=0;z<u;z++){var G=m[g++];h[_+z]+=G*L,h[M+z]+=G*W,h[B+z]+=G*U,h[P+z]+=G*V;}return Fn(h,[o,i,a,u],e.dtype)},o.prototype.resizeNearestNeighbor=function(t,e,n,r){kh(t,"resizeNearestNeighbor");for(var o=t.shape,a=o[0],i=o[1],u=o[2],s=o[3],c=this.readSync(t.dataId),l=new Float32Array(a*e*n*s),h=[r&&e>1?i-1:i,r&&n>1?u-1:u],f=[r&&e>1?e-1:e,r&&n>1?n-1:n],p=h[0]/f[0],d=h[1]/f[1],v=0,m=0;m<a;m++)for(var g=m*t.strides[0],y=0;y<e;y++)for(var x=p*y,b=g+Math.min(i-1,r?Math.round(x):Math.floor(x))*t.strides[1],w=0;w<n;w++)for(var C=d*w,E=b+Math.min(u-1,r?Math.round(C):Math.floor(C))*t.strides[2],R=0;R<s;R++){var I=c[E+R];l[v++]=I;}return kn(l,[a,e,n,s],t.dtype)},o.prototype.resizeNearestNeighborBackprop=function(t,e,n){kh([t,e],"resizeNearestNeighborBackprop");for(var r=e.shape,o=r[0],a=r[1],i=r[2],u=r[3],s=t.shape,c=s[1],l=s[2],h=new Float32Array(o*a*i*u),f=this.readSync(t.dataId),p=[n&&c>1?a-1:a,n&&l>1?i-1:i],d=[n&&c>1?c-1:c,n&&l>1?l-1:l],v=p[0]/d[0],m=p[1]/d[1],g=1/v,y=1/m,x=2*Math.ceil(g)+2,b=2*Math.ceil(y)+2,w=0;w<o;w++)for(var C=w*e.strides[0],E=0;E<a;E++)for(var R=C+E*e.strides[1],I=Math.floor(E*g),k=Math.floor(I-x/2),S=0;S<i;S++)for(var A=R+S*e.strides[2],D=Math.floor(S*y),T=Math.floor(D-b/2),N=0;N<u;N++){for(var F=0,O=0;O<x;O++){var _=O+k;if(!(_<0||_>=c)){var M=C+_*t.strides[1],B=_*v;if(E===Math.min(a-1,n?Math.round(B):Math.floor(B)))for(var P=0;P<b;P++){var L=P+T;if(!(L<0||L>=l)){var W=M+L*t.strides[2],U=L*m;S===Math.min(i-1,n?Math.round(U):Math.floor(U))&&(F+=f[W+N]);}}}}h[A+N]=F;}return Fn(h,e.shape,e.dtype)},o.prototype.batchNormalization=function(t,e,n,r,o,a){kh([t,e,n,o,a],"batchNorm");for(var i=this.readSync(t.dataId),u=this.readSync(e.dataId),s=this.readSync(n.dataId),c=o?this.readSync(o.dataId):new Float32Array([1]),l=a?this.readSync(a.dataId):new Float32Array([0]),h=new Float32Array(i.length),f=l.length,p=c.length,d=s.length,v=u.length,m=0,g=0,y=0,x=0,b=0;b<i.length;++b)h[b]=l[m++]+(i[b]-u[g++])*c[y++]/Math.sqrt(s[x++]+r),m>=f&&(m=0),g>=v&&(g=0),y>=p&&(y=0),x>=d&&(x=0);return Fn(h,t.shape)},o.prototype.localResponseNormalization4D=function(t,e,n,r,o){kh(t,"localResponseNormalization4D");var a=t.shape[3],i=a-1,u=this.readSync(t.dataId),s=t.size,c=new Float32Array(s);function l(t){for(var n=t%a,r=t-n+Math.max(0,n-e),o=t-n+Math.min(n+e,i),s=0;r<=o;r++){var c=u[r];s+=c*c;}return s}for(var h=0;h<s;h++){var f=l(h),p=u[h]*Math.pow(n+r*f,-o);c[h]=p;}return Fn(c,t.shape)},o.prototype.LRNGrad=function(t,e,n,r,o,a,i){kh(t,"LRNGrad");for(var u=t.shape[3],s=this.readSync(t.dataId),c=this.readSync(e.dataId),l=this.readSync(n.dataId),h=new Float32Array(t.size),f=t.size,p=0;p<f;p++){for(var d=p%u,v=p-d+Math.max(0,d-r),m=p-d+Math.min(u,d+r+1),g=0,y=v;y<m;y++)g+=Math.pow(c[y],2);g=a*g+o;for(y=v;y<m;y++){var x=-2*a*i*c[y]*l[p]/g;p===y&&(x+=Math.pow(g,-i)),x*=s[p],h[y]+=x;}}return Fn(h,t.shape)},o.prototype.multinomial=function(t,e,n,r){kh(t,"multinomial");for(var o=e?t:io(t),a=o.shape[0],i=o.shape[1],u=Pn([a,n],"int32"),s=this.readSync(u.dataId),c=this.readSync(o.dataId),l=0;l<a;++l){var h=l*i,f=new Float32Array(i-1);f[0]=c[h];for(var p=1;p<f.length;++p)f[p]=f[p-1]+c[h+p];for(var d=rr(r.toString()),v=l*n,m=0;m<n;++m){var g=d();s[v+m]=f.length;for(var y=0;y<f.length;y++)if(g<f[y]){s[v+m]=y;break}}}return u},o.prototype.oneHot=function(t,e,n,r){kh(t,"oneHot");var o=new Float32Array(t.size*e);o.fill(r);for(var a=this.readSync(t.dataId),i=0;i<t.size;++i)a[i]>=0&&a[i]<e&&(o[i*e+a[i]]=n);return Tn(o,[t.size,e],"int32")},o.prototype.nonMaxSuppression=function(t,e,n,r,o){return kh(t,"nonMaxSuppression"),Mo(this.readSync(t.dataId),this.readSync(e.dataId),n,r,o)},o.prototype.fft=function(t){return this.fftBatch(t,!1)},o.prototype.ifft=function(t){return this.fftBatch(t,!0)},o.prototype.fftBatch=function(t,e){for(var n=t.shape[0],r=t.shape[1],o=ur(t.shape,"float32"),a=ur(t.shape,"float32"),i=Rn(t).as2D(n,r),u=In(t).as2D(n,r),s=0;s<n;s++)for(var c=i.slice([s,0],[1,r]),l=u.slice([s,0],[1,r]),h=En(c,l),f=this.readSync(this.fftImpl(h,e).dataId),p=0;p<r;p++){var d=Fo(f,p);o.values[s*r+p]=d.real,a.values[s*r+p]=d.imag;}return En(o.toTensor(),a.toTensor()).as2D(n,r)},o.prototype.fftImpl=function(t,e){var n=t.as1D(),r=n.size;if(this.isExponentOf2(r)){var o=this.fftRadix2(n,r,e).as2D(t.shape[0],t.shape[1]);return e&&(o=En(Rn(o).div(An(r)),In(o).div(An(r)))),o}var a=this.readSync(t.dataId),i=function(t){for(var e=new Float32Array(t.length/2),n=new Float32Array(t.length/2),r=0;r<t.length;r+=2)e[r/2]=t[r],n[r/2]=t[r+1];return {real:e,imag:n}}(this.fourierTransformByMatmul(a,r,e));return En(i.real,i.imag).as2D(t.shape[0],t.shape[1])},o.prototype.isExponentOf2=function(t){return 0==(t&t-1)},o.prototype.fftRadix2=function(t,e,n){if(1===e)return t;var r=this.readSync(t.dataId),o=e/2,a=function(t){for(var e=Math.ceil(t.length/4),n=new Float32Array(e),r=new Float32Array(e),o=0;o<t.length;o+=4)n[Math.floor(o/4)]=t[o],r[Math.floor(o/4)]=t[o+1];return {real:n,imag:r}}(r),i=En(a.real,a.imag).as1D(),u=function(t){for(var e=Math.floor(t.length/4),n=new Float32Array(e),r=new Float32Array(e),o=2;o<t.length;o+=4)n[Math.floor(o/4)]=t[o],r[Math.floor(o/4)]=t[o+1];return {real:n,imag:r}}(r),s=En(u.real,u.imag).as1D();i=this.fftRadix2(i,o,n),s=this.fftRadix2(s,o,n);var c=function(t,e){for(var n=new Float32Array(t/2),r=new Float32Array(t/2),o=0;o<Math.ceil(t/2);o++){var a=(e?2:-2)*Math.PI*(o/t);n[o]=Math.cos(a),r[o]=Math.sin(a);}return {real:n,imag:r}}(e,n),l=En(c.real,c.imag).mul(s),h=i.add(l),f=i.sub(l),p=Rn(h).concat(Rn(f)),d=In(h).concat(In(f));return En(p,d).as1D()},o.prototype.fourierTransformByMatmul=function(t,e,n){for(var r=new Float32Array(2*e),o=0;o<e;o++){for(var a=0,i=0,u=0;u<e;u++){var s=_o(o*u,e,n),c=Fo(t,u);a+=c.real*s.real-c.imag*s.imag,i+=c.real*s.imag+c.imag*s.real;}n&&(a/=e,i/=e),Oo(r,a,i,o);}return r},o.prototype.depthToSpace=function(t,e,n){g("NHWC"===n,function(){return "Only NHWC dataFormat supported on CPU for depthToSpace. Got "+n}),g(e>1,function(){return "blockSize should be > 1 for depthToSpace, but was: "+e});for(var r=t.shape[0],o=t.shape[1],a=t.shape[2],i=t.shape[3],u=o*e,s=a*e,c=i/(e*e),l=this.readSync(t.dataId),h=new Float32Array(r*u*s*c),f=0,p=0;p<r;++p)for(var d=0;d<u;++d)for(var v=Math.floor(d/e),m=d%e,y=0;y<s;++y)for(var x=Math.floor(y/e),b=(m*e+y%e)*c,w=0;w<c;++w){var C=w+b+i*(x+a*(v+o*p));h[f++]=l[C];}return Fn(h,[r,u,s,c])},o.prototype.broadcastedBinaryOp=function(t,e,n,r){var o=po(t.shape,e.shape),a=ur(o,n),i=this.readSync(t.dataId),u=this.readSync(e.dataId),s=ho(t.shape,o),c=ho(e.shape,o),l=a.values;if(s.length+c.length===0)for(var h=0;h<l.length;++h)l[h]=r(i[h%i.length],u[h%u.length]);else{var f=this.bufferSync(t),p=this.bufferSync(e),d=function(n){var o=a.indexToLoc(n),h=o.slice(-t.rank);s.forEach(function(t){return h[t]=0});var d=f.locToIndex(h),v=o.slice(-e.rank);c.forEach(function(t){return v[t]=0});var m=p.locToIndex(v);l[n]=r(i[d],u[m]);};for(h=0;h<l.length;++h)d(h);}return a.toTensor()},o.prototype.broadcastedBinaryComplexOp=function(t,e,n){var r=po(t.shape,e.shape),o=ur(r,"float32"),a=ur(r,"float32"),i=this.readSync(t.dataId),u=this.readSync(e.dataId),s=ho(t.shape,r),c=ho(e.shape,r),l=o.values,h=a.values;if(s.length+c.length===0)for(var f=0;f<l.length;f++){var p=f%i.length,d=f%u.length,v=n(i[2*p],i[2*p+1],u[2*d],u[2*d+1]);l[f]=v.real,h[f]=v.imag;}else{var m=this.bufferSync(this.data.get(t.dataId).complexTensors.real),g=this.bufferSync(this.data.get(e.dataId).complexTensors.real),y=function(r){var a=o.indexToLoc(r),f=a.slice(-t.rank);s.forEach(function(t){return f[t]=0});var p=m.locToIndex(f),d=a.slice(-e.rank);c.forEach(function(t){return d[t]=0});var v=g.locToIndex(d),y=n(i[2*p],i[2*p+1],u[2*v],u[2*v+1]);l[r]=y.real,h[r]=y.imag;};for(f=0;f<l.length;f++)y(f);}return this.complex(o.toTensor(),a.toTensor())},o.prototype.split=function(t,e,n){return Po(t,e,n)},o.prototype.dispose=function(){},o.prototype.floatPrecision=function(){return 32},o.prototype.epsilon=function(){return 1e-7},o.prototype.cropAndResize=function(t,e,n,r,o,a){for(var i=t.shape,u=i[0],s=i[1],c=i[2],l=i[3],h=e.shape[0],f=r[0],p=r[1],d=ur([h,f,p,l],t.dtype),v=this.readSync(e.dataId),m=this.readSync(n.dataId),g=this.readSync(t.dataId),y=t.strides,x=d.strides,b=0;b<h;b++){var w=4*b,C=v[w],E=v[w+1],R=v[w+2],I=v[w+3],k=m[b];if(!(k>=u))for(var S=f>1?(R-C)*(s-1)/(f-1):0,A=p>1?(I-E)*(c-1)/(p-1):0,D=0;D<f;D++){var T=f>1?C*(s-1)+D*S:.5*(C+R)*(s-1);if(T<0||T>s-1)for(var N=0;N<p;N++)for(var F=0;F<l;F++){var O=F+N*x[2]+D*x[1]+b*x[0];d.values[O]=a;}else if("bilinear"===o){var _=Math.floor(T),M=Math.ceil(T),B=T-_;for(N=0;N<p;N++){if((q=p>1?E*(c-1)+N*A:.5*(E+I)*(c-1))<0||q>c-1)for(F=0;F<l;F++){O=F+N*x[2]+D*x[1]+b*x[0];d.values[O]=a;}else{var P=Math.floor(q),L=Math.ceil(q),W=q-P;for(F=0;F<l;F++){var U=g[O=F+P*y[2]+_*y[1]+k*y[0]],V=g[O=F+L*y[2]+_*y[1]+k*y[0]],z=g[O=F+P*y[2]+M*y[1]+k*y[0]],G=U+(V-U)*W,H=z+(g[O=F+L*y[2]+M*y[1]+k*y[0]]-z)*W;O=F+N*x[2]+D*x[1]+b*x[0],d.values[O]=G+(H-G)*B;}}}}else for(N=0;N<p;++N){var q;if((q=p>1?E*(c-1)+N*A:.5*(E+I)*(c-1))<0||q>c-1)for(F=0;F<l;F++){O=F+N*x[2]+D*x[1]+b*x[0];d.values[O]=a;}else{var K=Math.round(q),j=Math.round(T);for(F=0;F<l;F++){var X=F+K*y[2]+j*y[1]+k*y[0],$=F+N*x[2]+D*x[1]+b*x[0];d.values[$]=g[X];}}}}}return d.toTensor()},o.prototype.sparseToDense=function(t,e,n,r){var o=Hr(0,t,n),a=o.sliceRank,i=o.numUpdates,u=o.sliceSize,s=o.strides,c=o.outputSize;return this.scatter(t,e,n,c,u,i,a,s,r,!1)},o.prototype.gatherND=function(t,e){var n=e.shape,r=n[n.length-1],o=Ur(t,e),a=o[0],i=o[1],u=o[2],s=o[3];if(0===i)return kn([],a,t.dtype);for(var c=new lt([i,u],t.dtype),l=this.readSync(e.dataId),h=this.readSync(t.dataId),f=0;f<i;f++){for(var p=[],d=0,v=0;v<r;v++){var m=l[f*r+v];d+=m*s[v],p.push(m);}if(d<0||d>=t.size/u)throw new Error("Invalid indices: "+p+" does not index into "+t.shape);for(var g=0;g<u;g++)c.values[f*u+g]=h[d*u+g];}return c.toTensor().reshape(a)},o.prototype.scatterND=function(t,e,n){var r=Hr(0,t,n),o=r.sliceRank,a=r.numUpdates,i=r.sliceSize,u=r.strides,s=r.outputSize,c=An(0);return this.scatter(t,e,n,s,i,a,o,u,c,!0)},o.prototype.fill=function(t,e,n){var r=F(n=n||z(e),w(t));return r.fill(e),Nt.makeTensor(r,t,n,this)},o.prototype.onesLike=function(t){if("string"===t.dtype)throw new Error("onesLike is not supported for string tensors");return this.fill(t.shape,1,t.dtype)},o.prototype.zerosLike=function(t){var e=F(t.dtype,w(t.shape));return this.makeOutput(e,t.shape,t.dtype)},o.prototype.linspace=function(t,e,n){return Do(t,e,n)},o.prototype.scatter=function(t,e,n,r,o,a,i,u,s,c){var l=[r/o,o],h=this.readSync(t.dataId),f=this.readSync(e.dataId);if(0===r)return kn([],n,e.dtype);var p=new lt(l,e.dtype);p.values.fill(this.readSync(s.dataId)[0]);for(var d=0;d<a;d++){for(var v=[],m=0,g=0;g<i;g++){var y=h[d*i+g];v.push(y),m+=y*u[g];}if(m<0||m>=r/o)throw new Error("Invalid indices: "+v+" does not index into "+n);for(var x=0;x<o;x++)c?p.values[m*o+x]+=f[d*o+x]:p.values[m*o+x]=0===e.rank?f[0]:f[d*o+x];}return p.toTensor().reshape(n)},o}(co);Nt.registerBackend("cpu",function(){return new Ah},1),l$1({kernelName:"Square",backendName:"cpu",kernelFunc:function(t){var e=t.inputs,n=t.backend,r=e.x,o=n;kh(r,"square");for(var a=o.data.get(r.dataId).values,i=new Float32Array(a.length),u=0;u<a.length;++u){var s=a[u];i[u]=s*s;}return {dataId:o.write(i,r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}}),l$1({kernelName:"Square",backendName:"webgl",kernelFunc:function(t){var e=t.inputs,n=t.backend,r=e.x,o=n,a=new su(r.shape,"return x * x;");return o.runWebGLProgram(a,[r],r.dtype)}});var Dh=function(){function t(){}return t.prototype.fetch=function(t,e){return fetch(t,e)},t.prototype.now=function(){return performance.now()},t.prototype.encode=function(t,e){if("utf-8"!==e&&"utf8"!==e)throw new Error("Browser's encoder only supports utf-8, but got "+e);return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)},t.prototype.decode=function(t,e){return new TextDecoder(e).decode(t)},t}();a().get("IS_BROWSER")&&a().setPlatform("browser",new Dh);var Th,Nh=function(){return require("node-fetch")},Fh=function(){function t(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder;}return t.prototype.fetch=function(t,e){return null!=a().global.fetch?a().global.fetch(t,e):(null==Th&&(Th=Nh()),Th(t,e))},t.prototype.now=function(){var t=process.hrtime();return 1e3*t[0]+t[1]/1e6},t.prototype.encode=function(t,e){if("utf-8"!==e&&"utf8"!==e)throw new Error("Node built-in encoder only supports utf-8, but got "+e);return this.textEncoder.encode(t)},t.prototype.decode=function(t,e){return 0===t.length?"":new this.util.TextDecoder(e).decode(t)},t}();a().get("IS_NODE")&&a().setPlatform("node",new Fh);var Oh={float32:4,int32:4,uint16:2,uint8:1,bool:1},_h=4;function Mh(t,e){for(var n={},r=0,o=function(e){var o=e.name,a=e.dtype,i=e.shape,u=w(i),s=void 0;if("quantization"in e){var c=e.quantization;if("uint8"!==c.dtype&&"uint16"!==c.dtype)throw new Error("Weight "+e.name+" has unknown quantization dtype "+c.dtype+". Supported quantization dtypes are: 'uint8' and 'uint16'.");var l=Oh[c.dtype],h=t.slice(r,r+u*l),f="uint8"===c.dtype?new Uint8Array(h):new Uint16Array(h);if("float32"===a)s=Float32Array.from(f,function(t){return t*c.scale+c.min});else{if("int32"!==a)throw new Error("Unsupported dtype in weight '"+o+"': "+a);s=Int32Array.from(f,function(t){return Math.round(t*c.scale+c.min)});}r+=u*l;}else if("string"===a){var p=w(e.shape);s=[];for(var d=0;d<p;d++){var v=new Uint32Array(t.slice(r,r+_h))[0];r+=_h;var m=new Uint8Array(t.slice(r,r+v));s.push(m),r+=v;}}else{var g=Oh[a];h=t.slice(r,r+u*g);if("float32"===a)s=new Float32Array(h);else if("int32"===a)s=new Int32Array(h);else{if("bool"!==a)throw new Error("Unsupported dtype in weight '"+o+"': "+a);s=new Uint8Array(h);}r+=u*g;}n[o]=kn(s,i,a);},a=0,i=e;a<i.length;a++){o(i[a]);}return n}function Bh(t){if(null===t)throw new Error("Invalid input value: "+JSON.stringify(t));var e=0,n=[];t.forEach(function(t){if(e+=t.byteLength,n.push(t.byteLength===t.buffer.byteLength?t:new t.constructor(t)),!(t instanceof Float32Array||t instanceof Int32Array||t instanceof Uint8Array))throw new Error("Unsupported TypedArray subtype: "+t.constructor.name)});var r=new Uint8Array(e),o=0;return n.forEach(function(t){r.set(new Uint8Array(t.buffer),o),o+=t.byteLength;}),r.buffer}var Ph="undefined"!=typeof Buffer&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function Lh(t){return Ph?Buffer.byteLength(t):new Blob([t]).size}function Wh(t){var e=0;t.forEach(function(t){e+=t.byteLength;});var n=new Uint8Array(e),r=0;return t.forEach(function(t){n.set(new Uint8Array(t),r),r+=t.byteLength;}),n.buffer}function Uh(t){for(t=t.trim();t.endsWith("/");)t=t.slice(0,t.length-1);var e=t.split("/");return e[e.length-1]}function Vh(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return {dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==t.modelTopology?0:Lh(JSON.stringify(t.modelTopology)),weightSpecsBytes:null==t.weightSpecs?0:Lh(JSON.stringify(t.weightSpecs)),weightDataBytes:null==t.weightData?0:t.weightData.byteLength}}var zh=function(){function t(){this.saveRouters=[],this.loadRouters=[];}return t.getInstance=function(){return null==t.instance&&(t.instance=new t),t.instance},t.registerSaveRouter=function(e){t.getInstance().saveRouters.push(e);},t.registerLoadRouter=function(e){t.getInstance().loadRouters.push(e);},t.getSaveHandlers=function(e){return t.getHandlers(e,"save")},t.getLoadHandlers=function(e,n){return t.getHandlers(e,"load",n)},t.getHandlers=function(e,n,r){var o=[];return ("load"===n?t.getInstance().loadRouters:t.getInstance().saveRouters).forEach(function(t){var n=t(e,r);null!==n&&o.push(n);}),o},t}(),Gh="://",Hh=function(){function t(){this.managers={};}return t.getInstance=function(){return null==t.instance&&(t.instance=new t),t.instance},t.registerManager=function(e,n){g(null!=e,function(){return "scheme must not be undefined or null."}),e.endsWith(Gh)&&(e=e.slice(0,e.indexOf(Gh))),g(e.length>0,function(){return "scheme must not be an empty string."});var r=t.getInstance();g(null==r.managers[e],function(){return "A model store manager is already registered for scheme '"+e+"'."}),r.managers[e]=n;},t.getManager=function(t){var e=this.getInstance().managers[t];if(null==e)throw new Error("Cannot find model manager for scheme '"+t+"'");return e},t.getSchemes=function(){return Object.keys(this.getInstance().managers)},t}();function qh(t){if(-1===t.indexOf(Gh))throw new Error("The url string provided does not contain a scheme. Supported schemes are: "+Hh.getSchemes().join(","));return {scheme:t.split(Gh)[0],path:t.split(Gh)[1]}}function Kh(t,e,o){return void 0===o&&(o=!1),n(this,void 0,void 0,function(){var n,a,i,u,s,c,l,h,f;return r(this,function(r){switch(r.label){case 0:return g(t!==e,function(){return "Old path and new path are the same: '"+t+"'"}),g((n=zh.getLoadHandlers(t)).length>0,function(){return "Copying failed because no load handler is found for source URL "+t+"."}),g(n.length<2,function(){return "Copying failed because more than one ("+n.length+") load handlers for source URL "+t+"."}),a=n[0],g((i=zh.getSaveHandlers(e)).length>0,function(){return "Copying failed because no save handler is found for destination URL "+e+"."}),g(i.length<2,function(){return "Copying failed because more than one ("+n.length+") save handlers for destination URL "+e+"."}),u=i[0],s=qh(t).scheme,c=qh(t).path,l=s===qh(t).scheme,[4,a.load()];case 1:return h=r.sent(),o&&l?[4,Hh.getManager(s).removeModel(c)]:[3,3];case 2:r.sent(),r.label=3;case 3:return [4,u.save(h)];case 4:return f=r.sent(),!o||l?[3,6]:[4,Hh.getManager(s).removeModel(c)];case 5:r.sent(),r.label=6;case 6:return [2,f.modelArtifactsInfo]}})})}var jh="models_store",Xh="model_info_store";function $h(){if(!a().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var t=window,e=t.indexedDB||t.mozIndexedDB||t.webkitIndexedDB||t.msIndexedDB||t.shimIndexedDB;if(null==e)throw new Error("The current browser does not appear to support IndexedDB.");return e}function Yh(t){var e=t.result;e.createObjectStore(jh,{keyPath:"modelPath"}),e.createObjectStore(Xh,{keyPath:"modelPath"});}var Qh=function(){function t(t){if(this.indexedDB=$h(),null==t||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t;}return t.prototype.save=function(t){return n(this,void 0,void 0,function(){return r(this,function(e){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return [2,this.databaseAction(this.modelPath,t)]})})},t.prototype.load=function(){return n(this,void 0,void 0,function(){return r(this,function(t){return [2,this.databaseAction(this.modelPath)]})})},t.prototype.databaseAction=function(t,e){var n=this;return new Promise(function(t,r){var o=n.indexedDB.open("tensorflowjs",1);o.onupgradeneeded=function(){return Yh(o)},o.onsuccess=function(){var a=o.result;if(null==e){var i=a.transaction(jh,"readonly"),u=i.objectStore(jh).get(n.modelPath);u.onsuccess=function(){if(null==u.result)return a.close(),r(new Error("Cannot find model with path '"+n.modelPath+"' in IndexedDB."));t(u.result.modelArtifacts);},u.onerror=function(t){return a.close(),r(u.error)},i.oncomplete=function(){return a.close()};}else{var s,c=Vh(e),l=a.transaction(Xh,"readwrite"),h=l.objectStore(Xh),f=h.put({modelPath:n.modelPath,modelArtifactsInfo:c});f.onsuccess=function(){var o=(s=a.transaction(jh,"readwrite")).objectStore(jh).put({modelPath:n.modelPath,modelArtifacts:e,modelArtifactsInfo:c});o.onsuccess=function(){return t({modelArtifactsInfo:c})},o.onerror=function(t){var e=(h=l.objectStore(Xh)).delete(n.modelPath);e.onsuccess=function(){return a.close(),r(o.error)},e.onerror=function(t){return a.close(),r(o.error)};};},f.onerror=function(t){return a.close(),r(f.error)},l.oncomplete=function(){null==s?a.close():s.oncomplete=function(){return a.close()};};}},o.onerror=function(t){return r(o.error)};})},t.URL_SCHEME="indexeddb://",t}(),Jh=function(t){return a().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(Qh.URL_SCHEME)?(e=t.slice(Qh.URL_SCHEME.length),new Qh(e)):null;var e;};zh.registerSaveRouter(Jh),zh.registerLoadRouter(Jh);var Zh=function(){function t(){this.indexedDB=$h();}return t.prototype.listModels=function(){return n(this,void 0,void 0,function(){var t=this;return r(this,function(e){return [2,new Promise(function(e,n){var r=t.indexedDB.open("tensorflowjs",1);r.onupgradeneeded=function(){return Yh(r)},r.onsuccess=function(){var t=r.result,o=t.transaction(Xh,"readonly"),a=o.objectStore(Xh).getAll();a.onsuccess=function(){for(var t={},n=0,r=a.result;n<r.length;n++){var o=r[n];t[o.modelPath]=o.modelArtifactsInfo;}e(t);},a.onerror=function(e){return t.close(),n(a.error)},o.oncomplete=function(){return t.close()};},r.onerror=function(t){return n(r.error)};})]})})},t.prototype.removeModel=function(t){return n(this,void 0,void 0,function(){var e=this;return r(this,function(n){var r;return t=(r=t).startsWith(Qh.URL_SCHEME)?r.slice(Qh.URL_SCHEME.length):r,[2,new Promise(function(n,r){var o=e.indexedDB.open("tensorflowjs",1);o.onupgradeneeded=function(){return Yh(o)},o.onsuccess=function(){var e,a=o.result,i=a.transaction(Xh,"readwrite"),u=i.objectStore(Xh),s=u.get(t);s.onsuccess=function(){if(null==s.result)return a.close(),r(new Error("Cannot find model with path '"+t+"' in IndexedDB."));var o=u.delete(t),i=function(){var o=(e=a.transaction(jh,"readwrite")).objectStore(jh).delete(t);o.onsuccess=function(){return n(s.result.modelArtifactsInfo)},o.onerror=function(t){return r(s.error)};};o.onsuccess=i,o.onerror=function(t){return i(),a.close(),r(s.error)};},s.onerror=function(t){return a.close(),r(s.error)},i.oncomplete=function(){null==e?a.close():e.oncomplete=function(){return a.close()};};},o.onerror=function(t){return r(o.error)};})]})})},t}();if(a().getBool("IS_BROWSER"))try{Hh.registerManager(Qh.URL_SCHEME,new Zh);}catch(t){}var tf="/",ef="tensorflowjs_models",nf="info",rf="model_topology",of="weight_specs",af="weight_data",uf="model_metadata";function sf(t){return {info:[ef,t,nf].join(tf),topology:[ef,t,rf].join(tf),weightSpecs:[ef,t,of].join(tf),weightData:[ef,t,af].join(tf),modelMetadata:[ef,t,uf].join(tf)}}function cf(t){var e=t.split(tf);if(e.length<3)throw new Error("Invalid key format: "+t);return e.slice(1,e.length-1).join(tf)}var lf=function(){function t(t){if(!a().getBool("IS_BROWSER")||void 0===window.localStorage)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==t||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=sf(this.modelPath);}return t.prototype.save=function(t){return n(this,void 0,void 0,function(){var e,n,o;return r(this,function(r){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");e=JSON.stringify(t.modelTopology),n=JSON.stringify(t.weightSpecs),o=Vh(t);try{return this.LS.setItem(this.keys.info,JSON.stringify(o)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,(a=t.weightData,Ph?Buffer.from(a).toString("base64"):btoa(String.fromCharCode.apply(null,new Uint8Array(a))))),this.LS.setItem(this.keys.modelMetadata,JSON.stringify({format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy})),[2,{modelArtifactsInfo:o}]}catch(t){throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error("Failed to save model '"+this.modelPath+"' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes="+o.modelTopologyBytes+", weightSpecsBytes="+o.weightSpecsBytes+", weightDataBytes="+o.weightDataBytes+".")}var a;return [2]})})},t.prototype.load=function(){return n(this,void 0,void 0,function(){var t,e,n,o,a,i,u;return r(this,function(r){if(null==(t=JSON.parse(this.LS.getItem(this.keys.info))))throw new Error("In local storage, there is no model with name '"+this.modelPath+"'");if("JSON"!==t.modelTopologyType)throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(e={},null==(n=JSON.parse(this.LS.getItem(this.keys.topology))))throw new Error("In local storage, the topology of model '"+this.modelPath+"' is missing.");if(e.modelTopology=n,null==(o=JSON.parse(this.LS.getItem(this.keys.weightSpecs))))throw new Error("In local storage, the weight specs of model '"+this.modelPath+"' are missing.");if(e.weightSpecs=o,null!=(a=this.LS.getItem(this.keys.modelMetadata))&&(i=JSON.parse(a),e.format=i.format,e.generatedBy=i.generatedBy,e.convertedBy=i.convertedBy),null==(u=this.LS.getItem(this.keys.weightData)))throw new Error("In local storage, the binary weight values of model '"+this.modelPath+"' are missing.");return e.weightData=function(t){if(Ph){var e=Buffer.from(t,"base64");return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}for(var n=atob(t),r=new Uint8Array(n.length),o=0;o<n.length;++o)r.set([n.charCodeAt(o)],o);return r.buffer}(u),[2,e]})})},t.URL_SCHEME="localstorage://",t}(),hf=function(t){return a().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(lf.URL_SCHEME)?(e=t.slice(lf.URL_SCHEME.length),new lf(e)):null;var e;};zh.registerSaveRouter(hf),zh.registerLoadRouter(hf);var ff=function(){function t(){g(a().getBool("IS_BROWSER"),function(){return "Current environment is not a web browser"}),g(void 0!==window.localStorage,function(){return "Current browser does not appear to support localStorage"}),this.LS=window.localStorage;}return t.prototype.listModels=function(){return n(this,void 0,void 0,function(){var t,e,n,o,a,i;return r(this,function(r){for(t={},e=ef+tf,n=tf+nf,o=0;o<this.LS.length;++o)(a=this.LS.key(o)).startsWith(e)&&a.endsWith(n)&&(i=cf(a),t[i]=JSON.parse(this.LS.getItem(a)));return [2,t]})})},t.prototype.removeModel=function(t){return n(this,void 0,void 0,function(){var e,n;return r(this,function(r){var o;if(t=(o=t).startsWith(lf.URL_SCHEME)?o.slice(lf.URL_SCHEME.length):o,e=sf(t),null==this.LS.getItem(e.info))throw new Error("Cannot find model at path '"+t+"'");return n=JSON.parse(this.LS.getItem(e.info)),this.LS.removeItem(e.info),this.LS.removeItem(e.topology),this.LS.removeItem(e.weightSpecs),this.LS.removeItem(e.weightData),[2,n]})})},t}();if(a().getBool("IS_BROWSER"))try{Hh.registerManager(lf.URL_SCHEME,new ff);}catch(t){}var pf="model",df=".json",vf=".weights.bin";function mf(t){return new Promise(function(t){return setTimeout(t)}).then(t)}var gf=function(){function t(e){if(!a().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(t.URL_SCHEME)&&(e=e.slice(t.URL_SCHEME.length)),null!=e&&0!==e.length||(e=pf),this.modelTopologyFileName=e+df,this.weightDataFileName=e+vf;}return t.prototype.save=function(t){return n(this,void 0,void 0,function(){var e,n,o,a,i,u;return r(this,function(r){switch(r.label){case 0:if("undefined"==typeof document)throw new Error("Browser downloads are not supported in this environment since `document` is not present");if(e=window.URL.createObjectURL(new Blob([t.weightData],{type:"application/octet-stream"})),!(t.modelTopology instanceof ArrayBuffer))return [3,1];throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],o={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,weightsManifest:n},a=window.URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"})),(i=null==this.jsonAnchor?document.createElement("a"):this.jsonAnchor).download=this.modelTopologyFileName,i.href=a,[4,mf(function(){return i.dispatchEvent(new MouseEvent("click"))})];case 2:return r.sent(),null==t.weightData?[3,4]:((u=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,u.href=e,[4,mf(function(){return u.dispatchEvent(new MouseEvent("click"))})]);case 3:r.sent(),r.label=4;case 4:return [2,{modelArtifactsInfo:Vh(t)}]}})})},t.URL_SCHEME="downloads://",t}(),yf=function(){function t(t){if(null==t||t.length<1)throw new Error("When calling browserFiles, at least 1 file is required, but received "+t);this.files=t;}return t.prototype.load=function(){return n(this,void 0,void 0,function(){var t,e,n=this;return r(this,function(r){return t=this.files[0],e=this.files.slice(1),[2,new Promise(function(r,o){var a=new FileReader;a.onload=function(a){var i=JSON.parse(a.target.result),u=i.modelTopology;if(null!=u){0===e.length&&r({modelTopology:u});var s=i.weightsManifest;if(null!=s){var c;try{c=n.checkManifestAndWeightFiles(s,e);}catch(t){return void o(t)}var l=[],h=[],f=[];s.forEach(function(t){t.paths.forEach(function(t){h.push(t),f.push(null);}),l.push.apply(l,t.weights);}),s.forEach(function(t){t.paths.forEach(function(t){var e=new FileReader;e.onload=function(e){var n=e.target.result,o=h.indexOf(t);f[o]=n,-1===f.indexOf(null)&&r({modelTopology:u,weightSpecs:l,weightData:Wh(f)});},e.onerror=function(e){return o("Failed to weights data from file of path '"+t+"'.")},e.readAsArrayBuffer(c[t]);});});}else o(new Error("weightManifest field is missing from file "+t.name));}else o(new Error("modelTopology field is missing from file "+t.name));},a.onerror=function(e){return o("Failed to read model topology and weights manifest JSON from file '"+t.name+"'. BrowserFiles supports loading Keras-style tf.Model artifacts only.")},a.readAsText(t);})]})})},t.prototype.checkManifestAndWeightFiles=function(t,e){for(var n=[],r=e.map(function(t){return Uh(t.name)}),o={},a=0,i=t;a<i.length;a++){i[a].paths.forEach(function(t){var a=Uh(t);if(-1!==n.indexOf(a))throw new Error("Duplicate file basename found in weights manifest: '"+a+"'");if(n.push(a),-1===r.indexOf(a))throw new Error("Weight file with basename '"+a+"' is not provided.");o[t]=e[r.indexOf(a)];});}if(n.length!==e.length)throw new Error("Mismatch in the number of files in weights manifest ("+n.length+") and the number of weight files provided ("+e.length+").");return o},t}();function xf(t,e,n,r){!function(t){g(null!=t&&Array.isArray(t)&&t.length>0,function(){return "promises must be a none empty array"});}(t),function(t,e){g(t>=0&&t<=1,function(){return "Progress fraction must be in range [0, 1], but got startFraction "+t}),g(e>=0&&e<=1,function(){return "Progress fraction must be in range [0, 1], but got endFraction "+e}),g(e>=t,function(){return "startFraction must be no more than endFraction, but got startFraction "+t+" and endFraction "+e});}(n=null==n?0:n,r=null==r?1:r);var o=0;return Promise.all(t.map(function(a){return a.then(function(a){var i=n+ ++o/t.length*(r-n);return e(i),a}),a}))}function bf(t,e){return n(this,void 0,void 0,function(){var n,o,i,u,s,c,l,h,f;return r(this,function(r){switch(r.label){case 0:return null==e&&(e={}),n=null==e.fetchFunc?a().platform.fetch:e.fetchFunc,o=t.map(function(t){return n(t,e.requestInit,{isBinary:!0})}),i=0,u=.5,null!=e.onProgress?[3,2]:[4,Promise.all(o)];case 1:return s=r.sent(),[3,4];case 2:return [4,xf(o,e.onProgress,i,u)];case 3:s=r.sent(),r.label=4;case 4:return c=s.map(function(t){return t.arrayBuffer()}),l=.5,h=1,null!=e.onProgress?[3,6]:[4,Promise.all(c)];case 5:return f=r.sent(),[3,8];case 6:return [4,xf(c,e.onProgress,l,h)];case 7:f=r.sent(),r.label=8;case 8:return [2,f]}})})}function wf(t){var e=this;return function(o,a,i){return void 0===a&&(a=""),n(e,void 0,void 0,function(){var e,n,u,s,c,l,h,f,p,d;return r(this,function(r){switch(r.label){case 0:if(e=o.map(function(){return !1}),n={},u=null!=i?i.map(function(){return !1}):[],s=[],o.forEach(function(t,r){var o=0;t.weights.forEach(function(t){var a="quantization"in t?t.quantization.dtype:t.dtype,c=Oh[a]*w(t.shape),l=function(){e[r]=!0,null==n[r]&&(n[r]=[]),n[r].push({manifestEntry:t,groupOffset:o,sizeBytes:c});};null!=i?i.forEach(function(e,n){e===t.name&&(l(),u[n]=!0);}):l(),s.push(t.name),o+=c;});}),!u.every(function(t){return t}))throw c=i.filter(function(t,e){return !u[e]}),new Error("Could not find weights in manifest with names: "+c.join(", ")+". \nManifest JSON has weights with names: "+s.join(", ")+".");return l=e.reduce(function(t,e,n){return e&&t.push(n),t},[]),h=[],l.forEach(function(t){o[t].paths.forEach(function(t){var e=a+(a.endsWith("/")?"":"/")+t;h.push(e);});}),[4,t(h)];case 1:return f=r.sent(),p={},d=0,l.forEach(function(t){for(var e=o[t].paths.length,r=0,a=0;a<e;a++)r+=f[d+a].byteLength;for(var i=new ArrayBuffer(r),u=new Uint8Array(i),s=0,c=0;c<e;c++){var l=new Uint8Array(f[d+c]);u.set(l,s),s+=l.byteLength;}n[t].forEach(function(t){var e=Mh(i.slice(t.groupOffset,t.groupOffset+t.sizeBytes),[t.manifestEntry]);for(var n in e)p[n]=e[n];}),d+=e;}),[2,p]}})})}}zh.registerSaveRouter(function(t){return a().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(gf.URL_SCHEME)?(e=t.slice(gf.URL_SCHEME.length),void 0===e&&(e="model"),new gf(e)):null;var e;});var Cf=function(){function t(t,e){if(this.DEFAULT_METHOD="POST",null==e&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.onProgress=e.onProgress,null!=e.fetchFunc?(g("function"==typeof e.fetchFunc,function(){return "Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"}),this.fetch=e.fetchFunc):this.fetch=a().platform.fetch,g(null!=t&&t.length>0,function(){return "URL path for http must not be null, undefined or empty."}),Array.isArray(t)&&g(2===t.length,function(){return "URL paths for http must have a length of 2, (actual length is "+t.length+")."}),this.path=t,null!=e.requestInit&&null!=e.requestInit.body)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{};}return t.prototype.save=function(t){return n(this,void 0,void 0,function(){var e,n,o,a;return r(this,function(r){switch(r.label){case 0:if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return (e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,n=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],o={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,userDefinedMetadata:t.userDefinedMetadata,weightsManifest:n},e.body.append("model.json",new Blob([JSON.stringify(o)],{type:"application/json"}),"model.json"),null!=t.weightData&&e.body.append("model.weights.bin",new Blob([t.weightData],{type:"application/octet-stream"}),"model.weights.bin"),[4,this.fetch(this.path,e)];case 1:if((a=r.sent()).ok)return [2,{modelArtifactsInfo:Vh(t),responses:[a]}];throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+a.status+".")}})})},t.prototype.load=function(){return n(this,void 0,void 0,function(){var t,e,n,o,a,i,u,s;return r(this,function(r){switch(r.label){case 0:return [4,this.fetch(this.path,this.requestInit)];case 1:if(!(t=r.sent()).ok)throw new Error("Request to "+this.path+" failed with status code "+t.status+". Please verify this URL points to the model JSON of the model to load.");r.label=2;case 2:return r.trys.push([2,4,,5]),[4,t.json()];case 3:return e=r.sent(),[3,5];case 4:throw r.sent(),n="Failed to parse model JSON of response from "+this.path+".",this.path.endsWith(".pb")?n+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":n+=" Please make sure the server is serving valid JSON for this request.",new Error(n);case 5:if(o=e.modelTopology,a=e.weightsManifest,null==o&&null==a)throw new Error("The JSON from HTTP path "+this.path+" contains neither model topology or manifest for weights.");return null==a?[3,7]:[4,this.loadWeights(a)];case 6:s=r.sent(),i=s[0],u=s[1],r.label=7;case 7:return [2,{modelTopology:o,weightSpecs:i,weightData:u}]}})})},t.prototype.loadWeights=function(t){return n(this,void 0,void 0,function(){var e,n,o,a,i,u,s,c,l,h,f;return r(this,function(r){switch(r.label){case 0:for(e=Array.isArray(this.path)?this.path[1]:this.path,n=function(t){var e=t.lastIndexOf("/"),n=t.lastIndexOf("?"),r=t.substring(0,e),o=n>e?t.substring(n):"";return [r+"/",o]}(e),o=n[0],a=n[1],i=this.weightPathPrefix||o,u=[],s=0,c=t;s<c.length;s++)l=c[s],u.push.apply(u,l.weights);return h=[],t.forEach(function(t){t.paths.forEach(function(t){h.push(i+t+a);});}),[4,bf(h,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress})];case 1:return f=r.sent(),[2,[u,Wh(f)]]}})})},t.URL_SCHEME_REGEX=/^https?:\/\//,t}();function Ef(t){return null!=t.match(Cf.URL_SCHEME_REGEX)}var Rf=function(t,e){if("undefined"==typeof fetch)return null;return (Array.isArray(t)?t.every(function(t){return Ef(t)}):Ef(t))?If(t,{onProgress:e}):null};function If(t,e){return new Cf(t,e)}zh.registerSaveRouter(Rf),zh.registerLoadRouter(Rf);var kf=function(){function t(t){this.modelArtifacts=t;}return t.prototype.load=function(){return n(this,void 0,void 0,function(){return r(this,function(t){return [2,this.modelArtifacts]})})},t}(),Sf=function(){function t(t){this.saveHandler=t;}return t.prototype.save=function(t){return n(this,void 0,void 0,function(){return r(this,function(e){return [2,this.saveHandler(t)]})})},t}();var Af=Object.freeze({browserFiles:function(t){return new yf(t)},browserHTTPRequest:function(t,e){return If(t,e)},concatenateArrayBuffers:Wh,decodeWeights:Mh,encodeWeights:function(t,e){return n(this,void 0,void 0,function(){var o,a,i,u,s,c=this;return r(this,function(l){switch(l.label){case 0:for(o=[],a=[],i=Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t),u=function(u){var s=i[u],l=Array.isArray(t)?t[u].tensor:t[s];if("float32"!==l.dtype&&"int32"!==l.dtype&&"bool"!==l.dtype&&"string"!==l.dtype)throw new Error("Unsupported dtype in weight '"+s+"': "+l.dtype);var h={name:s,shape:l.shape,dtype:l.dtype};if("string"===l.dtype){var f=new Promise(function(t){return n(c,void 0,void 0,function(){var e,n,o,a,i,u,s;return r(this,function(r){switch(r.label){case 0:return [4,l.bytes()];case 1:for(e=r.sent(),n=e.reduce(function(t,e){return t+e.length},0)+_h*e.length,o=new Uint8Array(n),a=0,i=0;i<e.length;i++)u=e[i],s=new Uint8Array(new Uint32Array([u.length]).buffer),o.set(s,a),a+=_h,o.set(u,a),a+=u.length;return t(o),[2]}})})});a.push(f);}else a.push(l.data());null!=e&&(h.group=e),o.push(h);},s=0;s<i.length;++s)u(s);return [4,Promise.all(a)];case 1:return [2,{data:Bh(l.sent()),specs:o}]}})})},fromMemory:function(t,e,n,r){return 1===arguments.length?null!=t.modelTopology||null!=t.weightSpecs?new kf(t):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new kf({modelTopology:t})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new kf({modelTopology:t,weightSpecs:e,weightData:n,trainingConfig:r}))},getLoadHandlers:function(t,e){return zh.getLoadHandlers(t,e)},getModelArtifactsInfoForJSON:Vh,getSaveHandlers:function(t){return zh.getSaveHandlers(t)},http:If,isHTTPScheme:Ef,loadWeights:function(t,e,o,a){return void 0===e&&(e=""),n(this,void 0,void 0,function(){return r(this,function(n){return [2,wf(function(t){return bf(t,{requestInit:a})})(t,e,o)]})})},registerLoadRouter:function(t){return zh.registerLoadRouter(t)},registerSaveRouter:function(t){return zh.registerSaveRouter(t)},weightsLoaderFactory:wf,withSaveHandler:function(t){return new Sf(t)},copyModel:function(t,e){return n(this,void 0,void 0,function(){return r(this,function(n){return [2,Kh(t,e,!1)]})})},listModels:function(){return n(this,void 0,void 0,function(){var t,e,n,o,a,i,u;return r(this,function(r){switch(r.label){case 0:t=Hh.getSchemes(),e={},n=0,o=t,r.label=1;case 1:return n<o.length?(a=o[n],[4,Hh.getManager(a).listModels()]):[3,4];case 2:for(u in i=r.sent())e[a+Gh+u]=i[u];r.label=3;case 3:return n++,[3,1];case 4:return [2,e]}})})},moveModel:function(t,e){return n(this,void 0,void 0,function(){return r(this,function(n){return [2,Kh(t,e,!0)]})})},removeModel:function(t){return n(this,void 0,void 0,function(){var e;return r(this,function(n){return e=qh(t),[2,Hh.getManager(e.scheme).removeModel(e.path)]})})}});var Df=Cn({confusionMatrix_:function(t,e,n){var r=ln(t,"labels","confusionMatrix"),o=ln(e,"predictions","confusionMatrix");g(null==n||n>0&&Number.isInteger(n),function(){return "If provided, numClasses must be a positive integer, but got "+n}),g(1===r.rank,function(){return "Expected the rank of labels to be 1, but got "+r.rank}),g(1===o.rank,function(){return "Expected the rank of predictions to be 1, but got "+o.rank}),g(r.shape[0]===o.shape[0],function(){return "Mismatch in the number of examples: "+r.shape[0]+" vs. "+o.shape[0]+". Labels and predictions should have the same number of elements."}),g(n>0&&Number.isInteger(n),function(){return "numClasses is required to be a positive integer, but got "+n});var a=gr(r.asType("int32"),n),i=gr(o.asType("int32"),n);return a.transpose().matMul(i).asType("int32")}}),Tf=Object.freeze({confusionMatrix:Df});var Nf=Cn({fromPixels_:function(t,e){if(void 0===e&&(e=3),e>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");var n="undefined"!=typeof HTMLVideoElement&&t instanceof HTMLVideoElement;if(n&&n&&t.readyState<2)throw new Error("The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.");return Nt.fromPixels(t,e)}}),Ff=Object.freeze({toPixels:function(t,e){return n(this,void 0,void 0,function(){var n,o,a,i,u,s,c,l,h,f,p,d,v,m,g,y,x,b,w,C,E,R,I;return r(this,function(r){switch(r.label){case 0:if(n=ln(t,"img","toPixels"),t instanceof dt||(n=n.toInt()),2!==n.rank&&3!==n.rank)throw new Error("toPixels only supports rank 2 or 3 tensors, got rank "+n.rank+".");if(o=n.shape.slice(0,2),a=o[0],i=o[1],(u=2===n.rank?1:n.shape[2])>4||2===u)throw new Error("toPixels only supports depth of size 1, 3 or 4 but got "+u);return [4,n.data()];case 1:return s=r.sent(),c=n.min(),l=n.max(),[4,Promise.all([c.data(),l.data()])];case 2:if(h=r.sent(),f=h[0],p=h[1],d=f[0],v=p[0],c.dispose(),l.dispose(),"float32"===n.dtype){if(d<0||v>1)throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range ["+d+" - "+v+"].")}else{if("int32"!==n.dtype)throw new Error("Unsupported type for toPixels: "+n.dtype+". Please use float32 or int32 tensors.");if(d<0||v>255)throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range ["+d+" - "+v+"].")}for(m="float32"===n.dtype?255:1,g=new Uint8ClampedArray(i*a*4),y=0;y<a*i;++y)x=void 0,b=void 0,w=void 0,C=void 0,1===u?(x=s[y]*m,b=s[y]*m,w=s[y]*m,C=255):3===u?(x=s[3*y]*m,b=s[3*y+1]*m,w=s[3*y+2]*m,C=255):4===u&&(x=s[4*y]*m,b=s[4*y+1]*m,w=s[4*y+2]*m,C=s[4*y+3]*m),g[0+(E=4*y)]=Math.round(x),g[E+1]=Math.round(b),g[E+2]=Math.round(w),g[E+3]=Math.round(C);return null!=e&&(e.width=i,e.height=a,R=e.getContext("2d"),I=new ImageData(g,i,a),R.putImageData(I,0,0)),n!==t&&n.dispose(),[2,g]}})})},fromPixels:Nf}),Of=function(){function t(){}return t.prototype.getClassName=function(){return this.constructor.className},t.fromConfig=function(t,e){return new t(e)},t}(),_f=function(){function t(){this.classNameMap={};}return t.getMap=function(){return null==t.instance&&(t.instance=new t),t.instance},t.register=function(e){t.getMap().classNameMap[e.className]=[e,e.fromConfig];},t}();function Mf(t){g(null!=t.className,function(){return "Class being registered does not have the static className property defined."}),g("string"==typeof t.className,function(){return "className is required to be a string, but got type "+typeof t.className}),g(t.className.length>0,function(){return "Class being registered has an empty-string as its className, which is disallowed."}),_f.register(t);}var Bf=Object.freeze({Serializable:Of,SerializationMap:_f,registerClass:Mf}),Pf=.001,Lf=.1;function Wf(){return 32===Nt.backend.floatPrecision()?Pf:Lf}function Uf(t,e,n){var r=!0;if((B(t)||B(e))&&(r=!1),B(t)&&B(e)&&(r=!0),r){var o=t.constructor.name,a=e.constructor.name;if(o!==a)throw new Error("Arrays are of different type. Actual: "+o+". Expected: "+a)}if(Array.isArray(t)&&Array.isArray(e)){var i=sn(t),u=sn(e);if(!C(i,u))throw new Error("Arrays have different shapes. Actual: ["+i+"]. Expected: ["+u+"]")}var s=B(t)?t:b(t),c=B(e)?e:b(e);if(s.length!==c.length)throw new Error("Arrays have different lengths actual: "+s.length+" vs expected: "+c.length+".\nActual:   "+s+".\nExpected: "+c+".");for(var l=0;l<c.length;++l){var h=s[l],f=c[l];if(!n(h,f))throw new Error("Arrays differ: actual["+l+"] = "+h+", expected["+l+"] = "+f+".\nActual:   "+s+".\nExpected: "+c+".")}}function Vf(t,e,n){return !isFinite(t)&&!isFinite(e)||!(isNaN(t)||isNaN(e)||Math.abs(t-e)>n)}var zf=Object.freeze({TEST_EPSILON_FLOAT16:Lf,expectArraysClose:function(t,e,n){return null==n&&(n=Wf()),Uf(t,e,function(t,e){return Vf(t,e,n)})},testEpsilon:Wf,expectPromiseToFail:function(t,e){t().then(function(){return e.fail()},function(){return e()});},expectArraysEqual:function(t,e){var n="string"==typeof e||"number"==typeof e||"boolean"==typeof e?[e]:e;return W(t)||W(t[0])||W(e)||W(e[0])?Uf(t,n,function(t,e){return t==e}):Uf(t,e,function(t,e){return Vf(t,e,0)})},expectNumbersClose:function(t,e,n){if(null==n&&(n=Wf()),!Vf(t,e,n))throw new Error("Numbers differ: actual === "+t+", expected === "+e)},expectValuesInRange:function(t,e,n){for(var r=0;r<t.length;r++)if(t[r]<e||t[r]>n)throw new Error("Value out of range:"+t[r]+" low: "+e+", high: "+n)},expectArrayBuffersEqual:function(t,e){expect(new Float32Array(t)).toEqual(new Float32Array(e));}}),Gf="1.3.2";var Hf=Object.freeze({gpgpu_util:wi,webgl_util:Pe,forceHalfFloat:function(){a().set("WEBGL_FORCE_F16_TEXTURES",!0);},MathBackendWebGL:Wu,setWebGLContext:Wt,GPGPUContext:Ci}),qf=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return e(o,t),o.prototype.minimize=function(t,e,n){void 0===e&&(e=!1);var r=this.computeGradients(t,n),o=r.value,a=r.grads;if(null!=n){var i=n.map(function(t){return {name:t.name,tensor:a[t.name]}});this.applyGradients(i);}else this.applyGradients(a);return Xe(a),e?o:(o.dispose(),null)},Object.defineProperty(o.prototype,"iterations",{get:function(){return null==this.iterations_&&(this.iterations_=0),this.iterations_},enumerable:!0,configurable:!0}),o.prototype.incrementIterations=function(){this.iterations_=this.iterations+1;},o.prototype.computeGradients=function(t,e){return ro(t,e)},o.prototype.dispose=function(){null!=this.iterations_&&Xe(this.iterations_);},o.prototype.saveIterations=function(){return n(this,void 0,void 0,function(){return r(this,function(t){return null==this.iterations_&&(this.iterations_=0),[2,{name:"iter",tensor:An(this.iterations_,"int32")}]})})},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){return r(this,function(t){throw new Error("getWeights() is not implemented for this optimizer yet.")})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){return r(this,function(t){throw new Error("setWeights() is not implemented for this optimizer class "+this.getClassName())})})},o.prototype.extractIterations=function(t){return n(this,void 0,void 0,function(){var e;return r(this,function(n){switch(n.label){case 0:return e=this,[4,t[0].tensor.data()];case 1:return e.iterations_=n.sent()[0],[2,t.slice(1)]}})})},o}(Of);Object.defineProperty(qf,Symbol.hasInstance,{value:function(t){return null!=t.minimize&&null!=t.computeGradients&&null!=t.applyGradients}});var Kf=function(t){function o(e,n,r){void 0===r&&(r=null);var o=t.call(this)||this;return o.learningRate=e,o.rho=n,o.epsilon=r,o.accumulatedGrads=[],o.accumulatedUpdates=[],null==r&&(o.epsilon=Nt.backend.epsilon()),o}return e(o,t),o.prototype.applyGradients=function(t){var e=this;(Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t)).forEach(function(n,r){var o=Nt.registeredVariables[n];null==e.accumulatedGrads[r]&&(e.accumulatedGrads[r]={originalName:n+"/accum_grad",variable:je(function(){return zn(o).variable(!1)})}),null==e.accumulatedUpdates[r]&&(e.accumulatedUpdates[r]={originalName:n+"/accum_var",variable:je(function(){return zn(o).variable(!1)})});var a=Array.isArray(t)?t[r].tensor:t[n];if(null!=a){var i=e.accumulatedGrads[r].variable,u=e.accumulatedUpdates[r].variable;je(function(){var t=i.mul(e.rho).add(a.square().mul(1-e.rho)),n=u.add(e.epsilon).sqrt().div(i.add(e.epsilon).sqrt()).mul(a),r=u.mul(e.rho).add(n.square().mul(1-e.rho));i.assign(t),u.assign(r);var s=n.mul(-e.learningRate).add(o);o.assign(s);});}}),this.incrementIterations();},o.prototype.dispose=function(){null!=this.accumulatedUpdates&&(Xe(this.accumulatedGrads.map(function(t){return t.variable})),Xe(this.accumulatedUpdates.map(function(t){return t.variable})));},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){var t;return r(this,function(e){switch(e.label){case 0:return t=this.accumulatedGrads.concat(this.accumulatedUpdates),[4,this.saveIterations()];case 1:return [2,[e.sent()].concat(t.map(function(t){return {name:t.originalName,tensor:t.variable}}))]}})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){var e;return r(this,function(n){switch(n.label){case 0:return [4,this.extractIterations(t)];case 1:return t=n.sent(),e=t.length/2,this.accumulatedGrads=t.slice(0,e).map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),this.accumulatedUpdates=t.slice(e,2*e).map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),[2]}})})},o.prototype.getConfig=function(){return {learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},o.fromConfig=function(t,e){return new t(e.learningRate,e.rho,e.epsilon)},o.className="Adadelta",o}(qf);Mf(Kf);var jf=function(t){function o(e,n){void 0===n&&(n=.1);var r=t.call(this)||this;return r.learningRate=e,r.initialAccumulatorValue=n,r.accumulatedGrads=[],r}return e(o,t),o.prototype.applyGradients=function(t){var e=this;(Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t)).forEach(function(n,r){var o=Nt.registeredVariables[n];if(null==e.accumulatedGrads[r]){e.accumulatedGrads[r]={originalName:n+"/accumulator",variable:je(function(){return Ln(o.shape,e.initialAccumulatorValue).variable(!1)})};}var a=Array.isArray(t)?t[r].tensor:t[n];if(null!=a){var i=e.accumulatedGrads[r].variable;je(function(){var t=i.add(a.square());i.assign(t);var n=a.div(t.add(Nt.backend.epsilon()).sqrt()).mul(-e.learningRate).add(o);o.assign(n);});}}),this.incrementIterations();},o.prototype.dispose=function(){null!=this.accumulatedGrads&&Xe(this.accumulatedGrads.map(function(t){return t.variable}));},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){return r(this,function(t){switch(t.label){case 0:return [4,this.saveIterations()];case 1:return [2,[t.sent()].concat(this.accumulatedGrads.map(function(t){return {name:t.originalName,tensor:t.variable}}))]}})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){return r(this,function(e){switch(e.label){case 0:return [4,this.extractIterations(t)];case 1:return t=e.sent(),this.accumulatedGrads=t.map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),[2]}})})},o.prototype.getConfig=function(){return {learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},o.fromConfig=function(t,e){return new t(e.learningRate,e.initialAccumulatorValue)},o.className="Adagrad",o}(qf);Mf(jf);var Xf=function(t){function o(e,n,r,o){void 0===o&&(o=null);var a=t.call(this)||this;return a.learningRate=e,a.beta1=n,a.beta2=r,a.epsilon=o,a.accumulatedFirstMoment=[],a.accumulatedSecondMoment=[],je(function(){a.accBeta1=An(n).variable(),a.accBeta2=An(r).variable();}),null==o&&(a.epsilon=Nt.backend.epsilon()),a}return e(o,t),o.prototype.applyGradients=function(t){var e=this,n=Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t);je(function(){var r=uc(1,e.accBeta1),o=uc(1,e.accBeta2);n.forEach(function(n,a){var i=Nt.registeredVariables[n];null==e.accumulatedFirstMoment[a]&&(e.accumulatedFirstMoment[a]={originalName:n+"/m",variable:je(function(){return zn(i).variable(!1)})}),null==e.accumulatedSecondMoment[a]&&(e.accumulatedSecondMoment[a]={originalName:n+"/v",variable:je(function(){return zn(i).variable(!1)})});var u=Array.isArray(t)?t[a].tensor:t[n];if(null!=u){var s=e.accumulatedFirstMoment[a].variable,c=e.accumulatedSecondMoment[a].variable,l=s.mul(e.beta1).add(u.mul(1-e.beta1)),h=c.mul(e.beta2).add(u.square().mul(1-e.beta2)),f=l.div(r),p=h.div(o);s.assign(l),c.assign(h);var d=f.div(p.sqrt().add(e.epsilon)).mul(-e.learningRate).add(i);i.assign(d);}}),e.accBeta1.assign(e.accBeta1.mul(e.beta1)),e.accBeta2.assign(e.accBeta2.mul(e.beta2));}),this.incrementIterations();},o.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&Xe(this.accumulatedFirstMoment.map(function(t){return t.variable})),null!=this.accumulatedSecondMoment&&Xe(this.accumulatedSecondMoment.map(function(t){return t.variable}));},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){var t;return r(this,function(e){switch(e.label){case 0:return t=this.accumulatedFirstMoment.concat(this.accumulatedSecondMoment),[4,this.saveIterations()];case 1:return [2,[e.sent()].concat(t.map(function(t){return {name:t.originalName,tensor:t.variable}}))]}})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){var e,n=this;return r(this,function(r){switch(r.label){case 0:return [4,this.extractIterations(t)];case 1:return t=r.sent(),je(function(){n.accBeta1.assign(rc(n.beta1,n.iterations_+1)),n.accBeta2.assign(rc(n.beta2,n.iterations_+1));}),e=t.length/2,this.accumulatedFirstMoment=t.slice(0,e).map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),this.accumulatedSecondMoment=t.slice(e,2*e).map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),[2]}})})},o.prototype.getConfig=function(){return {learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},o.fromConfig=function(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon)},o.className="Adam",o}(qf);Mf(Xf);var $f=function(t){function o(e,n,r,o,a){void 0===o&&(o=null),void 0===a&&(a=0);var i=t.call(this)||this;return i.learningRate=e,i.beta1=n,i.beta2=r,i.epsilon=o,i.decay=a,i.accumulatedFirstMoment=[],i.accumulatedWeightedInfNorm=[],je(function(){i.iteration=An(0).variable(),i.accBeta1=An(n).variable();}),null==o&&(i.epsilon=Nt.backend.epsilon()),i}return e(o,t),o.prototype.applyGradients=function(t){var e=this,n=Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t);je(function(){var r=uc(1,e.accBeta1),o=qs(-e.learningRate,e.iteration.mul(e.decay).add(1));n.forEach(function(n,a){var i=Nt.registeredVariables[n];null==e.accumulatedFirstMoment[a]&&(e.accumulatedFirstMoment[a]={originalName:n+"/m",variable:zn(i).variable(!1)}),null==e.accumulatedWeightedInfNorm[a]&&(e.accumulatedWeightedInfNorm[a]={originalName:n+"/v",variable:zn(i).variable(!1)});var u=Array.isArray(t)?t[a].tensor:t[n];if(null!=u){var s=e.accumulatedFirstMoment[a].variable,c=e.accumulatedWeightedInfNorm[a].variable,l=s.mul(e.beta1).add(u.mul(1-e.beta1)),h=c.mul(e.beta2),f=u.abs(),p=h.maximum(f);s.assign(l),c.assign(p);var d=o.div(r).mul(l.div(p.add(e.epsilon))).add(i);i.assign(d);}}),e.iteration.assign(e.iteration.add(1)),e.accBeta1.assign(e.accBeta1.mul(e.beta1));}),this.incrementIterations();},o.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&Xe(this.accumulatedFirstMoment.map(function(t){return t.variable})),null!=this.accumulatedWeightedInfNorm&&Xe(this.accumulatedWeightedInfNorm.map(function(t){return t.variable}));},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){return r(this,function(t){throw new Error("getWeights() is not implemented for Adamax yet.")})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){return r(this,function(t){throw new Error("setWeights() is not implemented for Adamax yet.")})})},o.prototype.getConfig=function(){return {learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},o.fromConfig=function(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon,e.decay)},o.className="Adamax",o}(qf);Mf($f);var Yf=function(t){function o(e){var n=t.call(this)||this;return n.learningRate=e,n.setLearningRate(e),n}return e(o,t),o.prototype.applyGradients=function(t){var e=this;(Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t)).forEach(function(n,r){var o=Array.isArray(t)?t[r].tensor:t[n];if(null!=o){var a=Nt.registeredVariables[n];je(function(){var t=e.c.mul(o).add(a);a.assign(t);});}}),this.incrementIterations();},o.prototype.setLearningRate=function(t){this.learningRate=t,null!=this.c&&this.c.dispose(),this.c=$e(An(-t));},o.prototype.dispose=function(){this.c.dispose();},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){return r(this,function(t){switch(t.label){case 0:return [4,this.saveIterations()];case 1:return [2,[t.sent()]]}})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){return r(this,function(e){switch(e.label){case 0:return [4,this.extractIterations(t)];case 1:if(0!==(t=e.sent()).length)throw new Error("SGD optimizer does not have settable weights.");return [2]}})})},o.prototype.getConfig=function(){return {learningRate:this.learningRate}},o.fromConfig=function(t,e){return new t(e.learningRate)},o.className="SGD",o}(qf);Mf(Yf);var Qf=function(t){function o(e,n,r){void 0===r&&(r=!1);var o=t.call(this,e)||this;return o.learningRate=e,o.momentum=n,o.useNesterov=r,o.accumulations=[],o.m=An(o.momentum),o}return e(o,t),o.prototype.applyGradients=function(t){var e=this;(Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t)).forEach(function(n,r){var o=Nt.registeredVariables[n];if(null==e.accumulations[r]){e.accumulations[r]={originalName:n+"/momentum",variable:je(function(){return zn(o).variable(!1)})};}var a=e.accumulations[r].variable,i=Array.isArray(t)?t[r].tensor:t[n];null!=i&&je(function(){var t,n=e.m.mul(a).add(i);t=e.useNesterov?e.c.mul(i.add(n.mul(e.m))).add(o):e.c.mul(n).add(o),a.assign(n),o.assign(t);});}),this.incrementIterations();},o.prototype.dispose=function(){this.m.dispose(),null!=this.accumulations&&Xe(this.accumulations.map(function(t){return t.variable}));},o.prototype.setMomentum=function(t){this.momentum=t;},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){return r(this,function(t){switch(t.label){case 0:return [4,this.saveIterations()];case 1:return [2,[t.sent()].concat(this.accumulations.map(function(t){return {name:t.originalName,tensor:t.variable}}))]}})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){return r(this,function(e){switch(e.label){case 0:return [4,this.extractIterations(t)];case 1:return t=e.sent(),this.accumulations=t.map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),[2]}})})},o.prototype.getConfig=function(){return {learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},o.fromConfig=function(t,e){return new t(e.learningRate,e.momentum,e.useNesterov)},o.className="Momentum",o}(Yf);Mf(Qf);var Jf=function(t){function o(e,n,r,o,a){void 0===n&&(n=.9),void 0===r&&(r=0),void 0===o&&(o=null),void 0===a&&(a=!1);var i=t.call(this)||this;return i.learningRate=e,i.decay=n,i.momentum=r,i.epsilon=o,i.accumulatedMeanSquares=[],i.accumulatedMoments=[],i.accumulatedMeanGrads=[],i.centered=a,null==o&&(i.epsilon=Nt.backend.epsilon()),i}return e(o,t),o.prototype.applyGradients=function(t){var e=this;(Array.isArray(t)?t.map(function(t){return t.name}):Object.keys(t)).forEach(function(n,r){var o=Nt.registeredVariables[n];null==e.accumulatedMeanSquares[r]&&(e.accumulatedMeanSquares[r]={originalName:n+"/rms",variable:je(function(){return zn(o).variable(!1)})}),null==e.accumulatedMoments[r]&&(e.accumulatedMoments[r]={originalName:n+"/momentum",variable:je(function(){return zn(o).variable(!1)})}),null==e.accumulatedMeanGrads[r]&&e.centered&&(e.accumulatedMeanGrads[r]={originalName:n+"/mg",variable:je(function(){return zn(o).variable(!1)})});var a=Array.isArray(t)?t[r].tensor:t[n];if(null!=a){var i=e.accumulatedMeanSquares[r].variable,u=e.accumulatedMoments[r].variable;je(function(){var t=i.mul(e.decay).add(a.square().mul(1-e.decay));if(e.centered){var n=e.accumulatedMeanGrads[r].variable,s=n.mul(e.decay).add(a.mul(1-e.decay)),c=u.mul(e.momentum).add(a.mul(e.learningRate).div(t.sub(s.square().add(e.epsilon)).sqrt()));i.assign(t),n.assign(s),u.assign(c);var l=o.sub(c);o.assign(l);}else{var h=i.mul(e.decay).add(a.square().mul(1-e.decay));c=u.mul(e.momentum).add(a.mul(e.learningRate).div(h.add(e.epsilon).sqrt()));i.assign(h),u.assign(c);l=o.sub(c);o.assign(l);}});}}),this.incrementIterations();},o.prototype.dispose=function(){null!=this.accumulatedMeanSquares&&Xe(this.accumulatedMeanSquares.map(function(t){return t.variable})),null!=this.accumulatedMeanGrads&&this.centered&&Xe(this.accumulatedMeanGrads.map(function(t){return t.variable})),null!=this.accumulatedMoments&&Xe(this.accumulatedMoments.map(function(t){return t.variable}));},o.prototype.getWeights=function(){return n(this,void 0,void 0,function(){var t;return r(this,function(e){switch(e.label){case 0:return t=this.accumulatedMeanSquares.concat(this.accumulatedMoments),this.centered&&t.push.apply(t,this.accumulatedMeanGrads),[4,this.saveIterations()];case 1:return [2,[e.sent()].concat(t.map(function(t){return {name:t.originalName,tensor:t.variable}}))]}})})},o.prototype.setWeights=function(t){return n(this,void 0,void 0,function(){var e;return r(this,function(n){switch(n.label){case 0:return [4,this.extractIterations(t)];case 1:return t=n.sent(),e=this.centered?t.length/3:t.length/2,this.accumulatedMeanSquares=t.slice(0,e).map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),this.accumulatedMoments=t.slice(e,2*e).map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}}),this.centered&&(this.accumulatedMeanGrads=t.slice(2*e,3*e).map(function(t){return {originalName:t.name,variable:t.tensor.variable(!1)}})),[2]}})})},o.prototype.getConfig=function(){return {learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},o.fromConfig=function(t,e){return new t(e.learningRate,e.decay,e.momentum,e.epsilon,e.centered)},o.className="RMSProp",o}(qf);Mf(Jf);var Zf=function(){function t(){}return t.sgd=function(t){return new Yf(t)},t.momentum=function(t,e,n){return void 0===n&&(n=!1),new Qf(t,e,n)},t.rmsprop=function(t,e,n,r,o){return void 0===e&&(e=.9),void 0===n&&(n=0),void 0===r&&(r=null),void 0===o&&(o=!1),new Jf(t,e,n,r,o)},t.adam=function(t,e,n,r){return void 0===t&&(t=.001),void 0===e&&(e=.9),void 0===n&&(n=.999),void 0===r&&(r=null),new Xf(t,e,n,r)},t.adadelta=function(t,e,n){return void 0===t&&(t=.001),void 0===e&&(e=.95),void 0===n&&(n=null),new Kf(t,e,n)},t.adamax=function(t,e,n,r,o){return void 0===t&&(t=.002),void 0===e&&(e=.9),void 0===n&&(n=.999),void 0===r&&(r=null),void 0===o&&(o=0),new $f(t,e,n,r,o)},t.adagrad=function(t,e){return void 0===e&&(e=.1),new jf(t,e)},t}(),tp={sgd:Zf.sgd,momentum:Zf.momentum,adadelta:Zf.adadelta,adagrad:Zf.adagrad,rmsprop:Zf.rmsprop,adamax:Zf.adamax,adam:Zf.adam},ep="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setImmediate?setImmediate:function(t){return t()};function np(){return new Promise(function(t){return ep(function(){return t()})})}ft=Ih;

	var tf$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		AdadeltaOptimizer: Kf,
		AdagradOptimizer: jf,
		AdamOptimizer: Xf,
		AdamaxOptimizer: $f,
		DataStorage: so,
		get ENV () { return i$3; },
		Environment: o,
		KernelBackend: co,
		MomentumOptimizer: Qf,
		Optimizer: qf,
		RMSPropOptimizer: Jf,
		get Rank () { return vt; },
		get Reduction () { return Xl; },
		SGDOptimizer: Yf,
		Tensor: dt,
		TensorBuffer: lt,
		Variable: bt,
		abs: Vu,
		acos: zu,
		acosh: Gu,
		add: Vs,
		addN: zs,
		addStrict: Gs,
		all: ul,
		any: sl,
		argMax: cl,
		argMin: ll,
		asin: Hu,
		asinh: qu,
		atan: Ku,
		atan2: Hs,
		atanh: ju,
		avgPool: Qc,
		avgPool3d: tl,
		backend: on,
		backend_util: To,
		basicLSTMCell: Sl,
		batchNorm: Ns,
		batchNorm2d: Fs,
		batchNorm3d: Os,
		batchNorm4d: _s,
		batchNormalization: Ts,
		batchNormalization2d: Ss,
		batchNormalization3d: As,
		batchNormalization4d: Ds,
		batchToSpaceND: cr,
		booleanMaskAsync: Ic,
		browser: Ff,
		buffer: ur,
		cast: lr,
		ceil: Xu,
		clipByValue: $u,
		clone: hr,
		complex: En,
		concat: Gn,
		concat1d: Hn,
		concat2d: qn,
		concat3d: Kn,
		concat4d: jn,
		conv1d: Dc,
		conv2d: Tc,
		conv2dTranspose: Lc,
		conv3d: Nc,
		conv3dTranspose: Wc,
		cos: Yu,
		cosh: Qu,
		cumsum: fr,
		customGrad: oo,
		deprecationWarn: ze,
		depthToSpace: pr,
		depthwiseConv2d: _c,
		diag: Ul,
		disableDeprecationWarnings: Ve,
		dispose: Xe,
		disposeVariables: Ge,
		div: qs,
		divNoNan: Ks,
		divStrict: js,
		dot: Vc,
		dropout: Vl,
		elu: yl,
		enableDebugMode: Ue,
		enableProdMode: We,
		engine: He,
		env: a,
		equal: cc,
		equalStrict: lc,
		erf: Ju,
		exp: Zu,
		expandDims: dr,
		expm1: ts,
		eye: vr,
		fft: Ol,
		fill: Ln,
		findBackend: en,
		findBackendFactory: nn,
		floor: es,
		floorDiv: Xs,
		frame: ql,
		fused: Rh,
		gather: Ec,
		gatherND: Wl,
		getBackend: Ze,
		getKernel: s,
		getKernelsForBackend: c,
		grad: Zr,
		grads: to,
		greater: hc,
		greaterEqual: fc,
		greaterEqualStrict: pc,
		greaterStrict: dc,
		hammingWindow: Hl,
		hannWindow: Gl,
		ifft: _l,
		imag: In,
		image: mh,
		inTopKAsync: $l,
		io: Af,
		irfft: Bl,
		isFinite: ps,
		isInf: fs,
		isNaN: hs,
		keep: $e,
		leakyRelu: xl,
		less: vc,
		lessEqual: mc,
		lessEqualStrict: gc,
		lessStrict: yc,
		linalg: ch,
		linspace: Wn,
		localResponseNormalization: Il,
		log: ns,
		log1p: rs,
		logSigmoid: os,
		logSoftmax: uo,
		logSumExp: hl,
		logicalAnd: Ms,
		logicalNot: Bs,
		logicalOr: Ps,
		logicalXor: Ls,
		losses: ah,
		matMul: Uc,
		math: Tf,
		max: fl,
		maxPool: Yc,
		maxPool3d: Zc,
		maximum: $s,
		maximumStrict: Ys,
		mean: pl,
		memory: qe,
		min: dl,
		minimum: Qs,
		minimumStrict: Js,
		mod: Zs,
		modStrict: tc,
		moments: vl,
		movingAverage: Dl,
		mul: ec,
		mulStrict: nc,
		multiRNNCell: Al,
		multinomial: mr,
		neg: as,
		nextFrame: np,
		norm: kl,
		notEqual: xc,
		notEqualStrict: bc,
		oneHot: gr,
		ones: Bn,
		onesLike: Vn,
		op: Cn,
		outerProduct: zc,
		pad: yr,
		pad1d: xr,
		pad2d: br,
		pad3d: wr,
		pad4d: Cr,
		pool: Jc,
		pow: rc,
		powStrict: oc,
		prelu: bl,
		print: sr,
		prod: gl,
		profile: Ke,
		rand: Er,
		randomGamma: Ir,
		randomNormal: Rr,
		randomUniform: kr,
		range: Un,
		ready: Je,
		real: Rn,
		reciprocal: is$2,
		registerBackend: rn,
		registerKernel: l$1,
		relu: wl,
		relu6: Cl,
		removeBackend: tn,
		reshape: Sr,
		reverse: Gc,
		reverse1d: Hc,
		reverse2d: qc,
		reverse3d: Kc,
		reverse4d: jc,
		rfft: Ml,
		round: us,
		rsqrt: ss,
		scalar: An,
		scatterND: Fl,
		selu: El,
		separableConv2d: Pc,
		serialization: Bf,
		setBackend: Qe,
		setPlatform: an,
		setdiff1dAsync: _r,
		sigmoid: cs,
		sign: ls,
		signal: jl,
		sin: ds,
		sinh: vs,
		slice: el,
		slice1d: nl,
		slice2d: rl,
		slice3d: ol,
		slice4d: al,
		slice_util: Jr,
		softmax: io,
		softplus: ms,
		spaceToBatchND: Ar,
		sparseToDense: Ll,
		spectral: Pl,
		split: Xn,
		sqrt: gs,
		square: Uu,
		squaredDifference: ac,
		squaredDifferenceStrict: ic,
		squeeze: Dr,
		stack: Tr,
		step: ys,
		stft: Kl,
		stridedSlice: Tl,
		sub: uc,
		subStrict: sc,
		sum: ml,
		tan: xs,
		tanh: bs,
		tensor: kn,
		tensor1d: Dn,
		tensor2d: Tn,
		tensor3d: Nn,
		tensor4d: Fn,
		tensor5d: On,
		tensor6d: _n,
		tensor_util: At,
		test_util: zf,
		tidy: je,
		tile: Nr,
		time: Ye,
		topk: Nl,
		train: tp,
		transpose: Rl,
		truncatedNormal: Fr,
		unregisterKernel: h,
		unsortedSegmentSum: Rc,
		unstack: Or,
		util: tt,
		valueAndGrad: eo,
		valueAndGrads: no,
		variable: Mn,
		variableGrads: ro,
		version_core: Gf,
		webgl: Hf,
		where: Ws,
		whereAsync: Us,
		zeros: Pn,
		zerosLike: zn
	});

	/**
	 * @license
	 * Copyright 2019 Google LLC. All Rights Reserved.
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * =============================================================================
	 */
	var DataType,SaverDef,__assign=function(){return (__assign=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function __awaiter(e,t,a,r){return new(a||(a=Promise))(function(n,s){function o(e){try{u(r.next(e));}catch(e){s(e);}}function p(e){try{u(r.throw(e));}catch(e){s(e);}}function u(e){e.done?n(e.value):new a(function(t){t(e.value);}).then(o,p);}u((r=r.apply(e,t||[])).next());})}function __generator(e,t){var a,r,n,s,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:p(0),throw:p(1),return:p(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function p(s){return function(p){return function(s){if(a)throw new TypeError("Generator is already executing.");for(;o;)try{if(a=1,r&&(n=2&s[0]?r.return:s[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,s[1])).done)return n;switch(r=0,n&&(s=[2&s[0],n.value]),s[0]){case 0:case 1:n=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(n=(n=o.trys).length>0&&n[n.length-1])&&(6===s[0]||2===s[0])){o=0;continue}if(3===s[0]&&(!n||s[1]>n[0]&&s[1]<n[3])){o.label=s[1];break}if(6===s[0]&&o.label<n[1]){o.label=n[1],n=s;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(s);break}n[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o);}catch(e){s=[6,e],r=0;}finally{a=n=0;}if(5&s[0])throw s[1];return {value:s[0]?s[1]:void 0,done:!0}}([s,p])}}}!function(e){e[e.DT_INVALID=0]="DT_INVALID",e[e.DT_FLOAT=1]="DT_FLOAT",e[e.DT_DOUBLE=2]="DT_DOUBLE",e[e.DT_INT32=3]="DT_INT32",e[e.DT_UINT8=4]="DT_UINT8",e[e.DT_INT16=5]="DT_INT16",e[e.DT_INT8=6]="DT_INT8",e[e.DT_STRING=7]="DT_STRING",e[e.DT_COMPLEX64=8]="DT_COMPLEX64",e[e.DT_INT64=9]="DT_INT64",e[e.DT_BOOL=10]="DT_BOOL",e[e.DT_QINT8=11]="DT_QINT8",e[e.DT_QUINT8=12]="DT_QUINT8",e[e.DT_QINT32=13]="DT_QINT32",e[e.DT_BFLOAT16=14]="DT_BFLOAT16",e[e.DT_FLOAT_REF=101]="DT_FLOAT_REF",e[e.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",e[e.DT_INT32_REF=103]="DT_INT32_REF",e[e.DT_UINT8_REF=104]="DT_UINT8_REF",e[e.DT_INT16_REF=105]="DT_INT16_REF",e[e.DT_INT8_REF=106]="DT_INT8_REF",e[e.DT_STRING_REF=107]="DT_STRING_REF",e[e.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",e[e.DT_INT64_REF=109]="DT_INT64_REF",e[e.DT_BOOL_REF=110]="DT_BOOL_REF",e[e.DT_QINT8_REF=111]="DT_QINT8_REF",e[e.DT_QUINT8_REF=112]="DT_QUINT8_REF",e[e.DT_QINT32_REF=113]="DT_QINT32_REF",e[e.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF";}(DataType||(DataType={})),function(e){!function(e){e[e.LEGACY=0]="LEGACY",e[e.V1=1]="V1",e[e.V2=2]="V2";}(e.CheckpointFormatVersion||(e.CheckpointFormatVersion={}));}(SaverDef||(SaverDef={}));var CUSTOM_OPS={};function getRegisteredOp(e){return CUSTOM_OPS[e]}function getParamValue(e,t,a,r){var n=t.inputParams[e];if(n&&void 0!==n.inputIndexStart){var s=n.inputIndexStart,o=0===n.inputIndexEnd?void 0:void 0===n.inputIndexEnd?s+1:n.inputIndexEnd;if("tensor"===n.type)return getTensor(t.inputNames[n.inputIndexStart],a,r);if("tensors"===n.type)return t.inputNames.slice(s,o).map(function(e){return getTensor(e,a,r)});var p=Array.prototype.slice.call(getTensor(t.inputNames.slice(s)[0],a,r).dataSync());return "number"===n.type?p[0]:p}var u=t.attrParams[e];return u&&u.value}function getTensor(e,t,a){var r=parseNodeName(e),n=r[0],s=r[1],o=a.currentContextIds.find(function(e){return !!t[getNodeNameWithContextId(n,e)]});return void 0!==o?t[getNodeNameWithContextId(n,o)][s]:void 0}function getTensorsForCurrentContenxt(e,t,a){return t[getNodeNameWithContextId(e,a.currentContextId)]}function getNodeNameAndIndex(e,t){var a=parseNodeName(e),r=a[0],n=a[1];return [getNodeNameWithContextId(r,t&&t.currentContextId),n]}function getNodeNameWithContextId(e,t){return t?e+"-"+t:e}function parseNodeName(e){var t=e.lastIndexOf(":");return -1===t?[e,0]:[e.substring(0,t),Number(e.substring(t+1))]}function split$1(e,t){for(var a=[],r=0;r<e.length;r+=t)a.push(e.slice(r,r+t));return a}var json=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],arithmetic=Object.freeze({json:json}),json$1=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"clip_value_min",name:"clipValueMin",type:"number"},{tfName:"clip_value_max",name:"clipValueMax",type:"number"}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"clipValueMin",name:"clipValueMin",type:"number",defaultValue:0},{tfName:"clipValueMax",name:"clipValueMax",type:"number",defaultValue:6}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Prod",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axes",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],basicMath=Object.freeze({json:json$1}),json$2=[{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"number"}]}],control=Object.freeze({json:json$2}),json$3=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]}],convolution=Object.freeze({json:json$3}),json$4=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}],creation=Object.freeze({json:json$4}),json$5=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],dynamic=Object.freeze({json:json$5}),json$6=[{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]}],evaluation=Object.freeze({json:json$6}),json$7=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}],graph=Object.freeze({json:json$7}),json$8=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]}],image$1=Object.freeze({json:json$8}),json$9=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],logical=Object.freeze({json:json$9}),json$10=[{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],matrices=Object.freeze({json:json$10}),json$11=[{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"SparseToDense",category:"normalization",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!0,notSupported:!0}]}],normalization=Object.freeze({json:json$11}),json$12=[{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]}],reduction=Object.freeze({json:json$12}),json$13=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool",notSupported:!0}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]}],sliceJoin=Object.freeze({json:json$13}),json$14=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}],spectral=Object.freeze({json:json$14}),json$15=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]}],transformation=Object.freeze({json:json$15}),OperationMapper=function(){function e(){var e=[arithmetic,basicMath,control,convolution,creation,dynamic,evaluation,logical,image$1,graph,matrices,normalization,reduction,sliceJoin,spectral,transformation],t=[].concat.apply([],e.map(function(e){return e.json}));this.opMappers=t.reduce(function(e,t){return e[t.tfOpName]=t,e},{});}return Object.defineProperty(e,"Instance",{get:function(){return this._instance||(this._instance=new this)},enumerable:!0,configurable:!0}),e.prototype.transformGraph=function(e){var t=this,a=[],r=[],n=e.node.reduce(function(e,n){return e[n.name]=t.mapNode(n),"Placeholder"===n.op&&a.push(e[n.name]),"Const"===n.op&&r.push(e[n.name]),e},{}),s=[],o=[],p=Object.keys(n);return p.forEach(function(e){var t=n[e];t.inputNames.forEach(function(e){var a=getNodeNameAndIndex(e)[0];t.inputs.push(n[a]),n[a].children.push(t);}),0===t.inputs.length&&s.push(t);}),p.forEach(function(e){var t=n[e];0===t.children.length&&o.push(t);}),{nodes:n,inputs:s,outputs:o,weights:r,placeholders:a}},e.prototype.mapNode=function(e){var t=getRegisteredOp(e.op)||this.opMappers[e.op]||{};null==e.attr&&(e.attr={});var a={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(function(e){return e.startsWith("^")?e.substr(1):e}),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr};return null!=t.inputs&&(a.inputParams=t.inputs.reduce(function(e,t){return e[t.name]={type:t.type,inputIndexStart:t.start,inputIndexEnd:t.end},e},{})),null!=t.attrs&&(a.attrParams=t.attrs.reduce(function(t,a){var r=a.type,n=void 0;switch(a.type){case"string":void 0===(n=getStringParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getStringParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"string[]":void 0===(n=getStringArrayParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getStringArrayParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number":void 0===(n=getNumberParam(e.attr,a.tfName,a.defaultValue||0))&&a.tfDeprecatedName&&(n=getNumberParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number[]":void 0===(n=getNumericArrayParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getNumericArrayParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool":void 0===(n=getBoolParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getBoolParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool[]":void 0===(n=getBoolArrayParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getBoolArrayParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape":void 0===(n=getTensorShapeParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getTensorShapeParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape[]":void 0===(n=getTensorShapeArrayParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getTensorShapeArrayParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype":void 0===(n=getDtypeParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getDtypeParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype[]":void 0===(n=getDtypeArrayParam(e.attr,a.tfName,a.defaultValue))&&a.tfDeprecatedName&&(n=getDtypeArrayParam(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error("Unsupported param type: "+a.type+" for op: "+e.op)}return t[a.name]={value:n,type:r},t},{})),a},e}();function decodeBase64(e){var t=a().global;if(void 0!==t.atob)return t.atob(e);if("undefined"!=typeof Buffer)return new Buffer(e,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function parseStringParam(e,t){var a=Array.isArray(e)?String.fromCharCode.apply(null,e):decodeBase64(e);return t?a:a.toLowerCase()}function getStringParam(e,t,a,r){void 0===r&&(r=!1);var n=e[t];return null!=n?parseStringParam(n.s,r):a}function getBoolParam(e,t,a){var r=e[t];return r?r.b:a}function getNumberParam(e,t,a){var r=e[t]||{},n=null!=r.i?r.i:null!=r.f?r.f:a;return "number"==typeof n?n:parseInt(n,10)}function parseDtypeParam(e){switch("string"==typeof e&&(e=DataType[e]),e){case DataType.DT_FLOAT:return "float32";case DataType.DT_INT32:case DataType.DT_INT64:return "int32";case DataType.DT_BOOL:return "bool";case DataType.DT_DOUBLE:return "float32";case DataType.DT_STRING:return "string";default:return null}}function getDtypeParam(e,t,a){var r=e[t];return r&&r.type?parseDtypeParam(r.type):a}function getDtypeArrayParam(e,t,a){var r=e[t];return r&&r.list&&r.list.type?r.list.type.map(function(e){return parseDtypeParam(e)}):a}function parseTensorShapeParam(e){if(!e.unknownRank)return null!=e.dim?e.dim.map(function(e){return "number"==typeof e.size?e.size:parseInt(e.size,10)}):[]}function getTensorShapeParam(e,t,a){var r=e[t];return r&&r.shape?parseTensorShapeParam(r.shape):a}function getNumericArrayParam(e,t,a){var r=e[t];return r?((r.list.f&&r.list.f.length?r.list.f:r.list.i)||[]).map(function(e){return "number"==typeof e?e:parseInt(e,10)}):a}function getStringArrayParam(e,t,a,r){void 0===r&&(r=!1);var n=e[t];return n&&n.list&&n.list.s?n.list.s.map(function(e){return parseStringParam(e,r)}):a}function getTensorShapeArrayParam(e,t,a){var r=e[t];return r&&r.list&&r.list.shape?r.list.shape.map(function(e){return parseTensorShapeParam(e)}):a}function getBoolArrayParam(e,t,a){var r=e[t];return r&&r.list&&r.list.b?r.list.b:a}var NodeValueImpl=function(){function e(e,t,a){var r=this;this.node=e,this.tensorMap=t,this.context=a,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(function(e){return r.getInput(e)}),null!=e.rawAttrs&&(this.attrs=Object.keys(e.rawAttrs).reduce(function(e,t){return e[t]=r.getAttr(t),e},{}));}return e.prototype.getInput=function(e){return getTensor(e,this.tensorMap,this.context)},e.prototype.getAttr=function(e,t){var a=this.node.rawAttrs[e];if(null!=a.tensor)return getTensor(e,this.tensorMap,this.context);if(null!=a.i||null!=a.f)return getNumberParam(this.node.rawAttrs,e,t);if(null!=a.s)return getStringParam(this.node.rawAttrs,e,t);if(null!=a.b)return getBoolParam(this.node.rawAttrs,e,t);if(null!=a.shape)return getTensorShapeParam(this.node.rawAttrs,e,t);if(null!=a.type)return getDtypeParam(this.node.rawAttrs,e,t);if(null!=a.list){if(null!=a.list.i||null!=a.list.f)return getNumericArrayParam(this.node.rawAttrs,e,t);if(null!=a.list.s)return getStringArrayParam(this.node.rawAttrs,e,t);if(null!=a.list.shape)return getTensorShapeArrayParam(this.node.rawAttrs,e,t);if(null!=a.list.b)return getBoolArrayParam(this.node.rawAttrs,e,t);if(null!=a.list.type)return getDtypeArrayParam(this.node.rawAttrs,e,t)}return t},e}(),executeOp=function(e,t,a){switch(e.op){case"BiasAdd":case"AddV2":case"Add":return [Vs(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"AddN":return [zs(getParamValue("tensors",e,t,a))];case"FloorMod":case"Mod":return [Zs(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Mul":return [ec(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"RealDiv":case"Div":return [qs(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"DivNoNan":return [Ks(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"FloorDiv":return [Xs(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Sub":return [uc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Minimum":return [Qs(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Maximum":return [$s(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Pow":return [rc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"SquaredDifference":return [ac(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$1=function(e,t,a){switch(e.op){case"Abs":case"ComplexAbs":return [Vu(getParamValue("x",e,t,a))];case"Acos":return [zu(getParamValue("x",e,t,a))];case"Acosh":return [Gu(getParamValue("x",e,t,a))];case"Asin":return [Hu(getParamValue("x",e,t,a))];case"Asinh":return [qu(getParamValue("x",e,t,a))];case"Atan":return [Ku(getParamValue("x",e,t,a))];case"Atan2":return [Hs(getParamValue("x",e,t,a),getParamValue("y",e,t,a))];case"Atanh":return [ju(getParamValue("x",e,t,a))];case"Ceil":return [Xu(getParamValue("x",e,t,a))];case"Complex":return [En(getParamValue("real",e,t,a),getParamValue("imag",e,t,a))];case"Cos":return [Yu(getParamValue("x",e,t,a))];case"Cosh":return [Qu(getParamValue("x",e,t,a))];case"Elu":return [yl(getParamValue("x",e,t,a))];case"Erf":return [Ju(getParamValue("x",e,t,a))];case"Exp":return [Zu(getParamValue("x",e,t,a))];case"Expm1":return [ts(getParamValue("x",e,t,a))];case"Floor":return [es(getParamValue("x",e,t,a))];case"Log":return [ns(getParamValue("x",e,t,a))];case"Log1p":return [rs(getParamValue("x",e,t,a))];case"Imag":return [In(getParamValue("x",e,t,a))];case"Neg":return [as(getParamValue("x",e,t,a))];case"Reciprocal":return [is$2(getParamValue("x",e,t,a))];case"Real":return [Rn(getParamValue("x",e,t,a))];case"Relu":return [wl(getParamValue("x",e,t,a))];case"Round":return [us(getParamValue("x",e,t,a))];case"Selu":return [El(getParamValue("x",e,t,a))];case"Sigmoid":return [cs(getParamValue("x",e,t,a))];case"Sin":return [ds(getParamValue("x",e,t,a))];case"Sign":return [ls(getParamValue("x",e,t,a))];case"Sinh":return [vs(getParamValue("x",e,t,a))];case"Softplus":return [ms(getParamValue("x",e,t,a))];case"Sqrt":return [gs(getParamValue("x",e,t,a))];case"Square":return [Uu(getParamValue("x",e,t,a))];case"Tanh":return [bs(getParamValue("x",e,t,a))];case"Tan":return [xs(getParamValue("x",e,t,a))];case"Relu6":case"ClipByValue":return [$u(getParamValue("x",e,t,a),getParamValue("clipValueMin",e,t,a),getParamValue("clipValueMax",e,t,a))];case"Rsqrt":return [ss(getTensor(e.inputNames[0],t,a))];case"Prod":return [gl(getParamValue("x",e,t,a),getParamValue("axes",e,t,a))];case"LeakyRelu":return [xl(getParamValue("x",e,t,a),getParamValue("alpha",e,t,a))];case"Prelu":return [bl(getParamValue("x",e,t,a),getParamValue("alpha",e,t,a))];default:throw TypeError("Node type "+e.op+" is not implemented")}},TensorArray=function(){function e(t,a,r,n,s,o,p){this.name=t,this.dtype=a,this.maxSize=r,this.elementShape=n,this.identicalElementShapes=s,this.dynamicSize=o,this.clearAfterRead=p,this.tensors=[],this.closed_=!1,this.id=e.nextId++;}return Object.defineProperty(e.prototype,"closed",{get:function(){return this.closed_},enumerable:!0,configurable:!0}),e.prototype.clearAndClose=function(){this.tensors.forEach(function(e){return e.tensor.dispose()}),this.tensors=[],this.closed_=!0;},e.prototype.size=function(){return this.tensors.length},e.prototype.read=function(e){if(this.closed_)throw new Error("TensorArray "+this.name+" has already been closed.");if(e<0||e>=this.tensors.length)throw new Error("Tried to read from index "+e+", but array size is: "+this.tensors.length);var t=this.tensors[e];if(t.cleared)throw new Error("TensorArray "+this.name+": Could not read index "+e+" twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).");return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor},e.prototype.readMany=function(e){var t=this;return e.map(function(e){return t.read(e)})},e.prototype.write=function(e,t){if(this.closed_)throw new Error("TensorArray "+this.name+" has already been closed.");if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error("Tried to write to index "+e+", but array is not resizeable and size is: "+this.maxSize);var a=this.tensors[e]||{};if(t.dtype!==this.dtype)throw new Error("TensorArray "+this.name+": Could not write to TensorArray index "+e+",\n          because the value dtype is "+t.dtype+", but TensorArray dtype is "+this.dtype+".");if(0!==this.size()||null!=this.elementShape&&0!==this.elementShape.length||(this.elementShape=t.shape),this.assertShapesMatchAllowUndefinedSize(this.elementShape,t.shape,"TensorArray "+this.name+": Could not write to TensorArray index "+e+"."),a&&a.read)throw new Error("TensorArray "+this.name+": Could not write to TensorArray index "+e+", because it has already been read.");if(a&&a.written)throw new Error("TensorArray "+this.name+": Could not write to TensorArray index "+e+", because it has already been written.");a.tensor=t,a.written=!0,this.tensors[e]=a;},e.prototype.writeMany=function(e,t){var a=this;if(e.length!==t.length)throw new Error("TensorArray "+this.name+": could not write multiple tensors,because the index size: "+e.length+" is not the same as tensors size: "+t.length+".");e.forEach(function(e,r){return a.write(e,t[r])});},e.prototype.gather=function(e,t){if(t&&t!==this.dtype)throw new Error("TensorArray dtype is "+this.dtype+" but gather requested dtype "+t);if(!e){e=[];for(var a=0;a<this.size();a++)e.push(a);}if(0===e.length)return kn([],[0].concat(this.elementShape));var r=this.readMany(e);return this.assertShapesMatchAllowUndefinedSize(this.elementShape,r[0].shape,"TensorArray shape mismatch: "),Tr(r,0)},e.prototype.concat=function(e){if(e&&e!==this.dtype)throw new Error("TensorArray dtype is "+this.dtype+" but concat requested dtype "+e);if(0===this.size())return kn([],[0].concat(this.elementShape));for(var t=[],a=0;a<this.size();a++)t.push(a);var r=this.readMany(t);return this.assertShapesMatchAllowUndefinedSize(this.elementShape,r[0].shape,"TensorArray shape mismatch: tensor array shape ("+this.elementShape+") vs first tensor shape ("+r[0].shape+")"),Gn(r,0)},e.prototype.scatter=function(e,t){if(t.dtype!==this.dtype)throw new Error("TensorArray dtype is "+this.dtype+" but tensor has dtype "+t.dtype);if(e.length!==t.shape[0])throw new Error("Expected len(indices) == tensor.shape[0], but saw: "+e.length+" vs. "+t.shape[0]);var a=Math.max.apply(Math,e);if(!this.dynamicSize&&a>=this.maxSize)throw new Error("Max index must be < array size ("+a+"  vs. "+this.maxSize+")");this.writeMany(e,Or(t,0));},e.prototype.split=function(e,t){var a=this;if(t.dtype!==this.dtype)throw new Error("TensorArray dtype is "+this.dtype+" but tensor has dtype "+t.dtype);var r=0,n=e.map(function(e){return r+=e});if(r!==t.shape[0])throw new Error("Expected sum of lengths to be equal to\n          tensor.shape[0], but sum of lengths is\n        "+r+", and tensor's shape is: "+t.shape);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error("TensorArray's size is not equal to the size of lengths ("+this.maxSize+" vs. "+e.length+"), and the TensorArray is not marked as dynamically resizeable");var s=0===r?0:t.size/r,o=[];je(function(){t=t.reshape([1,r,s]);for(var p=0;p<e.length;++p){var u=[0,0===p?0:n[p-1],0],i=[1,e[p],s];o[p]=el(t,u,i).reshape(a.elementShape);}return o});for(var p=[],u=0;u<e.length;u++)p[u]=u;this.writeMany(p,o);},e.prototype.assertShapesMatchAllowUndefinedSize=function(e,t,a){void 0===a&&(a=""),tt.assert(this.shapesEqualAllowUndefinedSize(e,t),function(){return a+" Shapes "+e+" and "+t+" must match"});},e.prototype.shapesEqualAllowUndefinedSize=function(e,t){if(e.length!==t.length)return !1;for(var a=0;a<e.length;a++)if(-1!==e[a]&&-1!==t[a]&&e[a]!==t[a])return !1;return !0},e.nextId=0,e}();function executeOp$2(e,t,a){return __awaiter(this,void 0,void 0,function(){var r,n,s,o,p,u,i,m,l,c,d,y,f,g,h,N,x,V,P,b,T,O,v,S,_,w,A,D,E,I,C,M,k,z,j;return __generator(this,function(F){switch(F.label){case 0:switch(e.op){case"LoopCond":return [3,1];case"Switch":return [3,2];case"Merge":return [3,4];case"Enter":return [3,5];case"Exit":return [3,6];case"NextIteration":return [3,7];case"TensorArrayV3":return [3,8];case"TensorArrayWriteV3":return [3,9];case"TensorArrayReadV3":return [3,10];case"TensorArrayGatherV3":return [3,11];case"TensorArrayScatterV3":return [3,12];case"TensorArrayConcatV3":return [3,13];case"TensorArraySplitV3":return [3,14];case"TensorArraySizeV3":return [3,15];case"TensorArrayCloseV3":return [3,16]}return [3,17];case 1:return [2,[getParamValue("pred",e,t,a).clone()]];case 2:return r=getParamValue("pred",e,t,a),n=getParamValue("data",e,t,a),[4,r.data()];case 3:return [2,F.sent()[0]?[void 0,n.clone()]:[n.clone(),void 0]];case 4:return [2,(s=e.inputNames.find(function(e){return void 0!==getTensor(e,t,a)}))?[getTensor(s,t,a).clone()]:void 0];case 5:return o=getParamValue("frameName",e,t,a),p=getParamValue("tensor",e,t,a),a.enterFrame(o),[2,[p.clone()]];case 6:return u=getParamValue("tensor",e,t,a),a.exitFrame(),[2,[u.clone()]];case 7:return i=getParamValue("tensor",e,t,a),a.nextIteration(),[2,[i.clone()]];case 8:return m=getParamValue("size",e,t,a),l=getParamValue("dtype",e,t,a),c=getParamValue("elementShape",e,t,a),d=getParamValue("dynamicSize",e,t,a),y=getParamValue("clearAfterRead",e,t,a),f=getParamValue("identicalElementShapes",e,t,a),g=getParamValue("name",e,t,a),h=new TensorArray(g,l,m,c,f,d,y),a.addTensorArray(h),[2,[An(h.id),An(1)]];case 9:return N=getParamValue("tensorArrayId",e,t,a),x=getParamValue("index",e,t,a),V=getParamValue("tensor",e,t,a),a.getTensorArray(N).write(x,V),[2,[An(1)]];case 10:return P=getParamValue("tensorArrayId",e,t,a),b=getParamValue("index",e,t,a),[2,[a.getTensorArray(P).read(b)]];case 11:return T=getParamValue("tensorArrayId",e,t,a),O=getParamValue("indices",e,t,a),v=getParamValue("dtype",e,t,a),[2,[a.getTensorArray(T).gather(O,v)]];case 12:return S=getParamValue("tensorArrayId",e,t,a),_=getParamValue("indices",e,t,a),w=getParamValue("tensor",e,t,a),a.getTensorArray(S).scatter(_,w),[2,[An(1)]];case 13:return A=getParamValue("tensorArrayId",e,t,a),D=a.getTensorArray(A),E=getParamValue("dtype",e,t,a),[2,[D.concat(E)]];case 14:return I=getParamValue("tensorArrayId",e,t,a),C=getParamValue("tensor",e,t,a),M=getParamValue("lengths",e,t,a),a.getTensorArray(I).split(M,C),[2,[An(1)]];case 15:return k=getParamValue("tensorArrayId",e,t,a),z=a.getTensorArray(k),[2,[An(z.size(),"int32")]];case 16:return j=getParamValue("tensorArrayId",e,t,a),a.getTensorArray(j).clearAndClose(),[2,[An(0)]];case 17:throw TypeError("Node type "+e.op+" is not implemented")}})})}var executeOp$3=function(e,t,a){var r,n;switch(e.op){case"Conv1D":var s=getParamValue("stride",e,t,a),o=getParamValue("pad",e,t,a),p=getParamValue("dataFormat",e,t,a).toUpperCase(),u=getParamValue("dilation",e,t,a);return [Dc(getParamValue("x",e,t,a),getParamValue("filter",e,t,a),s,o,p,u)];case"Conv2D":s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a),p=getParamValue("dataFormat",e,t,a).toUpperCase();var i=getParamValue("dilations",e,t,a);return [Tc(getParamValue("x",e,t,a),getParamValue("filter",e,t,a),[s[1],s[2]],o,p,[i[1],i[2]])];case"_FusedConv2D":var m=(r=getParamValue("fusedOps",e,t,a))[0],l=r[1],c="biasadd"===m,d="prelu"===l,y="fusedbatchnorm"===m,f=getParamValue("numArgs",e,t,a);if(c){if(d&&2!==f)throw new Error("Fused Conv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!d&&1!==f)throw new Error("Fused Conv2d with BiasAdd must have one extra argument: bias.")}if(y)throw new Error("Fused Conv2d with FusedBatchNorm is not supported.");s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a),p=getParamValue("dataFormat",e,t,a).toUpperCase(),i=getParamValue("dilations",e,t,a);var g=(n=getParamValue("args",e,t,a))[0],h=n[1];return [Rh.conv2d({x:getParamValue("x",e,t,a),filter:getParamValue("filter",e,t,a),strides:[s[1],s[2]],pad:o,dataFormat:p,dilations:[i[1],i[2]],bias:g,activation:l,preluActivationWeights:h})];case"Conv2DBackpropInput":case"Conv2dTranspose":var N=getParamValue("outputShape",e,t,a);s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a);return [Lc(getParamValue("x",e,t,a),getParamValue("filter",e,t,a),N,[s[1],s[2]],o)];case"DepthwiseConv2dNative":case"DepthwiseConv2d":s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a),i=getParamValue("dilations",e,t,a),p=getParamValue("dataFormat",e,t,a).toUpperCase();return [_c(getParamValue("input",e,t,a),getParamValue("filter",e,t,a),[s[1],s[2]],o,p,[i[1],i[2]])];case"Conv3D":s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a),p=getParamValue("dataFormat",e,t,a).toUpperCase(),i=getParamValue("dilations",e,t,a);return [Nc(getParamValue("x",e,t,a),getParamValue("filter",e,t,a),[s[1],s[2],s[3]],o,p,[i[1],i[2],i[3]])];case"AvgPool":s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a);var x=getParamValue("kernelSize",e,t,a);return [Qc(getParamValue("x",e,t,a),[x[1],x[2]],[s[1],s[2]],o)];case"MaxPool":s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a),x=getParamValue("kernelSize",e,t,a);return [Yc(getParamValue("x",e,t,a),[x[1],x[2]],[s[1],s[2]],o)];case"AvgPool3D":s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a),x=getParamValue("kernelSize",e,t,a);return [tl(getParamValue("x",e,t,a),[x[1],x[2],x[3]],[s[1],s[2],s[3]],o)];case"MaxPool3D":s=getParamValue("strides",e,t,a),o=getParamValue("pad",e,t,a),x=getParamValue("kernelSize",e,t,a);return [Zc(getParamValue("x",e,t,a),[x[1],x[2],x[3]],[s[1],s[2],s[3]],o)];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$4=function(e,t,a){switch(e.op){case"Fill":var r=getParamValue("shape",e,t,a),n=getParamValue("dtype",e,t,a),s=getParamValue("value",e,t,a);return [Ln(r,s,n)];case"LinSpace":var o=getParamValue("start",e,t,a),p=getParamValue("stop",e,t,a),u=getParamValue("num",e,t,a);return [Wn(o,p,u)];case"Multinomial":var i=getParamValue("logits",e,t,a),m=getParamValue("numSamples",e,t,a),l=getParamValue("seed",e,t,a);return [mr(i,m,l)];case"OneHot":var c=getParamValue("indices",e,t,a),d=getParamValue("depth",e,t,a),y=getParamValue("onValue",e,t,a),f=getParamValue("offValue",e,t,a);return [gr(c,d,y,f)];case"Ones":return [Bn(getParamValue("shape",e,t,a),getParamValue("dtype",e,t,a))];case"OnesLike":return [Vn(getParamValue("x",e,t,a))];case"RandomUniform":return [kr(getParamValue("shape",e,t,a),getParamValue("minval",e,t,a),getParamValue("maxval",e,t,a),getParamValue("dtype",e,t,a))];case"Range":o=getParamValue("start",e,t,a);var g=getParamValue("stop",e,t,a),h=getParamValue("step",e,t,a);return [Un(o,g,h,getParamValue("dtype",e,t,a))];case"TruncatedNormal":r=getParamValue("shape",e,t,a);var N=getParamValue("mean",e,t,a),x=getParamValue("stdDev",e,t,a);l=getParamValue("seed",e,t,a);return [Fr(r,N,x,getParamValue("dtype",e,t,a),l)];case"Zeros":return [Pn(getParamValue("shape",e,t,a),getParamValue("dtype",e,t,a))];case"ZerosLike":return [zn(getParamValue("x",e,t,a))];default:throw TypeError("Node type "+e.op+" is not implemented")}};function executeOp$5(e,t,a){return __awaiter(this,void 0,void 0,function(){var r,n,s,o,p;return __generator(this,function(u){switch(u.label){case 0:switch(e.op){case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":return [3,1];case"Where":return [3,3];case"ListDiff":return [3,5]}return [3,6];case 1:return r=getParamValue("boxes",e,t,a),n=getParamValue("scores",e,t,a),s=getParamValue("maxOutputSize",e,t,a),o=getParamValue("iouThreshold",e,t,a),p=getParamValue("scoreThreshold",e,t,a),[4,mh.nonMaxSuppressionAsync(r,n,s,o,p)];case 2:return [2,[u.sent()]];case 3:return [4,Us(getParamValue("condition",e,t,a).asType("bool"))];case 4:return [2,[u.sent()]];case 5:return [2,_r(getParamValue("x",e,t,a),getParamValue("y",e,t,a))];case 6:throw TypeError("Node type "+e.op+" is not implemented")}})})}var executeOp$6=function(e,t,a){switch(e.op){case"TopKV2":var r=getParamValue("x",e,t,a),n=getParamValue("k",e,t,a),s=getParamValue("sorted",e,t,a),o=Nl(r,n,s);return [o.values,o.indices];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$7=function(e,t,a){switch(e.op){case"Const":return t[e.name];case"PlaceholderWithDefault":var r=getParamValue("default",e,t,a);return [getTensor(e.name,t,a)||r];case"Placeholder":return [getTensor(e.name,t,a)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":return [getParamValue("x",e,t,a).clone()];case"IdentityN":return getParamValue("x",e,t,a).map(function(e){return e.clone()});case"Snapshot":return [getParamValue("x",e,t,a).clone()];case"Shape":return [Dn(getParamValue("x",e,t,a).shape,"int32")];case"ShapeN":return getParamValue("x",e,t,a).map(function(e){return Dn(e.shape)});case"Size":return [An(getParamValue("x",e,t,a).size,"int32")];case"Rank":return [An(getParamValue("x",e,t,a).rank,"int32")];case"NoOp":return [An(1)];case"Print":var n=getParamValue("x",e,t,a),s=getParamValue("data",e,t,a),o=getParamValue("message",e,t,a),p=getParamValue("summarize",e,t,a);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(o);for(var u=0;u<s.length;u++)console.log(Array.prototype.slice.call(s[u].dataSync()).slice(0,p));return [n];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$8=function(e,t,a){switch(e.op){case"ResizeBilinear":var r=getParamValue("images",e,t,a),n=getParamValue("size",e,t,a),s=getParamValue("alignCorners",e,t,a);return [mh.resizeBilinear(r,[n[0],n[1]],s)];case"ResizeNearestNeighbor":r=getParamValue("images",e,t,a),n=getParamValue("size",e,t,a),s=getParamValue("alignCorners",e,t,a);return [mh.resizeNearestNeighbor(r,[n[0],n[1]],s)];case"CropAndResize":var o=getParamValue("image",e,t,a),p=getParamValue("boxes",e,t,a),u=getParamValue("boxInd",e,t,a),i=getParamValue("cropSize",e,t,a),m=getParamValue("method",e,t,a),l=getParamValue("extrapolationValue",e,t,a);return [mh.cropAndResize(o,p,u,i,m,l)];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$9=function(e,t,a){switch(e.op){case"Equal":return [cc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"NotEqual":return [xc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Greater":return [hc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"GreaterEqual":return [fc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Less":return [vc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"LessEqual":return [mc(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"LogicalAnd":return [Ms(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"LogicalNot":return [Bs(getParamValue("a",e,t,a))];case"LogicalOr":return [Ps(getParamValue("a",e,t,a),getParamValue("b",e,t,a))];case"Select":return [Ws(getParamValue("condition",e,t,a),getParamValue("a",e,t,a),getParamValue("b",e,t,a))];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$10=function(e,t,a){switch(e.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return [Uc(getParamValue("a",e,t,a),getParamValue("b",e,t,a),getParamValue("transposeA",e,t,a),getParamValue("transposeB",e,t,a))];case"Transpose":return [Rl(getParamValue("x",e,t,a),getParamValue("perm",e,t,a))];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$11=function(e,t,a){switch(e.op){case"FusedBatchNorm":case"FusedBatchNormV2":case"FusedBatchNormV3":return [Ns(getParamValue("x",e,t,a),getParamValue("mean",e,t,a),getParamValue("variance",e,t,a),getParamValue("offset",e,t,a),getParamValue("scale",e,t,a),getParamValue("epsilon",e,t,a))];case"LRN":return [Il(getParamValue("x",e,t,a),getParamValue("radius",e,t,a),getParamValue("bias",e,t,a),getParamValue("alpha",e,t,a),getParamValue("beta",e,t,a))];case"Softmax":return [io(getParamValue("x",e,t,a))];case"LogSoftmax":return [uo(getParamValue("x",e,t,a))];case"SparseToDense":return [Ll(getParamValue("sparseIndices",e,t,a),getParamValue("outputShape",e,t,a),getParamValue("sparseValues",e,t,a),getParamValue("defaultValue",e,t,a))];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$12=function(e,t,a){switch(e.op){case"Max":var r=getParamValue("axis",e,t,a),n=getParamValue("keepDims",e,t,a);return [fl(getParamValue("x",e,t,a),r,n)];case"Mean":r=getParamValue("axis",e,t,a),n=getParamValue("keepDims",e,t,a);return [pl(getParamValue("x",e,t,a),r,n)];case"Min":r=getParamValue("axis",e,t,a),n=getParamValue("keepDims",e,t,a);return [dl(getParamValue("x",e,t,a),r,n)];case"Sum":r=getParamValue("axis",e,t,a),n=getParamValue("keepDims",e,t,a);return [ml(getParamValue("x",e,t,a),r,n)];case"All":r=getParamValue("axis",e,t,a),n=getParamValue("keepDims",e,t,a);return [ul(getParamValue("x",e,t,a),r,n)];case"Any":r=getParamValue("axis",e,t,a),n=getParamValue("keepDims",e,t,a);return [sl(getParamValue("x",e,t,a),r,n)];case"ArgMax":r=getParamValue("axis",e,t,a);return [cl(getParamValue("x",e,t,a),r)];case"ArgMin":r=getParamValue("axis",e,t,a);return [ll(getParamValue("x",e,t,a),r)];case"Prod":r=getParamValue("axis",e,t,a),n=getParamValue("keepDims",e,t,a);return [gl(getParamValue("x",e,t,a),r,n)];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$13=function(e,t,a){switch(e.op){case"ConcatV2":case"Concat":var r=getParamValue("n",e,t,a),n=getParamValue("axis",e,t,a),s=getParamValue("tensors",e,t,a);return s=s.slice(0,r),[Gn(s,n)];case"GatherV2":case"Gather":n=getParamValue("axis",e,t,a);var o=getParamValue("x",e,t,a),p=getParamValue("indices",e,t,a);return [Ec(o,p.asType("int32"),n)];case"ReverseV2":case"Reverse":n=getParamValue("axis",e,t,a),o=getParamValue("x",e,t,a);return [Gc(o,n)];case"Slice":var u=getParamValue("begin",e,t,a),i=getParamValue("size",e,t,a);return [el(getParamValue("x",e,t,a),u,i)];case"StridedSlice":u=getParamValue("begin",e,t,a);var m=getParamValue("end",e,t,a),l=getParamValue("strides",e,t,a),c=getParamValue("beginMask",e,t,a),d=getParamValue("endMask",e,t,a),y=getParamValue("ellipsisMask",e,t,a),f=getParamValue("newAxisMask",e,t,a),g=getParamValue("shrinkAxisMask",e,t,a),h=getParamValue("x",e,t,a);if(1===u.length&&h.shape.length>1)for(var N=1;N<h.shape.length;N++)u.push(0),m.push(h.shape[N]),l.push(l[0]);return [Tl(h,u,m,l,c,d,y,f,g)];case"Pack":return je(function(){var r=getParamValue("axis",e,t,a),n=getParamValue("tensors",e,t,a),s=n[0].shape,o=n[0].squeeze().shape,p=n.map(function(e){var t=tt.arraysEqual(e.shape,s);if(!t&&!tt.arraysEqual(e.squeeze().shape,o))throw new Error("the input tensors shape does not match");return t?e:e.reshape(s)});return [Tr(p,r)]});case"Unpack":return je(function(){var r=getParamValue("axis",e,t,a),n=getParamValue("tensor",e,t,a);return Or(n,r)});case"Tile":var x=getParamValue("reps",e,t,a);return [Nr(getParamValue("x",e,t,a),x)];case"Split":case"SplitV":n=getParamValue("axis",e,t,a);var V=getParamValue("numOrSizeSplits",e,t,a);return Xn(getParamValue("x",e,t,a),V,n);case"ScatterNd":p=getParamValue("indices",e,t,a);var P=getParamValue("values",e,t,a),b=getParamValue("shape",e,t,a);return [Fl(p,P,b)];case"GatherNd":var T=getParamValue("x",e,t,a);p=getParamValue("indices",e,t,a);return [Wl(T,p)];case"SparseToDense":p=getParamValue("sparseIndices",e,t,a),b=getParamValue("outputShape",e,t,a);var O=getParamValue("sparseValues",e,t,a),v=getParamValue("defaultValue",e,t,a);return [Ll(p,O,b,O.dtype===v.dtype?v:v.asType(O.dtype))];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$14=function(e,t,a){switch(e.op){case"FFT":return [Ol(getParamValue("x",e,t,a))];case"IFFT":return [_l(getParamValue("x",e,t,a))];case"RFFT":return [Ml(getParamValue("x",e,t,a))];case"IRFFT":return [Bl(getParamValue("x",e,t,a))];default:throw TypeError("Node type "+e.op+" is not implemented")}},executeOp$15=function(e,t,a){switch(e.op){case"Cast":return [lr(getParamValue("x",e,t,a),getParamValue("dtype",e,t,a))];case"ExpandDims":var r=getParamValue("axis",e,t,a);return [dr(getParamValue("x",e,t,a),r)];case"Squeeze":r=getParamValue("axis",e,t,a);return [Dr(getParamValue("x",e,t,a),r)];case"Reshape":return [Sr(getParamValue("x",e,t,a),getParamValue("shape",e,t,a))];case"PadV2":case"Pad":return [yr(getParamValue("x",e,t,a),split$1(getParamValue("padding",e,t,a),2),getParamValue("constantValue",e,t,a))];case"SpaceToBatchND":var n=getParamValue("blockShape",e,t,a),s=split$1(getParamValue("paddings",e,t,a),2);return [Ar(getParamValue("x",e,t,a),n,s)];case"BatchToSpaceND":n=getParamValue("blockShape",e,t,a);var o=split$1(getParamValue("crops",e,t,a),2);return [cr(getParamValue("x",e,t,a),n,o)];case"DepthToSpace":var p=getParamValue("blockSize",e,t,a),u=getParamValue("dataFormat",e,t,a).toUpperCase();return [pr(getParamValue("x",e,t,a),p,u)];default:throw TypeError("Node type "+e.op+" is not implemented")}};function executeOp$16(e,t,a){var r=function(e,t,a){switch(e.category){case"arithmetic":return executeOp(e,t,a);case"basic_math":return executeOp$1(e,t,a);case"control":return executeOp$2(e,t,a);case"convolution":return executeOp$3(e,t,a);case"creation":return executeOp$4(e,t,a);case"dynamic":return executeOp$5(e,t,a);case"evaluation":return executeOp$6(e,t,a);case"image":return executeOp$8(e,t,a);case"graph":return executeOp$7(e,t,a);case"logical":return executeOp$9(e,t,a);case"matrices":return executeOp$10(e,t,a);case"normalization":return executeOp$11(e,t,a);case"reduction":return executeOp$12(e,t,a);case"slice_join":return executeOp$13(e,t,a);case"spectral":return executeOp$14(e,t,a);case"transformation":return executeOp$15(e,t,a);case"custom":var r=getRegisteredOp(e.op);if(r&&r.customExecutor)return r.customExecutor(new NodeValueImpl(e,t,a));throw TypeError("Custom op "+e.op+" is not registered.");default:throw TypeError("Unknown op '"+e.op+"'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()")}}(e,t,a);return r instanceof Promise?r.then(function(e){return [].concat(e)}):[].concat(r)}var ExecutionContext=function(){function e(e,t){this.weightMap=e,this.tensorArrayMap=t,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds();}return e.prototype.newFrame=function(e,t){return {id:e,frameName:t,iterationId:0}},Object.defineProperty(e.prototype,"currentContext",{get:function(){return this.contexts},set:function(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds());},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentContextId",{get:function(){return this._currentContextIds[0]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentContextIds",{get:function(){return this._currentContextIds},enumerable:!0,configurable:!0}),e.prototype.generateCurrentContextIds=function(){for(var e=[],t=0;t<this.contexts.length-1;t++){var a=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(a));}e.push(""),this._currentContextIds=e;},e.prototype.contextIdforContexts=function(e){return e?e.map(function(e){return 0===e.id&&0===e.iterationId?"":e.frameName+"-"+e.iterationId}).join("/"):""},e.prototype.enterFrame=function(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)));},e.prototype.exitFrame=function(){if(!(this.contexts&&this.contexts.length>1))throw new Error("Cannot exit frame, the context is empty");this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();},e.prototype.nextIteration=function(){if(!(this.contexts&&this.contexts.length>0))throw new Error("Cannot increase frame iteration, the context is empty");this.contexts=this.contexts.slice(),this.lastId++;var e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts));},e.prototype.getWeight=function(e){return this.weightMap[e]},e.prototype.addTensorArray=function(e){this.tensorArrayMap[e.id]=e;},e.prototype.getTensorArray=function(e){return this.tensorArrayMap[e]},e}();function getExecutionSubgraph(e,t,a){for(var r=new Set,n=[],s=null,o=null,p=new Set,u=t.slice();u.length>0;){var i=u.pop();(isControlFlow(i)||isDynamicShape(i))&&null==s&&(o=(s=i).children.map(function(e){return e.name}).filter(function(e){return r.has(e)})),r.add(i.name),null==a[i.name]&&(null==e[i.name]&&(0!==i.inputs.length?i.inputs.forEach(function(e){p.has(e.name)||(p.add(e.name),u.push(e));}):n.push(i.name)));}return {inputs:e,outputs:t,usedNodes:r,missingInputs:n,dynamicNode:s,syncInputs:o}}function getNodesInTopologicalOrder(e,t,a){var r=a.usedNodes,n=a.inputs,s=[];Object.keys(n).map(function(t){return e.nodes[t]}).forEach(function(e){r.has(e.name)&&s.push(e);}),e.weights.forEach(function(e){r.has(e.name)&&s.push(e);});for(var o=new Set,p=[];s.length>0;){var u=s.pop();o.add(u.name),t[u.name]||p.push(u),u.children.forEach(function(e){!o.has(e.name)&&r.has(e.name)&&e.inputs.every(function(e){return o.has(e.name)})&&s.push(e);});}return p}var CONTROL_FLOW_OPS=["Switch","Merge","Enter","Exit","NextIteration"],DYNAMIC_SHAPE_OPS=["NonMaxSuppressionV2","NonMaxSuppressionV3","Where"];function isControlFlow(e){return CONTROL_FLOW_OPS.indexOf(e.op)>=0}function isDynamicShape(e){return DYNAMIC_SHAPE_OPS.indexOf(e.op)>=0}var GraphExecutor=function(){function e(e){this.graph=e,this.compiledMap=new Map,this._weightMap={},this.SEPERATOR=",",this.placeholders=e.placeholders,this._outputs=e.outputs;}return Object.defineProperty(e.prototype,"weightMap",{get:function(){return this._weightMap},set:function(e){var t=Object.keys(e).map(function(t){return e[t].map(function(e){return e.id})});this.weightIds=[].concat.apply([],t),this._weightMap=e;},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"inputs",{get:function(){return this.placeholders.map(function(e){return {name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"outputs",{get:function(){return this._outputs.map(function(e){return {name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"inputNodes",{get:function(){return this.placeholders.map(function(e){return e.name})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"outputNodes",{get:function(){return this.outputs.map(function(e){return e.name})},enumerable:!0,configurable:!0}),e.prototype.getCompilationKey=function(e,t){var a=e.map(function(e){return e.name}).sort(),r=t.map(function(e){return e.name}).sort();return a.join(this.SEPERATOR)+"--"+r.join(this.SEPERATOR)},e.prototype.compile=function(e,t){var a=getExecutionSubgraph(e,t,this.weightMap),r=a.missingInputs,n=a.dynamicNode,s=a.syncInputs;if(null!=n)throw new Error("This execution contains the node '"+n.name+"', which has the dynamic op '"+n.op+"'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs ["+s+"]");if(r.length>0){var o=t.map(function(e){return e.name}),p=Object.keys(e);throw new Error("Cannot compute the outputs ["+o+"] from the provided inputs ["+p+"]. Missing the following inputs: ["+r+"]")}return getNodesInTopologicalOrder(this.graph,this.weightMap,a)},e.prototype.execute=function(e,t){var a=this,r=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),this.checkOutputs(t);var n=r.map(function(e){return a.graph.nodes[e]}),s=t.map(function(e){return a.graph.nodes[parseNodeName(e)[0]]}),o=this.getCompilationKey(n,s),p=this.compiledMap.get(o);null==p&&(p=this.compile(e,s),this.compiledMap.set(o,p));var u={};return je(function(){var r=new ExecutionContext(a._weightMap,u),n=__assign({},a.weightMap);Object.keys(e).forEach(function(t){n[t]=[e[t]];});for(var s=a.getFrozenTensorIds(n),o={},i=0;i<p.length;i++){var m=p[i];if(!n[m.name]){var l=executeOp$16(m,n,r);if(l instanceof Promise)throw new Error("The execution of the op '"+m.op+"' returned a promise. Please use model.executeAsync() instead.");n[m.name]=l,a.checkTensorForDisposal(m.name,m,n,r,s,t,o);}}return t.map(function(e){return getTensor(e,n,r)})})},e.prototype.getFrozenTensorIds=function(e){var t=[].concat.apply([],Object.keys(e).map(function(t){return e[t]}).map(function(e){return e.map(function(e){return e.id})}));return new Set(t)},e.prototype.checkTensorForDisposal=function(e,t,a,r,n,s,o){"control"!==t.category&&-1===s.indexOf(e)&&(a[e].forEach(function(e){null!=e&&(o[e.id]=(o[e.id]||0)+t.children.length);}),t.inputs.forEach(function(e){if("control"!==e.category){var t=getTensorsForCurrentContenxt(e.name,a,r);null!=t&&t.forEach(function(e){if(e&&!n.has(e.id)){var t=o[e.id];1===t?(e.dispose(),delete o[e.id]):null!=t&&o[e.id]--;}});}}));},e.prototype.executeAsync=function(e,t){return __awaiter(this,void 0,void 0,function(){var a,r,n,s,o,p,u=this;return __generator(this,function(i){switch(i.label){case 0:return this.checkInputs(e),this.checkInputShapeAndType(e),this.checkOutputs(t),a={},r=new ExecutionContext(this._weightMap,a),[4,this.executeWithControlFlow(e,r,t)];case 1:return n=i.sent(),s=t.map(function(e){return getTensor(e,n,r)}),o=new Set(s.map(function(e){return e.id})),p=new Set(Object.keys(e).map(function(t){return e[t].id})),Object.keys(n).forEach(function(e){n[e].forEach(function(e){!e||e.isDisposed||o.has(e.id)||p.has(e.id)||-1!==u.weightIds.indexOf(e.id)||e.dispose();});}),[2,s]}})})},e.prototype.executeWithControlFlow=function(e,t,a){return __awaiter(this,void 0,void 0,function(){var r,n,s,o,p,u,i,m,l,c,d,y,f,g,h,N,x=this;return __generator(this,function(V){switch(V.label){case 0:r=Object.keys(e),n=r.map(function(e){return x.graph.nodes[e]}),s=a.map(function(e){return x.graph.nodes[parseNodeName(e)[0]]}),o=getExecutionSubgraph(e,s,this.weightMap),p=o.usedNodes,u=o.missingInputs,i=o.dynamicNode,m=o.syncInputs,l=n.concat(this.graph.weights).map(function(e){return {node:e,contexts:t.currentContext}}),c=__assign({},this.weightMap),Object.keys(e).forEach(function(t){c[t]=[e[t]];}),d={},y=this.getFrozenTensorIds(c),f={},V.label=1;case 1:return l.length>0?(g=this.processStack(n,l,t,c,f,y,a,d,p),[4,Promise.all(g)]):[3,3];case 2:return V.sent(),[3,1];case 3:if(null==i&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead."),(h=s.filter(function(e){return !isControlFlow(e)&&!getTensor(e.name,c,t)}).map(function(e){return e.name})).length>0)throw N="",null!=i&&(N="Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs ["+m+"]"),new Error("Cannot compute the outputs ["+h+"] from the provided inputs ["+r+"]. Consider providing the following inputs: ["+u+"]. "+N);return [2,c]}})})},e.prototype.processStack=function(e,t,a,r,n,s,o,p,u){for(var i=this,m=[],l=function(){var l=t.pop();a.currentContext=l.contexts;var d="";if("Enter"===l.node.op&&getParamValue("isConstant",l.node,r,a)&&(d=getNodeNameAndIndex(l.node.name,a)[0]),-1===e.indexOf(l.node)){var y=executeOp$16(l.node,r,a);d||(d=getNodeNameAndIndex(l.node.name,a)[0]);var f=a.currentContext;y instanceof Promise?m.push(y.then(function(e){return r[d]=e,a.currentContext=f,i.checkTensorForDisposal(d,l.node,r,a,s,o,p),i.processChildNodes(l.node,t,a,r,n,u),e})):(r[d]=y,c.checkTensorForDisposal(d,l.node,r,a,s,o,p),c.processChildNodes(l.node,t,a,r,n,u));}else c.processChildNodes(l.node,t,a,r,n,u);},c=this;t.length>0;)l();return m},e.prototype.processChildNodes=function(e,t,a,r,n,s){e.children.forEach(function(e){var o=getNodeNameAndIndex(e.name,a)[0];!n[o]&&s.has(e.name)&&("Merge"===e.op?e.inputNames.some(function(e){return !!getTensor(e,r,a)})&&(n[o]=!0,t.push({contexts:a.currentContext,node:e})):e.inputNames.every(function(e){return !!getTensor(e,r,a)})&&(n[o]=!0,t.push({contexts:a.currentContext,node:e})));});},e.prototype.dispose=function(){var e=this;Object.keys(this.weightMap).forEach(function(t){return e.weightMap[t].forEach(function(e){return e.dispose()})});},e.prototype.checkInputShapeAndType=function(e){var t=this;Object.keys(e).forEach(function(a){var r=e[a],n=t.graph.nodes[a];if(n.attrParams.shape&&n.attrParams.shape.value){var s=n.attrParams.shape.value,o=s.length===r.shape.length&&r.shape.every(function(e,t){return -1===s[t]||s[t]===e});tt.assert(o,function(){return "The shape of dict['"+n.name+"'] provided in model.execute(dict) must be ["+s+"], but was ["+r.shape+"]"});}n.attrParams.dtype&&n.attrParams.dtype.value&&tt.assert(r.dtype===n.attrParams.dtype.value,function(){return "The dtype of dict['"+n.name+"'] provided in model.execute(dict) must be "+n.attrParams.dtype.value+", but was "+r.dtype});});},e.prototype.checkInputs=function(e){var t=this,a=Object.keys(e).filter(function(e){return !t.graph.nodes[e]});if(a.length>0)throw new Error("The dict provided in model.execute(dict) has keys: ["+a+"] that are not part of graph")},e.prototype.checkOutputs=function(e){var t=this;e.forEach(function(e){var a=parseNodeName(e)[0];if(!t.graph.nodes[a])throw new Error("The output '"+e+"' is not found in the graph")});},e}(),TFHUB_SEARCH_PARAM="?tfjs-format=file",DEFAULT_MODEL_NAME="model.json",GraphModel=function(){function e(e,t){void 0===t&&(t={}),this.modelUrl=e,this.loadOptions=t,this.version="n/a",null==t&&(this.loadOptions={});}return Object.defineProperty(e.prototype,"modelVersion",{get:function(){return this.version},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"inputNodes",{get:function(){return this.executor.inputNodes},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"outputNodes",{get:function(){return this.executor.outputNodes},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"inputs",{get:function(){return this.executor.inputs},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"outputs",{get:function(){return this.executor.outputs},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"weights",{get:function(){return this.executor.weightMap},enumerable:!0,configurable:!0}),e.prototype.findIOHandler=function(){var e=this.modelUrl;if(null!=e.load)this.handler=e;else if(null!=this.loadOptions.requestInit)this.handler=Af.browserHTTPRequest(e,this.loadOptions);else{var t=Af.getLoadHandlers(e,this.loadOptions.onProgress);if(0===t.length)t.push(Af.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw new Error("Found more than one ("+t.length+") load handlers for URL '"+[e]+"'");this.handler=t[0];}},e.prototype.load=function(){return __awaiter(this,void 0,void 0,function(){var e,t,a;return __generator(this,function(r){switch(r.label){case 0:if(this.findIOHandler(),null==this.handler.load)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");return [4,this.handler.load()];case 1:return e=r.sent(),t=e.modelTopology,this.version=t.versions.producer+"."+t.versions.minConsumer,a=Af.decodeWeights(e.weightData,e.weightSpecs),this.executor=new GraphExecutor(OperationMapper.Instance.transformGraph(t)),this.executor.weightMap=this.convertTensorMapToTensorsMap(a),[2,!0]}})})},e.prototype.predict=function(e,t){return this.execute(e,this.outputNodes)},e.prototype.normalizeInputs=function(e){if(!(e instanceof dt||Array.isArray(e)))return e;if((e=Array.isArray(e)?e:[e]).length!==this.inputNodes.length)throw new Error("Input tensor count mismatch,the graph model has "+this.inputNodes.length+" placeholders, while there are "+e.length+" input tensors.");return this.inputNodes.reduce(function(t,a,r){return t[a]=e[r],t},{})},e.prototype.normalizeOutputs=function(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]},e.prototype.execute=function(e,t){e=this.normalizeInputs(e),t=this.normalizeOutputs(t);var a=this.executor.execute(e,t);return a.length>1?a:a[0]},e.prototype.executeAsync=function(e,t){return __awaiter(this,void 0,void 0,function(){var a;return __generator(this,function(r){switch(r.label){case 0:return e=this.normalizeInputs(e),t=this.normalizeOutputs(t),[4,this.executor.executeAsync(e,t)];case 1:return [2,(a=r.sent()).length>1?a:a[0]]}})})},e.prototype.convertTensorMapToTensorsMap=function(e){return Object.keys(e).reduce(function(t,a){return t[a]=[e[a]],t},{})},e.prototype.dispose=function(){this.executor.dispose();},e}();function loadGraphModel(e,t){return void 0===t&&(t={}),__awaiter(this,void 0,void 0,function(){var a;return __generator(this,function(r){switch(r.label){case 0:if(null==e)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");return null==t&&(t={}),t.fromTFHub&&null==e.load&&(e.endsWith("/")||(e+="/"),e=""+e+DEFAULT_MODEL_NAME+TFHUB_SEARCH_PARAM),[4,(a=new GraphModel(e,t)).load()];case 1:return r.sent(),[2,a]}})})}

	/**
	    * @license
	    * Copyright 2019 Google LLC. All Rights Reserved.
	    * Licensed under the Apache License, Version 2.0 (the "License");
	    * you may not use this file except in compliance with the License.
	    * You may obtain a copy of the License at
	    *
	    * http://www.apache.org/licenses/LICENSE-2.0
	    *
	    * Unless required by applicable law or agreed to in writing, software
	    * distributed under the License is distributed on an "AS IS" BASIS,
	    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	    * See the License for the specific language governing permissions and
	    * limitations under the License.
	    * =============================================================================
	    */
	var extendStatics=function(e,t){return (extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);})(e,t)};function __extends(e,t){function n(){this.constructor=e;}extendStatics(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n);}var __assign$1=function(){return (__assign$1=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function __awaiter$1(e,t,n,r){return new(n||(n=Promise))(function(o,i){function s(e){try{a(r.next(e));}catch(e){i(e);}}function u(e){try{a(r.throw(e));}catch(e){i(e);}}function a(e){e.done?o(e.value):new n(function(t){t(e.value);}).then(s,u);}a((r=r.apply(e,t||[])).next());})}function __generator$1(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s);}catch(e){i=[6,e],r=0;}finally{n=o=0;}if(5&i[0])throw i[1];return {value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var BaseModel=function(){function e(e,t){this.model=e,this.outputStride=t;var n=this.model.inputs[0].shape;tt.assert(-1===n[1]&&-1===n[2],function(){return "Input shape ["+n[1]+", "+n[2]+"] must both be equal to or -1"});}return e.prototype.predict=function(e){var t=this;return je(function(){var n=t.preprocessInput(e.toFloat()).expandDims(0),r=t.model.predict(n).map(function(e){return e.squeeze([0])}),o=t.nameOutputResults(r);return {heatmapScores:o.heatmap.sigmoid(),offsets:o.offsets,displacementFwd:o.displacementFwd,displacementBwd:o.displacementBwd}})},e.prototype.dispose=function(){this.model.dispose();},e}(),MobileNet=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.preprocessInput=function(e){return je(function(){return qs(e,127.5).sub(1)})},t.prototype.nameOutputResults=function(e){return {offsets:e[0],heatmap:e[1],displacementFwd:e[2],displacementBwd:e[3]}},t}(BaseModel);function half(e){return Math.floor(e/2)}var MaxHeap=function(){function e(e,t){this.priorityQueue=new Array(e),this.numberOfElements=-1,this.getElementValue=t;}return e.prototype.enqueue=function(e){this.priorityQueue[++this.numberOfElements]=e,this.swim(this.numberOfElements);},e.prototype.dequeue=function(){var e=this.priorityQueue[0];return this.exchange(0,this.numberOfElements--),this.sink(0),this.priorityQueue[this.numberOfElements+1]=null,e},e.prototype.empty=function(){return -1===this.numberOfElements},e.prototype.size=function(){return this.numberOfElements+1},e.prototype.all=function(){return this.priorityQueue.slice(0,this.numberOfElements+1)},e.prototype.max=function(){return this.priorityQueue[0]},e.prototype.swim=function(e){for(;e>0&&this.less(half(e),e);)this.exchange(e,half(e)),e=half(e);},e.prototype.sink=function(e){for(;2*e<=this.numberOfElements;){var t=2*e;if(t<this.numberOfElements&&this.less(t,t+1)&&t++,!this.less(e,t))break;this.exchange(e,t),e=t;}},e.prototype.getValueAt=function(e){return this.getElementValue(this.priorityQueue[e])},e.prototype.less=function(e,t){return this.getValueAt(e)<this.getValueAt(t)},e.prototype.exchange=function(e,t){var n=this.priorityQueue[e];this.priorityQueue[e]=this.priorityQueue[t],this.priorityQueue[t]=n;},e}();function scoreIsMaximumInLocalWindow(e,t,n,r,o,i){for(var s=i.shape,u=s[0],a=s[1],l=!0,p=Math.max(n-o,0),c=Math.min(n+o+1,u),f=p;f<c;++f){for(var d=Math.max(r-o,0),h=Math.min(r+o+1,a),m=d;m<h;++m)if(i.get(f,m,e)>t){l=!1;break}if(!l)break}return l}function buildPartWithScoreQueue(e,t,n){for(var r=n.shape,o=r[0],i=r[1],s=r[2],u=new MaxHeap(o*i*s,function(e){return e.score}),a=0;a<o;++a)for(var l=0;l<i;++l)for(var p=0;p<s;++p){var c=n.get(a,l,p);c<e||scoreIsMaximumInLocalWindow(p,c,a,l,t,n)&&u.enqueue({score:c,part:{heatmapY:a,heatmapX:l,id:p}});}return u}var partNames=["nose","leftEye","rightEye","leftEar","rightEar","leftShoulder","rightShoulder","leftElbow","rightElbow","leftWrist","rightWrist","leftHip","rightHip","leftKnee","rightKnee","leftAnkle","rightAnkle"],NUM_KEYPOINTS=partNames.length,partIds=partNames.reduce(function(e,t,n){return e[t]=n,e},{}),connectedPartNames=[["leftHip","leftShoulder"],["leftElbow","leftShoulder"],["leftElbow","leftWrist"],["leftHip","leftKnee"],["leftKnee","leftAnkle"],["rightHip","rightShoulder"],["rightElbow","rightShoulder"],["rightElbow","rightWrist"],["rightHip","rightKnee"],["rightKnee","rightAnkle"],["leftShoulder","rightShoulder"],["leftHip","rightHip"]],poseChain=[["nose","leftEye"],["leftEye","leftEar"],["nose","rightEye"],["rightEye","rightEar"],["nose","leftShoulder"],["leftShoulder","leftElbow"],["leftElbow","leftWrist"],["leftShoulder","leftHip"],["leftHip","leftKnee"],["leftKnee","leftAnkle"],["nose","rightShoulder"],["rightShoulder","rightElbow"],["rightElbow","rightWrist"],["rightShoulder","rightHip"],["rightHip","rightKnee"],["rightKnee","rightAnkle"]],connectedPartIndices=connectedPartNames.map(function(e){var t=e[0],n=e[1];return [partIds[t],partIds[n]]});function getOffsetPoint(e,t,n,r){return {y:r.get(e,t,n),x:r.get(e,t,n+NUM_KEYPOINTS)}}function getImageCoords(e,t,n){var r=getOffsetPoint(e.heatmapY,e.heatmapX,e.id,n),o=r.y,i=r.x;return {x:e.heatmapX*t+i,y:e.heatmapY*t+o}}function clamp(e,t,n){return e<t?t:e>n?n:e}function squaredDistance(e,t,n,r){var o=n-e,i=r-t;return o*o+i*i}function addVectors(e,t){return {x:e.x+t.x,y:e.y+t.y}}var parentChildrenTuples=poseChain.map(function(e){var t=e[0],n=e[1];return [partIds[t],partIds[n]]}),parentToChildEdges=parentChildrenTuples.map(function(e){return e[1]}),childToParentEdges=parentChildrenTuples.map(function(e){return e[0]});function getDisplacement(e,t,n){var r=n.shape[2]/2;return {y:n.get(t.y,t.x,e),x:n.get(t.y,t.x,r+e)}}function getStridedIndexNearPoint(e,t,n,r){return {y:clamp(Math.round(e.y/t),0,n-1),x:clamp(Math.round(e.x/t),0,r-1)}}function traverseToTargetKeypoint(e,t,n,r,o,i,s,u){void 0===u&&(u=2);for(var a=r.shape,l=a[0],p=a[1],c=getDisplacement(e,getStridedIndexNearPoint(t.position,i,l,p),s),f=addVectors(t.position,c),d=0;d<u;d++){var h=getStridedIndexNearPoint(f,i,l,p),m=getOffsetPoint(h.y,h.x,n,o);f=addVectors({x:h.x*i,y:h.y*i},{x:m.x,y:m.y});}var g=getStridedIndexNearPoint(f,i,l,p),_=r.get(g.y,g.x,n);return {position:f,part:partNames[n],score:_}}function decodePose(e,t,n,r,o,i){var s=t.shape[2],u=parentToChildEdges.length,a=new Array(s),l=e.part,p=e.score,c=getImageCoords(l,r,n);a[l.id]={score:p,part:partNames[l.id],position:c};for(var f=u-1;f>=0;--f){var d=parentToChildEdges[f],h=childToParentEdges[f];a[d]&&!a[h]&&(a[h]=traverseToTargetKeypoint(f,a[d],h,t,n,r,i));}for(f=0;f<u;++f){d=childToParentEdges[f],h=parentToChildEdges[f];a[d]&&!a[h]&&(a[h]=traverseToTargetKeypoint(f,a[d],h,t,n,r,o));}return a}function withinNmsRadiusOfCorrespondingPoint(e,t,n,r){var o=n.x,i=n.y;return e.some(function(e){var n=e.keypoints[r].position;return squaredDistance(i,o,n.y,n.x)<=t})}function getInstanceScore(e,t,n){return n.reduce(function(n,r,o){var i=r.position,s=r.score;return withinNmsRadiusOfCorrespondingPoint(e,t,i,o)||(n+=s),n},0)/n.length}var kLocalMaximumRadius=1;function decodeMultiplePoses(e,t,n,r,o,i,s,u){void 0===s&&(s=.5),void 0===u&&(u=20);for(var a=[],l=buildPartWithScoreQueue(s,kLocalMaximumRadius,e),p=u*u;a.length<i&&!l.empty();){var c=l.dequeue();if(!withinNmsRadiusOfCorrespondingPoint(a,p,getImageCoords(c.part,o,t),c.part.id)){var f=decodePose(c,e,t,o,n,r),d=getInstanceScore(a,p,f);a.push({keypoints:f,score:d});}}return a}function mod(e,t){return je(function(){var n=e.div(An(t,"int32"));return e.sub(n.mul(An(t,"int32")))})}function argmax2d(e){var t=e.shape,n=t[0],r=t[1],o=t[2];return je(function(){var t=e.reshape([n*r,o]).argMax(0),i=t.div(An(r,"int32")).expandDims(1),s=mod(t,r).expandDims(1);return Gn([i,s],1)})}function getPointsConfidence(e,t){for(var n=t.shape[0],r=new Float32Array(n),o=0;o<n;o++){var i=t.get(o,0),s=t.get(o,1);r[o]=e.get(i,s,o);}return r}function getOffsetPoint$1(e,t,n,r){return {y:r.get(e,t,n),x:r.get(e,t,n+NUM_KEYPOINTS)}}function getOffsetVectors(e,t){for(var n=[],r=0;r<NUM_KEYPOINTS;r++){var o=getOffsetPoint$1(e.get(r,0).valueOf(),e.get(r,1).valueOf(),r,t),i=o.x,s=o.y;n.push(s),n.push(i);}return Tn(n,[NUM_KEYPOINTS,2])}function getOffsetPoints(e,t,n){return je(function(){var r=getOffsetVectors(e,n);return e.toTensor().mul(An(t,"int32")).toFloat().add(r)})}function decodeSinglePose(e,t,n){return __awaiter$1(this,void 0,void 0,function(){var r,o,i,s,u,a,l,p,c,f;return __generator$1(this,function(d){switch(d.label){case 0:return r=0,o=argmax2d(e),[4,Promise.all([e.buffer(),t.buffer(),o.buffer()])];case 1:return i=d.sent(),s=i[0],u=i[1],a=i[2],[4,(l=getOffsetPoints(a,n,u)).buffer()];case 2:return p=d.sent(),c=Array.from(getPointsConfidence(s,a)),f=c.map(function(e,t){return r+=e,{position:{y:p.get(t,0),x:p.get(t,1)},part:partNames[t],score:e}}),o.dispose(),l.dispose(),[2,{keypoints:f,score:r/f.length}]}})})}var MOBILENET_BASE_URL="https://storage.googleapis.com/tfjs-models/savedmodel/posenet/mobilenet/",RESNET50_BASE_URL="https://storage.googleapis.com/tfjs-models/savedmodel/posenet/resnet50/";function resNet50Checkpoint(e,t){var n="model-stride"+e+".json";return 4===t?RESNET50_BASE_URL+"float/"+n:RESNET50_BASE_URL+"quant"+t+"/"+n}function mobileNetCheckpoint(e,t,n){var r={1:"100",.75:"075",.5:"050"},o="model-stride"+e+".json";return 4===n?MOBILENET_BASE_URL+"float/"+r[t]+"/"+o:MOBILENET_BASE_URL+"quant"+n+"/"+r[t]+"/"+o}var imageNetMean=[-123.15,-115.9,-103.06],ResNet=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.preprocessInput=function(e){return e.add(imageNetMean)},t.prototype.nameOutputResults=function(e){var t=e[0],n=e[1];return {offsets:e[2],heatmap:e[3],displacementFwd:t,displacementBwd:n}},t}(BaseModel);function toTensorBuffers3D(e){return __awaiter$1(this,void 0,void 0,function(){return __generator$1(this,function(t){return [2,Promise.all(e.map(function(e){return e.buffer()}))]})})}function scalePose(e,t,n,r,o){return void 0===r&&(r=0),void 0===o&&(o=0),{score:e.score,keypoints:e.keypoints.map(function(e){var i=e.score,s=e.part,u=e.position;return {score:i,part:s,position:{x:u.x*n+o,y:u.y*t+r}}})}}function scalePoses(e,t,n,r,o){return void 0===r&&(r=0),void 0===o&&(o=0),1===n&&1===t&&0===r&&0===o?e:e.map(function(e){return scalePose(e,t,n,r,o)})}function flipPoseHorizontal(e,t){return {score:e.score,keypoints:e.keypoints.map(function(e){var n=e.score,r=e.part,o=e.position;return {score:n,part:r,position:{x:t-1-o.x,y:o.y}}})}}function flipPosesHorizontal(e,t){return t<=0?e:e.map(function(e){return flipPoseHorizontal(e,t)})}function toValidInputResolution(e,t){return isValidInputResolution(e,t)?e:Math.floor(e/t)*t+1}function validateInputResolution(e){tt.assert("number"==typeof e||"object"==typeof e,function(){return "Invalid inputResolution "+e+". Should be a number or an object with width and height"}),"object"==typeof e&&(tt.assert("number"==typeof e.width,function(){return "inputResolution.width has a value of "+e.width+" which is invalid; it must be a number"}),tt.assert("number"==typeof e.height,function(){return "inputResolution.height has a value of "+e.height+" which is invalid; it must be a number"}));}function getValidInputResolutionDimensions(e,t){return validateInputResolution(e),"object"==typeof e?[toValidInputResolution(e.height,t),toValidInputResolution(e.width,t)]:[toValidInputResolution(e,t),toValidInputResolution(e,t)]}var VALID_OUTPUT_STRIDES=[8,16,32];function assertValidOutputStride(e){tt.assert("number"==typeof e,function(){return "outputStride is not a number"}),tt.assert(VALID_OUTPUT_STRIDES.indexOf(e)>=0,function(){return "outputStride of "+e+" is invalid. It must be either 8, 16, or 32"});}function isValidInputResolution(e,t){return (e-1)%t==0}function assertValidResolution(e,t){tt.assert("number"==typeof e[0]&&"number"==typeof e[1],function(){return "both resolution values must be a number but had values "+e}),tt.assert(isValidInputResolution(e[0],t),function(){return "height of "+e[0]+" is invalid for output stride "+t+"."}),tt.assert(isValidInputResolution(e[1],t),function(){return "width of "+e[1]+" is invalid for output stride "+t+"."});}function getInputTensorDimensions(e){return e instanceof dt?[e.shape[0],e.shape[1]]:[e.height,e.width]}function toInputTensor(e){return e instanceof dt?e:Ff.fromPixels(e)}function padAndResizeTo(e,t){var n=t[0],r=t[1],o=getInputTensorDimensions(e),i=o[0],s=o[1],u=r/n,a=[0,0,0,0],l=a[0],p=a[1],c=a[2],f=a[3];return s/i<u?(l=0,p=0,c=Math.round(.5*(u*i-s)),f=Math.round(.5*(u*i-s))):(l=Math.round(.5*(1/u*s-i)),p=Math.round(.5*(1/u*s-i)),c=0,f=0),{resized:je(function(){var t=toInputTensor(e);return (t=wr(t,[[l,p],[c,f],[0,0]])).resizeBilinear([n,r])}),padding:{top:l,left:c,right:f,bottom:p}}}function scaleAndFlipPoses(e,t,n,r,o){var i=t[0],s=t[1],u=n[0],a=n[1],l=scalePoses(e,(i+r.top+r.bottom)/u,(s+r.left+r.right)/a,-r.top,-r.left);return o?flipPosesHorizontal(l,s):l}var MOBILENET_V1_CONFIG={architecture:"MobileNetV1",outputStride:16,multiplier:.75,inputResolution:257},VALID_ARCHITECTURE=["MobileNetV1","ResNet50"],VALID_STRIDE={MobileNetV1:[8,16,32],ResNet50:[32,16]},VALID_MULTIPLIER={MobileNetV1:[.5,.75,1],ResNet50:[1]},VALID_QUANT_BYTES=[1,2,4];function validateModelConfig(e){if(null==(e=e||MOBILENET_V1_CONFIG).architecture&&(e.architecture="MobileNetV1"),VALID_ARCHITECTURE.indexOf(e.architecture)<0)throw new Error("Invalid architecture "+e.architecture+". Should be one of "+VALID_ARCHITECTURE);if(null==e.inputResolution&&(e.inputResolution=257),validateInputResolution(e.inputResolution),null==e.outputStride&&(e.outputStride=16),VALID_STRIDE[e.architecture].indexOf(e.outputStride)<0)throw new Error("Invalid outputStride "+e.outputStride+". Should be one of "+VALID_STRIDE[e.architecture]+" for architecutre "+e.architecture+".");if(null==e.multiplier&&(e.multiplier=1),VALID_MULTIPLIER[e.architecture].indexOf(e.multiplier)<0)throw new Error("Invalid multiplier "+e.multiplier+". Should be one of "+VALID_MULTIPLIER[e.architecture]+" for architecutre "+e.architecture+".");if(null==e.quantBytes&&(e.quantBytes=4),VALID_QUANT_BYTES.indexOf(e.quantBytes)<0)throw new Error("Invalid quantBytes "+e.quantBytes+". Should be one of "+VALID_QUANT_BYTES+" for architecutre "+e.architecture+".");return e}var SINGLE_PERSON_INFERENCE_CONFIG={flipHorizontal:!1},MULTI_PERSON_INFERENCE_CONFIG={flipHorizontal:!1,maxDetections:5,scoreThreshold:.5,nmsRadius:20};function validateMultiPersonInputConfig(e){var t=e.maxDetections,n=e.scoreThreshold,r=e.nmsRadius;if(t<=0)throw new Error("Invalid maxDetections "+t+". Should be > 0");if(n<0||n>1)throw new Error("Invalid scoreThreshold "+n+". Should be in range [0.0, 1.0]");if(r<=0)throw new Error("Invalid nmsRadius "+r+".")}var PoseNet=function(){function e(e,t){assertValidOutputStride(e.outputStride),assertValidResolution(t,e.outputStride),this.baseModel=e,this.inputResolution=t;}return e.prototype.estimateMultiplePoses=function(e,t){return void 0===t&&(t=MULTI_PERSON_INFERENCE_CONFIG),__awaiter$1(this,void 0,void 0,function(){var n,r,o,i,s,u,a,l,p,c,f,d,h,m,g,_,I,v,y,E,b;return __generator$1(this,function(N){switch(N.label){case 0:return n=__assign$1({},MULTI_PERSON_INFERENCE_CONFIG,t),validateMultiPersonInputConfig(t),r=this.baseModel.outputStride,o=this.inputResolution,i=getInputTensorDimensions(e),s=i[0],u=i[1],a=padAndResizeTo(e,o),l=a.resized,p=a.padding,c=this.baseModel.predict(l),f=c.heatmapScores,d=c.offsets,h=c.displacementFwd,m=c.displacementBwd,[4,toTensorBuffers3D([f,d,h,m])];case 1:return g=N.sent(),_=g[0],I=g[1],v=g[2],y=g[3],[4,decodeMultiplePoses(_,I,v,y,r,n.maxDetections,n.scoreThreshold,n.nmsRadius)];case 2:return E=N.sent(),b=scaleAndFlipPoses(E,[s,u],o,p,n.flipHorizontal),f.dispose(),d.dispose(),h.dispose(),m.dispose(),l.dispose(),[2,b]}})})},e.prototype.estimateSinglePose=function(e,t){return void 0===t&&(t=SINGLE_PERSON_INFERENCE_CONFIG),__awaiter$1(this,void 0,void 0,function(){var n,r,o,i,s,u,a,l,p,c,f,d,h,m,g,_;return __generator$1(this,function(I){switch(I.label){case 0:return n=__assign$1({},SINGLE_PERSON_INFERENCE_CONFIG,t),r=this.baseModel.outputStride,o=this.inputResolution,i=getInputTensorDimensions(e),s=i[0],u=i[1],a=padAndResizeTo(e,o),l=a.resized,p=a.padding,c=this.baseModel.predict(l),f=c.heatmapScores,d=c.offsets,h=c.displacementFwd,m=c.displacementBwd,[4,decodeSinglePose(f,d,r)];case 1:return g=I.sent(),_=scaleAndFlipPoses([g],[s,u],o,p,n.flipHorizontal),f.dispose(),d.dispose(),h.dispose(),m.dispose(),l.dispose(),[2,_[0]]}})})},e.prototype.estimatePoses=function(e,t){return __awaiter$1(this,void 0,void 0,function(){return __generator$1(this,function(n){switch(n.label){case 0:return "single-person"!==t.decodingMethod?[3,2]:[4,this.estimateSinglePose(e,t)];case 1:return [2,[n.sent()]];case 2:return [2,this.estimateMultiplePoses(e,t)]}})})},e.prototype.dispose=function(){this.baseModel.dispose();},e}();function loadMobileNet(e){return __awaiter$1(this,void 0,void 0,function(){var t,n,r,o,i,s,u;return __generator$1(this,function(a){switch(a.label){case 0:if(t=e.outputStride,n=e.quantBytes,r=e.multiplier,null==tf$1)throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model.");return o=mobileNetCheckpoint(t,r,n),[4,loadGraphModel(e.modelUrl||o)];case 1:return i=a.sent(),s=new MobileNet(i,t),u=getValidInputResolutionDimensions(e.inputResolution,s.outputStride),[2,new PoseNet(s,u)]}})})}function loadResNet(e){return __awaiter$1(this,void 0,void 0,function(){var t,n,r,o,i,s;return __generator$1(this,function(u){switch(u.label){case 0:if(t=e.outputStride,n=e.quantBytes,null==tf$1)throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this\n        model.");return r=resNet50Checkpoint(t,n),[4,loadGraphModel(e.modelUrl||r)];case 1:return o=u.sent(),i=new ResNet(o,t),s=getValidInputResolutionDimensions(e.inputResolution,i.outputStride),[2,new PoseNet(i,s)]}})})}function load(e){return void 0===e&&(e=MOBILENET_V1_CONFIG),__awaiter$1(this,void 0,void 0,function(){return __generator$1(this,function(t){return "ResNet50"===(e=validateModelConfig(e)).architecture?[2,loadResNet(e)]:"MobileNetV1"===e.architecture?[2,loadMobileNet(e)]:[2,null]})})}

	var videoWidth = 640;
	var videoHeight = 480;

	function isMobile() {
	  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) return true;else return false;
	}

	console.log(isMobile());

	function initWebcam() {
	  var video, stream;
	  return regeneratorRuntime.async(function initWebcam$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          video = document.getElementById('video');
	          video.width = videoWidth;
	          video.height = videoHeight;
	          _context.next = 5;
	          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia({
	            'audio': false,
	            'video': {
	              facingMode: 'environment',
	              width: videoWidth,
	              height: videoHeight
	            }
	          }));

	        case 5:
	          stream = _context.sent;
	          video.srcObject = stream;
	          return _context.abrupt("return", new Promise(function (resolve) {
	            video.onloadedmetadata = function () {
	              resolve(video);
	            };
	          }));

	        case 8:
	        case "end":
	          return _context.stop();
	      }
	    }
	  });
	}

	function initVideo() {
	  var video;
	  return regeneratorRuntime.async(function initVideo$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          _context2.next = 2;
	          return regeneratorRuntime.awrap(initWebcam());

	        case 2:
	          video = _context2.sent;
	          video.play();
	          return _context2.abrupt("return", video);

	        case 5:
	        case "end":
	          return _context2.stop();
	      }
	    }
	  });
	}

	function detectPose(video, net) {
	  var pose;
	  return regeneratorRuntime.async(function detectPose$(_context3) {
	    while (1) {
	      switch (_context3.prev = _context3.next) {
	        case 0:
	          _context3.next = 2;
	          return regeneratorRuntime.awrap(net.estimateSinglePose(video, {
	            flipHorizontal: !isMobile()
	          }));

	        case 2:
	          pose = _context3.sent;
	          return _context3.abrupt("return", new Promise(function (resolve) {
	            var keypoints = pose.keypoints.slice(5, 13);
	            resolve(keypoints);
	          }));

	        case 4:
	        case "end":
	          return _context3.stop();
	      }
	    }
	  });
	}

	function drawPoints(points) {
	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext('2d');
	  ctx.save();
	  ctx.setTransform(1, 0, 0, 1, 0, 0);
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  ctx.restore();
	  points.forEach(function (point) {
	    ctx.beginPath();
	    ctx.arc(point.position.x, point.position.y, 5, 0, 2 * Math.PI);
	    ctx.fillStyle = 'aqua';
	    ctx.fill();
	  });
	}

	function init() {
	  var net, video;
	  return regeneratorRuntime.async(function init$(_context4) {
	    while (1) {
	      switch (_context4.prev = _context4.next) {
	        case 0:
	          _context4.next = 2;
	          return regeneratorRuntime.awrap(load({
	            architecture: 'ResNet50',
	            outputStride: 32,
	            inputResolution: {
	              width: 257,
	              height: 200
	            },
	            quantBytes: 2
	          }));

	        case 2:
	          net = _context4.sent;
	          _context4.next = 5;
	          return regeneratorRuntime.awrap(initVideo());

	        case 5:
	          video = _context4.sent;
	          setInterval(function () {
	            detectPose(video, net).then(function (poses) {
	              drawPoints(poses);
	            });
	          }, 250);

	        case 7:
	        case "end":
	          return _context4.stop();
	      }
	    }
	  });
	}

	init();

}());
//# sourceMappingURL=bundle.js.map
