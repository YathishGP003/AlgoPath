export async function GET() {
    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const apiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;
    
    console.log('API Key exists:', !!apiKey);
    console.log('API Host exists:', !!apiHost);
    
    if (!apiKey) {
        return new Response(JSON.stringify({
            error: 'RapidAPI credentials not configured',
            hasApiKey: !!apiKey,
            hasApiHost: !!apiHost
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    // Test simple code execution
    try {
        const res = await fetch('https://jdoodle2.p.rapidapi.com/v1', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "jdoodle2.p.rapidapi.com",
            },
            body: JSON.stringify({
                language: "python3",
                code: "print('Hello World')",
                input: "",
            }),
        });
        
        if (!res.ok) {
            return new Response(JSON.stringify({
                error: 'JDoodle API request failed',
                status: res.status,
                statusText: res.statusText
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const data = await res.json();
        return new Response(JSON.stringify({
            success: true,
            message: 'JDoodle API is working',
            testOutput: data.output
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            error: 'JDoodle API test failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
