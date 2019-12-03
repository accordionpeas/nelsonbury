import test from 'tape';
import fetchUtil, {
  encodeBody,
  decodeBody,
  getHeaders,
  readAllChunks,
  getURL,
} from './index';

class MockedFormData {
  constructor() {
    this.data = {};
  }

  append(key, val) {
    this.data[key] = val;
  }
}

class MockedResponse {
  constructor(string, props) {
    this.string = string;
    this.props = props;
  }

  text() {
    return this.string;
  }
}

test('fetch util', (t) => {

  t.test('encodeBody', (t) => {

    t.test('GET request', (assert) => {
      global.FormData = MockedFormData;

      const fakeData = {
        fakeProp: 'fake-val',
      };
      const result = encodeBody({ method: 'GET', data: fakeData });
      const expectedResult = null;

      assert.deepEqual(result, expectedResult);
      assert.end();

      delete global.FormData;
    });

    t.test('default to JSON encoding', (assert) => {
      global.FormData = MockedFormData;

      const fakeData = {
        fakeProp: 'fake-val',
      };
      const result = encodeBody({ data: fakeData });
      const expectedResult = JSON.stringify(fakeData);

      assert.deepEqual(result, expectedResult);
      assert.end();

      delete global.FormData;
    });

    t.test('is GET request', (assert) => {
      global.FormData = MockedFormData;

      const fakeMethod = 'GET';
      const fakeData = { prop: 'val' };
      const result = encodeBody({ method: fakeMethod, data: fakeData });
      const expectedResult = null;

      assert.equal(result, expectedResult);
      assert.end();

      delete global.FormData;
    });

  });

  t.test('decodeBody', (t) => {

    t.test('returns json response', async (assert) => {
      const fakeResponse = {
        ok: 'fake-ok',
        status: 'fake-status',
        text: function() {
          return '{ "fakeProp": "fake-val" }';
        },
        json: async function() {
          return { fakeProp: 'fake-val' };
        },
      };
      const result = await decodeBody({ response: fakeResponse });
      const expectedResult = {
        ok: 'fake-ok',
        status: 'fake-status',
        body: {
          fakeProp: 'fake-val',
        },
      };

      assert.deepEqual(result, expectedResult);
      assert.end();
    });

    t.test('returns text if error occures', async (assert) => {
      const fakeResponse = {
        ok: 'fake-ok',
        status: 'fake-status',
        json: async function() {
          throw new Error('test');
        },
        text: async function(){
          return 'fake-text';
        },
      };
      const result = await decodeBody({ response: fakeResponse });
      const expectedResult = {
        ok: 'fake-ok',
        status: 'fake-status',
        body: 'fake-text',
      };

      assert.deepEqual(result, expectedResult);
      assert.end();
    });

  });

  t.test('getHeaders', (t) => {

    t.test('not FormData', (assert) => {
      global.FormData = MockedFormData;

      const fakeData = {};
      const result = getHeaders({ data: fakeData });
      const expectedResult = {
        'Content-Type': 'application/json',
      };

      assert.deepEqual(result, expectedResult);
      assert.end();

      delete global.FormData;
    });

  });

  t.test('getURL', (t) => {

    t.test('is GET method', (assert) => {
      const fakeURL = 'fake-url';
      const fakeMethod = 'GET';
      const fakeData = { fakeProp: 'fake-val' };

      const result = getURL({
        url: fakeURL,
        method: fakeMethod,
        data: fakeData,
      });

      const expectedResult = 'fake-url?fakeProp=fake-val';

      assert.equal(result, expectedResult);
      assert.end();
    });

    t.test('is not GET method', (assert) => {
      const fakeURL = 'fake-url';
      const fakeMethod = 'fake-method';
      const fakeData = { fakeProp: 'fake-val' };

      const result = getURL({
        url: fakeURL,
        method: fakeMethod,
        data: fakeData,
      });

      const expectedResult = 'fake-url';

      assert.equal(result, expectedResult);
      assert.end();
    });
  
  });

  t.test('fetch', (t) => {

    t.test('fetch', async (assert) => {
      assert.plan(9);

      fetchUtil.__Rewire__('isServer', false);

      const fakeURL = 'fake-url';
      const fakeMethod = 'fake-method';
      const fakeData = {
        fakeDataProp: 'fake-data-val',
      };
      const fakeHeaders = {
        fakeHeaderProp: 'fake-header-val',
      };
      const fakeEncodedBody = {
        fakeEncodedBodyProp: 'fake-encoded-body-val',
      };
      const fakeOK = true;
      const fakeStatus = 200;
      const fakeDecodedBody = {
        fakeDecodedProp: 'fake-decoded-val',
      };
      const fakeResponse = {
        ok: fakeOK,
        status: fakeStatus,
      };
      const fakeSignal = 'fake-signal';

      const mockedFetch = async (url, props) => {
        assert.equal(url, fakeURL);
        assert.deepEqual(props, {
          method: fakeMethod,
          headers: fakeHeaders,
          body: fakeEncodedBody,
          credentials: 'same-origin',
          signal: fakeSignal,
        });

        return fakeResponse;
      };

      global.window = global;
      global.FormData = MockedFormData;
      global.fetch = mockedFetch;

      fetchUtil.__Rewire__('getHeaders', ({ data }) => {
        assert.equal(data, fakeData);
        return fakeHeaders;
      });

      fetchUtil.__Rewire__('encodeBody', ({ data }) => {
        assert.deepEqual(data, fakeData);
        return fakeEncodedBody;
      });

      fetchUtil.__Rewire__('getURL', ({ url, method, data }) => {
        assert.equal(url, fakeURL);
        assert.equal(method, fakeMethod);
        assert.equal(data, fakeData);
        return url;
      });

      fetchUtil.__Rewire__('decodeBody', ({ response }) => {
        assert.deepEqual(response, {
          ok: fakeOK,
          status: fakeStatus,
        });
        return {
          ok: response.ok,
          status: response.status,
          body: fakeDecodedBody,
        };
      });

      const response = await fetchUtil({
        url: fakeURL,
        method: fakeMethod,
        data: fakeData,
        signal: fakeSignal,
      });

      const expectedResponse = {
        ok: fakeOK,
        status: fakeStatus,
        body: fakeDecodedBody,
      };

      delete global.window;
      delete global.fetch;
      delete global.FormData;

      fetchUtil.__ResetDependency__('getHeaders');
      fetchUtil.__ResetDependency__('encodeBody');
      fetchUtil.__ResetDependency__('decodeBody');
      fetchUtil.__ResetDependency__('getURL');

      assert.deepEqual(response, expectedResponse);

      fetchUtil.__ResetDependency__('isServer');
      assert.end();

    });

    t.test('default options', async (assert) => {
      assert.plan(2);

      fetchUtil.__Rewire__('isServer', false);

      const mockedFetch = async (url, props) => {
        assert.equal(props.method, 'GET');
        return {};
      };

      global.window = global;
      global.FormData = MockedFormData;
      global.fetch = mockedFetch;

      fetchUtil.__Rewire__('encodeBody', ({ data }) => {
        assert.deepEqual(data, {});
        return {};
      });

      fetchUtil.__Rewire__('decodeBody', ({ response }) => {
        return {};
      });

      await fetchUtil({});

      delete global.FormData;
      delete global.fetch;
      delete global.window;

      fetchUtil.__ResetDependency__('encodeBody');
      fetchUtil.__ResetDependency__('decodeBody');
      fetchUtil.__ResetDependency__('isServer');

      assert.end();
    });

  });

});