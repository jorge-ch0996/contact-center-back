import { connect } from 'socket.io-client';
const baseUrl = 'http://localhost:8082';

class Socket {
  client: any = null;

  constructor() {
    this.client = connect(baseUrl);
  }

  addToken(token: string) {
    console.log('addToken', token);
    this.client = connect(baseUrl, { query: { token } });
  }

  removeToken() {
    this.client = connect(baseUrl);
  }
}

const instance = new Socket();

export default instance;
