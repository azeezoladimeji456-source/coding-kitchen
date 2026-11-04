let cart = [];
let total = 0;

let cartBox = document.querySelector(".cart-box");
let cartItems = document.querySelector(".cart-items");
let cartTotal = document.querySelector(".cart-total");
let counts = document.querySelectorAll(".count");

// open cart when you click cart icon
document.querySelectorAll(".cart-btn").forEach(function(btn){
  btn.addEventListener("click", function(e){
    e.preventDefault();
    cartBox.classList.add("open");
  });
});

// close cart
let closeCart = document.querySelector(".close-cart");
if(closeCart){
  closeCart.addEventListener("click", function(){
    cartBox.classList.remove("open");
  });
}

// hamburger menu
let ham = document.querySelector(".hamburger");
let mob = document.querySelector(".mobile");
if(ham && mob){
  ham.addEventListener("click", function(){
    mob.classList.toggle("show");
    if(mob.classList.contains("show")){
      ham.innerHTML = "✕";
    }else{
      ham.innerHTML = "☰";
    }
  });
}

// add to cart - FIXED, cart no longer opens full screen
document.querySelectorAll(".add").forEach(function(btn){
  btn.addEventListener("click", function(){
    let box = btn.closest(".food");
    let name = box.querySelector("h3").innerText;
    let priceText = box.querySelector("b").innerText;
    let price = parseInt(priceText.replace(/[^0-9]/g, ""));

    cart.push({name:name, price:price});
    total = total + price;
    updateCart();

    // small feedback only
    btn.innerHTML = "Added ✓";
    let oldBg = btn.style.background;
    btn.style.background = "#27ae60";
    
    setTimeout(function(){
      btn.innerHTML = "Add to Cart";
      btn.style.background = oldBg;
    }, 1000);
  });
});

function updateCart(){
  cartItems.innerHTML = "";
  
  for(let i = 0; i < cart.length; i++){
    let item = cart[i];
    let div = document.createElement("div");
    div.style.padding = "10px 0";
    div.style.borderBottom = "1px solid #eee";
    div.innerHTML = "<p style='margin:0;font-weight:600;'>"+item.name+"</p><small>₦"+item.price+"</small>";
    cartItems.appendChild(div);
  }

  cartTotal.innerHTML = "Total: ₦" + total;
  
  for(let j = 0; j < counts.length; j++){
    counts[j].innerHTML = cart.length;
  }
}

// send order to whatsapp
let waBtn = document.getElementById("sendWa");
if(waBtn){
  waBtn.addEventListener("click", function(){
    if(cart.length == 0){
      alert("Cart empty! Add something first");
      return;
    }

    let counted = {};
    for(let k = 0; k < cart.length; k++){
      let it = cart[k];
      if(counted[it.name]){
        counted[it.name].qty = counted[it.name].qty + 1;
        counted[it.name].total = counted[it.name].total + it.price;
      }else{
        counted[it.name] = {qty:1, total:it.price};
      }
    }

    let msg = "NEW ORDER - Coding kitchen\n\n";
    msg = msg + "Hello, I want to order:\n\n";
    
    let n = 1;
    for(let name in counted){
      msg = msg + n + ". " + name + " x" + counted[name].qty + " = N" + counted[name].total + "\n";
      n = n + 1;
    }

    msg = msg + "\nTotal: N" + total + "\n";
    msg = msg + "Name: \nPhone: \nAddress: Lagere / OAU / Mayfair\n";

    let finalUrl = "https://wa.me/2349131762761?text=" + encodeURIComponent(msg);
    window.open(finalUrl, "_blank");
  });
}

// contact page whatsapp
let cBtnWa = document.getElementById("cBtnWa");
if(cBtnWa){
  cBtnWa.addEventListener("click", function(){
    let name = document.getElementById("cName").value;
    let phone = document.getElementById("cPhone").value;
    let addr = document.getElementById("cAddr").value;
    let m = document.getElementById("cMsg").value;

    if(!name || !phone){
      alert("Fill name and phone");
      return;
    }

    let text = "MESSAGE FROM CONTACT PAGE\n\nName: "+name+"\nPhone: "+phone+"\nAddress: "+addr+"\nMessage: "+m;
    window.open("https://wa.me/2349131762761?text="+encodeURIComponent(text), "_blank");
  });
}

// contact page email
let cBtnEmail = document.getElementById("cBtnEmail");
if(cBtnEmail){
  cBtnEmail.addEventListener("click", function(){
    let name = document.getElementById("cName").value;
    let phone = document.getElementById("cPhone").value;
    let addr = document.getElementById("cAddr").value;
    let m = document.getElementById("cMsg").value;

    if(!name || !phone){
      alert("Fill name and phone");
      return;
    }

    let subject = "New Message from "+name+" - CRAVE AND SIP";
    let body = "Name: "+name+"\nPhone: "+phone+"\nAddress: "+addr+"\nMessage: "+m;
    
    window.location.href = "mailto:aoladimeji119@gmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  });
}