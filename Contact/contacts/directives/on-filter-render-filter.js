/**
 * Created by yar on 8/3/2016.
 */
(function(angular){

    'use strict';

    angular.module('App.contacts').directive('onFilterRenderFilter',
        ['$timeout',function ($timeout) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        if(scope.$last === true){
                            $timeout(function(){
                                scope.$emit('ngRepeatFinished');
                            })
                        }
                    }
                };
            }]);
})(angular);