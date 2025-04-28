const express = require("express");
const db = require("../db/db");
const router = express.Router();

// Get upcoming matches
router.get("/upcomingAdmin", (req, res) => {
  const query = "SELECT * FROM Matches WHERE matchDate >= CURDATE() ORDER BY matchDate ASC";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/upcoming", (req, res) => {
  const query = `
    SELECT 
      m.matchID, 
      m.matchDate, 
      t1.name AS team1Name, 
      t2.name AS team2Name, 
      t1.logoURL AS Logoteam1,
      t2.logoURL AS Logoteam2,
      m.result 
    FROM Matches m
    JOIN Teams t1 ON m.team1ID = t1.teamID
    JOIN Teams t2 ON m.team2ID = t2.teamID
    WHERE m.matchDate >= CURDATE()
    ORDER BY m.matchDate ASC
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Get past matches with results
router.get("/pastAdmin", (req, res) => {
  const query = "SELECT * FROM Matches WHERE matchDate < CURDATE() ORDER BY matchDate DESC";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/past", (req, res) => {
  const query = `
    SELECT 
      m.matchID, 
      m.matchDate, 
      t1.name AS team1Name, 
      t2.name AS team2Name, 
       t1.logoURL AS Logoteam1,
      t2.logoURL AS Logoteam2,
      m.result 
    FROM Matches m
    JOIN Teams t1 ON m.team1ID = t1.teamID
    JOIN Teams t2 ON m.team2ID = t2.teamID
    WHERE m.matchDate < CURDATE()
    ORDER BY m.matchDate DESC
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Add a match
router.post("/", (req, res) => {
    const { tournamentID, team1ID, team2ID, matchDate, result } = req.body;
    const query = "INSERT INTO Matches (tournamentID, team1ID, team2ID, matchDate, result) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [tournamentID, team1ID, team2ID, matchDate, result || null], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error adding match.");
      }
      res.send("Match added successfully.");
    });
  });
  
  
  // Delete a match
  router.delete("/:matchID", (req, res) => {
    const { matchID } = req.params;
    const query = "DELETE FROM Matches WHERE matchID = ?";
    db.query(query, [matchID], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Error deleting match.");
      }
      res.send("Match deleted successfully.");
    });
  });
  

// Update match result
router.put("/:matchID", (req, res) => {
  const { matchID } = req.params;
  const { result } = req.body;

  const query = "UPDATE Matches SET result = ? WHERE matchID = ?";
  db.query(query, [result, matchID], (err) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).send("Error updating match result.");
      }
      res.send("Match result updated successfully.");
  });
});




module.exports = router;
