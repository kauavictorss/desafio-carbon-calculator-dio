/**
 * Objeto UI (Interface do Usuário)
 * Contém métodos para manipulação do DOM e renderização de resultados
 */

const UI = {
    /**
     * Formata um número com casas decimais e separadores de milhar (PT-BR)
     */
    formatarNumero: function(numero, decimais = 2) {
        return numero.toLocaleString('pt-BR', {
            minimumFractionDigits: decimais,
            maximumFractionDigits: decimais
        });
    },

    /**
     * Formata um valor como moeda brasileira (R$)
     */
    formatarMoeda: function(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Exibe um elemento removendo a classe 'hidden'
     */
    mostrarElemento: function(idElemento) {
        const elemento = document.getElementById(idElemento);
        if (elemento) {
            elemento.classList.remove('hidden');
        }
    },

    /**
     * Esconde um elemento adicionando a classe 'hidden'
     */
    esconderElemento: function(idElemento) {
        const elemento = document.getElementById(idElemento);
        if (elemento) {
            elemento.classList.add('hidden');
        }
    },

    /**
     * Rola a página suavemente até o elemento
     */
    rolarParaElemento: function(idElemento) {
        const elemento = document.getElementById(idElemento);
        if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * Renderiza a seção principal de resultados
     */
    renderizarResultados: function(dados) {
        const infoModo = CONFIGURACAO.MODOS_TRANSPORTE[dados.modo];

        let html = `
            <h2 class="section-title">📊 Resultado da Análise</h2>
            
            <div class="results__grid">
                <div class="results__card">
                    <div class="results__card-icon">🗺️</div>
                    <div class="results__card-label">Rota</div>
                    <div class="results__card-value">${dados.origem} → ${dados.destino}</div>
                </div>
                
                <div class="results__card">
                    <div class="results__card-icon">📏</div>
                    <div class="results__card-label">Distância</div>
                    <div class="results__card-value">${this.formatarNumero(dados.distancia, 0)} km</div>
                    <div class="results__card-subtitle">${this.formatarNumero(Calculadora.converterKmParaMetros(dados.distancia), 0)} metros</div>
                </div>
                
                <div class="results__card results__card--highlight">
                    <div class="results__card-icon">🌿</div>
                    <div class="results__card-label">Emissão de CO₂</div>
                    <div class="results__card-value">${this.formatarNumero(dados.emissao)} kg</div>
                </div>
                
                <div class="results__card">
                    <div class="results__card-icon">${infoModo.icon}</div>
                    <div class="results__card-label">Meio de Transporte</div>
                    <div class="results__card-value">${infoModo.label}</div>
                </div>
        `;

        if (dados.modo !== 'car' && dados.economia) {
            html += `
                <div class="results__card results__card--success">
                    <div class="results__card-icon">💚</div>
                    <div class="results__card-label">Economia vs Carro</div>
                    <div class="results__card-value">${this.formatarNumero(dados.economia.kgSalvos)} kg</div>
                    <div class="results__card-subtitle">${this.formatarNumero(dados.economia.porcentagem, 1)}% menos emissão</div>
                </div>
            `;
        }

        html += `</div>`;
        return html;
    },

    /**
     * Renderiza a comparação entre todos os meios de transporte
     */
    renderizarComparacao: function(listaModos, modoSelecionado) {
        const maxEmissao = Math.max(...listaModos.map(m => m.emissao));

        let html = `
            <h2 class="section-title">🔍 Comparação entre Transportes</h2>
            <div class="comparison__container">
        `;

        listaModos.forEach(dadosModo => {
            const infoModo = CONFIGURACAO.MODOS_TRANSPORTE[dadosModo.modo];
            const estaSelecionado = dadosModo.modo === modoSelecionado;
            const larguraBarra = maxEmissao > 0 ? (dadosModo.emissao / maxEmissao) * 100 : 0;

            let corBarra = '#10b981';
            if (dadosModo.porcentagemVsCarro > 75) corBarra = '#ef4444';
            else if (dadosModo.porcentagemVsCarro > 25) corBarra = '#f59e0b';

            html += `
                <div class="comparison__item ${estaSelecionado ? 'comparison__item--selected' : ''}">
                    <div class="comparison__header">
                        <div class="comparison__mode">
                            <span class="comparison__icon">${infoModo.icon}</span>
                            <span class="comparison__label">${infoModo.label}</span>
                        </div>
                        ${estaSelecionado ? '<span class="comparison__badge">Selecionado</span>' : ''}
                    </div>
                    
                    <div class="comparison__stats">
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">Emissão</span>
                            <span class="comparison__stat-value">${this.formatarNumero(dadosModo.emissao)} kg CO₂</span>
                        </div>
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">vs Carro</span>
                            <span class="comparison__stat-value">${this.formatarNumero(dadosModo.porcentagemVsCarro, 0)}%</span>
                        </div>
                    </div>
                    
                    <div class="comparison__bar-container">
                        <div class="comparison__bar" style="width: ${larguraBarra}%; background-color: ${corBarra};"></div>
                    </div>
                </div>
            `;
        });

        html += `
            </div>
            <div class="comparison__tip">
                <strong>💡 Dica:</strong> Optar por transportes com menor emissão de CO₂ ajuda a reduzir seu impacto ambiental!
            </div>
        `;

        return html;
    },

    /**
     * Renderiza a seção de créditos de carbono
     */
    renderizarCreditosCarbono: function(dadosCreditos) {
        return `
            <h2 class="section-title">🌳 Compensação de Carbono</h2>
            
            <div class="carbon-credits__grid">
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-header">
                        <span class="carbon-credits__icon">📜</span>
                        <h3 class="carbon-credits__card-title">Créditos Necessários</h3>
                    </div>
                    <div class="carbon-credits__card-body">
                        <div class="carbon-credits__value">${this.formatarNumero(dadosCreditos.creditos, 4)}</div>
                        <div class="carbon-credits__helper">1 crédito = 1.000 kg CO₂</div>
                    </div>
                </div>
                
                <div class="carbon-credits__card">
                    <div class="carbon-credits__card-header">
                        <span class="carbon-credits__icon">💰</span>
                        <h3 class="carbon-credits__card-title">Valor Estimado</h3>
                    </div>
                    <div class="carbon-credits__card-body">
                        <div class="carbon-credits__value">${this.formatarMoeda(dadosCreditos.preco.media)}</div>
                        <div class="carbon-credits__helper">
                            Faixa: ${this.formatarMoeda(dadosCreditos.preco.min)} - ${this.formatarMoeda(dadosCreditos.preco.max)}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="carbon-credits__action">
                <button class="carbon-credits__button" type="button">🛒 Compensar Emissões</button>
                <p class="carbon-credits__disclaimer">* Projeto demonstrativo. Valor apenas para referência.</p>
            </div>
        `;
    },

    /**
     * Exibe estado de carregamento no botão
     */
    mostrarCarregando: function(botao) {
        botao.dataset.textoOriginal = botao.innerHTML;
        botao.disabled = true;
        botao.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Remove estado de carregamento do botão
     */
    esconderCarregando: function(botao) {
        botao.disabled = false;
        botao.innerHTML = botao.dataset.textoOriginal || 'Calcular Emissão';
    }
};
