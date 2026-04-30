import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";

export async function postDemand(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        const body: any = await request.json();
        const { buyer, commodity, amount, schedule, priority } = body;

        // Validasi sederhana
        if (!buyer || !commodity || !amount) {
            return { status: 400, body: "Data tidak lengkap" };
        }

        const result = await query(
            'INSERT INTO demands (buyer, commodity, amount, schedule, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [buyer, commodity, amount, schedule, priority]
        );

        return { 
            status: 201, 
            jsonBody: result.rows[0],
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' // Sangat penting untuk CORS
            }
        };
    } catch (error) {
        context.error('Database insert error:', error);
        return { status: 500, body: 'Internal Server Error: Gagal menyimpan permintaan' };
    }
};

app.http('postDemand', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'demands',
    handler: postDemand
});
