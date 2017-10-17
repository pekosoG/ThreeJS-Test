var example= (function(){
    "user strict";

    var scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light= new THREE.AmbientLight(0xffffff),
    camera,
    box;

    function initScene(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera  = new THREE.PerspectiveCamera(35,window.innerWidth/window.innerHeight,1,1000);
        camera.position.z=100;
        scene.add(camera);

        box = new THREE.Mesh(
            new THREE.BoxGeometry(20,20,20),
            new THREE.MeshBasicMaterial({color:0xFF0000, wireframe:true})
        );
        
        box.name="box";
        scene.add(box);

        sphere = new THREE.Mesh(
            new THREE.SphereGeometry(15,40,40),
            new THREE.MeshBasicMaterial({color:0xFF0000, wireframe:true})
        );

        sphere.name="sphere";
        scene.add(sphere);

        var material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide
        });

        var triangleGeometry = new THREE.Geometry();
        triangleGeometry.vertices.push(new THREE.Vector3(0.0,10.0,0.0));
        triangleGeometry.vertices.push(new THREE.Vector3(-10.0,-10.0,0.0));
        triangleGeometry.vertices.push(new THREE.Vector3(0.0,-10.0,0.0));

        triangleGeometry.faces.push(new THREE.Face3(0,1,2));
        triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
        triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
        triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);
        
        customGeometry = new THREE.Mesh(triangleGeometry,material);
        scene.add(customGeometry);

        render();
    }


    function render(){

        box.rotation.y+=0.01;
        box.rotation.x+=0.02;
        box.position.set(-20.0, 0, 0);

        sphere.rotation.y+=0.01;
        sphere.position.set(20.0, 0, 0);

        renderer.render(scene,camera);
        requestAnimationFrame(render);
    }

    window.onload = initScene

    return {
        scene : scene
    }

})();