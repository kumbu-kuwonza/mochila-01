// =====================================================================
// knapsack.js
// Disciplina: Projeto e Análise de Algoritmos
// Tema: Programação Dinâmica – Problema da Mochila 0/1 (Bottom-Up)
//
// Como executar:
//   node knapsack.js
//
// Requisitos: Node.js 14+
// =====================================================================

/**
 * SOLUÇÃO COMPLETA – Mochila 0/1 com Programação Dinâmica (Bottom-Up)
 *
 * Entrada:
 *   - pesos[i]  : peso do item i
 *   - valores[i]: valor do item i
 *   - capacidade: peso máximo que a mochila suporta
 *
 * Restrição: cada item pode ser colocado no máximo 1 vez (0/1).
 *
 * Objetivo: maximizar Σ valores[i] sujeito a Σ pesos[i] ≤ capacidade.
 */

// ────────────────────────────────────────────────────────────────────
// VERSÃO 1: Matriz completa dp[n+1][capacidade+1]
// Complexidade: Tempo O(n * W) | Espaço O(n * W)
// ────────────────────────────────────────────────────────────────────

/**
 * Resolve o problema da mochila 0/1 com a matriz completa.
 *
 * @param {number[]} pesos     - Array de pesos dos itens
 * @param {number[]} valores   - Array de valores dos itens
 * @param {number}  capacidade - Capacidade máxima da mochila
 * @returns {{ valorMaximo: number, itensSelecionados: number[] }}
 */
function mochila01(pesos, valores, capacidade) {
  const n = pesos.length;

  // dp[i][w] = maior valor possível considerando os primeiros i itens
  //            e uma mochila de capacidade w
  const dp = Array.from({ length: n + 1 }, () => Array(capacidade + 1).fill(0));

  // keep[i][w] = true se o item i foi incluído na solução para a
  //              sub-mochila de capacidade w (usado na reconstrução)
  const keep = Array.from({ length: n + 1 }, () => Array(capacidade + 1).fill(false));

  // Preenchimento bottom-up da tabela
  for (let i = 1; i <= n; i++) {
    const pesoItem   = pesos[i - 1];
    const valorItem  = valores[i - 1];

    for (let w = 0; w <= capacidade; w++) {
      if (pesoItem <= w) {
        // Duas opções: não incluir o item OU incluir o item
        const semItem = dp[i - 1][w];
        const comItem = dp[i - 1][w - pesoItem] + valorItem;

        if (comItem > semItem) {
          dp[i][w]   = comItem;
          keep[i][w] = true;          // item i-1 foi incluído
        } else {
          dp[i][w] = semItem;
        }
      } else {
        // Item não cabe: herda o valor da linha anterior
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // ── Reconstrução da solução (backtracking) ──
  const itensSelecionados = [];
  let w = capacidade;

  for (let i = n; i >= 1; i--) {
    if (keep[i][w]) {
      itensSelecionados.push(i - 1);       // índice base 0
      w -= pesos[i - 1];                   // reduz a capacidade restante
    }
  }

  itensSelecionados.reverse();             // ordem crescente dos índices

  return {
    valorMaximo: dp[n][capacidade],
    itensSelecionados
  };
}


// ────────────────────────────────────────────────────────────────────
// VERSÃO 2: Otimizada com array 1D de tamanho capacidade+1
// Complexidade: Tempo O(n * W) | Espaço O(W) para valores
//               + O(n * W) para a matriz keep (reconstrução)
// ────────────────────────────────────────────────────────────────────

/**
 * Resolve o problema da mochila 0/1 com espaço otimizado para os
 * valores (array 1D). Mantém uma matriz auxiliar keep para
 * reconstrução dos itens.
 *
 * @param {number[]} pesos
 * @param {number[]} valores
 * @param {number}   capacidade
 * @returns {{ valorMaximo: number, itensSelecionados: number[] }}
 */
function mochila01Otimizada(pesos, valores, capacidade) {
  const n = pesos.length;

  // Apenas UMA linha para os valores (economiza espaço)
  const dp = Array(capacidade + 1).fill(0);

  // keep[i][w] ainda é necessário para reconstruir a solução
  const keep = Array.from({ length: n + 1 }, () => Array(capacidade + 1).fill(false));

  for (let i = 1; i <= n; i++) {
    const pesoItem  = pesos[i - 1];
    const valorItem = valores[i - 1];

    // ATENÇÃO: percorre de trás para frente para não reutilizar
    // o mesmo item mais de uma vez (já que dp é sobrescrito)
    for (let w = capacidade; w >= pesoItem; w--) {
      const comItem = dp[w - pesoItem] + valorItem;

      if (comItem > dp[w]) {
        dp[w]      = comItem;
        keep[i][w] = true;               // item i-1 incluído
      }
    }
    // Quando w < pesoItem, dp[w] permanece inalterado (herda da
    // "iteração anterior" implicitamente, pois o valor não foi sobrescrito)
  }

  // ── Reconstrução (igual à versão matricial) ──
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


// ────────────────────────────────────────────────────────────────────
// FUNÇÃO AUXILIAR: Exibição formatada do resultado
// ────────────────────────────────────────────────────────────────────

/**
 * Exibe os dados de entrada e o resultado de forma legível no console.
 *
 * @param {number[]} pesos
 * @param {number[]} valores
 * @param {number}   capacidade
 * @param {string}   titulo   - Nome/descrição do exemplo
 */
function exibirResultado(pesos, valores, capacidade, titulo) {
  const n = pesos.length;

  console.log('\n' + '═'.repeat(60));
  console.log(`  ${titulo}`);
  console.log('═'.repeat(60));

  // Tabela de entrada
  console.log('\n  ┌──────┬──────┬───────┐');
  console.log('  │ Item │ Peso │ Valor │');
  console.log('  ├──────┼──────┼───────┤');
  for (let i = 0; i < n; i++) {
    console.log(`  │  ${String(i + 1).padStart(2)}  │ ${String(pesos[i]).padStart(4)} │ ${String(valores[i]).padStart(5)} │`);
  }
  console.log('  └──────┴──────┴───────┘');
  console.log(`\n  Capacidade da mochila: ${capacidade}`);

  // ── Versão Matricial ──
  console.log('\n  ── Versão Matricial (O(n·W) espaço) ──');
  console.time('  Tempo (matricial)');
  const resMatricial = mochila01(pesos, valores, capacidade);
  console.timeEnd('  Tempo (matricial)');

  console.log(`  Valor máximo obtido: ${resMatricial.valorMaximo}`);
  console.log(`  Itens selecionados  : [${resMatricial.itensSelecionados.map(i => i + 1).join(', ')}]`);

  // Detalhamento dos itens selecionados
  console.log('\n  Detalhamento:');
  let pesoTotal = 0;
  console.log('  ┌──────┬──────┬───────┐');
  console.log('  │ Item │ Peso │ Valor │');
  console.log('  ├──────┼──────┼───────┤');
  for (const idx of resMatricial.itensSelecionados) {
    console.log(`  │  ${String(idx + 1).padStart(2)}  │ ${String(pesos[idx]).padStart(4)} │ ${String(valores[idx]).padStart(5)} │`);
    pesoTotal += pesos[idx];
  }
  console.log('  ├──────┼──────┼───────┤');
  console.log(`  │ TOTAL│ ${String(pesoTotal).padStart(4)} │ ${String(resMatricial.valorMaximo).padStart(5)} │`);
  console.log('  └──────┴──────┴───────┘');
  console.log(`  Peso utilizado: ${pesoTotal} / ${capacidade} (${((pesoTotal / capacidade) * 100).toFixed(1)}%)`);

  // ── Versão Otimizada ──
  console.log('\n  ── Versão Otimizada (O(W) espaço para valores) ──');
  console.time('  Tempo (otimizada)');
  const resOtimizada = mochila01Otimizada(pesos, valores, capacidade);
  console.timeEnd('  Tempo (otimizada)');

  console.log(`  Valor máximo obtido: ${resOtimizada.valorMaximo}`);
  console.log(`  Itens selecionados  : [${resOtimizada.itensSelecionados.map(i => i + 1).join(', ')}]`);
}


// =====================================================================
// EXEMPLOS DE EXECUÇÃO
// =====================================================================

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   MOCHILA 0/1 – Programação Dinâmica (Bottom-Up)             ║');
console.log('║   Disciplina: Projeto e Análise de Algoritmos                ║');
console.log('╚══════════════════════════════════════════════════════════════╝');

// ────────────────────────────────────────────────────────────────────
// EXEMPLO 1: Caso básico (4 itens) – didático
// ────────────────────────────────────────────────────────────────────
{
  const pesos   = [2, 3, 4, 5];
  const valores = [3, 4, 5, 6];
  const capacidade = 8;

  exibirResultado(pesos, valores, capacidade,
    'EXEMPLO 1 – Caso básico com 4 itens (didático)');
}


// ────────────────────────────────────────────────────────────────────
// EXEMPLO 2: Seleção de cargas para maximizar valor do frete
// ────────────────────────────────────────────────────────────────────
{
  const pesos   = [10, 20, 30, 25, 15, 40, 5];
  const valores = [60, 100, 120, 80, 50, 200, 30];
  const capacidade = 50;

  exibirResultado(pesos, valores, capacidade,
    'EXEMPLO 2 – Seleção de cargas (maximizar valor do frete)');
}


// ────────────────────────────────────────────────────────────────────
// EXEMPLO 3: Gestão de inventário – quais produtos armazenar
// ────────────────────────────────────────────────────────────────────
{
  const pesos   = [12, 8, 15, 7, 20, 5, 10, 3];
  const valores = [45, 30, 50, 25, 70, 18, 35, 12];
  const capacidade = 30;

  exibirResultado(pesos, valores, capacidade,
    'EXEMPLO 3 – Gestão de inventário (produtos para armazenar)');
}


// ────────────────────────────────────────────────────────────────────
// EXEMPLO 4: Caso maior (12 itens) – teste de performance
// ────────────────────────────────────────────────────────────────────
{
  const pesos   = [3, 7, 2, 9, 4, 6, 8, 1, 5, 10, 11, 13];
  const valores = [40, 90, 25, 110, 50, 75, 95, 15, 60, 130, 140, 160];
  const capacidade = 40;

  exibirResultado(pesos, valores, capacidade,
    'EXEMPLO 4 – Caso com 12 itens (teste de performance)');
}


// ═══════════════════════════════════════════════════════════════════
// COMPARATIVO FINAL: Versão Matricial × Versão Otimizada
// ═══════════════════════════════════════════════════════════════════

console.log('\n' + '═'.repeat(60));
console.log('  COMPARATIVO: Matricial × Otimizada');
console.log('═'.repeat(60));

// Gerar um caso de teste grande para comparar
const nGrande = 100;
const capacidadeGrande = 500;
const pesosGrande   = Array.from({ length: nGrande }, () => Math.floor(Math.random() * 50) + 1);
const valoresGrande = Array.from({ length: nGrande }, () => Math.floor(Math.random() * 100) + 1);

console.log(`\n  Caso de teste: ${nGrande} itens, capacidade ${capacidadeGrande}`);

console.log('\n  Versão Matricial (O(n·W) espaço):');
console.time('  matricial');
const r1 = mochila01(pesosGrande, valoresGrande, capacidadeGrande);
console.timeEnd('  matricial');
console.log(`  Valor máximo: ${r1.valorMaximo}`);
console.log(`  Itens selecionados: ${r1.itensSelecionados.length} de ${nGrande}`);

console.log('\n  Versão Otimizada (O(W) espaço para dp):');
console.time('  otimizada');
const r2 = mochila01Otimizada(pesosGrande, valoresGrande, capacidadeGrande);
console.timeEnd('  otimizada');
console.log(`  Valor máximo: ${r2.valorMaximo}`);
console.log(`  Itens selecionados: ${r2.itensSelecionados.length} de ${nGrande}`);

// Verificar consistência
console.log('\n  ✓ Ambos os algoritmos retornaram o mesmo valor máximo?',
  r1.valorMaximo === r2.valorMaximo ? 'SIM' : 'NÃO');

console.log('\n  RESUMO DAS DIFERENÇAS:');
console.log('  ┌────────────────────┬──────────────────────┬──────────────────────┐');
console.log('  │                    │ Matricial            │ Otimizada            │');
console.log('  ├────────────────────┼──────────────────────┼──────────────────────┤');
console.log('  │ Espaço (valores)   │ O(n × W)             │ O(W)                 │');
console.log('  │ Reconstrução       │ keep[n+1][W+1]       │ keep[n+1][W+1]       │');
console.log('  │ Iteração do loop   │ crescente (0→W)      │ decrescente (W→0)    │');
console.log('  │ Memória total      │ ≈ n×W inteiros       │ ≈ W inteiros + keep  │');
console.log('  └────────────────────┴──────────────────────┴──────────────────────┘');

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║   Fim da execução.                                          ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');
