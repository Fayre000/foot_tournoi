<template>
  <div class="dashboard-page">
    <!-- Gestion des équipes -->
    <section class="manage-teams">
      <h2>Manage Teams</h2>
      <form @submit.prevent="addTeam" class="form">
        <input v-model="teamName" placeholder="Team Name" required />
  
        <!-- Liste déroulante pour les coachs -->
        <select v-model="coachID" required>
          <option disabled value="">Select a Coach</option>
          <option v-for="coach in coaches" :key="coach.userID" :value="coach.userID">
            {{ coach.username }}
          </option>
        </select>
        <button type="submit">Add Team</button>
      </form>
  
      <!-- Liste des équipes -->
      <ul>
        <li v-for="team in teams" :key="team.teamID" class="team-card">
          <div class="team-info">
            <span class="team-name">{{ team.name }}</span>
            <span class="coach-name">(Coach: {{ findCoachName(team.coachID) }})</span>
          </div>
  
          <!-- Liste déroulante pour changer de coach -->
          <div class="team-actions">
            <select v-model="team.newCoach" @change="updateTeamCoach(team.teamID, team.newCoach)">
              <option disabled value="">Change Coach</option>
              <option v-for="coach in coaches" :key="coach.userID" :value="coach.userID">
                {{ coach.username }}
              </option>
            </select>
            <button @click="deleteTeam(team.teamID)" class="delete">Delete</button>
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
        coaches: [],
        teamName: "",
        coachID: null,
      };
    },
    methods: {
      async fetchData() {
        try {
          const [teamsResponse, coachesResponse] = await Promise.all([
            axios.get("http://localhost:3000/teams"),
            axios.get("http://localhost:3000/users/coaches"),
          ]);
          this.teams = teamsResponse.data.map((team) => ({ ...team, newCoach: team.coachID }));
          this.coaches = coachesResponse.data;
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
    background: url('@/assets/background.png') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    font-family: "Poppins", sans-serif;
    color: #fff;
    display: flex;
    justify-content: center;
  }
  
  .manage-teams {
    background: rgba(255, 255, 255, 0.95);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    color: #333;
    width: 100%;
    max-width: 800px;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    color: #2c3e50;
  }
  
  .form input, .form select {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
  }
  
  .form input:focus, .form select:focus {
    border-color: #5b86e5;
    outline: none;
    box-shadow: 0 0 8px rgba(91, 134, 229, 0.5);
  }
  
  button {
    background-color: #5b86e5;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
  }
  
  button:hover {
    background-color: #36d1dc;
  }
  
  .team-card {
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .team-info {
    display: flex;
    flex-direction: column;
  }
  
  .team-name {
    font-size: 1.1rem;
    font-weight: bold;
  }
  
  .coach-name {
    font-size: 0.9rem;
    color: #7f8c8d;
  }
  
  .team-actions select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    margin-right: 10px;
  }
  
  .team-actions .delete {
    background-color: #e74c3c;
    color: white;
  }
  
  .team-actions .delete:hover {
    background-color: #c0392b;
  }
  </style>
  