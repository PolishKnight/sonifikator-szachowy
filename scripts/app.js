const gameIdInput = document.querySelector("#gameId");
const fetchButton = document.querySelector("#fetchButton");
const playButton = document.querySelector("#playButton");
const outputEl = document.querySelector("#output");
const nowPlayingEl = document.querySelector("#nowPlaying");
const instrumentSelect = document.querySelector("#instrument");
const themeButtons = document.querySelectorAll("[data-theme-choice]");

new ThemeSwitcher(themeButtons);

const movesView = new MovesView(outputEl, nowPlayingEl);
const instrumentRack = new InstrumentRack(instrumentSelect);
const player = new Player(instrumentRack, movesView);

fetchButton.addEventListener("click", async () => {
  const gameId = LichessGame.extractGameId(gameIdInput.value);
  if (!gameId) return;

  playButton.disabled = true;
  movesView.setStatus("Pobieranie...");

  try {
    const game = await LichessGame.fetch(gameId);
    player.setGame(game);
    movesView.render(game);
    playButton.disabled = game.moves.length === 0;
  } catch (error) {
    movesView.setStatus(`Błąd pobierania: ${error.message}`);
  }
});

playButton.addEventListener("click", () => player.playFrom(0));
movesView.onMoveClick((index) => player.playFrom(index));
