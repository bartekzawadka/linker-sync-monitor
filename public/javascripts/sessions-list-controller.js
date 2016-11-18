/**
 * Created by barte_000 on 2016-11-06.
 */
angular.module('LinkerSyncMonitor').controller('SessionsListCtrl', function($scope, $mdDialog, DataProvider){
    $scope.isLoading = true;
    $scope.sessions = [];
    var moreDataAvailable = true;

    var filter = null;

    $scope.$on('filterUpdated', function(e, data){
        $scope.sessions = [];
        moreDataAvailable = true;
        filter = data;
        getSessions();
    });

    var getSessionDisplayInfo = function(session){
        if(!session)
            return null;
        var result = {
            startedAt: session.startedAt,
            endedAt: session.endedAt
        };

        result.label = session.level;
        result.id = session.id;

        if(!session.level || session.level == ""){
            result.label = "UNKNOWN";
            result.icon = "help";
            result.color = "grey-600";
        }else if (session.level == "INFO") {
            result.label = "SUCCESS";
            result.icon = "done";
            result.color = "green";
        }else if(session.level == "FATAL"){
            result.icon = "cancel";
            result.color = "red";
        }else if(session.level == "ERROR"){
            result.icon = "error";
            result.color = "red";
        }else if(session.level == "WARNING"){
            result.icon = "warning";
            result.color = "orange";
        }else if(session.level == "DEBUG"){
            result.icon = "build";
            result.color = "indigo";
        }

        return result;
    };

    var reformatSessionsInfo = function(data){
        if(!data)
            return;

        var formatted = [];
        for(var k in data){
            if(data.hasOwnProperty(k)){
                var item = getSessionDisplayInfo(data[k]);
                if(item)
                    formatted.push(item);
            }
        }

        return formatted;
    };

    var getSessions = function(){
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
                   var formatted = reformatSessionsInfo(result.data);
                   if(formatted)
                        $scope.sessions = $scope.sessions.concat(formatted);
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