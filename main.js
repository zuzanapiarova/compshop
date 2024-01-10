//import HTML elements and assign them to variables to be used later - they are identified based on their id attribute in HTML tag
const summaryWindow = document.getElementById('side_container');
const cart = document.getElementById('cart');
const closeBtn = document.getElementById('close');
const overlay = document.getElementById("overlay");
const summaryTotal = document.getElementById("total");

//------------------------------------------------------------------------------------------------------------------------------
//consider this section as a dummy database that could be later fetched from a JSON file or an API instead - adding or changing is much easier than if hardcoded
//links fot the nav and footer
const links = ['Home', 'Shop', 'About', 'Contact'];
//products - will populate the main content of the page dynamically
//must be sorted according to ids, else it wont work properly 
//add more or less of product objects into the array to see how the page looks like when it it more/less populated 
const products = [
                    {id: 1, name: 'Computer', quantity: 0, unitPrice: 1229.99, image:"./images/computer.jpeg", description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}, 
                    {id: 2, name: 'Headphones', quantity: 0, image: './images/headphones.jpeg', unitPrice: 149.99, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}, 
                    {id: 3, name: 'Laptop', quantity: 0, image: './images/laptop.jpeg', unitPrice: 799.99,description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}, 
                    {id: 4, name: 'Charger', quantity: 0, image: './images/charger.jpeg', unitPrice: 9.99,description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}, 
                    {id: 5, name: 'Keyboard', quantity: 0, image: './images/keyboard.jpeg', unitPrice: 129.99,description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}, 
                    {id: 6, name: 'Server', quantity: 0, image: './images/server.jpeg', unitPrice: 2999.99,description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}, 
                    {id: 7, name: 'Mouse', quantity: 0, image: './images/mouse.jpeg', unitPrice: 49.99,description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}, 
                    {id: 8, name: 'USB', quantity: 0, image: './images/usb.jpeg', unitPrice: 5.99,description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, possimus?'}
                ];
let inCart = [];
//------------------------------------------------------------------------------------------------------------------------------

//toggle the summary function will show or hide the order summary element - change the visibility the summary window to appear/disappear - if visible, click will hide it, if hidden,  click will set it to visible 
function toggleSummary(){
    summaryWindow.style.visibility == 'visible' ? summaryWindow.style.visibility = 'hidden' : summaryWindow.style.visibility = 'visible'
    overlay.style.visibility == 'visible' ? overlay.style.visibility = 'hidden' : overlay.style.visibility = 'visible';
}
//assign the toggleSummary function to be executed when an event on the assigned component is fired - the components wait for the events(clicks) and when they happen the specified function is executed
//when user clicks on button Cart, button Close, and outside of the summary component, the toggle function will run and the summary component will appear/disappear as needed
closeBtn.addEventListener("click", toggleSummary);
cart.addEventListener("click", toggleSummary);
overlay.addEventListener("click", toggleSummary);

//--------------------------------------------------------------------------------------------------------------------------------------

//populate the HTML page with products from the dummy database so we don't have to hardcode values into HTML when we want to change content of the website
//populate the navigation with links
const navLinks = document.getElementById("nav_links"); //gets the HTML tag which will be populated by the links
links.forEach(link => {      //for each link from the link array, process it as described below
    const linkTag = document.createElement("li");     //first create a new <li>(list item) tag
    const linkNode = `<a href="https://picsum.photos/900" target="_blank">${link}</a>`; //generate the linkNode which will be used as inner HTML to fill the list item tag from above, the dummy <a> tags generate a random picture, target_blank will open the link oi a new window
    linkTag.innerHTML = linkNode;   //insert the node from anove as the innerHTML of the list item tag
    navLinks.appendChild(linkTag);   //append each newly created li element from above to the nav links element 
})
//populate the footer with links the same way we did for populating nav links
const footerLinks = document.getElementById("footer_links");
links.forEach(link => {
    const linkTag = document.createElement("li");
    const linkNode = `<a href="https://picsum.photos/900" target="_blank">${link}</a>`; //the dummy links generate a random picture
    linkTag.innerHTML = linkNode;
    footerLinks.appendChild(linkTag);
})

//populate the product page with products the same way as with links
const productCards = document.getElementById("shop");
function loadProducts(){
    products.forEach(product => {
        const productCardTag = document.createElement('div');
        productCardTag.classList.add("product_card_wrapper");
        //create a node for each product that will be dynamically updated for each product from the products array by using template literals notation - `${}`
        //the syntax is as a normal HTML element as the component will act as a html element based on the id of the product it will get its information
        //
        const divNode = `
                            <div class="product_card">
                                        <div class="img-wrapper">
                                            <img class="product_image" src="${product.image}">
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
                                            <div class="buttons_wrapper"">
                                                <button class="add" id="${product.id}" onCLick=addToCart(${product.id})> 
                                                    <i class="fa-solid fa-cart-shopping"></i>
                                                    &nbsp;
                                                    Add to cart
                                                </button>
                                                <button class="trash" onClick=removeFromCart(${product.id})><i class="fa-solid fa-trash-can"></i></button>
                                            </div>
                                        </div>
                                    </div>
                            `;
        //again as with populating the links, first set the inner HTML of the newly created div for product, and populate it with the node containing the HTML
        productCardTag.innerHTML = divNode;
        productCards.appendChild(productCardTag);
    });
    }
//run the loadProducts function once when the page is opened or refreshed
loadProducts();

//get the HTML element which will be populated with the elements that are added in the cart(are in the inCart array)
const summaryCards = document.getElementById("summary_items");
//function to populate the summary list in the summary component with items from the inCart array - so it only shows what is in cart and in correct quantity
function loadSummary(){
    //if there are no items in the inCart array, display a default message
    if(inCart.length < 1){
        summaryCards.innerHTML = 'Add items to the cart to continue to checkout ...';
    //if there are some elements in the inCart array, process them as further detailed:
    } else {
        //set the inner html of teh summary component back to nothing so we always start with the clean slate
        //if it was not done, each added element would create a new line even for the same product, and we want the products of the same type ot be displayed in one element together, just with updated quantity
        summaryCards.innerHTML = "";
        //and process each element in the inCart array just like with links and products
        inCart.forEach(item => {
            if(item.quantity > 0){
            const itemTag = document.createElement('div');
            itemTag.classList.add("summary_item_wrapper");
            //use template literals to dynamically populate the list, to get and display correct information for each product 
            const divNode = `
                            <li class="cart_item">
                                <div class="item_quantity">
                                    <div class="quantity_wrapper">
                                        <button class="decrement" onCLick="changeQuantity(${item.id})">-</button>
                                        <p>${item.quantity}</p>
                                        <button class="increment" onCLick="changeQuantity(${item.id})">+</button>
                                    </div>
                                    <p>${item.name}</p> 
                                </div>
                                <div class="item_info">
                                    ${item.quantity <= 1 ? '&nbsp;' : `<p class="unit_price">€&nbsp;${item.unitPrice}&nbsp;/unit</p>` }
                                    <p class="price">€&nbsp;${(item.unitPrice * item.quantity).toFixed(2)}</p>
                                </div> 
                            </li>                       
            `;
            itemTag.innerHTML = divNode;
            summaryCards.appendChild(itemTag);  
            };
        });
    };
};
//when the cart button is clicked, execute the loadSummary function to update the summary component with the new values
cart.addEventListener("click", loadSummary);

//-----------------------------------------------------------------------------------------------------------------------------------------

//function that will add a product from the products array to the inCart array, and if it is already there, it will increment the quantity of the product in both arrays by 1
//this function will be executed when a click event is fired on a add to cart button - parameter id will be passed to the function call from the id of the element that renders that button
function addToCart(id){
    //following line will find the element we work with in the products array and save it to a variable
    //that is why the products array must be sorted according to ids because the current element finds the element to work with based on the id imported and finds the position in the array by decrementing the index of the array by 1 
    const currentElement = products[id - 1];
    //if the product is not in cart push it there
    if(!inCart.includes(currentElement)) inCart.push(currentElement);
    //increment the quantity of the current element in the products array by one 
    currentElement.quantity += 1;
    //following lines of code dynamically update the HTML - reloads/rerenders the entire component that contains products so we always see the current updated data
    productCards.innerHTML = ''; //set the component that is populated with products to empty 
    loadProducts(); //populate it again by calling the loadProducts function
    countTotal(); //update the total of the cart
};

//function to remove the selected product from the cart - set the quantity of that product to 0 and remove it from teh inCart array
function removeFromCart(id){
    //again create a currentElement variable that will find the element we work with in the products array and save it to a variable
    const currentElement = products[id - 1];
    //set the quantity of that element to 0 
    currentElement.quantity = 0;
    //if the quantity of the element drops to 0, it will be removed from the inCart array and will not be rendered in the summary 
    if(currentElement.quantity == 0){
        const index = inCart.indexOf(currentElement);  //get the index that our current element has in the inCart array
        //the element has index of -1 if it is not in the inCart array 
        //if element has index > -1 it means it is in the inCart array and we will remove it from the cart by the splice method
        if (index > -1) inCart.splice(index, 1); // 2nd parameter(1) means remove one item only - only the one item we 
    };
    //again, the following lines will: set the content of the products component to 0, populate the products page again, and update the total again
    productCards.innerHTML = '';
    loadProducts();
    loadSummary();
    countTotal();
};

//controls the +/- buttons that change quantity of each product - will be fired on clicking the - or + buttons and change the value accordingly  
function changeQuantity(id){
    //again set the current element to the concrete product on which the button was clicked
    const currentElement = products[id - 1];
    //if the + button is clicked, use the add to cart button which will increment the quantity by 1
    if(event.target.className == 'increment'){
        //call the add to cart function with the respective id as a parameter
        addToCart(id); 
    } else if(event.target.className == 'decrement'){ //execute following code if the - button is clicked 
        if(currentElement.quantity == 0) return;    //do not allow the quantity to go under 0  
        currentElement.quantity -= 1; //decrement the quantity of the product in the products array by 1
        if(currentElement.quantity == 0){ //if the quantity drops to 0, execute the following code, just like with the remove from cart function
            removeFromCart(id); //remove the product from cart by adding its id to the parameter of the remove from cart function
        }        
    }
    //again update the summary page and the total
    productCards.innerHTML = '';
    loadSummary();
    loadProducts();
    countTotal();
}

//counts total and display at the open summary button and at the end of summary
function countTotal(){
    //set the total to 0 with every update of teh cart, so the new total is not added to the old total
    let total = 0;
    //iterate over every element in the inCart array, add the price for unit multiplied by quantity to the total to create a new total
    for(let i = 0; i < inCart.length; i++){
        total = total + (inCart[i].unitPrice * inCart[i].quantity);
    }
    //update the cart button to show the current total
    cart.innerHTML = `€&nbsp;${total.toFixed(2)} &nbsp; <i class="fa-solid fa-cart-shopping"></i>`;
    //update the total header in the summary component to show the current total
    summaryTotal.innerHTML = `€&nbsp;${total.toFixed(2)}`;
}

//get the html button in summary component and assign it to a variable clearCartBtn 
const clearCartBtn = document.getElementById("clear_cart");
//function that removes all products from the inCart array and rerenders the summary component to empty 
function clearCart(){
    if(window.confirm('Are you sure you want to empty your cart?')){ //alert the user they are about to remove the contents of the cart, and if they confirm, continue:
        inCart = []; //delete contents of the inCart array
        loadProducts();
        loadSummary(); //load the summary component again - it will update to be empty as the inCart component is now empty
        countTotal(); //update the total price to 0 as there is nothing in the cart
    };
}
//button to remove the contents of the cart - when clicked, execute the clearCartBtn function 
clearCartBtn.addEventListener("click", clearCart)