import test from 'tape';

test('create-action', (t) => {

  t.test('2 params', (assert) => {
    const { default: createAction } = require('./create-action');
    const action = createAction('fake-namespace', 'fake-name');
    const result = action();
    const expectedResult = {
      type: 'nelsonbury/fake-namespace/fake-name',
    };

    assert.deepEqual(result, expectedResult);
    assert.end();
  });

  t.test('curried', (assert) => {
    const { default: createAction } = require('./create-action');
    const action = createAction('fake-namespace')('fake-name');
    const result = action();
    const expectedResult = {
      type: 'nelsonbury/fake-namespace/fake-name',
    };

    assert.deepEqual(result, expectedResult);
    assert.end();
  });

});
