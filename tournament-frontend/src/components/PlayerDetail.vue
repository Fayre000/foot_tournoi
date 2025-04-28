<template>
    <div class="player-details">
      <h1>Modify technical sheet : {{ player.name }}</h1>
      <form @submit.prevent="updatePlayer">
        <label>Âge :</label>
        <input v-model.number="player.age" type="number" />
  
        <label>Position :</label>
        <input v-model="player.position" type="text" />
  
        <label>Height (cm) :</label>
        <input v-model.number="player.height" type="number" />
  
        <label>Weight (kg) :</label>
        <input v-model.number="player.weight" type="number" />
  
        <label>Performance :</label>
        <input v-model="player.performance" type="text" />
  
        <button type="submit">Save</button>
      </form>
      <button @click="$router.back()">Back</button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "PlayerDetailsComponent",
    data() {
      return {
        player: {},
      };
    },
    methods: {
      async fetchPlayerDetails() {
        try {
          const response = await axios.get(
            `http://localhost:3000/players/${this.$route.params.playerID}`
          );
          this.player = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des informations du joueur :", error);
        }
      },
      async updatePlayer() {
        try {
          await axios.put(`http://localhost:3000/players/${this.$route.params.playerID}`, {
            age: this.player.age,
            position: this.player.position,
            height: this.player.height,
            weight: this.player.weight,
            performance: this.player.performance,
          });
          alert("Fiche technique mise à jour avec succès !");
        } catch (error) {
          console.error("Erreur lors de la mise à jour du joueur :", error);
          alert("La mise à jour a échoué.");
        }
      },
    },
    mounted() {
      this.fetchPlayerDetails();
    },
  };
  </script>
  
  <style scoped>
.player-details {
  max-width: 450px;
  margin: 30px auto;
  padding: 25px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8em;
  letter-spacing: 1px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
  color: #34495e;
}

input {
  padding: 10px;
  border: 2px solid #dcdde1;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  font-size: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input:focus {
  outline: none;
  border-color: #2980b9;
  box-shadow: 0 0 6px rgba(41, 128, 185, 0.4);
}

button {
  padding: 12px 20px;
  font-size: 1em;
  font-weight: bold;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.98);
}

button:last-child {
  background-color: #e74c3c;
}

button:last-child:hover {
  background-color: #c0392b;
}

@media (max-width: 600px) {
  .player-details {
    padding: 15px;
  }
  h1 {
    font-size: 1.5em;
  }
}
</style>
