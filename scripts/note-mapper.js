class NoteMapper {
  static PENTATONIC = ["C", "D", "E", "G", "A"];
  static FILE_INDEX = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
  static JUDGMENT_SHIFT_SEMITONES = {
    Inaccuracy: 3,
    Mistake: 7,
    Blunder: 12,
  };

  static squareToNote(square) {
    const file = square[0];
    const rank = Number(square[1]);
    const note =
      this.PENTATONIC[this.FILE_INDEX[file] % this.PENTATONIC.length];
    const octave = 3 + Math.floor((rank - 1) / 6);
    return `${note}${octave}`;
  }

  static forMove(move, judgmentName) {
    const shift = this.JUDGMENT_SHIFT_SEMITONES[judgmentName] ?? 0;
    const baseNote = this.squareToNote(move.to);
    const note = shift
      ? Tone.Frequency(baseNote).transpose(shift).toNote()
      : baseNote;
    const velocity = shift ? 0.9 : 0.6;
    return { note, shift, velocity };
  }
}
