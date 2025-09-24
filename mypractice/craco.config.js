const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@share": path.resolve(__dirname, "src/share/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@types": path.resolve(__dirname, "src/types/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@config": path.resolve(__dirname, "src/config/"),
      "@pagination": path.resolve(__dirname, "src/components/Pagination/"),
    }
  },
};
