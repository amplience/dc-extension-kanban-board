import { render } from '@testing-library/svelte';
import Error from './Error.svelte';

describe('error component', () => {
  it('should render an error component with value', () => {
      const { container } = render(Error, {
        reason: 'REASON'
      });

      expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error component with default value', () => {
      const { container } = render(Error, {
      // no-op.
      });

      expect(container.firstChild).toMatchSnapshot();
  });
});