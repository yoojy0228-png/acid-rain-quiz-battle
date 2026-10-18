/* Original synthesized UI sound effects. No third-party audio files. */
(() => {
  let ctx = null;
  let enabled = true;
  function audioContext() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function tone(c, frequency, endFrequency, start, duration, type, volume) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(frequency, start);
    if (endFrequency) osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume || 0.07, start + Math.min(.025, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(start);
    osc.stop(start + duration + .02);
  }
  function play(name) {
    if (!enabled) return;
    const c = audioContext();
    if (!c) return;
    const t = c.currentTime + .01;
    if (name === "click") tone(c, 620, 420, t, .07, "triangle", .035);
    else if (name === "start") { tone(c, 330, 660, t, .12, "sine", .055); tone(c, 495, 880, t + .11, .16, "triangle", .05); }
    else if (name === "correct") { tone(c, 523, 784, t, .11, "triangle", .065); tone(c, 784, 1046, t + .09, .14, "sine", .055); }
    else if (name === "wrong") { tone(c, 220, 95, t, .22, "sawtooth", .045); }
    else if (name === "timeout") { tone(c, 440, 110, t, .28, "square", .035); }
    else if (name === "win") { tone(c, 523, 659, t, .13, "triangle", .06); tone(c, 659, 784, t + .12, .13, "triangle", .06); tone(c, 784, 1046, t + .24, .22, "sine", .06); }
    else if (name === "lose") { tone(c, 330, 220, t, .18, "triangle", .05); tone(c, 220, 110, t + .17, .3, "sawtooth", .035); }
  }
  function setEnabled(value) { enabled = !!value; }
  function isEnabled() { return enabled; }
  window.AcidAudio = { play, setEnabled, isEnabled };
})();
