import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekSumary } from '../../functions/get-week-sumary';

export const getWeekSumaryRoute: FastifyPluginAsyncZod = async  (app) => {
    app.get('/summary', async () => {
        const { summary } = await getWeekSumary()
      
        return { summary }
      })
};