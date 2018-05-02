<template>
  <div class="main">
    <div id="header">
      <div id="header-text">
        <h1>Guten Abend,</h1>
        <h2 id="user">{{ user.id }}</h2>
      </div>
      <div id="header-user">
        <img id="avatar" src="@/assets/avatar-icon-white.svg"/>
        <img id="options" src="@/assets/options-arrow.svg"/>
      </div>
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
        <div id="draggable-container" v-on:click="getHighlightTime"></div>
        <div id="time-inputs">
          <div id="start-time">
            <input id="start-time-input" type="time" title="Beginn" v-model="startTimeGraph"
                   v-on:change="getHighlightTime"/>
            <label for="start-time-input" class="input-time-label">Uhr</label>
          </div>
          <div id="end-time">
            <input id="end-time-input" type="time" title="Ende" v-model="endTimeGraph" v-on:change="getHighlightTime"/>
            <label for="end-time-input" class="input-time-label">Uhr</label>
          </div>
        </div>
        <h4>Deine Party beginnt um {{ startTimeGraph }} Uhr, erreicht ihren Höhepunkt um {{ highlightTimeGraph }} Uhr
          und endet um circa {{ endTimeGraph }} Uhr</h4>
      </div>

      <div id="save-playlist">
        <h3>Speichere deine Playlist:</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import buildDraggableGraph from './../js/draggable-container';
  import moment from 'moment';

  export default {
    name: 'main',
    data() {
      return {
        user: {
          id: ""
        },
        playlists: [],
        selectedPlaylistId: undefined,
        startTimeGraph: "22:00",
        endTimeGraph: "06:00",
        highlightTimeGraph: "03:00",
        draggableAnchorPoint: undefined
      }
    },
    methods: {
      onPlaylistSelected(selectedPlaylist) {
        this.selectedPlaylistId = selectedPlaylist.id;

        this.playlists.forEach(playlist => {
          document.getElementById(playlist.id).className = '';
        });

        document.getElementById(selectedPlaylist.id).className = 'selectedPlaylist';
      },
      getHighlightTime() {
        if (this.draggableAnchorPoint === undefined)
          return;

        let startTime = moment(this.startTimeGraph, 'HH:mm').valueOf();
        let endTime = moment(this.endTimeGraph, 'HH:mm').add(1, 'd').valueOf();

        let duration = endTime - startTime;

        // calculate fraction and construct new Time
        let draggableContainer = document.getElementById('draggable-container');
        let fraction = this.draggableAnchorPoint.attrs.x / draggableContainer.offsetWidth;

        let highlightFraction = startTime + (duration * fraction);
        this.highlightTimeGraph = moment(highlightFraction).format('HH:mm');
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
          this.$data.user = response.data;
          if (response.data.images.length > 0) {
            document.getElementById("avatar").setAttribute("src", response.data.images[0].url);
          }
        }.bind(this));
    },
    mounted: function () {
      let draggableContainer = document.getElementById('draggable-container');
      this.draggableAnchorPoint = buildDraggableGraph(draggableContainer.offsetWidth, draggableContainer.offsetHeight);
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500,700');

  #header {
    float: top;
    width: 100%;
    background-color: #343434;
  }

  #header-text {
    display: inline-block;
  }

  #header-user {
    margin-top: 2.5vw;
    margin-right: 10vw;
    float: right;
  }

  #avatar {
    width: 6vw;
    height: 6vw;
    float: left;
    border-radius: 50%;
  }

  h1 {
    font-size: 2.5vw;
    margin-top: 3vw;
    margin-bottom: 0.5vw;
    margin-left: 5vw;
    color: white;
    font-family: 'Montserrat', medium, serif;
    font-weight: bold;
  }

  h2 {
    font-size: 2.2vw;
    margin-top: 0;
    margin-bottom: 2.5vw;
    margin-left: 5vw;
    color: white;
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

  /* Do NOT delete, used in code */
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
    width: 70%;
    height: 15vw;
    background: #FFFFFF;
    display: block;
  }

  #time-inputs {
    margin-top: 0.5vw;
  }

  #start-time, #end-time {
    display: inline-block;
  }

  #end-time {
    margin-left: 27%;
  }

  .input-time-label {
    color: black;
    font-family: 'Montserrat', medium, serif;
    font-weight: normal;
  }

  input[type="time"] {
    color: black;
    font-family: 'Montserrat', medium, serif;
    font-weight: normal;
    font-size: 1vw;
  }

  h4 {
    font-size: 1.1vw;
    color: gray;
    font-family: 'Montserrat', medium, serif;
    font-weight: normal;
    margin-top: 2vw;
    margin-right: 30%;
  }
</style>
