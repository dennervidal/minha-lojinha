const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
  async index(req, res) {
    try {
      const { page = 1, category = null, search = "", user = "" } = req.query;
      const products = await Product.paginate(
        category
          ? { category }
          : {
              title: { $regex: search, $options: "i" },
              seller: { $regex: user, $options: "i" },
            },
        {
          page,
          limit: 10,
        }
      );

      return res.json(products);
    } catch (e) {
      return res.json(e);
    }
  },

  async show(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      return res.json(product);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.json(product);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  async destroy(req, res) {
    try {
      await Product.findByIdAndRemove(req.params.id);

      return res.send({ message: "Product removed" });
    } catch (e) {
      return res.status(500).send(e);
    }
  },

  async store(req, res) {
    try {
      const product = await Product.create(req.body);

      return res.json(product);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
