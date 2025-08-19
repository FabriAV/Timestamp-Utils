const date_elegida = document.querySelector('#selected_day');
const input_time = document.querySelector('#time_stamp');
const TimeZones = Intl.supportedValuesOf('timeZone');
const tbody = document.querySelector('#informacion');
const select = document.querySelector('#zonas');
const local_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const zonas_seleccionadas = new Set();

for (const zone of TimeZones) {
    let opcion = document.createElement("option");
    opcion.innerText = zone;
    select.append(opcion);
}

function generar_tabla() {
    tbody.innerHTML = "";
    for (const zona of zonas_seleccionadas) {
        let fila = document.createElement("tr")
        let columnaTimezone = document.createElement("td");
        let columnalocatedate = document.createElement("td");
        let btn_remover = document.createElement("button");
        columnaTimezone.innerText = zona;
        columnaTimezone.className = 'zonas-horarias'
        columnalocatedate.innerText = new Date(date_elegida.value).toLocaleString("es-MX", { timeZone: zona });
        btn_remover.textContent = "Delete"
        fila.append(columnaTimezone, columnalocatedate, btn_remover);
        tbody.append(fila);

        btn_remover.addEventListener('click', (event) => {
            event.target.parentNode.remove()
        })
    }
}

document.querySelector('#selected_day').addEventListener('input', () => {
    input_time.value = new Date(date_elegida.value).getTime();
    zonas_seleccionadas.add(local_zone);
    generar_tabla();
})

document.querySelector('#time_stamp').addEventListener('input', () => {
    setFecha(parseInt(input_time.value));
    zonas_seleccionadas.add(local_zone);
    generar_tabla();
})

document.querySelector('#btn_agregar').addEventListener('click', () => {
    if (!isNaN(parseInt(input_time.value)) || date_elegida.input_time !== '') {
        zonas_seleccionadas.add(select.value);
        generar_tabla();
    }
})

document.querySelectorAll('.btn-set-date').forEach(boton => {
    boton.addEventListener('click', () => {
        const fecha_hoy = new Date();
        const diferencia = parseInt(boton.getAttribute("data-days"));
        fecha_hoy.setDate(fecha_hoy.getDate() + diferencia);
        setFecha(fecha_hoy);
        zonas_seleccionadas.add(local_zone);
        generar_tabla();
    })
})

function setFecha(fecha) {
    let fecha_elegida = new Date(fecha);
    let date = fecha_elegida.toISOString().slice(0, 10);
    let time = fecha_elegida.toTimeString().slice(0, 5);
    date_elegida.value = date + " " + time;
    input_time.value = fecha_elegida.getTime()
}







