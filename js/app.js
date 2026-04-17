/**
 * Arquivo Principal
 * Gerencia a inicialização, eventos e o fluxo principal da calculadora
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização da interface
    CONFIGURACAO.popularListaCidades();
    CONFIGURACAO.configurarPreenchimentoDistancia();

    const formulario = document.getElementById('calculator-form');
    if (formulario) {
        formulario.addEventListener('submit', lidarComSubmissao);
    }

    console.log('✅ Calculadora de CO₂ pronta para uso!');
});

/**
 * Lida com o evento de submissão do formulário
 * @param {Event} evento 
 */
function lidarComSubmissao(evento) {
    evento.preventDefault();

    // Captura dos elementos e valores
    const form = evento.target;
    const campos = {
        origem: document.getElementById('origin').value.trim(),
        destino: document.getElementById('destination').value.trim(),
        distancia: parseFloat(document.getElementById('distance').value),
        modoTransporte: form.querySelector('input[name="transport"]:checked').value
    };

    // Validação básica
    if (!validarEntradas(campos)) return;

    // Preparação da UI
    const botaoEnviar = form.querySelector('button[type="submit"]');
    UI.mostrarCarregando(botaoEnviar);
    UI.esconderElemento('results');
    UI.esconderElemento('comparison');
    UI.esconderElemento('carbon-credits');

    // Simulação de processamento para melhor experiência do usuário (UX)
    setTimeout(() => {
        try {
            processarCalculos(campos);
        } catch (erro) {
            console.error('❌ Erro no processamento:', erro);
            alert('Ocorreu um erro ao realizar os cálculos. Por favor, tente novamente.');
        } finally {
            UI.esconderCarregando(botaoEnviar);
        }
    }, 1200);
}

/**
 * Valida os dados de entrada do formulário
 */
function validarEntradas({ origem, destino, distancia }) {
    if (!origem || !destino) {
        alert('⚠️ Por favor, informe a origem e o destino.');
        return false;
    }
    if (isNaN(distancia) || distancia <= 0) {
        alert('⚠️ Por favor, informe uma distância válida (maior que zero).');
        return false;
    }
    return true;
}

/**
 * Executa os cálculos e atualiza a interface com os resultados
 */
function processarCalculos({ origem, destino, distancia, modoTransporte }) {
    // Execução da lógica de negócio (Calculadora)
    const emissao = Calculadora.calcularEmissao(distancia, modoTransporte);
    const emissaoCarro = Calculadora.calcularEmissao(distancia, 'car');
    
    const economia = modoTransporte !== 'car' 
        ? Calculadora.calcularEconomia(emissao, emissaoCarro) 
        : null;

    const comparacaoTodosModos = Calculadora.calcularTodosModos(distancia);
    const creditos = Calculadora.calcularCreditosCarbono(emissao);
    const precoCredito = Calculadora.estimarPrecoCredito(creditos);

    // Atualização da Interface (UI)
    const containerResultados = document.getElementById('results-content');
    const containerComparacao = document.getElementById('comparison-content');
    const containerCreditos = document.getElementById('carbon-credits-content');

    if (containerResultados) {
        containerResultados.innerHTML = UI.renderizarResultados({
            origem, destino, distancia, emissao, modo: modoTransporte, economia
        });
        UI.mostrarElemento('results');
    }

    if (containerComparacao) {
        containerComparacao.innerHTML = UI.renderizarComparacao(comparacaoTodosModos, modoTransporte);
        UI.mostrarElemento('comparison');
    }

    if (containerCreditos) {
        containerCreditos.innerHTML = UI.renderizarCreditosCarbono({
            creditos, preco: precoCredito
        });
        UI.mostrarElemento('carbon-credits');
    }

    // Scroll suave para os resultados
    UI.rolarParaElemento('results');
}
