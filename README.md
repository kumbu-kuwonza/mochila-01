# Mochila 0/1 — Programação Dinâmica

**Disciplina:** Projeto e Análise de Algoritmos
**Curso:** Ciência da Computação / Engenharia de Software – UFC – Campus de Russas
**Autor:** Kumbu Gomes Kuwonza

## Estrutura

```
├── knapsack.js          # Algoritmo da Mochila 0/1 (matricial + otimizada)
├── index.html           # Interface web interativa para visualização
├── slides/              # Apresentação interativa em slides (Mira)
│   └── index.html
├── RELATORIO_FINAL.md   # Relatório técnico completo
└── RELATORIO_FINAL.docx # Relatório em formato Word
```

## Algoritmo

Implementação do problema da Mochila 0/1 usando Programação Dinâmica (bottom-up):

- **Versão Matricial** — O(n·W) tempo e espaço
- **Versão Otimizada** — O(n·W) tempo, O(W) espaço (loop decrescente)

### Executar

```bash
node knapsack.js
```

### Abrir interface web

Abra `index.html` no navegador.

### Slides interativos

Abra `slides/index.html` no navegador (setas ou botão para navegar).

## Deploy

- Interface web: [https://mochila-01.vercel.app](https://mochila-01.vercel.app)
- Slides: [https://mochila-01.vercel.app/slides](https://mochila-01.vercel.app/slides)
