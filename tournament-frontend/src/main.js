import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
store.loadUserData(); 
import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "./components/Login.vue";
import RegisterComponent from "./components/Register.vue";
import TeamsComponent from "./components/Teams.vue";
import MatchesComponent from "./components/Matches.vue";
import StandingsComponent from "./components/Standings.vue";
import AdminDashboardComponent from "./components/AdminDashboard.vue";
import PlayerComponent from './components/Player.vue'; // Nouveau composant
import PlayerDetailsComponent from "./components/PlayerDetail.vue";
import ManageTeams from "./components/ManageTeams.vue";
import AddToTournament from "./components/AddToTournament.vue";
import ManageMatches from "./components/ManageMatches.vue";
import UpdateStandings from "./components/UpdateStandings.vue";
import UploadLogo from "./components/UploadLogo.vue";
import PlayerProfile from "./components/PlayerProfile.vue";
import ProfileSpectator from "./components/ProfileSpectator.vue";
// Define routes
const routes = [
  { path: "/login", component: LoginComponent },
  { path: "/register", component: RegisterComponent },
  { path: "/teams", component: TeamsComponent },
  { path: "/matches", component: MatchesComponent },
  { path: "/standings", component: StandingsComponent },
  { path: "/admin", component: AdminDashboardComponent },
  { path: '/player', component: PlayerComponent, meta: { requiresRole: ['admin', 'Coach'] } },
  { path: "/", redirect: "/login" },
  { path: "/manage-teams", component: ManageTeams },
  { path: "/add-to-tournament", component: AddToTournament },
  { path: "/manage-matches", component: ManageMatches },
  { path: "/update-standings", component: UpdateStandings },
  { path: "/upload-logo", component: UploadLogo },
  { path: "/player-profile", component: PlayerProfile },
  { path: "/spec-profile", component: ProfileSpectator },
  { 
    path: "/player/:playerID", 
    component: PlayerDetailsComponent, 
    meta: { requiresRole: ["Coach"] } 
  },
  
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn, role } = store;

  // Normaliser le rôle avant vérification
  const normalizedRole = role === "Administrator" ? "admin" : role;

  if (to.path === "/admin" && (!isLoggedIn || normalizedRole !== "admin")) {
    alert("Accès refusé : vous devez être un administrateur.");
    return next("/login");
  }

  next();
});



// Create Vue app
const app = createApp(App);
app.provide("store", store);
// Use the router
app.use(router);

// Mount the app
app.mount("#app");

