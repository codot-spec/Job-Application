const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateStatus,
} = require("../controllers/applicationController");

// Applicant
router.post("/apply", auth, applyToJob);
router.get("/my", auth, getMyApplications);

// Employer
router.get("/job/:jobId", auth, getApplicantsForJob);
router.put("/:id", auth, updateStatus);

module.exports = router;