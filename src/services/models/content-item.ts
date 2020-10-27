export default class ContentItem {
  public label: string;
  public contentType: string;
  public modified: string;
  public id: string;
  constructor({ label, schema, lastModifiedDate, id }: any = {}) {
    this.label = label;
    this.contentType = schema;
    this.modified = new Date(lastModifiedDate).toLocaleDateString();
    this.id = id;
  }
}
