window.addEventListener('DOMContentLoaded', (event) => {
    const TIEMPO_INICIAL = 120; // 2 minutos en segundos
    let tiempoRestante;
    
    const elementoShort = document.getElementById('short-temporal');
    const textoContador = document.getElementById('contador-segundos');
    const barraProgreso = document.getElementById('barra-progreso');

    // Comprobamos la memoria del navegador para evitar trampas con F5
    const tiempoGuardado = localStorage.getItem('short_segundos_fijos_2min');
    
    if (tiempoGuardado !== null) {
        tiempoRestante = parseInt(tiempoGuardado, 10);
    } else {
        tiempoRestante = TIEMPO_INICIAL;
    }

    // Si el tiempo ya se agotó antes, ocultamos el short directamente
    if (tiempoRestante <= 0) {
        if (elementoShort) elementoShort.style.display = "none";
        return; 
    }

    if (textoContador) textoContador.textContent = tiempoRestante;

    const cuentaAtras = setInterval(() => {
        tiempoRestante--;
        
        // Guardamos el segundo exacto en la memoria del navegador
        localStorage.setItem('short_segundos_fijos_2min', tiempoRestante);
        
        if (textoContador) {
            textoContador.textContent = tiempoRestante;
        }
        
        if (barraProgreso) {
            let porcentaje = (tiempoRestante / TIEMPO_INICIAL) * 100;
            barraProgreso.style.width = (porcentaje > 0 ? porcentaje : 0) + "%";
        }
        
        if (tiempoRestante <= 0) {
            clearInterval(cuentaAtras);
            if (elementoShort) {
                elementoShort.style.transition = "all 1s ease-in-out";
                elementoShort.style.opacity = "0";
                elementoShort.style.transform = "translateY(50px)";
                setTimeout(() => { elementoShort.style.display = "none"; }, 1000);
            }
        }
    }, 1000);
});