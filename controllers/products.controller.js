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

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    
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
   console.error("ERROR COMPLETO:");
   console.error(error);
   console.error("STACK:");
   console.error(error.stack);

   return res.status(500).json({
      message: "Error creando producto",
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