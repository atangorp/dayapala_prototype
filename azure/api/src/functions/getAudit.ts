import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function getAudit(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const result = await query('SELECT * FROM audit_logs ORDER BY time DESC');
        return { status: 200, jsonBody: result.rows };
    } catch (error) {
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('getAudit', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'audit',
    handler: getAudit
});
