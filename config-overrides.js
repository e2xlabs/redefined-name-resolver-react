// config-overrides.js
const { configPaths, aliasDangerous } = require('react-app-rewire-alias/lib/aliasDangerous')

const aliasMap = configPaths('./tsconfig.paths.json')

module.exports = function override(config, env) {

    aliasDangerous({
        ...aliasMap,
        "redefined-resolver": process.env.NODE_ENV === "development"
          ? "../redefined-name-resolver-js"
          : "node_modules/@redefined/name-resolver-js",
    })(config)

    return config
}
