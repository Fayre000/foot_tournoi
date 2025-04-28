<template>
  <div class="dashboard-page">
    <h1>Admin Dashboard</h1>

   
    <section class="manage-teams">
      <h2>Manage Teams</h2>
      <form @submit.prevent="addTeam" class="form">
        <input v-model="teamName" placeholder="Team Name" required />

      
        <select v-model="coachID" required>
          <option disabled value="">Select a Coach</option>
          <option v-for="coach in coaches" :key="coach.userID" :value="coach.userID">
            {{ coach.username }}
          </option>
        </select>
        <button type="submit">Add Team</button>
      </form>

   
      <ul>
        <li v-for="team in teams" :key="team.teamID">
          {{ team.name }} (Coach: {{ findCoachName(team.coachID) }})

          
          <select v-model="team.newCoach" @change="updateTeamCoach(team.teamID, team.newCoach)">
            <option disabled value="">Change Coach</option>
            <option v-for="coach in coaches" :key="coach.userID" :value="coach.userID">
              {{ coach.username }}
            </option>
          </select>
          <button @click="deleteTeam(team.teamID)">Delete</button>
        </li>
      </ul>
    </section>


    <section class="add-to-tournament">
      <h2>Add Team to Tournament</h2>
      <form @submit.prevent="addTeamToTournament" class="form">
        <select v-model="selectedTeamID" required>
          <option disabled value="">Select a Team</option>
          <option v-for="team in teams" :key="team.teamID" :value="team.teamID">
            {{ team.name }}
          </option>
        </select>
        <input v-model.number="selectedTournamentID" placeholder="Tournament ID" type="number" required />
        <button type="submit">Add Team to Tournament</button>
      </form>
    </section>

 
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
        <li v-for="match in pastmatches" :key="match.matchID">
          {{ match.team1Name }} vs {{ match.team2Name }} - {{ formatDate(match.matchDate) }}
          <input v-model="match.newResult" placeholder="New Result" />
          <button @click="updateMatchResult(match.matchID, match.newResult)">Update Result</button>
          <button @click="deleteMatch(match.matchID)">Delete</button>
        </li>
        <li v-for="match in upcomingmatches" :key="match.matchID">
          {{ match.team1Name }} vs {{ match.team2Name }} - {{ formatDate(match.matchDate) }}
          <input v-model="match.newResult" placeholder="New Result" />
          <button @click="updateMatchResult(match.matchID, match.newResult)">Update Result</button>
          <button @click="deleteMatch(match.matchID)">Delete</button>
        </li>
      </ul>
    </section>

    <section class="update-standings">
      <h2>Update Standings</h2>
      <ul>
        <li v-for="standing in standings" :key="standing.teamID">
          {{ standing.tournamentID }} : {{ standing.teamName }}: {{ standing.points }} points
          <input v-model.number="standing.newPoints" type="number" placeholder="New Points" />
          <button @click="updateStanding(standing.teamID, standing.newPoints, standing.tournamentID)">Update</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "AdminDashboardComponent",
  setup() {
    return { store };
  },
  data() {
    return {
      teams: [],
      coaches: [],
      teamName: "",
      coachID: null,
      upcomingmatches: [],
      pastmatches: [],
      tournamentID: null,
      team1ID: null,
      team2ID: null,
      matchDate: "",
      standings: [],
      selectedTeamID: null,
      selectedTournamentID: null,
    };
  },
  methods: {
    formatDate(dateString) {
    return dateString.split("T")[0]; 
  },
    async fetchData() {
      try {
        const [teamsResponse, coachesResponse, upcomingMatchesResponse, pastMatchesResponse, standingsResponse] =
          await Promise.all([
            axios.get("http://localhost:3000/teams"),
            axios.get("http://localhost:3000/users/coaches"),
            axios.get("http://localhost:3000/matches/upcoming"),
            axios.get("http://localhost:3000/matches/past"),
            axios.get("http://localhost:3000/standings"),
          ]);
        this.teams = teamsResponse.data.map((team) => ({ ...team, newCoach: team.coachID }));
        this.coaches = coachesResponse.data;
        this.upcomingmatches = upcomingMatchesResponse.data.map((match) => ({ ...match, newResult: match.result }));
        this.pastmatches = pastMatchesResponse.data.map((match) => ({ ...match, newResult: match.result }));
        this.standings = standingsResponse.data.map((standing) => ({ ...standing, newPoints: standing.points }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async addTeam() {
      try {
        await axios.post("http://localhost:3000/teams", {
          name: this.teamName,
          coachID: this.coachID,
        });
        this.teamName = "";
        this.coachID = null;
        this.fetchData();
      } catch (error) {
        console.error("Error adding team:", error);
      }
    },
    async updateTeamCoach(teamID, newCoachID) {
      if (!newCoachID) return alert("Please select a valid coach.");
      try {
        await axios.put(`http://localhost:3000/teams/${teamID}`, { coachID: newCoachID });
        alert("Coach updated successfully!");
        this.fetchData();
      } catch (error) {
        console.error("Error updating team coach:", error);
      }
    },
    async deleteTeam(teamID) {
      try {
        await axios.delete(`http://localhost:3000/teams/${teamID}`);
        this.fetchData();
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    },
    async addTeamToTournament() {
      if (!this.selectedTeamID || !this.selectedTournamentID) {
        alert("Team ID and Tournament ID are required!");
        return;
      }
      try {
        await axios.post("http://localhost:3000/standings/add-team", {
          teamID: this.selectedTeamID,
          tournamentID: this.selectedTournamentID,
        });
        alert("Team added to tournament successfully!");
        this.fetchData();
      } catch (error) {
        console.error("Error adding team to tournament:", error);
      }
    },
    async addMatch() {
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
    async updateStanding(teamID, points, tournamentID) {
      if (!teamID || points == null) {
        alert("Invalid team ID or points value!");
        return;
      }
      try {
        await axios.put(`http://localhost:3000/standings/${teamID}`, { points });
        await axios.put(`http://localhost:3000/standings/update-ranks/${tournamentID}`);
        alert("Standing updated successfully!");
        this.fetchData();
      } catch (error) {
        console.error("Erreur lors de la mise à jour des standings :", error);
      }
    },
    findCoachName(coachID) {
      const coach = this.coaches.find((c) => c.userID === coachID);
      return coach ? coach.username : "Unknown Coach";
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
  background: linear-gradient(135deg, #5b86e5, #36d1dc);
  min-height: 100vh;
  color: #fff;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

section {
  margin-bottom: 30px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: #333;
}

section h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

input, select {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: calc(100% - 22px);
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ul li button {
  margin-left: 10px;
}
</style>
