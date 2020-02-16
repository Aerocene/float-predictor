import Util from './Util';

const THREE = require('three');

const spriteScale = 28;

const COLOR_MUSEO = 0x9d0e0e;
const COLOR_COMMUNITY = 0xeef60e;
const COLOR_HUMAN = 0x69d40b;
const COLOR_FREE = 0x29C5E7;
const COLOR_TETHERED = 0x950E9D;

const MARKER_PATH = '/img/marker-1.png';

const MARKER_UPCOMING = '/img/marker-upcoming.png';
const MARKER_FREE = '/img/marker-free.png';
const MARKER_HUMAN = '/img/marker-human.png';
const MARKER_TETHERED = '/img/marker-tethered.png';
const MARKER_MEMBER = '/img/marker-member.png';
const MARKER_MUSEO = '/img/marker-museo.png';

const P_LOW = 0;
const P_MED = 1;
const P_HIGH = 2;

const sort_func = (a, b) => {
    return b.priority - a.priority;
};

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

        const dw = false;

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


        sprite.originalRenderOrder = 4;
        sprite.renderOrder = 4;
        if (obj.priority === P_LOW) {
            sprite.originalRenderOrder = 3;
            sprite.renderOrder = 3;
        } else if (obj.priority === P_HIGH) {
            sprite.originalRenderOrder = 5;
            sprite.renderOrder = 5;
        }

        // add it invisible
        // state needs to be synchronized
        sprite.visible = false;


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
                case "Upcoming Flight":
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

            // set priority
            if (!obj.acf.additional_informations) {
                obj.priority = P_MED;
            } else {
                // read additinoal information
                for (let i = 0; i < obj.acf.additional_informations.length; i++) {
                    const info = obj.acf.additional_informations[i];
                    
                    if (info.label.toString().toLowerCase() === "priority") {

                        if (info.content.toString().toLowerCase() === "low") {
                            obj.priority = P_LOW;
                        } else if (info.content.toString().toLowerCase() === "medium") {
                            obj.priority = P_MED;
                        } else if (info.content.toString().toLowerCase() === "high") {
                            obj.priority = P_HIGH;
                        } else {
                            obj.priority = P_MED;
                        }
                    }
                }

                if (obj.priority === undefined) {
                    obj.priority = P_MED;
                }
            }
            

            // this id should show up in map, so collect it
            this.collectedIds.push(obj.id);

            //----
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

        // sort arrays
        this.archiveUpcoming.sort(sort_func);
        this.archiveTethered.sort(sort_func);
        this.archiveFree.sort(sort_func);
        this.archiveHuman.sort(sort_func);
        this.archiveMuseo.sort(sort_func);
        this.archiveMember.sort(sort_func);
    }

    findSprites(point, margin)
    {
        let obj = undefined;
        let smallest = 10000;

        // search object with shortest distance to intersection-point
        for ( var i = 0, l = this.labelGroup.children.length; i < l; i ++ )
        {
            const sprite = this.labelGroup.children[i];

            if (sprite.visible !== true) {
                continue;
            }

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
        this.archiveUpcoming = [];
        this.archiveTethered = [];
        this.archiveFree = [];
        this.archiveHuman = [];
        this.archiveMuseo = [];
        this.archiveMember = [];
    }

    render(renderer, camera)
    {    
        let sc_m = spriteScale/camera.zoom;
        let sc_l = (spriteScale*0.6)/camera.zoom;
        let sc_h = (spriteScale*1.5)/camera.zoom;

        if (sc_m > spriteScale*2) sc_m = spriteScale*2;
        if (sc_l > spriteScale*1.2) sc_l = spriteScale*1.2;
        if (sc_h > spriteScale*3) sc_h = spriteScale*3;
        
        for (var i=0; i < this.labelGroup.children.length; i++ )
        {
            const sprite = this.labelGroup.children[i];            

            sprite.scale.set(sc_m, sc_m, 1);
            if (sprite.user.priority === P_LOW) {
                sprite.scale.set(sc_l, sc_l, 1);
            } else if (sprite.user.priority === P_HIGH) {
                sprite.scale.set(sc_h, sc_h, 1);
            }
        }
    
        this.earthCircle.lookAt( camera.position );



        // sort objects
        this.labelGroup.children.sort((a, b) => {
            return a.user.priority - b.user.priority;
        });

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

    setUpcomingEnabled(on)
    {
        const arr = this.archiveUpcoming;
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            this.idSpriteMap[obj.id].visible = on;
        }
    }
    setTetheredEnabled(on)
    {
        const arr = this.archiveTethered;
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            this.idSpriteMap[obj.id].visible = on;
        }
    }
    setFreeEnabled(on)
    {
        const arr = this.archiveFree;
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            this.idSpriteMap[obj.id].visible = on;
        }
    }
    setHumanEnabled(on)
    {
        const arr = this.archiveHuman;
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            this.idSpriteMap[obj.id].visible = on;
        }
    }
    setMuseoEnabled(on)
    {
        const arr = this.archiveMuseo;
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            this.idSpriteMap[obj.id].visible = on;
        }
    }
    setMemberEnabled(on)
    {
        const arr = this.archiveMember;
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            this.idSpriteMap[obj.id].visible = on;
        }
    }

}

export default ArchiveScene;