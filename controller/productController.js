import db from "../config/database.js";

export const getProducts = (req, res) => {
  db.query("SELECT * FROM products WHERE deleted_at IS NULL", (err, result) => {
    res.json({ status: true, message: "All Products Data", products: result });
  });
};

export const postProduct = (req, res) => {
  const { name, price, description, sku, stock, img } = req.body;
  const query =
    "INSERT INTO products (name, price, description, sku, stock, img, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())";
  db.query(
    query,
    [name, price, description, sku, stock, img],
    (err, result) => {
      if (err) {
              console.log("❌ DB Error:", err); // <-- IMPORTANT

        return res.status(500).json({ status: false, error: "Database Error" });
      }
      res.json({ message: "Product Added Successfully", status: true });
    }
  );
};

export const deleteProduct = (req, res) => {
  console.log("Delete API hit, ID:", req.params.id, "User:", req.user); // Debug log

  const { id } = req.params;
  const query = `UPDATE products SET deleted_at = NOW() WHERE id=? AND deleted_at IS NULL`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err); // log SQL error
      return res.status(500).json({ status: false, message: "DB Error" });
    }

    if (result.affectedRows === 0) {
      return res.json({ status: false, message: "Product Not Found or Already Deleted" });
    }

    res.json({ status: true, message: "Product Deleted" });
  });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description, sku, stock, img } = req.body;
  const query =
    "UPDATE products SET name=?, price=?, description=?, sku=?, stock=?, img=? , updated_at=NOW() WHERE id=? AND deleted_at IS NULL";
  db.query(
    query,
    [name, price, description, sku, stock, img, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ status: false, error: "Database Error" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ status: false, message: "Product Not Found or Deleted" });
      }
      res.json({ message: "Product Updated Successfully", status: true });
    }
  );
}

export const getProductById = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM products WHERE id=? AND deleted_at IS NULL";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json(data[0]);
  });
};

export const uploadImage = (req, res) => {
  const {productId} = req.body;
  const imagePath = 'upload/products/'+req.file.filename;
  const query = "UPDATE products SET img=? WHERE id=?";
  db.query(query, [imagePath, productId], (err, result) => {
    if (err) {
      return res.status(500).json({ status: false, error: "Database Error" });
    }
    res.json({ message: "Image Uploaded Successfully", status: true, imagePath: imagePath });
  });
}
