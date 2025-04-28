<template>
    <div>
      <h1>Team Management</h1>
      <form @submit.prevent="addTeam">
        <label>Team Name:</label>
        <input v-model="teamName" placeholder="Enter team name" required />
  
        <label>Coach ID:</label>
        <input v-model="coachID" placeholder="Enter coach ID" type="number" required />
  
        <button type="submit">Add Team</button>
      </form>
  
      <h2>Teams</h2>
      <ul>
        <li v-for="team in teams" :key="team.teamID">
          {{ team.name }} (Coach ID: {{ team.coachID }})
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "TeamsComponent",
    data() {
      return {
        teams: [],
        teamName: "",
        coachID: "",
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
      async addTeam() {
        try {
          await axios.post("http://localhost:3000/teams", {
            name: this.teamName,
            coachID: this.coachID,
          });
          alert("Team added successfully!");
          this.fetchTeams();
          this.teamName = "";
          this.coachID = "";
        } catch (error) {
          alert("Failed to add team. Please try again.");
        }
      },
    },
    mounted() {
      this.fetchTeams();
    },
  };
  </script>
  
  <style>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: auto;
  }
  
  label {
    margin: 10px 0 5px;
  }
  
  input,
  button {
    padding: 10px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  </style>
  