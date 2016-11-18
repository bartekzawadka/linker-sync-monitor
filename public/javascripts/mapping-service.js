/**
 * Created by barte_000 on 2016-11-18.
 */
angular.module('LinkerSyncMonitor')

    .factory('MappingService', function () {

        var getStatusForLevel = function (level) {

            var status = {
                label: "UNKNOWN",
                icon: "help",
                color: "grey-600"
            };

            if (!level || level == "") {
                return status;
            }

            status.label = level;

            switch (level) {
                case "INFO":
                    status.label = "SUCCESS";
                    status.icon = "done";
                    status.color = "green";
                    break;
                case "FATAL":
                    status.icon = "cancel";
                    status.color = "red";
                    break;
                case "ERROR":
                    status.icon = "error";
                    status.color = "red";
                    break;
                case "WARNING":
                    status.icon = "warning";
                    status.color = "orange";
                    break;
                case "DEBUG":
                    status.icon = "build";
                    status.color = "indigo";
                    break;
            }

            return status;
        };

        return {
            addStatusInfo: function (item) {
                if (!item || item.length == 0)
                    return item;

                var result = [];
                for (var k in item) {
                    if (item.hasOwnProperty(k)) {
                        if (!item[k].hasOwnProperty("level")) {
                            result.push(item[k]);
                            continue;
                        }
                        var status = getStatusForLevel(item[k].level);
                        item[k].icon = status.icon;
                        item[k].label = status.label;
                        item[k].color = status.color;
                        result.push(item[k]);
                    }
                }
                return result;
            }
        }
    });