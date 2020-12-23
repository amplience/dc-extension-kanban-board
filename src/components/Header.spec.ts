import { render } from '@testing-library/svelte';
import Header from './Header.svelte';

describe('header component', () => {
  it('should render a header component with values', () => {
      const { container } = render(Header, {
        contentItemsCount: 100,
        contentItemsPath: 'CONTENT_ITEMS_PATH'
      });

      expect(container.firstChild).toMatchSnapshot();
  });


  it('should render a header component with default values', () => {
    const { container } = render(Header, {
      // no-op.
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});