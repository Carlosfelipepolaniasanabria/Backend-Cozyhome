import { Products } from "../entity/products.entity.js";

import { Products } from "../entity/products.entity.js";

export const getProducts = async (req, res) => {
  const products = await Products.findAll({
    where: { activo: true }
  });
  res.json(products);
};

export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const product = await Products.create({
      nombre,
      descripcion,
      precio,
      categoria,
      imagen: imageUrl,
      activo: true
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creando producto",
      error: error.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria } = req.body;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.nombre = nombre ?? product.nombre;
    product.descripcion = descripcion ?? product.descripcion;
    product.precio = precio ?? product.precio;
    product.categoria = categoria ?? product.categoria;

    if (req.file) {
      product.imagen = req.file.path;
    }

    await product.save();

    return res.json({
      message: "Producto actualizado correctamente",
      product
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error actualizando producto",
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await Products.update(
    { activo: false },
    { where: { id } }
  );

  res.json({ message: "Producto eliminado" });
};

export const getProductImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findOne({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json({
      imagen: product.imagen
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo imagen del producto" });
  }
};