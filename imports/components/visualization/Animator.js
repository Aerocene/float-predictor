/**
 * Animator.js - manages interpolations during animations.
 * It interpolates between starting values and ending values in the time interval
 * passed as parameter.
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

import AppUtil from '../../AppUtil'

class Animator {

  constructor() {
    this.active = false;
  }

  // flag we use to signal mobile apps when we are done with first animation
  init = true;

  /**
   * Start the animator with a new start/end values.
   * @param {Object} config
   * config.init_values: array for the starting values
   * config.end_values: array for the end values
   * config.interval: interpolation time interval
   * config.time_start: time start
   * config.sine_interpolation: true if we want a sine interpolations rather than linear
   */
  start(config) {
    this.active = true;
    this.config = config;
    this.values = [];
    this.alpha = 0;
    this.time = config.time_start;
    if (!this.config.time_start) this.config.time_start = 0;
    if (!this.config.interval) this.config.interval = 1;
    this.config.init_values.forEach((v) => {
      this.values.push(v);
    });
  }

  /**
   * Stop the animator.
   */
  stop() {
    this.active = false;
  }

  /**
   * Update the animator by adding the elapsed time to the internal time counter.
   */
  update(elapsedTime) {
    if (this.active) {
      this.alpha = (this.time - this.config.time_start) / this.config.time_interval;
      if (this.alpha <= 1 && this.alpha >= 0) {
        /* sine interpolation */
        if (this.config.sine_interpolation) { this.alpha = Math.sin(this.alpha * Math.PI * 0.5); }
        for (let i = 0; i < this.values.length; i += 1) {
          this.values[i] = (this.config.init_values[i] * (1.0 - this.alpha)) +
            (this.config.end_values[i] * this.alpha);
        }
        if (this.config.onAnimationUpdate) { this.config.onAnimationUpdate(this.values); }
      } else {
        this.active = false;
        if (this.config.onAnimationEnd) { this.config.onAnimationEnd(); }

        if (this.init === true) {
          this.init = false;
          // signal client
          // hook for mobile apps
          AppUtil.logFirstAnimationDone();
        }
      }
      this.time += elapsedTime;
    }
  }

  getValues() {
    return this.values;
  }

  isActive() {
    return this.active;
  }
}
export default new Animator();
