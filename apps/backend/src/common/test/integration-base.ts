import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export abstract class IntegrationTest {
  protected app: INestApplication;
  protected moduleRef: TestingModule;

  protected async init(testBed: () => Promise<TestingModule>) {
    this.moduleRef = await testBed();
    this.app = this.moduleRef.createNestApplication();
    // Add common interceptor here later
    await this.app.init();
  }

  protected async cleanup() {
    await this.app.close();
    await this.moduleRef.close();
  }
}

export const createPaginatedResponse = (items: any[], meta: any) => ({ items, meta });
