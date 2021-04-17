module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.ts",
      title: "Popup",
    },
    options: {
      template: "public/browser-extension.html",
      entry: "./src/options/main.ts",
      title: "Options",
    },
    standalone: {
      template: "public/browser-extension.html",
      entry: "./src/standalone/main.ts",
      title: "Standalone",
      filename: "index.html",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.ts",
        },
        contentScripts: {
          entries: {
            "content-script": ["src/content-scripts/content-script.ts"],
          },
        },
      },
      manifestTransformer: (manifest) => {
        console.log(process.env.BROWSER);
        if (process.env.BROWSER === "firefox") {
          delete manifest["key"];
        }
        return manifest;
      },
    },
  },
};
