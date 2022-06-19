/*
 * Creates pixel art grid
 * @param el DOM Element
 * @param rows Number of rows
 * @param rows Number of cols
 */
function PixelArt(el, rows, cols) {
  this.$target = document.querySelector(el);
  this.rows = rows;
  this.cols = cols;
  this.randomColorMap = new Map();
  this.selectColor = '';
  this.isDrag = false;
  this.render();
  this.bindEvents();
}

PixelArt.prototype.render = function () {
  const $fragment = document.createDocumentFragment();
  for (let i = 0; i < (this.rows + 1) * this.cols; i++) {
    const $pixel = document.createElement('div');
    $pixel.classList.add('pixel');
    if (i >= this.rows * this.cols) {
      $pixel.classList.add('palette');
      $pixel.style.backgroundColor = this.getRandomColor();
    }
    $pixel.dataset.pixelId = i;
    $fragment.appendChild($pixel);
  }

  this.$target.style.gridTemplateRows = `repeat(${this.rows + 1}, 1fr)`;
  this.$target.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
  this.$target.appendChild($fragment);
};

PixelArt.prototype.bindEvents = function () {
  this.$target.addEventListener('click', this.onClick.bind(this));
  this.$target.addEventListener('mouseover', this.onMouseOver.bind(this));
  this.$target.addEventListener('mousedown', this.onMouseDown.bind(this));
  this.$target.addEventListener('mouseup', this.onMouseUp.bind(this));
};

PixelArt.prototype.onClick = function (e) {
  const pixelId = e.target.dataset.pixelId;
  if (pixelId >= this.rows * this.cols) {
    this.selectColor = e.target.style.backgroundColor;
    return;
  }
  e.target.style.backgroundColor = this.selectColor;
};

PixelArt.prototype.onMouseOver = function (e) {
  if (!this.isDrag) {
    return;
  }
  e.target.classList.add('dragged');
}

PixelArt.prototype.onMouseDown = function () {
  this.isDrag = true;
};

PixelArt.prototype.onMouseUp = function () {
  this.isDrag = false;
};


PixelArt.prototype.getRandomColor = function () {
  const color = '#' + parseInt(Math.random() * 0xffffff).toString(16);
  if (this.randomColorMap.has(color)) {
    return getRandomColor();
  }
  this.randomColorMap.set(color, true);
  return color;
};
