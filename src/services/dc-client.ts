import {
  HttpClient,
  HttpMethod,
  HttpRequest,
  HttpResponse,
} from 'dc-extensions-sdk';
import { toQueryStr } from '../utils/';

const CONTENT_SERVICE_PATH = '/v2/content';
const FAKE_DC_SERVICE = `https://fake-dc-service-extension-kanban-board.com${CONTENT_SERVICE_PATH}`;

interface HalLink {
  href: string;
}

interface Page {
  items: any[];
  _links: Record<string, HalLink>;
  page: Record<string, string>;
}

type Pages = Page;

interface PagesResponse {
  data: Pages;
}
export class DcClient {
  constructor(private client: HttpClient) {}
  async post(
    path: string,
    data: Record<string, any>,
    params: Record<string, any>
  ): Promise<HttpResponse> {
    const config: HttpRequest = {
      method: HttpMethod.POST,
      url: `${FAKE_DC_SERVICE}${path}${toQueryStr(params)}`,
    };
    if (data) {
      config.data = data;
    }
    return await this.client.request(config);
  }

  async patch(
    path: string,
    data: Record<string, unknown>,
    params: Record<string, unknown>
  ): Promise<HttpResponse> {
    const config: HttpRequest = {
      method: HttpMethod.PATCH,
      url: `${FAKE_DC_SERVICE}${path}${toQueryStr(params)}`,
    };
    if (data) {
      config.data = data;
    }
    return await this.client.request(config);
  }

  async get(
    path: string,
    params: Record<string, any> = {}
  ): Promise<HttpResponse> {
    return await this.client.request({
      method: HttpMethod.GET,
      url: `${FAKE_DC_SERVICE}${path}${toQueryStr(params)}`,
    });
  }

  async getAll(
    rel: string,
    path: string,
    params: Record<string, any> = {}
  ): Promise<PagesResponse> {
    let { items, _links, page } = await this.getPage(rel, path, {
      ...params,
      size: 100,
    });
    while (_links.next) {
      const result = await this.getPage(rel, toPath(_links.next.href), params);
      _links = result._links;
      page = result.page;
      items = items.concat(result.items);
    }

    return {
      data: {
        items,
        page,
        _links,
      },
    };
  }

  async getPage(
    rel: string,
    path: string,
    params: Record<string, any> = {}
  ): Promise<Page> {
    const { data } = await this.get(path, params);
    if (!data) {
      throw new Error('DcClient: Unable to get page');
    }
    const {
      _embedded: { [rel]: items },
      _links,
      page,
    } = data as any;
    return { items, _links, page };
  }
}

function toPath(url: string) {
  return url.split(CONTENT_SERVICE_PATH)[1];
}
