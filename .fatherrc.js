const options = {
  entry: "src/index.js",
  doc: {
    title: "df",
    themeConfig: { mode: "light" },
    base: "/df"
  },
  extraBabelPlugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
      }
    ]
  ],
  // cssModules: true,
  extractCSS: true,
  lessInBabelMode: true,
  runtimeHelpers: true,
  esm: "babel",
  cjs: "babel",
  autoprefixer: {
    browsers: ["ie>9", "Safari >= 6"]
  }
}

export default options
