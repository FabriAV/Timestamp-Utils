const date_elegida = document.querySelector('#selected_day');
const input_ISO = document.querySelector('#selected_ISO');
const input_time = document.querySelector('#time_stamp');
const TimeZones = Intl.supportedValuesOf('timeZone');
const tbody = document.querySelector('#informacion');
const select = document.querySelector('#zonas');
const local_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const zonas_seleccionadas = new Set(JSON.parse(localStorage.getItem("selectedTimezones") || '["America/Lima"]'));
const svg = '<svg class="w-4 h-4 text-gray-800 dark:text-white hover:text-cyan-800   " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/></svg>';

for (const zone of TimeZones) {
    let opcion = document.createElement("option");
    opcion.innerText = zone;
    select.append(opcion);
}

function generar_tabla() {
    tbody.innerHTML = "";
    for (const zona of zonas_seleccionadas) {
        let fila = document.createElement("tr");
        let div_fila = document.createElement("div");
        div_fila.classList.add("py-1")
        let columnaTimezone = document.createElement("td");
        let columna_delete = document.createElement("td");
        let parrafo1 = document.createElement("p");
        let parrafo2 = document.createElement("p");
        let btn_remover = document.createElement("div");
        btn_remover.classList.add("cursor-pointer");
        btn_remover.addEventListener('click', () => {
            quitarZona(zona);
        })
        parrafo1.innerText = zona;
        parrafo1.classList.add("font-light", "text-[0.78rem]", "text-cyan-600");
        parrafo2.innerText = new Date(date_elegida.value).toLocaleString("es-MX", { timeZone: zona })
        parrafo2.classList.add("md:text-[0.9rem]","text-[0.8rem]");
        div_fila.append(parrafo1, parrafo2);
        columnaTimezone.append(div_fila);
        btn_remover.innerHTML = svg;
        btn_remover.classList.add("hover:scale-110", "transition-all", "duration-200");
        btn_remover.style.justifyContent = "center";
        btn_remover.style.display = "flex";
        columna_delete.append(btn_remover);
        fila.append(columnaTimezone, columna_delete);
        tbody.append(fila);
    }
}

document.querySelector('#selected_day').addEventListener('input', () => {
    input_time.value = new Date(date_elegida.value).getTime();
    input_ISO.value = new Date(date_elegida.value).toISOString();
    generar_tabla();
})

document.querySelector('#time_stamp').addEventListener('input', () => {
    setFecha(parseInt(input_time.value));
    input_ISO.value = new Date(parseInt(input_time.value)).toISOString();
    generar_tabla();
})

document.querySelector('#selected_ISO').addEventListener('input', () => {
    input_time.value = new Date(input_ISO.value).getTime();
    setFecha(parseInt(input_time.value));
    generar_tabla();
})

document.querySelector('#btn_agregar').addEventListener('click', () => {
    if (date_elegida.value !== '' && select.value !== select[0].value) {
        zonas_seleccionadas.add(select.value);
        localStorage.setItem("selectedTimezones", JSON.stringify([...zonas_seleccionadas]));
        generar_tabla();
    }
})

document.querySelectorAll('.btn-set-date').forEach(boton => {
    boton.addEventListener('click', () => {
        const fecha_hoy = new Date();
        const diferencia = parseInt(boton.getAttribute("data-days"));
        fecha_hoy.setDate(fecha_hoy.getDate() + diferencia);
        setFecha(fecha_hoy);
        input_ISO.value = new Date(fecha_hoy).toISOString();
        generar_tabla();
    })
})

document.querySelector('#copy_timestamp').addEventListener('click', () => {
    navigator.clipboard.writeText(input_time.value);
})

function setFecha(fecha) {
    let fecha_elegida = new Date(fecha);
    let date = fecha_elegida.toISOString().slice(0, 10);
    let time = fecha_elegida.toTimeString().slice(0, 5);
    date_elegida.value = date + " " + time;
    input_time.value = fecha_elegida.getTime()
}

function quitarZona(time_zone) {
    zonas_seleccionadas.delete(time_zone);
    localStorage.setItem("selectedTimezones", JSON.stringify([...zonas_seleccionadas]));
    generar_tabla();
}







