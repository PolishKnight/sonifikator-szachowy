class Player {
  constructor(instrumentRack, movesView) {
    this.instrumentRack = instrumentRack;
    this.movesView = movesView;
    this.game = null;
  }

  setGame(game) {
    this.game = game;
  }

  async playFrom(startIndex) {
    if (!this.game) return;

    await Tone.start();
    Tone.Transport.cancel();
    Tone.Transport.stop();

    const durations = this.game.durations();
    const synth = this.instrumentRack.current();

    let elapsed = 0;
    for (let i = startIndex; i < this.game.moves.length; i++) {
      const move = this.game.moves[i];
      const judgment = this.game.judgmentFor(i);
      const { note, shift, velocity } = NoteMapper.forMove(move, judgment);

      Tone.Transport.scheduleOnce((time) => {
        synth.triggerAttackRelease(note, "8n", time, velocity);
        Tone.Draw.schedule(() => {
          this.movesView.highlightMove(i);
          this.movesView.showNowPlaying(note, shift);
        }, time);
      }, elapsed);
      elapsed += durations[i];
    }

    Tone.Transport.scheduleOnce(() => {
      Tone.Draw.schedule(() => {
        this.movesView.clearHighlight();
        this.movesView.clearNowPlaying();
      }, Tone.now());
    }, elapsed);

    Tone.Transport.start();
  }
}
