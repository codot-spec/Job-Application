const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
createJob,
getJobs,
getJobById,
deleteJob,
updateJob,
getEmployerJobs
} = require("../controllers/jobController");

// Public
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected
router.post("/", auth, createJob);
router.delete("/:id", auth, deleteJob);

router.put("/:id",auth,updateJob);

router.get("/employer/my-jobs", auth, getEmployerJobs);

module.exports = router;