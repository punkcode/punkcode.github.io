const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
  
  // Create an alias for the base layer so we can reference it as base rather than the full paht.
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');

  // As our CSS is generated in to a folder that git ignores, we want to make sure eleventy still reads it
  eleventyConfig.setUseGitIgnore(false);

  // Watch our generated CSS file for changes
  eleventyConfig.addWatchTarget('./_tmp/style.css');
  // If it changes, write it to our generated full site
  eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' });
  
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