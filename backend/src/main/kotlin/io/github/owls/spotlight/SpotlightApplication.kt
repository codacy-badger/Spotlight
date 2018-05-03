package io.github.owls.spotlight

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SpotlightApplication

fun main(args: Array<String>) {
    runApplication<SpotlightApplication>(*args)
}
