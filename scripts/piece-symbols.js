class PieceSymbols {
  static MAP = {
    w: { p: "♙", n: "♘", b: "♗", r: "♖", q: "♕", k: "♔" },
    b: { p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚" },
  };

  static for(color, piece) {
    return this.MAP[color][piece];
  }
}
