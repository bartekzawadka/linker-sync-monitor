/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionInfoCtrl', function($scope, data, $mdDialog, DataProvider){

    $scope.isLoading = true;
    $scope.logs = [];

    DataProvider.getLogs(data, function(result){
        if(result.error) {
            console.log(result.error);
            $scope.isLoading = false;
            return;
        }

        $scope.logs = result.data;
        $scope.isLoading = false;
    });

    $scope.close = function(){
        $mdDialog.hide();
    };

    $scope.getColoForItem = function(item){
        if(item.level == "ERROR" || item.level == "FATAL")
            return 'red';
        if(item.level == "INFO")
            return 'green';
        if(item.level == "WARNING")
            return 'orange';
        if(item.level == "DEBUG")
            return 'indigo';
        return 'blue-grey';
    };

    $scope.getColorForLevel = function(level){
        if(!level)
            return 'blue-grey';

        if(level == "ERROR" || level == "FATAL")
            return 'red';
        if(level == "INFO")
            return 'green';
        if(level == "WARNING")
            return 'orange';
        if(level == "DEBUG")
            return 'indigo';
        return 'blue-grey';
    };

    $scope.getIconForLevel = function(level){
        if(!level)
            return null;

        if(level == "ERROR")
            return 'error';
        if(level == "FATAL")
            return 'cancel';
        if(level == "INFO")
            return "done";
        if(level == "WARNING")
            return 'warning';
        if(level == "DEBUG")
            return 'build';
        return null;
    };
});