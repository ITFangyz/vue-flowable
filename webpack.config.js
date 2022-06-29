
import ('../node_modules/k-form-design/styles/k-form-design.less');

module.exports = {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
       options: {
         modifyVars: {
           "primary-color": "#ee88aa",
            "layout-color": "#ee88aa"
         },
         javascriptEnabled: true,
       },
      }],
      // ...other rules
    }],
    // ...other config
  }