import { render } from '@testing-library/svelte';
import Count from './Count.svelte';

describe('count component', () => {
  it('should render a count component with count and total value of 1', () => {
    const { container } = render(Count, {
      count: 1,
      total: 1,
      additionalInfo: 'ADDITIONAL_INFO',
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a count component with count greater than 1', () => {
    const { container } = render(Count, {
      count: 2,
      total: 4,
      additionalInfo: 'ADDITIONAL_INFO',
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a count component with default values', () => {
    const { container } = render(Count, {
      additionalInfo: '',
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
