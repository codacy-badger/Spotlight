<template>
  <div>
    <div id="header">
      <h1>Guten Abend,</h1>
      <h2 id="user">{{ username }}</h2>
    </div>

    <div id="actions">
      <div id="choose-playlist">
        <h3>Wähle die gewünschte Playlist aus:</h3>
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
  let user = {
    username: "Florianisme"
  };
  export default {
    name: '#user',
    data() {
      return user;
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
