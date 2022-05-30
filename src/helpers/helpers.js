/**
 * Interval timer.
 *
 * @param {number} duration (milliseconds)
 * @param {number} interval (milliseconds)
 * @param {function} intervalCb
 * @param {function} completeCb
 */
export const intervalTimer = (
  duration,
  interval,
  intervalCb,
  completeCb = (i) => {}
) => {
  // Define count.
  let count = duration / interval;

  // Execute interval callback.
  intervalCb(count);

  // Define timer.
  const timer = () => {
    // Decrement count.
    count = count - 1;

    // If count is LTE zero.
    if (count <= 0) {
      // Clear interval.
      clearInterval(counter);

      // Execute complete callback;
      completeCb(count);
    }

    // Execute interval callback.
    intervalCb(count);
  };

  // Define counter.
  const counter = setInterval(timer, interval);

  // Return this so it can be cancelled later.
  return counter;
};

/**
 * Shuffles an array using Fisher-Yates.
 *
 * @param {array} array
 * @returns array
 */
export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
