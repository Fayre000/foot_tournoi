<template>
  <div class="matches-page">
    <h1>Matches</h1>
    <h2>Past Matches</h2>
    <table class="matches-table">
      <tbody>
        <tr v-for="match in pastMatches" :key="match.matchID" class="match-row">
          <td class="team-info">
            <img
              :src="match.Logoteam1 && match.Logoteam1 !== '' ? `http://localhost:3000${match.Logoteam1}` : 'http://localhost:3000/uploads/default-logo.png'"
              alt="Team Logo"
              class="match-logo"
            />
            <div class="team-name">{{ match.team1Name }}</div>
          </td>
          <td class="match-result">
            <span class="score">{{ match.result }}</span>
            <div class="match-date">{{ formatDate(match.matchDate) }}</div>
          </td>
          <td class="team-info">
            <img
              :src="match.Logoteam2 && match.Logoteam2 !== '' ? `http://localhost:3000${match.Logoteam2}` : 'http://localhost:3000/uploads/default-logo.png'"
              alt="Team Logo"
              class="match-logo"
            />
            <div class="team-name">{{ match.team2Name }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>Upcoming Matches</h2>
    <table class="matches-table">
      <tbody>
        <tr v-for="match in upcomingMatches" :key="match.matchID" class="match-row">
          <td class="team-info">
            <img
              :src="match.Logoteam1 && match.Logoteam1 !== '' ? `http://localhost:3000${match.Logoteam1}` : 'http://localhost:3000/uploads/default-logo.png'"
              alt="Team Logo"
              class="match-logo"
            />
            <div class="team-name">{{ match.team1Name }}</div>
          </td>
          <td class="match-result">
            <span class="score">{{ match.result }}</span>
            <div class="match-date">{{ formatDate(match.matchDate) }}</div>
          </td>
          <td class="team-info">
            <img
              :src="match.Logoteam2 && match.Logoteam2 !== '' ? `http://localhost:3000${match.Logoteam2}` : 'http://localhost:3000/uploads/default-logo.png'"
              alt="Team Logo"
              class="match-logo"
            />
            <div class="team-name">{{ match.team2Name }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MatchesComponent",
  data() {
    return {
      upcomingMatches: [],
      pastMatches: [],
    };
  },
  methods: {
    formatDate(dateString) {
      return dateString.split("T")[0]; // Prend uniquement la partie avant le "T"
    },
    async fetchMatches() {
      try {
        const upcomingResponse = await axios.get("http://localhost:3000/matches/upcoming");
        const pastResponse = await axios.get("http://localhost:3000/matches/past");
        this.upcomingMatches = upcomingResponse.data;
        this.pastMatches = pastResponse.data;
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    },
  },
  mounted() {
    this.fetchMatches();
  },
};
</script>

<style scoped>
.matches-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #5b86e5, #36d1dc);
  min-height: 100vh;
  color: #fff;
  font-family: "Poppins", sans-serif;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #fff;
}

.matches-table {
  width: 95%;
  max-width: 1000px;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 25px;
}

.match-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}

.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
}

.team-name {
  margin-top: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
}

.match-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.match-result {
  flex: 1;
  text-align: center;
}

.score {
  font-size: 2.5rem;
  font-weight: bold;
  color: #5b86e5;
}

.match-date {
  margin-top: 5px;
  font-size: 1rem;
  color: #7f8c8d;
}

.matches-table tr:nth-child(even) {
  background: #f9f9f9;
}

.matches-table tr:hover {
  background: #e8f0fe;
}
</style>