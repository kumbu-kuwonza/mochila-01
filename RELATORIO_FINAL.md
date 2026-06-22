# Programação Dinâmica Aplicada ao Problema da Mochila 0/1

**Disciplina:** Projeto e Análise de Algoritmos  
**Curso:** Ciência da Computação / Engenharia de Software – UFC – Campus de Russas  
**Autor:** Kumbu Gomes Kuwonza  
**Data:** Junho de 2026

---

## 1. Introdução

A disciplina de Projeto e Análise de Algoritmos ocupa posição central na formação de estudantes de Ciência da Computação e Engenharia de Software, pois fornece as ferramentas conceituais e analíticas necessárias para projetar soluções computacionais eficientes diante de problemas com alto custo combinatório. Entre as diversas técnicas estudadas ao longo do curso, a Programação Dinâmica destaca-se por sua elegância e capacidade de transformar problemas aparentemente intratáveis em tarefas computacionalmente viáveis, por meio do reaproveitamento inteligente de resultados intermediários.

O presente trabalho tem como objetivo investigar a aplicação da técnica de Programação Dinâmica ao clássico problema da Mochila 0/1 (0/1 Knapsack Problem), um dos problemas canônicos da otimização combinatória. Busca-se, por meio deste estudo, consolidar a compreensão teórica dos fundamentos da Programação Dinâmica e, simultaneamente, demonstrar sua aplicação prática por meio de implementações funcionais na linguagem JavaScript. O texto percorre desde a fundamentação matemática da técnica até a análise de desempenho de diferentes estratégias de codificação, passando pela exemplificação com cenários realistas de logística e gestão de recursos.

O relatório está organizado em seis seções principais. A Seção 2 estabelece a fundamentação teórica, cobrindo os conceitos gerais da Programação Dinâmica, suas duas abordagens clássicas de implementação e a formulação do problema da Mochila 0/1. A Seção 3 descreve o desenvolvimento prático realizado, incluindo a definição da recorrência, a construção passo a passo da tabela de soluções e as implementações em JavaScript com exemplos de execução. A Seção 4 apresenta a análise da complexidade computacional do algoritmo desenvolvido. A Seção 5 discute aplicações do problema da Mochila em sistemas reais. Por fim, a Seção 6 sintetiza os principais aprendizados e aponta direções para trabalhos futuros.

---

## 2. Fundamentação Teórica

### 2.1. Programação Dinâmica: Conceitos Gerais

A Programação Dinâmica (do inglês *Dynamic Programming*, abreviada como DP) é uma técnica algorítmica de otimização cuja ideia central reside em decompor um problema complexo em subproblemas menores, resolvê-los uma única vez e armazenar seus resultados para consulta futura, evitando assim a recomputação redundante. Ao contrário do que o nome sugere, o termo não se refere a uma forma de programar computadores, mas sim ao sentido matemático de "programação" como planejamento ou tomada de decisão sequencial. A técnica é particularmente eficaz quando o espaço de busca é exponencial, mas pode ser reduzido por meio do reaproveitamento de soluções intermediárias, transformando problemas aparentemente intratáveis em soluções de complexidade polinomial ou pseudo-polinomial.

A origem da Programação Dinâmica remonta à década de 1950, com os trabalhos seminais do matemático americano Richard Bellman, que cunhou o termo enquanto desenvolvia métodos para problemas de decisão multiestágio na RAND Corporation. Bellman formulou o que hoje conhecemos como o Princípio da Otimalidade, segundo o qual "uma política ótima tem a propriedade de que, quaisquer que sejam o estado inicial e a decisão inicial, as decisões restantes devem constituir uma política ótima em relação ao estado resultante da primeira decisão". Esse princípio estabeleceu as bases teóricas para o que viria a se tornar uma das técnicas mais poderosas da ciência da computação, com aplicações que vão da bioinformática à inteligência artificial.

Duas características fundamentais determinam se um problema pode ser resolvido por Programação Dinâmica: a **sobreposição de subproblemas** e a **subestrutura ótima**. A sobreposição de subproblemas ocorre quando, ao decompor recursivamente o problema original, os mesmos subproblemas menores são gerados repetidamente — fenômeno que não ocorre, por exemplo, na ordenação por *merge sort*, em que cada subproblema é distinto. Já a subestrutura ótima é a propriedade que garante que a solução ótima do problema original pode ser construída a partir das soluções ótimas de seus subproblemas, permitindo a composição de respostas sem a necessidade de reavaliar decisões anteriores.

A diferença essencial entre Programação Dinâmica e a técnica de divisão-e-conquista reside justamente na natureza dos subproblemas. Na divisão-e-conquista, os subproblemas são independentes e disjuntos — pense no *quicksort* ou na busca binária —, de modo que cada subproblema é resolvido recursivamente exatamente uma vez. Na Programação Dinâmica, os subproblemas se sobrepõem, e resolvê-los repetidamente sem memorização resultaria em explosão combinatória. A DP resolve essa ineficiência armazenando resultados em estruturas de dados (tipicamente tabelas ou matrizes) e consultando-os quando necessário, um *trade-off* deliberado de espaço por tempo. A técnica deve ser empregada sempre que o problema exibir as duas propriedades mencionadas e o espaço de estados for gerenciável em memória.

### 2.2. Memoização e Tabelamento

A Programação Dinâmica admite duas estratégias clássicas de implementação, que diferem fundamentalmente na ordem em que os subproblemas são visitados. A primeira, conhecida como **memoização** (do inglês *memoization*), adota uma perspectiva *top-down*: parte-se do problema original e recorre-se aos subproblemas menores conforme necessário, armazenando os resultados em uma estrutura de cache — tipicamente um dicionário ou vetor indexado — de modo que cada subproblema seja resolvido no máximo uma vez. A principal vantagem da memoização é sua elegância conceitual: a implementação segue naturalmente a definição recursiva do problema, preservando a clareza do raciocínio matemático original. Além disso, a memoização resolve apenas os subproblemas estritamente necessários para a solução do problema original — se determinados estados nunca são visitados, seus valores jamais são computados. A desvantagem reside no *overhead* das chamadas recursivas, que consomem espaço na pilha de execução e podem causar estouro de pilha para problemas com profundidade de recursão elevada.

A segunda estratégia, denominada **tabelamento** (do inglês *tabulation*), segue uma lógica *bottom-up*: os subproblemas são resolvidos em ordem crescente de tamanho, a partir dos casos base, preenchendo-se iterativamente uma tabela que contém as soluções intermediárias. A grande vantagem do tabelamento é a eliminação completa do *overhead* de recursão: a execução é puramente iterativa, não havendo risco de estouro de pilha, e o padrão de acesso à memória tende a ser mais favorável ao cache do processador. Como desvantagem, o tabelamento tipicamente computa todos os subproblemas do espaço de estados, mesmo aqueles que não seriam necessários para responder à consulta original. Na prática educacional e em competições de programação, o tabelamento é mais comum por sua previsibilidade e por evitar problemas com limites de recursão.

### 2.3. O Problema da Mochila 0/1

O problema da Mochila 0/1 é um dos mais estudados na literatura de otimização combinatória e pertence à classe dos problemas NP-difíceis. Sua formulação clássica é notavelmente simples: dados *n* itens, cada qual com um peso *w_i* e um valor *v_i*, e uma mochila com capacidade máxima *W*, deseja-se selecionar um subconjunto de itens cujo peso total não exceda *W* e cujo valor total seja o maior possível. O qualificador "0/1" indica que cada item pode ser incluído no máximo uma vez — ou seja, trata-se de uma decisão binária: levar ou não levar o item. Formalmente, o problema pode ser expresso como:

> Maximizar **Σ(v_i · x_i)** para *i* de 1 a *n*,  
> sujeito a **Σ(w_i · x_i) ≤ W**, com **x_i ∈ {0, 1}**

A relevância deste problema no contexto acadêmico e industrial é imensa. Na disciplina de Projeto e Análise de Algoritmos, o problema da mochila 0/1 serve como exemplo paradigmático para o ensino de Programação Dinâmica porque exibe com clareza as duas propriedades fundamentais da técnica: a subestrutura ótima (a decisão sobre levar ou não o item *n* reduz o problema a uma instância com *n*−1 itens e capacidade reduzida ou mantida) e a sobreposição de subproblemas (diferentes combinações de decisões levam às mesmas perguntas sobre subconjuntos de itens com capacidades residuais idênticas). Além disso, o problema ilustra de forma didática a diferença entre complexidade exponencial (força bruta), complexidade pseudo-polinomial (DP) e a falibilidade de algoritmos gulosos.

Para ilustrar o problema, considere uma transportadora que dispõe de um veículo com capacidade para 8 toneladas e precisa decidir quais fretes aceitar dentre quatro opções disponíveis, conforme a Tabela 1. O objetivo é maximizar a receita total sem exceder a capacidade do veículo.

**Tabela 1: Dados do exemplo didático — fretes disponíveis**

| Item | Peso (ton) | Valor (R$) |
|------|------------|-------------|
| 1    | 2          | 3.000       |
| 2    | 3          | 4.000       |
| 3    | 4          | 5.000       |
| 4    | 5          | 6.000       |

A simplicidade enunciativa do problema da Mochila esconde sua complexidade computacional. Uma abordagem ingênua por força bruta exigiria a enumeração de todos os 2^*n* subconjuntos possíveis de itens, resultando em complexidade exponencial *O*(2^*n*). Para *n* = 50, isso representaria aproximadamente 10^15 combinações, tornando a abordagem inviável mesmo nos computadores mais velozes disponíveis atualmente. Um algoritmo guloso que seleciona itens em ordem decrescente de valor por unidade de peso, embora frequentemente produza boas aproximações, não garante a solução ótima — um contraexemplo simples com apenas dois itens é suficiente para demonstrar sua falibilidade. É nesse contexto que a Programação Dinâmica se revela como a ferramenta ideal: ela é capaz de encontrar a solução exata em tempo pseudo-polinomial *O*(*n* · *W*), desde que *W* não seja excessivamente grande.

---

## 3. Desenvolvimento Prático

### 3.1. Estrutura da Solução via DP

A aplicação da Programação Dinâmica ao problema da Mochila 0/1 fundamenta-se na observação de que o problema exibe tanto a subestrutura ótima quanto a sobreposição de subproblemas. A subestrutura ótima manifesta-se da seguinte forma: ao considerar o *i*-ésimo item, a decisão ótima sobre incluí-lo ou não depende exclusivamente da melhor solução para os *i*−1 itens anteriores com a capacidade remanescente apropriada. Não é necessário reconsiderar decisões já tomadas sobre itens anteriores, pois a solução ótima para o subconjunto menor já incorpora as melhores escolhas possíveis até aquele ponto.

A sobreposição de subproblemas torna-se evidente quando se observa que, durante a exploração do espaço de soluções, o mesmo par (*i*, *w*) — ou seja, a mesma combinação de "quantos itens considerar" e "quanta capacidade resta" — é visitado repetidamente por diferentes caminhos de decisão. Para *n* itens e capacidade *W*, existem exatamente (*n*+1) · (*W*+1) estados distintos no espaço de busca, o que representa uma drástica redução em relação aos 2^*n* subconjuntos que seriam examinados por força bruta, desde que *W* seja polinomial no tamanho da entrada.

### 3.2. Definição da Recorrência

Seja *dp*[*i*][*w*] o valor máximo que pode ser obtido considerando os primeiros *i* itens (de 1 a *i*) e uma mochila com capacidade *w*. A relação de recorrência que governa a solução é dada por:

> *dp*[*i*][*w*] = max{ *dp*[*i*−1][*w*], *dp*[*i*−1][*w*−*w_i*] + *v_i* },   se *w_i* ≤ *w*  
> *dp*[*i*][*w*] = *dp*[*i*−1][*w*],   caso contrário

A interpretação da recorrência é direta. Para cada item *i* e cada capacidade *w*, existem duas possibilidades: **não incluir** o item *i*, caso em que o valor máximo é simplesmente a melhor solução para os *i*−1 itens anteriores com a mesma capacidade *w*; ou **incluir** o item *i* (se seu peso o permitir), somando seu valor *v_i* à melhor solução para os itens anteriores com capacidade reduzida em *w_i*. O valor ótimo para o estado (*i*, *w*) é o máximo entre essas duas alternativas.

Os casos base da recorrência são fundamentais para a correta inicialização da tabela:

> *dp*[0][*w*] = 0, para todo *w* ≥ 0 (sem itens, valor zero)  
> *dp*[*i*][0] = 0, para todo *i* ≥ 0 (sem capacidade, valor zero)

### 3.3. Construção da Tabela e Reconstrução da Solução

Retomando o exemplo didático da transportadora com 4 fretes (Tabela 1) e capacidade de 8 toneladas, a Tabela 2 apresenta a matriz DP completa resultante da aplicação da recorrência. Cada célula (*i*, *w*) contém o valor máximo atingível com os primeiros *i* itens e capacidade *w*.

**Tabela 2: Matriz DP para o exemplo da transportadora (n = 4, W = 8)**

| *i* \ *w* | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-----------|---|---|---|---|---|---|---|---|---|
| 0         | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 (item 1)| 0 | 0 | 3 | 3 | 3 | 3 | 3 | 3 | 3 |
| 2 (item 2)| 0 | 0 | 3 | 4 | 4 | 7 | 7 | 7 | 7 |
| 3 (item 3)| 0 | 0 | 3 | 4 | 5 | 7 | 8 | 9 | 9 |
| 4 (item 4)| 0 | 0 | 3 | 4 | 5 | 7 | 8 | 9 | 10 |

O preenchimento da tabela procede linha por linha, da esquerda para a direita. A célula *dp*[4][8] = 10 indica que o valor máximo que pode ser obtido com os 4 itens e capacidade 8 é R$ 10.000,00.

A etapa seguinte e igualmente importante é a **reconstrução da solução** — determinar quais itens compõem o conjunto ótimo. Para isso, emprega-se a técnica de *backtracking*, que percorre a tabela DP da última célula em direção aos casos base. O processo funciona da seguinte forma:

1. Inicia-se em *i* = *n* e *w* = *W* (célula *dp*[4][8])
2. Se *dp*[*i*][*w*] ≠ *dp*[*i*−1][*w*], o item *i* foi incluído; registra-se o item e atualiza-se *w* = *w* − *w_i*
3. Caso contrário, o item não foi incluído; prossegue-se para *dp*[*i*−1][*w*]
4. Repete-se até que *i* = 0

Aplicando ao nosso exemplo: partindo de *dp*[4][8] = 10, compara-se com *dp*[3][8] = 9. Como são diferentes, o item 4 foi incluído. Subtrai-se seu peso (5): *w* ← 8 − 5 = 3. Em *dp*[3][3] = 4, compara-se com *dp*[2][3] = 4. São iguais: item 3 não foi incluído. Em *dp*[2][3] = 4, compara-se com *dp*[1][3] = 3. Diferentes: item 2 foi incluído. Subtrai-se seu peso (3): *w* ← 3 − 3 = 0. Capacidade esgotada, o item 1 não foi incluído. A solução ótima é, portanto, o conjunto **{item 2, item 4}**, com peso total 3 + 5 = 8 toneladas e valor R$ 10.000,00, utilizando 100% da capacidade disponível.

### 3.4. Implementação em JavaScript

A implementação foi desenvolvida em JavaScript para execução em ambiente Node.js, escolha que se justifica pela acessibilidade da linguagem, pela facilidade de prototipação e pela ampla disponibilidade do runtime. O código-fonte completo está disponível no arquivo `knapsack.js` e está organizado em duas funções principais de solução, uma função auxiliar de exibição, e um conjunto de exemplos de execução. Adicionalmente, foi desenvolvida uma interface web interativa no arquivo `index.html` para visualização passo a passo.

Cada versão da solução recebe como parâmetros o vetor de pesos, o vetor de valores e a capacidade da mochila, retornando um objeto com o valor máximo encontrado e o vetor de índices dos itens selecionados. A reconstrução da solução (backtracking) foi incorporada em ambas as versões, permitindo que o usuário não apenas conheça o valor ótimo, mas também saiba precisamente quais itens o compõem.

#### 3.4.1. Versão Matricial — O(n · W)

A primeira versão (`mochila01`) implementa o tabelamento clássico com uma matriz bidimensional de dimensões (*n*+1) × (*W*+1). O preenchimento da tabela ocorre em dois laços aninhados: o laço externo percorre os itens (de 1 a *n*) e o laço interno percorre as capacidades (de 0 a *W*). Para cada par (*i*, *w*), aplica-se a recorrência definida na Seção 3.2:

```javascript
function mochila01(pesos, valores, capacidade) {
  const n = pesos.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacidade + 1).fill(0));
  const keep = Array.from({ length: n + 1 }, () => Array(capacidade + 1).fill(false));

  for (let i = 1; i <= n; i++) {
    const pesoItem  = pesos[i - 1];
    const valorItem = valores[i - 1];

    for (let w = 0; w <= capacidade; w++) {
      if (pesoItem <= w) {
        const semItem = dp[i - 1][w];
        const comItem = dp[i - 1][w - pesoItem] + valorItem;

        if (comItem > semItem) {
          dp[i][w]   = comItem;
          keep[i][w] = true;
        } else {
          dp[i][w] = semItem;
        }
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Reconstrução da solução (backtracking)
  const itensSelecionados = [];
  let w = capacidade;
  for (let i = n; i >= 1; i--) {
    if (keep[i][w]) {
      itensSelecionados.push(i - 1);
      w -= pesos[i - 1];
    }
  }
  itensSelecionados.reverse();

  return {
    valorMaximo: dp[n][capacidade],
    itensSelecionados
  };
}
```

Uma matriz booleana auxiliar `keep` de mesmas dimensões registra, para cada estado (*i*, *w*), se o item *i* foi incluído na solução ótima daquele subproblema. Essa informação é essencial para a etapa de reconstrução por backtracking.

#### 3.4.2. Versão Otimizada — O(W) de espaço

A segunda versão (`mochila01Otimizada`) explora uma otimização de espaço bem conhecida na literatura: como cada linha *i* da tabela DP depende exclusivamente da linha *i*−1, não é necessário armazenar a matriz completa. Basta um vetor unidimensional de tamanho *W*+1, que é atualizado iterativamente para cada novo item:

```javascript
function mochila01Otimizada(pesos, valores, capacidade) {
  const n = pesos.length;
  const dp = Array(capacidade + 1).fill(0);
  const keep = Array.from({ length: n + 1 }, () => Array(capacidade + 1).fill(false));

  for (let i = 1; i <= n; i++) {
    const pesoItem  = pesos[i - 1];
    const valorItem = valores[i - 1];

    for (let w = capacidade; w >= pesoItem; w--) {
      const comItem = dp[w - pesoItem] + valorItem;
      if (comItem > dp[w]) {
        dp[w]      = comItem;
        keep[i][w] = true;
      }
    }
  }

  // Reconstrução (igual à versão matricial)
  const itensSelecionados = [];
  let w = capacidade;
  for (let i = n; i >= 1; i--) {
    if (keep[i][w]) {
      itensSelecionados.push(i - 1);
      w -= pesos[i - 1];
    }
  }
  itensSelecionados.reverse();

  return {
    valorMaximo: dp[capacidade],
    itensSelecionados
  };
}
```

O aspecto crucial da implementação é que o laço interno percorre as capacidades em **ordem decrescente** (de *W* até *pesoItem*). Se o laço fosse executado em ordem crescente, um mesmo item poderia ser incluído múltiplas vezes, convertendo o problema em uma Mochila Ilimitada. A matriz `keep` ainda é mantida para permitir a reconstrução da solução.

#### 3.4.3. Exemplos de Execução

Foram preparados quatro cenários de execução que demonstram a versatilidade da solução em diferentes contextos práticos. A Tabela 3 resume os dados de entrada e os resultados obtidos em cada cenário, com base na execução real do código `knapsack.js` no ambiente Node.js.

**Tabela 3: Resumo dos exemplos de execução**

| Cenário                  | *n* | *W* | Valor Ótimo | Itens Selecionados       | Peso Utilizado | Versão Matricial | Versão Otimizada |
|--------------------------|-----|------|-------------|--------------------------|----------------|------------------|------------------|
| 1. Caso Didático         | 4   | 8    | 10          | [2, 4]                   | 8/8 (100%)     | 0,79 ms          | 0,29 ms          |
| 2. Seleção de Cargas     | 7   | 50   | 260         | [1, 6]                   | 50/50 (100%)   | 0,16 ms          | 0,14 ms          |
| 3. Gestão de Inventário  | 8   | 30   | 112         | [1, 2, 4, 8]             | 30/30 (100%)   | 0,30 ms          | 0,23 ms          |
| 4. Caso com 12 Itens     | 12  | 40   | 515         | [1, 2, 3, 6, 8, 10, 11]  | 40/40 (100%)   | 0,07 ms          | 0,05 ms          |

**Cenário 1 — Caso Didático:** O exemplo básico com 4 itens (pesos [2, 3, 4, 5] e valores [3, 4, 5, 6]) e capacidade 8. A solução ótima seleciona os itens 2 e 4, com peso total 8 e valor 10, utilizando 100% da capacidade. Este cenário serviu como ilustração passo a passo na Seção 3.3.

**Cenário 2 — Seleção de Cargas de Frete:** Simula uma transportadora com 7 cargas disponíveis e um veículo com capacidade 50. O algoritmo seleciona as cargas 1 (peso 10, valor 60) e 6 (peso 40, valor 200), totalizando valor 260 com 100% de aproveitamento da capacidade.

**Cenário 3 — Gestão de Inventário:** Representa um centro de distribuição com espaço para 30 unidades de volume e 8 produtos diferentes. O algoritmo escolhe os itens 1, 2, 4 e 8, obtendo valor 112 e utilizando exatamente toda a capacidade disponível.

**Cenário 4 — Caso com 12 Itens:** Uma instância maior com 12 itens e capacidade 40, utilizada para avaliar a performance. O algoritmo seleciona 7 itens (1, 2, 3, 6, 8, 10, 11) com valor total 515, novamente aproveitando 100% da capacidade.

Adicionalmente, foi conduzido um **teste comparativo de desempenho** com 100 itens gerados aleatoriamente (pesos entre 1 e 50, valores entre 1 e 100) e capacidade 500. Os resultados são apresentados na Tabela 4.

**Tabela 4: Comparativo de desempenho — 100 itens, W = 500**

| Métrica                  | Versão Matricial        | Versão Otimizada        |
|--------------------------|-------------------------|-------------------------|
| Tempo de execução        | 22,90 ms                | 6,86 ms                 |
| Valor máximo encontrado  | 2526                    | 2526                    |
| Itens selecionados       | 35 de 100               | 35 de 100               |
| Espaço para valores      | O(n · W) = ~50.000      | O(W) = 501              |

Os resultados confirmam que a versão otimizada é aproximadamente **3,3 vezes mais rápida** que a versão matricial, mantendo resultados idênticos em termos de valor ótimo e composição da solução. Essa diferença de desempenho é atribuída a dois fatores principais: a menor alocação de memória reduz a pressão sobre o coletor de lixo (*garbage collector*), e a maior localidade de referência do vetor unidimensional favorece o uso eficiente da cache da CPU.

#### 3.4.4. Evidências de Funcionamento

Abaixo são apresentados os resultados reais da execução do código `knapsack.js` no ambiente Node.js, demonstrando o correto funcionamento das implementações:

```
╔══════════════════════════════════════════════════════════════╗
║   MOCHILA 0/1 – Programação Dinâmica (Bottom-Up)             ║
║   Disciplina: Projeto e Análise de Algoritmos                ║
╚══════════════════════════════════════════════════════════════╝

════════════════════════════════════════════════════════════
  EXEMPLO 1 – Caso básico com 4 itens (didático)
════════════════════════════════════════════════════════════

  ┌──────┬──────┬───────┐
  │ Item │ Peso │ Valor │
  ├──────┼──────┼───────┤
  │   1  │    2 │     3 │
  │   2  │    3 │     4 │
  │   3  │    4 │     5 │
  │   4  │    5 │     6 │
  └──────┴──────┴───────┘
  Capacidade da mochila: 8

  ── Versão Matricial (O(n·W) espaço) ──
  Tempo (matricial): 0.793ms
  Valor máximo obtido: 10
  Itens selecionados  : [2, 4]

  Detalhamento:
  ┌──────┬──────┬───────┐
  │ Item │ Peso │ Valor │
  ├──────┼──────┼───────┤
  │   2  │    3 │     4 │
  │   4  │    5 │     6 │
  ├──────┼──────┼───────┤
  │ TOTAL│    8 │    10 │
  └──────┴──────┴───────┘
  Peso utilizado: 8 / 8 (100.0%)

  ── Versão Otimizada (O(W) espaço para valores) ──
  Tempo (otimizada): 0.293ms
  Valor máximo obtido: 10
  Itens selecionados  : [2, 4]
```

```
════════════════════════════════════════════════════════════
  EXEMPLO 2 – Seleção de cargas (maximizar valor do frete)
════════════════════════════════════════════════════════════

  ┌──────┬──────┬───────┐
  │ Item │ Peso │ Valor │
  ├──────┼──────┼───────┤
  │   1  │   10 │    60 │
  │   2  │   20 │   100 │
  │   3  │   30 │   120 │
  │   4  │   25 │    80 │
  │   5  │   15 │    50 │
  │   6  │   40 │   200 │
  │   7  │    5 │    30 │
  └──────┴──────┴───────┘
  Capacidade da mochila: 50

  ── Versão Matricial (O(n·W) espaço) ──
  Tempo (matricial): 0.155ms
  Valor máximo obtido: 260
  Itens selecionados  : [1, 6]

  Detalhamento:
  ┌──────┬──────┬───────┐
  │ Item │ Peso │ Valor │
  ├──────┼──────┼───────┤
  │   1  │   10 │    60 │
  │   6  │   40 │   200 │
  ├──────┼──────┼───────┤
  │ TOTAL│   50 │   260 │
  └──────┴──────┴───────┘
  Peso utilizado: 50 / 50 (100.0%)
```

```
════════════════════════════════════════════════════════════
  EXEMPLO 3 – Gestão de inventário (produtos para armazenar)
════════════════════════════════════════════════════════════

  ┌──────┬──────┬───────┐
  │ Item │ Peso │ Valor │
  ├──────┼──────┼───────┤
  │   1  │   12 │    45 │
  │   2  │    8 │    30 │
  │   3  │   15 │    50 │
  │   4  │    7 │    25 │
  │   5  │   20 │    70 │
  │   6  │    5 │    18 │
  │   7  │   10 │    35 │
  │   8  │    3 │    12 │
  └──────┴──────┴───────┘
  Capacidade da mochila: 30

  ── Versão Matricial (O(n·W) espaço) ──
  Tempo (matricial): 0.3ms
  Valor máximo obtido: 112
  Itens selecionados  : [1, 2, 4, 8]
  ...
  Peso utilizado: 30 / 30 (100.0%)

  ── Versão Otimizada (O(W) espaço para valores) ──
  Tempo (otimizada): 0.23ms
  Valor máximo obtido: 112
  Itens selecionados  : [1, 2, 4, 8]
```

```
════════════════════════════════════════════════════════════
  COMPARATIVO: Matricial × Otimizada
════════════════════════════════════════════════════════════

  Caso de teste: 100 itens, capacidade 500

  Versão Matricial (O(n·W) espaço):
  matricial: 22.903ms
  Valor máximo: 2526
  Itens selecionados: 35 de 100

  Versão Otimizada (O(W) espaço para dp):
  otimizada: 6.862ms
  Valor máximo: 2526
  Itens selecionados: 35 de 100

  ✓ Ambos os algoritmos retornaram o mesmo valor máximo? SIM
```

---

## 4. Análise do Algoritmo

### 4.1. Complexidade de Tempo

A versão matricial da Programação Dinâmica para o problema da Mochila 0/1 preenche uma tabela de dimensões (*n*+1) × (*W*+1). Para cada uma das *n* · *W* células efetivamente computadas (excluindo as bordas), realiza-se uma quantidade constante de operações — uma comparação e, no máximo, uma adição. Para cada célula, as operações realizadas são:

1. Verificar se o peso do item cabe na capacidade atual (*if*)
2. Calcular o valor sem incluir o item (leitura direta da tabela)
3. Calcular o valor incluindo o item (leitura + adição)
4. Comparar as duas alternativas e atribuir o máximo
5. Opcionalmente, marcar a matriz `keep`

Cada uma dessas operações é *O*(1), resultando em complexidade de tempo total **Θ(*n* · *W*)**.

A versão otimizada mantém a mesma complexidade de tempo **O(*n* · *W*)**, pois ainda é necessário processar cada item e cada capacidade. No entanto, o laço interno percorre apenas de *W* até o peso do item (ignorando capacidades menores que o peso), o que na prática reduz ligeiramente o número de iterações. O ganho real de desempenho observado (3,3×) deve-se principalmente à melhor localidade de referência e menor alocação de memória.

### 4.2. Complexidade de Espaço

A versão matricial armazena uma tabela de dimensões (*n*+1) × (*W*+1) para os valores DP, mais uma matriz `keep` de mesmas dimensões para reconstrução, resultando em **O(*n* · *W*)** de memória. Para *n* = 100 e *W* = 500, são aproximadamente 50.000 células — número perfeitamente gerenciável.

A versão otimizada reduz o armazenamento dos valores para um vetor unidimensional de tamanho *W*+1, alcançando **O(*W*)** de espaço para os valores DP. Contudo, a matriz `keep` para reconstrução ainda requer **O(*n* · *W*)**. Na prática, se apenas o valor máximo fosse necessário (sem reconstrução), a economia de memória seria ainda mais significativa.

### 4.3. Análise Pseudo-Polinomial

A complexidade **O(*n* · *W*)** é classificada como **pseudo-polinomial**, e não polinomial de fato. A distinção é sutil mas importante: a análise tradicional de complexidade considera o tamanho da entrada em termos de bits necessários para representá-la, não o valor numérico dos parâmetros. Enquanto *n* contribui com log₂ *n* bits, *W* contribui com log₂ *W* bits para a representação da entrada. Um algoritmo genuinamente polinomial teria complexidade polinomial em log₂ *W*, não em *W*.

Isso significa que, embora o algoritmo seja extremamente eficiente para capacidades moderadas (até centenas de milhares), ele torna-se impeditivo quando *W* é muito grande. Por exemplo, com *W* = 10^9, seriam necessários aproximadamente 8 GB de memória apenas para o vetor `dp`, tornando a abordagem impraticável em hardware convencional. Para tais cenários, algoritmos de aproximação como o FPTAS (Fully Polynomial-Time Approximation Scheme) são mais adequados.

### 4.4. Comparação com Abordagens Alternativas

A Tabela 5 sintetiza as principais alternativas algorítmicas para o problema da Mochila 0/1 e suas respectivas características.

**Tabela 5: Comparação entre abordagens para a Mochila 0/1**

| Abordagem           | Complexidade      | Otimalidade  | Observação                                         |
|---------------------|-------------------|--------------|----------------------------------------------------|
| Força Bruta         | *O*(2^*n*)        | Garantida    | Inviável para *n* > 40                             |
| Guloso (valor/peso) | *O*(*n* log *n*)  | Não garantida | Rápido, mas existem contraexemplos                 |
| Branch-and-Bound    | *O*(2^*n*) pior   | Garantida    | Bom desempenho médio, poda eficaz                  |
| Programação Dinâmica| *O*(*n* · *W*)    | Garantida    | Pseudo-polinomial; limitado por *W*                |

### 4.5. Limitações da Implementação

As implementações desenvolvidas apresentam algumas limitações que devem ser consideradas:

1. **Capacidade inteira**: O algoritmo requer que os pesos e a capacidade sejam números inteiros. Para capacidades fracionárias, seria necessário escalonar os valores.
2. **Memória para reconstrução**: Embora a versão otimizada reduza o espaço para valores, a matriz `keep` para reconstrução ainda consome O(*n* · *W*). Em situações críticas de memória, a reconstrução poderia ser feita com técnicas alternativas (como armazenar decisões compactadas).
3. **JavaScript e números grandes**: A linguagem JavaScript utiliza o formato IEEE 754 de ponto flutuante para todos os números, o que limita a precisão para valores inteiros acima de 2^53. Para instâncias muito grandes, isso pode introduzir erros de arredondamento.

---

## 5. Aplicações em Sistemas Reais

O problema da Mochila 0/1 transcende o interesse puramente acadêmico e encontra aplicações práticas em inúmeros domínios da computação e da engenharia. Sua relevância decorre do fato de que a estrutura de "selecionar um subconjunto ótimo sob restrição de capacidade" é ubíqua em problemas de alocação de recursos escassos.

No setor de **transporte e logística**, o problema modela diretamente o carregamento de veículos — caminhões, contêineres, aeronaves — em que cada carga possui um peso e um valor de frete associado, e o objetivo é maximizar a receita respeitando a capacidade do veículo. O Exemplo 2 da Seção 3.4.3 ilustrou exatamente esse cenário, demonstrando como a DP pode selecionar a combinação ótima de cargas para uma viagem. Variações do problema incorporam restrições adicionais como balanceamento de carga, incompatibilidades entre itens perigosos e janelas de entrega, tornando-o central nos sistemas de roteirização e planejamento de frotas utilizados por grandes operadores logísticos.

Na **gestão de inventário e cadeia de suprimentos**, o problema manifesta-se na decisão sobre quais produtos armazenar em espaços limitados de depósito, considerando margens de lucro unitárias e giro de estoque. O Exemplo 3 da Seção 3.4.3 modelou esse tipo de cenário, selecionando 4 de 8 produtos para maximizar o valor armazenado. Supermercados utilizam princípios derivados da mochila para determinar a disposição ótima de produtos em gôndolas, equilibrando a lucratividade por unidade de área exposta. De forma análoga, centros de distribuição empregam heurísticas baseadas na mochila para decidir quais itens manter em zonas de alta acessibilidade (*fast-picking zones*).

No campo dos **sistemas computacionais**, o problema aparece sob diversas faces. Em virtualização e computação em nuvem, a alocação de máquinas virtuais a servidores físicos — em que cada VM consome recursos (CPU, memória) e entrega desempenho (valor) — constitui uma instância multidimensional do problema da mochila. Em sistemas embarcados e dispositivos móveis, a seleção de funcionalidades a incluir dentro de um orçamento limitado de memória segue a mesma lógica. No **corte de materiais na indústria** — chapas de aço, rolos de tecido, barras de madeira —, o problema consiste em selecionar quais peças cortar de uma matéria-prima de dimensão fixa para maximizar o aproveitamento e minimizar o desperdício.

Nas **finanças e investimentos**, o problema modela a seleção de uma carteira de ativos com orçamento limitado. Projetos de investimento competem por recursos de capital, cada qual com seu custo e retorno esperado, e o investidor busca maximizar o valor presente líquido total sujeito à restrição orçamentária. Embora a versão clássica do problema não capture correlações entre ativos — que demandariam modelos mais sofisticados como a otimização de Markowitz —, ela fornece uma heurística inicial poderosa e computacionalmente eficiente.

---

## 6. Conclusão

O presente trabalho percorreu o ciclo completo que vai da teoria à prática na aplicação da Programação Dinâmica ao problema da Mochila 0/1. Do ponto de vista teórico, consolidou-se a compreensão dos princípios que fundamentam a técnica — a subestrutura ótima e a sobreposição de subproblemas —, bem como a distinção entre as abordagens top-down (memoização) e bottom-up (tabelamento), com suas respectivas vantagens e limitações. A análise da recorrência e a construção passo a passo da tabela DP demonstraram de forma cristalina como uma formulação matemática concisa pode dar origem a um algoritmo que reduz um espaço de busca exponencial de 2^*n* combinações a uma tabela de dimensão *n* × *W*.

Do ponto de vista prático, a implementação das duas versões — matricial e otimizada — evidenciou que as considerações de eficiência espacial não são meramente acadêmicas. A versão otimizada com vetor unidimensional provou ser consistentemente mais rápida que a versão matricial (aproximadamente 3,3× no teste com 100 itens), com resultados idênticos, ilustrando na prática o impacto do uso eficiente da hierarquia de memória no desempenho de algoritmos. A diversidade de cenários de teste — do caso didático aos contextos aplicados de logística e inventário — confirmou a robustez e a generalidade da solução implementada. Em todos os cenários testados, o algoritmo aproveitou 100% da capacidade disponível, demonstrando a qualidade da solução ótima encontrada pela DP.

Como possíveis extensões deste trabalho, sugere-se a investigação de variantes do problema da mochila igualmente relevantes na prática, como a Mochila Fracionária (em que itens podem ser divididos), a Mochila Múltipla (com várias mochilas simultâneas) e a Mochila Multidimensional (com mais de uma restrição de capacidade, como peso e volume). Outra direção promissora consiste no estudo de algoritmos de aproximação com garantias formais de qualidade — como o FPTAS (*Fully Polynomial-Time Approximation Scheme*) — para instâncias em que a capacidade *W* é grande demais para a DP exata. Por fim, a adaptação da solução para ambientes de produção, com persistência dos resultados e integração a sistemas de apoio à decisão logística, constituiria uma ponte natural entre este trabalho acadêmico e aplicações industriais concretas.

---

## Referências

BELLMAN, R. **Dynamic Programming**. Princeton: Princeton University Press, 1957.

CORMEN, T. H.; LEISERSON, C. E.; RIVEST, R. L.; STEIN, C. **Algoritmos: Teoria e Prática**. 3. ed. Rio de Janeiro: Elsevier, 2012.

DASGUPTA, S.; PAPADIMITRIOU, C.; VAZIRANI, U. **Algoritmos**. Porto Alegre: AMGH, 2010.

KLEINBERG, J.; TARDOS, É. **Algorithm Design**. Boston: Pearson, 2006.

MARTELLO, S.; TOTH, P. **Knapsack Problems: Algorithms and Computer Implementations**. Chichester: John Wiley & Sons, 1990.

ZIVIANI, N. **Projeto de Algoritmos com Implementações em Java e C++**. São Paulo: Cengage Learning, 2010.
