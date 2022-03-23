var ProductNameInput = document.getElementById('ProductName');
var ProductPriceInput = document.getElementById('ProductPrice');
var ProductCategoryInput = document.getElementById('ProductCategory');
var ProductDescInput = document.getElementById('ProductDesc');
var mainbtn = document.getElementById('mainbtn');
var currentvalue = 0;
var productContainer;

if (localStorage.getItem("products") == null) {
    productContainer = [];
} else {
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct(productContainer);
}

function add() {
    if (mainbtn.innerHTML == "add product") {
        addProduct();
    } else {
        editdata();
    }
}

function addProduct() {



    var product = {
        name: ProductNameInput.value,
        price: ProductPriceInput.value,
        category: ProductCategoryInput.value,
        desc: ProductDescInput.value
    }

    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer))
    displayProduct(productContainer);
    clearProduct()
}

function clearProduct() {
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescInput.value = "";
}

function displayProduct(productList) {

    var cartoona = ``;

    for (var i = 0; i < productList.length; i++) {
        cartoona += `
        <tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button class="btn btn-warning" onclick="updateProduct(${i})" >Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})" >Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tableRow').innerHTML = cartoona;
}

function deleteProduct(productIndex) {
    productContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
}

function searchProduct(term) {
    var searchProducts = [];

    for (var i = 0; i < productContainer.length; i++) {

        if (productContainer[i].name.toLowercase().includes(term.toLowercase())) {
            searchProducts.push(productContainer[i]);
        }
    }
    displayProduct(searchProducts);
}

function updateProduct(index) {
    currentvalue = index;
    ProductNameInput.value = productContainer[index].name;
    ProductPriceInput.value = productContainer[index].price;
    ProductCategoryInput.value = productContainer[index].category;
    ProductDescInput.value = productContainer[index].desc;

    mainbtn.innerHTML = "update data"
}

function editdata() {
    productContainer[currentvalue].name = ProductNameInput.value;
    productContainer[currentvalue].price = ProductPriceInput.value;
    productContainer[currentvalue].category = ProductCategoryInput.value;
    productContainer[currentvalue].desc = ProductDescInput.value;

    mainbtn.innerHTML = "add product";
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearProduct();
}