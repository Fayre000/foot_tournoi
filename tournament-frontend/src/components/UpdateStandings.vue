<template>
    <div class="dashboard-page">
      <!-- Update Standings Section -->
      <section class="update-standings">
        <h2>Update Standings</h2>
        <ul>
          <li v-for="standing in standings" :key="standing.teamID" class="standing-item">
            <div class="standing-info">
              <span class="team">Team: <strong>{{ standing.teamName }}</strong></span>
              <span class="points">Current Points: <strong>{{ standing.points }}</strong></span>
            </div>
            <div class="update-controls">
              <input
                v-model.number="standing.newPoints"
                type="number"
                placeholder="New Points"
                class="input-points"
              />
              <button @click="updateStanding(standing.teamID, standing.newPoints, standing.tournamentID)">
                Update
              </button>
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
        standings: [],
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get("http://localhost:3000/standings");
          this.standings = response.data.map((standing) => ({ ...standing, newPoints: standing.points }));
        } catch (error) {
          console.error("Error fetching standings:", error);
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
          console.error("Error updating standings:", error);
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
    min-height: 100vh;
    color: #333;
    font-family: "Poppins", sans-serif;
  }
  
  .update-standings {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    padding: 25px;
    max-width: 800px;
    margin: 0 auto;
    transition: all 0.3s ease-in-out;
  }
  
  .update-standings:hover {
    transform: translateY(-5px);
  }
  
  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    text-align: center;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  .standing-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 15px;
    background: #f9fbfc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .standing-info span {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
  
  strong {
    color: #2980b9;
  }
  
  .update-controls {
    display: flex;
    align-items: center;
  }
  
  .input-points {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 0.9rem;
  }
  
  button {
    background-color: #3498db;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>