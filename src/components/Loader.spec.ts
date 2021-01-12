import { render } from '@testing-library/svelte';
import Loader from './Loader.svelte';

describe('loader component', () => {
  it('should render a loader component', () => {
    const { container } = render(Loader, {
      // no-op.
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
