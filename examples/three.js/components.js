export const SceneObject = {
  name: 'SceneObject',
  data: {
    sceneObject: {type: 'any', default: null}
  }
}

export const Position = {
  name: 'Position',
  data: {
    x: {type: 'number',  default:0 },
    y: {type: 'number',  default:0 },
    z: {type: 'number',  default:-300 },
  }
}

export const Velocity = {
  name: 'Velocity',
  data: {
    dx: {type: 'number',  default:0 },
    dy: {type: 'number',  default:0 },
    dz: {type: 'number',  default:0 },
  }
}

export const Rotation = {
  name: 'Rotation',
  data: {
    rx: {type: 'number',  default:0 },
    ry: {type: 'number',  default:0 },
  }
}

export const Renderable = {
  name: 'Renderable'
}
