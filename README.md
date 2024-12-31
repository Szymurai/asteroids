# Excersice of building an Asteroids demo game written in Vanilia JS and Canvas

**The game is inspired by the 1979 Atari classic, Asteroids game.**

- Game (UI) is written in HTML Canvas element.
- Communication (Server) is written in Python Socket.
- If it will be, the auth and login functionality will be written in FastAPI (Python).

## Rysowanie statku

Funkcja rysująca spaceship każdorazowo rysuje statek na płaszczyźnie współrzędnych z układem odniesienia w punkcie (0, 0) "xCoordinates, yCoordinates)".

Wszystkie kształty (proste, okręgi) rysowane są w odniesieniu do tego punktu, a promień (`radius`) definiuje rozmiar statku. Funkcja używa współrzędnych biegunowych oraz krzywych kwadratowych (`quadraticCurveTo`) do stworzenia kształtu spaceship'a.
