import { Sale } from "../entity/sale.entity.js";
import { SaleDetail } from "../entity/saleDetail.entity.js";

export const createSale = async (req, res) => {
  try {
    const { identificacion_usuario, cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }

    const total = cart.reduce(
      (sum, p) => sum + Number(p.precio) * Number(p.cantidad),
      0
    );

    const sale = await Sale.create({
      identificacion_usuario,
      total,
      estado: "pendiente",
    });

    for (const p of cart) {
      await SaleDetail.create({
        id_sale: sale.id_sale,
        id_producto: p.id,
        nombre_producto: p.nombre,
        imagen: p.imagen,
        precio: p.precio,
        cantidad: p.cantidad,
      });
    }

    res.status(201).json({
      message: "Venta creada correctamente",
      id_sale: sale.id_sale,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la venta" });
  }
};

export const getSalesByUser = async (req, res) => {
  try {
    const { identificacion } = req.params;

    const sales = await Sale.findAll({
      where: { identificacion_usuario: identificacion },
      include: [{ model: SaleDetail, as: "detalles" }],
      order: [["fecha", "DESC"]],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSaleStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    await Sale.update({ estado }, { where: { id_sale: id } });
    res.json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [{ model: SaleDetail, as: "detalles" }],
      order: [["fecha", "DESC"]],
    });

    
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


