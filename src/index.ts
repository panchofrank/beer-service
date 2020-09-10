import express from "express";
import {getH2, queryDB} from "./createDatabase";
const app = express();
const port = 8080; // default port to listen

app.use(express.json());


app.post('/api/beers', async (req, res) => {

    let beer: Beer;
    beer = req.body;

    getH2(() => {
        queryDB(`INSERT INTO beers (id, name, image_url, description) VALUES('${beer.id}', '${beer.name}', '${beer.imageUrl}', '${beer.description}')`);
    });
    res.status(201);
});
app.get( `/api/beers/all`, async ( req: any, res ) => {


    getH2(() => queryDB("SELECT * FROM beers", (result: any) =>
    {
        return res.json(result);
    }));

} );
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
