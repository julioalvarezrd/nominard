document.getElementById('calcular').addEventListener('click', function () {


    const salario = parseFloat(document.getElementById('salario').value);

    if (isNaN(salario)) {

        const resultadoHTML = `
            <div class="alert alert-warning" role="alert">Por favor, ingrese un número válido como salario.</div>
        `;

        document.getElementById('erroringreso').innerHTML = resultadoHTML;

    } else {


        const tasaARSS = 0.0304; // Tasa de ARS (Seguro Nacional de Salud)
        const tasaAFP = 0.0287; // Tasa de AFP (Pensiones)
        const excedenteISR1 = 416220.01;
        const excedenteISR2 = 624329.01;
        const excedenteISR3 = 867123.01;

        let deduccionARSS = salario * tasaARSS;
        let deduccionAFP = salario * tasaAFP;

        let baseImponible = (salario - deduccionARSS - deduccionAFP) * 12;
        let impuestoISR = 0;

        if (baseImponible > excedenteISR3) {
            impuestoISR = (((baseImponible - excedenteISR3) * 0.25) + 79776) / 12;
        }

        else if (baseImponible > excedenteISR2) {
            impuestoISR = (((baseImponible - excedenteISR2) * 0.20) + 31216) / 12;
        }

        else if (baseImponible > excedenteISR1) {
            impuestoISR = (baseImponible - excedenteISR1) * 0.15 / 12;
        }

        const totalDeducciones = deduccionARSS + deduccionAFP + impuestoISR;
        const salarioNetoMensual = salario - totalDeducciones;
        const salarioNetoQuincenal = salarioNetoMensual / 2;
        const salarioBrutoQuincenal = salario / 2;

        //const resultadoHTML = `
        //<h2 align="center">Detalles de la Nómina</h2> 
        // <p>Salario Bruto Mensual: ${salario.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>
        // <p>Salario Bruto Quincenal: ${salarioBrutoQuincenal.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>
        // <p>Seguro (ARS): ${deduccionARSS.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>
        // <p>Pensiones (AFP): ${deduccionAFP.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>
        // <p>Impuesto Sobre la Renta (ISR): ${impuestoISR.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>
        // <p>Total de Deducciones: ${totalDeducciones.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>
        // <p>Salario Neto Mensual: ${salarioNetoMensual.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>
        // <p>Salario Neto Quincenal: ${salarioNetoQuincenal.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}</p>

        //`;

        const resultadoHTML = `
    `;

        document.getElementById("AFPMensual").innerHTML = deduccionARSS.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
        document.getElementById("SFSMensual").innerHTML = deduccionAFP.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
        document.getElementById("ISRMensual").innerHTML = impuestoISR.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
        document.getElementById("Deducciones").innerHTML = totalDeducciones.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
        document.getElementById("SalarioNeto").innerHTML = salarioNetoMensual.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })
        document.getElementById("Quincenal").innerHTML = salarioNetoQuincenal.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })
        document.getElementById('erroringreso').innerHTML = ''; //Quita advertenvcia de error 
        document.getElementById('resultado').innerHTML = resultadoHTML;
    }

    // Agrega el botón en tu archivo JavaScript usando innerHTML
    document.getElementById('resultado').innerHTML += `
        <div class="text-center mt-3">
        <button id="limpiarResultadosBtn" class="btn btn-danger mt-3">Limpiar Resultados</button>
        </div>
        `;

    // Agrega un evento de clic al botón
    document.getElementById('limpiarResultadosBtn').addEventListener('click', function () {
        document.getElementById('salario').value = ''; // Limpia el campo de salario
        document.getElementById('AFPMensual').innerHTML = ''; // Limpia la sección de resultados
        document.getElementById("SFSMensual").innerHTML = '';
        document.getElementById("ISRMensual").innerHTML = '';
        document.getElementById("Deducciones").innerHTML = '';
        document.getElementById("SalarioNeto").innerHTML = '';
        document.getElementById("Quincenal").innerHTML = '';
        document.getElementById('resultado').innerHTML = '';
        document.getElementById('erroringreso').innerHTML = ''; // Quita advertencia de error 
    });
});
