export function testSetup() {
  this.row = 0;
  this.column = 0;
}

export function testCycle() {
  if (this.column === 99) {
    this.column = 0;
    this.row ++;

    if (this.row >= this.rowsLimit) {
      this.row = 0;
    }
  }

  this.column ++;
}
