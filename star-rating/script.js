/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
  this.$target = document.querySelector(el);
  this.count = count;
  this.callback = callback;
  this.active = -1;
  this.render();
  this.bindEvents();
}

Star.prototype.render = function () {
  const $fragment = document.createDocumentFragment();
  for (let i = 0; i < this.count; i++) {
    const $star = document.createElement('div');
    $star.classList.add('fa');
    $star.classList.add('fa-star-o');
    $star.dataset.ratingId = i;
    $fragment.appendChild($star);
  }
  this.$target.appendChild($fragment);
};

Star.prototype.bindEvents = function () {
  this.$target.addEventListener('mouseover', this.onMouseOver.bind(this));
  this.$target.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  this.$target.addEventListener('click', this.onClick.bind(this));
};

Star.prototype.fill = function (ratingId) {
  for (let i = 0; i < this.count; i++) {
    if (i <= ratingId) {
      this.$target.children[i].classList.add('fa-star');
      continue;
    }
    this.$target.children[i].classList.remove('fa-star');
  }
};

Star.prototype.onMouseOver = function (e) {
  const ratingId = e.target.dataset.ratingId;
  this.fill(ratingId);
};

Star.prototype.onMouseLeave = function () {
  this.fill(this.active);
};

Star.prototype.onClick = function (e) {
  this.active = e.target.dataset.ratingId;
  this.callback(this.active + 1);
};
