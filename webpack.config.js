const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',  // El archivo de entrada (el punto de inicio)
  output: {
    filename: 'bundle.js',  // El archivo empaquetado
    path: path.resolve(__dirname, 'dist'),  // Carpeta de salida
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Regla para los archivos JS
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Usar Babel para transpilar JS moderno
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,  // Regla para los archivos CSS
        use: ['style-loader', 'css-loader'],  // Cargar CSS en JS
      },
      {
        test: /\.(png|jpg|gif)$/i,  // Regla para las imágenes
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',  // Mantener la estructura de las carpetas
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },  // Copia los assets a la carpeta dist/assets
      ],
    }),
  ],

  resolve: {
    alias: {
      phaser: path.resolve(__dirname, 'node_modules/phaser/dist/phaser.js'),
    },
  },
};
