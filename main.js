//import HTML elements 
const summaryWindow = document.getElementById('side_container');
const cart = document.getElementById('cart');
const closeBtn = document.getElementById('close');
const overlay = document.getElementById("overlay");
const summaryTotal = document.getElementById("total");

//------------------------------------------------------------------------------------------------------------------------------
//consider this section as a dummy database that could be later fetched from a JSON file or an API instead - adding or changing is much easier than if hardcoded
const links = ['Home', 'Shop', 'About', 'Contact'];
//products must be sorted according to ids, else it wont work properly 
const products = [
                    {id: 1, name: 'Computer', description: 'la jajajsbe ejbdja', image: "./images/computer.jpeg", unitPrice: 1229.99, quantity: 0 }, 
                    {id: 2, name: 'Headphones', description: 'la jajajsbe ejbdja', image: './images/headphones.jpeg', unitPrice: 149.99, quantity: 0 }, 
                    {id: 3, name: 'Laptop', description: 'la jajajsbe ejbdja', image: './images/laptop.jpeg', unitPrice: 799.99, quantity: 0 }, 
                    {id: 4, name: 'Charger', description: 'la jajajsbe ejbdja', image: './images/charger.jpeg', unitPrice: 9.99, quantity: 0 }, 
                    {id: 5, name: 'Keyboard', description: 'la jajajsbe ejbdja', image: './images/keyboard.jpeg', unitPrice: 129.99, quantity: 0 }, 
                    {id: 6, name: 'Server', description: 'la jajajsbe ejbdja', image: './images/server.jpeg', unitPrice: 2999.99, quantity: 0 }, 
                    {id: 7, name: 'Mouse', description: 'la jajajsbe ejbdja', image: './images/mouse.jpeg', unitPrice: 49.99, quantity: 0 }, 
                    {id: 8, name: 'USB', description: 'la jajajsbe ejbdja', image: './images/usb.jpeg', unitPrice: 5.99, quantity: 0 }
                ];
//add more or less of these items to see how the page looks like when it it more/less populated 
//------------------------------------------------------------------------------------------------------------------------------

//toggle the summary function will change the visibility - the summary window will appear/disappear - if visible, click will hide it, if hidden,  click will set it to visible 
function toggleSummary(){
    summaryWindow.style.visibility == 'visible' ? summaryWindow.style.visibility = 'hidden' : summaryWindow.style.visibility = 'visible'
    overlay.style.visibility == 'visible' ? overlay.style.visibility = 'hidden' : overlay.style.visibility = 'visible';
    
}
//add the toggleSummary function so it is executed when user clicks on one of these three components - button Cart, button Close, outside of the summary component
closeBtn.addEventListener("click", toggleSummary);
cart.addEventListener("click", toggleSummary);
overlay.addEventListener("click", toggleSummary);

//--------------------------------------------------------------------------------------------------------------------------------------

//populate the HTML page with products from the dummy database so we don't have to hardcode values into HTML when we want to change content of the website
const navLinks = document.getElementById("nav_links");
links.forEach(link => {
    const linkTag = document.createElement("li");
    const linkNode = `<a href="https://picsum.photos/900" target="_blank">${link}</a>`; //the dummy links generate a random picture
    linkTag.innerHTML = linkNode;
    navLinks.appendChild(linkTag);    
})
const footerLinks = document.getElementById("footer_links");
links.forEach(link => {
    const linkTag = document.createElement("li");
    const linkNode = `<a href="https://picsum.photos/900" target="_blank">${link}</a>`; //the dummy links generate a random picture
    linkTag.innerHTML = linkNode;
    footerLinks.appendChild(linkTag);
})

//the same as with 
const productCards = document.getElementById("shop");
function loadProducts(){

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
                                            <div id="price_quantity_wrapper">
                                                <button class="add" id="${product.id}" onCLick=addToCart(${product.id})> 
                                                    <i class="fa-solid fa-cart-shopping"></i>
                                                    &nbsp;
                                                    Add to cart
                                                </button>
                                                <button class="trash" onClick=removeFromCart(${product.id})> xxx</button>
                                            </div>
                                        </div>
                                    </div>
                            `;
        productCardTag.innerHTML = divNode;
        productCards.appendChild(productCardTag);
    });
    }
    loadProducts();

//populate summary list with items from the inCart array
const summaryCards = document.getElementById("summary_items");

function loadSummary(){
    if(inCart.length < 1){
        summaryCards.innerHTML = 'Add items to the cart to continue to checkout ...';
    } else {
        summaryCards.innerHTML = "";

    inCart.forEach(item => {
        if(item.quantity > 0){
        const itemTag = document.createElement('ul');
        const divNode = `
                        <li class="cart_item">
                            <div class="item_quantity">
                                <button class="decrement" onCLick="changeQuantity(${item.id})">-</button>
                                <p>${item.quantity}</p>
                                <button class="increment" onCLick="changeQuantity(${item.id})">+</button>
                            </div>
                            <div class="item_info">
                                <p>${item.name}</p>
                                ${item.quantity <= 1 ? '' : `<p class="unit_price">€&nbsp;${item.unitPrice}&nbsp;/unit</p>` }
                                <p class="price">€&nbsp;${(item.unitPrice * item.quantity).toFixed(2)}</p>
                            </div> 
                        </li>                       
        `;
        itemTag.innerHTML = divNode;
        summaryCards.appendChild(itemTag);
        
}});}
};
cart.addEventListener("click", loadSummary);

//-----------------------------------------------------------------------------------------------------------------------------------------

const inCart = [];

function addToCart(id){
    const currentElement = products[id - 1];
    if(!inCart.includes(currentElement)) inCart.push(currentElement);
    currentElement.quantity += 1;
    //following lines of code dynamically update the HTML - reloads/rerenders the entire component that contains products so we always see the current updated data
    productCards.innerHTML = '';
    loadProducts();
    countTotal();
};

function removeFromCart(id){
    const currentElement = products[id - 1];
    console.log(currentElement)
    console.log(currentElement.quantity)
    currentElement.quantity = 0;
    if(currentElement.quantity == 0){
        const index = inCart.indexOf(currentElement);
        console.log(index)
        //the element has index of -1 if it is not in the inCart array
        if (index > -1) inCart.splice(index, 1); // 2nd parameter means remove one item only
    }
    productCards.innerHTML = '';
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
            //do not allow the quantity to go under 0
            return;
        };
        currentElement.quantity -= 1;
        if(currentElement.quantity == 0){
            const index = inCart.indexOf(currentElement);
            console.log(index)
            inCart.splice(index, 1); // 2nd parameter means remove one item only
        }
        //remove the element form the cart
        productCards.innerHTML = '';
        loadProducts();
        countTotal();
    }
    loadSummary();
}
//counts total and display at the open summary button and at the end of summary
function countTotal(){
    let total = 0;
    for(let i = 0; i < inCart.length; i++){
        total = total + (inCart[i].unitPrice * inCart[i].quantity);
    }
    cart.innerHTML = `€&nbsp;${total.toFixed(2)} &nbsp; <i class="fa-solid fa-cart-shopping"></i>`;
    summaryTotal.innerHTML = `€&nbsp;${total.toFixed(2)} &nbsp;`;
}