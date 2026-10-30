
const fs = require("node:fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("README.md");

  function getSortedArticles(collectionApi) {
    return collectionApi.getFilteredByGlob("articles/*.md")
      .map((article) => {
        const { category, date } = article.data;
        const frontMatter = fs.readFileSync(article.inputPath, "utf8")
          .match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
        const dateField = frontMatter?.[1].match(/^date:\s*(.*?)\s*$/m);
        const rawDate = dateField?.[1].replace(/^(['"])(.*)\1$/, "$2");
        const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(rawDate || "")
          ? new Date(`${rawDate}T00:00:00.000Z`)
          : null;
        const invalidFields = ["title", "category", "summary"].filter((field) => {
          return typeof article.data[field] !== "string" || article.data[field].trim() === "";
        });

        if (
          !parsedDate ||
          Number.isNaN(parsedDate.getTime()) ||
          parsedDate.toISOString().slice(0, 10) !== rawDate ||
          (date instanceof Date && date.toISOString().slice(0, 10) !== rawDate) ||
          (typeof date === "string" && date !== rawDate)
        ) {
          invalidFields.push("date");
        }

        if (invalidFields.length > 0) {
          throw new Error(
            `Invalid article metadata in ${article.inputPath}: required fields must be provided and valid (${invalidFields.join(", ")}).`
          );
        }

        return { article, date: parsedDate };
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  eleventyConfig.addCollection("articles", (collectionApi) => {
    return getSortedArticles(collectionApi).map(({ article }) => article);
  });

  eleventyConfig.addCollection("articleCategories", (collectionApi) => {
    const categories = new Map(
      ["Pendidikan", "Tutorial", "Pengetahuan Umum", "Arsip"]
        .map((name) => [name, { name, articles: [] }])
    );

    for (const { article } of getSortedArticles(collectionApi)) {
      const name = article.data.category;

      if (!categories.has(name)) {
        categories.set(name, { name, articles: [] });
      }

      categories.get(name).articles.push(article);
    }

    return Array.from(categories.values());
  });

  eleventyConfig.addFilter("dateFormat", function (date) {
    const parsedDate = new Date(date);

    return parsedDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
};
