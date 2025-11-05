import db from "../config/database.js";

export const addToCart = (req, res) => {
    const user_id = req.user.id;
    const { product_id, qty } = req.body;

    const query = `
        INSERT INTO cart (user_id, product_id, qty)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE qty = qty + ?`;

    db.query(query, [user_id, product_id, qty, qty], (err) => {
        if (err) return res.status(500).json({ status: false, message: "DB Error" });

        return res.json({ status: true, message: "Product added to cart" });
    });
};

export const getCart = (req, res) => {
    const user_id = req.user.id;

    const query = `
        SELECT c.id, c.qty, p.name, p.price, p.img 
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?`;

    db.query(query, [user_id], (err, result) => {
        if (err) return res.status(500).json({ status: false });

        return res.json({ status: true, cart: result });
    });
};

export const removeFromCart = (req, res) => {
    const user_id = req.user.id;
    const { productId } = req.params;

    const query = `DELETE FROM cart WHERE user_id=? AND product_id=?`;

    db.query(query, [user_id, productId], (err) => {
        if (err) return res.status(500).json({ status: false });

        res.json({ status: true, message: "Removed from cart" });
    });
};
