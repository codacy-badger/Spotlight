<template>
  <div class="main">
    <div id="header">
      <h1>Guten Abend,</h1>
      <h2 id="user">{{ user.id }}</h2>
    </div>

    <div id="actions">
      <div id="choose-playlist">
        <h3 id="playlist">Wähle die gewünschte Playlist aus:</h3>
        <ul>
          <li v-for="playlist in playlists" v-bind:id="playlist.id" v-on:click="onPlaylistSelected(playlist)">
            {{ playlist.name }}
          </li>
        </ul>
      </div>

      <div id="adjust-curve">
        <h3>Passe die Spotlight-Kurve an:</h3>
      </div>

      <div id="save-playlist">
        <h3>Speichere deine Playlist:</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'main',
    data() {
      return {
        user: {
          id: ""
        },
        playlists: [],
        selectedPlaylistId: undefined
      }
    },
    methods: {
      onPlaylistSelected(selectedPlaylist) {
        this.selectedPlaylistId = selectedPlaylist.id;

        this.playlists.forEach(function(playlist) {
          document.getElementById(playlist.id).className = '';
        });
        document.getElementById(selectedPlaylist.id).className = 'selectedPlaylist';
      }
    },
    created: function () {
      const instance = axios.create({
        baseURL: 'https://api.spotify.com/v1/me',
        timeout: 1000,
        headers: {
          'Authorization': `Bearer ${this.$route.params.accessToken}`
        }
      });
      instance.get("/playlists")
        .then(function (response) {
          this.$data.playlists = response.data.items;
        }.bind(this));

      instance.get("")
        .then(function (response) {
          this.$data.user = response.data
        }.bind(this));
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500,700');

  #header {
    float: top;
    width: 100%;
    margin-left: 3.5em;
    margin-top: 1.5em;
  }

  h1 {
    font-size: 2.5vw;
    margin-bottom: 0.5em;
    margin-top: 1.5vw;
    color: black;
    font-family: 'Montserrat', medium, serif;
    font-weight: normal;
  }

  h2 {
    font-size: 2.2vw;
    margin-top: 0;
    color: black;
    font-family: 'Montserrat', medium, serif;
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
    height: 50vh;
    width: 25vw;
    margin-top: 8vh;
    overflow: hidden;
    overflow-y: scroll;
  }

  li {
    font-size: 1.4vw;
    cursor: pointer;
    color: black;
    padding-bottom: 2vw;
    padding-top: 1.6vw;
    padding-left: 1.6vw;
    margin-right: 1.2vw;
    font-family: 'Montserrat', medium, serif;
    font-weight: normal;
    border-bottom: 2px solid black;
  }

  .selectedPlaylist {
    color: white;
    background-color: #1db954;
  }

  ::-webkit-scrollbar {
    width: 0.6vw;
  }

  ::-webkit-scrollbar-track {
    background-color: #FFFFFF;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #dbdbdb;
    border-radius: 10px;
  }

  #actions {
    width: 100%;
    margin-top: 5em;
    margin-left: 3.5em;
  }

  #choose-playlist {
    float: left;
    width: 33%;
  }

  #adjust-curve {
    float: left;
    width: 33%;
  }

  #save-playlist {
    float: left;
    width: 33%;
  }

  h3 {
    font-size: 1.3vw;
    margin-top: 0;
    color: black;
    font-family: 'Montserrat', bold, serif;
  }

  #draggable-container {
    width: 400px;
    height: 200px;
    background: #4d4d4d;
    display: block;
  }
</style>
