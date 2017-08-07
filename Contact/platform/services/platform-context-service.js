/*
 * Created by hot on 2016-6-15.
 * Copyright (c) RIB Software AG
 */

/**
 * @ngdoc service
 * @name platform:platformContextService
 * @function
 * @requires $http
 *
 * @description platformContextService provides access to system and application contexts
 */
angular.module('platform').factory('platformContextService', ['$http', '$translate', '_', 'moment', '$rootScope',
  function ($http, $translate, _, moment, $rootScope) {
    'use strict';

    var service;
    var sysContext = {};

    var defaultLanguage = 'en';
    var defaultCulture = 'en-gb';
    var defaultSysContext = {
      language: null,
      culture: null,
      dataLanguageId:1,
      signedInClientId:0,
      clientId:0,
      permissionClientId:0,
      permissionRoleId:0,
      companyCode:null
    };

    var appContext = {};

    function getStorageKey(userId) {
      //var theId = userId ? userId : servicesLoginService.getCurrentUserInfo().UserId;
      return globals.appBaseUrl + '-ctx';
    }

    /**
     * @ngdoc function
     * @name updateHttpClientContextHeader
     * @function
     * @methodOf platform:platformContextService
     * @description updates the content of http header with current state of sysContext
     */
    var updateHttpClientContextHeader = function updateHttpClientContextHeader() {
      $http.defaults.headers.common['Client-Context'] = angular.toJson(sysContext);
    };

    service = {
      /**
       * @ngdoc function
       * @name initialize
       * @function
       * @methodOf platform:platformContextService
       * @description initializes context service
       */
      initialize: function initialize() {
        angular.extend(sysContext, defaultSysContext);
        //from app setting
        var selectlanguageId=utils.getUrlQueryString('languageId');
        if(selectlanguageId){
          defaultLanguage = selectlanguageId;
          globalLanguages.forEach(function(item){
            if(item.language==selectlanguageId){
              globals.saveLanguageInfo2Storage(item);
            }
          });
        }
        var langOpt = globals.readLastLanguageFromStorage();
        this.setLanguage(langOpt && langOpt.language ? langOpt.language : defaultLanguage);
        this.setCulture(langOpt && langOpt.culture ? langOpt.culture : defaultCulture);

        moment.locale(sysContext.culture);

        // rei: 02.12.14 patch german localization of LT to the format we accept with [Uhr]
        moment.localeData('de')._longDateFormat.LT = 'HH:mm';
      },

      /**
       * @ngdoc function
       * @name setLanguage
       * @function
       * @methodOf platform:platformContextService
       * @description set currently used language
       * @param language {string} ISO language for UI text
       */
      setLanguage: function setLanguage(language) {
        if (language !== sysContext.language) {
          sysContext.language = language;
          //service.setDataLanguageId(language);
          $translate.use(language);

          this.contextChanged.fire('language');
        }
      },
      /**
       * @ngdoc event
       * @name contextChanged
       * @methodOf platform:platformContextService
       * @description Messenger that fires events when a property of the system context has been changed
       */
      contextChanged: new Platform.Messenger(),
      /**
       * @ngdoc function
       * @name getLanguage
       * @function
       * @methodOf platform:platformContextService
       * @description gets currently selected language
       * @returns {string} current language
       */
      getLanguage: function getLanguage() {
        return sysContext.language;
      },

      /**
       * @ngdoc function
       * @name getLanguage
       * @function
       * @methodOf platform:platformContextService
       * @description gets currently selected language
       * @returns {string} current language
       */
      getDefaultLanguage: function getDefaultLanguage() {
        return defaultLanguage;
      },

      /**
       * @ngdoc function
       * @name setCulture
       * @function
       * @methodOf platform:platformContextService
       * @description sets ISO code used to format Currency/Date/Datetime etc
       * @param newCulture {string} ISO code for Currency/Date/Datetime etc
       * @returns {string} culture ISO code
       */
      culture: function culture(newCulture) {
        if (newCulture && newCulture !== sysContext.culture) {
          sysContext.culture = newCulture;

          if (angular.isDefined(moment)) {
            moment.locale(sysContext.culture);
          }

          this.contextChanged.fire('culture');
        }

        return sysContext.culture;
      },

      /**
       * @ngdoc function
       * @name setCulture
       * @function
       * @methodOf platform:platformContextService
       * @description sets ISO code used to format Currency/Date/Datetime etc
       * @param newCulture {string} ISO code for Currency/Date/Datetime etc
       * @returns {string} culture ISO code
       */
      setCulture: function setCulture(newCulture) {
        return this.culture(newCulture);
      },

      /**
       * @ngdoc function
       * @name getCulture
       * @function
       * @methodOf platform:platformContextService
       * @description gets ISO code used to format Currency/Date/Datetime etc
       * @returns {string} culture ISO code
       */
      getCulture: function getCulture() {
        return this.culture();
      },

      /**
       * @ngdoc function
       * @name setDataLanguageId
       * @function
       * @methodOf platform:platformContextService
       * @description sets the language id of database language to be used in service operations
       * @param id {int} new language id
       */
      setDataLanguageId: function setDataLanguageId(id) {
        if (id !== sysContext.dataLanguageId) {
          sysContext.dataLanguageId = id;
          this.contextChanged.fire('dataLanguageId');
        }
      },

      /**
       * @ngdoc function
       * @name getDataLanguageId
       * @function
       * @methodOf platform:platformContextService
       * @description gets language id of database language currently used in service operations
       * @returns {int} language id
       */
      getDataLanguageId: function getDataLanguageId() {
        return sysContext.dataLanguageId;
      },
      /**
       * @ngdoc function
       * @name setCompanyConfiguration
       * @function
       * @methodOf platform:platformContextService
       * @description sets company and permission configuration
       * @param signedInClientId {int} id of signedin company
       * @param companyId {int} id of company
       * @param permissionCompanyId {int} id of company where the permissions are defined
       * @param permissionRoleId (int) id of role to be used
       */
      setCompanyConfiguration: function setCompanyConfiguration(signedInClientId, companyId, permissionCompanyId, permissionRoleId,companyCode) {
        //debugger;
        var changed = false;

        if (signedInClientId !== sysContext.signedInClientId) {
          sysContext.signedInClientId = signedInClientId;
          changed = true;
        }

        if (companyId !== sysContext.clientId) {
          sysContext.clientId = companyId;
          changed = true;
        }

        if (permissionCompanyId !== sysContext.permissionClientId) {
          sysContext.permissionClientId = permissionCompanyId;
          changed = true;
        }

        if (permissionRoleId !== sysContext.permissionRoleId) {
          sysContext.permissionRoleId = permissionRoleId;
          changed = true;
        }

        if (companyCode !== sysContext.companyCode) {
          sysContext.companyCode = companyCode;
          changed = true;
        }

        if (changed) {
          updateHttpClientContextHeader();
          this.contextChanged.fire('companyConfiguration');
        }
      },
      /**
       * @ngdoc function
       * @name getContext
       * @function
       * @methodOf platform:platformContextService
       * @description gets a copy of currently used context
       * @returns {object} cloned content of internal state
       */
      getContext: function getContext() {
        return _.clone(sysContext);
      },
      updateHttpClientContextHeader:function updateHttpClientContextHeader(){
        $http.defaults.headers.common['Client-Context'] = angular.toJson(sysContext);
      },
      /**
       * @ngdoc function
       * @name setContext
       * @function
       * @methodOf platform:platformContextService
       * @description sets a new configuration
       * @param {object} context containing new configuration to be used
       */
      setContext: function setContext(context) {
        angular.extend(sysContext, context);
        $rootScope.language = language;
        this.contextChanged.fire('context');
      },



      /**
       * @ngdoc function
       * @name removeApplicationValue
       * @function
       * @methodOf platform:platformContextService
       * @description removes an application defined value
       * @param key {string} name of property to retrieve
       * @returns {*} true if there was an item , false if not found
       */
      removeApplicationValue: function removeApplicationValue(key) {
        if (angular.isString(key) && appContext.hasOwnProperty(key)) {
          delete appContext[key];
          return true;
        }
        return false;
      },

      /**
       * @ngdoc function
       * @name getApplicationValue
       * @function
       * @methodOf platform:platformContextService
       * @description gets an application defined value
       * @param key {string} name of property to retrieve
       * @returns {*} value of key or null
       */
      getApplicationValue: function getApplicationValue(key) {
        if (angular.isString(key) && appContext.hasOwnProperty(key)) {
          return appContext[key].val;
        }
        return null;
      },

      /**
       * @ngdoc function
       * @name setApplicationValue
       * @function
       * @methodOf platform:platformContextService
       * @description sets an application defined value
       * @param key {string} key name of property to be inserted or updated
       * @param {*} value application defined data
       * @param {bool} doPersist, save data into storage
       */
      setApplicationValue: function setApplicationValue(key, value, doPersist) {
        if (angular.isString(key)) {
          if (angular.isUndefined(value)) {
            value = null;
          }
          if (!appContext[key] || appContext[key].val !== value) {
            appContext[key] = {val: value, persist: doPersist};
            this.applicationValueChanged.fire(key);
          }
        }
      },

      /*
       only save current language to local storage
       */
      saveLanguageInfo2Storage: function () {
        globals.saveLanguageInfo2Storage({language: this.getLanguage(), culture: this.getCulture()});
      },

      /**
       * @ngdoc function
       * @name readContextFromLocalStorage
       * @function
       * @methodOf platform:platformContextService
       * @description reads the context from local storage
       * @param key {string} key name of property to be inserted or updated
       * @param {*} value application defined data
       */
      readContextFromLocalStorage: function (userId) {
        // Retrieve the object from storage
        var key = getStorageKey(userId);
        var defaultUserDataLanguage ='en';

        var mySysContext;
        var myAppContext;

        var savedContext = localStorage.getItem(key);
        if (savedContext != null && savedContext !== 'undefined') {
          var myContext = JSON.parse(savedContext);
          mySysContext = myContext.sysContext;
          myAppContext = myContext.appContext;
        }
        if (mySysContext) {
          this.setCompanyConfiguration(mySysContext.signedInClientId, mySysContext.clientId, mySysContext.permissionClientId, mySysContext.permissionRoleId,mySysContext.companyCode);
          this.setDataLanguageId(mySysContext.dataLanguageId);
        } else {
          this.setDataLanguageId(defaultUserDataLanguage);
        }
        if (myAppContext) {
          angular.extend(appContext, myAppContext);
        }
      }

    };

    return service;
  }
]);
