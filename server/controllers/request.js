const User = require("../models/User");
const Request = require("../models/Request");

exports.createRequest = async(req, res, next) => {   
    const { userId, sitterId } = req.body;
    
    const userExists = await User.findOne({userId});
    if(!userExists){
        res.status(400);
        throw new Error("Can't find any pet owner with this id");
    }

    const sitterExists = await User.findOne({sitterId});
    if(!sitterExists){
        res.status(400);
        throw new Error("Can't find any petsitter with this id")
    }

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

    const userExists = await User.findOne({userId});
    if(!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    }

    const requests = await Request.find({ $or: [{userId: userId}, {sitterId: userId}]});
    if(requests) {
        res.status(201).json(requests);
    };
};

exports.updateRequest = async(req, res, next) => {
    const { userId, requestId, accepted, declined }  = req.body;

    const userExists = await User.findOne({userId});
    if(!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    };

    const requestUpdated = await Request.findOneAndUpdate(
        {sitterId: userId, _id: requestId},
        { accepted: accepted, declined: declined },
        { new: true}
    );
    if(requestUpdated) {
        res.status(200).json(requestUpdated);
    } else {
        throw new Error("Couldn't update the request");
    };
};