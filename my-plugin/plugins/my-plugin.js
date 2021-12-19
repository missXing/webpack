module.exports = class MyPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log('my plugin is success')
        console.log('options----', this.options)
    }
}