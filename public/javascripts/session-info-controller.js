/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionInfoCtrl', function($scope, data, $mdDialog, DataProvider, MappingService){

    $scope.isLoading = true;
    $scope.logs = [];

    DataProvider.getLogs(data, function(result){
        if(result.error) {
            console.log(result.error);
            $scope.isLoading = false;
            return;
        }

        $scope.logs = MappingService.addStatusInfo(result.data);
        $scope.isLoading = false;
    });

    $scope.close = function(){
        $mdDialog.hide();
    };
});