const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: { type: String, required: true },
  phone: { type: String, minlength: 10 },
});

const Customer = mongoose.model("Customer", customerSchema);

getCustomers = async () => {
  return await Customer.find();
};

getCustomer = async (id) => {
  return await Customer.findById(id);
};

createCustomer = async (customer) => {
  const newCustomer = new Customer(customer);

  return await newCustomer.save();
};

updateCustomer = async (id, customer) => {
  return await Customer.findByIdAndUpdate(
    id,
    {
      $set: {
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
    },
    { new: true }
  );
};

deleteCustomer = async id =>{
  return await Customer.findByIdAndRemove(id);
};

module.exports.getCustomer = getCustomer;
module.exports.getCustomers = getCustomers;
module.exports.createCustomer = createCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.deleteCustomer = deleteCustomer;