import db from "../config/database.js";    

export const UserRegister = (req, res) => {
  const { name, email, pass, dob, gender, address, ph_number } = req.body;

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, result) => {
    if (result.length > 0) {
      return res.json({ status: false, error: "Email already exists" });
    }else{
      const query =
    "INSERT INTO users (name, email, password, dob, gender, address, phone_no, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";

  db.query(
    query,
    [name, email, pass, dob, gender, address, ph_number],
    (err, result) => {
      if (err) {
        return res.status(500).json({ status: false, error: "Database Error" });
      }
      res.json({ message: "Registration Successful", status: true });
    }
  );
    }
  });

  
}

export const userLogin = (req, res) => {
  const { email, pass } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND `password` = ?";

  db.query(query, [email, pass], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database Error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    res.json({ message: "Login successful", status: true, user: result[0] });
  });
}