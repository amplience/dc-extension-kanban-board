export default class ContentItem {
  public label: string;
  public contentType: string;
  public modified: string;
  public id: string;
  public version: number;
  public lastModifiedDate: string;
  constructor({ label, schema, lastModifiedDate, id, version }: any = {}) {
    this.label = label;
    this.contentType = schema;
    this.modified = new Date(lastModifiedDate).toLocaleDateString();
    this.id = id;
    this.version = version;
    this.lastModifiedDate = lastModifiedDate;
  }
}
