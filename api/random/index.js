/**
 * Azure Function: random
 * Generates a random number within a specified range
 * HTTP Trigger: GET /api/random?min=1&max=100
 */
module.exports = async function (context, req) {
    context.log('Random number API called');
    const startTime = Date.now();

    const min = parseInt(req.query.min) || 1;
    const max = parseInt(req.query.max) || 100;

    if (min >= max) {
        context.res = {
            status: 400,
            body: {
                error: 'Min muss kleiner als Max sein',
                min: min,
                max: max
            }
        };
        return;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            number: randomNumber,
            min: min,
            max: max,
            timestamp: new Date().toISOString(),
            message: `Zufallszahl zwischen ${min} und ${max}`,
            executionInfo: {
                functionName: context.executionContext.functionName,
                invocationId: context.executionContext.invocationId,
                runtime: 'Node.js ' + process.version,
                platform: process.platform,
                runningIn: 'Azure Functions Container'
            }
        }
    };
};
