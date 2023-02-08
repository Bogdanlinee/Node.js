let myFunction = new Product();
let myFunction2 = new Product();
let myFunction3 = new Product();

function Product() {
  this.ID = '007';
  this.name = 'Bogdan';
  this.description = 'object description';
  this.price = 199.99;
  this.brand = 'D&G';
  this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  this.activeSize = 'XS';
  this.quantity = 250;
  this.date = new Date();
  this.reviews = [
    {
      ID: '9874654',
      author: 'Joh Miller',
      date: new Date(),
      comment: 'I really like your product',
      rating: {
        service: 5,
        price: 4,
        value: 2,
        quality: 5
      }
    }
  ];
  this.images = ['image-one', 'image-two', 'image-three', 'image-four'];

  // getters
  this.getID = function () {
    return this.ID;
  }
  this.getName = function () {
    return this.name;
  }
  this.getDescription = function () {
    return this.description;
  }
  this.getPrice = function () {
    return this.price;
  }
  this.getBrand = function () {
    return this.brand;
  }
  this.getSize = function () {
    return this.sizes;
  }
  this.getActiveSize = function () {
    return this.activeSize;
  }
  this.getQuantity = function () {
    return this.quantity;
  }
  this.getDate = function () {
    return this.date;
  }
  this.getReviews = function () {
    return this.reviews;
  }
  this.getImages = function () {
    return this.images;
  }

  //setters
  this.setID = function (value) {
    return this.ID = value;
  }
  this.setName = function (value) {
    return this.name = value;
  }
  this.setDescription = function (value) {
    return this.description = value;
  }
  this.setPrice = function (value) {
    return this.price = value;
  }
  this.setBrand = function (value) {
    return this.brand = value;
  }
  this.setSize = function (value) {
    return this.sizes = value;
  }
  this.setActiveSize = function (value) {
    return this.activeSize = value;
  }
  this.setQuantity = function (value) {
    return this.quantity = value;
  }
  this.setDate = function (value) {
    return this.date = value;
  }
  this.setReviews = function (value) {
    return this.reviews = value;
  }
  this.setImages = function (value) {
    return this.images = value;
  }

  // methods
  this.getReviewByID = function (key) {
    for (let i in this.reviews) {
      if (this.reviews[i][key]) {
        return this.reviews[i];
      }
    }
  }

  this.getImage = function (param) {
    for (let i in this.images) {
      if (this.images[i] === param) {
        return this.images[i];
      }
    }
    return this.images[0];
  }

  this.addSize = function (addedElement) {
    this.sizes.push(addedElement);
    return addedElement;
  }

  this.deleteSize = function (elementToDelete) {
    let indexOfElement = this.sizes.indexOf(elementToDelete);

    if (indexOfElement !== -1) {
      this.sizes.splice(indexOfElement, 1);
      return elementToDelete;
    }
    return;
  }

  this.addReview = function (element) {
    this.reviews.push(element);
  }

  this.deleteReview = function (elementIdValue) {
    for (let i in this.reviews) {
      if (this.reviews[i].ID === elementIdValue) {
        this.reviews.splice(i, 1);
        return elementIdValue;
      }
    }
    return;
  }

  this.getAverageRating = function (reviewId) {
    for (i in this.reviews) {
      if (this.reviews[i].ID === reviewId) {
        return calculateAvarageRating(this.reviews[i]);
      }
    }

    function calculateAvarageRating(obj) {
      let ratingItemsQuantity = 0;
      let ratingTotal = 0;

      for (let i in obj.rating) {
        ratingTotal += obj.rating[i];
        ratingItemsQuantity++;
      }

      return ratingTotal / ratingItemsQuantity;
    }
  }
}

myFunction2.setName('Alisa');
myFunction3.setName('David');
myFunction2.setDescription('This tenn the tennis racket');
myFunction3.setDescription('This is the state in USA');
myFunction3.setPrice(100000);
myFunction2.setPrice(22222);
myFunction.setPrice(100000.1);
myFunction3.setID(2);
myFunction2.setID(55);

let arr = [myFunction, myFunction2, myFunction3];

function searchProducts(products, search, researchIsDeep) {
  let patternToFind;

  if (researchIsDeep) {
    patternToFind = new RegExp(search + '\w*', 'gmi');
  } else {
    patternToFind = new RegExp('(^|\\s)' + search + '($|\\s)', 'gmi');
  }

  let newArrMatchRegex = products.filter(function (item) {
    if (item.getName().match(patternToFind) || item.getDescription().match(patternToFind)) {
      return true;
    }
  });

  return newArrMatchRegex;
}

function sortProducts(products, sortRule) {
  if (sortRule !== 'name' && sortRule !== 'ID' && sortRule !== 'price') {
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