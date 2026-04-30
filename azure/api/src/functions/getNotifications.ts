import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function getNotifications(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const role = request.query.get('role');
        const result = role 
            ? await query('SELECT * FROM notifications WHERE user_role = $1 ORDER BY created_at DESC', [role])
            : await query('SELECT * FROM notifications ORDER BY created_at DESC');
            
        return { 
            status: 200, 
            jsonBody: result.rows,
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } catch (error) {
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('getNotifications', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'notifications',
    handler: getNotifications
});
