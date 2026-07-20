const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["applicant", "employer"],
      required: true,
    },

    name: {
      type: String,
    },

    company: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    website: {
      type: String,
    },

    resume: {
      type: String,
      default: "",
    },
    savedJobs: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);