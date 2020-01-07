/**
 * DaysLabels.js - creates and defines the behaviour of days labels.
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

import _ from 'lodash';
import THREELabel from './THREELabel';

const THREE = require('three');

const NUM_LABELS = 16;

class DaysLabels
{
  constructor(scene, camera, radius) 
  {
    this.daysLabels = [];
    this.rotationIndex = 0;
    this.daysLabels = [];

    for (let i = 0; i < NUM_LABELS; i += 1) 
    {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 0.001, 5, 5),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      scene.add(sphere);

      const label = new THREELabel(
        scene, 
        camera, 
        'Raleway-Medium', 
        11, 
        'rgba(30,30,30,0)', 
        'rgba(255,255,255,1)', 
        sphere);
      this.daysLabels.push(label);
    }
  }

  updatePosition() {
    _.each(this.daysLabels, (l) => { l.updatePosition(); });
  }

  setVisible(visible) {
    _.each(this.daysLabels, (l) => { l.setVisible(visible); });
  }

  setScale(t) {
    _.each(this.daysLabels, (l) => { l.setScale(t); });
  }
  /**
   * Fill and show the labels with the days info for the trajectory.
   * @param {Integer} explorerIndex
   * @param {Array} explorers
   */
  show(explorerIndex, explorers) 
  {
    // set all invisible
    this.setVisible(false);

    const explorer = explorers[explorerIndex];

    for (let j = 1; j <= (NUM_LABELS - explorer.dayOffset); j++) 
    {
      const dt = new Date();
      dt.setDate(dt.getDate() + j + explorer.dayOffset);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const text = `${dt.getDate()} ${monthNames[dt.getMonth()]}`;
      const alpha = j / (NUM_LABELS - explorer.dayOffset);

      this.daysLabels[j-1].set(text, explorers[explorerIndex].getPosition(alpha));
      this.daysLabels[j-1].updatePosition();
    }
  }
}
export default DaysLabels;
