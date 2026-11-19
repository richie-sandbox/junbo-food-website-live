# junbofood.com

The public website for Junbo Food: Cantonese sauces from the Junbo Chinese family kitchen in Melbourne.

Plain HTML, CSS and a little JavaScript. No build step. Everything in this repository is published to https://junbofood.com by GitHub Pages, so **only website files belong here**. Business documents, recipes, costings, suppliers and spreadsheets never go in this repo.

## Edit
- Page text: `index.html` (vote options are marked with a comment)
- Colours and layout: `assets/css/site.css`
- Email sign-up: paste the Kit or Mailchimp form address into `FORM_ENDPOINT` at the top of `assets/js/site.js`
- Photos: compressed `.webp` files in `assets/img/`, always with alt text

## Publish
Settings → Pages → Source: **GitHub Actions** (the workflow in `.github/workflows/pages.yml` publishes the site). Custom domain `junbofood.com`, Enforce HTTPS on. Every change merged to `main` goes live within a few minutes.
