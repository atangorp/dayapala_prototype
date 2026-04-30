import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function putSupply(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const id = request.query.get('id');
        const body: any = await request.json();
        const { status } = body;

        if (!id) return { status: 400, body: 'Missing ID' };

        const result = await query(
            'UPDATE supplies SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        return { 
            status: 200, 
            jsonBody: result.rows[0],
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } catch (error) {
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('putSupply', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'supplies',
    handler: putSupply
});
