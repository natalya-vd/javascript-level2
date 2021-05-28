const goods = [
    { image: './catalog-3.jpg', title: 'Shirt', price: 150 },
    { image: './catalog-3.jpg', title: 'Socks', price: 50 },
    { image: './catalog-3.jpg', title: 'Jacket', price: 350 },
    { image: './catalog-3.jpg', title: 'Shoes', price: 250 },
  ];
  
  //Записала значения по умолчанию для функции (к заданию 2)
  const renderGoodsItem = (image = goods[0].image, title = goods[0].title, price = goods[0].price) => {
    return `<div class="goods-item"><img class="img" src="${image}"><h3>${title}</h3><p>${price}</p></div>`
  };
  
  const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.image, item.title, item.price)).join('');
  
    document.querySelector('.goods-list').innerHTML = goodsList;
  };
  
  // Записала функцию init в window.onload (к заданию 2, упростить функцию)
  window.onload = () => {
    renderGoodsList(goods)
  };

  /*Задание 3
  После каждого div стоит запятая, т.к. метод map вызывает переданную функцию renderGoodsItem для каждого элемента item, в порядке их появления и создает новый массив из результатов её вызова. Элементы в массиве у нас записываются через запятую, эта запятая как раз и отображается на странице.
  Можно с помощью метода .join склеить элементы массива в строку (см. стр. 14) и в стр. 16 передавать уже не массив, а строку goodsList.
  */