import { reactive } from "vue";
import axios from "axios";


export const store = reactive({
  isLoggedIn: false,
  username: "",
  role: "", // admin ou user
  isAdminView: false, // Vue admin ou vue user
  isCoachView: false,
  userID : null,
  teamID: null,
  toggleAdminView() {
    this.isAdminView = !this.isAdminView;
  },
  setUserData({userID, username, role }) {
    this.username = username;
    this.userID = userID;
    this.role = role === "Administrator" ? "admin" : role; // Normaliser ici
    console.log(userID);
    if (role === "Coach"){
      this.fetchCoachTeam(); 
    }
    this.isLoggedIn = true;
    localStorage.setItem("userData", JSON.stringify({role, username }));
},
async fetchCoachTeam() {
  if (this.role === "Coach") {
    try {
      const response = await axios.get(`http://localhost:3000/teams/coach/${this.userID}/team`);
      this.teamID = response.data.teamID;
    } catch (error) {
      console.error("Error fetching coach's team:", error);
    }
  }
},
  
loadUserData() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const { role, username } = JSON.parse(userData);
    this.role = role;
    this.username = username;
  }
},  clearUserData() {

  this.role = "";
  this.username = "";
  localStorage.removeItem("userData");
},


});
