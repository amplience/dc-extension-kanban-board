import { getByTestId, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import { selectedAssignees } from '../services/stores/filters/selected-assignees';
import { users } from '../services/stores/users';
import AssigneeFilter from './AssigneeFilter.svelte';

describe('AssigneeFilter', () => {
  const usersList = [
    {
      id: 'ID_1',
      firstName: 'TEST',
      lastName: 'USER',
      email: 'test-user@bigcontent.io',
    },
    {
      id: 'ID_2',
      firstName: 'ANOTHER',
      lastName: 'USER',
      email: 'another-user@bigcontent.io',
    },
  ];

  beforeEach(() => {
    selectedAssignees.set([]);
    users.set(usersList);
  });

  it('should render the assignee filter', () => {
    const { container } = render(AssigneeFilter);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the assignee filter with selected assignees', async () => {
    selectedAssignees.set(['ID_1', 'ID_2']);

    const { container } = render(AssigneeFilter);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the modal with a list of users', async () => {
    const { container } = render(AssigneeFilter);

    const filterIcon = getByTestId(container, 'filter-icon');
    filterIcon.click();
    await tick();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the modal with a list of users with checkboxes ticked', async () => {
    selectedAssignees.set(['ID_1', 'ID_2']);
    const { container } = render(AssigneeFilter);

    const filterIcon = getByTestId(container, 'filter-icon');
    filterIcon.click();
    await tick();
    expect(container.firstChild).toMatchSnapshot();
  });
});
