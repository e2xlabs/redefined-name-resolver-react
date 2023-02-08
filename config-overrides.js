// config-overrides.js
const { configPaths, aliasDangerous } = require('react-app-rewire-alias/lib/aliasDangerous')
const webpack = require('webpack')

const aliasMap = configPaths('./tsconfig.paths.json')

module.exports = function override(config, env) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        buffer: require.resolve('buffer'),
    });
    config.resolve.fallback = fallback;

    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    );

    aliasDangerous({
        ...aliasMap,
        "redefined-resolver": process.env.NODE_ENV === "development"
          ? "../redefined-name-resolver-js"
          : "node_modules/@redefined/name-resolver-js",
    })(config)

    return config
}
