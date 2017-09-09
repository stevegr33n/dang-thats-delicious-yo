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
  res.render('stores', { title: 'Stores', stores: stores});
};

exports.editStore = async (req, res) => {
  const store = await Store.findOne({_id: req.params.id});
  // res.json(store)
  console.log(store)
  // find the store given the id
  // confirm they are the owner of the store
  // render out the edit form so the user can edit it
  res.render('editStore', { title: `Edit ${store.name}`, store: store});
}

exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the updated store instead of the old one
    runValidators: true,
  }).exec();
  req.flash('success', `Sicessfully updated ${store.name}.
  a href="/stores/${store.slug}">View Store -></a>`);
  res.redirect(`/stores/${store._id}/edit`);
}

