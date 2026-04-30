import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateXAIExplanation(farmerName: string, score: number, keyFactors: string): Promise<string> {
    const prompt = `
        Anda adalah Senior Credit Analyst untuk koperasi Dayapala. 
        Berikan analisis Explainable AI (XAI) singkat (2-3 kalimat) dalam Bahasa Indonesia untuk skor kredit berikut:
        
        Nama Petani: ${farmerName}
        Skor: ${score}/100
        Faktor Kunci: ${keyFactors}
        
        Penjelasan harus profesional, transparan, dan mudah dipahami oleh pengurus koperasi.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Anda adalah AI asisten untuk platform rantai pasok Dayapala." },
                { role: "user", content: prompt }
            ],
            max_tokens: 150,
        });

        return response.choices[0].message?.content || "Analisis tidak tersedia saat ini.";
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "Gagal menghasilkan analisis AI.";
    }
}
export async function generateMatchExplanation(commodity: string, source: string, target: string, fit: number): Promise<string> {
    try {
        const prompt = `Berikan penjelasan singkat dan profesional (maksimal 20 kata) dalam Bahasa Indonesia tentang mengapa pasokan ${commodity} dari ${source} sangat cocok untuk memenuhi permintaan ${target} dengan skor kecocokan ${fit}%. Fokus pada kedekatan lokasi dan kualitas.`;
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 60,
        });

        return response.choices[0].message.content || "Kecocokan optimal berdasarkan lokasi dan ketersediaan stok.";
    } catch (error) {
        console.error('OpenAI Error:', error);
        return "Kecocokan didasarkan pada standar operasional koperasi.";
    }
}
