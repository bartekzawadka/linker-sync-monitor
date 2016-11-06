/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionsListCtrl', function($scope, $http){
    $scope.isLoading = true;
    $scope.sessions = [];

    $http({
        url: '/api/getSessions',
        method: 'GET'
    }).then(function(response){
        $scope.sessions = response.data;
        $scope.isLoading = false;
    }, function(e){
        console.log(e);
        $scope.isLoading = false;
    });

});