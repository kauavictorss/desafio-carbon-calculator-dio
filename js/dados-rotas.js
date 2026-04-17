/**
 * Banco de Dados de Rotas
 */

const BancoRotas = {
    rotas: [
        { origem: "São Paulo, SP", destino: "Rio de Janeiro, RJ", distanciaKm: 430 },
        { origem: "São Paulo, SP", destino: "Belo Horizonte, MG", distanciaKm: 586 },
        { origem: "Rio de Janeiro, RJ", destino: "Belo Horizonte, MG", distanciaKm: 434 },
        { origem: "São Paulo, SP", destino: "Vitória, ES", distanciaKm: 882 },
        { origem: "Rio de Janeiro, RJ", destino: "Vitória, ES", distanciaKm: 521 },
        { origem: "São Paulo, SP", destino: "Campinas, SP", distanciaKm: 95 },
        { origem: "São Paulo, SP", destino: "Santos, SP", distanciaKm: 72 },
        { origem: "São Paulo, SP", destino: "Ribeirão Preto, SP", distanciaKm: 313 },
        { origem: "São Paulo, SP", destino: "Sorocaba, SP", distanciaKm: 87 },
        { origem: "Rio de Janeiro, RJ", destino: "Niterói, RJ", distanciaKm: 13 },
        { origem: "Rio de Janeiro, RJ", destino: "Petrópolis, RJ", distanciaKm: 68 },
        { origem: "Belo Horizonte, MG", destino: "Ouro Preto, MG", distanciaKm: 100 },
        { origem: "Belo Horizonte, MG", destino: "Uberlândia, MG", distanciaKm: 543 },
        { origem: "São Paulo, SP", destino: "Brasília, DF", distanciaKm: 1015 },
        { origem: "Rio de Janeiro, RJ", destino: "Brasília, DF", distanciaKm: 1148 },
        { origem: "Belo Horizonte, MG", destino: "Brasília, DF", distanciaKm: 716 },
        { origem: "Goiânia, GO", destino: "Brasília, DF", distanciaKm: 209 },
        { origem: "Curitiba, PR", destino: "Florianópolis, SC", distanciaKm: 300 },
        { origem: "Curitiba, PR", destino: "Porto Alegre, RS", distanciaKm: 711 },
        { origem: "Florianópolis, SC", destino: "Porto Alegre, RS", distanciaKm: 476 },
        { origem: "São Paulo, SP", destino: "Curitiba, PR", distanciaKm: 408 },
        { origem: "Curitiba, PR", destino: "Foz do Iguaçu, PR", distanciaKm: 637 },
        { origem: "Porto Alegre, RS", destino: "Caxias do Sul, RS", distanciaKm: 129 },
        { origem: "Salvador, BA", destino: "Recife, PE", distanciaKm: 839 },
        { origem: "Salvador, BA", destino: "Fortaleza, CE", distanciaKm: 1389 },
        { origem: "Recife, PE", destino: "Fortaleza, CE", distanciaKm: 800 },
        { origem: "Recife, PE", destino: "Natal, RN", distanciaKm: 286 },
        { origem: "Fortaleza, CE", destino: "Natal, RN", distanciaKm: 537 },
        { origem: "Salvador, BA", destino: "Aracaju, SE", distanciaKm: 356 },
        { origem: "Recife, PE", destino: "Maceió, AL", distanciaKm: 285 },
        { origem: "Salvador, BA", destino: "São Luís, MA", distanciaKm: 1597 },
        { origem: "Salvador, BA", destino: "Belo Horizonte, MG", distanciaKm: 1372 },
        { origem: "Salvador, BA", destino: "Rio de Janeiro, RJ", distanciaKm: 1649 },
        { origem: "Salvador, BA", destino: "São Paulo, SP", distanciaKm: 1962 },
        { origem: "Brasília, DF", destino: "Palmas, TO", distanciaKm: 973 },
        { origem: "Brasília, DF", destino: "Belém, PA", distanciaKm: 2120 },
        { origem: "Belém, PA", destino: "Manaus, AM", distanciaKm: 1294 },
        { origem: "Belém, PA", destino: "São Luís, MA", distanciaKm: 806 },
        { origem: "Brasília, DF", destino: "Cuiabá, MT", distanciaKm: 1133 },
        { origem: "Goiânia, GO", destino: "Cuiabá, MT", distanciaKm: 934 },
        { origem: "Campo Grande, MS", destino: "Cuiabá, MT", distanciaKm: 694 }
    ],

    obterTodasCidades: function() {
        const cidadesSet = new Set();
        this.rotas.forEach(rota => {
            cidadesSet.add(rota.origem);
            cidadesSet.add(rota.destino);
        });
        
        // Converte para array e ordena: Primeiro por Estado, depois por Cidade
        return Array.from(cidadesSet).sort((a, b) => {
            const [cidadeA, estadoA] = a.split(', ');
            const [cidadeB, estadoB] = b.split(', ');
            
            // Compara estados
            if (estadoA !== estadoB) {
                return estadoA.localeCompare(estadoB);
            }
            // Se estados forem iguais, compara cidades
            return cidadeA.localeCompare(cidadeB);
        });
    },

    buscarDistancia: function(origem, destino) {
        const origemNormalizada = origem.trim().toLowerCase();
        const destinoNormalizado = destino.trim().toLowerCase();

        const rota = this.rotas.find(r => {
            const rotaOrigem = r.origem.toLowerCase();
            const rotaDestino = r.destino.toLowerCase();
            return (
                (rotaOrigem === origemNormalizada && rotaDestino === destinoNormalizado) ||
                (rotaOrigem === destinoNormalizado && rotaDestino === origemNormalizada)
            );
        });

        return rota ? rota.distanciaKm : null;
    }
};
