/**
 * Created by barte_000 on 2016-10-23.
 */
var fs = require('fs');
var Sequelize = require('sequelize');
var path = require('path');
var config = require(path.join(__dirname, '..', 'config.json'));
var basename  = path.basename(module.filename);

var ldb = {};

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        ldb[model.name] = model;
    });

Object.keys(ldb).forEach(function(modelName) {
    if (ldb[modelName].associate) {
        ldb[modelName].associate(ldb);
    }
});

ldb.sequelize = sequelize;
ldb.Sequelize = Sequelize;

module.exports = ldb;