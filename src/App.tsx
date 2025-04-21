import "./App.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const App = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const model = document.getElementById("model");
    console.log(model?.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(3, model?.clientWidth as number / Number(model?.clientHeight));
    // camera.position.y = 1;
    camera.position.z = 10;
    scene.add(camera);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const sun = new THREE.DirectionalLight(0xffffff, 1.3);
    sun.position.set(500, 500, 500);
    scene.add(sun);
    const loader = new GLTFLoader();
    let men: THREE.Group<THREE.Object3DEventMap>;
    let anim: THREE.AnimationMixer;
    loader.load(
      "/public/huggy_normal_with_anim.glb",
      (gltf) => {
        men = gltf.scene;
        men.position.y = -0.2;
        anim = new THREE.AnimationMixer(men);
        anim.clipAction(gltf.animations[3]).play();
        scene.add(men);
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF:", error);
      }
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(model?.clientWidth as number, model?.clientHeight as number);
    document?.getElementById("model")?.appendChild(renderer.domElement);

    const reRender = () => {
      requestAnimationFrame(reRender);
      renderer.render(scene, camera);
      if (anim) anim.update(0.02);
    }
    reRender();
    return () => {
      document.getElementById("model")?.removeChild(renderer.domElement);
    };
  }, [])


  return (
    <div>
      <nav>
        <div data-aos="fade-down" data-aos-duration="500" id="icon">Syntax <span>Siam</span></div>
        <div id="nav-item">
          <p data-aos="fade-down" data-aos-duration="1000" id="home_selected">Home</p>
          <p data-aos="fade-down" data-aos-duration="1500">About</p>
          <p data-aos="fade-down" data-aos-duration="2000">Contact Us</p>
          <p data-aos="fade-down" data-aos-duration="2500">Info</p>
        </div>

        <button id="download" data-aos="fade-down" data-aos-duration="3000">Download</button>
      </nav>

      <div id="hero1">
        <div id="content" className="flex">
          <p id="hi">hi there!</p>
          <p id="me">i'm <span>siam sheikh</span></p>
          <div id="role">front-end developer</div>
          <p id="info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni praesentium suscipit odit vero
            nesciunt placeat. Aliquam fuga quaerat eveniet nulla qui saepe quisquam eaque, totam adipisci ad
            necessitatibus hic ipsam. Libero a repellat fugit explicabo, reprehenderit architecto, numquam omnis
            quia error reiciendis, culpa quae quis. Ipsum, debitis. Et, vero minus?</p>
          <button id="download">{"Learn More >"}</button>
        </div>
        <div className="flex" id="model"></div>
      </div>
    </div>
  );
};

export default App;