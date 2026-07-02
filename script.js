document.addEventListener("DOMContentLoaded", () => {

/*================ LOADER ================*/
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    if(loader){
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        },600);
    }
});

/*================ HEADER ================*/
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if(header){
        header.classList.toggle("active",window.scrollY > 80);
    }
});

/*================ MOBILE MENU ================*/
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn && navLinks){

    menuBtn.onclick = ()=>{

        navLinks.classList.toggle("show");

    }

}

/*================ MENU SYSTEM ================*/

const categoryBox = document.getElementById("categoryBox");

const products = document.querySelectorAll(".product-card");

const branches = document.querySelectorAll(".branch-btn");

let activeBranch="main";
let activeCategory="all";

/* المجموعات الخاصة بكل فرع */

const categories={

main:[
["cold_drinks","Cold Drinks"],
["hot_drinks","Hot Drinks"],
["sweets","Sweets"],
["shisha","Shisha"]
],

branch2:[
["broasted","Broasted"],
["sandwich","Sandwich"],
["snack","Snack"]
],

branch3:[
["appetizers","Appetizers"],
["مشاوي","مشاوي"],
["offers","Offers"]
]

};

/* إنشاء أزرار المجموعات */

function createCategories(branch){

    categoryBox.innerHTML="";

    categories[branch].forEach((cat,index)=>{

        const btn=document.createElement("button");

        btn.className="filter-btn";

        if(index==0){

            btn.classList.add("active");

            activeCategory=cat[0];

        }

        btn.dataset.filter=cat[0];

        btn.innerHTML=cat[1];

        btn.onclick=function(){

            document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            activeCategory=cat[0];

            filterProducts();

        }

        categoryBox.appendChild(btn);

    });

}

/* فلترة المنتجات */

function filterProducts(){

    products.forEach(product=>{

        const sameBranch=
        product.dataset.branch===activeBranch;

        const sameCategory=
        product.dataset.category===activeCategory;

        if(sameBranch && sameCategory){

            product.style.display="block";

        }else{

            product.style.display="none";

        }

    });

}

/* تغيير الفرع */

branches.forEach(btn=>{

    btn.onclick=function(){

        branches.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        activeBranch=btn.dataset.branch;

        createCategories(activeBranch);

        filterProducts();

    }

});

/* أول تشغيل */

createCategories(activeBranch);

filterProducts();

/*================ CART ================*/

let cart=[];

const cartCount=document.getElementById("cartCount");

function updateCart(){

    if(cartCount){

        cartCount.innerHTML=cart.length;

    }

}

document.querySelectorAll(".add-cart").forEach(btn=>{

    btn.onclick=function(){

        cart.push({

            id:btn.dataset.id,

            name:btn.dataset.name,

            price:btn.dataset.price,

            image:btn.dataset.image

        });

        updateCart();

        showToast(btn.dataset.name);

    }

});

/*================ TOAST ================*/

function showToast(name){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML="✔ "+name+" Added";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.remove();

    },2500);

}

/*================ LANGUAGE ================*/

const languageBtn=document.getElementById("languageBtn");

if(languageBtn){

    let lang="en";

    languageBtn.onclick=function(){

        lang=lang==="en"?"ar":"en";

        languageBtn.innerHTML=

        lang==="en"

        ?"🇺🇸 EN"

        :"🇸🇦 AR";

    }

}

/*================ BACK TO TOP ================*/

const topBtn=document.getElementById("topBtn");

if(topBtn){

    window.addEventListener("scroll",()=>{

        topBtn.style.display=

        window.scrollY>400

        ?"block"

        :"none";

    });

    topBtn.onclick=function(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

}

});