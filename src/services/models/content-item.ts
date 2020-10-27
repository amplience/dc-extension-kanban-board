export default class ContentItem {
  public label: string;
  public contentType: string;
  public modified: string;
  constructor({ label, schema, lastModifiedDate }: any = {}) {
    this.label = label;
    this.contentType = schema;
    this.modified = new Date(lastModifiedDate).toLocaleDateString();
  }
}
