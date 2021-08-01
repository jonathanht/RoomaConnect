const mongoose = require("mongoose");

const ThirdPartyProviderSchema = new mongoose.Schema({
    provider_name: {
        type: String,
        default: null
    },
    
    provider_id: {
        type: String,
        default: null
    },

    provider_data: {
        type: {},
        default: null
    },
})


const roommateSchema = new mongoose.Schema({
    name: String,
    password: String,
    room: String,
    tags: Array,
    third_party_auth: [ThirdPartyProviderSchema],
    date: {
        type: Date,
        default: Date.now
    }
  },
  {strict: false}
  );

module.exports = Roommate = mongoose.model("roommates", roommateSchema);