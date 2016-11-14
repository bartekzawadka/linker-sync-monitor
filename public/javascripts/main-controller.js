/**
 * Created by barte_000 on 2016-11-05.
 */
angular.module('LinkerSyncMonitor').controller('MainCtrl', function($scope){
    $scope.selectedMenuItem = 'dashboard';
    $scope.currentLevel = null;
    $scope.processedAnyItem = false;
    $scope.descending = false;
    $scope.orderDate = "endedAt";
    $scope.levels = [
        {name: "INFO", checked: false},
        {name: "WARNING", checked: false},
        {name: "DEBUG", checked: false},
        {name: "ERROR", checked: false},
        {name: "FATAL", checked: false}
    ];

    $scope.isFilteringVisible = false;

    $scope.toggleFilteringMenu = function(){
        $scope.isFilteringVisible = !$scope.isFilteringVisible;
    }
});