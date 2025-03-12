export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  shipHasHealth() {
    return this.hits < this.length;
  }

  isSunk() {
    return this.hits >= this.length;
  }

  hit() {
    if (this.shipHasHealth()) {
      this.hits++;
    }
  }
}
