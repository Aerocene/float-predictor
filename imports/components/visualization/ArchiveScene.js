import Util from './Util';

const THREE = require('three');

const spriteScale = 32;

const COLOR_MUSEO = 0x9d0e0e;
const COLOR_COMMUNITY = 0xeef60e;
const COLOR_HUMAN = 0x69d40b;
const COLOR_FREE = 0x29C5E7;
const COLOR_TETHERED = 0x950E9D;

const MARKER_PATH = '/img/marker.png';

class ArchiveScene
{
    constructor(camera, radius)
    {
        this.camera = camera;
        this.radius = radius * 0.9999;
        this.scene = new THREE.Scene();

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

        // create base material so we can use it later
        this.baseMaterial = new THREE.SpriteMaterial( { 
            color: '#fff', 
            map: new THREE.TextureLoader().load(MARKER_PATH),
            depthTest: true,
        });
    }

    addSprite(pos, obj, color)
    {
        let sprite = new THREE.Sprite( this.baseMaterial.clone() );                    
        sprite.originalColor = color;
        sprite.material.color.set(color);
        sprite.renderOrder = 3;
        sprite.scale.set(spriteScale, spriteScale, spriteScale);
        sprite.position.set( pos.x, pos.y, pos.z );
        sprite.user = obj;

        this.labelGroup.add(sprite);
    }

    addData(jsonData)
    {
        
        // expect jsonData to an array
        
        for (var i=0; i<jsonData.length; i++)
        {
            let obj = jsonData[i];

            if (obj === undefined || obj === null) {
                continue;
            }

            if (obj.status !== "publish")
            {
                continue;
            }

            if (obj.type === "community_member")
            {
                if (obj.acf && obj.acf.map)
                {
                    let pos = Util.latLon2XYZPosition(obj.acf.map.lat, obj.acf.map.lng, this.radius);    
    
                    this.addSprite(pos, obj, COLOR_COMMUNITY);
                }
            }
            else if (obj._embedded && 
                    obj._embedded['wp:term'] &&
                    obj._embedded['wp:term'].length > 0 &&
                    obj._embedded['wp:term'][0]['0'])
            {           
                let color = COLOR_TETHERED;
                switch (obj._embedded['wp:term'][0]['0'].name)
                {
                    case "Museo Aero Solar":
                        color = COLOR_MUSEO;
                        break;
                    case "Tethered Flight":
                        color = COLOR_TETHERED;
                        break;
                    case "Human Flight":
                        color = COLOR_HUMAN;
                        break;
                    case "Free Flight":
                        color = COLOR_FREE;
                        break;
                }
                // a flight...
                if (obj.acf && obj.acf.map)
                {
                    let pos = Util.latLon2XYZPosition(obj.acf.map.lat, obj.acf.map.lng, this.radius);    
                    
                    this.addSprite(pos, obj, color);
                }
                else {
                    console.log("no acf or afc.map for index: " + i);
                    
                }                
            }
            else 
            {
                console.log("unknown type: " + obj.type + " at index: " + i);            
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

    onMouseClick(point)
    {
        if (this.selected)
        {
            this.selected.material.color.set(this.selected.originalColor);
            this.selected.renderOrder = 3;
            this.selected = undefined;
        }

        const obj = this.findSprites(point, 60);

        if (obj)
        {
            this.selected = obj;
            this.selected.material.color.set( '#fff' );
            this.hovered = undefined;
        }
    }

    onMouseMove(point)
    {
        if (this.hovered)
        {
            this.hovered.material.color.set( '#FBC445' );
            this.hovered.renderOrder = 3;
            this.hovered = undefined;
        }

        const obj = this.findSprites(point, 10);

        if (obj && obj !== this.hovered)
        {
            this.hovered = obj;
            this.hovered.renderOrder = 10;
            this.hovered.material.color.set( '#f00' );
        }
    }

    clear()
    {
        while(this.labelGroup.children.length > 0) 
        {
            this.labelGroup.remove(this.labelGroup.children[0]);
        }
    }

    render(renderer, camera)
    {    
        const sc = spriteScale/camera.zoom;
        // for (var i=0; i < this.labelGroup.children.length; i++ )
        // {
        //     const sprite = this.labelGroup.children[i];            
        //     sprite.scale.set(sc, sc, 1.0 );
        // }
    
        this.earthCircle.lookAt( camera.position );

        renderer.clearDepth();
        renderer.render(this.scene, camera);
    }

    setScale(s)
    {
        this.scene.scale.set(s, s, s);
    }

}

export default ArchiveScene;