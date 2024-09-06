# Zoológico - Gerenciamento de Recintos

Este projeto é uma simulação para gerenciar a alocação de animais em diferentes recintos de um zoológico. O objetivo é verificar se os animais podem ser colocados em recintos adequados, levando em consideração o bioma, o espaço disponível e outras regras específicas de convivência entre as espécies.

## Funcionalidades

- Verifica se um recinto tem espaço suficiente para acomodar uma quantidade específica de animais.
- Garante que animais carnívoros só convivam com outros carnívoros da mesma espécie.
- Verifica a compatibilidade dos recintos com os biomas e as características dos animais.
- Impõe regras específicas para algumas espécies, como macacos e hipopótamos, para garantir o bem-estar.
- Retorna uma lista de recintos viáveis ou um erro, caso nenhum recinto seja adequado.

## Regras de Alocação

1. **Compatibilidade de Bioma**: Cada animal deve ser alocado em recintos que possuam um bioma compatível com o seu habitat natural.
2. **Carnívoros**: Animais carnívoros devem habitar somente com a própria espécie.
3. **Conforto dos Animais Existentes**: Os animais já presentes no recinto devem continuar confortáveis com a inclusão de novos animais.
4. **Hipopótamos**: Só toleram outras espécies se o recinto for do tipo savana e rio.
5. **Macacos**: Não se sentem confortáveis sozinhos em um recinto vazio; precisam de outro animal, seja da mesma espécie ou não.
6. **Espaço Extra**: Quando há mais de uma espécie no recinto, é necessário considerar um espaço extra ocupado.
7. **Lotes de Animais**: Não separar lotes de animais entre diferentes recintos.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/zoologico.git
   ```

2. Acesse o diretório do projeto:
   ```
   cd zoologico
   ```

3. Instale as dependências:
   ```
   npm install
   ```

## Como Executar os Testes

Para rodar os testes de unidade e garantir que todas as regras de alocação de animais estão sendo aplicadas corretamente, execute o seguinte comando:

```
npm test
```

Os testes cobrem uma série de cenários para validar a alocação de animais em recintos conforme as regras descritas.

## Estrutura do Projeto

```
src/
├── recintos-zoo.js        # Lógica principal do gerenciamento de recintos e alocação de animais
├── recintos-zoo.test.js   # Testes automatizados para validar a lógica de alocação
└── ...
```

- **`recintos-zoo.js`**: Contém a lógica de alocação de animais nos recintos e a verificação das regras descritas.
- **`recintos-zoo.test.js`**: Contém os testes para garantir que todas as regras de convivência e alocação de animais estão sendo aplicadas corretamente.

## Exemplos de Uso

### Analisar Recintos Disponíveis

Para verificar quais recintos são viáveis para alocar uma certa quantidade de animais de uma espécie, use a função `analisaRecintos`. 

Exemplo:

```
const { RecintosZoo } = require('./recintos-zoo');

const zoologico = new RecintosZoo();
const resultado = zoologico.analisaRecintos('MACACO', 2);

console.log(resultado);
```

Esse código retorna uma lista de recintos viáveis que podem acomodar 2 macacos.
