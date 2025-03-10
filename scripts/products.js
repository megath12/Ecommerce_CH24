//products-container es el div en el HTML donde se crean las tarjetas de los productos
const container = document.getElementById("products-container");

// Eliminar las cartas internas del container que tiene los productos
container.innerHTML = "";

let DATA_PRODUCTS = [];
let DATA_CART = [];

getProducts();
function getProducts() {
	let url = SERVER_URL + `productos`;
	fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } })
		.then((response) => response.json())
		.then((data) => {
			localStorage.setItem("DATA_PRODUCTS", JSON.stringify(data));
            DATA_PRODUCTS = JSON.parse(localStorage.getItem("DATA_PRODUCTS"));
			showProducts();
		})
		.catch(function (error) {
			console.error("Error al realizar la petición:", error);
		});
}

function addProduct(id) {
	// localStorage.setItem("DATA_CART", JSON.stringify(DATA_CART));
	DATA_CART = JSON.parse(localStorage.getItem("DATA_CART"));
	// console.log(DATA_CART);

	if (DATA_CART == null) {
		DATA_CART = [];
	}

	// Producto a agregar con caracteristicas default
	let product = {
		id: id,
		grind: 2,
		roast: 2,
		count: 1,
	};
	DATA_CART.push(product);

	// Guardar informacion en localStorage
	localStorage.setItem("DATA_CART", JSON.stringify(DATA_CART));
    DATA_CART = JSON.parse(localStorage.getItem("DATA_CART"));


	// Actualizar el contador del carrito
	updateNavCart();

    // console.clear(); //LIMPIAR CONSOLA
    console.log("%c INFORMACION CARRITO", "color:yellow; background-color:blue");
    console.log(JSON.stringify(DATA_CART, null, 4)); //PRESENTACION
}

function showProducts() {
	for (let i = 0; i < DATA_PRODUCTS.length; i++) {
		const productCard = `<div class="col-md-12 col-lg-3 mb-3 mb-lg-0">
          <div class="card productCard">
          <img src="${SERVER_URL}${DATA_PRODUCTS[i].rutaimagen}"
          class="card-img-top" alt="" />
              <div class="card-body">
                  <div class="text-center mt-1 ">
                      <h4 class="card-title lightYellowText textCardHeight">${DATA_PRODUCTS[i].nombre}</h4>
                      <h6 class="h6 mb-1 pb-2 lightYellowText">Desde: $${DATA_PRODUCTS[i].precio}</h6>
                  </div>
      
                  <div class="d-flex flex-row">
                    <button type="button" class="btn btn-primary flex-fill me-1 btnVerMas" onclick="updateModal(${i})" data-mdb-ripple-color="dark" data-bs-toggle="modal" data-bs-target="#modal-product" style="width: 150px;">Ver más</button>
                    <button type="button" class="btn btn-danger flex-fill ms-1 btnBuyNow" onclick="addProduct(${DATA_PRODUCTS[i].id})">Comprar ahora</button>
                  </div>
              </div>
          </div>
          </div>`;
		container.innerHTML += productCard;
	}
}

function updateModal(i) {
	//Traer el titulo del Modal (Ver más)
	const modalTitle = document.getElementById("modal-title");
	//Traer el div del modal para el body
	const modalDivBody = document.getElementById("row-modal-body");
	//Traer footer del Modal
	const modalDivFooter = document.getElementById("modal-footer");

	//Se limpia el modal primero
	//Si no se limpian cuando se cierra y vuelve a abrir el modal se duplican todos los elementos
	modalTitle.innerHTML = ``;
	modalDivBody.innerHTML = ``;
	modalDivFooter.innerHTML = ``;

	//Pendiente de cambiar la imagen
	const modalTitleInfo = `
    <div class="container">
        <div class="row">
            <div class="col-2">
                <img id="logo-navbar" src="assets/img/logo_black.png" alt="Logo" width="36">
            </div>
            <div class="col">
                <h4 class="colorText">${DATA_PRODUCTS[i].nombre}</h4>
                <p class="colorText">Desde: $${DATA_PRODUCTS[i].precio} </p>
            </div>
        </div>
    </div>`;

	modalTitle.innerHTML += modalTitleInfo;
	//document.getElementById("modal-title").innerHTML = DATA_PRODUCTS[i].nombre;

	const modalDivBodyInfo = `
            <div style="padding: 5%; border-radius: 5%;">        
                <div id="carouselExampleIndicators" class="carousel slide" >
                    <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://varieties.worldcoffeeresearch.org/thumbs/varieties/bourbon/img_2785-2880x1920-q50.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://varieties.worldcoffeeresearch.org/thumbs/varieties/bourbon/img_2785-2880x1920-q50.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="https://varieties.worldcoffeeresearch.org/thumbs/varieties/bourbon/img_2785-2880x1920-q50.jpg" class="d-block w-100" alt="...">
                    </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div class="text-center">
                <div class="p-3 mx-n3 mb-2 modalLittleBoxes" >
                    <h5 class="h4 mb-0 lightYellowText">Descripción General</h5>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Región: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].region}</span>
                            </div>
                            
                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Cosecha: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].cosecha}</span>
                            </div>
                
                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Altura: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].altura}</span>
                            </div>

                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Humedad: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].humedad}%</span>
                            </div>
                        </div>

                        <div class="col">
                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Proceso: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].proceso}</span>
                            </div>
                            
                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Praparación: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].preparacion}</span>
                            </div>
                
                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Variedad: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].variedad}</span>
                            </div>

                            <div class="d-flex flex-column mb-3">
                                <span class="h5 mb-0 colorText">Puntuación: </span>
                                <span class="h6 mb-0 colorText">${DATA_PRODUCTS[i].puntuacion}</span>
                            </div>
                        </div>
                    </div>
                </div>
    
                                                            
                <div class="p-3 mx-n3 mb-4 modalLittleBoxes" >
                    <h5 class="h5 mb-0 lightYellowText">Notas: </h5>
                    <span class="h6 mb-0 lightYellowText">${DATA_PRODUCTS[i].nota}</span>
                </div>
                
            </div>`;

	const modalFooterInfo = `
        <button type="button" class="btn btn-primary flex-fill me-1 btnVerMas" data-mdb-ripple-color="dark" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger flex-fill ms-1 btnBuyNow" onclick="addProduct(${DATA_PRODUCTS[i].id})">Comprar ahora</button>
    `;

	modalDivBody.innerHTML += modalDivBodyInfo;
	modalDivFooter.innerHTML += modalFooterInfo;
}
