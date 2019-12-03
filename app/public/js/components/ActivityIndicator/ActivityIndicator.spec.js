import jsdomGlobal from 'jsdom-global';
import test from 'tape';
import React from 'react';
import { render } from 'react-testing-library';
import { minify } from 'html-minifier';
import ActivityIndicator from './ActivityIndicator';

test('ActivityIndicator component', (t) => {

  t.test('render', (t) => {

    t.test('default', (assert) => {
      const cleanup = jsdomGlobal();

      const { container } = render(
        <ActivityIndicator />
      );
  
      const result = container.innerHTML;
  
      const expectedResult = `
        <div class="activity-indicator">
          <div class="activity-indicator__loader activity-indicator__loader--large">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      `;
  
      assert.equal(result, minify(expectedResult, { collapseWhitespace: true }));
      assert.end();
      cleanup();
    });

  });

});
