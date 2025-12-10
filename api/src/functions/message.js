const { app } = require('@azure/functions');

/**
 * Azure Function: message
 * Returns a simple message with timestamp
 * HTTP Trigger: GET /api/message
 */
app.http('message', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Message API called');

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Hallo von Azure Functions! 🚀',
                timestamp: new Date().toISOString(),
                info: 'Diese Nachricht kommt direkt vom Backend',
                backend: 'Azure Functions',
                status: 'success'
            })
        };
    }
});
