/* global angular, document, window */
'use strict';

angular.module('studyAssistant.directives', [])
.directive('dhxScheduler', function() {
  return {
    restrict: 'A',
    scope: false,
    transclude: true,
    template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',

    link:function ($scope, $element, $attrs, $controller){
      //adjust size of a scheduler
      $scope.$watch(function() {
        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
      }, function() {
        scheduler.config.first_hour = 8;
        scheduler.config.last_hour = 18;
        scheduler.setCurrentView();
      });

      //styling for dhtmlx scheduler
      $element.addClass("dhx_scheduler");

      //init scheduler
      scheduler.init($element[0], new Date(), "week");
    }
  }
})