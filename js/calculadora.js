/**
 * Objeto Calculadora
 */

const Calculadora = {
    /**
     * Calcula a emissão de CO2
     */
    calcularEmissao: function(distancia, modoTransporte) {
        const fator = CONFIGURACAO.FATORES_EMISSAO[modoTransporte] || 0;
        return distancia * fator;
    },

    /**
     * Calcula a economia em relação ao carro
     */
    calcularEconomia: function(emissao, emissaoCarro) {
        const kgSalvos = emissaoCarro - emissao;
        const porcentagem = emissaoCarro > 0 ? (kgSalvos / emissaoCarro) * 100 : 0;
        
        return {
            kgSalvos: Math.max(0, kgSalvos),
            porcentagem: Math.max(0, porcentagem)
        };
    },

    /**
     * Calcula emissões para todos os modos
     */
    calcularTodosModos: function(distancia) {
        const emissaoCarro = this.calcularEmissao(distancia, 'car');
        
        return Object.keys(CONFIGURACAO.FATORES_EMISSAO).map(modo => {
            const emissao = this.calcularEmissao(distancia, modo);
            const porcentagemVsCarro = emissaoCarro > 0 ? (emissao / emissaoCarro) * 100 : 0;
            
            return {
                modo: modo,
                emissao: emissao,
                porcentagemVsCarro: porcentagemVsCarro
            };
        });
    },

    /**
     * Calcula créditos de carbono (1 crédito = 1000kg)
     */
    calcularCreditosCarbono: function(emissao) {
        return emissao / CONFIGURACAO.CREDITO_CARBONO.KG_POR_CREDITO;
    },

    /**
     * Estima o preço dos créditos
     */
    estimarPrecoCredito: function(creditos) {
        return {
            min: creditos * CONFIGURACAO.CREDITO_CARBONO.PRECO_MIN_BRL,
            max: creditos * CONFIGURACAO.CREDITO_CARBONO.PRECO_MAX_BRL,
            media: creditos * ((CONFIGURACAO.CREDITO_CARBONO.PRECO_MIN_BRL + CONFIGURACAO.CREDITO_CARBONO.PRECO_MAX_BRL) / 2)
        };
    },

    /**
     * Converte km para metros
     */
    converterKmParaMetros: function(distancia) {
        return distancia * 1000;
    }
};
