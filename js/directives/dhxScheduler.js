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
     //default state of the scheduler
       if (!$scope.scheduler)
         $scope.scheduler = {};
         $scope.scheduler.mode = $scope.scheduler.mode || "week";
         $scope.scheduler.date = $scope.scheduler.date || new Date();
         //watch data collection, reload on changes
           $scope.$watch($attrs.data, function(collection){
             $scope.modified = true;
             scheduler.clearAll();
             scheduler.parse(collection, "json");
           }, true);

           //watch mode and date
           $scope.$watch(function(){
             return $scope.scheduler.mode + $scope.scheduler.date.toString();
           }, function(nv, ov) {
             var mode = scheduler.getState();
             if (nv.date != mode.date || nv.mode != mode.mode)
               scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
           }, true);

           //size of scheduler
           $scope.$watch(function() {
             return $element[0].offsetWidth + "." + $element[0].offsetHeight;
           }, function() {
             scheduler.setCurrentView();
           });


      //styling for dhtmlx scheduler
      $element.addClass("dhx_scheduler");

      //init scheduler
      scheduler.init($element[0], new Date(), "week");
      scheduler.config.first_hour = 8;
    }
  }
})