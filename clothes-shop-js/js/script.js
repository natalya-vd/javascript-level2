//Вопрос 2: Не поняла про "Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины". Сделал через условие v-if="goodsBasket.length !== 0", чтобы не показывало корзину когда нет товаров в корзине, при наведении мышкой

//Вопрос2: Как найти элемент в event.path без использования индекса массива, например по классу селектора? (строка 54 я ищу itemid вот так event.path[2].attributes[0].value)

const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const MAX_GOODS_BASKET = 9;

const app = new Vue({

    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        goodsBasket: [],
        basket: [],
    },

    methods: {
      /**
       * Запрос товара с сервера
       */
      async getProducts() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {
          const catalogItems = await responce.json();
          this.goods = catalogItems;
          this.filteredGoods = catalogItems;
        } else {
          alert("Ошибка при соединении с сервером");
        }
      },

      /**
       * Функция, которая отвечает за поиск товара по странице
       */
      filterGoods () {
        this.filteredGoods = []
        this.goods.forEach(good => {
          if(good.product_name.toUpperCase().indexOf(this.searchLine.toUpperCase()) !== -1) {
            this.filteredGoods.push(good);
          }
        })
      },

      /**
       * 
       * @param {MouseEvent} event Добавляем товар в корзину по itemid товара
       */
      addGood(event) {
        for(let i = 0; i < this.goods.length; i++) {
          let idProduct = this.goods[i].id_product;
    
          if(idProduct === +event.path[2].attributes[0].value) {
            this.goodsBasket.push(this.goods[i]);
          };
        }

        this.basket = this.searchUniqueValues(this.goodsBasket);
      },

      /**
       * Поиск уникальных значений в исходном массиве
       * @param {Array} arrValues Исходный массив данных
       * @returns Возвращает массив из уникальных значений
       */
      searchUniqueValues(arrValues) {
        return [...new Set(arrValues)];
      },

      /**
       * Метод, который считает сумму товаров в корзине
       * @returns {Number}
       */
      calculateSum() {
        let sum = 0;
        this.goodsBasket.forEach((good) => {
          sum += good.price;
        });
        return sum;
      },

      /**
       * Подсчет количества всех товаров в корзине, чтобы выводить на страницу в span cart-goods
       * @returns Количество товара в корзине
       */
      calculateGoods() {
        if(this.goodsBasket.length > MAX_GOODS_BASKET) {
          return `${MAX_GOODS_BASKET}+`;
        }
        else {
          return this.goodsBasket.length;
        }
      },

      /**
       * Функция, которая считает количество каждого товара в корзине
       * @param {ID} id 
       * @returns Возвращает длину массива
       */
      sortingGood(id) {
        let arr = [];
        this.goodsBasket.forEach((item) => {
          if(item.id_product === +id) {
            arr.push(item);
          };
        });
        return arr.length
      },
  
      /**
       * Метод удаления товара из корзины
       * @param {Id} idGood Id удаляемого товара
       */
      removeGood(idGood) {
        for(let i = this.goodsBasket.length - 1; i >= 0; i--) {
          if(this.goodsBasket[i].id_product === +idGood) {
            this.goodsBasket.splice([i], 1);
            break;
          };
        };
        this.basket = this.searchUniqueValues(this.goodsBasket);
      }
    },

    async mounted() {
      await this.getProducts();
    }
});