import { ApiError, GoogleGenAI } from '@google/genai';

export default async (req) => {
    try {
        if (req.method !== "POST") {
            return Response.json({ error: "Method Not Allowed" }, {
                status: 405,
                headers: { Allow: "POST" },
            });
        }

        const body = await req.json();
        const ai = new GoogleGenAI({});
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: body.contents,
            config: {
                ...body.generationConfig,
                systemInstruction: body.systemInstruction,
            },
        });

        return Response.json(response);
    } catch (err) {
        const status = err instanceof ApiError && err.status >= 400 && err.status <= 599
            ? err.status
            : 500;

        return Response.json({ error: "Unable to generate an AI response. Please try again." }, {
            status,
        });
    }
};
