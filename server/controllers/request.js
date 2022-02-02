const User = require("../models/User");
const Request = require("../models/Request");

exports.createRequest = async(req, res, next) => {   
    const { user_id, sitter_id } = req.body;
    // Check if owner exists
    const userExists = await User.findOne({user_id});
    if(!userExists){
        res.status(400);
        throw new Error("Can't find any pet owner with this id");
    }

    //check if sitter exists
    const sitterExists = await User.findOne({sitter_id});
    if(!sitterExists){
        res.status(400);
        throw new Error("Can't find any petsitter with this id")
    }

    //create a Request Document and send it if data is valid
    const request = await Request.create(req.body);
    if(request) {
        res.status(201).json(request);
    } else {
        res.status(400);
        throw new Error("Invalid request data");
    }
};

exports.getRequests = async(req, res, next) => {
    const { userId }  = req.body;

    //check if the user exists
    const userExists = await User.findOne({userId});
    if(!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    }

    // find all the request documents as owner or sitter
    const requests = await Request.find({ $or: [{user_id: userId}, {sitter_id: userId}]});
    if(requests) {
        res.status(201).json(requests);
    };
};

exports.updateRequest = async(req, res, next) => {
    const { userId, requestId, accepted, declined }  = req.body;

    //check if the user exists
    const userExists = await User.findOne({userId});
    if(!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    };

    //find a request document with the requestId && the userId and update accepted and declined properties
    const requestUpdated = await Request.findOneAndUpdate(
        {sitter_id: userId, _id: requestId},
        { accepted: accepted, declined: declined },
        { new: true}
    );
    if(requestUpdated) {
        res.status(200).json(requestUpdated);
    } else {
        throw new Error("Couldn't update the request");
    };
};