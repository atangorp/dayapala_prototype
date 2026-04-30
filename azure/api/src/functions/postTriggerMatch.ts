import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { query } from "../utils/db";
import { generateMatchExplanation } from "../utils/openai";

export async function postTriggerMatch(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        context.log('--- Memulai Proses AI Matching ---');

        // 1. Ambil data
        const supplies = await query("SELECT * FROM supplies");
        const demands = await query("SELECT * FROM demands");

        context.log(`Data ditemukan: ${supplies.rows.length} Supply, ${demands.rows.length} Demand`);

        // 2. Bersihkan matches lama agar tidak duplikat saat demo
        await query("DELETE FROM matches");

        let matchCount = 0;

        for (const demand of demands.rows) {
            const demandCommodity = demand.commodity.toLowerCase().trim();
            
            for (const supply of supplies.rows) {
                const supplyCommodity = supply.commodity.toLowerCase().trim();

                context.log(`Mengecek: ${supplyCommodity} vs ${demandCommodity}`);

                // Logika matching lebih fleksibel (partial match)
                if (supplyCommodity.includes(demandCommodity) || demandCommodity.includes(supplyCommodity)) {
                    
                    context.log(`MATCH DITEMUKAN! ${supply.farmer} -> ${demand.buyer}`);

                    const fit = Math.floor(Math.random() * (98 - 85 + 1)) + 85;
                    
                    // Kita bisa skip OpenAI jika ingin sangat cepat, tapi ini untuk demo
                    const explanation = await generateMatchExplanation(
                        supply.commodity, 
                        supply.farmer, 
                        demand.buyer, 
                        fit
                    );

                    await query(
                        `INSERT INTO matches (commodity, source, target, fit, eta, credit, explanation, route) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                        [
                            supply.commodity,
                            supply.farmer,
                            demand.buyer,
                            fit,
                            "1-3 Jam",
                            "Tervalidasi",
                            explanation,
                            `${supply.village} -> Koperasi -> ${demand.buyer}`
                        ]
                    );
                    matchCount++;
                }
            }
        }

        context.log(`--- Selesai. Total Match: ${matchCount} ---`);

        return { 
            status: 200, 
            body: `Berhasil mencocokkan ${matchCount} data.`,
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
    } catch (error) {
        context.error('Match error:', error);
        return { status: 500, body: 'Gagal menjalankan matching engine.' };
    }
};

app.http('postTriggerMatch', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'trigger-match',
    handler: postTriggerMatch
});
