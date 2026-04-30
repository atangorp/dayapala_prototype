import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function getMatches(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const result = await query('SELECT * FROM matches ORDER BY fit DESC');
        return { status: 200, jsonBody: result.rows };
    } catch (error) {
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('getMatches', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'matches',
    handler: getMatches
});
