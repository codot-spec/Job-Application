const Application = require("../models/Application");
const Job = require("../models/Job");

// APPLY TO JOB
exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied",
      });
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

// GET MY APPLICATIONS (Applicant)
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

// GET APPLICANTS FOR A JOB (Employer)
exports.getApplicantsForJob = async (req, res) => {
  try {
    const apps = await Application.find({
      job: req.params.jobId,
    }).populate("applicant", "name email");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS (Employer)
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