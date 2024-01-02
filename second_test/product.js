let products = [];

function addProduct() {
    const serialNo = document.getElementById('serialNo').value.trim();
    const productName = document.getElementById('productName').value.trim();
    const productImage = document.getElementById('productImage').value.trim();
    const productDec = document.getElementById('productDec').value.trim();

    if (serialNo !== '' && productName !== '' && productImage !== '' && productDec !== '') {
        const product = {
            serialNo,
            productName,
            productImage,
            productDec
        };
        products.push(product);
        displayProducts();
        saveToLocalStorage();
        document.getElementById('productForm').reset();
    } else {
        alert('Please enter Serial No or Product Name or product image');
    }
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const serialNoCell = document.createElement('td');
        serialNoCell.textContent = product.serialNo;
        row.appendChild(serialNoCell);

        const productNameCell = document.createElement('td');
        productNameCell.textContent = product.productName;
        row.appendChild(productNameCell);

        const imageCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.productImage || 'https://via.placeholder.com/100';
        img.alt = product.productName;
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        const actionCell = document.createElement('td');
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'View';
        viewBtn.addEventListener('click', () => viewProduct(index));
        actionCell.appendChild(viewBtn);



        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteProduct(index));
        actionCell.appendChild(deleteBtn);

        row.appendChild(actionCell);

        productList.appendChild(row);
    });
}

function viewProduct(index) {
    const { serialNo, productName, productImage, productDec } = products[index];
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
    <div style="display: flex;">
    <div style="flex: 1;">
        <img src="${productImage}" alt="${productName}" style="max-width: 600px; max-height: 600px;">
    </div>
    <div style="flex: 1; padding-left: 20px;">
        <p>SL No: ${serialNo}</p>
        <p>Name: ${productName}</p>
        <p>Description: ${productDec}</p>
        <button>Add to Cart</button>
    </div>
</div>
`;
    openModal();
}

function openModal() {
    document.getElementById('productModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}
if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
}
window.addEventListener('beforeunload', saveToLocalStorage);
displayProducts();