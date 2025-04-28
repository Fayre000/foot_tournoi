<template>
  <div class="upload-logo-page">
    <h1>Upload Team Logo</h1>
    <form @submit.prevent="uploadLogo" class="upload-form">
      <label for="team">Select a Team</label>
      <select v-model="selectedTeamID" required>
        <option disabled value="">Choose a team</option>
        <option v-for="team in teams" :key="team.teamID" :value="team.teamID">
          {{ team.name }}
        </option>
      </select>

      <label for="logo">Upload Logo</label>
      <input type="file" name="logo" @change="onFileChange" required />
      <button type="submit">Upload</button>
    </form>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "UploadLogo",
data() {
  return {
    teams: [],
    selectedTeamID: "",
    file: null,
    message: "",
  };
},
methods: {
  async fetchTeams() {
    try {
      const response = await axios.get("http://localhost:3000/teams");
      this.teams = response.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  },
  onFileChange(event) {
    this.file = event.target.files[0];
  },
  async uploadLogo() {
    if (!this.selectedTeamID || !this.file) {
      this.message = "Please select a team and choose a file.";
      return;
    }

    const formData = new FormData();
    formData.append("logo", this.file);

    try {
      await axios.post(`http://localhost:3000/teams/upload-logo/${this.selectedTeamID}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.message = "Logo uploaded successfully!";
    } catch (error) {
      console.error("Error uploading logo:", error);
      this.message = "Failed to upload logo.";
    }
  },
},
mounted() {
  this.fetchTeams();
},
};
</script>

<style scoped>
.upload-logo-page {
padding: 20px;
width: 100%;
min-height: 100vh;
margin: 0;
text-align: center;
background: url('@/assets/background.png') no-repeat center center fixed;
background-size: cover; 
background-position: center;
background-attachment: fixed;
color: #fff;
font-family: "Poppins", sans-serif;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

h1 {
font-size: 2.5rem;
margin-bottom: 20px;
color: #ffffff;
text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
letter-spacing: 1px;
}

.upload-form {
background: rgba(255, 255, 255, 0.95);
padding: 25px;
border-radius: 12px;
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
color: #333;
width: 100%;
max-width: 400px;
animation: fadeIn 0.8s ease-in-out;
}

label {
display: block;
margin-bottom: 10px;
font-size: 1.1rem;
color: #5b86e5;
font-weight: 600;
}

select, input {
width: 100%;
padding: 10px;
margin-bottom: 15px;
border: 2px solid #ddd;
border-radius: 5px;
font-size: 1rem;
transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

select:focus, input:focus {
border-color: #5b86e5;
outline: none;
box-shadow: 0 0 10px rgba(91, 134, 229, 0.5);
}

button {
background-color: #5b86e5;
color: white;
padding: 10px 15px;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 1rem;
transition: all 0.3s ease;
text-transform: uppercase;
font-weight: 600;
}

button:hover {
background-color: #36d1dc;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
transform: translateY(-2px);
}

.message {
margin-top: 15px;
font-size: 1rem;
font-weight: bold;
color: #27ae60;
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
animation: fadeIn 0.8s;
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