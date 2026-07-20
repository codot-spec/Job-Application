const Application = require("../models/Application");
const Job = require("../models/Job");
const s3 = require("../config/s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      applicant: req.user.id,
    }).populate("job");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApplicantsForJob = async (req, res) => {
  try {
    const apps = await Application.find({
      job: req.params.jobId,
    }).populate("applicant", "name email resume");

    const updatedApps = await Promise.all(
      apps.map(async (app) => {
        const appObj = app.toObject();

        if (appObj.applicant && appObj.applicant.resume) {
          const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: appObj.applicant.resume,
          });
          appObj.applicant.resume = await getSignedUrl(s3, command, { expiresIn: 900 });
        }

        return appObj;
      })
    );

    res.json(updatedApps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const app = await Application.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    app.status = status;
    await app.save();

    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};