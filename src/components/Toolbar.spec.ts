import { render } from '@testing-library/svelte';
import Toolbar from './Toolbar.svelte';

describe('toolbar component', () => {
  it('should render a toolbar component', () => {
    const { container } = render(Toolbar, {
      // no-op.
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
