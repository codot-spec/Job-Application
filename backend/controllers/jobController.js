const Job = require("../models/Job");


exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "company");

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "createdBy",
      "company"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJob = async(req,res)=>{

try{

const job =
await Job.findById(req.params.id);


if(!job){

return res.status(404).json({
message:"Job not found"
});

}


if(job.createdBy.toString() !== req.user.id){

return res.status(403).json({
message:"Not allowed"
});

}


Object.assign(job,req.body);


await job.save();


res.json(job);


}
catch(err){

res.status(500).json({
message:err.message
});

}

};

exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};