import express from 'express';
import { iTuneSearchRoutes } from './api/itune-search/routes.itune-search';

const app = express();
const port = 8080;

app.use(iTuneSearchRoutes);

app.get('/', (_, res) => {
    res.send(`
        <div style="font-family:sans-serif">
            <h1>Singers Challenge</h1>
            <hr>

            <h3> Hi Dears, </h3>
            <p>This repo contains one endpoint in <span style="color: #026e00">NodeJS/ExpressJS</span> that gets a list of search results from <span style="color: grey; font-style: italic">https://itunes.apple.com/</span> fot a list of singers terms, combine and sort the results.</p>
            <p>You can check it out locally by simply requesting: <a href="http://localhost:8080/start" target="_blank"> Start </a></p>
            <p>In addition I made a few options to for you <as query parameters>:</p>
            <ul>
                <li>singer: you can specify one singer term, that would override the singers array and you would get the result for only your input
                for example singer = 'ed' => <a href="http://localhost:8080/start?singer=ed" target="_blank"> only one singer term (ed) </a></li>
                <li>limit: you can limit the number of retrieved results for each singer, there is a limit: min = 0, max = 1000 for example limit = 1 => <a href="http://localhost:8080/start?limit=1" target="_blank"> 1 search results for each singer </a></li>
                <li>short: this is a boolean value, when passed as a true you will get the result briefed with only primaryGenreName and releaseDate properties for example short = true => <a href="http://localhost:8080/start?short=true" target="_blank"> short version of the result </a></li>
            </ul>
            <p> you can combine these query parameters for sure <a href="http://localhost:8080/start?singer=ed&limit=1&short=true" target="_blank"> only one singer term (ed) with one search result and shortened </a></p>
            <hr>
            As for the other task (MongoDB query), you can find the query in the repo as well in Task2.txt file (root folder).
            <hr>
            <h4>Thank you, <br> Yazan Raslan</h4>
        </div>
    `);
})

app.listen(port, () => {
    console.log(`server has been started at http://localhost:${port}`);
});