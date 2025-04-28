<template>
    <div class="profile-page">
      <h1>Player Profile</h1>
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
        <p>Loading player profile...</p>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "PlayerProfile",
  data() {
    return {
      playerData: null,
    };
  },
  methods: {
    async fetchPlayerProfile() {
      try {
        const response = await axios.get(`http://localhost:3000/players/profile/${store.username}`);
        this.playerData = response.data;
      } catch (error) {
        console.error("Error fetching player profile:", error);
        alert("Failed to fetch player profile.");
      }
    },
  },
  mounted() {
    this.fetchPlayerProfile();
  },
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
  text-align: center;
  background: url('@/assets/background.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  color: #fff;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
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
