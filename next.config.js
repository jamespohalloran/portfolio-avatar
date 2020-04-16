const withCSS = require("@zeit/next-css");
require("dotenv").config();

module.exports = withCSS({
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.tsx?$/,
        },
        use: [
          {
            loader: require.resolve("@svgr/webpack"),
            options: {
              svgo: false,
            },
          },
          "url-loader",
        ],
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader", //?outputPath=static/images
            options: {
              outputPath: (url, resourcePath, context) => {
                // `resourcePath` is original absolute path to asset
                // `context` is directory where stored asset (`rootContext`) or `context` option

                // To get relative path you can use
                // const relativePath = path.relative(context, resourcePath);

                // if (/my-custom-image\.png/.test(resourcePath)) {
                //   return `other_output_path/${url}`;
                // }

                // if (/images/.test(context)) {
                //   return `image_output_path/${url}`;
                // }

                return `static/css/images/${url}`;
              },
              publicPath: `images/`,
            },
          },
        ],
      }
    );

    config.node = {
      fs: "empty",
    };

    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
});
