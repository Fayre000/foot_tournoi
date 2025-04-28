const bcrypt = require("bcrypt");
const mysql = require("mysql2");

// Connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SQLefrei2024!",
  database: "tournament_system",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

// Fonction pour hacher les mots de passe
const hashPasswords = async () => {
  try {
    const users = await query("SELECT userID, password FROM Users");

    const hashPromises = users.map(async (user) => {
      if (user.password.startsWith("$2b$")) {
        console.log(`Password already hashed for userID: ${user.userID}`);
        return;
      }
      else {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(`G`);
      return query("UPDATE Users SET password = ? WHERE userID = ?", [
        hashedPassword,
        user.userID,
      ]);
      }
      
    });

    await Promise.all(hashPromises);

    console.log("All passwords have been hashed successfully!");
  } catch (err) {
    console.error("Error hashing passwords:", err);
  } finally {
    db.end();
  }
};

// Promisify la fonction query
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Exécuter le script
hashPasswords();
