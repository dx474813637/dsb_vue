module.exports = {
    devServer: {
        open: true,
        proxy: {
            "/Index": {
                target: "http://www.100ec.cn/"
            },
        }
    }
}