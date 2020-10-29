export default class ContentType {
  public label: string;
  public contentTypeUri: string;

  constructor({ settings, contentTypeUri }: any = {}) {
    this.label = settings.label;
    this.contentTypeUri = contentTypeUri;
  }
}
