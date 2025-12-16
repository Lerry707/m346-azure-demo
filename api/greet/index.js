/**
 * Azure Function: greet
 * Returns a personalized greeting message
 * HTTP Trigger: GET /api/greet?name=YourName
 */
module.exports = async function (context, req) {
    context.log('Greet API called');
    const startTime = Date.now();

    // Get name from query parameter or request body
    const name = (req.query.name || (req.body && req.body.name)) || 'Besucher';

    // Create personalized greeting
    const greetings = [
        `Willkommen, ${name}! 👋`,
        `Hallo ${name}! Schön, dass du da bist! 🎉`,
        `Grüezi ${name}! 🇨🇭`,
        `Servus ${name}! 🎊`,
        `Hey ${name}! Wie geht's? 😊`
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            greeting: randomGreeting,
            name: name,
            timestamp: new Date().toISOString(),
            message: 'Personalisierte Begrüßung von Azure Functions',
            backend: 'Azure Functions',
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
