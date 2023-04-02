const div = document.querySelector('.threejs');

document.forms[0].addEventListener('change', (e) => {
    cube.material.color.set(e.target.value);
})

document.forms[1].addEventListener('change', (e) => {
 pyramid.material.color.set(e.target.value);
})

document.forms[2].addEventListener('change', (e) => {
 hemiLight.intensity=e.target.value;
})

document.forms[3].addEventListener('change', (e) => {
    directionalLight.intensity=e.target.value;
})

document.forms[4].addEventListener('change', (e) => {
    directionalLight1.intensity=e.target.value;
})

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.aspect=div.clientWidth/div.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(div.clientWidth, div.clientHeight);
}

let scene= new THREE.Scene();

let camera = new THREE.PerspectiveCamera(50, div.clientWidth / div.clientHeight, 0.1, 100);
camera.position.set(3, 0.7, 3);
const renderer = new THREE.WebGLRenderer({ antialias: true,div});
renderer.setSize(div.clientWidth, div.clientHeight);
div.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

scene.background = new THREE.Color('gray');
scene.fog = new THREE.Fog('gray', 1, 5);

let hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-10, 12, 9);
directionalLight.castShadow = true;

scene.add(directionalLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight1.position.set(10, 12, 9);
directionalLight1.castShadow = true;

scene.add(directionalLight1);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000),
    new THREE.MeshPhongMaterial({ color:0x808080, dithering: true })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshPhongMaterial({color: 'Gray'});  
const cube = new THREE.Mesh(geometry, material);
cube.castShadow=true;
cube.position.set(1.7, 0.5, 0)

scene.add(cube);

var geometry1 = new THREE.BufferGeometry();
const vertices1 = new Float32Array( [
    -2.0, -2.0, 2.0,
    2.0, -2.0, 2.0,
    2.0, 2.0, 2.0,

    2.0, 2.0, 2.0,
    -2.0, 2.0, 2.0,
    -2.0, -2.0, 2.0
] );

geometry1.setAttribute('position', new THREE.Float32BufferAttribute( vertices1, 3 ));
geometry1.computeVertexNormals();

const material1 = new THREE.MeshPhongMaterial( { color: 'Gray', side:THREE.DoubleSide } );
const mesh1 = new THREE.Mesh( geometry1, material1 );
mesh1.receiveShadow=true;
mesh1.position.x=2.4;
mesh1.position.z=-2.4;
scene.add( mesh1 );


var geometry2 = new THREE.BufferGeometry();
const vertices2 = new Float32Array( [
    0, 0, 0.5,
    0.5, 0,  0,
    -0.25, -Math.sqrt(0.5*0.5-0.25*0.25),  0,

    0, 0, 0.5,
    0.5, 0, 0,
    -0.25, Math.sqrt(0.5*0.5-0.25*0.25),  0,

    0, 0, 0.5,
    -0.25,  -Math.sqrt(0.5*0.5-0.25*0.25),  0,
    -0.25,  Math.sqrt(0.5*0.5-0.25*0.25),  0,

    0.5, 0,  0,
    -0.25,  -Math.sqrt(0.5*0.5-0.25*0.25),  0,
    -0.25,  Math.sqrt(0.5*0.5-0.25*0.25),  0
] );
geometry2.setAttribute('position', new THREE.Float32BufferAttribute( vertices2, 3 ));
geometry2.computeVertexNormals();
const material2 = new THREE.MeshPhongMaterial( { color: 'Gray', side:THREE.DoubleSide } );
const pyramid = new THREE.Mesh( geometry2, material2 );
pyramid.castShadow=true;
pyramid.position.set(3.3, 0.5, 0.2)
scene.add( pyramid );

function render(time) {
    time *= 0.001; 

    cube.rotation.x = time;
    cube.rotation.y = time;

    pyramid.rotation.x = time;
    pyramid.rotation.z = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
 requestAnimationFrame(render);