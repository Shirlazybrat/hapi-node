'use strict';

module.exports = function(){
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
    // ======================== Routes for the API ==================
      // Define GET Routes
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
  
{ 
method: 'POST', 
path: '/api/user', 
config: { // "tags" enable swagger to document API 
	tags: ['api'], 
	description: 'Save user data', 
	notes: 'Save user data', 
	// We use Joi plugin to validate request 
	validate: { 
		payload: { 
		// Both name and age are required fields 
		name: Joi.string().required(), 
		age: Joi.number().required() 
		} 
	} 
}, handler: function (request, reply) { 
	// Create mongodb user object to save it into database 
	var user = new UserModel(request.payload); 
	// Call save methods to save data into database 
	// and pass callback methods to handle error 
	user.save(function (error) { 
		if (error) {
		 reply({ 
		 	statusCode: 503, 
		 	message: error 
		 }); 
		} 
		else {
		 reply({ 
		 	statusCode: 201, 
		 	message: 'User Saved Successfully' 
		 }); 
		} 
	}); 
} 
}
];
}();