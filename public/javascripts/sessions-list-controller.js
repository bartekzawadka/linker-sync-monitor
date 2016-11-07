/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionsListCtrl', function($scope, $http, $mdDialog){
    $scope.isLoading = true;
    $scope.sessions = [];
    var moreDataAvailable = true;

    var getSessions = function(){
        $scope.isLoading = true;
        $http({
            url: '/api/getSessions?pageIndex='+$scope.sessions.length,
            method: 'GET'
        }).then(function(response){
            if(response.data) {
                if(response.data.length>0) {
                    moreDataAvailable = true;
                    $scope.sessions = $scope.sessions.concat(response.data);
                }else {
                    moreDataAvailable = false;
                }
            }
            $scope.isLoading = false;
        }, function(e){
            console.log(e);
            $scope.isLoading = false;
        });
    };

    $(document).ready(function(){
        getSessions();

        var win = $(window);

        win.scroll(function(){
           if(($(document).height() - win.height() == win.scrollTop()) &&
               $scope.isLoading==false &&
               moreDataAvailable == true){
               getSessions();
           }
        });
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