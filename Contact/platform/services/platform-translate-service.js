/*
 * $Id$
 * Copyright (c) RIB Software AG
 */

(function (angular) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name platform:platformTranslateService
	 * @function
	 * @requires $q, $translate, $translatePartialLoader, $rootScope
	 * @description
	 * platformTranslateService provides translation support with loading parts by using $translatePartialLoader automatically.
	 * Additionally translation of objects containing tagged values is supported (like grid and form configuration)
	 */
	angular.module('platform').factory('platformTranslateService', platformTranslateService);

	platformTranslateService.$inject = ['$q', '$translate', '$translatePartialLoader', '$rootScope', 'PlatformMessenger'];

	function platformTranslateService($q, $translate, $translatePartialLoader, $rootScope, PlatformMessenger) {
		var defaultTag = '$tr$';
		var defaultParamTag = defaultTag + 'param$';

		/**
		 * @ngdoc function
		 * @name setObject
		 * @function
		 * @methodOf platform:platformTranslateService
		 * @description converts a dotted key string to an object structure and assigns value
		 * @param {string} name dotted key (cloud.desktop.testData)
		 * @param {string} value value
		 * @param {object} context object where properties will be added
		 * @returns {object}
		 */
		var setObject = function setObject(name, value, context) {
			var parts = name.split('.');
			var p = parts.pop();

			for (var i = 0, j; context && (j = parts[i]); i++) {
				context = (j in context ? context[j] : context[j] = {});
			}

			return context && p ? (context[p] = value) : undefined; // Object
		};

		// broadcast is triggered by angular-translate when reloading translation tables
		$rootScope.$on('$translateChangeEnd', function () {
			service.translationChanged.fire();
		});

		function translateTaggedProperty(item, propName, options) {
			if (angular.isArray(propName)) {
				_.each(propName, function (prop) {
					translateTaggedProperty(item, prop, options);
				});
			} else {
				var propTagName = propName + defaultTag;

				if (item.hasOwnProperty(propTagName)) {
					var id = item[propTagName];
					var value = $translate.instant(id, item[propName + defaultParamTag]);

					if (id !== value) {
						item[propName] = value;
					} else {
						if (options && !_.isUndefined(options.notFound)) {
							if (_.isFunction(options.notFound)) {
								options.notFound(id);
							} else {
								options.notFound = true;
							}
						}
					}
				}
			}
		}

		var service = {
			/**
			 * @ngdoc function
			 * @name registerModule
			 * @function
			 * @methodOf platform:platformTranslateService
			 * @description registers a module to be loaded into translation tables
			 * @param module {string|array} module(s) which translations should be loaded
			 * @param promise [boolean] returns promise
			 * @returns {boolean|promise} true when translation table will be updated
			 */
			registerModule: function registerModule(module, promise) {
				var dirty = false;

				if (angular.isString(module) && !$translatePartialLoader.isPartAvailable(module)) {
					$translatePartialLoader.addPart(module);
					dirty = true;
				} else if (angular.isArray(module)) {
					_.each(module, function (part) {
						if (!$translatePartialLoader.isPartAvailable(part)) {
							$translatePartialLoader.addPart(part);
							dirty = true;
						}
					});
				}

				var deferred = dirty ? this.updateTranslation() : $q.when(dirty);

				return promise ? deferred : dirty;
			},

			/**
			 * @ngdoc function
			 * @name updateTranslation
			 * @function
			 * @methodOf platform:platformTranslateService
			 * @description forces an update of existing translation tables
			 */
			updateTranslation: function updateTranslation() {
				return $translate.refresh()
					.then(function () {
						service.translationChanged.fire();

						return true;
					});
			},

			/**
			 * @ngdoc function
			 * @name translate
			 * @function
			 * @methodOf platform:platformTranslateService
			 * @description translates id(s) from translation table
			 * @param id {string|array|object} A token which represents a translation id. This can be optionally an array of translation ids which
			 *                              results that the function returns an object where each key is the translation id and the value the translation.
			 * @param asObject {boolean=} when true, dotted keys will be converted to an object
			 * @param interpolateParams {object=} An object hash for dynamic values
			 * @returns {promise} translated ids
			 */
			translate: function translate(id, asObject, interpolateParams) {
				var deferred = $q.defer();
				var ids = [];

				// check if translate(id, interpolationParams) is called
				if (angular.isObject(asObject)) {
					interpolateParams = asObject;
					asObject = angular.isObject(id);
				}

				if (angular.isObject(id)) {
					// always convert back to object
					asObject = true;

					// convert object to an array of dotted strings
					if (angular.isObject(id)) {
						_.each(Object.getOwnPropertyNames(id), function (item) {
							_.each(id[item], function (key) {
								ids.push(item + '.' + key);
							});
						});
					}
				} else {
					ids = id;
				}

				$translate(ids, interpolateParams)
					.then(function (values) {
						// convert translated ids back to an object
						if (!asObject) {
							deferred.resolve(values);
						} else {
							var converted = {};

							if (angular.isObject(values)) {
								_.each(Object.getOwnPropertyNames(values), function (item) {
									setObject(item, values[item], converted);
								});
							} else {
								setObject(id, values, converted);
							}

							deferred.resolve(converted);
						}
					}, deferred.reject);

				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name instant
			 * @function
			 * @methodOf platform:platformTranslateService
			 * @description instantly translates id(s) from translation table
			 * @param id {object|array|string} A token which represents a translation id.
			 * @param interpolateParams [object=] An object hash for placeholder values
			 * @param noConvert [boolean] don't convert ids to object-hash
			 * @returns {object} translated ids
			 */
			instant: function instant(id, interpolateParams, noConvert) {
				var ids = [];

				if (angular.isObject(id)) {
					_.each(Object.getOwnPropertyNames(id), function (item) {
						_.each(id[item], function (key) {
							ids.push(item + '.' + key);
						});
					});
				} else {
					ids = id;
				}

				var translated = $translate.instant(ids, interpolateParams);
				var converted = {};

				if (angular.isObject(translated)) {
					_.each(Object.getOwnPropertyNames(translated), function (item) {
						setObject(item, translated[item], converted);
					});
				} else if (noConvert) {
					converted = translated;
				}
				else {
					setObject(id, translated, converted);
				}

				return converted;
			},

			/**
			 * @ngdoc function
			 * @name translateTileGroupConfig
			 * @function
			 * @methodOf platform:platformTranslateService
			 * @description instantly translates desktop groups/tiles definition
			 * @param {object} config desktop groups/tiles definition
			 * @returns {object} translated desktop groups/tiles definition
			 */
			translateTileGroupConfig: function translateTileGroupConfig(config) {
				_.each(config, function (group) {
					translateTaggedProperty(group, 'TileGroupName');

					if (angular.isArray(group.tiles)) {
						_.each(group.tiles, function (item) {
							translateTaggedProperty(item, ['DisplayName', 'Description']);
						});
					}
				});

				return config;
			},

			/**
			 * @ngdoc function
			 * @name translateFormConfig
			 * @function
			 * @methodOf platform:platformTranslateService
			 * @description instantly translates form configuration
			 * @param {object} config form configuration to be translated
			 * @returns {object} translated form configuration
			 */
			translateFormConfig: function translateFormConfig(config) {
				if (angular.isArray(config.groups)) {
					_.each(config.groups, function (item) {
						translateTaggedProperty(item, 'header');
					});
				}

				if (angular.isArray(config.rows)) {
					_.each(config.rows, function (item) {
						translateTaggedProperty(item, 'label');

						if (item.hasOwnProperty('options')) {
							service.translateObject(item.options, 'label');
						}
					});
				}

				return config;
			},

			/**
			 * @ngdoc function
			 * @name translateFormContainerOptions
			 * @function
			 * @methodOf platform:platformTranslateService
			 * @description instantly translates form configuration
			 * @param {object} config form container options to be translated
			 * @returns {object} translated form container options
			 */
			translateFormContainerOptions: function translateFormContainerOptions(config) {
				translateTaggedProperty(config, 'title');
				this.translateFormConfig(config.formOptions.configure);

				return config;
			},

			/**
			 * @ngdoc function
			 * @name translateGridConfig
			 * @function instantly translates grid configuration
			 * @methodOf platform:platformTranslateService
			 * @description instantly translates grid configuration
			 * [
			 *   { id: 'code', field: 'Code', name: 'Code', name$tr$: 'cloud.boq.gridColumnCodeText', width: 120, toolTip: 'Unique code field', toolTip$tr$: 'cloud.boq.gridColumnCodeTooltip' },
			 *   { id: 'desc', field: 'Description', name: 'Description', name$tr$: 'cloud.boq.gridColumnDescriptionText', editor: Slick.Editors.LongText, width: 250 },
			 *   { id: 'tot', field: 'Total', name: 'Total', name$tr$: 'cloud.boq.gridColumnTotalText', formatter: folderTotalFormatter, width: 100 }
			 * ]
			 * @param config {object|array} [array of] grid configuration to be translated
			 * @returns {object} translated grid configuration
			 */
			translateGridConfig: function translateGridConfig(config) {
				var tokens = ['name', 'toolTip', 'footerText'];

				if (angular.isArray(config)) {
					_.each(config, function (item) {
						translateTaggedProperty(item, tokens);
					});
				} else {
					translateTaggedProperty(config, tokens);
				}

				return config;
			},

			/**
			 * @ngdoc function
			 * @name translateObject
			 * @function instantly translates an object (recursively)
			 * @methodOf platform:platformTranslateService
			 * @description instantly translates an object (recursively)
			 * @param obj {object|array} [array of] objects to be translated
			 * @param tokens {string[]} tokens, can be null|undefined
			 * @param options [object] additional options
			 * @returns {object} translated grid configuration
			 */
			translateObject: function translateObject(obj, tokens, options) {
				if (angular.isArray(obj)) {
					_.each(obj, function (item) {
						translateObject(item, tokens, options);
					});
				} else {
					if (angular.isObject(obj)) {
						var localTokens = tokens ? tokens : [];

						_.each(Object.getOwnPropertyNames(obj), function (prop) {
							if (angular.isArray(obj[prop]) || angular.isObject(obj[prop])) {
								translateObject(obj[prop], tokens, options);
							} else {
								if (!tokens) {
									var index = prop.indexOf(defaultTag);

									if (index !== -1) {
										localTokens.push(prop.substring(0, index));
									}
								}
							}
						});

						translateTaggedProperty(obj, localTokens, options);
					}
				}

				return obj;
			},

			translationChanged: new PlatformMessenger()
		};

		return service;
	}
})(angular);

