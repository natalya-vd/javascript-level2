export const API_URL = "http://localhost:3000";
export const MAX_GOODS_BASKET = 9;

Vue.component('basket', {
    data() {
      return {
        goodsBasket: [],
        basket: [],
        sumGoods: '',
      }
    },
    props: ['goods'],
  
    template: `
      <div v-if="goodsBasket.length !== 0" class="header__basket-inner">
        <div class="header__basket" v-for="item in basket">
          <div class="header__basket-item" itemid="456">
            <div class="header__basket-img"></div>
            <h3> {{item.product_name}} </h3>
            <p> {{item.price}} </p>
            <span class="header__amount-good"> {{sortingGood(item.id_product)}} </span>
            <button v-on:click="removeGood(item.id_product)" type="button" class="header__btn-delet">
                -
            </button>
          </div>
        </div>
        <div class="header__basket-total">
          <div class="header__basket-total-list">
            <div class="header__basket-title">Итого:</div>
            <div class="header__basket-sum"> {{calculateSum()}} </div>
          </div>
        </div>
      </div>
    `,
  
    methods: {
      /**
         * 
         * @param {MouseEvent} event Добавляем товар в корзину по itemid товара
         */
      async addGood(event) {
          for(let i = 0; i < this.goods.length; i++) {
            let idProduct = this.goods[i].id_product;
      
            if(idProduct === +event.path[2].attributes[0].value) {
              await this.addToCart(this.goods[i])
            };
          }
  
          await this.getToCart()
      },
  
      /**
       * Функция, которая отправляет товар на сервер в cart.json
       * @param {Obj} good Объект с данными товара
       */
      async addToCart(good) {
        const response = await fetch(`${API_URL}/addToCart`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(good)
        });
      },
  
      async getToCart() {
        const response = await fetch(`${API_URL}/cartData`);
          if (response.ok) {
            const catalogGoods = await response.json();
            
            this.goodsBasket = catalogGoods;
            this.basket = this.searchUniqueValues(this.goodsBasket);
            this.calculateGoods();
            
          } else {
            alert("Ошибка при соединении с сервером");
          }
      },
  
      /**
       * Поиск уникальных значений в исходном массиве
       * @param {Array} arrValues Исходный массив данных
       * @returns Возвращает массив из уникальных значений
       */
      // searchUniqueValues(arrValues) {
      //  return [...new Set(arrValues)];
      // },
  
      searchUniqueValues(arrValues) {
        const newArrValues = [];
  
        const unique = [...new Set(arrValues.map(item => item.id_product))];
  
        for(let j = 0; j < unique.length; j++) {
          for(let i = 0; i < arrValues.length; i++) {
            if(arrValues[i].id_product === unique[j]) {
              newArrValues.push(arrValues[i]);
              break
            }
            continue
          }
          continue
        }
  
        return newArrValues;
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
          this.sumGoods = `${MAX_GOODS_BASKET}+`;
        }
        else {
          this.sumGoods = this.goodsBasket.length;
        }
  
        this.$emit('amount-goods', this.sumGoods);
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
        return arr.length;
      },
  
      async removeToCart(good) {
        const response = await fetch(`${API_URL}/removeToCart`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(good)
        });
      },
  
      /**
       * Метод удаления товара из корзины
       * @param {Id} idGood Id удаляемого товара
       */
      async removeGood(idGood) {
        for(let i = this.goodsBasket.length - 1; i >= 0; i--) {
          if(this.goodsBasket[i].id_product === +idGood) {
            await this.removeToCart(this.goodsBasket[i]);
            break;
          };
        };
        
  
        await this.getToCart();
      }
    }
  });

  export default 'basket';