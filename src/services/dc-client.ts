import {
  HttpClient,
  HttpMethod,
  HttpRequest,
  HttpResponse,
} from 'dc-extensions-sdk';
import { toQueryStr } from '../utils/';

const FAKE_DC_SERVICE = 'https://fake.com/v2/content';
export class DcClient {
  constructor(private client: HttpClient) {}
  async post(
    path: string,
    data: Record<string, unknown>,
    params: Record<string, unknown>
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
    params: Record<string, unknown> = {}
  ): Promise<HttpResponse> {
    return await this.client.request({
      method: HttpMethod.GET,
      url: `${FAKE_DC_SERVICE}${path}${toQueryStr(params)}`,
    });
  }

  async getAll(rel, url, options = { params: {} }) {
    options.params = { ...options.params, size: 100 };
    const recursivePagingHandler = async ({
      data: { page, _embedded, _links },
    }: any) => {
      if (!_embedded.rel) {
        return { data: [], page };
      }

      const results = { data: _embedded[rel], page };
      const next = _links.next;

      if (!next) {
        return results;
      }

      const nextResults = await this.get(next.href);
      recursivePagingHandler(nextResults);
      return await Promise.all([results, nextResults]).then((pages) => {
        const data = [...pages[0].data, ...pages[1].data];
        return { data, page: pages[1].page };
      });
    };
    const nextResults = await this.get(url, options);
    return recursivePagingHandler(nextResults);
  }
}
