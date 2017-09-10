const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'please entah a store nem ma8te'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinnates!'
    }],
    address: {
      type: 'String',
      required: 'You must supply an adderess!!'
    }
  }
});

storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) { //use id's so slugs are unique
    return next() //stops the function from running 
  }
  this.slug = slug(this.name);
  next();
})

module.exports = mongoose.model('Store', storeSchema)
