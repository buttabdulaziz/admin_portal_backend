import db from "../config/database.js";
import jwt from "jsonwebtoken";
export const postAdmin = (req, res) => {
  const { email, pass } = req.body;

  const query = "SELECT * FROM admin WHERE email = ? AND `password` = ?";

  db.query(query, [email, pass], (err, result) => {
    if (result.length > 0) {
      const token = jwt.sign(
        {
          adminId : result[0].id,
          adminEmail : result[0].email
        } , 
        process.env.JWT_SECRET,
        {
          expiresIn : '1h'
        })


      res.json({
        status: "success",
        token : token,
        message: "Admin Loged In Successfully",
        admin: result[0],
      });
    } else {
      res.json({
        status: "failed",
        message: "Invalid Email or Password",
        admin: {},
      });
    }
  });
};
