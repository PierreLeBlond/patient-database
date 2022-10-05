const load = (_: HTMLElement, { delay = 0, duration = 400 }) => {
  return {
    delay,
    duration,
    css: (t: number) => `width: ${Math.atan(t) * 2 / Math.PI * 100}`
  }
};

export { load };