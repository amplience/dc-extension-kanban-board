export default class ContentItem {
  public label: string;
  public schema: string;
  public id: string;
  public version: number;
  public lastModifiedDate: string;
  constructor({ label, schema, lastModifiedDate, id, version }: any = {}) {
    this.label = label;
    this.schema = schema;
    this.id = id;
    this.version = version;
    this.lastModifiedDate = lastModifiedDate;
  }

  get modified(): string {
    const date = new Date(this.lastModifiedDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
