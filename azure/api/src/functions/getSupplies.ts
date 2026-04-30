import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function getSupplies(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const result = await query('SELECT * FROM supplies ORDER BY created_at DESC');
        return { 
            status: 200, 
            jsonBody: result.rows,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Enable CORS for development
            }
        };
    } catch (error) {
        context.error('Database query error:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('getSupplies', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'supplies',
    handler: getSupplies
});
