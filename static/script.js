// function gerarSenha() {
//   const length = parseInt(document.getElementById("length").value);
//   const usarSimbolos = document.getElementById("symbols").checked;
//   const nome = document.getElementById("nome").value.trim();
//   const sobrenome = document.getElementById("sobrenome").value.trim();
//   const nomeCompleto = `${nome} ${sobrenome}`;

//   fetch("/gerar", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       tamanho: length,
//       usar_simbolos: usarSimbolos,
//       nome_usuario: nomeCompleto
//     })
//   })
//     .then(res => res.json())
//     .then(data => {
//       document.getElementById("senha-texto").textContent = data.senha;
//       document.getElementById("resultado").style.display = "block";
//       resetarBotaoCopiar();
//     })
//     .catch(err => {
//       console.error("Erro:", err);
//       document.getElementById("senha-texto").textContent = "Erro ao gerar senha.";
//     });
// }

// function copiarSenha() {
//   const senha = document.getElementById("senha-texto").textContent;
//   if (!senha || senha === "Sua senha aparecerá aqui") return;

//   navigator.clipboard.writeText(senha).then(() => {
//     const btn = document.getElementById("copiar-btn");
//     btn.textContent = "✅ Senha copiada!";
//     btn.style.backgroundColor = "#28a745"; // verde
//     btn.style.color = "#fff";

//     setTimeout(resetarBotaoCopiar, 2000);
//   });
// }

// function resetarBotaoCopiar() {
//   const btn = document.getElementById("copiar-btn");
//   btn.textContent = "📋 Copiar Senha";
//   btn.style.backgroundColor = "#00fff7";
//   btn.style.color = "#000";
// }





// document.getElementById("gerar-btn").addEventListener("click", function () {
//   fetch("/gerar", {
//     method: "POST",
//     body: new FormData(document.getElementById("form")),
//   })
//     .then(response => response.json())
//     .then(data => {
//       const senhaBox = document.getElementById("senha-box");
//       const copiarBtn = document.getElementById("copiar-btn");

//       senhaBox.innerText = data.senha;
//       senhaBox.style.display = "block";
//       senhaBox.classList.remove("fade-in"); // reinicia animação
//       void senhaBox.offsetWidth; // truque para reiniciar
//       senhaBox.classList.add("fade-in");

//       copiarBtn.style.display = "block";
//       copiarBtn.classList.remove("copiado");
//       copiarBtn.innerText = "Copiar Senha";
//     });
// });

// document.getElementById("copiar-btn").addEventListener("click", function () {
//   const senha = document.getElementById("senha-box").innerText;
//   navigator.clipboard.writeText(senha).then(() => {
//     const copiarBtn = document.getElementById("copiar-btn");
//     copiarBtn.classList.add("copiado");
//     copiarBtn.innerText = "Senha copiada!";
//     setTimeout(() => {
//       copiarBtn.classList.remove("copiado");
//       copiarBtn.innerText = "Copiar Senha";
//     }, 2000);
//   });
// });








function gerarSenha() {
  const length = parseInt(document.getElementById("length").value);
  const usarSimbolos = document.getElementById("symbols").checked;
  // const nome = document.getElementById("nome").value.trim();
  // const sobrenome = document.getElementById("sobrenome").value.trim();
  // const nomeCompleto = `${nome} ${sobrenome}`;

  fetch("/gerar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tamanho: length,
      usar_simbolos: usarSimbolos
      // nome_usuario: nomeCompleto
    })
  })
    .then(res => res.json())
    .then(data => {
      const senhaBox = document.getElementById("resultado");
      const senhaTexto = document.getElementById("senha-texto");

      senhaTexto.textContent = data.senha;

      // Mostra a caixa e reinicia a animação
      senhaBox.style.display = "block";
      senhaBox.classList.remove("fade-in");
      void senhaBox.offsetWidth; // reinicia a animação
      senhaBox.classList.add("fade-in");

      resetarBotaoCopiar();
    })
    .catch(err => {
      console.error("Erro:", err);
      document.getElementById("senha-texto").textContent = "Erro ao gerar senha.";
    });
}

function copiarSenha() {
  const senha = document.getElementById("senha-texto").textContent;
  if (!senha || senha === "Sua senha aparecerá aqui") return;

  navigator.clipboard.writeText(senha).then(() => {
    const btn = document.getElementById("copiar-btn");
    btn.textContent = "✅ Senha copiada!";
    btn.classList.add("copiado");

    setTimeout(resetarBotaoCopiar, 2000);
  });
}

function resetarBotaoCopiar() {
  const btn = document.getElementById("copiar-btn");
  btn.textContent = "📋 Copiar Senha";
  btn.classList.remove("copiado");
}
