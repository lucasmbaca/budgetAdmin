export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });
}

export const generarId = () => {
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    return fecha+random
}

export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
        year:'numeric',
        month:'long',
        day:'2-digit'
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}