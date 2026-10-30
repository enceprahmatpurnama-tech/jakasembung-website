module.exports = {
  layout: "layouts/article.njk",
  permalink: (data) => `/articles/${data.page.fileSlug}/index.html`
};
