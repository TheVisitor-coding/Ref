/**
 * coach-athlete controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::coach-athlete.coach-athlete', ({ strapi }) => ({
    async mine(ctx) {

        type PopulatedCoachAthlete = Awaited<
            ReturnType<typeof strapi.entityService.findMany>
        >[number] & {
            athlete: {
                id: number;
                first_name?: string | null;
                last_name?: string | null;
                email?: string | null;
                phone?: string | null;
                avatar?: { url?: string } | null;
            };
            relation_status?: string | null;
        };

        const coachId = ctx.state.user.id;
        if (!coachId) { return ctx.unauthorized('You must be logged in as a coach to access this resource.'); }

        const entries = await strapi.entityService.findMany("api::coach-athlete.coach-athlete", {
            filters: { coach: coachId },
            populate: {
                athlete: {
                    fields: ["id", "first_name", "last_name", "email", "phone"],
                    populate: { avatar: true },
                },
            },
        }) as PopulatedCoachAthlete[];

        const athletes = entries
            .map(entry => entry.athlete)
            .filter(Boolean);

        ctx.body = {
            data: athletes,
        }
    }
}));
