import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-sign/add-sign-five', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AddSign::AddSignFive />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <AddSign::AddSignFive>
        template block text
      </AddSign::AddSignFive>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
