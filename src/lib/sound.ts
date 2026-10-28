/**
 * Web Audio API Analog Shutter Sound Synthesizer
 * Zero network dependencies, zero asset latency.
 * Pure physical synthesis of a mechanical leaf shutter and mirror slap.
 */

let audioCtx: AudioContext | null = null;
let isMuted: boolean = true;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundMuted(): boolean {
  return isMuted;
}

export function toggleSound(): boolean {
  isMuted = !isMuted;
  if (!isMuted) {
    // Play a tiny feedback tick
    playMechanicalClick();
  }
  return isMuted;
}

export function setSoundMuted(muted: boolean): void {
  isMuted = muted;
}

/**
 * Play a tiny mechanical tactile click (button press, aperture blade click)
 */
export function playMechanicalClick(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.03);
}

/**
 * Play full analog camera shutter snap:
 * 1. Mirror slap upward
 * 2. Curtain exposure slit (filtered noise)
 * 3. Second curtain catch
 */
export function playShutterSnap(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Initial mechanical clack
  playMechanicalClick();

  // 2. Filtered noise burst (shutter curtain travel)
  const bufferSize = ctx.sampleRate * 0.06;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2600, now);
  filter.Q.setValueAtTime(2.5, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.3, now + 0.005);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

  whiteNoise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  whiteNoise.start(now + 0.005);

  // 3. Second mechanical catch (45ms later)
  setTimeout(() => {
    if (!isMuted && audioCtx) {
      const catchNow = audioCtx.currentTime;
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(900, catchNow);
      osc2.frequency.exponentialRampToValueAtTime(180, catchNow + 0.03);

      gain2.gain.setValueAtTime(0.25, catchNow);
      gain2.gain.exponentialRampToValueAtTime(0.001, catchNow + 0.03);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);

      osc2.start(catchNow);
      osc2.stop(catchNow + 0.035);
    }
  }, 45);
}
