/**
 * Created by barte_000 on 2016-11-15.
 */
angular.module('LinkerSyncMonitor')

.factory('DataProvider', function ($http) {
    return {
        getSessions: function(pageIndex, filter, callback){
            if(!pageIndex)
                pageIndex = 0;

            var result = {
                data: null,
                error: null
            };

            var request = {
                url: '/api/sessions?pageIndex='+pageIndex,
                method: 'POST'
            };

            if(filter){
                request.data = filter;
                request.headers = {'Content-Type': 'application/json'};
            }

            $http(request).then(function(response){
                if(response.data) {
                    result.data = response.data;
                }
                if(callback)
                    callback(result);
            }, function(e){
                result.error = e;
                if(callback)
                    callback(result);
            });
        },
        getLogs: function(sessionId, callback){
            var result = {
                data: null,
                error: null
            };

            $http({
                url: '/api/logs/'+sessionId,
                method: 'GET'
            }).then(function(results){
                if(results.data)
                    result.data = results.data;
                if(callback)
                    callback(result);
            }, function(error){
                if(error)
                    result.error = error;
                if(callback)
                    callback(result);
            });
        }
    }
});