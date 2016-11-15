/**
 * Created by barte_000 on 2016-11-05.
 */
angular.module('LinkerSyncMonitor').controller('MainCtrl', function($scope){
    $scope.selectedMenuItem = 'dashboard';

    $scope.setDefaultFilter = function(visible){
        var filter = {
            isVisible: false,
            values: {
                processedAnyItem: "all",
                levels: [
                    {name: "INFO", checked: false},
                    {name: "WARNING", checked: false},
                    {name: "DEBUG", checked: false},
                    {name: "ERROR", checked: false},
                    {name: "FATAL", checked: false}
                ],
                ordering: {
                    descending: false,
                    value: "endedAt"
                },
                startedAt: null,
                endedAt: null
            }
        };
        if(visible)
            filter.isVisible = visible;

        $scope.filter = filter;
    };

    $scope.setDefaultFilter(false);

    $scope.toggleFilteringMenu = function(){
        $scope.filter.isVisible = !$scope.filter.isVisible;
    }
});