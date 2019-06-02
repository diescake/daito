(() => {
  const keyCodeB = 66;
  const normalSpeed = 100;
  const highSpeed = 1000;
  const camera = document.getElementById("camera");

  const speedUp = () => {
    camera.setAttribute("wasd-controls", `acceleration: ${highSpeed}`);
  };

  const speedDown = () => {
    camera.setAttribute("wasd-controls", `acceleration: ${normalSpeed}`);
  };

  document.onkeydown = (e) => {
    if (e.keyCode == keyCodeB) speedUp();
  };

  document.onkeyup = (e) => {
    if (e.keyCode == keyCodeB) speedDown();
  };
})();
