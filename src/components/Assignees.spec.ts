import { render } from '@testing-library/svelte';
import Assignees from './Assignees.svelte';

jest.mock('md5', () => ({ default: jest.fn().mockReturnValue('HASH') }));

describe('Assignees', () => {
  it('should render a single assignee', async () => {
    const { container } = render(Assignees, {
      users: [
        {
          firstName: 'TEST',
          lastName: 'USER',
          email: 'test-user@bigcontent.io',
        },
      ],
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render multiple assignees', async () => {
    const { container } = render(Assignees, {
      users: [
        {
          firstName: 'TEST',
          lastName: 'USER',
          email: 'test-user@bigcontent.io',
        },
        {
          firstName: 'ANOTHER',
          lastName: 'USER',
          email: 'another-user@bigcontent.io',
        },
      ],
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not output any assignees if an empty array is passed', async () => {
    const { container } = render(Assignees, {
      users: [],
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not output any assignees if not passed any users', async () => {
    const { container } = render(Assignees);
    expect(container.firstChild).toMatchSnapshot();
  });
});
