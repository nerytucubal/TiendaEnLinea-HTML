let contenedor_productos=document.querySelector('#contenedor_productos')
let productos=[]

const obtenerProductos=()=>{
    fetch('https://api.escuelajs.co/api/v1/products')
    .then((response)=>{
        return response.json()
    })
    .then((datos)=>{
        console.log(datos)
        let detalles = datos.map(item =>{
            let producto={
                img:item.category.image,
                name:item.category.name,
                price:item.price
            }
            productos.push(producto)
            return producto
        });
        detalles=detalles.slice(0,10)
        return detalles
    })
    .then((productosAlmacenados)=>{
        console.log(productosAlmacenados)
    }).catch((error)=>{
        return alert(error)
    })
    .finally(()=>{
        console.log('Las Promesas an finalizado')
    })
}
obtenerProductos()