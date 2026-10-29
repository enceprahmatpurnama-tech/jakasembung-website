
module.exports = function (eleventyConfig) {
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
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
