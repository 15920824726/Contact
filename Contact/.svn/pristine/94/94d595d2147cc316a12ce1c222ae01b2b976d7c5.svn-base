(function (root) {
	'use strict';

	var units = {
		generateGUID: function () {
			var d = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
			});
			return uuid;
		},
		checkObjectLen: function (obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					size++;
				}
			}
			return size;
		},
		getRandomInt: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		//Get Query String
		getUrlQueryString: function (name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r) {
				return unescape(r[2]);//jshint ignore:line
			}
			return null;
		},
		getRandomNum: function (min, max) {
			var range = max - min;
			var rand = Math.random();
			return (min + Math.round(rand * range));
		},
		decimal: function (val, len, fillZero, addComma) {
			if (val || val === 0) {
				var num = parseFloat(val);
				if (isNaN(num)) {
					return null;
				}
				var lennum = Math.pow(10, len);
				num = Math.round(val * lennum) / lennum;
				if (fillZero) {
					var numStr = num.toString();
					var posDecimal = numStr.indexOf('.');
					if (posDecimal < 0) {
						posDecimal = numStr.length;
						numStr += '.';
					}
					//fixed 2 bit
					while (numStr.length <= posDecimal + 2) {
						numStr += '0';
					}
					return addComma ? this.formatNumberToAddComma(numStr, len, fillZero) : numStr;
				} else {
					return addComma ? this.formatNumberToAddComma(num, len, fillZero) : num;
				}
			}
			return addComma ? this.formatNumberToAddComma(val, len, fillZero) : val;
		},
		formatNumberToAddComma: function (val, len, fillZero) {
			if (val || val === 0) {
				len = len || 0;
				if (typeof val !== 'string') {
					val = val.toString();
				}
				val = val.replace(/\,/g, '');
				if (isNaN(val) || val === '') {
					return '';
				}
				var lennum = Math.pow(10, len);
				val = Math.round(val * lennum) / lennum;
				if (val < 0) {
					return '-' + this.outputdollars(Math.floor(Math.abs(val) - 0, +'')) + this.outputcents((Math.abs(val) - 0), len, fillZero);
				} else {
					return this.outputdollars(Math.floor(val - 0) + '') + this.outputcents((val - 0), len, fillZero);
				}
			} else {
				return val;
			}
		},

		outputdollars: function (number) {
			if (typeof number !== 'string') {
				number = number.toString();
			}
			if (number.length <= 3) {
				return (number === '' ? '0' : number);
			} else {
				var mod = number.length % 3;
				var output = (mod === 0 ? '' : (number.substring(0, mod)));
				for (var i = 0; i < Math.floor(number.length / 3); i++) {
					if ((mod === 0) && (i === 0)) {
						output += number.substring(mod + 3 * i, mod + 3 * i + 3);
					} else {
						output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
					}
				}
				return output;
			}
		},

		outputcents: function (amount, len, fillZero) {
			len = len || 0;
			if (len === 0) {
				return '';
			}
			var lennum = Math.pow(10, len);
			var amountStr;
			if (fillZero) {
				var num = parseFloat(amount);
				if (isNaN(num)) {
					return null;
				}
				num = Math.round(amount * lennum) / lennum;
				var numStr = num.toString();
				var posDecimal = numStr.indexOf('.');
				if (posDecimal < 0) {
					posDecimal = numStr.length;
					numStr += '.';
				}
				while (numStr.length <= posDecimal + len) {
					numStr += '0';
				}
				if (numStr.indexOf('.') >= 0) {
					amount = numStr.split('.')[1];
				}
				return '.' + amount;
			}
			else {
				amountStr = amount.toString();
				if (amountStr.indexOf('.') >= 0) {
					amount = amountStr.split('.')[1];
				}
				return '.' + amount;
			}
		},

		desc: function (x, y) {
			return x > y ? -1 : 1;
		},
		asc: function (x, y) {
			return x > y ? 1 : -1;
		},
		uniqueArr: function (data) {
			return (data || []).filter(function (item, index) {
				return data.indexOf(item) === index;
			});
		},
		isObject: function (value) {
			return value !== null && typeof value === 'object';
		},
		isBlankObject: function (value) {
			return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
		},
		getSessionStorage: function (key) {
			return JSON.parse(sessionStorage.getItem(key));
		},
		setSessionStorage: function (key, value) {
			sessionStorage.setItem(key, JSON.stringify(value));
		},
		getLocalStorage: function (key) {
			return JSON.parse(localStorage.getItem(key));
		},
		setLocalStorage: function (key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		stopTouchMoveDefaultEvent: function () {
			document.addEventListener('touchmove', function (e) {
				e.preventDefault();
			}, false);
		}
	};

	root.utils = units;


}(window));