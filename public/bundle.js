(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Webcam =
  /*#__PURE__*/
  function () {
    function Webcam(_ref) {
      var video = _ref.video,
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? 640 : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? 480 : _ref$height,
          _ref$autostart = _ref.autostart,
          autostart = _ref$autostart === void 0 ? true : _ref$autostart;

      _classCallCheck(this, Webcam);

      this.video = video;
      this.video.width = width;
      this.video.height = height;
      this.autostart = autostart;
    }

    _createClass(Webcam, [{
      key: "init",
      value: function init() {
        var _this = this;

        var stream;
        return regeneratorRuntime.async(function init$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia({
                  'audio': false,
                  'video': {
                    facingMode: 'environment',
                    width: this.video.width,
                    height: this.video.height
                  }
                }));

              case 2:
                stream = _context.sent;
                this.video.srcObject = stream;
                return _context.abrupt("return", new Promise(function (resolve) {
                  _this.video.onloadedmetadata = function () {
                    if (_this.autostart) _this.video.play();
                    resolve();
                  };
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, null, this);
      }
    }]);

    return Webcam;
  }();

  var TrunkDetector =
  /*#__PURE__*/
  function () {
    function TrunkDetector(_ref) {
      var _this = this;

      var video = _ref.video,
          _ref$callback = _ref.callback,
          callback = _ref$callback === void 0 ? null : _ref$callback,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {
        architecture: 'MobileNetV1',
        imageScaleFactor: 0.3,
        outputStride: 16,
        inputResolution: 193,
        flipHorizontal: false,
        minConfidence: 0.5,
        maxPoseDetections: 5,
        scoreThreshold: 0.5,
        nmsRadius: 20,
        detectionType: 'single',
        multiplier: 0.75,
        quantBytes: 2
      } : _ref$options;

      _classCallCheck(this, TrunkDetector);

      this.video = video;
      this.callback = callback;
      this.options = options;
      this.net = ml5.poseNet(this.video, this.options, function () {
        return _this.ready();
      });
    }

    _createClass(TrunkDetector, [{
      key: "onDetect",
      value: function onDetect(callback) {
        this.callback = callback;
      }
    }, {
      key: "ready",
      value: function ready() {
        var _this2 = this;

        this.net.on("pose", function (res) {
          return _this2.detected(res[0]);
        });
      }
    }, {
      key: "calcAnchor",
      value: function calcAnchor(pose) {
        var x = [pose.leftShoulder.x, pose.rightShoulder.x, pose.leftHip.x, pose.rightHip.x];
        var y = [pose.leftShoulder.y, pose.rightShoulder.y, pose.leftHip.y, pose.rightHip.y];
        return {
          x: pose.nose.x,
          y: (pose.nose.y + Math.min.apply(Math, y)) / 2
        };
      }
    }, {
      key: "detected",
      value: function detected(estimation) {
        if (estimation && this.callback) {
          var anchor = this.calcAnchor(estimation.pose);
          this.callback(anchor);
        }
      }
    }]);

    return TrunkDetector;
  }();

  var Canvas =
  /*#__PURE__*/
  function () {
    function Canvas(id, video, width, height) {
      _classCallCheck(this, Canvas);

      this.elem = document.getElementById(id);
      this.video = video;
      this.elem.width = width;
      this.elem.height = height;
      this.context = this.elem.getContext('2d');
      this.anchor = null;

      this.__loop();
    }

    _createClass(Canvas, [{
      key: "__loop",
      value: function __loop() {
        var _this = this;

        this.context.drawImage(this.video, 0, 0, this.elem.width, this.elem.height);
        if (this.anchor) this.__drawImage(this.anchor);
        window.requestAnimationFrame(function () {
          return _this.__loop();
        });
      }
    }, {
      key: "__drawArea",
      value: function __drawArea(_ref) {
        var x = _ref.x,
            y = _ref.y,
            w = _ref.w,
            h = _ref.h;
        this.context.beginPath();
        this.context.lineWidth = 10;
        this.context.strokeStyle = '#00ff04';
        this.context.rect(x, y, w, h);
        this.context.stroke();
      }
    }, {
      key: "__drawPoint",
      value: function __drawPoint(_ref2) {
        var x = _ref2.x,
            y = _ref2.y,
            _ref2$color = _ref2.color,
            color = _ref2$color === void 0 ? '#00ff04' : _ref2$color;
        this.context.beginPath();
        this.context.arc(x, y, 10, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
      }
    }, {
      key: "__drawImage",
      value: function __drawImage(_ref3) {
        var img = _ref3.img,
            x = _ref3.x,
            y = _ref3.y,
            w = _ref3.w,
            h = _ref3.h;
        this.context.drawImage(img, x, y, w, h);
      }
    }]);

    return Canvas;
  }();

  var Models = {
    BLACK: {
      img: './assets/black.png',
      name: 'A0129 GORE-TEX PACLITE® PRODUCT TECHNOLOGY WITH PRIMALOFT® INSULATION',
      prize: 799.00,
      url: 'https://www.stoneisland.com/es/stone-island/blazer_cod41890405tb.html'
    },
    RED: {
      img: './assets/red.png',
      name: '43031 DAVID LIGHT-TC WITH MICROPILE',
      prize: 660.00,
      url: 'https://www.stoneisland.com/es/stone-island/cazadora_cod41890734ur.html'
    },
    BROWN: {
      img: './assets/brown.png',
      name: '70631 DAVID LIGHT-TC WITH MICROPILE',
      prize: 799.00,
      url: 'https://www.stoneisland.com/es/stone-island/chaqueton_cod41890540lb.html'
    }
  };
  var Sizes = {
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL'
  };

  var Jacket =
  /*#__PURE__*/
  function () {
    function Jacket(model, size, onLoad) {
      _classCallCheck(this, Jacket);

      this.__current = model;
      this.__size = size;
      this.__base = {
        width: 300,
        height: 483
      };
      this.__callback = onLoad;

      this.__init();
    }

    _createClass(Jacket, [{
      key: "__init",
      value: function __init() {
        var _this = this;

        this.__image = new Image();

        this.__image.onload = function () {
          return _this.__callback(_this);
        };

        this.__image.src = this.__current.img;
        this.__image.width = this.size.width;
        this.__image.height = this.size.height;
      }
    }, {
      key: "img",
      value: function img() {
        return this.__image;
      }
    }, {
      key: "size",
      value: function size() {
        switch (this.__size) {
          case Sizes.S:
            return {
              width: this.__base.width - 60,
              height: this.__base.height - 60
            };

          case Sizes.M:
            return {
              width: this.__base.width - 40,
              height: this.__base.height - 40
            };

          case Sizes.L:
            return {
              width: this.__base.width - 20,
              height: this.__base.height - 20
            };

          default:
            return this.__base;
        }
      }
    }, {
      key: "offset",
      value: function offset() {
        var size = this.size();
        return {
          x: -size.width / 2,
          y: 0
        };
      }
    }]);

    return Jacket;
  }();

  var ARApp =
  /*#__PURE__*/
  function () {
    function ARApp(video, width, height) {
      _classCallCheck(this, ARApp);

      this.video = video;
      this.webcam = new Webcam({
        video: this.video,
        width: width,
        height: height
      });
      this.webcam.init();
      this.detector = new TrunkDetector({
        video: this.video
      });
      this.canvas = new Canvas('camera', this.video, width, height);
      this.__current = {
        model: null,
        size: Sizes.M
      };
    }

    _createClass(ARApp, [{
      key: "start",
      value: function start() {
        var _this = this;

        this.detector.onDetect(function (anchor) {
          if (_this.__current.model) {
            new Jacket(_this.__current.model, _this.__current.size, function (jacket) {
              var offset = jacket.offset();
              _this.canvas.anchor = {
                img: jacket.img(),
                x: anchor.x + offset.x,
                y: anchor.y + offset.y,
                w: jacket.size().width,
                h: jacket.size().height
              };
            });
          }
        });
      }
    }, {
      key: "jacket",
      value: function jacket(model) {
        switch (model) {
          case "black":
            this.__current.model = Models.BLACK;
            break;

          case "red":
            this.__current.model = Models.RED;
            break;

          case "brown":
            this.__current.model = Models.BROWN;
            break;
        }
      }
    }, {
      key: "size",
      value: function size(_size) {
        if (Object.values(Sizes).includes(_size)) this.__current.size = _size;
      }
    }]);

    return ARApp;
  }();

  var UI =
  /*#__PURE__*/
  function () {
    function UI() {
      _classCallCheck(this, UI);

      this.__callbackJacket = null;
      this.__callbackSize = null;
      this.__videoElem = document.getElementById('video');
      this.__jacketElemList = document.querySelectorAll('.jacket');
      this.__currentJacketElem = document.getElementById('current-jacket');
      this.__purchaseLinkElem = document.getElementById('purchase-link');
      this.__sizesElemList = document.querySelectorAll('.size-selector');

      this.__listeners();
    }

    _createClass(UI, [{
      key: "onSelectJacket",
      value: function onSelectJacket(callback) {
        this.__callbackJacket = callback;
      }
    }, {
      key: "onSelectSize",
      value: function onSelectSize(callback) {
        this.__callbackSize = callback;
      }
    }, {
      key: "__listeners",
      value: function __listeners() {
        var _this = this;

        this.__jacketElemList.forEach(function (jacket) {
          jacket.addEventListener('click', function () {
            return _this.__jacketSelected(jacket);
          });
        });

        this.__sizesElemList.forEach(function (size) {
          size.addEventListener('click', function () {
            return _this.__sizeSelected(size);
          });
        });
      }
    }, {
      key: "__jacketSelected",
      value: function __jacketSelected(jacket) {
        this.__jacketElemList.forEach(function (it) {
          return it.classList.remove('selected');
        });

        jacket.classList.add('selected');

        if (this.__callbackJacket) {
          var model = jacket.getAttribute('data-model');
          var url = jacket.getAttribute('data-url');

          this.__currentJacketElem.classList.add('show');

          this.__purchaseLinkElem.setAttribute('href', url);

          this.__callbackJacket(model);
        }
      }
    }, {
      key: "__sizeSelected",
      value: function __sizeSelected(size) {
        this.__sizesElemList.forEach(function (it) {
          return it.classList.remove('current');
        });

        size.classList.add('current');
        if (this.__callbackSize) this.__callbackSize(size.getAttribute('data-value'));
      }
    }, {
      key: "video",
      get: function get() {
        return this.__videoElem;
      }
    }]);

    return UI;
  }();

  var ui = new UI();
  var app = new ARApp(ui.video, 1024, 768);
  ui.onSelectJacket(function (model) {
    app.jacket(model);
  });
  ui.onSelectSize(function (size) {
    app.size(size);
  });
  app.start();

}());
//# sourceMappingURL=bundle.js.map
