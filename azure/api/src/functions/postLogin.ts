import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function postLogin(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const body: any = await request.json();
        const { username, password } = body;

        const result = await query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            // Don't send the password back
            delete user.password;
            return { status: 200, jsonBody: user };
        } else {
            return { status: 401, body: 'Username atau password salah' };
        }
    } catch (error) {
        context.error('Login error:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('postLogin', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'login',
    handler: postLogin
});
