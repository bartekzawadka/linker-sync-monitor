/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionsListCtrl', function($scope, $http, $mdDialog){
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

    $scope.showSessionInfo = function(sessionId, ev){
        $mdDialog.show({
            locals: {data: sessionId},
            controller: 'SessionInfoCtrl',
            templateUrl: 'session-info-dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false
        });
    };

});