/**
 * Banco de Dados de Rotas e Inteligência Geográfica
 */

const BancoRotas = {
    // Coordenadas Geográficas (Lat, Lon) para cálculo de distâncias inexistentes
    coordenadas: {
        "Rio Branco, AC": [-9.97, -67.81], "Maceió, AL": [-9.66, -35.73], "Manaus, AM": [-3.11, -60.02],
        "Macapá, AP": [0.03, -51.06], "Salvador, BA": [-12.97, -38.50], "Fortaleza, CE": [-3.71, -38.54],
        "Brasília, DF": [-15.79, -47.88], "Vitória, ES": [-20.31, -40.31], "Goiânia, GO": [-16.68, -49.25],
        "São Luís, MA": [-2.53, -44.30], "Belo Horizonte, MG": [-19.91, -43.93], "Campo Grande, MS": [-20.44, -54.64],
        "Cuiabá, MT": [-15.59, -56.09], "Belém, PA": [-1.45, -48.50], "João Pessoa, PB": [-7.11, -34.86],
        "Recife, PE": [-8.05, -34.88], "Teresina, PI": [-5.08, -42.80], "Curitiba, PR": [-25.42, -49.27],
        "Rio de Janeiro, RJ": [-22.90, -43.17], "Natal, RN": [-5.79, -35.20], "Porto Velho, RO": [-8.76, -63.90],
        "Boa Vista, RR": [2.82, -60.67], "Porto Alegre, RS": [-30.03, -51.23], "Florianópolis, SC": [-27.59, -48.54],
        "Aracaju, SE": [-10.91, -37.07], "São Paulo, SP": [-23.55, -46.63], "Palmas, TO": [-10.16, -48.33],
        "Santos, SP": [-23.96, -46.33], "Campinas, SP": [-22.90, -47.06], "Caxias do Sul, RS": [-29.16, -51.17]
    },

    // Rotas Rodoviárias Reais (Prioridade Máxima)
    rotas: [
        { origem: "São Paulo, SP", destino: "Rio de Janeiro, RJ", distanciaKm: 435 },
        { origem: "São Paulo, SP", destino: "Belo Horizonte, MG", distanciaKm: 585 },
        { origem: "São Paulo, SP", destino: "Curitiba, PR", distanciaKm: 408 },
        { origem: "Rio de Janeiro, RJ", destino: "Belo Horizonte, MG", distanciaKm: 434 },
        { origem: "Brasília, DF", destino: "Goiânia, GO", distanciaKm: 209 }
    ],

    obterTodasCidades: function() {
        return Object.keys(this.coordenadas).sort((a, b) => {
            const estadoA = a.split(', ')[1];
            const estadoB = b.split(', ')[1];
            if (estadoA !== estadoB) return estadoA.localeCompare(estadoB);
            return a.split(', ')[0].localeCompare(b.split(', ')[0]);
        });
    },

    /**
     * Motor de busca híbrido: Rota Real -> Cálculo Geográfico -> Nulo
     */
    buscarDistancia: function(origem, destino) {
        if (origem === destino) return 0;

        const oNormal = origem.trim();
        const dNormal = destino.trim();

        // 1. Tenta achar rota real cadastrada (ida ou volta)
        const rotaReal = this.rotas.find(r => 
            (r.origem === oNormal && r.destino === dNormal) || 
            (r.origem === dNormal && r.destino === oNormal)
        );

        if (rotaReal) return rotaReal.distanciaKm;

        // 2. Se não tem rota real, calcula via Haversine (Coordenadas)
        const coordO = this.coordenadas[oNormal];
        const coordD = this.coordenadas[dNormal];

        if (coordO && coordD) {
            const distEstimada = this.calcularHaversine(coordO[0], coordO[1], coordD[0], coordD[1]);
            // Multiplicador de 1.18x para converter "linha reta" em "estrada aproximada"
            return Math.round(distEstimada * 1.18);
        }

        return null;
    },

    /**
     * Fórmula de Haversine para calcular distância entre dois pontos no globo
     */
    calcularHaversine: function(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
};
