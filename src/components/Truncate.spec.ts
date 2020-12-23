import { render } from '@testing-library/svelte';
import Truncate from './Truncate.svelte';

describe('truncate component', () => {
  it('should render a truncate component with value', () => {
      const { container } = render(Truncate, {
        text: 'TEXT' 
      });

      expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a truncate component with default value', () => {
      const { container } = render(Truncate, {
        // no-op.
      });

      expect(container.firstChild).toMatchSnapshot();
  });
});
