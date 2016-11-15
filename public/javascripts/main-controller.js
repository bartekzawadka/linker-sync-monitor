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
                    descending: true,
                    value: "endedAt"
                },
                startedAt: {
                    from: null,
                    to: null
                },
                endedAt: {
                    from: null,
                    to: null
                }
            }
        };
        if(visible)
            filter.isVisible = visible;

        $scope.filter = filter;
    };

    $scope.setDefaultFilter(false);

    $scope.toggleFilteringMenu = function(){
        $scope.filter.isVisible = !$scope.filter.isVisible;
    };

    var convertFilter = function(){
        var data = {
            filter: {},
            order: $scope.filter.values.ordering
        };

        if($scope.filter.values.processedAnyItem && $scope.filter.values.processedAnyItem != "all"){
            if($scope.filter.values.processedAnyItem == "yes")
                data.filter.hasProcessedItems = true;
            else
                data.filter.hasProcessedItems = false;
        }
        for(var k in $scope.filter.values.levels){
            if($scope.filter.values.levels.hasOwnProperty(k)){
                if($scope.filter.values.levels[k].checked){
                    if(!data.filter.levels)
                        data.filter.levels = [];
                    data.filter.levels.push($scope.filter.values.levels[k].name);
                }
            }
        }

        if($scope.filter.values.startedAt && ($scope.filter.values.startedAt.from || $scope.filter.values.startedAt.to))
            data.filter.startedAt = $scope.filter.values.startedAt;
        if($scope.filter.values.endedAt && ($scope.filter.values.endedAt.from || $scope.filter.values.endedAt.to))
            data.filter.endedAt = $scope.filter.values.endedAt;
        return data;
    };

    $scope.applyFilter = function(){
        var filter = convertFilter();
        $scope.$broadcast('filterUpdated', filter);
        $scope.filter.isVisible = false;
    }
});