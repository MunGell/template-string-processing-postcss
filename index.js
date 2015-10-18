import * as postcss from 'postcss';

export default function(string, transformer) {
    let plugins = [];
    let identifier = new RegExp('^~' + transformer.type, 'g');

    if (transformer.hasOwnProperty('options')) {
        transformer.options.forEach(function(pluginConfig) {
            if (typeof pluginConfig === 'string') {
                plugins.push(require(pluginConfig));
            }
            if (typeof pluginConfig === 'array') {
                plugins.push(require(pluginConfig[0])(pluginConfig[1]));
            }
        });
    }
    return postcss.default(plugins).process(string.replace(identifier, '')).css;
}
