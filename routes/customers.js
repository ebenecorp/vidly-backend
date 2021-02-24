const express = require("express");
const router = express.Router();
const connector = require('../database/customerConnector')
const Joi = require("joi");

router.get("/", async(req, res)=>{
    customers = await connector.getCustomers();

    res.send(customers)
});

router.post("/", async(req, res)=>{
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

     const result = await connector.createCustomer({
          name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone
        });
    res.send(result);

});

router.put("/:id", async(req, res) => {
    const { error } = validateCustomer(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const customer = await connector.updateCustomer(req.params.id,
        {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    if (!customer) return res.status(404).send("The Customer with the given ID was not found.");

    res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await connector.deleteCustomer(req.params.id);
  if (!customer)
    return res.status(404).send("The Customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await connector.getCustomer(req.params.id);
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found.");
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(10).required()
  };

  return Joi.validate(customer, schema);
}

module.exports = router;