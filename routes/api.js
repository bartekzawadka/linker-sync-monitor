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

router.get('/getSessions', function(req, res){

    var query = {

        attributes: ['id',
            [
                sequelize.literal('(SELECT count(case when \"logs\".\"level\" = \'ERROR\' then 1 else NULL end) FROM \"logs\" WHERE \"logs\".\"sessionId\" = \"session\".\"id\")'),
                'logErrorsCount'
            ],
            [
                sequelize.literal('(SELECT count(case when \"logs\".\"level\" = \'FATAL\' then 1 else NULL end) FROM \"logs\" WHERE \"logs\".\"sessionId\" = \"session\".\"id\")'),
                'logFatalsCount'
            ],
            [
                sequelize.literal('(SELECT count(case when \"logs\".\"level\" = \'WARNING\' then 1 else NULL end) FROM \"logs\" WHERE \"logs\".\"sessionId\" = \"session\".\"id\")'),
                'logWarningsCount'
            ],
            [
                sequelize.literal('(SELECT count(case when \"logs\".\"level\" = \'DEBUG\' then 1 else NULL end) FROM \"logs\" WHERE \"logs\".\"sessionId\" = \"session\".\"id\")'),
                'logDebugsCount'
            ],
            [
                sequelize.literal('(SELECT count(case when \"logs\".\"level\" = \'INFO\' then 1 else NULL end) FROM \"logs\" WHERE \"logs\".\"sessionId\" = \"session\".\"id\")'),
                'logSuccessCount'
            ],
            [
                sequelize.literal('(SELECT count(\"logs\".\"id\") FROM \"logs\" WHERE \"logs\".\"sessionId\" = \"session\".\"id\")'),
                'logTotalCount'
            ],
            [sequelize.fn('to_char', sequelize.col("session.\"startedAt\""), "YYYY-MM-DD HH24:MI:SS"), 'startedAt'],
            [sequelize.fn('to_char', sequelize.col("session.\"endedAt\""), "YYYY-MM-DD HH24:MI:SS"), 'endedAt'],
            "\"updatedAt\""],
        include:{
            model: models.log,
            attributes:[]
        },
        offset: 0,
        limit: config.defaultDataLimit,
        order: [
            ["\"updatedAt\"", "DESC"]
        ]
    };

    if(req.query.pageSize){
        query.limit = req.query.pageSize;
        if(req.query.pageIndex){
            query.offset = req.query.pageIndex * req.query.pageSize;
        }
    }

    models.session.findAll(query).then(function(results){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(results));
    }).catch(function(e){
        console.log(e);
    });
});

router.get('/getLogs/:id', function(req, res){
    if(!req.params || !req.params.id){
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
        attributes:['id', 'level', 'type', 'message', 'description', 'sessionId',
            [sequelize.fn('to_char', sequelize.col("log.\"createdAt\""), "YYYY-MM-DD HH24:MI:SS"), 'createdAt'],
        ]
    }).then(function(results){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(results));
    }).catch(function(e){
        console.log(e);
    })
});

module.exports = router;