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
    menuBtn.onclick = () => {
        navLinks.classList.toggle("show");
    };
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
        ["sweets", "Sweets"],
        ["shisha", "Shisha"]
    ]
};

/*================ CREATE FILTER BUTTONS =================*/

function createCategories(branch) {
    categoryBox.innerHTML = "";

    categories[branch].forEach((cat, index) => {

        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.dataset.filter = cat[0];
        btn.innerHTML = cat[1];

        if (index === 0) {
            btn.classList.add("active");
            activeCategory = "all";
        }

        btn.onclick = () => {

            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");
            activeCategory = cat[0];

            filterProducts();
        };

        categoryBox.appendChild(btn);
    });
}

/*================ FILTER PRODUCTS =================*/

function filterProducts() {

    products.forEach(product => {

        const sameBranch =
            product.dataset.branch === activeBranch;

        const sameCategory =
            activeCategory === "all" ||
            product.dataset.category === activeCategory;

        if (sameBranch && sameCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

/*================ BRANCH SYSTEM =================*/

branches.forEach(btn => {

    btn.onclick = function () {

        branches.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        activeBranch = btn.dataset.branch;
        activeCategory = "all";

        createCategories(activeBranch);
        filterProducts();
    };
});

/*================ INIT =================*/

createCategories(activeBranch);
filterProducts();

/* Add to cart */
document.querySelectorAll(".add-cart").forEach((btn, index) => {

    btn.onclick = function () {

        const name = btn.dataset.name;

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            cart.push({
                id: index + 1,
                name: name,
                price: Number(btn.dataset.price),
                image: btn.dataset.image,
                qty: 1
            });
        }

        updateCart();
        showToast(name);
    };
});

/*================ TOAST ================*/

function showToast(name) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = "✔ " + name + " Added";

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => toast.remove(), 2500);
}

/*================ LANGUAGE ================*/

const languageBtn = document.getElementById("languageBtn");

if (languageBtn) {
    let lang = "en";

    languageBtn.onclick = function () {
        lang = lang === "en" ? "ar" : "en";

        languageBtn.innerHTML =
            lang === "en"
                ? "🇺🇸 EN"
                : "🇸🇦 AR";
    };
}

/*================ BACK TO TOP ================*/

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.style.display =
            window.scrollY > 400
                ? "block"
                : "none";
    });

    topBtn.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

});
