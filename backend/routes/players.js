const express = require("express");
const router = express.Router();
const db = require("../db/db");

// Récupérer les joueurs d'une équipe spécifique via coachID
router.get("/", (req, res) => {
    const { coachID } = req.query;
  
    if (!coachID) {
      return res.status(400).send("Coach ID is required.");
    }
  
    const query = `
      SELECT p.playerID, p.name 
      FROM Players p 
      JOIN Teams t ON p.teamID = t.teamID
      WHERE t.coachID = ?
    `;
    console.log("Executing query:", query, "with coachID:", coachID); // Ajoute ceci
  
    db.query(query, [coachID], (err, results) => {
      if (err) {
        console.error("Error fetching players:", err);
        return res.status(500).send("Error fetching players.");
      }
      console.log("Query results:", results); // Ajoute ceci pour voir les résultats
      res.json(results);
    });
  });
  
  router.get("/all", (req, res) => {
    console.log("Route /players/all called");
    const query = "SELECT playerID, name FROM Players";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching players list:", err);
        return res.status(500).send("Error fetching players list.");
      }
      console.log("Players List Results:", results);
      res.json(results);
    });
  });
  
  

// Ajouter un joueur
router.post("/", (req, res) => {
  const { name, teamID } = req.body;

  if (!name || !teamID) {
    return res.status(400).send("Player name and teamID are required.");
  }

  const query = "INSERT INTO Players (name, teamID) VALUES (?, ?)";
  db.query(query, [name, teamID], (err) => {
    if (err) {
      console.error("Error adding player:", err);
      return res.status(500).send("Error adding player.");
    }
    res.send("Player added successfully.");
  });
});

// Supprimer un joueur
router.delete("/:playerID", (req, res) => {
  const { playerID } = req.params;

  if (!playerID) {
    return res.status(400).send("Player ID is required.");
  }

  const query = "DELETE FROM Players WHERE playerID = ?";
  db.query(query, [playerID], (err) => {
    if (err) {
      console.error("Error deleting player:", err);
      return res.status(500).send("Error deleting player.");
    }
    res.send("Player deleted successfully.");
  });
});

router.get("/:playerID", (req, res) => {
    const { playerID } = req.params;
    const query = `
      SELECT playerID, name, teamID, age, position, height, weight, performance 
      FROM Players 
      WHERE playerID = ?
    `;
  
    db.query(query, [playerID], (err, result) => {
      if (err) {
        console.error("Erreur lors de la récupération des informations du joueur :", err);
        return res.status(500).send("Erreur serveur");
      }
      if (result.length === 0) {
        return res.status(404).send("Joueur non trouvé");
      }
      res.json(result[0]);
    });
  });

 // Modifier la fiche technique d'un joueur
router.put("/:playerID", (req, res) => {
    const { playerID } = req.params;
    const { age, position, height, weight, performance } = req.body;
  
    const query = `
      UPDATE Players
      SET age = ?, position = ?, height = ?, weight = ?, performance = ?
      WHERE playerID = ?
    `;
  
    db.query(
      query,
      [age, position, height, weight, performance, playerID],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de la modification du joueur :", err);
          return res.status(500).send("Erreur serveur");
        }
        if (result.affectedRows === 0) {
          return res.status(404).send("Joueur non trouvé");
        }
        res.send("Fiche technique mise à jour avec succès !");
      }
    );
  });
  
  
  router.get("/profile/:username", (req, res) => {
    const { username } = req.params;
  
    const query = `
      SELECT 
        p.playerID,
        p.name AS playerName,
        p.age,
        p.position,
        p.height,
        p.weight,
        p.performance,
        t.name AS teamName,
        t.logoURL
      FROM Players p
      LEFT JOIN Teams t ON p.teamID = t.teamID
      WHERE p.name = ?`; // Recherche par nom (username)
  
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error("Error fetching player profile:", err);
        return res.status(500).send("Error fetching player profile.");
      }
      if (results.length === 0) {
        return res.status(404).send("Player not found.");
      }
      res.json(results[0]); // Retourner les informations du joueur
    });
  });
  
  
   

module.exports = router;
