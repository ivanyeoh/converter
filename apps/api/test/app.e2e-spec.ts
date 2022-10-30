import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/from-docx-to-pdf (POST)', () => {
    return request(app.getHttpServer())
      .post('/from-docx-to-pdf')
      .attach('file', 'test/fixtures/test.docx')
      .expect(201)
      .expect('Content-Type', 'application/pdf; charset=utf-8');
  });
});
