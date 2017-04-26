/* eslint quote-props: 0 */  // --> OFF

const path = require('path');
const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const should = chai.should(); // eslint-disable-line no-unused-vars
chai.use(spies);
const test = require('ava');
const TestUtils = require('@oligibson/bitmate-generator').TestUtils;

let context;
const pkg = {
  devDependencies: {
    'gulp-mocha': '4.3.0',
    'chai': '3.5.0',
    'chai-as-promised': '6.0.0',
    'chai-things': '0.2.0',
    'sinon': '2.1.0',
    'sinon-chai': '2.9.0',
    'supertest': '3.0.0'
  }
};

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = {};
});

test('Configure package.json with express', t => {
  const expected = _.merge({}, pkg, {});
  TestUtils.call(context, 'configuring', {});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('gulp(): Call this.fs.copyTpl once', () => {
  context.templatePath = context.destinationPath = path => path;
  context.fs = {
    copyTpl: () => {}
  };
  const spy = chai.spy.on(context.fs, 'copyTpl');
  TestUtils.call(context, 'writing.gulp');
  expect(spy).to.have.been.called.once();
});

test('conf(): Call this.fs.copyTpl once', () => {
  context.templatePath = context.destinationPath = path => path;
  context.fs = {
    copyTpl: () => {}
  };
  const spy = chai.spy.on(context.fs, 'copyTpl');
  TestUtils.call(context, 'writing.conf');
  expect(spy).to.have.been.called.once();
});
