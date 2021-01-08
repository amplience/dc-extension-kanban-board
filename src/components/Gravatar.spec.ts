import { render } from '@testing-library/svelte';
import { tick } from 'svelte';
import Gravatar from './Gravatar.svelte';

jest.mock('md5', () => ({
  default: jest.fn().mockReturnValue('50b7748612b28db487d115f220bb77ab'),
}));

/* TODO: Fix tests => Mock does not seem to change per test and will only set fetch once */
xdescribe('Gravatar', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore();
  });
  it('should render a gravatar', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      console.log('FIRST MOCK');
      return Promise.resolve({ ok: true } as Response);
    });
    const { container } = render(Gravatar, {
      user: {
        firstName: 'TEST',
        lastName: 'USER',
        email: 'test-user@bigcontent.io',
      },
    });

    await tick();
    await tick();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a placeholder image when no gravatar is available', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      console.log('SECOND MOCK');
      return Promise.reject('NOT FOUND');
    });
    const { container } = render(Gravatar, {
      user: {
        firstName: 'TEST',
        lastName: 'USER',
        email: 'test-user@bigcontent.io',
      },
    });
    await tick();
    await tick();
    expect(container.firstChild).toMatchSnapshot();
  });
});
