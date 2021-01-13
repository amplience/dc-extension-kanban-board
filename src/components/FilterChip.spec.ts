import { render } from '@testing-library/svelte';
import FilterChip from './FilterChip.svelte';

describe('FilterChip', () => {
  it('should render a Chip', () => {
    const { container } = render(FilterChip, {
      label: 'test-label',
      onClick: () => {
        /* noop */
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a clickable Chip', () => {
    const { container } = render(FilterChip, {
      label: 'test-label',
      clickable: true,
      onClick: () => {
        /* noop */
      },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an active Chip', () => {
    const { container } = render(FilterChip, {
      label: 'test-label',
      active: true,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an clickable active Chip', () => {
    const { container } = render(FilterChip, {
      label: 'test-label',
      active: true,
      clickable: true,
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
