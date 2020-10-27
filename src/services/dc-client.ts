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
    params: Record<string, unknown>
  ): Promise<HttpResponse> {
    return await this.client.request({
      method: HttpMethod.GET,
      url: `${FAKE_DC_SERVICE}${path}${toQueryStr(params)}`,
    });
  }
}
