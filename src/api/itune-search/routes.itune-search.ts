import { Router } from "express";
import { searchITunes } from "./functions.itune-search";
export const iTuneSearchRoutes: Router = Router();

iTuneSearchRoutes.route( '/start' ).get( searchITunes );