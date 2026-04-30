import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function postRegister(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const body: any = await request.json();
        const { username, password, role, full_name } = body;

        // Check if user already exists
        const check = await query('SELECT id FROM users WHERE username = $1', [username]);
        if (check.rows.length > 0) {
            return { status: 400, body: 'Username sudah digunakan' };
        }

        const result = await query(
            'INSERT INTO users (username, password, role, full_name) VALUES ($1, $2, $3, $4) RETURNING id, username, role, full_name',
            [username, password, role, full_name]
        );

        return { status: 201, jsonBody: result.rows[0] };
    } catch (error) {
        context.error('Registration error:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('postRegister', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'register',
    handler: postRegister
});
