const mongoose = require('mongoose');

const lastStateSchema = new mongoose.Schema({
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
    values:{
      type: Array,
      required: true,
      default: [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]]            
    },
    emptyX: {
      type: Number,
      required: true,
      default: 3
    },
    emptyY: {
      type: Number,
      required: true,
      default: 3
    }
  });
  
  const LastState = mongoose.model('LastState', lastStateSchema, 'laststate')

  module.exports = LastState;