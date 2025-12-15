/**
 * Azure Function: time
 * Returns current server time and timezone information
 * HTTP Trigger: GET /api/time
 */
module.exports = async function (context, req) {
    context.log('Time API called');

    const now = new Date();
    const startTime = Date.now();
    
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            timestamp: now.toISOString(),
            date: now.toLocaleDateString('de-DE', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            time: now.toLocaleTimeString('de-DE'),
            timezone: 'UTC',
            unix: Math.floor(now.getTime() / 1000),
            message: 'Server-Zeit von Azure Functions',
            // BEWEIS dass es in Azure läuft:
            executionInfo: {
                functionName: context.executionContext.functionName,
                invocationId: context.executionContext.invocationId,
                executionTime: Date.now() - startTime + 'ms',
                runtime: 'Node.js ' + process.version,
                platform: process.platform,
                runningIn: 'Azure Functions Container'
            }
        }
    };
};
