<template>
  <div class="player-page">
    <h1>Manage Players</h1>


    <div v-if="store.role === 'Coach'">
      <h2>My Team</h2>
      <form @submit.prevent="addPlayer" class="player-form">
        <input v-model="playerName" placeholder="Player Name" required />
        <button type="submit">Add Player</button>
      </form>

 
      <ul class="player-list">
        <li v-for="player in players" :key="player.playerID" class="player-item">
          <div class="player-info">
            <span class="player-name">{{ player.name }}</span>
          </div>
          <div class="player-actions">
            <button @click="$router.push(`/player/${player.playerID}`)" class="btn-view">
              View Sheet
            </button>
            <button @click="deletePlayer(player.playerID)" class="btn-delete">Delete</button>
          </div>
        </li>
      </ul>

      <p v-if="players.length === 0" class="no-players">
        No players found for your team. Add one using the form above!
      </p>
    </div>


    <div v-if="store.role === 'admin'" class="admin-view">
      <h2>Admin View</h2>
      <p>Admins can see all teams here.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";

export default {
name: "PlayerComponent",
setup() {
  return { store };
},
data() {
  return {
    players: [],
    playerName: "",
  };
},
methods: {

  async fetchPlayers() {
    try {
      const response = await axios.get(
        `http://localhost:3000/players?coachID=${store.userID}`
      );
      if (Array.isArray(response.data)) {
        this.players = response.data; 
      } else {
        this.players = [];
        console.warn("Unexpected response format. Defaulting to empty list.");
      }
    } catch (error) {
      console.error("Error fetching players:", error);
      this.players = []; 
    }
  },
  

  async addPlayer() {
    if (!this.playerName) return alert("Player name is required!");
    try {
      await axios.post("http://localhost:3000/players", {
        name: this.playerName,
        teamID: store.teamID,
      });
      this.playerName = "";
      this.fetchPlayers();
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player. Please try again.");
    }
  },
 
  async deletePlayer(playerID) {
    try {
      await axios.delete(`http://localhost:3000/players/${playerID}`);
      this.fetchPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("Failed to delete player.");
    }
  },
},
mounted() {
  if (!store.userID) {
    console.error("Error: store.userID is not defined!");
    return;
  }
  this.fetchPlayers();
},
};
</script>

<style scoped>
.player-page {
padding: 20px;
background: url('@/assets/background.png') no-repeat center center fixed;
  background-size: cover;

min-height: 100vh;
color: #fff;
font-family: "Poppins", sans-serif;
display: flex;
flex-direction: column;
align-items: center;
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
color: #ffffff;
}

.player-form {
display: flex;
margin-bottom: 20px;
}

.player-form input {
padding: 10px;
font-size: 1rem;
border: 2px solid #ccc;
border-radius: 6px 0 0 6px;
outline: none;
width: 300px;
}

.player-form button {
padding: 10px 15px;
font-size: 1rem;
border: none;
background-color: #5b86e5;
color: #fff;
border-radius: 0 6px 6px 0;
cursor: pointer;
transition: background 0.3s ease;
}

.player-form button:hover {
background-color: #36d1dc;
}

.player-list {
list-style: none;
padding: 0;
width: 100%;
max-width: 600px;
}

.player-item {
display: flex;
justify-content: space-between;
align-items: center;
background: #fff;
color: #333;
padding: 12px 20px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
margin-bottom: 10px;
transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.player-item:hover {
transform: translateY(-4px);
box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
}

.player-info {
font-size: 1.1rem;
font-weight: bold;
}

.player-actions button {
padding: 8px 12px;
font-size: 0.9rem;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background 0.3s ease;
}

.btn-view {
background-color: #5b86e5;
color: #fff;
margin-right: 10px;
}

.btn-view:hover {
background-color: #36d1dc;
}

.btn-delete {
background-color: #e74c3c;
color: #fff;
}

.btn-delete:hover {
background-color: #c0392b;
}

.no-players {
text-align: center;
font-size: 1.2rem;
margin-top: 20px;
color: #f8f9fa;
font-style: italic;
}

.admin-view {
background: rgba(255, 255, 255, 0.9);
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
text-align: center;
color: #2c3e50;
width: 100%;
max-width: 600px;
margin-top: 20px;
}
</style>