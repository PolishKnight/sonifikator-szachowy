# Sonifikator Szachowy

**Wersja online:** [polishknight.github.io/sonifikator-szachowy](https://polishknight.github.io/sonifikator-szachowy/)

Wklejasz ID partii (albo cały link) z [lichess.org](https://lichess.org), a aplikacja zamienia rozegrane ruchy na dźwięk - pozycja bierki decyduje o wysokości nuty, figura o barwie, błędy (Inaccuracy/Mistake/Blunder) podbijają nutę wyżej i głośniej, a tempo odtwarzania odzwierciedla realny czas namysłu graczy.

## Funkcje

- Pobieranie partii z Lichess API (ruchy, zegary, analiza silnika).
- Parsowanie PGN przez `chess.js` i granie dźwięków przez `Tone.js`.
- Wybór jednego z czterech instrumentów (sinus, trójkąt, struny, dzwonki FM).
- Tempo odtwarzania skalowane z realnego czasu namysłu na ruch.
- Podświetlanie aktualnie granego ruchu na liście + podgląd granej nuty.
- Kliknięcie w dowolny ruch na liście uruchamia odtwarzanie od tego miejsca.
- Przełącznik motywu kolorystycznego (domyślny / jasny / ciemny), zapamiętywany w przeglądarce.

## Uruchomienie

Strona musi być serwowana przez `http://`, a nie otwierana bezpośrednio jako plik (`file://`) - niektóre dźwięki (np. struny) korzystają wewnętrznie z AudioWorkletu, którego przeglądarki nie ładują z originu `file://`.

Najprościej lokalnie, np.:

```bash
python -m http.server 5500
```

i otwórz `http://localhost:5500` w przeglądarce. Alternatywnie w VS Code: rozszerzenie "Live Server" → "Open with Live Server".

## Wersja online (GitHub Pages)

Po włączeniu GitHub Pages (Settings → Pages → branch `main`, folder `/ (root)`) strona działa pod `https://polishknight.github.io/sonifikator-szachowy/` - GitHub Pages serwuje pliki przez HTTPS, więc ograniczenie z sekcji "Uruchomienie" dotyczy wyłącznie otwierania pliku lokalnie z dysku.

## Struktura projektu

```
index.html
scripts/
  lichess-game.js     # pobieranie i parsowanie partii z Lichess
  note-mapper.js       # mapowanie ruchu szachowego na nutę
  piece-symbols.js      # symbole figur do wyświetlania
  instrument-rack.js    # syntezatory Tone.js
  moves-view.js         # renderowanie listy ruchów, podświetlanie, "teraz gra"
  theme-switcher.js     # przełącznik motywu kolorystycznego
  player.js              # sterowanie odtwarzaniem (Tone.Transport)
  app.js                 # spięcie wszystkiego, obsługa zdarzeń
styles/
  styles.css            # zbiera pozostałe pliki przez @import
  theme.css             # zmienne kolorów i motywy
  layout.css            # układ strony
  components.css        # przyciski, input, lista ruchów
```
