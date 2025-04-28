<template>
    <div class="select-player-page">
      <h1>View Player Profile</h1>
  
      <!-- Liste déroulante pour choisir un joueur -->
      <div class="player-select">
        <label for="player">Choose a Player:</label>
        <select v-model="selectedPlayername" @change="fetchPlayerProfile">
          <option disabled value="">Select a player</option>
          <option v-for="player in playersList" :key="player.playerID" :value="player.name">
            {{ player.name }}
          </option>
        </select>
      </div>
  
      <!-- Affichage des informations du joueur -->
      <div class="profile-card" v-if="playerData">
        <img v-if="playerData.logoURL" :src="`http://localhost:3000${playerData.logoURL}`" alt="Team Logo" />
        <p><strong>Name:</strong> {{ playerData.playerName }}</p>
        <p><strong>Age:</strong> {{ playerData.age }} years</p>
        <p><strong>Position:</strong> {{ playerData.position }}</p>
        <p><strong>Height:</strong> {{ playerData.height }} cm</p>
        <p><strong>Weight:</strong> {{ playerData.weight }} kg</p>
        <p><strong>Performance:</strong> {{ playerData.performance || "Not available" }}</p>
        <p><strong>Team:</strong> {{ playerData.teamName || "No Team" }}</p>
      </div>
      <div v-else>
        <p>Select a player to view their profile.</p>
      </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "SelectPlayer",
  data() {
    return {
      playersList: [],
      selectedPlayername: "",
      playerData: null,
    };
  },
  methods: {
    async fetchPlayersList() {
      try {
        const response = await axios.get("http://localhost:3000/players/all");
        this.playersList = response.data;
      } catch (error) {
        console.error("Error fetching players list:", error);
        alert("Failed to fetch players list.");
      }
    },
    async fetchPlayerProfile() {
      try {
        const response = await axios.get(`http://localhost:3000/players/profile/${this.selectedPlayername}`);
        this.playerData = response.data;
      } catch (error) {
        console.error("Error fetching player profile:", error);
        alert("Failed to fetch player profile.");
        this.playerData = null;
      }
    },
  },
  mounted() {
    this.fetchPlayersList();
  },
};
</script>
  
<style scoped>
.select-player-page {
  padding: 20px;
  text-align: center;
  background: url('@/assets/background.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  color: #fff;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.player-select {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.player-select label {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #e0e0e0;
}

.player-select select {
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #5b86e5;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  outline: none;
  width: 250px;
  transition: all 0.3s ease;
}

.player-select select:focus {
  border-color: #36d1dc;
  box-shadow: 0 0 10px rgba(54, 209, 220, 0.6);
}

.profile-card {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  padding: 25px;
  max-width: 500px;
  margin: 20px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.profile-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #5b86e5;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.profile-card p {
  margin: 12px 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.profile-card strong {
  color: #5b86e5;
  font-weight: 600;
}
</style>