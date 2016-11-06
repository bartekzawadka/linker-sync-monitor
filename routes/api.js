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
        include:{
            model: models.log,
            attributes: ['id', 'level', 'type','message',
                [sequelize.fn('to_char', sequelize.col("logs.\"updatedAt\""), "YYYY-MM-DD HH12:MI:SS"), 'updatedAtFormed']]
        },
        offset: 0,
        limit: config.defaultDataLimit,
        order: [
            ["\"updatedAt\"", "DESC"],
            [models.log, 'id', 'ASC']
        ],
        attributes: [
            'id',
            [sequelize.fn('to_char', sequelize.col("session.\"startedAt\""), "YYYY-MM-DD HH12:MI:SS"), 'startedAtFormed'],
            [sequelize.fn('to_char', sequelize.col("session.\"endedAt\""), "YYYY-MM-DD HH12:MI:SS"), 'endedAtFormed'],
            "\"updatedAt\""
        ]
    };

    if(req.query.pageSize){
        query.limit = req.query.pageSize;
        if(req.query.pageIndex){
            query.offset = req.query.pageIndex * req.query.pageSize;
        }
    }

    models.session.findAndCountAll(query).then(function(results){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(results));
    }).catch(function(e){
        console.log(e);
    });
});

module.exports = router;