const JDBC = require('jdbc');
const jinst = require('jdbc/lib/jinst');

if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath(['./h2-1.4.2001.jar']);
}

const h2 = new JDBC({
    url: 'jdbc:h2:tcp://localhost:5234/beers;database_to_lower=true',
    drivername: 'org.h2.Driver',
    properties: {
        user : 'SA',
        password: ''
    }
});

var h2Init = false;

function getH2(callback) {
    if (!h2Init)
        h2.initialize((err) => {
            h2Init = true;
            callback(err)
        });
    return callback(null);
};

function queryDB(sql, callback) {
    h2.reserve((err, connobj) => {
        connobj.conn.createStatement((err3, statement) => {
            if(callback) {
                statement.executeQuery(sql, (err2, result) => h2.release(connobj, () => callback(result)));
            } else {
                statement.executeUpdate(sql, () => h2.release(connobj, (err1) => { if(err1) {
                    // tslint:disable-next-line:no-console
                    console.log(err1)} }));
            }
        });
    });
};

module.exports = {
    initialize: function (callback) {
        getH2((err) => {
            queryDB("CREATE TABLE IF NOT EXISTS beers ("
                + "  id INT PRIMARY KEY AUTO_INCREMENT,"
                + "  name VARCHAR NOT NULL,"
                + "  image_url VARCHAR NOT NULL,"
                + "  description VARCHAR NOT NULL)"
            );
        });
    },
    getH2: getH2,
    queryDB: queryDB
}
