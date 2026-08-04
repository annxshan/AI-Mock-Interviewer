exports.handler = async (event) => {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed" }),
            };
        }

        const body = JSON.parse(event.body);

        const apiKey = process.env.GEMINI_API_KEY;
        console.log("GEMINI_API_KEY =", process.env.GEMINI_API_KEY);
        console.log("Environment keys:", Object.keys(process.env).filter(key => key.includes("GEMINI")));

        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "GEMINI_API_KEY not found",
                }),
            };
        }

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: body.contents,
                    systemInstruction: body.systemInstruction,
                    generationConfig: body.generationConfig,
                }),
            }
        );

        const text = await response.text();

        console.log("Status:", response.status);
        console.log("Gemini response:");
        console.log(text);

        return {
            statusCode: response.status,
            headers: {
                "Content-Type": "application/json",
            },
            body: text,
        };
    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message,
            }),
        };
    }
};