import { Products } from "../entity/products.entity.js";

export const getProducts = async (req, res) => {
  const products = await Products.findAll({
    where: { activo: true }
  });
  res.json(products);
};

export const createProduct = async (req, res) => {
  try {


    console.log("BODY:", req.body);
    console.log("FILE:", req.file); 

    const { nombre, descripcion, precio, categoria } = req.body;

    const product = await Products.create({
      nombre,
      descripcion,
      precio,
      categoria,
      imagen,
      activo: true
    });

    res.status(201).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el producto",
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
