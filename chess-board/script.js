function Board(el) {
  this.$target = document.querySelector(el);
  this.n = 8;
  this.render();
  this.bindEvents();
}

Board.prototype.render = function () {
  const $fragment = document.createDocumentFragment();

  for (let x = 0; x < this.n; x++) {
    for (let y = 0; y < this.n; y++) {
      const $block = document.createElement('div');
      
      $block.classList.add('chess-block');
      $block.dataset.row = x;
      $block.dataset.col = y;

      if ((x % 2) + (y % 2) === 1) {
        $block.style.backgroundColor = 'black';
      }

      $fragment.appendChild($block);
    }
  }

  this.$target.style.gridTemplateRows = `repeat(${this.n}, 1fr)`;
  this.$target.style.gridTemplateColumns = `repeat(${this.n}, 1fr)`;
  this.$target.appendChild($fragment);
};

Board.prototype.bindEvents = function () {
  this.$target.addEventListener('click', this.onClick.bind(this));
};

Board.prototype.onClick = function (e) {
  const { row, col } = e.target.dataset;

  for (let i = 0; i < Math.pow(this.n, 2); i++) {
    const $block = this.$target.children[i];
    const dx = Math.abs(row - $block.dataset.row);
    const dy = Math.abs(col - $block.dataset.col);

    if (dx === dy) {
      $block.classList.add('highlight');
      continue;
    }

    if ($block.classList.contains('highlight')) {
      $block.classList.remove('highlight');
    }
  }
};

new Board('#chess-board');
