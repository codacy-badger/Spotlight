var scopes = 'playlist-read-private playlist-modify-private playlist-modify-public';
var CALLBACK = "http://localhost:63342/SpotifyHightlight/";
var SPOTIFY_CLIENT_ID = "a54826f423c342eb87ab7586c046bda6";

var app = new Vue({
    el: '#app',
    data: {},
    methods: {
        authorize: function () {
            var url = 'https://accounts.spotify.com/authorize?client_id=' + SPOTIFY_CLIENT_ID +
                '&response_type=token' +
                '&scope=' + encodeURIComponent(scopes) +
                '&redirect_uri=' + encodeURIComponent(CALLBACK);
            document.location = url;
        }
    }
})