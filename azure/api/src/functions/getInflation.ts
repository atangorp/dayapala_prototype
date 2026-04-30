import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function getInflation(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const result = await query('SELECT * FROM inflation');
        return { 
            status: 200, 
            jsonBody: result.rows,
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } catch (error) {
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('getInflation', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'inflation',
    handler: getInflation
});
