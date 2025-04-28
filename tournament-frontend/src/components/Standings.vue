<template>
  <div class="standings-page">
    <h1>Standings</h1>
    <table class="standings-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th></th>
          <th>Club</th>
          <th>Matches Played</th>
          <th>Goal Average</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="standing in standings" :key="standing.teamID">
          <td>{{ standing.ranks }}</td>
          <td>
  <img 
    :src="standing.logoURL && standing.logoURL !== '' 
           ? `http://localhost:3000${standing.logoURL}` 
           : 'http://localhost:3000/uploads/default-logo.png'" 
    alt="Team Logo" 
    width="50" 
    height="50" 
  />
</td>
          
          <td>{{ standing.teamName }}</td>
          <td>{{ standing.matchesPlayed }}</td>
          <td>{{ standing.goalAverage }}</td>
          <td>{{ standing.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StandingsComponent",
  data() {
    return {
      standings: [],
    };
  },
  methods: {
    async fetchStandings() {
      try {
        const response = await axios.get("http://localhost:3000/standings");
        this.standings = response.data;
        console.log(this.standings);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    },
  },
  mounted() {
    this.fetchStandings();
  },
};
</script>

<style scoped>
.standings-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: url('@/assets/background.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
}

.standings-table {
  width: 90%;
  max-width: 1000px;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.7); /* Increased transparency */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  margin: 20px auto;
}

.standings-table thead {
  background: rgba(41, 128, 185, 0.85);
  color: #ffffff;
}

.standings-table th {
  text-transform: uppercase;
  padding: 15px;
  font-size: 1rem;
  letter-spacing: 1px;
}

.standings-table td {
  text-align: center;
  padding: 12px;
  font-size: 1rem;
  color: #2c3e50;
}

.standings-table tbody tr:nth-child(odd) {
  background: rgba(249, 249, 249, 0.6);
}

.standings-table tbody tr:nth-child(even) {
  background: rgba(236, 240, 241, 0.6);
}

.standings-table tbody tr:hover {
  background: rgba(213, 243, 255, 0.6);
  transition: background 0.3s ease;
}

.standings-table td {
  border-bottom: 1px solid rgba(221, 221, 221, 0.5);
}

.standings-table td:last-child {
  font-weight: bold;
  color: rgba(41, 128, 185, 0.9);
}
</style>
