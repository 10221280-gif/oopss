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


    header.classList.toggle(
        "active",
        window.scrollY > 80
    );

});



/*================ MOBILE MENU ================*/

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");


if(menuBtn && navLinks){

    menuBtn.addEventListener("click",()=>{

        navLinks.classList.toggle("show");

    });

}




/*================ MENU SYSTEM ================*/


const categoryBox =
document.getElementById("categoryBox");


const products =
document.querySelectorAll(".product-card");


const branches =
document.querySelectorAll(".branch-btn");



let activeBranch = "main";

let activeCategory = "all";





/*================ CATEGORIES =================*/


const categories = {


main:[

["all","All"],

["hot_drinks","Hot Drinks"],

["cold_drinks","Cold Drinks"],

["sweets","Desserts"],

["special","Special"],

["smoothie","Smoothies"],

["shisha","Shisha"]

],



branch2:[

["all","All"],

["shawarma","Shawarma"],

["meals","Meals"],

["broasted","Broasted"],

["sandwich","Sandwich"],

["snack","Snack"]

],



branch3:[

["all","All"],

["appetizers","Appetizers"],

["مشاوي","Grills"],

["offers","Offers"]

]


};





/*================ CREATE CATEGORY BUTTONS ================*/


function createCategories(branch){


    if(!categoryBox) return;


    categoryBox.innerHTML="";


    categories[branch].forEach((cat,index)=>{


        const button =
        document.createElement("button");


        button.className="filter-btn";


        button.dataset.filter =
        cat[0];


        button.textContent =
        cat[1];



        if(index===0){

            button.classList.add("active");

            activeCategory="all";

        }




        button.addEventListener("click",()=>{


            document
            .querySelectorAll(".filter-btn")
            .forEach(btn=>{

                btn.classList.remove("active");

            });



            button.classList.add("active");


            activeCategory =
            button.dataset.filter;



            filterProducts();


        });



        categoryBox.appendChild(button);



    });


}




/*================ FILTER PRODUCTS ================*/


function filterProducts(){


    products.forEach(product=>{


        const branchMatch =
        product.dataset.branch === activeBranch;



        const categoryMatch =
        activeCategory==="all" ||
        product.dataset.category === activeCategory;



        if(branchMatch && categoryMatch){


            product.style.display="";


        }else{


            product.style.display="none";


        }


    });


}




/*================ START MENU ================*/


createCategories(activeBranch);

filterProducts();




/*================ BRANCH CHANGE ================*/


branches.forEach(btn=>{


    btn.addEventListener("click",()=>{


        branches.forEach(b=>{

            b.classList.remove("active");

        });



        btn.classList.add("active");



        activeBranch =
        btn.dataset.branch;



        activeCategory="all";



        createCategories(activeBranch);


        filterProducts();



    });


});
/*================ SEARCH SYSTEM ================*/

const searchInput =
document.getElementById("searchInput");


if(searchInput){


    searchInput.addEventListener("keyup",()=>{


        const value =
        searchInput.value.toLowerCase();



        products.forEach(product=>{


            const title =
            product.querySelector("h3")
            ?.textContent
            .toLowerCase() || "";



            const matchText =
            title.includes(value);



            const matchBranch =
            product.dataset.branch === activeBranch;



            const matchCategory =
            activeCategory==="all" ||
            product.dataset.category === activeCategory;



            if(matchText && matchBranch && matchCategory){


                product.style.display="";


            }else{


                product.style.display="none";


            }


        });



    });


}





/*================ TOP BUTTON ================*/


const topBtn =
document.getElementById("topBtn");


if(topBtn){


    window.addEventListener("scroll",()=>{


        if(window.scrollY > 400){


            topBtn.classList.add("show");


        }else{


            topBtn.classList.remove("show");


        }


    });



    topBtn.addEventListener("click",()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });


}





/*================ LANGUAGE BUTTON ================*/


const languageBtn =
document.getElementById("languageBtn");


if(languageBtn){


    languageBtn.addEventListener("click",()=>{


        if(document.documentElement.lang === "en"){


            document.documentElement.lang="ar";

            document.documentElement.dir="rtl";

            languageBtn.textContent="🇱🇧 AR";


        }else{


            document.documentElement.lang="en";

            document.documentElement.dir="ltr";

            languageBtn.textContent="🇺🇸 EN";


        }


    });


}



});
