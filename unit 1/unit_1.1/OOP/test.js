// function HelloWorld() {
//   this.count = 0;
//   return this.value;
// }

// HelloWorld.prototype.increment = function () {
//   this.count += 1
//   // возвращаем this, чтобы иметь возможность выстраивания цепочки из вызовов методов
//   return this
// }

// HelloWorld.prototype.decrement = function () {
//   this.count -= 1
//   return this
// }

// HelloWorld.prototype.reset = function () {
//   this.count = 0
//   return this
// }

// HelloWorld.prototype.getInfo = function () {
//   console.log(this.count)
//   return this
// }

// const newObj1 = new HelloWorld();

// const a = new Object();

// console.log(increment in a);

// ============================================================================

class Counter {
  constructor(initialValue = 0) {
    this.counter = initialValue;
  }

  increment() {
    this.counter += 1;
    return this;
  }

  decrement() {
    this.counter -= 1;
    return this;
  }

  getInfo() {
    console.log(this.counter);
    return this;
  }

  reset() {
    this.counter = 0;
    return this;
  }
}

let a = new Counter();

a.increment();
a.increment();
a.increment();

a.getInfo();

a.reset();
a.getInfo();