//
// event hooks: https://webpack.js.org/api/plugins/compiler/#event-hooks
//
class ExamplePlugin {
    apply(compiler) {
        compiler.plugin('run', (compiler, callback) => {
            console.log('WEBPACK IS RUNNING!');
            callback();
        });
    }
}

module.exports = ExamplePlugin;
