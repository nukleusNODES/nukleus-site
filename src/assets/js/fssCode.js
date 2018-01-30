var flatSurface = $('#surface-shader');

if (flatSurface.length) {
    var MESH = {
        width: 1.2,
        height: 1.2,
        depth: 0,
        segments: 16,
        slices: 8,
        xRange: 0.8,
        yRange: 0.1,
        zRange: 1.0,
        ambient: '#787474',
        diffuse: '#b1b1b1',
        speed: 0.002
    };

    var LIGHT = {
        count: 2,
        xyScalar: 1,
        zOffset: 80,
        ambient: flatSurface.data('ambient-color'),
        diffuse: flatSurface.data('diffuse-color'),
        speed: 0.002,
        gravity: 500,
        dampening: 0.95,
        minLimit: 10,
        maxLimit: null,
        minDistance: 20,
        maxDistance: 800,
        autopilot: true,
        draw: false,
        bounds: FSS.Vector3.create(),
        step: FSS.Vector3.create(
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0)
        )
    };



    var RENDER = {
        renderer: 'canvas'
    };

    var now, start = Date.now();
    var center = FSS.Vector3.create();
    var attractor = FSS.Vector3.create();
    var containerFSS = flatSurface[0];
    var output = flatSurface[0];
    var rendererFSS, sceneFSS, mesh, geometry, material;
    var canvasRenderer;

}


function initialise() {
    createRenderer();
    createScene();
    createMesh();
    createLights();
    addEventListeners();
    resize(containerFSS.offsetWidth, containerFSS.offsetHeight);
    animateFSS();
}

function createRenderer() {
    canvasRenderer = new FSS.CanvasRenderer();
    setRenderer(RENDER.renderer);
}

function setRenderer() {
    if (rendererFSS) {
        output.removeChild(rendererFSS.element);
    }

    rendererFSS = canvasRenderer;

    rendererFSS.setSize(containerFSS.offsetWidth, containerFSS.offsetHeight);
    output.appendChild(rendererFSS.element);
}

function createScene() {
    sceneFSS = new FSS.Scene();
}

function createMesh() {
    sceneFSS.remove(mesh);
    rendererFSS.clear();
    geometry = new FSS.Plane(MESH.width * rendererFSS.width, MESH.height * rendererFSS.height, MESH.segments, MESH.slices);
    material = new FSS.Material(MESH.ambient, MESH.diffuse);
    mesh = new FSS.Mesh(geometry, material);
    sceneFSS.add(mesh);

    // Augment vertices for animation
    var v, vertex;
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
        vertex = geometry.vertices[v];
        vertex.anchor = FSS.Vector3.clone(vertex.position);
        vertex.step = FSS.Vector3.create(
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0)
        );
        vertex.time = Math.randomInRange(0, Math.PIM2);
    }
}

function createLights() {
    var l, light;
    for (l = sceneFSS.lights.length - 1; l >= 0; l--) {
        light = sceneFSS.lights[l];
        sceneFSS.remove(light);
    }
    rendererFSS.clear();
    for (l = 0; l < LIGHT.count; l++) {
        light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
        light.ambientHex = light.ambient.format();
        light.diffuseHex = light.diffuse.format();
        sceneFSS.add(light);

        // Augment light for animation
        light.mass = Math.randomInRange(0.5, 1);
        light.velocity = FSS.Vector3.create();
        light.acceleration = FSS.Vector3.create();
        light.force = FSS.Vector3.create();

        // Ring SVG Circle
        light.ring = document.createElementNS(FSS.SVGNS, 'circle');
        light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
        light.ring.setAttributeNS(null, 'stroke-width', '0.5');
        light.ring.setAttributeNS(null, 'fill', 'none');
        light.ring.setAttributeNS(null, 'r', '10');

        // Core SVG Circle
        light.core = document.createElementNS(FSS.SVGNS, 'circle');
        light.core.setAttributeNS(null, 'fill', light.diffuseHex);
        light.core.setAttributeNS(null, 'r', '4');
    }
}

function resize(width, height) {
    rendererFSS.setSize(width, height);
    FSS.Vector3.set(center, rendererFSS.halfWidth, rendererFSS.halfHeight);
    createMesh();
}

function animateFSS() {
    now = Date.now() - start;
    update();
    renderFSS();
    requestAnimationFrame(animateFSS);
}

function update() {
    var ox, oy, oz, l, light, v, vertex, offset = MESH.depth / 2;

    // Update Bounds
    FSS.Vector3.copy(LIGHT.bounds, center);
    FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

    // Update Attractor
    FSS.Vector3.setZ(attractor, LIGHT.zOffset);

    // Overwrite the Attractor position
    if (LIGHT.autopilot) {
        ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
        oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
        FSS.Vector3.set(attractor,
            LIGHT.bounds[0] * ox,
            LIGHT.bounds[1] * oy,
            LIGHT.zOffset);
    }

    // Animate Lights
    for (l = sceneFSS.lights.length - 1; l >= 0; l--) {
        light = sceneFSS.lights[l];

        // Reset the z position of the light
        FSS.Vector3.setZ(light.position, LIGHT.zOffset);

        // Calculate the force Luke!
        var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT.minDistance, LIGHT.maxDistance);
        var F = LIGHT.gravity * light.mass / D;
        FSS.Vector3.subtractVectors(light.force, attractor, light.position);
        FSS.Vector3.normalise(light.force);
        FSS.Vector3.multiplyScalar(light.force, F);

        // Update the light position
        FSS.Vector3.set(light.acceleration);
        FSS.Vector3.add(light.acceleration, light.force);
        FSS.Vector3.add(light.velocity, light.acceleration);
        FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
        FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
        FSS.Vector3.add(light.position, light.velocity);
    }

    // Animate Vertices
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
        vertex = geometry.vertices[v];
        ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
        oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
        oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
        FSS.Vector3.set(vertex.position,
            MESH.xRange * geometry.segmentWidth * ox,
            MESH.yRange * geometry.sliceHeight * oy,
            MESH.zRange * offset * oz - offset);
        FSS.Vector3.add(vertex.position, vertex.anchor);
    }

    // Set the Geometry to dirty
    geometry.dirty = true;
}

function renderFSS() {
    rendererFSS.render(sceneFSS);

    // Draw Lights
    if (LIGHT.draw) {
        var l, lx, ly, light;
        for (l = sceneFSS.lights.length - 1; l >= 0; l--) {
            light = sceneFSS.lights[l];
            lx = light.position[0];
            ly = light.position[1];
            rendererFSS.context.lineWidth = 0.5;
            rendererFSS.context.beginPath();
            rendererFSS.context.arc(lx, ly, 10, 0, Math.PIM2);
            rendererFSS.context.strokeStyle = light.ambientHex;
            rendererFSS.context.stroke();
            rendererFSS.context.beginPath();
            rendererFSS.context.arc(lx, ly, 4, 0, Math.PIM2);
            rendererFSS.context.fillStyle = light.diffuseHex;
            rendererFSS.context.fill();

        }
    }
}


function addEventListeners() {
    window.addEventListener('resize', onWindowResizFSS);
}

// Callbacks

function onWindowResizFSS() {
    resize(containerFSS.offsetWidth, containerFSS.offsetHeight);
    renderFSS();
}


// Init
if (flatSurface.length) {
    initialise();
}