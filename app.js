let contenedor_productos = document.querySelector('#contenedor_productos')
let productos = []

const obtenerProductos = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then((response) => {
            return response.json()
        })
        .then((datos) => {
            console.log(datos)
            let detalles = datos.map(item => {
                let producto = {
                    img: item.category.image,
                    name: item.category.name,
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
        }).catch((error) => {
            return alert(error)
        })
        .finally(() => {
            console.log('Las Promesas an finalizado')
        })
}
obtenerProductos()

const crearCardProducto = (producto) => {
    return `
        <div class="col-12 col-md-4 col-lg-3">
            <div class="card border-0 shadow">
                <img src="${producto.img}" class="card-img-top" height="200px" alt="${producto.name}" style="object-fit: cover;"><a href="#" class="text-light"><span class="position-absolute translate-middle p-2 bg-light text-black rounded-circle favorite"><i class="bi bi-heart"></i></span></a>
                <span class="position-absolute translate-middle p-1 rounded-2 bg-danger text-center fw-normal text-light oferta">Oferta</span>
                <div class="card-body">
                    <h6 class="card-title mb-1">${producto.name}</h6>
                    <span class="card-text fs-5 fw-bold" style="color: #6A11CB;">$${producto.price}</span>
                    <button href="#" class="btn btn-primary w-100 mt-3 border-0" style="background-color: #6A11CB;">Añadir al Carrito</button>
                </div>
            </div>
        </div>
    `
}