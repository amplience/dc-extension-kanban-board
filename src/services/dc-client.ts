import { HttpClient, HttpMethod, HttpRequest, HttpResponse } from "dc-extensions-sdk";
import { queryString } from '../utils/queryString';

export class DcClient{
  private pathPrefix: string = 'https://fake.com/v2/content';
  constructor(private client: HttpClient) {
  }
  async post(path: string, data: Record<string, unknown>, params: Record<string, unknown>): Promise<HttpResponse> { 
    const config: HttpRequest = {
      method: HttpMethod.POST,
      url: `${this.pathPrefix}${path}${queryString(params)}`
    }
    if (data) {
      config.data = data;
    }
    return await this.client.request(config)
  }

  async get(path: string, params: Record<string, unknown>): Promise<HttpResponse> {
    return await this.client.request({
      method: HttpMethod.GET,
      url: `${this.pathPrefix}${path}${queryString(params)}`
    })
  }
}