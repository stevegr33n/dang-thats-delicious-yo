const mongoose = require('mongoose');
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
  res.render('index')
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store'});
}

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  console.log('works')
  req.flash('success', `Successfilly Created ${store.name}. Leave a revoow?`);
  res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
  // make query to get list of all stores
  // gotta be an async call to catch errors
  const stores = await Store.find();
  console.log(stores);
  res.render('stores', { title: 'Stores', stores: stores});
};


