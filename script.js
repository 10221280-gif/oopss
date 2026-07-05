document.addEventListener("DOMContentLoaded", () => {

/*================ LOADER ================*/
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }
});

/*================ HEADER ================*/
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (header) {
        header.classList.toggle("active", window.scrollY > 80);
    }
});

/*================ MOBILE MENU ================*/
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

/*================ MENU SYSTEM ================*/

const categoryBox = document.getElementById("categoryBox");
const products = document.querySelectorAll(".product-card");
const branches = document.querySelectorAll(".branch-btn");

let activeBranch = "main";
let activeCategory = "all";

/*================ CATEGORIES =================*/

const categories = {
    main: [
        ["all", "All"],
        ["hot_drinks", "Hot Drinks"],
        ["cold_drinks", "Cold Drinks"],
        ["special", "Special"],
        ["smoothie", "Smoothies"],
        ["milkshake", "Milkshakes"],
        ["frappe", "Frappes"],
        ["sweets", "Desserts"],
        ["shisha", "Shisha"]
    ],

    branch2: [
        ["all", "All"],
        ["shawarma", "Shawarma"],
        ["meals", "Meals"],
        ["sandwich", "Sandwiches"],
        ["broasted", "Broasted"],
        ["snack", "Snacks"]
    ],

    branch3: [
        ["all", "All"],
        ["appetizers", "Appetizers"],
        ["grill", "Grills"],
        ["offers", "Offers"]
    ]
};

/*================ CREATE CATEGORY BUTTONS =================*/

function createCategories(branch) {

    categoryBox.innerHTML = "";

    if (!categories[branch]) return;

    categories[branch].forEach((cat, index) => {

        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.dataset.filter = cat[0];
        btn.textContent = cat[1];

        if (index === 0) {
            btn.classList.add("active");
            activeCategory = "all";
        }

        btn.addEventListener("click", () => {

            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            activeCategory = btn.dataset.filter;

            filterProducts();
        });

        categoryBox.appendChild(btn);
    });
}

/*================ FILTER PRODUCTS =================*/

function filterProducts() {

    products.forEach(product => {

        const matchBranch =
            product.dataset.branch === activeBranch;

        const matchCategory =
            activeCategory === "all" ||
            product.dataset.category === activeCategory;

        product.style.display =
            (matchBranch && matchCategory)
                ? "block"
                : "none";
    });
}

/*================ BRANCH SYSTEM =================*/

branches.forEach(btn => {

    btn.addEventListener("click", () => {

        branches.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        activeBranch = btn.dataset.branch;
        activeCategory = "all";

        createCategories(activeBranch);
        filterProducts();
    });
});

/*================ INIT =================*/

createCategories(activeBranch);
filterProducts();

/*================ CART SYSTEM =================*/

let cart = [];
const cartCount = document.getElementById("cartCount");

/*================ LOAD CART =================*/

function loadCart() {

    const saved = localStorage.getItem("opss_cart");

    if (saved) {
        cart = JSON.parse(saved);
    }

    updateCart();
}

loadCart();

/*================ SAVE CART =================*/

function saveCart() {
    localStorage.setItem("opss_cart", JSON.stringify(cart));
}

/*================ UPDATE CART =================*/

function updateCart() {

    if (!cartCount) return;

    const total = cart.reduce((sum, item) => sum + item.qty, 0);

    cartCount.textContent = total;

    saveCart();
}

/*================ ADD TO CART =================*/

document.querySelectorAll(".add-cart").forEach((btn, index) => {

    btn.dataset.id = index + 1;

    btn.addEventListener("click", () => {

        const name = btn.dataset.name;

        let item = cart.find(p => p.name === name);

        if (item) {
            item.qty += 1;
        } else {
            cart.push({
                id: index + 1,
                name: name,
                price: Number(btn.dataset.price),
                image: btn.dataset.image || "",
                qty: 1
            });
        }

        updateCart();
        showToast(name);

    });

});

/*================ TOAST =================*/

function showToast(name) {

    const old = document.querySelector(".toast");
    if (old) old.remove();

    const toast = document.createElement("div");
    toast.className = "toast";

    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${name} added to cart
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

/*================ SEARCH SYSTEM =================*/

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        products.forEach(product => {

            const title = product.querySelector("h3").textContent.toLowerCase();

            product.style.display =
                title.includes(value)
                    ? "block"
                    : "none";

        });

    });
}

/*================ LANGUAGE =================*/

const languageBtn = document.getElementById("languageBtn");

if (languageBtn) {

    let lang = "en";

    languageBtn.addEventListener("click", () => {

        lang = lang === "en" ? "ar" : "en";

        languageBtn.textContent =
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

/*================ PRODUCT IMAGE EFFECT =================*/

document.querySelectorAll(".product-card img").forEach(img => {

    img.addEventListener("click", () => {

        img.classList.add("zoom");

        setTimeout(() => {
            img.classList.remove("zoom");
        }, 300);

    });

});

/*================ CARD HOVER FIX =================*/

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px)";
    });

});

/*================ SAFETY INIT CHECK =================*/

window.addEventListener("load", () => {

    if (!document.querySelector(".product-card")) {
        console.warn("No products found in menu");
    }
});
});
