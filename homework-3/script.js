//Вопрос1: Когда начала навешивать событие "клик" на кнопку удаления товара из корзины столкнулась с тем, что в методе, который запускается после нажатия кнопки, this начал указывать на саму кнопку, а не на класс "BasketList" (например, не работает this.basket), пробовала применить bind, но он не помог. Тогда сделала функцию, которая запускается при клике в виде стрелочной функции (строка 96). Может можно было как-то по-другому сделать? 
//Вопрос 2: Вынесла получение данных с сервера в отдельный объект (строка 8). Правильно это или нужно было оставить в классе "GoodsList"?

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const MAX_GOODS_BASKET = 9;

/**
 * Объект, в котором хранятся товары с сервера. Вынесла в отдельный объект чтобы не обращаться к серверу при добавлении товара в корзину. По-другому не придумала как мне брать информацию о товарах при добавлении их в корзину. Была правда идея брать информацию  о товарах со страницы, но она мне показалась не очень...
 */
const goods = {
  products: [],

  /**
   * Запрос товара с сервера
   */
  async fetchGoods() {
    const responce = await fetch(`${API_URL}/catalogData.json`);

    if(responce.ok) {
      const catalogItems = await responce.json();
      this.products = catalogItems;
    }
    else {
      alert('Ошибка при соединении с сервером');
    };
  }
};

/**
 * Класс элемента корзины
 */
class BasketItem {
  constructor(title, price, id, dataSeedButton) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.dataSeedButton = dataSeedButton;
  }

  /**
   * 
   * @returns Див товара для добавления в корзину
   */
  render() {
    return `<div class="basket-item" itemId="${this.id}"><div class="basket-img"></div><h3>${this.title}</h3><p>${this.price}</p><span class="amount-good"></span><button type="button" class="btn-delet">-</button></div>`;
  }
}

/**
 * Класс корзины
 */
class BasketList {
  /**
   * В basket храним добавляемые в корзину товары
   */
  constructor() {
    this.basket = [];
  }

  /**
   * 
   * @param {MouseEvent} event Добавляем товар в корзину по дата-атрибуту кнопки
   */
  addGood(event) {
    const currentDataSeed = event.target.dataset.seed;

    for(let i = 0; i < goods.products.length; i++) {
      let dataSeed = goods.products[i].dataSeedButton;

      if(dataSeed === currentDataSeed) {
        this.basket.push(goods.products[i]);
      };
    }
    
    this.render();
  }

  /**
   * Отрисовывает список добавленных товаров и стоимость заказа на страницу
   */
  render() {
    let listHtml = '';
    const newGoodItem = this.searchUniqueValues(this.basket);
    newGoodItem.forEach((good) => {
      const goodItem = new BasketItem(
        good.product_name, 
        good.price,
        good.id_product,
        good.dataSeedButton
      )
      listHtml += goodItem.render();
    });
    
    document.querySelector('.basket').innerHTML = listHtml;
    
    clickButton((event) => {
      const idGood = event.target.parentElement.attributes[1].value
      this.removeGood(idGood)
    }, 'btn-delet')
    
    const basketItems = document.querySelectorAll('.basket-item');
    basketItems.forEach((item) => {
      const quantityProduct = this.sortingGood(item.attributes[1].value)
      item.querySelector('.amount-good').innerHTML = quantityProduct.length;
    })

    document.querySelector('.basket-sum').innerHTML = this.calculateSum();

    document.querySelector('.cart-goods').innerHTML = this.calculateGoods();
  }

  /**
   * Поиск уникальных значений в исходном массиве
   * @param {Array} arrValues Исходный массив данных
   * @returns Возвращает массив из уникальных значений
   */
  searchUniqueValues(arrValues) {
    return [...new Set(arrValues)];
  }

  /**
   * Метод, который считает сумму товаров в корзине
   * @returns {Number}
   */
  calculateSum() {
    let sum = 0;
    this.basket.forEach((good) => {
      sum += good.price;
    });
    return sum;
  }

  /**
   * Подсчет количества всех товаров в корзине, чтобы выводить на страницу в span cart-goods
   * @returns Количество товара в корзине
   */
  calculateGoods() {
    if(this.basket.length > MAX_GOODS_BASKET) {
      return `${MAX_GOODS_BASKET}+`;
    }
    else {
      return this.basket.length;
    }
  }

  /**
   * Сортируем одинаковые товары в корзине
   * @param {ID} id 
   * @returns Возвращает массив одинаковых товаров
   */
    sortingGood(id) {
    let arr = [];
    this.basket.forEach((item) => {
      if(item.id_product === +id) {
        arr.push(item);
      };
    });
    return arr
  }

  /**
   * Метод удаления товара из корзины
   * @param {Id} idGood Id удаляемого товара
   */
  removeGood(idGood) {
    //В цикле иду в обратном порядке чтобы при удалении товара из корзине не влияло то, в каком порядке добавлялся изначально товар в корзину и первые элементы удалялись последними
    for(let i = this.basket.length - 1; i >= 0; i--) {
      if(this.basket[i].id_product === +idGood) {
        this.basket.splice([i], 1);
        break;
      };
    };

    this.render();
  }
}

/**
 * Класс одного товара
 */
class GoodsItem {
  constructor(title, price, id, dataSeedButton) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.dataSeedButton = dataSeedButton;
  }

  /**
   * Рендеринг товара на страницу
   * @returns Див с тегами товара
   */
  render() {
    return `<div class="goods-item" itemId="${this.id}"><div class="img"></div><h3>${this.title}</h3><p>${this.price}</p><button type="button" class="goods-button" data-seed="${this.dataSeedButton}">Купить</button></div>`;
  }

  /**
   * Метод, который создает дата-атрибуты для кнопок
   * @param {Number} length Длина массива
   */
  getButtonDataSeed(length) {
    for(let i = 1; i <= length; i++) {
      this.dataSeedButton = `seed-${i}`;
    }
  }
}

/**
 * Класс списка товаров на странице
 */
class GoodsList {
  /**
   * Храним товары для отображения на странице
   */
  constructor() {
    this.goods = [];
  }

  /**
   * Получение товаров из объекта goods
   */
  async getGoods() {
    await goods.fetchGoods()
    this.goods = goods.products;
    
  }

  /**
   * Рендеринг товаров на страницу
   */
  render() {
    let listHtml = '';
    this.goods.forEach((good, i) => {
      const goodItem = new GoodsItem(
        good.product_name, 
        good.price,
        good.id_product,
      );

      goodItem.getButtonDataSeed(i + 1);
      good.dataSeedButton = goodItem.dataSeedButton;

      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  /**
   * 
   * @returns Стоимость всех товаров, пришедших с сервера
   */
  calculateSum () {
    let sum = 0;
    this.goods.forEach((good) => {
      sum += good.price;
    });
    return sum;
  }
}

/**
 * Функция, которая навешивает событие "клик" на кнопки
 * @param {function} func Функция, которая вызывается при клике
 * @param {class name} classButtons Класс кнопки
 */
function clickButton(func, classButtons) {
  const buttons = document.getElementsByClassName(classButtons);
    
    for(let btn of buttons) {
      btn.addEventListener('click', func);
    }
}

window.onload = async () => {
  const list = new GoodsList();
  await list.getGoods();
  list.render();
  list.calculateSum();

  const basket = new BasketList();
  clickButton(basket.addGood.bind(basket), 'goods-button');
};