document.addEventListener("DOMContentLoaded", () => {

/*================ LOADER ================*/
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    if (!loader) return;

    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 600);
});

/*================ HEADER ================*/
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!header) return;

    header.classList.toggle("active", window.scrollY > 80);
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
        ["broasted", "Broasted"],
        ["sandwich", "Sandwiches"],
        ["snacks", "Snacks"]
    ],

    branch3: [
        ["all", "All"],
        ["appetizers", "Appetizers"],
        ["grills", "Grills"],
        ["offers", "Offers"]
    ]
};
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
function filterProducts() {

    products.forEach(product => {

        const matchBranch =
            product.dataset.branch === activeBranch;

        const matchCategory =
            activeCategory === "all" ||
            product.dataset.category === activeCategory;

        if (matchBranch && matchCategory) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}
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
let cart = [];

const cartCount = document.getElementById("cartCount");

/*================ LOAD CART =================*/
function loadCart() {
    const saved = localStorage.getItem("opss_cart");

    if (saved) {
        try {
            cart = JSON.parse(saved) || [];
        } catch (e) {
            cart = [];
        }
    }

    updateCart();
}

/*================ SAVE CART =================*/
function saveCart() {
    localStorage.setItem("opss_cart", JSON.stringify(cart));
}

/*================ UPDATE CART =================*/
function updateCart() {

    if (!cartCount) return;

    const total = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

    cartCount.textContent = total;

    saveCart();
}

loadCart();
document.querySelectorAll(".add-cart").forEach((btn) => {

    btn.addEventListener("click", () => {

        const name = btn.dataset.name;
        const price = Number(btn.dataset.price) || 0;
        const image = btn.dataset.image || "";

        let item = cart.find(p => p.name === name);

        if (item) {
            item.qty += 1;
        } else {
            cart.push({
                id: Date.now(), // 🔥 حل مشكلة id المتكرر
                name,
                price,
                image,
                qty: 1
            });
        }

        updateCart();
        showToast(name);

    });

});
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        products.forEach(product => {

            const title = product.querySelector("h3")?.textContent?.toLowerCase() || "";

            const matchText = title.includes(value);

            const matchBranch = product.dataset.branch === activeBranch;
            const matchCategory =
                activeCategory === "all" ||
                product.dataset.category === activeCategory;

            if (matchText && matchBranch && matchCategory) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });
}
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
});
