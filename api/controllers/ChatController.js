/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = 
{

// checks if the message is from a socket or not?
	addConv:function (req,res) {

		var data_from_client = req.params.all();

//checks whether the request is from a socket and it is a POST
    if (req.isSocket && req.method === 'POST') {

        // This is the message from connected client
        // So add new conversation
              Chat.create(data_from_client)
                .exec(function(error, data_from_client) {
                    console.log(data_from_client);
                    Chat.publishCreate({ 
                    	id: data_from_client.id, 
                    	message: data_from_client.message,
                    	user: data_from_client.user
                    });
                });



    } else if (req.isSocket) {
        // subscribe client to model changes 

            Chat.watch(req.socket);
            console.log('User subscribed to ' + req.socket.id);

    }

	}
	
};

