const express = require("express");
const db = require("../db/db");
const fileUpload = require("express-fileupload");
const path = require("path"); // Import correct de path
const router = express.Router();

// Get all teams
router.get("/", (req, res) => {
    db.query("SELECT * FROM Teams", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new team
router.post("/", (req, res) => {
    const { name, coachID } = req.body;
    db.query("INSERT INTO Teams (name, coachID) VALUES (?, ?)", [name, coachID], (err) => {
        if (err) throw err;
        res.send("Team added successfully.");
    });
});

// Add a new team
router.post("/", (req, res) => {
    const { name, coachID } = req.body;
    const query = "INSERT INTO Teams (name, coachID) VALUES (?, ?)";
    db.query(query, [name, coachID], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error adding team.");
      }
      res.send("Team added successfully.");
    });
  });
  
  // Delete a team
  router.delete("/:teamID", (req, res) => {
    const { teamID } = req.params;
  
    // Requêtes pour supprimer les dépendances liées
    const deleteStandings = "DELETE FROM Standings WHERE teamID = ?";
    const deleteMatches = "DELETE FROM Matches WHERE team1ID = ? OR team2ID = ?";
    const deletePlayers = "DELETE FROM Players WHERE teamID = ?";
    const deleteTeam = "DELETE FROM Teams WHERE teamID = ?";
  
    // Exécuter les requêtes dans l'ordre
    db.query(deleteStandings, [teamID], (err) => {
      if (err) {
        console.error("Error deleting from Standings:", err);
        return res.status(500).send("Error deleting team standings.");
      }
  
      db.query(deleteMatches, [teamID, teamID], (err) => {
        if (err) {
          console.error("Error deleting from Matches:", err);
          return res.status(500).send("Error deleting team matches.");
        }
  
        db.query(deletePlayers, [teamID], (err) => {
          if (err) {
            console.error("Error deleting from Players:", err);
            return res.status(500).send("Error deleting team players.");
          }
  
          // Enfin, supprimer l'équipe
          db.query(deleteTeam, [teamID], (err) => {
            if (err) {
              console.error("Error deleting team:", err);
              return res.status(500).send("Error deleting team.");
            }
            res.send("Team and all related data deleted successfully.");
          });
        });
      });
    });
  });
  
  
// Mettre à jour le coach d'une équipe
router.put("/:teamID", (req, res) => {
  const { teamID } = req.params;
  const { coachID } = req.body;

  if (!coachID) {
    return res.status(400).send("Coach ID is required.");
  }

  const query = "UPDATE Teams SET coachID = ? WHERE teamID = ?";
  db.query(query, [coachID, teamID], (err) => {
    if (err) {
      console.error("Error updating coach:", err);
      return res.status(500).send("Error updating coach.");
    }
    res.send("Coach updated successfully.");
  });
});

// Récupérer l'équipe associée à un coach
router.get("/coach/:coachID/team", (req, res) => {
  const { coachID } = req.params;
  const query = "SELECT teamID, name FROM Teams WHERE coachID = ?";
  db.query(query, [coachID], (err, results) => {
    if (err) {
      console.error("Error fetching team for coach:", err);
      return res.status(500).send("Error fetching team for coach.");
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("No team found for this coach.");
    }
  });
});


router.post("/upload-logo/:teamID", (req, res) => {
  const { teamID } = req.params;

  if (!req.files || !req.files.logo) {
    console.log("No file uploaded."); // Debug
    return res.status(400).send("No file uploaded.");
  }

  const logoFile = req.files.logo;
  console.log("Received file:", logoFile.name);

  // Définir le chemin pour sauvegarder le fichier
  const uploadPath = path.join(__dirname, "../uploads", `${teamID}_${logoFile.name}`);
  console.log("Upload path:", uploadPath);

  // Sauvegarder le fichier
  logoFile.mv(uploadPath, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).send("Error saving file.");
    }

    // Mettre à jour le logoURL dans la base de données
    const logoURL = `/uploads/${teamID}_${logoFile.name}`;
    const query = "UPDATE Teams SET logoURL = ? WHERE teamID = ?";
    db.query(query, [logoURL, teamID], (err) => {
      if (err) {
        console.error("Error updating database:", err);
        return res.status(500).send("Error updating logo.");
      }
      res.send("Logo uploaded successfully!");
    });
  });
});


module.exports = router;
