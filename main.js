const summaryWindow = document.getElementById('side_container');
const cart = document.getElementById('cart');
const closeBtn = document.getElementById('close');
const overlay = document.getElementById("overlay");



/*------------------------------------------------------------------------------------------------------------------------------*/
//consider this section as a dummy database that could be later fetched from a JSON file or an API
//I did it this way instead of hardcoding so I would have all elements together so adding or changing is much easier 
const links = ['Home', 'Shop', 'About', 'Contact'];
const products = [
                    {id: 1, name: 'Computer', description: 'la jajajsbe ejbdja', image: '', unitPrice: 1229.99, quantity: 0 }, 
                    {id: 2, name: 'Headphones', description: 'la jajajsbe ejbdja', image: '', unitPrice: 149.99, quantity: 0 }, 
                    {id: 3, name: 'Laptop', description: 'la jajajsbe ejbdja', image: '', unitPrice: 799.99, quantity: 0 }, 
                    {id: 4, name: 'Charger', description: 'la jajajsbe ejbdja', image: '', unitPrice: 9.99, quantity: 0 }, 
                    {id: 5, name: 'Keyboard', description: 'la jajajsbe ejbdja', image: '', unitPrice: 129.99, quantity: 0 }, 
                    {id: 6, name: 'Phone', description: 'la jajajsbe ejbdja', image: '', unitPrice: 999.99, quantity: 0 }, 
                    {id: 7, name: 'Mouse', description: 'la jajajsbe ejbdja', image: '', unitPrice: 49.99, quantity: 0 }, 
                    {id: 8, name: 'USB', description: 'la jajajsbe ejbdja', image: '', unitPrice: 5.99, quantity: 0 }
                ];
//add more or less of these items to see how the page looks like when it it more/less populated 
/*------------------------------------------------------------------------------------------------------------------------------*/

//toggle the summary component by clicking on the cart/close button
function toggleSummary(){
    summaryWindow.style.visibility == 'visible' ? summaryWindow.style.visibility = 'hidden' : summaryWindow.style.visibility = 'visible'
    overlay.style.visibility == 'visible' ? overlay.style.visibility = 'hidden' : overlay.style.visibility = 'visible'
}
closeBtn.addEventListener("click", toggleSummary);
cart.addEventListener("click", toggleSummary);

//populate the HTML page with products from the "database" so we don't have to hardcode values into HTML when we want to change content of the website
//here the products are only in JavaScript as objects but they could be imported from a .json file or requested from an APIs 
const navLinks = document.getElementById("nav_links");
links.forEach(link => {
    const linkTag = document.createElement("li");
    const linkNode = `<a href="https://picsum.photos/900" target="_blank">${link}</a>`;
    linkTag.innerHTML = linkNode;
    navLinks.appendChild(linkTag);    
})
const footerLinks = document.getElementById("footer_links");
links.forEach(link => {
    const linkTag = document.createElement("li");
    const linkNode = `<a href="https://picsum.photos/900" target="_blank">${link}</a>`;
    linkTag.innerHTML = linkNode;
    footerLinks.appendChild(linkTag);
})

//the same as with 
function loadProducts(){
const productCards = document.getElementById("shop");
products.forEach(product => {

    const productCardTag = document.createElement('div');
    const divNode = `
                        <div class="product_card">
                                    <div class="img-wrapper">
                                    </div>
                                    <div class="product_info_container">
                                        <div class="description_container">
                                            <div class="info_wrapper">
                                                <h2>${product.name}</h2>
                                                <p>${product.description}</p>
                                            </div>            
                                            <div class="price_quantity_wrapper">
                                                ${product.quantity <= 1 ? '' : `<p class="unit_price">€&nbsp;${product.unitPrice}&nbsp;/unit</p>` }
                                                <h2 class="price">€&nbsp;${product.quantity == 0 ? product.unitPrice : (product.unitPrice*product.quantity).toFixed(2)}</h2>
                                                <div class="quantity">
                                                    <button class="decrement" onCLick="changeQuantity(${product.id})">-</i></button>
                                                    <p>${product.quantity}</p>
                                                    <button class="increment" onCLick="changeQuantity(${product.id})">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="add" id="${product.id}" onCLick=addToCart(${product.id})> 
                                            <i class="fa-solid fa-cart-shopping"></i>
                                            &nbsp;
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                        `;
    productCardTag.innerHTML = divNode;
    productCards.appendChild(productCardTag);
});
}
loadProducts();

const inCart = [];

function addToCart(id){
    const currentElement = products[id - 1];
    if(!inCart.includes(currentElement)){
        inCart.push(currentElement);
    }
    currentElement.quantity += 1;
    //following lines of code dynamically update the HTML - reloads/rerenders the entire component that contains products
    shop.innerHTML = '';
    loadProducts();
    countTotal();
};

//controls the +/- buttons that change quantity of each product
function changeQuantity(id){
    const currentElement = products[id - 1];
    if(event.target.className == 'increment'){
        addToCart(id);
    } else if(event.target.className == 'decrement'){
        if(currentElement.quantity == 0) {
            console.log(currentElement)

             //do not allow the quantity to go under 0
            return;
        };
        currentElement.quantity -= 1;
        shop.innerHTML = '';
        loadProducts();
        countTotal();
    }
    console.log(inCart)
}

//counts total and display at the open summary button and at the end of summary

function countTotal(){
    let total = 0;
    for(let i = 0; i < products.length; i++){
        total = total + (products[i].unitPrice * products[i].quantity);
    }
    cart.innerHTML = `€&nbsp;${total.toFixed(2)} &nbsp; <i class="fa-solid fa-cart-shopping"></i>`;
}

//populate summary list with items from the inCart array
const summaryCards = document.getElementById("summary_items");
function loadSummary(){
    summaryCards.innerHTML = '';
    inCart.forEach(item => {
        if(item.quantity >0){
        const itemTag = document.createElement('div');
        const divNode = `
                        <div class="cart_item">
                            <div class="item_quantity">
                                <button class="increment">-</button>
                                <p>${item.quantity}</p>
                                <button class="decrement">+</button>
                            </div>
                            <div class="item_info">
                                <p>${item.name}</p>
                                ${item.quantity <= 1 ? '' : `<p class="unit_price">€&nbsp;${item.unitPrice}&nbsp;/unit</p>` }
                                <p class="price">€&nbsp;${item.unitPrice * item.quantity}</p>
                            </div> 
                        </div>                       
        `;
        itemTag.innerHTML = divNode;
        summaryCards.appendChild(itemTag);
}});
}

cart.addEventListener("click", loadSummary)


//vypni scrollovanie ked je zapnuty side container
//onclick na cart button --> scroll to top

