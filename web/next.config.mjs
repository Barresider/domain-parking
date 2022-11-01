import { env } from "./src/env/server.mjs";
import MangleCssClassPlugin from "mangle-css-class-webpack-plugin";
import loaderUtils from "loader-utils";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config, { isDev }) => {
    config.plugins.push(
      new MangleCssClassPlugin({
        classNameRegExp: '((hover|focus|xs|md|sm|lg|xl)[\\\\]*:)*tw-[a-z_-][a-zA-Z0-9_-]*',
        ignorePrefixRegExp: '((hover|focus|xs|md|sm|lg|xl)[\\\\]*:)*',
        classGenerator: hashOnlyIdent,
      })
    );

    return config;
  }
});


function hashOnlyIdent(className) {
  // Generate a hash to make the class name unique.
  const hash = loaderUtils.getHashDigest(
    Buffer.from(className),
    'md5',
    'base64',
    5
  )

  return (
    hash
      // Replace invalid symbols with underscores instead of escaping
      // https://mathiasbynens.be/notes/css-escapes#identifiers-strings
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      // "they cannot start with a digit, two hyphens, or a hyphen followed by a digit [sic]"
      // https://www.w3.org/TR/CSS21/syndata.html#characters
      .replace(/^(\d|--|-\d)/, '__$1')
  )
}