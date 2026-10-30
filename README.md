# Invictus Team — redesign institucional

Nova versão do site da Invictus Team, em Taquaritinga, SP. Interface escura inspirada nos princípios de design da MOLS: tipografia Inter, navegação flutuante, layout espaçado, cards com bordas e responsividade.

## Mudanças

- Site multipágina real, com HTML estático individual para cada rota.
- 12 URLs: início, modalidades, 4 páginas individuais de modalidade, equipe, horários, planos, galeria, contato e privacidade.
- Titles e descriptions específicos, Open Graph, JSON-LD SportsActivityLocation/BreadcrumbList, navegação interna, sitemap e robots gerados no build.
- Imagens originais da equipe servidas pelo próprio site, copiadas da pasta images/ para dist/images/.
- Horários e planos preservados do conteúdo anterior, identificados como informação sujeita à confirmação.
- Formulário que monta uma mensagem para WhatsApp sem armazenar dados.

## Rodando localmente

Requer Node.js 20.11 ou superior, sem dependências de terceiros:

    npm run build
    npm run check
    npm run preview

Abrir http://localhost:4173. O comando npm run dev também gera o site e inicia o servidor.

## Rotas

- /
- /modalidades/
- /modalidades/muay-thai/
- /modalidades/jiu-jitsu/
- /modalidades/boxe-chines/
- /modalidades/defesa-pessoal/
- /sobre/
- /horarios/
- /planos/
- /galeria/
- /contato/
- /privacidade/

## Publicação na conta Vercel pessoal

O repositório é MKTTeus/Invictus. Não associar ao time da MOLS sem autorização.

1. Na Vercel pessoal, autorizar o repositório MKTTeus/Invictus na integração GitHub.
2. Criar ou vincular o projeto na conta pessoal e selecionar a branch feature/redesign-profissional-react para preview.
3. Build command: npm run build. Output directory: dist. Nenhuma variável de ambiente é obrigatória.
4. Opcionalmente configurar SITE_URL=https://dominio-oficial na produção para unificar canonical e sitemap.

Nos deployments de preview da Vercel, o build aplica noindex,nofollow e robots.txt restritivo automaticamente. Na produção, usa index,follow e gera sitemap. SITE_URL prevalece sobre URLs geradas pela Vercel.

## Conteúdo a confirmar antes de publicar

- Preços e condições dos planos
- Horários e modalidades ofertadas
- Autorização para divulgar todas as fotos
- Endereço, telefone e redes sociais atualizados

## Desenvolvimento

- Páginas e composição: src/site.mjs
- Dados de modalidades, planos e horários: src/content.mjs
- Estilos: public/site.css
- Interações: public/site.js
- Build: scripts/build.mjs
- Validação: scripts/check.mjs

Nenhuma medição de SEO ou Lighthouse foi alegada sem auditoria externa.
