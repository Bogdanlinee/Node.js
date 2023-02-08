// abstract class
class AbstractProduct {
  constructor(id, name, description, price, quantity, reviews, image, date, brand) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.reviews = reviews;
    this.image = image;
    this.date = date;
    this.brand = brand;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    if (id === '') {
      throw new Error('ID can`t be empty');
    }
    this.id = id;
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    if (name === '') {
      throw new Error('Name can`t be empty');
    }
    this.name = name;
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    if (description === '') {
      throw new Error('Description can`t be empty');
    }
    this.description = description;
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    if (price === '') {
      throw new Error('Price can`t be empty');
    }
    this.price = price;
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    if (quantity === '') {
      throw new Error('Quantity can`t be empty');
    }
    this.quantity = quantity;
    return this.quantity;
  }

  getReviews() {
    return this.reviews;
  }

  setReviews(reviews) {
    if (reviews === '') {
      throw new Error('Reviews can`t be empty');
    }
    this.reviews = reviews;
    return this.reviews;
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    if (image === '') {
      throw new Error('Image can`t be empty');
    }
    this.image = image;
    return this.image;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    if (date === '') {
      throw new Error('Date can`t be empty');
    }
    this.date = date;
    return this.date;
  }

  getBrand() {
    return this.brand;
  }

  setBrand(brand) {
    if (brand === '') {
      throw new Error('Brand can`t be empty');
    }
    this.brand = brand;
    return this.brand;
  }
}

AbstractProduct.prototype.getFullInformation = function () {
  let keyValueContainer = '';

  for (let key in this) {
    if (typeof this[key] === 'function') {
      continue;
    }

    keyValueContainer += key + ' - ' + this.key + '\n';
  }
  return keyValueContainer;
}

AbstractProduct.prototype.getPriceForQuantity = function (int) {
  if (!this.price) {
    throw new Error('Sorry, we have no price for this product');
  }
  let quantityPrice = parseFloat(this.price) * int;
  return '$' + quantityPrice.toFixed(2);
}

AbstractProduct.prototype.getSet = function () {
  const argsQuantity = arguments.length;

  if (argsQuantity !== 1 && argsQuantity !== 2) {
    throw new Error('You need to put 1 or 2 arguments inside method!');
  }

  if (!arguments[0] in this) {
    throw new Error(`${arguments[0]} is not defined in this object`);
  }

  // 1 argument - getter
  if (argsQuantity === 1) {
    return this[arguments[0]];
  }
  // 2 arguments - setter
  if (argsQuantity === 2) {
    if (arguments[1] === '') {
      throw new Error(`${arguments[0]} can not be empty`);
    }

    this[arguments[0]] = arguments[1];
    return this[arguments[0]];
  }
}

// Clothes class which extends abstract class 
class Clothes extends AbstractProduct {
  constructor(id, name, description, price, quantity, reviews, image, date, brand, material, color) {
    super(id, name, description, price, quantity, reviews, image, date, brand);

    this.material = material;
    this.color = color;
  }

  getMaterial() {
    return this.material;
  }

  setMaterial(value) {
    if (value === '') {
      throw new Error('Material value can not be empty')
    }
    this.material = value;
  }

  getColor() {
    return this.color;
  }

  setColor(value) {
    if (value === '') {
      throw new Error('Color value can not be empty')
    }
    this.color = value;
  }
}

// Electronics class which extends abstract class 
class Electronics extends AbstractProduct {
  constructor(id, name, description, price, quantity, reviews, image, date, brand, warranty, power) {
    super(id, name, description, price, quantity, reviews, image, date, brand)

    this.warranty = warranty;
    this.power = power;
  }

  getWarranty() {
    return this.material;
  }

  setWarranty(value) {
    if (value === '') {
      throw new Error('Warranty value can not be empty')
    }
    this.material = value;
  }

  getPower() {
    return this.power;
  }

  setPower(value) {
    if (value === '') {
      throw new Error('Warranty value can not be empty')
    }
    this.power = value;
  }
}

function searchProducts(products, search, researchIsDeep) {
  let patternToFind;

  if (researchIsDeep) {
    patternToFind = new RegExp(search + '\w*', 'gmi');
  } else {
    patternToFind = new RegExp('(^|\\s)' + search + '($|\\s)', 'gmi');
  }

  let newArrMatchRegex = products.filter(function (item) {
    if (item.getName().match(patternToFind) !== null || item.getDescription().match(patternToFind) !== null) {
      return true;
    }
  });

  return newArrMatchRegex;
}

function sortProducts(products, sortRule) {
  if (sortRule !== 'name' && sortRule !== 'id' && sortRule !== 'price') {
    throw new Error('Can not sort using ' + sortRule);
  }

  products = products.sort(function (a, b) {
    if (typeof a[sortRule] === 'string') {
      if (a[sortRule].toLowerCase() > b[sortRule].toLowerCase()) {
        return 1;
      }
      if (a[sortRule].toLowerCase() < b[sortRule].toLowerCase()) {
        return -1;
      }
      if (a[sortRule].toLowerCase() === b[sortRule].toLowerCase()) {
        return 0;
      }
    }

    if (typeof a[sortRule] === 'number') {
      return a[sortRule] - b[sortRule];
    }
  });

  return products;
}

let products = [new Clothes(2, 'a', 'hello sh world'), new Clothes(800, 'c', 'hello world'), new Clothes(33, 'b', 'world'), new Clothes(2, 'B', 'world')];