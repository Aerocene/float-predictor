/**
 * Explorer.js - creates and defines the style & behaviour of the Explorers.
 * It computes explorer positions based on elapsed days and trajectory data.
 *
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/


/* eslint-disable no-mixed-operators, no-console, no-param-reassign, max-len */

const THREE = require('three');
const MeshLine = require( 'three.meshline' );

const DIRECT_RESULT = false;

const USE_SPHERES = false;
const ATTACK_DECAY = 12;
const EARTH_RADIUS = 6378.137;
const SCENE_SCALE = EARTH_RADIUS / 200.0;
const LINE_SCALE_FACTOR = 300;

class Explorer {
  constructor(scene, color, dayOffset, pars, shift = 0, nPoints = 1) {
    this.nPoints = nPoints;
    this.dayOffset = dayOffset;
    this.max_points = 128 * this.nPoints;
    // console.log(this.max_points);
    this.scene = scene;
    this.index = 0;
    this.destination = { lat: 0, lng: 0 };
    this.array = new Float32Array(this.max_points * 3 * 2);
    this.shift = shift;
    this.speed = [];
    this.distance = [];
    this.altitudeRatio = [];
    this.altitude = [];
    this.avgSpeed = 0;
    this.totalDistance = 0;
    const c = 0xffffff;

    this.lineWidth = pars.explorerSettings.line_width / LINE_SCALE_FACTOR;

    this.sphereMaterial = new THREE.MeshBasicMaterial({ transparent: true, color: c, opacity: 0.0 });
    this.animatingSphereMaterial = new THREE.MeshBasicMaterial({ transparent: true, color: color, opacity: 1.0 });
    this.facesMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
    this.lineSegmentMaterial = new THREE.LineBasicMaterial({ transparent: true, color: 0xaaaaaa, opacity: 0.0, linewidth: 10.0 });
    
    this.lastPosition = new THREE.Vector3(0, 0, 0);
    this.spheres = [];
    this.lineOpacity = pars.explorerSettings.opacity || 1;
    this.originalData = [];

    const segmentIndexes = [];
    
    for (let i = 0; i < this.max_points; i += 1) {
      this.distance.push(0);
      this.speed.push(0);
      this.altitudeRatio.push(0);
      this.altitude.push(0);
      segmentIndexes.push((i) * 2);
      segmentIndexes.push(((i) * 2) + 1);
    }

    this.animatingSphere = new THREE.Mesh(new THREE.TetrahedronGeometry(1.5, 0), this.animatingSphereMaterial);
    scene.add(this.animatingSphere);
    // this.animatingSphere.visible=false;

    //-----------------------------------------------
    // setup line segments
    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(this.array, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(segmentIndexes), 1));
    this.segments = new THREE.LineSegments(geometry, this.lineSegmentMaterial);
    this.scene.add(this.segments);


    //-----------------------------------------------
    // setup meshline    
    // https://github.com/spite/THREE.MeshLine

    // Create the line geometry used for storing verticies
    this.lineGeometry = new THREE.Geometry();
    for( var j = 0; j < this.max_points; j++ ) {
      var v = new THREE.Vector3( 0, 0, 0 );
      this.lineGeometry.vertices.push( v );
    }

    this.lineMaterial = new MeshLine.MeshLineMaterial( {
      color: new THREE.Color( color ),
      transparent: true,
      opacity: this.lineOpacity,
      resolution: new THREE.Vector2( window.innerWidth, window.innerHeight ),
      sizeAttenuation: 1,
      lineWidth: this.lineWidth,
      near: 1,
      far: 100000,
      depthTest: true,
      // blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });

    this.scene = scene;
    this.setupLine();


    //-----------------------------------------------
    // setup kite
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(this.array, 3));
    this.mesh = new THREE.Mesh(geometry, this.facesMaterial);
    this.mesh.drawMode = THREE.TriangleStripDrawMode;
    scene.add(this.mesh);

    this.currentPosition = new THREE.Vector3(0, 0, 0);

    /* Add setOpacity method for the material */
    THREE.Material.prototype.setOpacity =
    function setOpacity(opacity, animationTime, callback) {
      function animate(material, countdown, v) {
        material.opacity += v;
        // material.nee
        if (countdown > 0) {
          setTimeout(() => { animate(material, countdown - 1, v); }, 1000 / 30);
        } else if (callback) { callback(); }
      }
      if (animationTime > 0) {
        let v = 30.0 * animationTime;
        const countdown = (30.0 * animationTime);
        v = (opacity - this.opacity) / countdown;
        animate(this, countdown, v);
      } else {
        this.opacity = opacity;
        if (callback) callback();
      }
    };
    this.reset();
  }

  setLineWidth(value) {
    this.lineWidth = value / LINE_SCALE_FACTOR;
    this.lineMaterial.uniforms.lineWidth.value = this.lineWidth;
  }

  setLineWidthScale(value) {
    this.lineMaterial.uniforms.lineWidth.value = this.lineWidth * value;
  }

  setLineOpacity(value) {
    this.lineOpacity = value;
    this.lineMaterial.uniforms.opacity.value = value;
  }

  setResolution(w, h) {
    this.lineMaterial.uniforms.resolution.value.set(w, h);
  }

  setupLine(x, y, z) {

    if (this.line) {
      this.scene.remove(this.line);
    }

    // reset geometry
    for( var i = 0; i < this.lineGeometry.vertices.length; i++ ) {
      this.lineGeometry.vertices[i].set(x || 0, y || 0, z || 0);
    }

    // create a new meshline
    this.meshLine = new MeshLine.MeshLine();
    this.meshLine.setGeometry( this.lineGeometry );

    this.line = new THREE.Mesh( this.meshLine.geometry, this.lineMaterial ); // this syntax could definitely be improved!
    this.line.frustumCulled = false;
    this.scene.add( this.line );
  }

  /**
   * Set the style of the explorer trajectory. Options are SELECTED, UNSELECTED, MOVING, HIDDEN.
   * @param {Integer} S
   */
  setStyle(s) {
    const t = 0.0;
    switch (s) {
      case Explorer.SELECTED:
        this.animatingSphereMaterial.opacity = 1;
        this.mesh.visible = true;
        this.segments.visible = true;
        this.line.visible = true;
        this.lineMaterial.setOpacity(1 * this.lineOpacity, t);
        this.lineSegmentMaterial.setOpacity(0.3, t);
        this.facesMaterial.setOpacity(0.15, t);
        break;
      case Explorer.UNSELECTED:
        this.animatingSphereMaterial.opacity = 1;
        this.line.visible = true;
        this.lineMaterial.setOpacity(0.25 * this.lineOpacity, t);
        this.lineSegmentMaterial.setOpacity(0, t, () => { this.segments.visible = false; });
        this.facesMaterial.setOpacity(0, t, () => { this.mesh.visible = false; });
        break;
      case Explorer.MOVING:
        this.animatingSphereMaterial.opacity = 1;
        this.line.visible = true;
        this.lineMaterial.setOpacity(1 * this.lineOpacity, t);
        this.lineSegmentMaterial.setOpacity(0, t, () => { this.segments.visible = false; });
        this.facesMaterial.setOpacity(0, t, () => { this.mesh.visible = false; });
        break;
      case Explorer.HIDDEN:
        this.lineMaterial.setOpacity(0, t, () => { this.line.visible = false; });
        this.lineSegmentMaterial.setOpacity(0, t, () => { this.segments.visible = false; });
        this.facesMaterial.setOpacity(0, t, () => { this.mesh.visible = false; });
        this.animatingSphereMaterial.opacity = 0;
        break;
      default:
        break;
    }
  }

  getLength = function getLength() {
    return this.length;
  };

  /**
   * Reset and hide the explorer trajectory.
   * @param {Integer} s
   */
  reset = function reset(departure = new THREE.Vector3(0, 0, 0)) {   
    this.length = 0;
    this.alpha = 0;
    this.last_alpha = 0;
    this.originalData = [];
    this.lineMaterial.opacity = 1 * this.lineOpacity;
    this.animatingSphereMaterial.opacity = 1;
    if (departure) {
      this.animatingSphere.position.set(departure.x, departure.y, departure.z);
    }

    for (let i = 0; i < this.max_points; i += 1) {
      this.distance[i] = 0;
      this.speed[i] = 0;
    }

    this.setupLine();


    this.lineSegmentMaterial.opacity = 0;
    this.mesh.geometry.setDrawRange(0, 0);
    this.segments.geometry.setDrawRange(0, 0);

    this.mesh.visible = false;
    this.segments.visible = false;
    this.line.visible = true;
  };

  setMaxLength = function setMaxLength(newMax)
  {
    this.max_points = newMax;
    this.array = new Float32Array(newMax * 3 * 2);

    this.distance = [];
    this.speed = [];
    this.altitudeRatio = [];
    this.altitude = [];

    const segmentIndexes = [];

    for (let i = 0; i < newMax; i += 1) {
      this.distance.push(0);
      this.speed.push(0);
      this.altitudeRatio.push(0);
      this.altitude.push(0);
      segmentIndexes.push((i) * 2);
      segmentIndexes.push(((i) * 2) + 1);
    }

    //-----------------------------------------------
    // setup line segments
    this.scene.remove(this.segments);

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(this.array, 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(segmentIndexes), 1));
    this.segments = new THREE.LineSegments(geometry, this.lineSegmentMaterial);
    this.scene.add(this.segments);


    //-----------------------------------------------
    // setup line
    this.lineGeometry = new THREE.Geometry();
    if (DIRECT_RESULT === true)
    {
      for( var j = 0; j < newMax; j++ ) {
        var v = new THREE.Vector3( 0, 0, 0 );
        this.lineGeometry.vertices.push( v );
      }
    }
    else
    {
      /*
      multiplier depends on how many samples the trajectory has
      for time_resoltuion of 4000 a multiplier of 8 seems sufficient
      this is actually depending on the distance we we fly...
      */
      const mult = 8;
      for( var j = 0; j < newMax*mult; j++ ) {
        var v = new THREE.Vector3( 0, 0, 0 );
        this.lineGeometry.vertices.push( v );
      }
    }
    this.setupLine();
  };

  /**
   * Return the 3d position of the trajectory at the specified alpha
   * @param {Float} alpha [0 - 1]
   */
  getPosition = function getPosition(alpha) {
    const t = alpha * (this.max_points - 1.0);
    const i = Math.floor(t);
    return new THREE.Vector3(
      this.array[i * 3 * 2 + 3],
      this.array[i * 3 * 2 + 4],
      this.array[i * 3 * 2 + 5],
    );
  };

  getAlpha = function getAlpha() {
    return this.alpha;
  };

  /**
   * Set the trajectory alpha.
   * @param {Float} alpha [0 - 1]
   */
  setAlpha = function setAlpha(alpha)
  {
    if (this.length === 0) 
    {
      return false;
    }

    if (alpha < this.dayOffset / 16) 
    {
      return true;
    }
    // alpha: 0 -> 1 from day 1 to day 16
    // scale alpha...
    alpha = (alpha - (this.dayOffset / 16)) / (1 - (this.dayOffset / 16));

    // if (alpha < this.dayOffset / 16) return false;
    if (alpha < 0) 
    {
      return true;
    }
    
    this.alpha = Math.min(1, Math.max(0, alpha));
    const t = Math.max(0, this.alpha * (this.max_points - 1.0));
    this.index = Math.floor(t);
    const ipo = Math.min(this.index + 1, this.max_points - 1.0);
    const a = t - this.index;
    const oma = 1 - a;
 
    if (USE_SPHERES) {
      this.spheres[this.index].visible = true;
    }
    
    if (ipo < this.length) {

      const point = new THREE.Vector3(
        this.array[this.index * 3 * 2 + 3] * oma + this.array[ipo * 3 * 2 + 3] * a,
        this.array[this.index * 3 * 2 + 4] * oma + this.array[ipo * 3 * 2 + 4] * a,
        this.array[this.index * 3 * 2 + 5] * oma + this.array[ipo * 3 * 2 + 5] * a
      );

      if (this.animatingSphere.visible) {
        this.animatingSphere.position.copy(point);
      }

      this.mesh.geometry.setDrawRange(0, (this.index + 1) * 2);
      this.segments.geometry.setDrawRange(0, (this.index + 1) * 2);
      this.mesh.frustumCulled = false;
      this.segments.frustumCulled = false;
      this.segments.geometry.attributes.position.needsUpdate = true;
      this.mesh.geometry.attributes.position.needsUpdate = true;
      
      if (this.last_alpha !== alpha)
      {
        if (DIRECT_RESULT !== true)
        {
          this.meshLine.advance( point );
        }

        this.last_alpha = alpha;
      }

      return true;
    }
    else
    {
      console.log("ipo >= length: " + this.length);
      
    }
    return false;
  };

  /**
   * Add position value to the trajectory. It manages also the explorer landing and takeoff.
   * @param {Vec3} position
   * @param {Float} h base height
   * @param {Float} hs height shift based on sunlight exposure
   */
  addDataSample = function addDataSample(position, h, hs, altitude)
  {
    // let s = 0;
    // const pIndex = this.length;
    // if (pIndex >= 0) {
    //   s = 1;
    //   if (pIndex <= ATTACK_DECAY) {
    //     // s = pIndex / ATTACK_DECAY;
    //   } else {
    //     const t = this.length - (this.max_points - 1 - ATTACK_DECAY);
    //     if (t > 0) {
    //       // s = Math.max(1 - t / ATTACK_DECAY, 0.1);
    //       s = 1 - (t / ATTACK_DECAY)
    //     }
    //   }
    // }

    // const heightShift = 1.0 + (h + hs) * s;


    if (DIRECT_RESULT === true)
    {
      this.meshLine.advance( position );
    }

    if (this.length < this.max_points) {
      // trajectory on earth surface
      this.array[2 * this.length * 3] = position.x / h;
      this.array[2 * this.length * 3 + 1] = position.y / h;
      this.array[2 * this.length * 3 + 2] = position.z / h;

      // this.array[(1 + 2 * this.length) * 3] = position.x <* heightShift;
      // this.array[(1 + 2 * this.length) * 3 + 1] = position.y * heightShift;
      // this.array[(1 + 2 * this.length) * 3 + 2] = position.z * heightShift;

      // trajectory in the air
      this.array[(1 + 2 * this.length) * 3] = position.x;
      this.array[(1 + 2 * this.length) * 3 + 1] = position.y;
      this.array[(1 + 2 * this.length) * 3 + 2] = position.z;

      if (this.length > 0) {
        const d = position.distanceTo(this.lastPosition) * SCENE_SCALE;
        this.distance[this.length] = this.distance[this.length - 1] + d;
        this.speed[this.length] = d;
        this.altitudeRatio[this.length] = h; //(heightShift - 1.0) / h;
        this.altitude[this.length] = altitude;
      }
    } else {
      console.log('this is strange...got more points than expected - Explorer');
    }

    /* Set flight data at the end */
    if (this.length === this.max_points - 1)
    {      
      this.avgSpeed = 0;
      for (let i = 0; i < this.speed.length; i += 1)
      {
        this.avgSpeed += this.speed[i];
      }

      this.avgSpeed = this.avgSpeed / this.speed.length;
      this.totalDistance = (this.distance[this.distance.length - 1]);
    }

    this.lastPosition.set(position.x, position.y, position.z);
    this.length += 1;
  }

  getSpeed = function getSpeed() {
    return this.speed[this.index];
  };

  getAltitudeRatio = function getAltitudeRatio() {
    return this.altitudeRatio[this.index];
  };

  getAltitude = function getAltitude() {
    return this.altitude[this.index];
  }

  getDistance = function getDistance() {
    return this.distance[this.index];
  };

  getTotalDistance = function getTotalDistance() {
    return this.totalDistance;
  };
}
Explorer.SELECTED = 0;
Explorer.UNSELECTED = 1;
Explorer.MOVING = 2;
Explorer.HIDDEN = 3;
export default Explorer;
