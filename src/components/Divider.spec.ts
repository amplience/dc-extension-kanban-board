import { render } from '@testing-library/svelte';
import Divider from './Divider.svelte';

describe('divider component', () => {
  it('should render a divider component', () => {
    const { container } = render(Divider, {
      // no-op.
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
