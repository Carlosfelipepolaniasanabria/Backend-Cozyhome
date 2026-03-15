import { Products } from "../entity/products.entity.js";
import { ProductLog } from "../entity/product_log.entity.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { activo: true }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo productos",
      error: error.message
    });
  }
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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria } = req.body;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    await ProductLog.create({
      id_producto: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria,
      imagen: product.imagen,
      activo: product.activo,
      accion: "actualizacion"
    });

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
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    await ProductLog.create({
      id_producto: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria,
      imagen: product.imagen,
      activo: product.activo,
      accion: "eliminado"
    });

    product.activo = false;
    await product.save();

    return res.json({
      message: "Producto eliminado correctamente"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error eliminando producto",
      error: error.message
    });
  }
}

export const getProductImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findOne({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    return res.json({
      imagen: product.imagen
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo imagen del producto",
      error: error.message
    });
  }
};

export const getProductLogs = async (req, res) => {
  try {
    const logs = await ProductLog.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo historial de productos",
      error: error.message
    });
  }
};