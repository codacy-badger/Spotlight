const scopes = 'playlist-read-private playlist-modify-private playlist-modify-public';
const CALLBACK = "http://localhost:63342/SpotifyHightlight/";
const SPOTIFY_CLIENT_ID = "a54826f423c342eb87ab7586c046bda6";

var app = new Vue({
    el: '#app',
    methods: {
        authorize: function () {
            document.location = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(CALLBACK)}`;
        }
    },
    mounted: function () {
        if (!location.hash) return;

        var parametersReturnedFromSpotify = JSON.parse('{"' + location.hash.replace(/#/g, '').replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
            return key === "" ? value : decodeURIComponent(value)
        });
        this.accessToken = parametersReturnedFromSpotify["access_token"];
    }
})