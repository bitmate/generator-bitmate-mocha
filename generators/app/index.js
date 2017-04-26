/* eslint quote-props: 0 */  // --> OFF

const bitmate = require('@oligibson/bitmate-generator');

module.exports = bitmate.Base.extend({

  configuring() {
    this.mergeJson('package.json', {
      devDependencies: {
        'gulp-mocha': '4.3.0',
        'chai': '3.5.0',
        'chai-as-promised': '6.0.0',
        'chai-things': '0.2.0',
        'sinon': '2.1.0',
        'sinon-chai': '2.9.0',
        'supertest': '3.0.0'
      }
    });
  },

  writing: {
    gulp() {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks'),
        {}
      );
    },

    conf() {
      this.fs.copyTpl(
        this.templatePath('conf'),
        this.destinationPath('conf'),
        {}
      );
    }
  }

});
