/*
* Реализация добавления, удаления товаров в корзину (пользовался youtube + книгой
* "JS для новичков" Владимир дронов + дополнительные материалы от GB.)*
*/
/*
* Объявим все конопки добавления в корзину.
*/
const productBtn = document.querySelectorAll('.addToCart');
/*
* Объявим иконку корзины.
*/
const cart = document.querySelector('.cartIconWrap');
/*
* Объявим индиктор товаров над корзиной.
*/
const cartWrap = document.querySelector('.cartIconWrap span');
/*
* Объявим финальную цену всех товаров корзине.
*/
const fullprice = document.querySelector('.fullprice');
/*
* Число после пересчётов.
*/
let price = 0;
/*
* Cумма товаров в корзине.
*/
const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};
/*
* Вычитание товаров в корзине.
*/
const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};
/*
* Сумма всех товаров в корзине.
*/
const printFullPrice = () => {
    fullprice.textContent = `$${price}`;
};
/*
* Добавление колличества товаров в корзине в иконку корзины.
*/
const printQuantity = () => {
    let length = document.querySelector('.cart-content_list').children.length;
    cartWrap.textContent = length;
    length > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};
/**
 * Предаём все данные товара и передаём разметку. 
*/
const generateCartProduct = (img, title, price, id,) => {
    return `

    <li class="cart-content_item">
        <article class="cart-content_product cart-product" data-id = "${id}">
            <img width="75px" height="80px" src="${img}" alt="Товар" class="cart-product_img">
                <div class="cart-product_text">
                    <h3 class="cart-product_title">${title}</h3>
                    <span class="cart-product_price">$${price}</span>
                </div>
            <button class="cart-product_delete" aria-label="Удалить товар"></button>
        </article>
    </li>        
    `;
/*
* Функция удаления из корзины товара.
* 1) Найдём цену товара в корзине, удалим $ и прообразуем в число для вычитания.
* 2) Вызовем функции описанные выше.
* 3) Перезапишем колличество товаров в корзине после вычитания.
* 4) Вызовем функции описанные выше.
*/
}
const deleteProducts = (productParent) => {
    let currentPrice = document.querySelector('.cart-product_price').textContent;
    currentPrice = currentPrice.slice(1);
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();
    printQuantity();
};
/**
 * Обработчик события "Скрытие корзины с продуктами". 
*/
cart.addEventListener('click', () => {
    const hidEL = document.querySelector('.cart-content');
    hidEL.classList.toggle('hidden');
});
/**
 * Найдём все дата атрибуты и передадим их в функцию с разметкой. 
*/
productBtn.forEach(el => {
    el.addEventListener('click', ({target}) => {
        let self = target;
        let parent = self.closest('.featuredItem');
        let id = parent.dataset.id;
        let title = parent.dataset.name;
        let price = parent.dataset.price;
        let priceNumber = +price;
        let img = parent.querySelector('.featuredImgWrap img').getAttribute('src');
        plusFullPrice(priceNumber);
        printFullPrice();
        document.querySelector('.cart-content_list')
            .insertAdjacentHTML('afterbegin', generateCartProduct(img, title, price, id));
        printQuantity();
    });
});
/**
 * Обработчик события "Удаление из корзины с продуктами". 
*/
document.querySelector('.cart-content_list').addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-product_delete')) {
        deleteProducts(e.target.closest('.cart-content_item'));
    }
});

