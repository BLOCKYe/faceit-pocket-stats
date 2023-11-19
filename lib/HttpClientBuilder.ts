import axios, { AxiosInstance } from 'axios';

export default class HttpClientBuilder {
  private baseURLContent: string = '';
  private headersContent: object = {};
  private paramsContent: object = {};

  /**
   * Set base url
   * @param baseURL
   */
  public baseURL(baseURL?: string) {
    if (baseURL) {
      this.baseURLContent = baseURL;
    }

    return this;
  }

  /**
   * Set optional request headers
   * @param headers
   */
  public headers(headers?: object) {
    if (headers) {
      this.headersContent = headers;
    }

    return this;
  }

  /**
   * Set optional params
   * @param params
   */
  public params(params?: {}) {
    if (params) {
      this.paramsContent = params;
    }

    return this;
  }

  /**
   * Return axios client
   */
  public build(): AxiosInstance {
    return axios.create({
      baseURL: this.baseURLContent,
      headers: this.headersContent,
      params: this.paramsContent,
    });
  }
}
