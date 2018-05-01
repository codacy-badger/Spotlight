import com.wrapper.spotify.SpotifyApi
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main(args: Array<String>) {
    embeddedServer(Netty, port = 8080) {
        routing {
            get("/") {
                val token = call.parameters["token"]
                val playlistName = call.parameters["playlist"]?.trim()

                if (token.isNullOrEmpty()) {
                    call.respond(HttpStatusCode.Forbidden)
                    return@get
                }
                if (playlistName.isNullOrEmpty()) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }

                val spotifyApi = SpotifyApi.Builder()
                        .setAccessToken(token)
                        .build()
                val usersPlaylists = spotifyApi.listOfCurrentUsersPlaylists
                        .build()
                        .execute()
                val playlist = usersPlaylists.items.find { it.name?.trim().equals(playlistName) }
            }
        }
    }.start(wait = true)
}