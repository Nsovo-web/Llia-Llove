//show Cart

(function(){
const cartinfo = document.getElementById('cart-info');
const  cart = document.getElementById('cart');

cartinfo.addEventListener('click',function(){
    cart.classList.toggle('show-cart')
});

})();

//addd items to the cart

(function(){


    const cartBtn =document.querySelectorAll('.store-item'); //there is more than one item

    cartBtn.forEach(function(btn){
        btn.addEventListener('click',function(event){

           // console.log(event.target);
           //get the image
           let fullpath = event.target.parentElement.parentElement.parentElement.parentElement.children[0].src;
           let pos = fullpath.indexOf("webpictures") + 11;
             
           let partpath = fullpath.slice(pos);

           //setup cart object

           const item = {};
          // item.img = `mag-cart${partpath}`;
          item.img = `${fullpath}`;

          item.name = event.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].innerText;

          item.price = event.target.parentElement.children[1].children[0].innerHTML;


           console.log(item);

           //define mutable cartItem
           const cartItem = document.createElement('div');

           cartItem.classList.add('cart-item','d-flex' ,'justify-content-between');

      cartItem.innerHTML =     `
               <img src="${item.img}" class="img-fluid" alt="">
               <div class="item-text">
                  <p id="cart-item-title">${item.name}</p>
                  <span>R</span>
                  <span id="cart-item-price" class="cart-item-price">${item.price}</span>

               </div>
               
               <a href="#" id="cart-item-remove" class="cart-item-remove shake">
                 <i class="fas fa-trash"></i>
               </a>
            
          `;

          //select cart
          const cart = document.getElementById('cart');
          const total = document.querySelector('.cart-total-container');

          cart.insertBefore(cartItem,total);
          alert('item added to cart')

         showTotals();
         
         
        clearcart();
        });
        
    });


   function clearcart(){
        //clear the cart
    const clearBtn =document.getElementById('clear-cart'); //get remove icon
    var totalMoney = 0;
  
    clearBtn.addEventListener('click',function(){
        var elems = document.querySelectorAll('.cart-item') ; //get item to remove
        
        elems.forEach(function(el){
            el.parentNode.removeChild(el);  

        })

        document.getElementById('cart-total').textContent = totalMoney.toFixed(2) ;
        document.querySelector('.item-total').textContent = totalMoney.toFixed(2);
        document.getElementById('item-count').textContent = 0;
    })
   }
    
    //show Totals
    function showTotals(){
        
        const total = [];  //array
        const prices = document.querySelectorAll('.cart-item-price');


        prices.forEach(function(price){
            total.push(parseFloat(price.innerHTML));
        })

        const totalMoney = total.reduce(function(total,item){ //adding up all the items in the array
            total += item;
            return total;      
        },0)

        const finalMoney =totalMoney.toFixed(2);
        var itemnumbers = total.length
        
        document.getElementById('cart-total').textContent = finalMoney ;
        document.querySelector('.item-total').textContent = finalMoney;
        document.getElementById('item-count').textContent = itemnumbers;

        const deleteBtns =document.querySelectorAll('.cart-item-remove'); //get remove icon
       deleteBtns.forEach(function(deleteBtn){
        deleteBtn.addEventListener('click',function(event){

           
            var elem =  event.target.parentElement.parentElement; //get item to remove
            elem.parentNode.removeChild(elem);               //remove item from children nodes
           let priceRemove = event.target.parentElement.previousElementSibling.children[2].innerText;
           //remove that price from array
           const index = total.indexOf(priceRemove);
       
           delete total[index]
           
           var currentitems = document.getElementById('item-count').textContent;
           let itemsrem = currentitems -1;
           document.getElementById('item-count').textContent = itemsrem;
          
          var totalprice = document.getElementById('cart-total').textContent;
          let priceRem = parseFloat(totalprice) - priceRemove;
          document.getElementById('cart-total').textContent = priceRem.toFixed(2);
          document.querySelector('.item-total').textContent = priceRem.toFixed(2);
           
           })

       })

    
    }

    //there is more than one item
    

    
   

})();