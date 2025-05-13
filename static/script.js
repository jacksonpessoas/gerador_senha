function gerarSenha() {
    const length = parseInt(document.getElementById("length").value);
    const usarSimbolos = document.getElementById("symbols").checked;
    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const nomeCompleto = `${nome} ${sobrenome}`;
  
    fetch("/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tamanho: length,
        usar_simbolos: usarSimbolos,
        nome_usuario: nomeCompleto
      })
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById("senha-texto").textContent = data.senha;
        document.getElementById("resultado").style.display = "block";
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
      btn.style.backgroundColor = "#28a745"; // verde
      btn.style.color = "#fff";
  
      setTimeout(resetarBotaoCopiar, 2000);
    });
  }
  
  function resetarBotaoCopiar() {
    const btn = document.getElementById("copiar-btn");
    btn.textContent = "📋 Copiar Senha";
    btn.style.backgroundColor = "#00fff7";
    btn.style.color = "#000";
  }
