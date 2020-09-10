import createDatabase, { getH2, queryDB } from '../src/createDatabase.js';

module.exports = {
    getAll(callback: () => void) {
        getH2(() => queryDB("SELECT * FROM beers", (result) => {
            result.toObjArray((err, results) => callback(results))
        }));
    },
    get(id: number, callback: () => void) {
        getH2(() => queryDB(`SELECT * FROM beers WHERE id = ${id}`, (result) => {
            result.toObjArray((err, results) => {
                return (results.length > 0) ? callback(results[0]) : callback(null);
            })
        }));
    },
    create(beer: Beer) {
        getH2(() => {
            queryDB(`INSERT INTO beers (id, name, image_url, description) VALUES('${beer.id}', '${beer.name}', '${beer.image_url}', '${beer.description}')`);
        });
    },
    update(id: number, beer: Beer) {
        getH2(() => {

            queryDB(`UPDATE beers SET name = '${beer.name}', image_url = '${beer.image_url}', description = '${beer.description}' WHERE id = ${id}`);
        });
    },
    delete(id: number) {
        getH2(() => queryDB(`DELETE FROM beers WHERE id = ${id}`));
    },
};