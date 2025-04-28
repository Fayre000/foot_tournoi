const express = require("express");
const db = require("../db/db");
const router = express.Router();

// Get tournament standings

router.get("/", (req, res) => {
  const query = `
    SELECT 
      t.teamID,
      t.name AS teamName,
      t.logoURL, -- Ajout de la colonne logoURL
      s.tournamentID,
      COALESCE(s.points, 0) AS points,
      COALESCE(s.ranks, 0) AS ranks,
      COUNT(CASE WHEN m.result IS NOT NULL THEN m.matchID END) AS matchesPlayed,
      COALESCE(
        SUM(
          CASE 
            WHEN m.team1ID = t.teamID THEN SUBSTRING_INDEX(m.result, '-', 1) - SUBSTRING_INDEX(m.result, '-', -1)
            WHEN m.team2ID = t.teamID THEN SUBSTRING_INDEX(m.result, '-', -1) - SUBSTRING_INDEX(m.result, '-', 1)
            ELSE 0
          END
        ), 0
      ) AS goalAverage
    FROM Teams t
    LEFT JOIN Matches m ON t.teamID = m.team1ID OR t.teamID = m.team2ID
    LEFT JOIN Standings s ON t.teamID = s.teamID
    GROUP BY t.teamID, t.name, t.logoURL, s.tournamentID, s.points, s.ranks
    ORDER BY s.ranks ASC, t.name ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching standings:", err);
      return res.status(500).send("Error fetching standings.");
    }
    res.json(results);
  });
});



// Update standings
router.put("/:teamID", (req, res) => {
  const { teamID } = req.params;
  const { points } = req.body;

  console.log("Received request to update teamID:", teamID);
  console.log("New points:", points);

  const query = "UPDATE Standings SET points = ? WHERE teamID = ?";
  db.query(query, [points, teamID], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Error updating standings.");
    }
    res.send("Standings updated successfully.");
  });
});

// Ajouter une équipe au classement
router.post("/add-team", (req, res) => {
  console.log("Requête reçue pour ajouter une équipe :", req.body);
  const { teamID, tournamentID } = req.body;
  if (!teamID || !tournamentID) {
    return res.status(400).send("teamID et tournamentID sont requis.");
  }

  // Vérifiez que l'équipe existe
  const checkTeamQuery = "SELECT * FROM Teams WHERE teamID = ?";
  db.query(checkTeamQuery, [teamID], (err, teamResults) => {
    if (err) return res.status(500).send("Erreur lors de la vérification de l'équipe.");
    if (teamResults.length === 0) return res.status(404).send("Équipe introuvable.");

    // Ajoutez l'équipe au classement
    const addToStandingsQuery = `
      INSERT INTO Standings (teamID, tournamentID, points)
      VALUES (?, ?, 0)
    `;
    db.query(addToStandingsQuery, [teamID, tournamentID], (err) => {
      if (err) {
        console.error("Erreur lors de l'ajout au classement :", err);
        return res.status(500).send("Erreur lors de l'ajout au classement.");
      }
      res.send("Équipe ajoutée au classement avec succès.");
    });
  });
});

router.put("/update-ranks/:tournamentID", (req, res) => {
  const { tournamentID } = req.params;



  console.log("Received tournamentID:", tournamentID);

  if (!tournamentID || tournamentID === "null") {
    console.error("Invalid tournamentID:", tournamentID);
    return res.status(400).send("Invalid tournamentID.");
  }
  if (!tournamentID || tournamentID === "null") {
    return res.status(400).send("Invalid tournamentID.");
  }

  const createTempTableQuery = `
  CREATE TEMPORARY TABLE TempRanks AS
  SELECT 
    teamID, 
    points, 
    tournamentID,
    ROW_NUMBER() OVER (PARTITION BY tournamentID ORDER BY points DESC, teamID ASC) AS newRank
  FROM Standings
  WHERE tournamentID = ?;
  `;

  const updateRanksQuery = `
  UPDATE Standings s
  JOIN TempRanks t 
    ON s.teamID = t.teamID AND s.tournamentID = t.tournamentID
  SET s.ranks = t.newRank;
  `;

  const dropTempTableQuery = `DROP TEMPORARY TABLE TempRanks;`;

  db.query(createTempTableQuery, [tournamentID], (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table temporaire :", err);
      return res.status(500).send("Erreur lors de la mise à jour des ranks.");
    }

    db.query(updateRanksQuery, (err) => {
      if (err) {
        console.error("Erreur lors de la mise à jour des ranks :", err);
        return res.status(500).send("Erreur lors de la mise à jour des ranks.");
      }

      db.query(dropTempTableQuery, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de la table temporaire :", err);
          return res.status(500).send("Erreur lors de la mise à jour des ranks.");
        }

        res.send("Ranks mis à jour avec succès !");
      });
    });
  });
});




module.exports = router;
