import express from 'express';
import { iTuneSearchRoutes } from './api/itune-search/routes.itune-search';

const app = express();
const port = 8080;

app.use(iTuneSearchRoutes);

app.get('/', (_, res) => {
    res.send('This is a mini project for PMG node js assignment');
})

app.listen(port, () => {
    console.log(`server has been started at http://localhost:${port}`);
});