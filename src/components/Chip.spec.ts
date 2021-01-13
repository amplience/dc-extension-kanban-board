import { render } from '@testing-library/svelte';
import Chip from './Chip.svelte';

describe('chip component', () => {
  it('should render a chip component', () => {
    const { container } = render(Chip, {
      label: 'LABEL',
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
