import { cart, removeFromCart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

function updateCheckoutCartQuantity(){
    document.querySelector('.js-return-to-home-link').innerText = cart.length+"  items";
}

updateCheckoutCartQuantity();

let cartSummaryHTML;
function updateCartSummary(){

    cartSummaryHTML='';
    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        let matchingProduct;

        products.forEach((product)=>{
        if( product.id === productId){
            matchingProduct = product;
        }
        });

        cartSummaryHTML +=
        `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity"  data-product-id="${matchingProduct.id}">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id ="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        `;
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    enableUpdateDeleteLinks();
}
updateCartSummary();


function enableUpdateDeleteLinks(){
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            removeFromCart(productId);
    
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
    
            container.remove();
            updateCheckoutCartQuantity();
        });
    });

    document.querySelectorAll('.js-update-quantity').forEach((link) =>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            document.querySelector(`.js-product-quantity-${productId}`).innerHTML
            =`
            <span>
            Quantity: <input class="quantity-input js-quantity-input js-quantity-input-${productId}" name="user-updated-quantity" data-product-id = "${productId}">
            </span>
            <span class="save-quantity-link link-primary js-save-quantity"  data-product-id="${productId}">
            Save
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" 
            data-product-id ="${productId}">
            Delete
            </span>  
            `
            updateFromCheckout();
        });
    });
}


function updateCheckout(productId){
    const updatedQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    addToCart(productId,updatedQuantity);
    updateCartSummary();
}


function updateFromCheckout(){

    document.querySelectorAll('.js-quantity-input').forEach((inputField) =>{
        inputField.addEventListener('keydown',(event)=>{
            if(event.key === 'Enter'){
                updateCheckout(inputField.dataset.productId);
            }
        });
    });

    document.querySelectorAll('.js-save-quantity').forEach((save)=>{
        save.addEventListener('click',()=>{
           updateCheckout(save.dataset.productId);
        });
    });
}


    