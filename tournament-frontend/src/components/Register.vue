<template>
  <div class="auth-page">
    <div class="form-container">
      <div class="icon">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAABCFBMVEXI7/3///95y5yg4f3rsZxZWWXljXJjrH1ERU7li3DE7v3rs56b4P3M8f9TV2XonYWIaWheqXey5/11yZfM9P/F6/b4/f/i9v6J0a+o5P1iZnPmkXef28qWzrzq+f7S8v3Q+f8+PUbnl35qtofpp5DhoI6GnKdTUV3mh2mY2MJywZKTqrY6Nj9KTldPSldJVGTYpJPX1tV4uJid0cfEpIK+qYWw4+CBzqW32eKnxdNzf4tndH56jJeeusYzLTYtJC6ccm1rX2bNhHB8aGuueW4jOkm8fG2QZV9eUFOdfHethHyijIvUr6XnuarbzMjP4+nhwbfZt5/Wmn7Ct5euv5ySw5qtsomGwqpuPluGAAAK30lEQVR4nL2c/VsauxLHU0BgwQXFXRBXESgq9bVqi1i1x6pt77m3HtvTWv///+Rm35PsJJks0OnztD8U1w/fmUwmLzvklbm1O9u1GlFbrdUtLhcDW+7avbb5byHGP9HZJjqsGC5hK7aIMZshWVuvFgfXLUa2vNzqmMEZkfXMuCLhUrbtBZH1bEMqkY3aNl43NBnVKxcYz2agG5KsvZ0XK2TrprK1OnMka3eM40s0RrblWm9eZD1kmlDL1lpO2LoYl+rJ2vkDTGDrMuGml01L1rPnBEaNka2olU1DRiNsblxEkE2TQNRkBp60nb5vjqPMeixaV+1RJVkPB+U4NXd6ebDr28HNdOqq8Ji8u6z0qIoM5Umn717uftjYOz4+rh5S+3h4dHV96fYdDJqdjwwD5riX13vUliI7qlIbDA4Pr25cGRuLVpMHm5QME2IOOfhwnFCFthfAVQcfNw7cPvxjNQZNPg5kZAgwx73Z2BO4AquGbIOjA4luKDQJGQbs8sMxgBXoFrJVP25c5keDyfRgNtldgvRi483X7ZqAbAg0mEwL5kyvZIJxaNXDjWkfRNPmXIhMr5gz3VAIxnl0cAR7VKsaRKYHu9Fx+VaNZTsAVWOTRwtHps1jziUGjEG71KIBKTdLhgBThxiAdgOh2eqJKkPW1oK5OMWW0lirHk7BWGNq8OXM9C6StbULJPcKTZaM0MHSFHouMwqKmcpDJNOuRPrXeLDUn4MPfehh3ABVk80xyHh/frwB/akINZ6srVPMdjdMwBi0I9CfbKgVOwoyfSbbNfGlb8kguO5DD2T92ZWTaX1pu0a+5ET7Cx6f0qzGkml9mUMyZhBcw3UH68+ehExfYEwNo4wTTRJpsvHJkPW0JZl9YC4ZI9ounCsl45MhQ2xC5ZCMrTrgh7L5ttgGyBALkik2/hsNgIyOARPREjJ9+JM+Mv4bn24fPjFsmsTBz5/tDBlCMucKCXZnWXcMWjx7VpckD2ZFIyIZQjLkyGzce1a5bH05yZJJRiecOWKyjp7MucRwndyWKRhFu03RYrIqPHmym0Rpuo3I9MUPKmc0fE+WI7tN/KnLG4QAw5Ogo4wQXf3TOLl/KCdgFO2kIZBdyx4NzFEEncuIw5A1srb0aeUu4rKG4T9398EHl45jsitX8myuhmTJ9Omf+MVsKs+KYLcPDxQr4iqP6s0w1qy7h9uVlZRsSUYG5LSQDLWnnpI17sqiWVbsRmtYqpcitHIg4pc0bUjJaswYqKVkiJThk8VJo7FiZcgSQm9UL1Grj7zkQ9bXQUTWkJLZmTFA0PHPkN1KyCxrOCoFYBStNDQhy7qToJ3JkQHmeT5WxBWgpWSfBwMdWWYM+GTaJaZI9nczY6ORj5VycWRfvt5+/c9nNVlm8Ulw+Z8jO/m7DlmJt5SsHGr6VU0mpjSCdmZIdnLik5UQxpBFfA+fVWRibUtwM1NE1vj037cYKpCMop0oyLjR2QvIUGk2INu7R3NBZOXyvYKMc2cnIMMe4Lgb93gukMx6UJGx7qwFZNhDaHfDQDGYbAdJViwGZNijJfd/JmAg2VBJxhfdBB1mxP22WDIh0Ag6zAh5nJVs/Kh8Pp/RCDabUc1mJrP+UarAZzQDspk10ziTq7lbbYLNs/Qr/TMbmVV+kh4tZsi6lAwLRshTbjJ/3hx7p7qI5hZ3BFlo+OYYiVYfJWBDWozsfHc0igmDk6CTBvH9OcpDNj51n1xbyyWSGV0uqJ0+isWOnKyZkLnI38EuBmwzMuKQp1NqGLx0keKhvzi7TCHGN1hqNdL/jhHNiyUrIRwZPrrIkRmCBU84HSHIEmeq8ytMVmzlIsPkj/ooXmB5T+hvzCY0ku8int6d9SSXvUU/lauDcnEh3MnmDHQks3VQTjLiaOfQeB1sNfvop86DjGhEYyXDjsw5kWkiLYmy8TeDZ86HzFWCJVnW0hQ+CyBzFJkj9aVl4EuRLPd1VPn4rDNJ1gRMyGf5L8o6ksqjns5L34zA5jEHRA8C0Zhh+d0MjF8IGNYawpNOS5mqgwEzcyURa43ZLn++HfG7U/VSM9mv3TEF48iIUU2btR2ryewz1pndWc/aMX4atyNqsg4AyaxyxEb/Gg0jLs/zyjOSdUzWTiCZX7OG+8bNeKr0vNCbxk/jNkQN1psg2ThK9RTGC8XykjgzfhqbzijZLDf/nceh9GhgNjK6RjfYPQjMtm3iJvZYH8nYrJ30Y65jI1zDJVp/L8gMy918s57aD388Di0IzvqX/v9ZZC9bE/WFbt/4o2GD/TNamLubF2vUCrGt/YgHpccePUVkawX6Z/91pbLqW2VrohFO3D9Dpw3bfVNIoUL7GeUxCjcaNZPRGZC9jz7js/m2WnmR3pgOTNxzfIUVbDPDVSj8SpNsYM1UNut38qn9SsS2eq5YEXE1ULBPi1oLU8GyXIXCszBv1r0EzHtmPvc6ZntxpWjCUQXyPMB2LyCwQuGHlOxf7nMJ2pkUTTitI7gLETKwtWeh0Ei8Of61ZogmXI3AnTs56zBYNDqzNaMoGYcmGQZcnkWe1dlgjGUjLR0AfJQJaC/gL+FeaIjO6nSBZk+kXFS0X4wvk4E5/p39LvEIraxOIH8Kx07hmbAuOwPpAkBjwCwALBWtUgF+B3gmrDmssCcqsGQUpEFmWb/AD6ainWe1EM7D4rsHaneuK8Eo2sXPeqqYZb2TDGR2fGa+fuamtP6+hk6yULafzfHY31ofW+9gwXjRspGWLgGKrfRWhNKdqoHJsBWef79/9/73szImE7IXMXPI7rio5k4bwRXCcWUIaMkYWBXIuDmzjbxL5WIkQ1pKJkwEmfhP75/JJUOEGdqkgQa8KRDf2ZMWHPbmHMnSQNviyNglcHzbV3vP8Y+QQTfek6uYssSxKDJ2CPBLE5FMlm3/BBn4Pkp6B1kSaX+ADL5TnpJJIu0PkMH38Jkb5XBOWzyZWJhlyeCJYOFkbPpn3/dgycAKcuFkstd3uPdQoEGwaDLpK08cGTQIFk2WncohMsifCyaTv4olvCOW9eeCZvSo3gZqDAkZsFixZbVzDkvL7QwY8zYFTAY0FIB3NGYCe4k2XuTvrgHvb0KhNic0pta2NUEGkUGpgy6FZ2djqsYo+hVBBpJBm932ZOZgS/bQKhAY8HY19G41hEZm9Ohr0ZN8qw3gtW/wffQsWZA98rMBm47s0hfsAQK+ww+juet5oy3ZqGX2zmSvIKrJ4GYkNskXbWmEMbu0qnyhIpOUkfAusoYrEWyL2T3Wg0n7a0hauNiuGVvCtbrlSqpYWTMoaU8SWXcZEzZGL5c9pUA1wJH3cZF2jKBs65hxGnGtrp6du+zRDrIzj6r3jXzd7k6ocEq4BKvyMuFPTrDdjJT9guT7MNQ3k811Gd3+fkR19jIReweppyQsmXJv2abKTd5ciHtT/hFYeAJ2dj5xMwd02G5B+r5U6qMfO9Duzfr6BZVvf/81hapU/EPD80nNAc40a12m1ZimQ5uulxei14x/6EnlS8x1CXzQaps0zEL0P0P2ZbMTk32CbbcnzWImZPNqzWbYmA3XZ28O3dm4JIbqAYjrTThzC0CuASCupyO2n+NMlyeYJp1FjCONyAK2fLq1klSBbZhoSJaTjWtqiucy7bXa7thmvVYZvbrEhMu8P23boH+o3z03lqtr2AM2T+fcsHeuFi+Ra9nvm2smV26yUDkVG6tWaztPr+FXr/4P4I1niHYD7rYAAAAASUVORK5CYII=" alt="User Icon" />
      </div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <label for="username">Identifiant</label>
        <div class="input-container">
          <i class="fa fa-user"></i>
          <input type="text" id="username" placeholder="Enter your Identifiant" v-model="username" required />
        </div>

        <label for="password">Password</label>
        <div class="input-container">
          <i class="fa fa-lock"></i>
          <input type="password" id="password" placeholder="Enter your Password" v-model="password" required />
        </div>

        <label for="role">Rôle</label>
        <div class="input-container">
          <i class="fa fa-user-tag"></i>
          <select id="role" v-model="role" required>
            <option value="Administrator">Administrator</option>
            <option value="Coach">Coach</option>
            <option value="Player">Player</option>
            <option value="Spectator">Spectator</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <div class="redirect">
        <span>Already Have An Account ? <a href="/login">Login</a></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name : "RegisterComponent",
  data() {
    return {
      username: "",
      password: "",
      role: "Player", // Default role
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://localhost:3000/users/register", {
          username: this.username,
          password: this.password,
          role: this.role,
        });
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = "Registration failed. Please try again.";
      }
    },
  },
  mounted() {
    // Redirect if already logged in
    const user = localStorage.getItem("user");
    if (user) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #5b86e5, #36d1dc);
}

.form-container {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.icon {
  margin-bottom: 15px;
}

.icon img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f4f4f9;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  text-align: left;
  margin-bottom: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
}

.input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 15px;
  background: #f9f9f9;
}

.input-container i {
  margin: 0 10px;
  color: #888;
}

input, select {
  border: none;
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  background: transparent;
  outline: none;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #2980b9;
}

.redirect {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #555;
}

.redirect a {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}

.redirect a:hover {
  text-decoration: underline;
}
</style>