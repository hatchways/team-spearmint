const User = require("../models/User");
const Profile = require("../models/Profile");
const Request = require("../models/Request");

exports.createRequest = async (req, res, next) => {
    const { ownerId, sitterId } = req.body;

    const ownerExists = await User.findOne({ ownerId });
    if (!ownerExists) {
        res.status(400);
        throw new Error("Can't find any pet owner with this id");
    }

    const sitterExists = await User.findOne({ sitterId });
    if (!sitterExists) {
        res.status(400);
        throw new Error("Can't find any petsitter with this id");
    }

    const ownerProfile = await Profile.findOne({ userId: ownerId });
    const sitterProfile = await Profile.findOne({ userId: sitterId });
    req.body.ownerName = ownerProfile.name;
    req.body.sitterName = sitterProfile.name;
    const request = await Request.create(req.body);
    if (request) {
        res.status(201).json(request);
    } else {
        res.status(400);
        throw new Error("Invalid request data");
    }
};

exports.getRequests = async (req, res, next) => {
    const { userId } = req.body;

    const userExists = await User.findOne({ userId });
    if (!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    }

    const requests = await Request.find({ $or: [{ ownerId: userId }, { sitterId: userId }] });
    if (requests) {
        res.status(201).json(requests);
    }
};

exports.getSitterRequests = async (req, res, next) => {
    const { id } = req.params;

    const userExists = await User.findOne({ id });
    if (!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    }

    const requests = await Request.find({ sitterId: id });
    if (requests) {
        const sitterRequestsWithOwnerPhoto = await Promise.all(requests.map(async (request) => {
            const ownerProfile = await Profile.findOne({userId : request.ownerId});
            request.ownerPhoto = ownerProfile.photo;
            return request;
        }));
        res.status(201).json(sitterRequestsWithOwnerPhoto);
    }
};

exports.getOwnerRequests = async (req, res, next) => {
    const { userId } = req.body;

    const userExists = await User.findOne({ userId });
    if (!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    }

    const requests = await Request.find({ ownerId: userId });
    if (requests) {
        res.status(201).json(requests);
    }
};

exports.updateRequest = async (req, res, next) => {
    const { sitterId, requestId, accepted, declined, avatar } = req.body;

    const userExists = await User.findOne({ sitterId});
    if (!userExists) {
        res.status(400);
        throw new Error("Can't find any user with this id");
    }

    const requestUpdated = await Request.findOneAndUpdate({_id: requestId }, { accepted: accepted, declined: declined }, { new: true });
    if (requestUpdated) {
        requestUpdated.ownerPhoto = avatar;
        res.status(200).json(requestUpdated);
    } else {
        throw new Error("Couldn't update the request");
    }
};
