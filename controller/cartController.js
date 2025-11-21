import db from "../config/database.js"; 

export const addCartItems = (req, res) => {
  const { productId, quantity } = req.body;
  const adminId = req.admin.adminId; 

  if (!productId || !quantity) {
    return res.status(400).json({ status: false, message: "Product ID and quantity are required!" });
  }

  const query = `
    INSERT INTO cart (product_id, quantity, admin_id, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(query, [productId, quantity, adminId], (err, result) => {
    if (err) {
      console.error("Error adding to cart:", err);
      return res.status(500).json({ status: false, message: "Database error!" });
    }

    res.status(200).json({
      status: true,
      message: "Item added to cart successfully!",
      cartId: result.insertId,
    });
  });
};

export const getCartItems = (req, res) => {
  const adminId = req.admin.adminId;
  const query = 'SELECT c.product_id, c.quantity, p.name,p.img , p.price, p.description, p.id FROM  cart c INNER JOIN products p ON c.product_id = p.id WHERE c.admin_id = ? ';
  db.query(query, [adminId], (err, results) => {
    if (err) {
      res.status(500).json({ status: false, message: "Database error!" });
    }
    if (results.length == 0) {
      res.status(200).json({ status: true, message: "Cart is empty", cart: [] });
    }
    else{
      res.status(200).json({ status: true, cart: results });
    }
  })
}