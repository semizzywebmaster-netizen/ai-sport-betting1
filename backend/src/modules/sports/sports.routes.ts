import { Router } from 'express';
import { sportsService } from './sports.service';
import { successResponse, errorResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const sports = await sportsService.getSports();
    return successResponse(res, sports);
  } catch (e) { next(e); }
});

router.get('/leagues', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const result = await sportsService.getLeagues({
      sport: req.query.sport as string,
      isFeatured: req.query.featured === 'true',
      search: req.query.search as string,
      page, limit
    });
    return successResponse(res, result.leagues, 'Leagues fetched', { page, limit, total: result.total });
  } catch (e) { next(e); }
});

router.get('/leagues/supported', async (req, res, next) => {
  try {
    const sport = req.query.sport as string;
    if (sport === 'basketball') {
      return successResponse(res, await sportsService.getSupportedBasketballLeagues());
    }
    return successResponse(res, await sportsService.getSupportedFootballLeagues());
  } catch (e) { next(e); }
});

router.get('/teams', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const result = await sportsService.getTeams({
      leagueId: req.query.leagueId as string,
      search: req.query.search as string,
      page, limit
    });
    return successResponse(res, result.teams, 'Teams fetched', { page, limit, total: result.total });
  } catch (e) { next(e); }
});

router.get('/fixtures', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const result = await sportsService.getFixtures({
      leagueId: req.query.leagueId as string,
      teamId: req.query.teamId as string,
      date: req.query.date as string,
      status: req.query.status as string,
      sport: req.query.sport as string,
      page, limit
    });
    return successResponse(res, result.fixtures, 'Fixtures fetched', { page, limit, total: result.total });
  } catch (e) { next(e); }
});

router.get('/fixtures/:id', async (req, res, next) => {
  try {
    const fixture = await sportsService.getFixtureById(req.params.id);
    if (!fixture) return errorResponse(res, 'Fixture not found', 404);
    return successResponse(res, fixture);
  } catch (e) { next(e); }
});

export default router;
