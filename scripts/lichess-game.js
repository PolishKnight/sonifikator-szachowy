class LichessGame {
  static endpointFor(gameId) {
    return `https://lichess.org/game/export/${gameId}?moves=true&clocks=true&evals=true&pgnInJson=true`;
  }

  static extractGameId(input) {
    let trimmed = input.trim();
    if (!trimmed) return "";

    if (trimmed.includes("lichess.org") && !/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
    }

    try {
      const url = new URL(trimmed);
      const [id] = url.pathname.split("/").filter(Boolean);
      return id ?? "";
    } catch {
      return trimmed;
    }
  }

  static async fetch(gameId) {
    const response = await fetch(this.endpointFor(gameId), {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return new LichessGame(await response.json());
  }

  static SPEED_UP = 0.15;
  static MIN_STEP = 0.12;
  static MAX_STEP = 1.5;
  static DEFAULT_STEP = 0.35;

  constructor(rawData) {
    this.raw = rawData;

    const chess = new Chess();
    chess.load_pgn(rawData.pgn);
    this.moves = chess.history({ verbose: true });
  }

  judgmentFor(moveIndex) {
    return this.raw.analysis?.[moveIndex]?.judgment?.name;
  }

  timeSpent() {
    const { clocks } = this.raw;
    if (!Array.isArray(clocks) || clocks.length < this.moves.length) {
      return new Array(this.moves.length).fill(null);
    }

    const incrementCentis = (this.raw.clock?.increment ?? 0) * 100;
    const initialCentis = (this.raw.clock?.initial ?? 0) * 100;

    return clocks.slice(0, this.moves.length).map((clockAfter, i) => {
      const clockBefore = i >= 2 ? clocks[i - 2] : initialCentis;
      return Math.max(0, clockBefore - clockAfter + incrementCentis) / 100;
    });
  }

  durations() {
    const { SPEED_UP, MIN_STEP, MAX_STEP, DEFAULT_STEP } = LichessGame;
    return this.timeSpent().map((seconds) =>
      seconds === null
        ? DEFAULT_STEP
        : Math.min(MAX_STEP, Math.max(MIN_STEP, seconds * SPEED_UP)),
    );
  }
}
