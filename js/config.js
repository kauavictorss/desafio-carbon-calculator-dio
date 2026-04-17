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
        bicycle: { label: "Bicicleta", icon: "🚲", color: "#10b981" },
        car: { label: "Carro", icon: "🚗", color: "#3b82f6" },
        bus: { label: "Ônibus", icon: "🚌", color: "#f59e0b" },
        truck: { label: "Caminhão", icon: "🚚", color: "#ef4444" }
    },

    CREDITO_CARBONO: {
        KG_POR_CREDITO: 1000,
        PRECO_MIN_BRL: 50,
        PRECO_MAX_BRL: 150
    },

    indicesFocados: { origin: -1, destination: -1 },

    popularListaCidades: function() {
        const cidades = BancoRotas.obterTodasCidades();
        this.renderizarDropdown('origin', cidades);
        this.renderizarDropdown('destination', cidades);
        this.configurarEventosSelecao();
        this.configurarFechamentoExterno();
        this.configurarPreenchimentoDistancia();
    },

    renderizarDropdown: function(idInput, cidades) {
        const listContainer = document.getElementById(`${idInput}-list`);
        if (!listContainer) return;

        listContainer.innerHTML = '';
        this.indicesFocados[idInput] = -1;

        cidades.forEach((cidade, index) => {
            const item = document.createElement('div');
            item.className = 'custom-select-item';
            item.textContent = cidade;
            item.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.selecionarCidade(idInput, cidade);
            };
            listContainer.appendChild(item);
        });
    },

    configurarEventosSelecao: function() {
        const inputs = ['origin', 'destination'];
        const cidadesBase = BancoRotas.obterTodasCidades();
        
        inputs.forEach(id => {
            const label = document.querySelector(`label[for="${id}"]`);
            const input = document.getElementById(id);
            const list = document.getElementById(`${id}-list`);

            const filtrarERenderizar = (termo) => {
                const filtradas = cidadesBase.filter(c => c.toLowerCase().includes(termo.toLowerCase()));
                this.renderizarDropdown(id, filtradas);
                list.classList.remove('hidden');
            };

            const aoClicar = (e) => {
                e.stopPropagation();
                const outroId = id === 'origin' ? 'destination' : 'origin';
                document.getElementById(`${outroId}-list`).classList.add('hidden');
                filtrarERenderizar(input.value);
            };

            label.addEventListener('click', aoClicar);
            input.addEventListener('click', aoClicar);

            input.addEventListener('input', (e) => {
                filtrarERenderizar(e.target.value);
                this.tentarBuscarDistancia();
            });

            input.addEventListener('keydown', (e) => {
                const itens = list.querySelectorAll('.custom-select-item');
                if (list.classList.contains('hidden') || itens.length === 0) return;

                let index = this.indicesFocados[id];

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    index = (index + 1) % itens.length;
                    this.atualizarDestaqueTeclado(itens, index, list);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    index = (index - 1 + itens.length) % itens.length;
                    this.atualizarDestaqueTeclado(itens, index, list);
                } else if (e.key === 'Enter') {
                    if (index >= 0) {
                        e.preventDefault();
                        this.selecionarCidade(id, itens[index].textContent);
                    }
                } else if (e.key === 'Escape') {
                    list.classList.add('hidden');
                }
                this.indicesFocados[id] = index;
            });
        });
    },

    atualizarDestaqueTeclado: function(itens, index, container) {
        itens.forEach(i => i.classList.remove('custom-select-item--active'));
        const itemAtivo = itens[index];
        if (itemAtivo) {
            itemAtivo.classList.add('custom-select-item--active');
            const itemBase = itemAtivo.offsetTop + itemAtivo.offsetHeight;
            if (itemBase > container.scrollTop + container.offsetHeight) {
                container.scrollTop = itemBase - container.offsetHeight;
            } else if (itemAtivo.offsetTop < container.scrollTop) {
                container.scrollTop = itemAtivo.offsetTop;
            }
        }
    },

    configurarFechamentoExterno: function() {
        document.addEventListener('click', () => {
            document.getElementById('origin-list').classList.add('hidden');
            document.getElementById('destination-list').classList.add('hidden');
        });
    },

    selecionarCidade: function(idInput, valor) {
        const input = document.getElementById(idInput);
        input.value = valor;
        document.getElementById(`${idInput}-list`).classList.add('hidden');
        // Pequeno delay para garantir que o DOM atualizou o valor do input
        setTimeout(() => this.tentarBuscarDistancia(), 10);
    },

    tentarBuscarDistancia: function() {
        const inputOrigem = document.getElementById('origin');
        const inputDestino = document.getElementById('destination');
        const inputDistancia = document.getElementById('distance');
        const checkboxManual = document.getElementById('manual-distance');
        const textoAjuda = inputDistancia.nextElementSibling;

        const origem = inputOrigem.value.trim();
        const destino = inputDestino.value.trim();

        // Se um dos campos estiver vazio, limpa a distância e sai
        if (!origem || !destino) {
            if (!checkboxManual.checked) {
                inputDistancia.value = '';
                textoAjuda.textContent = 'A distância será preenchida automaticamente';
                textoAjuda.style.color = '#6b7280';
            }
            return;
        }

        const distancia = BancoRotas.buscarDistancia(origem, destino);

        if (distancia !== null) {
            // Rota encontrada no banco de dados
            inputDistancia.value = distancia;
            if (!checkboxManual.checked) {
                inputDistancia.readOnly = true;
                textoAjuda.textContent = '✓ Distância encontrada automaticamente';
                textoAjuda.style.color = '#10b981';
            }
        } else {
            // Rota NÃO encontrada: Só libera se o usuário marcar o checkbox (conforme solicitado)
            if (!checkboxManual.checked) {
                inputDistancia.value = '';
                inputDistancia.readOnly = true;
                textoAjuda.textContent = '⚠️ Rota não automatizada. Marque "Inserir manualmente".';
                textoAjuda.style.color = '#ef4444';
            }
        }
    },

    configurarPreenchimentoDistancia: function() {
        const inputDistancia = document.getElementById('distance');
        const checkboxManual = document.getElementById('manual-distance');
        const textoAjuda = inputDistancia.nextElementSibling;

        checkboxManual.addEventListener('change', (e) => {
            if (e.target.checked) {
                inputDistancia.readOnly = false;
                inputDistancia.value = '';
                inputDistancia.focus();
                textoAjuda.textContent = 'Insira a distância manualmente';
                textoAjuda.style.color = '#6b7280';
            } else {
                inputDistancia.readOnly = true;
                this.tentarBuscarDistancia();
            }
        });
    }
};
