import { render } from '@testing-library/svelte';
import Icon from './Icon.svelte';

describe('Icon', () => {
  it('should render a Icon', () => {
    const iconMock = '<svg><text>svg text</text></svg>';
    const { container } = render(Icon, { icon: iconMock });
    expect(container.firstChild).toMatchSnapshot();
  });
});
