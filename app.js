'use strict';

// ========================Base setup ==================
// Include Hapi
const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');


const routes = require('./routes/routes.js'); //require routes.js

//create server
const server = new Hapi.Server();

// Importing `user` model from `models/user.js` file 
const UserModel = require('./models/user'); 

// Define port
server.connection({
	port: 7002
});

server.route(routes); //add routes

const options = {
    info: {
            'title': 'Node-Hapi Practice App',
            'version': Pack.version,
        }
    };

//Register Swagger plugin ( use for documentation and testing purposes)
server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    }], (err) => {
        server.start( (err) => {
           if (err) {
                console.log(err);
            } 
            else {
                console.log('Server running at:', server.info.uri);
            }
        });
    });

// ======================== Start the sevrver ==================
server.start(function(){
	console.log('Server running at : ' + server.info.uri);
});
