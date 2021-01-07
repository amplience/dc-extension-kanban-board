import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import Gravatar from './Gravatar.svelte';

jest.mock('md5', () => ({ default: jest.fn().mockReturnValue('HASH') }));

xdescribe('Gravatar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render a placeholder image when no gravatar is available', async () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({ ok: false } as Response)
    );
    const { container } = render(Gravatar, {
      user: {
        firstName: 'TEST',
        lastName: 'USER',
        email: 'test-user@bigcontent.io',
      },
    });
    await tick();
    await tick();
    await tick();
    await tick();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a gravatar', async () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({ ok: true } as Response)
    );
    const { container } = render(Gravatar, {
      user: {
        firstName: 'TEST',
        lastName: 'USER',
        email: 'test-user@bigcontent.io',
      },
    });

    await tick();
    await tick();
    await tick();
    await tick();
    expect(container.firstChild).toMatchSnapshot();
  });
});
