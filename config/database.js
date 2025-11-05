import database from "mysql2";
const db = database.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "corvitdb",
});

db.connect((error) => {
  if (error) {
    console.log("connection error");
  } else {
    console.log("connection success");
  }
});
export default db;