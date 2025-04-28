<template>
  <div class="dashboard-page">
    <!-- Gestion des matchs -->
    <section class="manage-matches">
      <h2>Manage Matches</h2>
      <form @submit.prevent="addMatch" class="form">
        <input v-model.number="tournamentID" placeholder="Tournament ID" type="number" required />
        <select v-model="team1ID" required>
          <option disabled value="">Select Team 1</option>
          <option v-for="team in teams" :key="team.teamID" :value="team.teamID">
            {{ team.name }}
          </option>
        </select>
        <select v-model="team2ID" required>
          <option disabled value="">Select Team 2</option>
          <option v-for="team in teams" :key="team.teamID" :value="team.teamID">
            {{ team.name }}
          </option>
        </select>
        <input v-model="matchDate" placeholder="Match Date (YYYY-MM-DD)" required />
        <button type="submit">Add Match</button>
      </form>
      <ul>
        <li v-for="match in pastmatches" :key="match.matchID" class="match-card">
          <div class="match-details">
            <span class="teams">{{ match.team1Name }} vs {{ match.team2Name }}</span>
            <span class="date">{{ formatDate(match.matchDate) }}</span>
          </div>
          <div class="match-actions">
            <input v-model="match.newResult" placeholder="New Result" />
            <button @click="updateMatchResult(match.matchID, match.newResult)">Update</button>
            <button @click="deleteMatch(match.matchID)" class="delete">Delete</button>
          </div>
        </li>
        <li v-for="match in upcomingmatches" :key="match.matchID" class="match-card">
          <div class="match-details">
            <span class="teams">{{ match.team1Name }} vs {{ match.team2Name }}</span>
            <span class="date">{{ formatDate(match.matchDate) }}</span>
          </div>
          <div class="match-actions">
            <input v-model="match.newResult" placeholder="New Result" />
            <button @click="updateMatchResult(match.matchID, match.newResult)">Update</button>
            <button @click="deleteMatch(match.matchID)" class="delete">Delete</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";

export default {
  setup() {
    return { store };
  },
  data() {
    return {
      teams: [],
      upcomingmatches: [],
      pastmatches: [],
      tournamentID: null,
      team1ID: null,
      team2ID: null,
      matchDate: "",
    };
  },
  methods: {
    formatDate(dateString) {
      return dateString.split("T")[0]; 
    },
    async fetchData() {
      try {
        const [teamsResponse, upcomingMatchesResponse, pastMatchesResponse] = await Promise.all([
          axios.get("http://localhost:3000/teams"),
          axios.get("http://localhost:3000/matches/upcoming"),
          axios.get("http://localhost:3000/matches/past"),
        ]);
        this.teams = teamsResponse.data;
        this.upcomingmatches = upcomingMatchesResponse.data.map((match) => ({ ...match, newResult: match.result }));
        this.pastmatches = pastMatchesResponse.data.map((match) => ({ ...match, newResult: match.result }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async addMatch() {
  console.log("Submitting Match Data:", this.tournamentID, this.team1ID, this.team2ID, this.matchDate);
  try {
    await axios.post("http://localhost:3000/matches", {
      tournamentID: this.tournamentID,
      team1ID: this.team1ID,
      team2ID: this.team2ID,
      matchDate: this.matchDate,
    });
    this.tournamentID = null;
    this.team1ID = null;
    this.team2ID = null;
    this.matchDate = "";
    this.fetchData();
  } catch (error) {
    console.error("Error adding match:", error);
    alert("Failed to add match.");
  }
},

    async deleteMatch(matchID) {
      try {
        await axios.delete(`http://localhost:3000/matches/${matchID}`);
        this.fetchData();
      } catch (error) {
        console.error("Error deleting match:", error);
      }
    },
    async updateMatchResult(matchID, newResult) {
      if (!matchID || !newResult) {
        alert("Invalid match ID or result!");
        return;
      }
      try {
        await axios.put(`http://localhost:3000/matches/${matchID}`, { result: newResult });
        alert("Match result updated successfully!");
        this.fetchData();
      } catch (error) {
        console.error("Error updating match result:", error);
        alert("Failed to update match result.");
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
:root {
  --primary-color: #5b86e5;
  --primary-hover: #36d1dc;
  --secondary-color: #e74c3c;
  --secondary-hover: #c0392b;
  --card-bg: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

.dashboard-page {
  padding: 20px;
  background: url('@/assets/background.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  color: #333;
}

.manage-matches {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px var(--shadow-color);
  max-width: 800px;
  margin: auto;
}

h2 {
  font-size: 2.2rem;
  margin-bottom: 25px;
  text-align: center;
  color: var(--primary-color);
}

.form input,
.form select {
  width: calc(100% - 20px);
  padding: 12px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
}

.form input:focus,
.form select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 5px var(--primary-hover);
}

.form button {
  background: var(--gradient-bg);
  color: black;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: bold;
}

.form button:hover {
  transform: scale(1.05);
  background: linear-gradient(to right, #2575fc, #6a11cb);
}

.match-card {
  background: var(--card-bg);
  border-radius: 10px;
  box-shadow: 0 4px 8px var(--shadow-color);
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.match-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px var(--shadow-color);
}

.match-details {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.match-details .teams {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.match-details .date {
  color: #555;
  font-size: 0.9rem;
}

.match-actions {
  display: flex;
  align-items: center;
}

.match-actions input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  outline: none;
  transition: border-color 0.3s;
}

.match-actions input:focus {
  border-color: var(--primary-color);
}

.match-actions button {
  padding: 8px 12px;
  margin-left: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.match-actions button:hover {
  transform: scale(1.1);
}

.match-actions .delete {
  background-color: #e74c3c;
    color: white;
}

.match-actions .delete:hover {
  background-color: #c0392b;
}

</style>
