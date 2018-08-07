import React, {Component} from 'react';
import * as THREE from 'three';
import SmokeElement from '../images/Smoke-Element.png';

class Smoke extends Component{
    componentDidMount(){
        this.initSmoke();
    }
    initSmoke(){
        var camera, scene, renderer, geometry, 
        material, mesh, clock, delta, cubeSineDriver;
        var smokeParticles = [];
        var container = document.getElementById('WebGL-output');

        init();
        animate();

        function init() {
        
            clock = new THREE.Clock();
        
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
        
            scene = new THREE.Scene();
        
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1000;
            scene.add(camera);
        
            geometry = new THREE.CubeGeometry(200, 200, 200);
            material = new THREE.MeshLambertMaterial({
                color: 0xaa6666,
                wireframe: false
            });
            mesh = new THREE.Mesh(geometry, material);
            //scene.add( mesh );
            cubeSineDriver = 0;
        
            // var textGeo = new THREE.PlaneGeometry(300, 300);
            // THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
            // var textTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png');
            // var textMaterial = new THREE.MeshLambertMaterial({
            //     color: 0x00ffff,
            //     opacity: 1,
            //     map: textTexture,
            //     transparent: true,
            //     blending: THREE.AdditiveBlending
            // })
            // var text = new THREE.Mesh(textGeo, textMaterial);
            // text.position.z = 800;
            // scene.add(text);
        
            var light = new THREE.DirectionalLight(0xffffff, 0.5);
            light.position.set(-1, 0, 1);
            scene.add(light);
        
            var smokeTexture = new THREE.TextureLoader().load(SmokeElement);
            var smokeMaterial = new THREE.MeshLambertMaterial({
                color: 0x00dddd,
                map: smokeTexture,
                transparent: true
            });
            var smokeGeo = new THREE.PlaneGeometry(300, 300);
            smokeParticles = [];
        
            var particle;
            for (var p = 0; p < 150; p++) {
                particle = new THREE.Mesh(smokeGeo, smokeMaterial);
                particle.position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
                particle.rotation.z = Math.random() * 360;
                scene.add(particle);
                smokeParticles.push(particle);
            }
        
            container.appendChild(renderer.domElement);
        
        }

        function animate() {

            // note: three.js includes requestAnimationFrame shim
            delta = clock.getDelta();
            requestAnimationFrame(animate);
            evolveSmoke();
            render();
        }
        
        function evolveSmoke() {
            var sp = smokeParticles.length;
            while (sp--) {
                smokeParticles[sp].rotation.z += (delta * 0.2);
            }
        }
        
        function render() {
        
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            cubeSineDriver += .01;
            mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
            renderer.render(scene, camera);
        
        }
    }

    render(){
        return(
            <div id='WebGL-output'></div>
        )
    }
}

export default Smoke;