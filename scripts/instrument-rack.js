class InstrumentRack {
  constructor(selectEl) {
    this.select = selectEl;

    this.masterVolume = new Tone.Volume(-18).toDestination();
    this.reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 }).connect(this.masterVolume);

    this.instruments = {
      soft: new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.02, decay: 0.2, sustain: 0.2, release: 1 },
      }).connect(this.reverb),
      warm: new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 1.2 },
      }).connect(this.reverb),
      pluck: new Tone.PluckSynth({
        attackNoise: 2,
        dampening: 4000,
        resonance: 0.7,
        volume: 6,
      }).connect(this.reverb),
      bell: new Tone.FMSynth({
        harmonicity: 3,
        modulationIndex: 10,
        envelope: { attack: 0.01, decay: 0.4, sustain: 0.1, release: 1.2 },
        modulation: { type: "square" },
      }).connect(this.reverb),
    };
  }

  current() {
    return this.instruments[this.select.value] ?? this.instruments.soft;
  }
}
