// src/utils/uiUtils.js
export function actualizarVidaUI(vida) {
   const vidaContainer = document.getElementById("vida");
   if (!vidaContainer) return;
 
   // Limpiar corazones anteriores
   vidaContainer.innerHTML = "";
 
   // Limitar vida a un máximo de 3
   const vidasAMostrar = Math.min(vida, 3);
 
   // Crear los corazones según la cantidad de vida
   for (let i = 0; i < vidasAMostrar; i++) {
     const corazon = document.createElement("img");
     corazon.setAttribute("src", "assets/vida.png");
     corazon.setAttribute("alt", "Vida");
     corazon.setAttribute("width", "32"); // Puedes ajustar tamaño si lo necesitas
     corazon.setAttribute("height", "32");
     vidaContainer.appendChild(corazon);
   }
 }
 