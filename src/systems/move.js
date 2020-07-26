

export const Move = (components, log) => {
  const position = components.get('Position')
  position.x += 10;
  position.y += 10;
  return components;
};

Move.query = ['Position'];
