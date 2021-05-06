import SceneComponent from 'babylonjs-hook';

const onSceneReady = (scene) => {

};

const onRender = (scene) => {

};

export default () => (
    <div>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
    </div>
);