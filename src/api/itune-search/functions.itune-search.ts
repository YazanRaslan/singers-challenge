import { RequestHandler, Request, Response } from "express";
import fetch from 'node-fetch';
import { query, validationResult } from 'express-validator';

const singers = ['ariana', 'taylor', 'billie', 'ed', 'shawn', 'dua', 'selena', 'camila', 'bruno', 'justin'];

export const searchITunes: RequestHandler[] = [
    query('singer').optional({ nullable: true }).isString(),
    query('limit').optional({ nullable: true }).isInt({ min: 1, max: 1000 }),
    query('short').optional({ nullable: true }).isBoolean(),
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ code: 400, data: { errors: errors.array() }, message: "Bad Request" });
                return;
            }

            const requestURLs = [];
            if (req.query.singer) {
                requestURLs.push(`https://itunes.apple.com/search?term=${req.query.singer}&limit=${req.query.limit || 20}`)
            } else {
                for (const singer of singers) {
                    requestURLs.push(`https://itunes.apple.com/search?term=${singer}&limit=${req.query.limit || 20}`)
                }
            }

            let aggregatedResponse = (await Promise.all(
                requestURLs.map(async (url) =>
                    fetch(url).then(resp => resp.json()).then(resp => resp.results || [])
                )
            )).flat();

            if (req.query.short) {
                aggregatedResponse = aggregatedResponse.map(resp => (({ primaryGenreName, releaseDate }) => ({ primaryGenreName, releaseDate }))(resp))
            }

            const sortedResult = aggregatedResponse.sort((a, b) => {
                if (a.primaryGenreName === b.primaryGenreName) {
                    return a.releaseDate > b.releaseDate ? 1 : -1
                }
                return a.primaryGenreName.localeCompare(b.primaryGenreName);
            })

            res.status(200).json(sortedResult || []);
        } catch (error) {
            console.error(error);
            res.status(error.status || 500).send('An Error occurred while getting the iTunes search results');
        }
    }
]