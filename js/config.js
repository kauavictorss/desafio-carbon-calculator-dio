/**
 * Objeto de Configuração
 */

const CONFIGURACAO = {
    FATORES_EMISSAO: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    MODOS_TRANSPORTE: {
        bicycle: {
            label: "Bicicleta",
            icon: "🚲",
            color: "#10b981"
        },
        car: {
            label: "Carro",
            icon: "🚗",
            color: "#3b82f6"
        },
        bus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#f59e0b"
        },
        truck: {
            label: "Caminhão",
            icon: "🚚",
            color: "#ef4444"
        }
    },

    CREDITO_CARBONO: {
        KG_POR_CREDITO: 1000,
        PRECO_MIN_BRL: 50,
        PRECO_MAX_BRL: 150
    },

    popularListaCidades: function() {
        const cidades = BancoRotas.obterTodasCidades();
        const datalist = document.getElementById('cities-list');

        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade;
            datalist.appendChild(option);
        });
    },

    configurarPreenchimentoDistancia: function() {
        const inputOrigem = document.getElementById('origin');
        const inputDestino = document.getElementById('destination');
        const inputDistancia = document.getElementById('distance');
        const checkboxManual = document.getElementById('manual-distance');
        const textoAjuda = inputDistancia.nextElementSibling;

        // Ao clicar nos campos, limpa o valor para mostrar as opções ordenadas (Melhor UX)
        const abrirOpcoes = (e) => {
            if (e.target.value !== "") {
                e.target.value = "";
                inputDistancia.value = "";
            }
        };

        inputOrigem.addEventListener('click', abrirOpcoes);
        inputDestino.addEventListener('click', abrirOpcoes);

        const tentarBuscarDistancia = () => {
            const origem = inputOrigem.value.trim();
            const destino = inputDestino.value.trim();

            if (origem && destino) {
                const distancia = BancoRotas.buscarDistancia(origem, destino);

                if (distancia !== null) {
                    inputDistancia.value = distancia;
                    inputDistancia.readOnly = true;
                    textoAjuda.textContent = '✓ Distância encontrada automaticamente';
                    textoAjuda.style.color = '#10b981';
                } else {
                    inputDistancia.value = '';
                    textoAjuda.textContent = 'Rota não encontrada. Por favor, marque a opção para inserir manualmente.';
                    textoAjuda.style.color = '#ef4444';
                }
            }
        };

        inputOrigem.addEventListener('change', tentarBuscarDistancia);
        inputDestino.addEventListener('change', tentarBuscarDistancia);

        checkboxManual.addEventListener('change', function() {
            if (this.checked) {
                inputDistancia.readOnly = false;
                inputDistancia.focus();
                textoAjuda.textContent = 'Insira a distância manualmente';
                textoAjuda.style.color = '#6b7280';
            } else {
                textoAjuda.textContent = 'A distância será preenchida automaticamente';
                textoAjuda.style.color = '#6b7280';
                tentarBuscarDistancia();
            }
        });
    }
};
