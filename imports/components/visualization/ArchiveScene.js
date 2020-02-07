import Util from './Util';

const THREE = require('three');

const spriteScale = 28;

const COLOR_MUSEO = 0x9d0e0e;
const COLOR_COMMUNITY = 0xeef60e;
const COLOR_HUMAN = 0x69d40b;
const COLOR_FREE = 0x29C5E7;
const COLOR_TETHERED = 0x950E9D;

const MARKER_PATH = '/img/marker-1.png';

const MARKER_UPCOMING = '/img/marker-upcoming';
const MARKER_FREE = '/img/marker-free.png';
const MARKER_HUMAN = '/img/marker-human.png';
const MARKER_TETHERED = '/img/marker-tethered.png';
const MARKER_MEMBER = '/img/marker-member.png';
const MARKER_MUSEO = '/img/marker-museo.png';


class ArchiveScene
{
    constructor(camera, radius, selectCb)
    {
        this.preventClick = false;
        this.selectCb = selectCb;
        this.idSpriteMap = {};
        this.camera = camera;
        this.radius = radius * 0.9999;
        this.scene = new THREE.Scene();

        // archives
        this.archiveUpcoming = [];
        this.archiveTethered = [];
        this.archiveFree = [];
        this.archiveHuman = [];
        this.archiveMuseo = [];
        this.archiveMember = [];

        this.earthCircle = new THREE.Mesh(
            new THREE.CircleBufferGeometry(this.radius, 80, 0, Math.PI * 2 ), 
            new THREE.MeshBasicMaterial( {
                side: THREE.DoubleSide,
                colorWrite: false
            })
        );
        this.earthCircle.position.set( 0, 0, 0 );
        this.earthCircle.renderOrder = 2;

        this.scene.add( this.earthCircle );

        this.labelGroup = new THREE.Group();
        this.scene.add(this.labelGroup);

        const dw = true;

        // create base material so we can use it later
        this.baseMaterial = new THREE.SpriteMaterial( { 
            material: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_PATH),
            depthTest: true,
            depthWrite: dw,
        });
        this.materialFree = new THREE.SpriteMaterial( { 
            material: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_FREE),
            depthTest: true,
            depthWrite: dw,
        });
        this.materialHuman = new THREE.SpriteMaterial( { 
            material: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_HUMAN),
            depthTest: true,
            depthWrite: dw,
        });
        this.materialTethered = new THREE.SpriteMaterial( { 
            material: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_TETHERED),
            depthTest: true,
            depthWrite: dw,
        });
        this.materialMember = new THREE.SpriteMaterial( { 
            material: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_MEMBER),
            depthTest: true,
            depthWrite: dw,
        });
        this.materialMuseo = new THREE.SpriteMaterial( { 
            material: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_MUSEO),
            depthTest: true,
            depthWrite: dw,
        });
        this.materialUpcoming = new THREE.SpriteMaterial( { 
            material: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_UPCOMING),
            depthTest: true,
            depthWrite: dw,
        });
    }

    cleanupSprites()
    {
        // get a map with current available ids
        let ids = {};
        for (var prop in this.idSpriteMap) {
            if (Object.prototype.hasOwnProperty.call(this.idSpriteMap, prop)) {
                // add it...                
                ids[prop] = true;
            }
        }

        // delete the ids we got from the archive
        for (let i=0; i<this.collectedIds.length; i++) {
            delete ids[this.collectedIds[i]];
        }

        // remove ids we did not get from the online-archive
        for (var prop in ids) {
            if (Object.prototype.hasOwnProperty.call(ids, prop)) {
                // remove item with id from scene...
                if (this.idSpriteMap[prop]) {
                    // remove sprite
                    this.labelGroup.remove(this.idSpriteMap[prop]);

                    // remove from map
                    delete this.idSpriteMap[prop];
                }
            }
        }

        delete this.collectedIds;
    }

    downloadArchive(successCb, errorCb, updateCb)
    {
        this.collectedIds = [];

        this.sCb = () => {
            this.cleanupSprites();
            successCb();
        };

        // download all the archives on after another
        this.downloadArchive1(() => {
            if (updateCb) updateCb();
            this.downloadArchive2(this.sCb, errorCb);
        }, this.sCb, errorCb);
    }
    downloadArchive1(followUpFunc, successCb, errorCb)
    {
      const url = "https://aerocene.org/wp-json/wp/v2/community_member?per_page=100&_embed=1";

      fetch(url)
      .then(response => response.json())
      .then((jsonData) => {      
        this.addData(jsonData);
        if (followUpFunc) followUpFunc();
        else if (successCb) successCb();
      })
      .catch((r) => {
          if (followUpFunc) {
            console.error(`error downloading community-archive: ${JSON.stringify(r)}`);
            followUpFunc();
        }
        else if (errorCb) {
            errorCb("error downloading community-archive");
        }
      });
    }
    downloadArchive2(successCb, errorCb)
    {
      const url = "https://aerocene.org/wp-json/wp/v2/flight?per_page=100&_embed=1";

      fetch(url)
      .then(response => response.json())
      .then((jsonData) => { 
        this.addData(jsonData);
        if (successCb) successCb();
      })
      .catch((r) => {        
        if (errorCb) errorCb("error downloading flight-archive");
      });
    }


    addSprite(pos, obj, material, order)
    {
        let sprite = new THREE.Sprite( material ); 
        sprite.originalColor = 0xffffff;
        sprite.originalRenderOrder = 3;
        sprite.renderOrder = 3;
        sprite.scale.set(spriteScale, spriteScale, spriteScale);
        sprite.position.set( pos.x, pos.y, pos.z );
        
        sprite.user = obj;

        // store that in the map        
        this.idSpriteMap[obj.id] = sprite;

        // add to scene
        this.labelGroup.add(sprite);
    }

    deleteObj(obj) {
        // remove that sprite from scene
        this.labelGroup.remove(this.idSpriteMap[obj.id]);

        // remove from map
        delete this.idSpriteMap[obj.id];
    }

    setArchiveType(obj) {
        // set archive_type
        if (obj.type === "community_member") 
        {
            obj.archive_type = "member";
        }
        else if (obj._embedded && 
            obj._embedded['wp:term'] &&
            obj._embedded['wp:term'].length > 0 &&
            obj._embedded['wp:term'][0]['0'])
        {
            switch (obj._embedded['wp:term'][0]['0'].name) {
                case "Upcoming":
                    obj.archive_type = "upcoming";
                    break;
                case "Museo Aero Solar":
                    obj.archive_type = "museo";
                    break;
                case "Tethered Flight":
                    obj.archive_type = "tethered";
                    break;
                case "Human Flight":
                    obj.archive_type = "human";
                    break;
                case "Free Flight":
                    obj.archive_type = "free";
                    break;
                default:
                    console.error("unknown flight type: " + flightname);
            }
        }
        else
        {
            console.log("unknown type: " + obj.type);      
        }
    }

    addData(jsonData)
    {
        // expect jsonData to be an array
        // TODO check this
        
        for (var i=0; i<jsonData.length; i++)
        {
            let obj = jsonData[i];

            if (obj === undefined || obj === null) {
                continue;
            }

            if (obj.status !== "publish")
            {
                // check if we cached an id
                if (this.idSpriteMap[obj.id] !== undefined)
                {
                    this.deleteObj(obj);
                }

                continue;
            }

            //--------------------
            // published entry

            // figure out archive type
            this.setArchiveType(obj);

            // if no known archive type, delete this
            if (obj.archive_type === undefined)
            {
                this.deleteObj(obj);
                continue;
            }

            // check if we got a location
            if (!obj.acf || !obj.acf.map)
            {   
                console.log("no acf or afc.map for index: " + i);
                this.deleteObj(obj);
                continue;
            }

            // this id should show up in map, so collect it
            this.collectedIds.push(obj.id);

            // check if we got id already
            if (this.idSpriteMap[obj.id] !== undefined)
            {
                // just update obj...
                this.idSpriteMap[obj.id].user = obj;

                continue;
            }

            let order = 3;
            let material;

            switch(obj.archive_type) {
                case "upcoming":
                    order = 9;
                    material = this.materialUpcoming.clone();
                    break;

                case "member":
                    order = 8;
                    material = this.materialMember.clone();
                    break;

                case "museo":
                    order = 7;
                    material = this.materialMuseo.clone();
                    break;

                case "tethered":
                    order = 4;
                    material = this.materialTethered.clone();
                    break;

                case "human":
                    order = 5;
                    material = this.materialHuman.clone();
                    break;

                case "free":
                    order = 6;
                    material = this.materialFree.clone();
                    break;

                default:
                    this.deleteObj(obj);
                    continue;
            }

            // add sprite
            let pos = Util.latLon2XYZPosition(obj.acf.map.lat, obj.acf.map.lng, this.radius);    
            this.addSprite(pos, obj, material, order);

        } // for

        // compile our archives

        this.archiveUpcoming = [];
        this.archiveTethered = [];
        this.archiveFree = [];
        this.archiveHuman = [];
        this.archiveMuseo = [];
        this.archiveMember = [];

        for (var prop in this.idSpriteMap) {
            if (Object.prototype.hasOwnProperty.call(this.idSpriteMap, prop)) {
                // add it...                
                const obj = this.idSpriteMap[prop].user;

                switch(obj.archive_type) {
                    case "upcoming":
                        this.archiveUpcoming.push(obj);
                        break;
                    case "member":
                        this.archiveMember.push(obj);
                        break;
                    case "museo":
                        this.archiveMuseo.push(obj);
                        break;
                    case "tethered":
                        this.archiveTethered.push(obj);
                        break;
                    case "human":
                        this.archiveHuman.push(obj);
                        break;
                    case "free":
                        this.archiveFree.push(obj);
                        break;
                }
            }
        }

    }

    findSprites(point, margin)
    {
        let obj = undefined;
        let smallest = 10000;

        // search object with shortest distance to intersection-point
        for ( var i = 0, l = this.labelGroup.children.length; i < l; i ++ )
        {
            const sprite = this.labelGroup.children[i];            
            const d = point.distanceTo(sprite.position);
            
            // console.log("D: " + d + " pos: " + sprite.position.x + ", " + sprite.position.y + ", " + sprite.position.z);
            
            if (d < (margin / this.camera.zoom) && d < smallest) {
                smallest = d;
                obj = sprite;
            }
        }

        return obj;
    }

    preventNextClick() {
        this.preventClick = true;
    }

    onMouseClick(point)
    {
        if (this.preventClick) {
            this.preventClick = false;
            return;
        }
        
        if (this.selected)
        {
            this.selected.material.color.set(this.selected.originalColor);
            this.selected.renderOrder = this.selected.originalRenderOrder;
            this.selected = undefined;
        }

        const obj = this.findSprites(point, 20);

        if (obj)
        {
            this.selected = obj;
            this.selected.renderOrder = 10;
            this.selected.material.color.set( '#999999' );
            this.hovered = undefined;

            if (this.selectCb) {
                this.selectCb(obj.user);
            }
        }
    }

    onMouseMove(point)
    {
        if (this.hovered)
        {
            this.hovered.material.color.set(this.selected.originalColor);
            this.hovered.renderOrder = this.hovered.originalRenderOrder;
            this.hovered = undefined;
        }

        const obj = this.findSprites(point, 10);

        if (obj && obj !== this.hovered)
        {
            this.hovered = obj;
            this.hovered.renderOrder = 10;
            this.hovered.material.color.set( '#999999' );
        }
    }

    clear()
    {
        while(this.labelGroup.children.length > 0) 
        {
            this.labelGroup.remove(this.labelGroup.children[0]);
        }
        this.idSpriteMap = {};

        // archives
        this.archiveTethered = [];
        this.archiveFree = [];
        this.archiveHuman = [];
        this.archiveMuseo = [];
        this.archiveMember = [];
    }

    render(renderer, camera)
    {    
        let sc = spriteScale/camera.zoom;

        if (sc > spriteScale*2) sc = spriteScale*2;
        
        for (var i=0; i < this.labelGroup.children.length; i++ )
        {
            const sprite = this.labelGroup.children[i];            
            sprite.scale.set(sc, sc, 1.0 );
        }
    
        this.earthCircle.lookAt( camera.position );

        renderer.clearDepth();
        renderer.render(this.scene, camera);
    }

    setScale(s)
    {
        this.scene.scale.set(s, s, s);
    }
    getScale()
    {
        return this.scene.scale.x;
    }

}

export default ArchiveScene;