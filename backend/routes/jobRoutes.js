const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
createJob,
getJobs,
getJobById,
deleteJob,
updateJob
} = require("../controllers/jobController");

// Public
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected
router.post("/", auth, createJob);
router.delete("/:id", auth, deleteJob);

router.put("/:id",auth,updateJob);

module.exports = router;