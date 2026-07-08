class MovesView {
  constructor(outputEl, nowPlayingEl) {
    this.output = outputEl;
    this.nowPlaying = nowPlayingEl;
  }

  render(game) {
    const timeSpent = game.timeSpent();

    this.output.innerHTML = game.moves
      .map((move, i) => {
        const judgment = game.judgmentFor(i);
        const opponentColor = move.color === "w" ? "b" : "w";
        const flags = [
          move.captured ? `bicie ${PieceSymbols.for(opponentColor, move.captured)}` : null,
          move.san.includes("+") ? "szach" : null,
          move.san.includes("#") ? "mat" : null,
          judgment ?? null,
        ].filter(Boolean);
        const symbol = PieceSymbols.for(move.color, move.piece);
        const time = timeSpent[i] === null ? "" : ` [${timeSpent[i].toFixed(1)}s]`;
        const text = `${i + 1}. ${symbol} ${move.from}→${move.to}${time}${
          flags.length ? ` (${flags.join(", ")})` : ""
        }`;
        return `<span class="move" data-index="${i}">${text}</span>`;
      })
      .join("\n");
  }

  setStatus(text) {
    this.output.textContent = text;
  }

  onMoveClick(handler) {
    this.output.addEventListener("click", (event) => {
      const moveEl = event.target.closest(".move");
      if (!moveEl) return;
      handler(Number(moveEl.dataset.index));
    });
  }

  highlightMove(index) {
    this.clearHighlight();
    const current = this.output.querySelector(`.move[data-index="${index}"]`);
    if (current) {
      current.classList.add("current");
      current.scrollIntoView({ block: "nearest" });
    }
  }

  clearHighlight() {
    this.output.querySelectorAll(".move.current").forEach((el) => el.classList.remove("current"));
  }

  showNowPlaying(note, shift) {
    const label = shift ? ` (+${shift} półtonów)` : "";
    this.nowPlaying.textContent = `Grana nuta: ${note}${label}`;
  }

  clearNowPlaying() {
    this.nowPlaying.textContent = "";
  }
}
