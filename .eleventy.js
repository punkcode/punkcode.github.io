const htmlmin = require('html-minifier');
const eleventyNavigation = require('@11ty/eleventy-navigation');

const now = String(Date.now())

module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('version', function () {
    return now;
  });
  
  // Create an alias for the base layer so we can reference it as base rather than the full paht.
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('guides', 'layouts/guides.njk');
  eleventyConfig.addLayoutAlias('manifesto', 'layouts/manifesto.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('error', 'layouts/error.njk');

  // As our CSS is generated in to a folder that git ignores, we want to make sure eleventy still reads it
  eleventyConfig.setUseGitIgnore(false);

  // Watch our generated CSS file for changes
  eleventyConfig.addWatchTarget('_tmp/style.css');
  // If it changes, write it to our generated full site
  eleventyConfig.addPassthroughCopy({ '_tmp': 'styles' });
  
  // Copy over assets/images
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/assets');

  // Handle AlpineJS
  eleventyConfig.addPassthroughCopy({ 'node_modules/alpinejs/dist/cdn.min.js': 'js/alpine.js' });
  
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (process.env.ELEVENTY_PRODUCTION && outputPath && outputPath.endsWith('.html') ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      
      return minified;
    }

    return content;
  });

  eleventyConfig.addPlugin(eleventyNavigation);

  return  {
    dir: {
      // Where to look for our site
      input: 'src',
    },
    passthroughFileCopy: true,
    templateFormats : ['njk', 'md'],
    htmlTemplateEngine : 'njk',
    markdownTemplateEngine : 'njk',
  };
};