# 🍃 Calculadora de Emissão de CO₂

Este projeto é o desafio final de conclusão do bootcamp **CI&T - Do Prompt ao Agente**, realizado em parceria com a **DIO (Digital Innovation One)**. O objetivo é aplicar conceitos avançados de engenharia de prompt e desenvolvimento assistido por IA para criar uma solução funcional, intuitiva e tecnicamente robusta.

## 📋 Sobre o Projeto

A **Calculadora de Emissão de CO₂** permite que usuários calculem o impacto ambiental de suas viagens entre diversas cidades brasileiras. Através de um motor de cálculo híbrido, o sistema fornece dados precisos de quilometragem e sugere a compensação através de créditos de carbono, incentivando a conscientização ambiental.

### Principais Funcionalidades

-   **Busca Geográfica Inteligente**: Seletor de cidades customizado com suporte a todas as capitais brasileiras e ordenação por Estado/Cidade.
-   **Motor de Distância Híbrido**: Utiliza uma base de rotas reais e, caso a rota não exista, realiza o cálculo geográfico automático via **Fórmula de Haversine** com fator de correção rodoviária.
-   **Navegação por Teclado**: Experiência de uso otimizada com suporte a setas (`↑↓`) e `Enter` para seleção rápida.
-   **Filtro Dinâmico**: Pesquisa de cidades em tempo real conforme a digitação.
-   **Análise Comparativa**: Exibe a emissão em diferentes meios de transporte (Bicicleta, Carro, Ônibus e Caminhão).
-   **Compensação Ambiental**: Estimativa de créditos de carbono necessários para neutralizar a emissão da viagem.

## 🛠️ Stacks Utilizadas

O projeto foi desenvolvido focando em performance e simplicidade, utilizando as seguintes tecnologias:

-   **HTML5**: Estrutura semântica para melhor acessibilidade.
-   **CSS3**: Estilização moderna com variáveis (Custom Properties), Flexbox e Grid, além de animações de feedback.
-   **JavaScript (Vanilla)**: Lógica de negócio, manipulação do DOM e cálculos matemáticos sem dependência de bibliotecas externas.
-   **Engenharia de Prompt**: Utilizada durante todo o ciclo de desenvolvimento para refatoração, correção de bugs e implementação de algoritmos geográficos.

## 📂 Estrutura do Projeto

```text
desafio-carbon-calculator-dio/
├── index.html          # Estrutura principal e containers da aplicação
├── css/
│   └── style.css       # Design responsivo e estilos do seletor customizado
├── js/
│   ├── dados-rotas.js  # Banco de dados de cidades, coordenadas e lógica de Haversine
│   ├── config.js       # Configurações de fatores de CO2 e lógica de interface do form
│   ├── calculadora.js  # Regras de negócio e cálculos matemáticos
│   ├── ui.js           # Gerenciamento de renderização e componentes visuais
│   └── app.js          # Orquestrador principal e inicialização de eventos
└── README.md           # Documentação do projeto
```

## 🚀 Como Executar

Por ser um projeto puramente *front-end*, não há necessidade de instalação de dependências ou servidores complexos.

1.  Faça o clone ou download deste repositório.
2.  Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
3.  Selecione uma cidade de **Origem** e uma de **Destino**.
4.  Escolha o meio de transporte e clique em **Calcular Emissão**.

---
## 👨‍💻 Autor

<div align="center">
  <img src="https://github.com/kauavictorss.png" width="150px" style="border-radius: 50%;" alt="Kauã Victor"/>
  <br>
  <h1>Kauã Victor Silva dos Santos</h1>
  
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kauavictorss)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kaua-victor-santos/)
</div>

---
## 📝 Licença

Este projeto é para fins educacionais como parte do desafio da DIO. Sinta-se à vontade para utilizá-lo e aprimorá-lo!
