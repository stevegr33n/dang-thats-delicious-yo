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
  tags: [String]
});

storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) { //use id's so slugs are unique
    return next() //stops the function from running 
  }
  this.slug = slug(this.name);
  next();
})

module.exports = mongoose.model('Store', storeSchema)
