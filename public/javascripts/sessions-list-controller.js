/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionsListCtrl', function($scope, $mdDialog, DataProvider){
    $scope.isLoading = true;
    $scope.sessions = [];
    var moreDataAvailable = true;

    $scope.$on('filterUpdated', function(e, data){
        $scope.sessions = [];
        moreDataAvailable = true;
        getSessions(data);
    });

    var getSessions = function(filter){
        $scope.isLoading = true;

        DataProvider.getSessions($scope.sessions.length, filter, function(result){
           if(result.error) {
               console.log(result.error);
               $scope.isLoading = false;
               return;
           }

            if(result.data){
               if(result.data.length>0){
                   moreDataAvailable = true;
                   $scope.sessions = $scope.sessions.concat(result.data);
               }else{
                   moreDataAvailable = false;
               }
            }
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