# Mochila 0/1 — Programação Dinâmica

**Disciplina:** Projeto e Análise de Algoritmos  
**Curso:** Ciência da Computação / Engenharia de Software — UFC — Campus de Russas  
**Autor:** Kumbu Gomes Kuwonza  
**Data:** Junho de 2026

---

## Links

| Recurso | URL |
|---------|-----|
| Sistema interativo | https://mochila-01.vercel.app |
| Landing page | https://mochila-01.vercel.app/landing |
| Apresentação (slides) | https://mochila-01.vercel.app/slides |
| Código-fonte (GitHub) | https://github.com/kumbu-kuwonza/mochila-01 |

---

## Estrutura do Projeto

```
├── knapsack.js             # Algoritmo (matricial + otimizada) — Node.js
├── index.html              # Sistema de otimização interativo (front-end)
├── landing.html            # Landing page com seções e D3 ilustrações
├── slides/
│   └── index.html          # Apresentação formal com 15 slides animados
├── RELATORIO_FINAL.md      # Relatório técnico (Markdown)
├── RELATORIO_FINAL.docx    # Relatório técnico (Word)
├── RELATORIO_FINAL.pdf     # Relatório técnico (PDF)
├── execucao.txt            # Evidência: output da execução no terminal
├── vercel.json             # Configuração de deploy (Vercel)
└── README.md               # Este arquivo
```

---

## Como Executar

### Terminal (Node.js)

```bash
node knapsack.js
```

Executa os 4 exemplos didáticos com tabelas formatadas, ambas as versões do algoritmo e comparativo de desempenho.

### Interface Web

Abra `index.html` no navegador para usar o sistema interativo:
- Adicionar itens com nome, peso e valor
- Definir capacidade da mochila
- Executar os dois algoritmos e comparar resultados
- Visualizar a tabela DP sendo preenchida célula por célula

### Slides

Abra `slides/index.html` no navegador:
- 15 slides com navegação por setas, dots, swipe e teclado
- Ilustrações D3.js animadas (rede de subproblemas, mochila visual, árvore de decisão, benchmarks)
- Simulador interativo com animação passo a passo
- Partículas de fundo e efeitos parallax

---

## Algoritmo

Implementação do problema da Mochila 0/1 usando Programação Dinâmica (Bottom-Up):

### Versão Matricial
- Complexidade: **O(n · W)** tempo, **O(n · W)** espaço
- Tabela completa `dp[n+1][W+1]` com reconstrução via `keep`
- Loop crescente (0 → W)

### Versão Otimizada
- Complexidade: **O(n · W)** tempo, **O(W)** espaço (valores)
- Vetor unidimensional `dp[W+1]` com loop decrescente (W → 0)
- Resultados idênticos, ~3,3× mais rápida, ~99× menos memória

---

## Tecnologias

- **JavaScript** (Node.js) — algoritmo principal
- **HTML5 + CSS3** — interfaces
- **D3.js v7** — visualizações animadas
- **Tailwind CSS** — estilização
- **Vercel** — deploy contínuo

---

## Evidências de Funcionamento

O arquivo `execucao.txt` contém o output completo da execução dos 4 cenários de teste no terminal, incluindo:

1. Caso didático (4 itens, W=8) — valor ótimo 10, itens {2, 4}
2. Seleção de cargas (7 itens, W=50) — valor 260, itens {1, 6}
3. Gestão de inventário (8 itens, W=30) — valor 112, itens {1, 2, 4, 8}
4. Teste de performance (12 itens, W=40) — valor 515, 7 itens selecionados
5. Comparativo com 100 itens aleatórios — versão otimizada 3,3× mais rápida
