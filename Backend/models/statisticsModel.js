const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    minutes: {
      type: Number,
      required: true,
      default: 0
    },
    seconds: {
      type: Number,
      required: true,
      default: 0
    },
    moves: {
      type: Number,
      required: true,
      default: 0
    },
    timestamp:{
      type: String,
      required: true
    },
    userid:{
      type: Number,
      required: true,
      default: 1
    }
  });
  
  const Statistics = mongoose.model('Statistics', statisticsSchema, 'statistics')

  module.exports = Statistics;