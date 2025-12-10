/**
 * Azure Function: message
 * Returns a simple message with timestamp
 * HTTP Trigger: GET /api/message
 */
module.exports = async function (context, req) {
    context.log('Message API called');

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            message: 'Hallo von Azure Functions! 🚀',
            timestamp: new Date().toISOString(),
            info: 'Diese Nachricht kommt direkt vom Backend',
            backend: 'Azure Functions',
            status: 'success'
        }
    };
};
