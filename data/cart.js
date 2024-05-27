export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantitySelected){
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if(productId ===cartItem.productId){
        matchingItem=cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity =quantitySelected;
    }
    else{
      if(cart.length==0){
        cart.push(
          {
          productId : productId,
          quantity : quantitySelected,
          deliveryOptionId : '1'
          }
        );
      }
      else{
        cart.push(
          {
          productId : productId,
          quantity : quantitySelected,
          deliveryOptionId : '2'
          }
        );
      }
    }
    saveToStorage();
  }

  export function removeFromCart(productId){
    const newCart =[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId != productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
  }

  export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if(productId ===cartItem.productId){
        matchingItem=cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
  }