import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";
import { generateXAIExplanation } from "../utils/openai";

export async function getScores(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const result = await query('SELECT * FROM scores ORDER BY score DESC');
        let scores = result.rows;

        // Logic to generate XAI if empty (for demonstration)
        for (let score of scores) {
            if (!score.detail || score.detail.includes("rerata")) { // Example condition
                // In a real app, you might only do this once and save it back to DB
                // score.detail = await generateXAIExplanation(score.name, score.score, score.reason);
            }
        }

        return { status: 200, jsonBody: scores };
    } catch (error) {
        context.error('Database query error:', error);
        return { status: 500, body: 'Internal Server Error' };
    }
};

app.http('getScores', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'scores',
    handler: getScores
});
