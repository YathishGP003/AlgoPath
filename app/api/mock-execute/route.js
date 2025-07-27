// Mock code execution service for testing
export async function POST(req) {
    try {
        const { language, code, input } = await req.json();
        
        console.log('Mock execution request:', { language, code, input });
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock responses based on language
        let mockOutput = '';
        
        // Generate realistic outputs based on problem type and code content
        if (code.includes('two_sum') || code.includes('Two Sum')) {
            // For Two Sum problem, return expected outputs
            mockOutput = '0 1\n1 2\n0 1';
        } else if (code.includes('reverseList') || code.includes('reverse') || code.includes('linked')) {
            // For Reverse Linked List problem, return expected outputs
            mockOutput = '5 4 3 2 1 \n3 2 1 \n1 ';
        } else if (language === 'python3') {
            if (code.includes('print("Hello World")')) {
                mockOutput = 'Hello World';
            } else {
                mockOutput = 'Mock Python execution successful';
            }
        } else if (language === 'java') {
            if (code.includes('Hello World')) {
                mockOutput = 'Hello World';
            } else {
                mockOutput = 'Mock Java execution successful';
            }
        } else if (language === 'cpp') {
            if (code.includes('Hello World')) {
                mockOutput = 'Hello World';
            } else {
                mockOutput = 'Mock C++ execution successful';
            }
        } else if (language === 'nodejs') {
            if (code.includes('Hello World')) {
                mockOutput = 'Hello World';
            } else {
                mockOutput = 'Mock JavaScript execution successful';
            }
        } else {
            mockOutput = 'Mock execution successful';
        }
        
        const response = {
            error: false,
            output: mockOutput,
            statusCode: 200,
            memory: "3456",
            cpuTime: "0.04"
        };
        
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Mock execution error:', error);
        return new Response(JSON.stringify({
            error: true,
            output: 'Mock execution failed: ' + error.message,
            statusCode: 500
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
