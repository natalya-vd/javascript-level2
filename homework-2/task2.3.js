//Решение задачи 3

const burger = [
    {size: 'маленький', price: 50, calory: 20},
    {size: 'большой', price: 100, calory: 40},
];

const stuffing = [
    {title: 'сыр', price: 10, calory: 20},
    {title: 'салат', price: 20, calory: 5},
    {title: 'картофель', price: 15, calory: 10},
];

const topping = [
    {title: 'приправа', price: 15, calory: 0},
    {title: 'майонез', price: 20, calory: 5},
];

class Hamburger {
    constructor(burger, stuffing) { 
        this.burger = burger;
        this.stuffing = [stuffing];
    }

    addTopping(topping) {    // Добавить топпинг 
        this.topping = []
        this.topping.push(topping);
    }

    removeTopping(topping) { // Убрать топпинг 
        this.topping.splice(this.topping.indexOf(topping), 1);
    }

    addStuffing(stuffing) {    // Добавить добавку
        //this.stuffing = [] 
        this.stuffing.push(stuffing);
    }

    removeStuffing(stuffing) { // Убрать добавку 
        this.stuffing.splice(this.stuffing.indexOf(stuffing), 1);
    }

    getToppings() {   // Получить список топингов  (????)
        return this.topping;
    }

    getBurger() {              // Узнать размер гамбургера (????)
        return this.burger;
    }

    getStuffing() {          // Узнать добавку гамбургера (????)
        return this.stuffing;
    }

    calculatePrice() {       // Узнать цену 
        let price = 0;
        price += this.burger.price;
        this.stuffing.forEach((stuffing) => {
            price += stuffing.price;
        });
        this.topping.forEach((topping) => {
            price += topping.price;
        });
        return price;
    }

    calculateCalories() {    // Узнать калорийность 
        let calory = 0;
        calory += this.burger.calory;
        this.stuffing.forEach((stuffing) => {
            calory += stuffing.calory;
        });
        this.topping.forEach((topping) => {
            calory += topping.calory;
        });
        return calory;
    }
};

//Пример использования
function init() {
    const burger1 = new Hamburger(burger[0], stuffing[0]);

    burger1.addTopping(topping[1]);
    burger1.addStuffing(stuffing[2])

    const price = burger1.calculatePrice();

    const calory = burger1.calculateCalories();
    console.log(price);
    console.log(calory);
}

window.addEventListener('load', init);