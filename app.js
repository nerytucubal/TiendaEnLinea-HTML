let contenedor_productos = document.querySelector('#contenedor_productos')
let loading = document.querySelector('#loading')
const Offcanvas = new bootstrap.Offcanvas('#offcanvasScrolling')
let producto_guardado = document.querySelector('#Productos-Guardados')
const Carrito = document.querySelector('#carrito')
const notification=document.querySelector('#notification')
let productos = []
let productosAlmacenados = []
if (localStorage.getItem('Productos') != null) {
    notification.classList.remove('d-none')
    productosAlmacenados=JSON.parse(localStorage.getItem('Productos'))
    notification.textContent=productosAlmacenados.length
    producto_guardado.innerHTML = ''
    productosAlmacenados.forEach((item) => {
        producto_guardado.innerHTML += `
                <div class="d-flex justify-content-between card p-2 m-4" style="height: auto;">
                <img src="${item.img}">
                <p class="fw-bold m-2">${item.name}</p>
                <p class="fw-bold m-2" style="color: rgb(106, 17, 203);">$${item.price}</p>
                </div>
            `
    })
}

const obtenerProductos = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then((response) => {
            return response.json()
        })
        .then((datos) => {
            let detalles = datos.map(item => {
                let producto = {
                    img: item.images,
                    name: item.title,
                    price: item.price
                }
                productos.push(producto)
                return producto
            });
            detalles = detalles.slice(0, 10)
            return detalles
        })
        .then((productosAlmacenados) => {
            let CardProducto = ''
            productosAlmacenados.forEach(item => {
                CardProducto += crearCardProducto(item)
            });
            contenedor_productos.innerHTML += CardProducto
        }).catch(() => {
            return alert("Hubó un error al momento de cargar los productos")
        })
        .finally(() => {
            console.log('Las Promesas han finalizado')
        })
}
obtenerProductos()

const crearCardProducto = (producto) => {
    loading.classList.add('d-none')
    return `
        <div class="col-12 col-md-4 col-lg-3">
            <div class="card border-0 shadow">
                <img src="${producto.img}" class="card-img-top" height="200px" alt="${producto.name}" style="object-fit:cover"></img>
                <a class="text-light"><span class="position-absolute translate-middle p-2 bg-light text-black rounded-circle favorite"><i class="bi bi-heart"></i></span></a>
                <div class="card-body">
                    <h6 class="card-title mb-1">${producto.name}</h6>
                    <span class="card-text fs-5 fw-bold" style="color: #6A11CB;">$${producto.price}</span>
                    <button href="#" class="btn btn-primary w-100 mt-3 border-0" style="background-color: #6A11CB;" onclick="AñadirCarrito('${producto.name}','${producto.img}','${producto.price}')">Añadir al Carrito</button>
                </div>
            </div>
        </div>
    `
}

const AñadirCarrito = (name, img, price) => {
    let contenedoGuardar = document.createElement('div')
    contenedoGuardar.classList.add('d-flex', 'justify-content-between','card', 'p-2', 'm-4')
    let imagen = document.createElement('img')
    imagen.src = img
    imagen.style.width = '100px'
    let nombre = document.createElement('p')
    nombre.textContent = name
    nombre.classList.add('fw-bold','m-2')
    let precio = document.querySelector('p')
    precio.textContent = `$${price}`
    precio.classList.add('fw-bold','m-2')
    precio.style.color='#6A11CB'
    contenedoGuardar.appendChild(imagen)
    contenedoGuardar.appendChild(nombre)
    contenedoGuardar.appendChild(precio)
    producto_guardado.appendChild(contenedoGuardar)
    let producto = productos.find(item => item.name == name)
    productosAlmacenados.push(producto)
    localStorage.setItem('Productos', JSON.stringify(productosAlmacenados))
    notification.classList.remove('d-none')
    notification.textContent=productosAlmacenados.length
    Offcanvas.show()
}

Carrito.addEventListener('click', () => {
    Offcanvas.show()
})