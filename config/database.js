import database from "mysql2";
const db = database.createConnection({
  host:process.env.HOST,
  user:process.env.DBUSER,
  password:process.env.DBPASSWORD,
  database:process.env.DBNAME,
});

db.connect((error) => {
  if (error) {
    console.log("connection error");
  } else {
    console.log("connection success");
  }
});
export default db;