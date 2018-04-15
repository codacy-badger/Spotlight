<template>
  <div style="height: 100%;">
    <div id="playback-container">
      <h1>EXAMPLE TEXT <br>- PRODUCT NAME -</h1>
      <h2>Short description of the projects functions and abilitites, maybe with a catchy line</h2>
    </div>

    <div id="login-container">
      <h3>Get Started</h3>
      <img id="login-avatar" src="@/assets/avatar-icon.svg"/>
      <button id="login-button" v-on:click="authorize">Login</button>
      <h4>You will be redirected to the Spotify Website where you authenticate this application.<br>
        We will never post/edit anything without your explicit permission and access can always be revoked manually.
      </h4>

      <h5>Support this project:</h5>
      <a target="_blank" href="https://www.paypal.me/Florianisme/5">
        <img id="support-paypal" src="@/assets/paypal-icon.svg"/>
      </a>
      <a target="_blank" href="https://github.com/Florianisme/SpotifyHightlight">
        <img id="support-github" src="@/assets/github-icon.svg"/>
      </a>
    </div>
  </div>
</template>

<script>
  const scopes = '';
  const CALLBACK = "http://localhost:8080";
  const SPOTIFY_CLIENT_ID = "f11cabb0069043d18dc1e8f6d8d8b8c5";

  export default {
    name: 'Login',
    methods: {
      authorize: function () {
        //document.location = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(CALLBACK)}`;
        function getLoginURL(scopes) {
          return 'https://accounts.spotify.com/authorize?client_id=' + SPOTIFY_CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(CALLBACK) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
        }

        var url = getLoginURL([
          'playlist-read-private', 'playlist-modify-private', 'playlist-modify-public'
        ]);
        var width = 450,
          height = 730,
          left = (screen.width / 2) - (width / 2),
          top = (screen.height / 2) - (height / 2);

        var w = window.open(url,
          'Spotify',
          'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
      }
    },
    mounted: function () {
      if (!location.hash) return;

      var parametersReturnedFromSpotify = JSON.parse('{"' + location.hash.replace(/#/g, '').replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === "" ? value : decodeURIComponent(value)
      });
      this.accessToken = parametersReturnedFromSpotify["access_token"];


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500,700');

  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background-color: #FEFEFE;
  }

  #playback-container {
    width: 70%;
    height: 100%;
    float: right;
    background: url("../assets/party-background.jpeg") no-repeat, black;
    background-size: cover;
  }

  #login-container {
    width: 30%;
    height: 100%;
    float: left;
    box-shadow: 2px 0 15px black;
    background: #FAFAFA
  }

  #login-avatar {
    width: 6vw;
    height: 6vw;
    margin: 4vw auto auto;
    display: block;
  }

  #login-button {
    width: 14vw;
    height: 3vw;
    display: block;
    cursor: pointer;
    margin: 3em auto auto;
    border-radius: 3vw;
    border: 0;
    background: #1db954;
    box-shadow: 0 2px 5px #888888;
    font-size: 1vw;
    font-weight: bold;
    color: white;
    font-family: 'Montserrat', bold, serif;
    outline: 0;
  }

  #login-button:hover {
    box-shadow: 0 4px 10px #888888;
  }

  #login-button:active {
    box-shadow: 0 2px 5px #888888;
  }

  h1 {
    position: relative;
    font-size: 4vw;
    margin-top: 1em;
    text-align: center;
    color: white;
    font-family: 'Montserrat', medium, serif
  }

  h2 {
    position: relative;
    font-size: 1.7vw;
    margin-left: 15vw;
    margin-right: 15vw;
    text-align: center;
    color: white;
    font-family: 'Montserrat', medium, serif
  }

  h3 {
    font-size: 1.8vw;
    margin-top: 2em;
    text-align: center;
    color: #252525;
    font-family: 'Montserrat', bold, serif
  }

  h4 {
    font-size: 0.8vw;
    margin-top: 4em;
    margin-left: 8em;
    margin-right: 6em;
    text-align: left;
    color: #252525;
    font-family: 'Montserrat', medium, serif
  }

  h5 {
    font-size: 0.9vw;
    margin-top: 10em;
    margin-left: 7em;
    margin-right: 6em;
    text-align: left;
    color: #252525;
    font-family: 'Montserrat', medium, serif
  }

  #support-paypal {
    width: 1.4vw;
    height: 1.4vw;
    margin-left: 6vw;
  }

  #support-github {
    width: 1.4vw;
    height: 1.4vw;
    margin-left: 0.4vw;
  }

  a {
    text-decoration: none;
  }
</style>
