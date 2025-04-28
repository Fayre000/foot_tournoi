<template>
  <div class="dashboard-page">
    <!-- Ajouter une équipe à un tournoi -->
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
      selectedTeamID: null,
      selectedTournamentID: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/teams");
        this.teams = response.data;
      } catch (error) {
        console.error("Error fetching teams:", error);
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
  background: url('@/assets/background.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

.add-to-tournament {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  animation: fadeIn 0.8s ease-in-out;
}

h2 {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form select,
.form input {
  padding: 12px;
  margin-bottom: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form select:focus,
.form input:focus {
  border-color: #5b86e5;
  box-shadow: 0 0 8px rgba(91, 134, 229, 0.5);
  outline: none;
}

button {
  background: linear-gradient(135deg, #5b86e5, #36d1dc);
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(135deg, #36d1dc, #5b86e5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
