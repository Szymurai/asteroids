# Excersice of building an Asteroids demo game written in Vanilia JS and Canvas

**The game is inspired by the 1979 Atari classic, Asteroids game.**

- Game (UI) is written in HTML Canvas element.
- Communication (Server) is written in Python Socket.
- If it will be, the auth and login functionality will be written in FastAPI (Python).

## Rysowanie statku

Funkcja rysująca spaceship każdorazowo rysuje statek na płaszczyźnie współrzędnych z układem odniesienia w punkcie `(0, 0)` "xCoordinates, yCoordinates)".

Wszystkie kształty (proste, okręgi) rysowane są w odniesieniu do tego punktu, a promień (`radius`) definiuje rozmiar statku. Funkcja używa współrzędnych biegunowych oraz krzywych kwadratowych (`quadraticCurveTo`) do stworzenia kształtu spaceship'a.

Na podstawie powyższego środek statku znajduje się w punkcie `(0, 0)`, a przód statku jest na dodatniej osi x, w punkcie `(radius, 0)`.

`curve` to współczynnik, który kontroluje, jak bardzo tył statku będzie wygięty. Jest to wartość w zakresie od 0 do 1.

Gdy `curve` wynosi 1, punkt kontrolny krzywej znajdzie się dokładnie w pozycji `(0, 0)` (na środku statku).
Gdy natomiast `curve` wyniesie 0, punkt kontrolny znajdzie się dokładnie na pozycji `(-radius, 0)`.

_Notice: Tthe curve doesn’t necessarily pass through the dot but is drawn towards it._

_Notice: The ship should be drawn as close to the circle edge as
possible so that collisions are more accurate._

_Wyzwaniem może okazać się zamiana współrzędnych biegunowych na współrzędne kartezjańskie. Natomiast powyższe odbywa się za pomocą dwóch poniższych wzorów:_
**Miara kątów podawana jest w radianach, 360 stopni równa się 2\*Math.PI, 180 stopni (połowa okręgu) równa się Math.PI.**

- xCoordinate = radius \* Math.cos(Math.PI) _(punkt na osi x)_
- yCoordinate = radius \* Marth.sin(Math.PI) _(punkt na osi y)_

Wówczas powinniśmy otrzymać wypadkową tych dwóch punktów w punkcie (xCoordinate, yCoordinate), który będzie znajdował się na obrysie okręgu.

Warto w tym miejscu zapamiętać, że `cosinus` odnosi się do osi x, a `sin` do osi y.

![Sine and cosine of an angle, Math.PI](D5g1.png)
