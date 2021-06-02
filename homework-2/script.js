//Задание 1
class BasketItem {
  constructor(image, title, price) {
    this.image = image;
    this.title = title;
    this.price = price;
  }

  render(image = this.image, title = this.title, price = this.price) {
    return `<div class="basket-item"><img class="basket-img" src="${image}"><h3>${title}</h3><p>${price}</p><span class="amount-good"></span><button type="button" class="btn-delet"></button></button></div>`;
  }
}

//Задание 1
class BasketList {
  constructor() {
    this.basket = []; //в basket храним добавляемые в корзину товары
  }

  addGood() {
    //Будет добавлять товар в корзину по ИД или дата-атрибуту, когда нажали на кнопку "Добавить товар". Храним в массиве basket в виде объектов
  }

  render() {
    //Будет отрисовывать список добавленных товаров и стоимость заказа на страницу в div basket
  }

  calculateSum() {
    //Подсчет стоимости всех товаров в корзине
  }

  calculateGoods() {
    //Подсчет количества всех товаров в корзине, чтобы выводить на страницу в кружочек в корзине, span cart-goods
  }

  calculateGood() {
    //считаем сколько каждого товара в корзине, выводим в span amount-good
  }

  removeGood() {
    //полностью удаляем товар из корзины
  }
}

class GoodsItem {
  constructor(image, title, price) {
    this.image = image;
    this.title = title;
    this.price = price;
  }
  render(image = this.image, title = this.title, price = this.price) {
    return `<div class="goods-item"><img class="img" src="${image}"><h3>${title}</h3><p>${price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { image: './catalog-3.jpg', title: 'Shirt', price: 150 },
      { image: './catalog-3.jpg', title: 'Socks', price: 50 },
      { image: './catalog-3.jpg', title: 'Jacket', price: 350 },
      { image: './catalog-3.jpg', title: 'Shoes', price: 250 },
    ];
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.image, good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  //Задание 2
  calculateSum () {
    let sum = 0;
    this.goods.forEach((good) => {
      sum += good.price;
    });
    return sum;
  }
}

window.onload = () => {
  const list = new GoodsList();
  list.fetchGoods();
  list.render();
  list.calculateSum();
};