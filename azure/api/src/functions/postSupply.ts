import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function postSupply(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const body: any = await request.json();
        const { farmer, commodity, volume, village, price, status } = body;

        const result = await query(
            'INSERT INTO supplies (farmer, commodity, volume, village, price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [farmer, commodity, volume, village, price, status]
        );

        return { 
            status: 201, 
            jsonBody: result.rows[0],
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } catch (error) {
        context.error('Database insert error:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('postSupply', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'supplies',
    handler: postSupply
});
