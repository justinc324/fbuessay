'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ 
    port: process.env.PORT || 8000, 
    host: process.env.HOST || '0.0.0.0' });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('fbu.html');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/fbu',
        handler: function (request, reply) {
            reply.file('./public/fbu.html');
        }
    });
});
