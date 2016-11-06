/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionInfoCtrl', function($scope, data, $mdDialog, $http){

    $scope.isLoading = true;
    $scope.logs = [];

    $http({
        url: '/api/getLogs/'+data,
        method: 'GET'
    }).then(function(results){
        $scope.isLoading = false;
        $scope.logs = results.data;
    }, function(error){
        $scope.isLoading = false;
        console.log(error);
    });

    $scope.close = function(){
        $mdDialog.hide();
    }
});