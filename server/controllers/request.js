const User = require("../models/User");
const Profile = require("../models/Profile");
const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
    const { ownerId, sitterId, start, end, animalType, usefulInfo } = req.body;
    console.log(new Date());
    try {
        const ownerExists = await User.findOne({ ownerId });
        if (!ownerExists) return res.status(404).json({ message: "Owner doesn't exist" });

        const sitterExists = await User.findOne({ sitterId });
        if (!sitterExists) return res.status(404).json({ message: "Sitter doesn't exist" });

        const request = await Request.create(req.body);
        if (!request) return res.status(404).json({ message: "unable to create a new request" });

        res.status(200).json(request);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        const userProfile = await Profile.findOne({ userId: req.user.id});
        const typeOfAccount = userProfile.accountType;

        if(typeOfAccount === 'pet_sitter') {
            const requests = await Request.find({ sitterId: req.user.id }).lean();
            if (!requests) return res.status(404).json({ message: "Something went wrong!!!" });

            const requestsWithOwnerInfo = await Promise.all(
                requests.map(async (request) => {
                    const ownerProfile = await Profile.findOne({ userId: request.ownerId });
                    request.ownerName = ownerProfile.name;
                    request.ownerPhoto = ownerProfile.photo;
                    return request;
                })
            );
            return res.status(200).json(requestsWithOwnerInfo);
        }
        if(typeOfAccount === 'pet_owner') {
            const requests = await Request.find({ ownerId: req.user.id }).lean();
            if (!requests) return res.status(404).json({ message: "Something went wrong!!!" });

            const requestsWithSitterInfo = await Promise.all(
                requests.map(async (request) => {
                    const sitterProfile = await Profile.findOne({ userId: request.sitterId });
                    request.sitterName = sitterProfile.name;
                    request.sitterPhoto = sitterProfile.photo;
                    return request;
                })
            );
            return res.status(200).json(requestsWithSitterInfo);
        }
            
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateRequest = async (req, res) => {
    const { requestId, newStatus } = req.body;

    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        const theRequest = await Request.findOne({ _id: requestId });
        if(theRequest.sitterId.valueOf() !== req.user.id) return res.status(404).json({ message: "This sitter doesn't own this request" });

        const requestUpdated = await Request.findOneAndUpdate({ _id: requestId }, { status: newStatus }, { new: true });
        if (!requestUpdated) return res.status(404).json({ message: "Something went wrong!!!" });

        res.status(200).json(requestUpdated);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
