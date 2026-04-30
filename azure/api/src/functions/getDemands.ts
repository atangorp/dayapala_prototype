import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function getDemands(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const result = await query('SELECT * FROM demands ORDER BY created_at DESC');
        return { 
            status: 200, 
            jsonBody: result.rows,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        context.error('Database query error:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('getDemands', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'demands',
    handler: getDemands
});
