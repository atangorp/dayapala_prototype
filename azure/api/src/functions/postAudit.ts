import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function postAudit(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const body: any = await request.json();
        const { title, detail, tag, actor } = body;

        const result = await query(
            'INSERT INTO audit_logs (title, detail, tag, actor) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, detail, tag, actor]
        );

        return { 
            status: 201, 
            jsonBody: result.rows[0],
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } catch (error) {
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('postAudit', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'audit',
    handler: postAudit
});
