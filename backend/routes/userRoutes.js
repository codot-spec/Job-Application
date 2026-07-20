const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


const {

getProfile,

updateProfile,

uploadResume,

saveJob,

getSavedJobs,

removeSavedJob

} = require("../controllers/userController");



router.get(
"/profile",
auth,
getProfile
);



router.put(
"/profile",
auth,
updateProfile
);



router.post(
"/upload-resume",
auth,
upload.single("resume"),
uploadResume
);

router.post(
"/save-job/:id",
auth,
saveJob
);



router.get(
"/saved-jobs",
auth,
getSavedJobs
);



router.delete(
"/save-job/:id",
auth,
removeSavedJob
);

module.exports = router;