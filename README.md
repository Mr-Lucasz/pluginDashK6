# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# pluginDashK6

Este projeto tem como objetivo se tornar um plugin para o k6, podendo futuramente ser adicionado via npm, yarn ou outro gerenciador de pacotes. Atualmente está na versão inicial (v1), focando no caminho 1: análise pós-teste.

## Caminhos de Evolução

**Caminho 1: Análise Pós-Teste**
- Permite importar arquivos JSON de relatórios do k6 e visualizar métricas detalhadas por endpoint, incluindo percentis, taxas de sucesso/erro, códigos de status e mais.
- É a maneira mais rápida de validar a ideia e ter algo funcional.
- Força a refatoração dos componentes para aceitar dados dinâmicos, pré-requisito para os próximos passos.

**Caminho 2: Tempo Real**
- Após o dashboard funcionar com upload de JSON, o próximo passo é torná-lo em tempo real.
- A integração típica é k6 + InfluxDB + Grafana, mas o objetivo é substituir o Grafana pelo próprio dashboard.

**Caminho 3: Plugin nativo**
- Objetivo final: transformar o projeto em um plugin nativo do k6, distribuível e integrado.
- Para isso, será necessário investir em Go e xk6.

## Instalação
1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o projeto:
   ```sh
   npm run dev
   ```

## Uso
- Faça upload de um arquivo JSON exportado do k6.
- Navegue pelos dashboards para visualizar métricas de desempenho por endpoint.

## Contribuição
Contribuições são bem-vindas! Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para orientações.

## Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
