const User = require("../models/User");
const Profile = require("../models/Profile");
const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
    const { ownerId, sitterId, start, end, animalType, usefulInfo } = req.body;
    try {
        const ownerExists = await User.findOne({ ownerId });
        if (!ownerExists) return res.status(404).json({ message: "Owner doesn't exist" });

        const sitterExists = await User.findOne({ sitterId });
        if (!sitterExists) return res.status(404).json({ message: "Sitter doesn't exist" });

        const request = await Request.create(req.body);

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        await Request.updateMany(
            { start: { $lte: new Date() } },
            { $set: { status: 'completed' } }
        )

        const userProfile = await Profile.findOne({ userId: req.user.id });
        const typeOfAccount = userProfile.accountType;


        if (typeOfAccount === 'pet_sitter') {

            const requests = await Request.find({ sitterId: req.user.id }).lean();

            const requestsWithOwnerInfo = await Promise.all(
                requests.map(async (request) => {
                    console.log(request.ownerId.toString())
                    const ownerProfile = await Profile.findOne({ userId: request.ownerId.toString() });

                    request.ownerName = ownerProfile.name;
                    request.ownerPhoto = ownerProfile.photo;
                    return request;
                })
            );
            return res.status(200).json(requestsWithOwnerInfo);
        }
        if (typeOfAccount === 'pet_owner') {
            const requests = await Request.find({ ownerId: req.user.id }).lean();

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
        res.status(500).json({ message: error.message });
    }
};

exports.updateRequest = async (req, res) => {
    const { newStatus } = req.body;
    const { requestId } = req.params;

    try {
        const userExists = await User.findOne({ _id: req.user.id });
        if (!userExists) return res.status(404).json({ message: "User doesn't exist" });

        const theRequest = await Request.findOne({ _id: requestId });
        if (theRequest.sitterId.valueOf() !== req.user.id) return res.status(404).json({ message: "This sitter doesn't own this request" });

        theRequest.status = newStatus;
        await theRequest.save();

        res.status(200).json(theRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
