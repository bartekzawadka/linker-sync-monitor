/**
 * Created by barte_000 on 2016-11-05.
 */
var express = require('express');
var router = express.Router();
var url = require('url');
var path = require('path');
var models = require(path.join(__dirname, '..', 'models'));
var config = require(path.join(__dirname, '..', 'config.json'));
var sequelize = require('sequelize');

router.post('/sessions', function (req, res) {

        var filter = req.body;

        var query = {

            attributes: ['id', 'level',
                [sequelize.fn('to_char', sequelize.col("session.\"startedAt\""), "YYYY-MM-DD HH24:MI:SS"), 'startedAt'],
                [sequelize.fn('to_char', sequelize.col("session.\"endedAt\""), "YYYY-MM-DD HH24:MI:SS"), 'endedAt'],
                "\"updatedAt\""],
            include: {
                model: models.log,
                attributes: []
            },
            offset: 0,
            limit: config.defaultDataLimit,
            order: [
                ["\"updatedAt\"", "DESC"]
            ]
        };

        if (req.query.pageSize) {
            query.limit = req.query.pageSize;
        }
        if (req.query.pageIndex) {
            query.offset = req.query.pageIndex;
        }

        if (filter) {
            if (filter.order) {
                var ascDesc = "";
                if (filter.order.descending)
                    ascDesc = "DESC";
                else
                    ascDesc = "ASC";

                query.order = [
                    ["\"" + filter.order.value + "\"", ascDesc]
                ]
            }
            if (filter.filter) {
                var where = {
                    "$and": []
                };
                if (filter.filter.startedAt) {
                    where["$and"].push({
                        "\"startedAt\"": {
                            "$gte": filter.filter.startedAt
                        }
                    });
                }
                if (filter.filter.endedAt) {
                    where["$and"].push({
                        "\"endedAt\"": {
                            "$gte": filter.filter.endedAt
                        }
                    });
                }
                if (filter.filter.levels && filter.filter.levels.length > 0) {
                    where["$and"].push({
                        "level": {
                            "$in": filter.filter.levels
                        }
                    });
                }
                if (filter.filter.hasProcessedItems) {
                    where["$and"].push({
                        "processedItemsCount": {
                            "$gt": 0
                        }
                    })
                } else if (filter.filter.hasProcessedItems == false) {
                    where["$and"].push({
                        "processedItemsCount": 0
                    })
                }

                query.where = where;
            }

        }
        models.session.findAll(query).then(function (results) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(results));
        }).catch(function (e) {
            console.log(e);
        });
    }
);

router.get('/logs/:id', function (req, res) {
    if (!req.params || !req.params.id) {
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({
            "error": "No session id provided"
        }));
        return;
    }

    models.log.findAll({
        where: {
            "sessionId": req.params.id
        },
        order: [
            ["\"updatedAt\"", "DESC"]
        ],
        attributes: ['id', 'level', 'type', 'message', 'description', 'sessionId',
            [sequelize.fn('to_char', sequelize.col("log.\"createdAt\""), "YYYY-MM-DD HH24:MI:SS"), 'createdAt'],
        ]
    }).then(function (results) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(results));
    }).catch(function (e) {
        console.log(e);
    })
});

module.exports = router;