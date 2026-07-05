/*================ MENU SYSTEM ================*/

const categoryBox = document.getElementById("categoryBox");
const products = document.querySelectorAll(".product-card");
const branches = document.querySelectorAll(".branch-btn");

let activeBranch = "main";
let activeCategory = "all";

/*================ CATEGORIES =================*/

const categories = {

    main: [
        ["all","All"],
        ["hot_drinks","Hot Drinks"],
        ["cold_drinks","Cold Drinks"],
        ["special","Special"],
        ["smoothie","Smoothies"],
        ["milkshake","Milkshakes"],
        ["frappe","Frappes"],
        ["sweets","Desserts"],
        ["shisha","Shisha"]
    ],

    branch2: [
        ["all","All"],
        ["shawarma","Shawarma"],
        ["meals","Meals"],
        ["broasted","Broasted"],
        ["sandwich","Sandwiches"],
        ["snack","Snacks"]
    ],

    branch3: [
        ["all","All"],
        ["appetizers","Appetizers"],
        ["grill","Grills"],
        ["offers","Offers"]
    ]

};

/*================ CREATE CATEGORY BUTTONS =================*/

function createCategories(branch){

    categoryBox.innerHTML="";

    if(!categories[branch]) return;

    categories[branch].forEach((cat,index)=>{

        const btn=document.createElement("button");

        btn.className="filter-btn";

        btn.dataset.filter=cat[0];

        btn.innerHTML=cat[1];

        if(index===0){

            btn.classList.add("active");

            activeCategory="all";

        }

        btn.onclick=function(){

            document.querySelectorAll(".filter-btn").forEach(button=>{

                button.classList.remove("active");

            });

            this.classList.add("active");

            activeCategory=this.dataset.filter;

            filterProducts();

        }

        categoryBox.appendChild(btn);

    });

}

/*================ FILTER PRODUCTS =================*/

function filterProducts(){

    products.forEach(product=>{

        const branchMatch =
            product.dataset.branch===activeBranch;

        const categoryMatch =
            activeCategory==="all" ||
            product.dataset.category===activeCategory;

        product.style.display =
            (branchMatch && categoryMatch)
            ? "block"
            : "none";

    });

}

/*================ BRANCH CHANGE =================*/

branches.forEach(btn=>{

    btn.addEventListener("click",function(){

        branches.forEach(b=>b.classList.remove("active"));

        this.classList.add("active");

        activeBranch=this.dataset.branch;

        activeCategory="all";

        createCategories(activeBranch);

        filterProducts();

    });

});

/*================ INIT =================*/

createCategories(activeBranch);

filterProducts();

/*================ CART =================*/

let cart=[];

const cartCount=document.getElementById("cartCount");

function updateCart(){

    if(!cartCount) return;

    const total=cart.reduce((sum,item)=>sum+item.qty,0);

    cartCount.textContent=total;

}

document.querySelectorAll(".add-cart").forEach((btn,index)=>{

    btn.dataset.id=index+1;

    btn.addEventListener("click",()=>{

        const name=btn.dataset.name;

        const item=cart.find(p=>p.name===name);

        if(item){

            item.qty++;

        }else{

            cart.push({

                id:index+1,

                name:name,

                price:Number(btn.dataset.price),

                image:btn.dataset.image || "",

                qty:1

            });

        }

        updateCart();

        showToast(name);

    });

});
/*================ LOCAL STORAGE =================*/

function saveCart() {
    localStorage.setItem("opss_cart", JSON.stringify(cart));
}

function loadCart() {

    const saved = localStorage.getItem("opss_cart");

    if (saved) {

        cart = JSON.parse(saved);

        updateCart();

    }

}

loadCart();

/*================ UPDATE CART =================*/

function updateCart() {

    if (!cartCount) return;

    let total = 0;

    cart.forEach(item => {

        total += item.qty;

    });

    cartCount.textContent = total;

    saveCart();

}

/*================ TOAST =================*/

function showToast(name) {

    const oldToast = document.querySelector(".toast");

    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${name} Added To Cart
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 50);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2200);

}

/*================ LANGUAGE =================*/

const languageBtn = document.getElementById("languageBtn");

if (languageBtn) {

    let lang = "en";

    languageBtn.addEventListener("click", () => {

        lang = lang === "en" ? "ar" : "en";

        languageBtn.innerHTML =

            lang === "en"

                ? "🇺🇸 EN"

                : "🇸🇦 AR";

        document.documentElement.lang = lang;

    });

}

/*================ BACK TO TOP =================*/

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*================ IMAGE ANIMATION =================*/

document.querySelectorAll(".product-card img").forEach(img => {

    img.addEventListener("click", () => {

        img.classList.add("zoom");

        setTimeout(() => {

            img.classList.remove("zoom");

        }, 250);

    });

});

/*================ PRODUCT HOVER =================*/

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-5px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

/*================ SEARCH READY =================*/

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        products.forEach(product => {

            const title = product.querySelector("h3").innerText.toLowerCase();

            if (title.includes(value)) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

}

;
