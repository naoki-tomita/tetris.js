let playing = false;
export function loop(fn: () => void) {
  playing = true;
  function run() {
    fn();
    if (playing) {
      window.requestAnimationFrame(run);
    }
  }
  run();
}

export function pause() {
  playing = false;
}
