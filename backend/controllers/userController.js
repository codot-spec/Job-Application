const User = require("../models/User");
const s3 = require("../config/s3");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userObj = user.toObject();

    if (userObj.resume) {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: userObj.resume,
      });
      userObj.resume = await getSignedUrl(s3, command, { expiresIn: 900 });
    }

    res.json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.skills = req.body.skills || user.skills;

    await user.save();

    res.json({
      message: "Profile updated",
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      })
    );

    const user = await User.findById(req.user.id);
    user.resume = fileName;
    await user.save();

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    });
    const temporaryUrl = await getSignedUrl(s3, command, { expiresIn: 900 });

    res.json({ message: "Resume uploaded successfully", url: temporaryUrl });
  } catch (err) {
    res.status(500).json({ 
      message: err.message,
      stack: err.stack 
    });
  }
};

exports.saveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.savedJobs.includes(req.params.id)) {
      user.savedJobs.push(req.params.id);
      await user.save();
    }

    res.json({ message: "Job saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedJobs");
    res.json(user.savedJobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeSavedJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.savedJobs = user.savedJobs.filter(
      (job) => job.toString() !== req.params.id
    );

    await user.save();

    res.json({ message: "Job removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};