// src/utils/uiUtils.js
export function actualizarVidaUI(vida) {
    const vidaSpan = document.getElementById("vida");
    if (vidaSpan) {
      vidaSpan.textContent = vida;
    }
  }
  