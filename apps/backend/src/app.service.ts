export class AppService {
  getHealth() {
    return {
      status: 'ok',
      app: 'HMT ERP Backend',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
