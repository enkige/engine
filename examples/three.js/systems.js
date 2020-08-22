
export const Rotate = () => {
  const execute = (components) => {
    const r = components.get('Rotation');
    const o = components.get('SceneObject');

    o.sceneObject.rotation.x += r.rx;
    o.sceneObject.rotation.y += r.ry;
  }

  const events = () => {}

  return {
    execute,
    events
  }

}
Rotate.query =['Rotation', 'SceneObject']
Rotate.events = []

export const Move = () => {
  const execute = (components) => {
    const p = components.get('Position');
    const v = components.get('Velocity');
    const o = components.get('SceneObject');

    //Stay within scene without moving camera
    if(p.x >= 6 || p.x < -6) {
      v.dx = 0 - v.dx;
    }
    if(p.y >= 4 || p.y < -4) {
      v.dy = 0 - v.dy;
    }
    if(p.z >= 0.5 || p.z < -10) {
      v.dz = 0 - v.dz;
    }

    //apply velocity
    p.x += v.dx;
    p.y += v.dy;
    p.z += v.dz

    o.sceneObject.position.x = p.x;
    o.sceneObject.position.y = p.y;
    o.sceneObject.position.z = p.z;
  }

  const events = () => {}

  return {
    execute,
    events
  }


}
Move.query = ['Velocity', 'Position', 'SceneObject']
Move.events = []