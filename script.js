let cart = [];
let total = 0;
let cartBox = document.querySelector(".cart-box");
let cartItems = document.querySelector(".cart-items");
let cartTotal = document.querySelector(".cart-total");
let counts = document.querySelectorAll(".count");

document.querySelectorAll(".cart-btn").forEach(function(btn){
  btn.addEventListener("click", function(e){
    e.preventDefault();
    cartBox.classList.add("open");
  });
});

let closeCart = document.querySelector(".close-cart");
if(closeCart){
  closeCart.addEventListener("click", function(){ cartBox.classList.remove("open"); });
}

let ham = document.querySelector(".hamburger");
let mob = document.querySelector(".mobile");
if(ham && mob){
  ham.addEventListener("click", function(){
    mob.classList.toggle("show");
    ham.innerHTML = mob.classList.contains("show") ? "✕" : "☰";
  });
}

document.querySelectorAll(".add").forEach(function(btn){
  btn.addEventListener("click", function(){
    let box = btn.closest(".food");
    let name = box.querySelector("h3").innerText;
    let price = parseInt(box.querySelector("b").innerText.replace(/[^0-9]/g, ""));
    cart.push({name:name, price:price});
    total += price;
    updateCart();
    cartBox.classList.add("open");
    btn.innerHTML = "Added ✓";
    setTimeout(function(){ btn.innerHTML = "Add to Cart"; }, 1000);
  });
});

function updateCart(){
  cartItems.innerHTML = "";
  cart.forEach(function(item){
    let div = document.createElement("div");
    div.style.padding = "10px 0";
    div.style.borderBottom = "1px solid #eee";
    div.innerHTML = "<p>"+item.name+"</p><small>₦"+item.price+"</small>";
    cartItems.appendChild(div);
  });
  cartTotal.innerHTML = "Total: ₦" + total;
  counts.forEach(function(c){ c.innerHTML = cart.length; });
}

// CART WHATSAPP - FIXED WITH ENCODE
let waBtn = document.getElementById("sendWa");
if(waBtn){
  waBtn.addEventListener("click", function(){
    if(cart.length == 0){ alert("Cart empty!"); return; }
    let counted = {};
    cart.forEach(function(i){
      if(counted[i.name]){ counted[i.name].qty++; counted[i.name].total+=i.price; }
      else{ counted[i.name] = {qty:1, total:i.price}; }
    });
    
    let msg = "NEW ORDER - Coding kitchen\n\n";
    msg += "Hello, I want to order:\n\n";
    let n=1;
    for(let name in counted){
      msg += n+". "+name+" x"+counted[name].qty+" = N"+counted[name].total+"\n"; 
      n++;
    }
    msg += "\nTotal: N"+total+"\n";
    msg += "Name: \nPhone: \nAddress: Lagere / OAU / Mayfair\n";
    
    // THIS FIX THE CUTTING
    let finalUrl = "https://wa.me/2349131762761?text=" + encodeURIComponent(msg);
    window.open(finalUrl, "_blank");
  });
}

// CONTACT PAGE - WHATSAPP - FIXED
let cBtnWa = document.getElementById("cBtnWa");
if(cBtnWa){
  cBtnWa.addEventListener("click", function(){
    let name = document.getElementById("cName").value;
    let phone = document.getElementById("cPhone").value;
    let addr = document.getElementById("cAddr").value;
    let m = document.getElementById("cMsg").value;
    if(!name || !phone){ alert("Fill name and phone"); return; }
    let text = "MESSAGE FROM CONTACT PAGE\n\nName: "+name+"\nPhone: "+phone+"\nAddress: "+addr+"\nMessage: "+m;
    window.open("https://wa.me/2349131762761?text="+encodeURIComponent(text), "_blank");
  });
}

let cBtnEmail = document.getElementById("cBtnEmail");
if(cBtnEmail){
  cBtnEmail.addEventListener("click", function(){
    let name = document.getElementById("cName").value;
    let phone = document.getElementById("cPhone").value;
    let addr = document.getElementById("cAddr").value;
    let m = document.getElementById("cMsg").value;
    if(!name || !phone){ alert("Fill name and phone"); return; }
    let subject = "New Message from "+name+" - CRAVE AND SIP";
    let body = "Name: "+name+"\nPhone: "+phone+"\nAddress: "+addr+"\nMessage: "+m;
    window.location.href = "mailto:aoladimeji119@gmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  });
}