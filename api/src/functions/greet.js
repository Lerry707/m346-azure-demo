const { app } = require('@azure/functions');

/**
 * Azure Function: greet
 * Returns a personalized greeting message
 * HTTP Trigger: GET /api/greet?name=YourName
 */
app.http('greet', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Greet API called');

        // Get name from query parameter or request body
        const name = request.query.get('name') || 
                     (await request.text()) || 
                     'Besucher';

        // Create personalized greeting
        const greetings = [
            `Willkommen, ${name}! 👋`,
            `Hallo ${name}! Schön, dass du da bist! 🎉`,
            `Grüezi ${name}! 🇨🇭`,
            `Servus ${name}! 🎊`,
            `Hey ${name}! Wie geht's? 😊`
        ];

        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                greeting: randomGreeting,
                name: name,
                timestamp: new Date().toISOString(),
                message: 'Personalisierte Begrüßung von Azure Functions',
                backend: 'Azure Functions'
            })
        };
    }
});
