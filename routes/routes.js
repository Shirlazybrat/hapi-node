'use strict';

const Joi = require('joi');

module.exports = function(){
  const url = "";
  const user = [
    {
      name: 'Shirlette',
      age: 31
    },
    {
      name: 'Tammara',
      age: 30
    },
    {
      name: 'Candice',
      age: 34
    }
  ]
  return [
// ======================== Routes for the API (in an array) ==================
// Define GET Routes

//Get user data
      {
      method: 'GET',  //method type
      path: '/user/', //Url
      config: {
        // Include this API in swagger documentation
        description: 'Get All User Data',
        notes: 'Get all user data from database',
        tags: ['api']
      },
      handler: function(request, reply){ //action
        // Response JSON object
        reply({'user':user, 'responseCode':0});
      }
  },

//Get User ID ( if available)
  {
    method: 'GET',
    path: '/user/{id}',
    config: {
      handler: function(request, reply){
        if (store.length <= request.params.id){
          return reply({message:"user does not exist", responseCode: 1}).code(404);
        }
        reply({'user':user[request.params.id], 'responseCode':0})
      }
    }
  },

//Post new user into dataset
  {
    method: 'POST',
    path: '/user/',
    config: {
      //tags to enable swagger to document API
      tags: ['api'],
      description: 'Add a new user',
      notes: 'Add a new user',
      //Use joi plugin to validate request
      validate: {
        payload: {
          //Both name and age are required fields
          name: Joi.string(),
          age: Joi.number()
        }
      }
      },
      handler: function(request,reply){
      reply({message:'Successfully added the new user', responseCode:0});
    }
  },

//Delete a user from the array
  {
    method: 'DELETE',
    path: '/user/{id}',
    config: {
      handler: function(request, reply){
        if(user.length <= request.params.id){
          return({message:'User does not exist', responseCode:1}).code(404);
        }
        user.splice(request.params.id, 1);
        reply({message:'Successfully deleted ${request.params.id}',responseCode: 0});
        }
      } 
    },

    {
      method: 'PUT',
      path: '/user/{id}',
      config: {
        handler: function(request, reply){
          user.push({
            id: request.payload.id
          });
        },
        validate: {
          payload: {  //to validate payload
            name: Joi.string(),
            age: Joi.number()
          },
          params: {
            id: Joi.number().integer().min(1).max(100)
          },
          query: {
            //to validate query params
          }
        }
      }
    }
  ];
}();

