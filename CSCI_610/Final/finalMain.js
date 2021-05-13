'use strict';

// Global variables that are set and used
// across the application
let gl;

// GLSL programs
// let cylinderProgram;
// let cubeProgram;
// let coneProgram;
// let trunkProgram;
let globeProgram;

// VAOs for the objects
var myCube = null;
var myCone = null;
var mySphere = null;
var myCylinder = null;
var myCylinder2 = null;

// textures
let grassTexture;
let brickTexture;
let trunkTexture;
let treeTexture;
let towerTexture;

// rotation

//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {

    myCube = new Cube(20);
    // myCube.VAO = bindVAO (myCube, cubeProgram);
    myCube.VAO = bindVAO (myCube, globeProgram);

    myCone = new Cone(30, 30);
    // myCone.VAO = bindVAO (myCone, coneProgram);
    myCone.VAO = bindVAO (myCone, globeProgram);

    myCylinder = new Cylinder(10, 5);
    // myCylinder.VAO = bindVAO (myCylinder, cylinderProgram);
    myCylinder.VAO = bindVAO (myCylinder, globeProgram);


    myCylinder2 = new Cylinder(20, 5);
    // myCylinder2.VAO = bindVAO (myCylinder2, trunkProgram);
    myCylinder2.VAO = bindVAO (myCylinder2, globeProgram);

}


//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera() {
  
  var program = globeProgram;
  
  gl.useProgram(program);
  // set up your projection
  // defualt is orthographic projection

  //
  var fieldOfViewInRadians = Math.PI * 0.4;
  var aspectRatio = window.innerWidth / window.innerHeight;
  var nearClippingPlaneDistance = 2;
  var farClippingPlaneDistance = 100;

  let projMatrix = glMatrix.mat4.create();
  // glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
  glMatrix.mat4.perspective(projMatrix, fieldOfViewInRadians, aspectRatio, nearClippingPlaneDistance, farClippingPlaneDistance)
  gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

  // set up your view
  // defaut is at (0,0,-5) looking at the origin
  let viewMatrix = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(viewMatrix, [0, 3, -8], [0, 0, 0], [0, 1, 0]);
  gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);

  // program = cubeProgram;
  // gl.useProgram(program);
  // // set up your projection
  // // glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
  // glMatrix.mat4.perspective(projMatrix, fieldOfViewInRadians, aspectRatio, nearClippingPlaneDistance, farClippingPlaneDistance)
  // gl.uniformMatrix4fv (program.uProjT, false, projMatrix);

  // // set up your view
  // // defaut is at (0,0,-5) looking at the origin
  // glMatrix.mat4.lookAt(viewMatrix, [0, 3, -8], [0, 0, 0], [0, 1, 0]);
  // gl.uniformMatrix4fv (program.uViewT, false, viewMatrix);

}


//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures(){
  
  // flip Y for WebGL
  gl.pixelStorei (gl.UNPACK_FLIP_Y_WEBGL, true);
  
  // gl.useProgram(cylinderProgram);
  // get some texture space from the gpu
  grassTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, grassTexture);

  // load the actual image
  var grassImage = document.getElementById ('grass-texture')
  grassImage.crossOrigin = "";
  
  grassImage.onload = () => {


    // gl.useProgram(cubeProgram);
    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, grassTexture);
    
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, grassImage.width, grassImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, grassImage);
    draw();
  }

  // set texturing parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // gl.useProgram(cylinderProgram);
  brickTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, brickTexture);

  // load the actual image
  var brickImage = document.getElementById ('brick-texture')
  brickImage.crossOrigin = "";
  
  brickImage.onload = () => {

    // gl.useProgram(cylinderProgram);

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, brickTexture);
    
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, brickImage.width, brickImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, brickImage);
    draw();
  }

  // set texturing parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  
  trunkTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, trunkTexture);

  // load the actual image
  var trunkImage = document.getElementById ('trunk-texture')
  trunkImage.crossOrigin = "";
  
  trunkImage.onload = () => {

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, trunkTexture);
    
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, trunkImage.width, trunkImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, trunkImage);
    draw();
  }

  // set texturing parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  treeTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, treeTexture);

  // load the actual image
  var treeImage = document.getElementById ('tree-texture')
  treeImage.crossOrigin = "";
  
  treeImage.onload = () => {

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, treeTexture);
    
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, treeImage.width, treeImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, treeImage);
    draw();
  }

  // set texturing parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  towerTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, towerTexture);

  // load the actual image
  var towerImage = document.getElementById ('tower-texture')
  towerImage.crossOrigin = "";
  
  towerImage.onload = () => {

    // bind the texture so we can perform operations on it
    gl.bindTexture (gl.TEXTURE_2D, towerTexture);
    
    // load the texture data
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, towerImage.width, towerImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, towerImage);
    draw();
  }

  // set texturing parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      
}

  function drawGroundCube(pos_vec, scale_vec){
    // var program = cubeProgram;
    // gl.useProgram(program);
    var program = globeProgram;
    var scaleMatrix;
    let modelMatrix2 = glMatrix.mat4.create();

    modelMatrix2 = glMatrix.mat4.create();
    glMatrix.mat4.rotateY (modelMatrix2,  modelMatrix2, radians(180.0));
    glMatrix.mat4.translate (modelMatrix2,  modelMatrix2, pos_vec);
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix2);

    scaleMatrix = glMatrix.mat4.create();
    glMatrix.mat4.scale(scaleMatrix,  scaleMatrix, scale_vec);
    gl.uniformMatrix4fv (program.uScaleT, false, scaleMatrix);
    // send the model matrix to the shader and draw.
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawTowerCyilner(pos_vec, scale_vec){
    // var program = cylinderProgram;
    var program = globeProgram;
    // gl.useProgram(program);
    var scaleMatrix;
    let modelMatrix2 = glMatrix.mat4.create();

    glMatrix.mat4.rotateY (modelMatrix2,  modelMatrix2, radians(180.0));
    glMatrix.mat4.rotateZ (modelMatrix2,  modelMatrix2, radians(-5));
    glMatrix.mat4.translate (modelMatrix2,  modelMatrix2, pos_vec);
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix2);

    scaleMatrix = glMatrix.mat4.create();
    glMatrix.mat4.scale(scaleMatrix,  scaleMatrix, scale_vec);
    gl.uniformMatrix4fv (program.uScaleT, false, scaleMatrix);
    // send the model matrix to the shader and draw.
    // gl.bindVertexArray(myCube.VAO);
    gl.bindVertexArray(myCylinder.VAO);
    // gl.bindVertexArray(bindVAO (myCylinder, cylinderProgram));
    // gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);
  }

//
//  This function draws all of the shapes required for your scene
//
  function drawShapes() {
    
    var program = globeProgram;
    // gl.useProgram(program);

    var scaleMatrix;
    let modelMatrix2;
    
    gl.activeTexture (gl.TEXTURE0);
    gl.bindTexture (gl.TEXTURE_2D, grassTexture);
    gl.uniform1i (program.uTheTexture, 0);

    // Draw the ground.
    drawGroundCube([0, 0, 4], [1, 0.5, 1]);
    drawGroundCube([-1,-0,4], [1, 0.5, 1]);
    drawGroundCube([1,-0,4], [1, 0.5, 1]);
    drawGroundCube([0,0,3], [1, 0.5, 1]);
    drawGroundCube([-1,0,3], [1, 0.5, 1]);
    drawGroundCube([1,0,3], [1, 0.5, 1]);
    drawGroundCube([0,0,2], [1, 0.5, 1]);
    drawGroundCube([-1,0,2], [1, 0.5, 1]);
    drawGroundCube([1,0,2], [1, 0.5, 1]);

    // program = cylinderProgram;
    // gl.useProgram(program);

    // Draw the tower.

    var pos_x = 0.3;
    var pos_y = 1.2;
    var pos_z = 3.7;

    gl.activeTexture (gl.TEXTURE4);
    gl.bindTexture (gl.TEXTURE_2D, towerTexture);
    gl.uniform1i (program.uTheTexture, 4);

    drawTowerCyilner([pos_x, pos_y, pos_z], [0.8, 0.5, 1]);
    drawTowerCyilner([pos_x, pos_y+0.5, pos_z], [0.8, 0.5, 1]);
    drawTowerCyilner([pos_x, pos_y+1.0, pos_z], [0.8, 0.5, 1]);
    drawTowerCyilner([pos_x, pos_y+1.5, pos_z], [0.8, 0.5, 1]);
    drawTowerCyilner([pos_x, pos_y+2.0, pos_z], [0.8, 0.5, 1]);
    drawTowerCyilner([pos_x, pos_y+2.4, pos_z], [0.5, 0.3, 1]);


    gl.activeTexture (gl.TEXTURE2);
    gl.bindTexture (gl.TEXTURE_2D, trunkTexture);
    gl.uniform1i (program.uTheTexture, 2);

    // program = trunkProgram;
    // gl.useProgram(program);

    // Draw the tree trunk.
    modelMatrix2 = glMatrix.mat4.create();
    glMatrix.mat4.rotateY (modelMatrix2,  modelMatrix2, radians(180.0))
    glMatrix.mat4.translate (modelMatrix2,  modelMatrix2, [-0.8, 1, 4.7])
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix2);
    scaleMatrix = glMatrix.mat4.create();
    glMatrix.mat4.scale(scaleMatrix,  scaleMatrix, [0.1, 0.5, 0.1]);
    gl.uniformMatrix4fv (program.uScaleT, false, scaleMatrix);
    gl.bindVertexArray(myCylinder2.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder2.indices.length, gl.UNSIGNED_SHORT, 0);

    gl.activeTexture (gl.TEXTURE3);
    gl.bindTexture (gl.TEXTURE_2D, treeTexture);
    gl.uniform1i (program.uTheTexture, 3);

    // program = trunkProgram;
    // gl.useProgram(program);

    // Draw the tree trunk.
    modelMatrix2 = glMatrix.mat4.create();
    glMatrix.mat4.rotateY (modelMatrix2,  modelMatrix2, radians(180.0))
    glMatrix.mat4.translate (modelMatrix2,  modelMatrix2, [-0.8, 1.8, 4.7])
    // send the model matrix to the shader and draw.
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix2);
    scaleMatrix = glMatrix.mat4.create();
    glMatrix.mat4.scale(scaleMatrix,  scaleMatrix, [0.8, 1, 0.8]);
    gl.uniformMatrix4fv (program.uScaleT, false, scaleMatrix);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
    
  }


//
// Use this function to create all the programs that you need
// You can make use of the auxillary function initProgram
// which takes the name of a vertex shader and fragment shader
//
// Note that after successfully obtaining a program using the initProgram
// function, you will beed to assign locations of attribute and unifirm variable
// based on the in variables to the shaders.   This will vary from program
// to program.
//
function initPrograms(vertexid, fragmentid) {
  // set up the per-vertex program
  const vertexShader = getShader(vertexid);
  const fragmentShader = getShader(fragmentid);

  // Create a program
  let program = gl.createProgram();
  
  // Attach the shaders to this program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Could not initialize shaders');
  }

  // Use this program instance
  gl.useProgram(program);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  program.aUV = gl.getAttribLocation(program, 'aUV');
  program.uModelT = gl.getUniformLocation (program, 'modelT');
  program.uViewT = gl.getUniformLocation (program, 'viewT');
  program.uProjT = gl.getUniformLocation (program, 'projT');
  program.uScaleT = gl.getUniformLocation (program, 'scaleT');
    
  // uniforms - you will need to add references for any additional
  // uniforms that you add to your shaders
  program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
  program.uTheta = gl.getUniformLocation (program, 'theta');
    
  return program;
}


// creates a VAO and returns its ID
function bindVAO (shape, program) {
    //create and bind VAO
    let theVAO = gl.createVertexArray();
    gl.bindVertexArray(theVAO);
    
    // create and bind vertex buffer
    let myVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    
    // add code for any additional vertex attribute

    // create, bind, and fill buffer for uv's
    // uvs can be obtained from the uv member of the
    // shape object.  2 floating point values (u,v) per vertex are
    // stored in this array.
    let uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.aUV);
    gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
    
    // Setting up the IBO
    let myIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

    // Clean
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
    return theVAO;
}


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
const script = document.getElementById(id);
const shaderString = script.text.trim();

// Assign shader depending on the type of shader
let shader;
if (script.type === 'x-shader/x-vertex') {
  shader = gl.createShader(gl.VERTEX_SHADER);
}
else if (script.type === 'x-shader/x-fragment') {
  shader = gl.createShader(gl.FRAGMENT_SHADER);
}
else {
  return null;
}

// Compile the shader using the supplied shader code
gl.shaderSource(shader, shaderString);
gl.compileShader(shader);

// Ensure the shader is valid
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
  console.error(gl.getShaderInfoLog(shader));
  return null;
}

return shader;
}


//
// compiles, loads, links and returns a program (vertex/fragment shader pair)
//
// takes in the id of the vertex and fragment shaders (as given in the HTML file)
// and returns a program object.
//
// will return null if something went wrong
//
function initProgram(vertex_id, fragment_id) {
  const vertexShader = getShader(vertex_id);
  const fragmentShader = getShader(fragment_id);

  // Create a program
  let program = gl.createProgram();
    
  // Attach the shaders to this program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Could not initialize shaders');
    return null;
  }
    
  return program;
}


//
// We call draw to render to our canvas
//
function draw() {
  // Clear the scene
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
  // draw your shapes
  drawShapes();

  // Clean
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  console.log("Draw method called!")
}

// Entry point to our application
function init() {
    
  // Retrieve the canvas
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) {
    console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
    return null;
  }

  // deal with keypress
  window.addEventListener('keydown', gotKey ,false);

  // Retrieve a WebGL context
  gl = canvas.getContext('webgl2');
  if (!gl) {
      console.error(`There is no WebGL 2.0 context`);
      return null;
    }
    
  // deal with keypress
  window.addEventListener('keydown', gotKey ,false);
    
  // Set the clear color to be black
  gl.clearColor(0, 0, 0, 1);
    
  // some GL initialization
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  
  gl.cullFace(gl.BACK);
  gl.frontFace(gl.CCW);
  gl.clearColor(0.0,0.0,0.0,1.0)
  gl.depthFunc(gl.LEQUAL)
  gl.clearDepth(1.0)

  // Read, compile, and link your shaders
  // cylinderProgram = initPrograms("vertex-shader", "fragment-shader");
  // cubeProgram = initPrograms("vertex-shader", "fragment-shader");
  // trunkProgram = initPrograms("vertex-shader", "fragment-shader");
  // coneProgram = initPrograms("vertex-shader", "fragment-shader");
  globeProgram = initPrograms("vertex-shader", "fragment-shader");
  
  // create and bind your current object
  createShapes();

  // set up your textures
  setUpTextures();

  // set up your camera
  setUpCamera();

  // do a draw
  // draw();
}
