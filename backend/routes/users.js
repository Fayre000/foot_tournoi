const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)";
    db.query(query, [username, hashedPassword, role], (err) => {
        if (err) throw err;
        res.status(201).send("User registered successfully.");
    });
});

// User login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM Users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
      if (err) throw err;
      if (results.length === 0) return res.status(404).send("User not found.");

      const user = results[0];
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(403).send("Invalid credentials.");

      // Normaliser le rôle
      const normalizedRole = user.role === "Administrator" ? "admin" : user.role;

      const token = jwt.sign(
          { userID: user.userID, role: normalizedRole, username: user.username },
          "secretkey"
      );
      res.json({ token, userID: user.userID, username: user.username, role: normalizedRole });
  });
});

  

// Récupérer tous les utilisateurs ayant le rôle 'Coach'
router.get("/coaches", (req, res) => {
    const query = "SELECT userID, username FROM Users WHERE role = 'Coach'";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching coaches:", err);
        return res.status(500).send("Error fetching coaches.");
      }
      res.json(results);
    });
  });
  


  router.post("/reset-password", async (req, res) => {
    const { username, newPassword } = req.body;
  
    if (!username || !newPassword) {
      return res.status(400).send("Username and new password are required.");
    }
  
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const query = "UPDATE Users SET password = ? WHERE username = ?";
      db.query(query, [hashedPassword, username], (err) => {
        if (err) {
          console.error("Error resetting password:", err);
          return res.status(500).send("Error resetting password.");
        }
        res.send(`Password reset successfully for user: ${username}`);
      });
    } catch (err) {
      console.error("Error during password reset:", err);
      res.status(500).send("Server error.");
    }
  });
  

  router.post("/hash-passwords", async (req, res) => {
    try {
      const users = await query("SELECT userID, password FROM Users");
  
      const hashPromises = users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return query("UPDATE Users SET password = ? WHERE userID = ?", [
          hashedPassword,
          user.userID,
        ]);
      });
  
      await Promise.all(hashPromises);
  
      res.send("All passwords have been hashed successfully!");
    } catch (err) {
      console.error("Error hashing passwords:", err);
      res.status(500).send("Error hashing passwords.");
    }
  });
  
  // Fonction utilitaire pour exécuter des requêtes
  const query = (sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
  


module.exports = router;
