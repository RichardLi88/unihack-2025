// backend/schemas/classSchema.js

import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true, // unique within each offering
  },
  building: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: ["mon", "tue", "wed", "thu", "fri"],
  },
  time: {
    type: Number, // start time in 24h format
    required: true,
  },
  weeks: {
    type: String, // e.g. 101010101010 = odd weeks
    required: true,
  },
  attend_type: {
    type: String,
    required: true,
    enum: ["hybrid", "in-person", "online", "online-realtime"],
  },
});

export default classSchema;
