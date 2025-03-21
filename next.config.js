const path = require("path");
const loaderUtils = require("loader-utils");
const MangleCssClassPlugin = require("mangle-css-class-webpack-plugin");

module.exports = {
  typescript: {
    ignoreBuildErrors: true, // Remove this if possible and fix errors
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reactive.icampaign.vn",
      },
    ], // Update to remotePatterns
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    // Modify CSS loaders to include hash generation for class names
    if (!dev) {
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes("css-loader") &&
            !moduleLoader.loader?.includes("postcss-loader")
          ) {
            if (moduleLoader.options.modules?.getLocalIdent) {
              moduleLoader.options.modules.getLocalIdent = (
                context,
                _,
                exportName
              ) =>
                loaderUtils
                  .getHashDigest(
                    Buffer.from(
                      `filePath:${path
                        .relative(context.rootContext, context.resourcePath)
                        .replace(/\\+/g, "/")}#className:${exportName}`
                    ),
                    "md4",
                    "base64",
                    6
                  )
                  .replace(/^(-?\d|--)/, "_$1");
            }
          }
        });
      });

      // Ensure MangleCssClassPlugin is used only on the client-side
      if (!isServer) {
        config.plugins.push(
          new MangleCssClassPlugin({
            classNameRegExp:
              "((hover|focus|active|disabled|visited|first|last|odd|even|group-hover|focus-within|xs|sm|md|lg|xl)[\\\\]*:)*(tw)-[a-zA-Z0-9_-]*([\\\\]*/[0-9]*)?",
            ignorePrefixRegExp:
              "((hover|focus|active|disabled|visited|first|last|odd|even|group-hover|focus-within|xs|sm|md|lg|xl)[\\\\]*:)*",
            log: false,
            classGenerator: (original) => {
              const newClass = original
                .replace(/tw-/g, "")
                .replace(/grid/, "g")
                .replace(/auto/, "au")
                .replace(/border/g, "b")
                .replace(/center/g, "ctr")
                .replace(/rounded/g, "rd")
                .replace(/max-content/, "mc")
                .replace(/maxcontent/, "mc")
                .replace(/-/g, "")
                .replace(/#/g, "")
                .replace(/sm:/, "1")
                .replace(/md:/, "2")
                .replace(/lg:/, "3")
                .replace(/xl:/, "4")
                .replace(/\[/, "")
                .replace(/\]/, "");

              return btoa(newClass).replace(/=/g, "");
            },
          })
        );
      }
    }

    // Disable canvas if necessary
    config.resolve.alias.canvas = false;

    return config;
  },
};
