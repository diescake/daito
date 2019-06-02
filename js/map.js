(() => {
  const image = {
    // wall: '../image/plaster.png',
    wall: 'image/wall.png',
    carpet: 'image/carpet.jpg',
    ceil: 'image/ceiling_tile.jpg'
  };

  const daito = {
    D5F: {
      x: 7,
      y: 1,
      z: 18
    }
  };

  const createPlane = (src, positions, rotations, width, height) => {
    const plane = document.createElement('a-plane');
    plane.setAttribute('src', src);
    plane.setAttribute('color', 'white');
    plane.setAttribute('position', positions.join(' '));
    plane.setAttribute('rotation', rotations.join(' '));
    plane.setAttribute('width', width);
    plane.setAttribute('height', height);
    return plane;
  };

  const createCeil = (src, x, z) => {
    const width = 10;
    const height = 10;
    const POS_Y = 10; // depends wall height

    const positions = [x * width, POS_Y, z * height];
    const rotations = [90, 0, 0];
    return createPlane(src, positions, rotations, width, height);
  };

  const createFloor = (src, x, z) => {
    const width = 10;
    const height = 10;
    const positions = [x * width, 0, z * height];
    const rotations = [-90, 0, 0];
    return createPlane(src, positions, rotations, width, height);
  };

  const createNSSideWall = (src, posX, posZ, rotY) => {
    const width = 10;
    const height = 10;

    const positions = [posX * height, height / 2, (posZ - 0.5) * height];
    const rotations = [0, rotY, 0];
    return createPlane(src, positions, rotations, width, height);
  };

  const createEWSideWall = (src, posX, posZ, rotY) => {
    const width = 10;
    const height = 10;

    const positions = [(posX - 0.5) * height, height / 2, posZ * height];
    const rotations = [0, rotY, 0];
    return createPlane(src, positions, rotations, width, height);
  };

  const createMaps = mapData => {
    const floors = [];
    const ceils = [];
    const walls = [];

    for (let x = 0; x < mapData.x; x++) {
      for (let z = 0; z < mapData.z; z++) {
        floors.push(createFloor(image.carpet, x, z));
        ceils.push(createCeil(image.ceil, x, z));
      }
    }

    for (let x = 0; x < mapData.x; x++) {
      walls.push(createNSSideWall(image.wall, x, 0, 0));
      walls.push(createNSSideWall(image.wall, x, 18, 180));
    }

    for (let z = 0; z < mapData.z; z++) {
      walls.push(createEWSideWall(image.wall, 0, z, 90));
      walls.push(createEWSideWall(image.wall, 7, z, -90));
    }

    return [...floors, ...ceils, ...walls];
  };

  const scene = document.querySelector('a-scene');

  const floors = createMaps(daito.D5F);
  floors.forEach(plane => scene.appendChild(plane));
})();
