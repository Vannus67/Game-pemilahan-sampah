// Synthesized Web Audio API sound effects — works 100% offline with zero external audio assets.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    delay = 0,
    gainPeak = 0.16
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  public playCorrect() {
    // Cheerful ascending C5 -> E5 -> G5 -> C6 chime
    this.playTone(523.25, 0.14, 'triangle', 0, 0.18);
    this.playTone(659.25, 0.14, 'triangle', 0.08, 0.18);
    this.playTone(783.99, 0.16, 'triangle', 0.16, 0.18);
    this.playTone(1046.5, 0.28, 'sine', 0.24, 0.2);
  }

  public playWrong() {
    // Gentle descending "oops" tone (not harsh)
    this.playTone(330, 0.16, 'sine', 0, 0.16);
    this.playTone(247, 0.26, 'triangle', 0.12, 0.15);
  }

  public playPickup() {
    this.playTone(440, 0.07, 'sine', 0, 0.1);
  }

  public playClick() {
    this.playTone(587.33, 0.06, 'sine', 0, 0.09);
  }

  public playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    const delays = [0, 0.1, 0.2, 0.3, 0.45, 0.58];
    notes.forEach((n, idx) => {
      this.playTone(n, idx === notes.length - 1 ? 0.45 : 0.16, 'triangle', delays[idx], 0.18);
    });
  }
}

export const soundEngine = new SoundEngine();
