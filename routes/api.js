/**
 * Created by barte_000 on 2016-11-05.
 */
var express = require('express');
var router = express.Router();
var url = require('url');
var path = require('path');
var models = require(path.join(__dirname, '..', 'models'));

router.get('/getSessions', function(req, res){

    var query = {
        offset: 0,
        limit: 20
    };
    if(req.query.pageSize){
        query.limit = req.query.pageSize;
        if(req.query.pageIndex){
            query.offset = req.query.pageIndex*req.query.pageSize;
        }
    }

    models.session.findAndCountAll(query).then(function(results){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(results));
    });
});

module.exports = router;