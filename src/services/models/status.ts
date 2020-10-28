interface FacetField {
  facetAs: string;
  field: string;
  name: string;
  filter?: Record<string, any>;
  range?: Record<string, any>;
}

export default class Status {
  public id: string;
  public hydrated: boolean = false;
  public label?: string;
  public color?: string;
  public facets?: FacetField[];
  constructor({ id, label, color }: any = {}) {
    this.id = id;
    if (label && color) {
      this.hydrated = true;
      this.label = label;
      this.color = color;
      this.facets = [];
      this.addStatusFacetField(this.id);
    }
  }

  addStatusFacetField(id: string) {
    this.facets?.push({
      facetAs: 'ENUM',
      field: 'workflow.state',
      filter: { type: 'IN', values: [id] },
      name: 'workflow.state',
    });
  }

  addDateFacetField() {
    this.facets?.push({
      facetAs: 'DATE',
      name: 'lastModifiedDate:Last 7 days',
      field: 'lastModifiedDate',
      range: { start: 'NOW', end: '-7:DAYS' },
      filter: { type: 'DATE', values: ['-7:DAYS,NOW'] },
    });
  }
}
