import type { DcClient } from '../dc-client';

interface Status {
  id: string;
  label?: string;
  color?: string;
}

export async function fetchAndHydrate(
  client: DcClient,
  hubId: string,
  statuses: string[],
  params: Record<string, unknown> = { size: 100 }
): Promise<Status[]> {
  const { data } = await client.get(`/hubs/${hubId}/workflow-states`, params);
  return statuses.map((id: string) => {
    const found = (data as any)?._embedded['workflow-states'].find(
      (status: any) => status.id === id
    );
    if (found) {
      return {
        id: found.id,
        label: found.label,
        color: found.color
      };
    }
    return { id };
  });
}
