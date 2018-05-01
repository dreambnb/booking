const webpackConfig = require('./webpack.config.js');
const { AWSAccessKeyId, AWSSecretKey } = require('./config/awsConfig.json');

module.exports = (grunt) => {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: false }, webpackConfig),
    },
    s3: {
      options: {
        accessKeyId: AWSAccessKeyId,
        secretAccessKey: AWSSecretKey,
        bucket: 'fantasybnb-mo',
        region: 'us-west-1'
      },
      build: {
        cwd: './client/dist',
        src: '**',
      },
    },

  });
  // Remember to npm install these packages if you don't have them!
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws');

  // Register tasks ('default' is the default)
  grunt.registerTask('default', ['webpack', 's3']);
};
