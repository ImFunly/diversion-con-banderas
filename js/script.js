document.addEventListener("DOMContentLoaded", async function () {
  const countriesList = document.getElementById("countries-list");
  const obtenerBanderas = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3/all");
      //console.log(response);
      if (!response.ok) {
        throw new Error("Ha surgido el error " + response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la información de los países:", error);
    }
  };

  function informacionPaises(pais) {
    const contenedorInfo = document.createElement("div");
    const divInfo = document.createElement("div");
    const botonCerrar = document.createElement("button");
    const bandera = document.createElement("img");
    const capital = document.createElement("p");
    const poblacion = document.createElement("p");
    const conduccion = document.createElement("p");

    bandera.src = pais.flags[0];
    bandera.alt = `Bandera de ${pais.name}`;

    contenedorInfo.classList.add("contenedorInfo");
    divInfo.classList.add("divInfo");
    bandera.classList.add("bandera");
    botonCerrar.classList.add("botonCerrar");

    capital.innerHTML = `Capital: ${pais.capital}`;
    poblacion.textContent = `Censo de población: ${pais.population}`;
    conduccion.textContent = `Lado de la conducción: ${pais.car.side}`;
    botonCerrar.textContent = "Cerrar";

    document.body.appendChild(divInfo);
    contenedorInfo.appendChild(botonCerrar);
    contenedorInfo.appendChild(bandera);
    contenedorInfo.appendChild(capital);
    contenedorInfo.appendChild(poblacion);
    contenedorInfo.appendChild(conduccion);
    document.body.appendChild(contenedorInfo);

    botonCerrar.addEventListener("click", () => {
      contenedorInfo.remove();
    });
  }

  const infoPaises = await obtenerBanderas();
  infoPaises.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "es", {
      ignorePunctuation: true,
    })
  );

  infoPaises.forEach((pais) => {
    const bandera = document.createElement("img");
    bandera.src = pais.flags[0];
    bandera.alt = `Bandera de ${pais.name.common}`;
    bandera.classList.add("banderas");
    bandera.addEventListener("click", () => {
      informacionPaises(pais);
    });

    countriesList.appendChild(bandera);
  });
});
