<template>
  <div id="app">
    <header class="app-header">
      <nav class="navbar">
        <div class="logo-title">
          <div class="logo">
            <img src="./assets/logo.png" alt="Site Logo" />
          </div>
          <h1 class="site-title">Football Tournament</h1>
        </div>
        <ul class="nav-links">
          <li v-if="isLoggedIn">
            <button v-if="store.role === 'admin'" @click="store.toggleAdminView">
              {{ store.isAdminView ? "Switch to User View" : "Switch to Admin View" }}
            </button>
          </li>
          <li v-if="isLoggedIn && isAdmin && store.isAdminView">
            <router-link to="/manage-teams">Manage Teams</router-link>
          </li>
          <li v-if="isLoggedIn && isAdmin && store.isAdminView">
            <router-link to="/add-to-tournament">Add Team To a Tournament</router-link>
          </li>
          <li v-if="isLoggedIn && isAdmin && store.isAdminView">
            <router-link to="/manage-matches">Manage Matches</router-link>
          </li>
          <li v-if="isLoggedIn && isAdmin && store.isAdminView">
            <router-link to="/update-standings">Update Standings</router-link>
          </li>
          <li v-if="isLoggedIn && isAdmin && store.isAdminView">
            <router-link to="/upload-logo">Upload Logo</router-link>
          </li>
          <li v-if="isLoggedIn && isCoach">
            <router-link to="/player">Players</router-link>
          </li>
          <li v-if="isLoggedIn && isPlayer">
            <router-link to="/player-profile">Profile</router-link>
          </li>
          <li v-if="isLoggedIn && isSpectator">
            <router-link to="/spec-profile">Player Profile</router-link>
          </li>
          <li v-if="isLoggedIn && !store.isAdminView">
            <router-link to="/matches">Matches</router-link>
          </li>
          <li v-if="isLoggedIn && !store.isAdminView">
            <router-link to="/standings">Standings</router-link>
          </li>
          <li v-if="isLoggedIn">Welcome, {{ username }}!</li>
          <li v-if="isLoggedIn">
            <button @click="logout">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { store } from "./store";

export default {
  setup() {
    return { store };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      store.isLoggedIn = false;
      store.username = "";
      store.role = "";
      store.isAdminView = false;
      this.$router.push("/login");
    },
  },
  computed: {
    isLoggedIn() {
      return store.isLoggedIn;
    },
    username() {
      return store.username;
    },
    isAdmin() {
      return store.role === "admin";
    },
    isCoach() {
      return store.role === "Coach";
    },
    isPlayer() {
      return store.role === "Player";
    },
    isSpectator() {
      return store.role === "Spectator";
    },
  },
  mounted() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      store.isLoggedIn = true;
      store.username = parsedUser.username;
      store.role = parsedUser.role;
    }
  },
};
</script>

<style scoped>
/* Header global */
.app-header {
  background: linear-gradient(to right, #2c3e50, #4ca1af);
  color: white;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo img {
  height: 80px;
  transition: transform 0.3s ease-in-out;
}

.logo img:hover {
  transform: scale(1.1);
}

.site-title {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(to right, black, lightgray);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.site-title:hover {
  transform: scale(1.05);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
  align-items: center;
}

.nav-links li {
  display: inline-block;
}

.nav-links a,
.nav-links button {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
}

.nav-links a:hover,
.nav-links button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.nav-links button {
  background: #e74c3c;
  border: none;
  cursor: pointer;
}

.nav-links button:hover {
  background: #c0392b;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 10px;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
  }

  .site-title {
    font-size: 1.8rem;
  }
}
</style>
