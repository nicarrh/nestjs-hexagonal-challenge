import { ContractModel } from '../../../domain/contract.model';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../../app.module';
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client';

const prismaMock = {
  contract: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
};

describe('ContractController', () => {
  const mockContract: ContractModel = {
    clientName: 'Test User 2',
    email: 'userTest2@gmail.com',
    accountNumber: '200-221-212',
    amount: 5000,
    currency: 'USD',
  };
  const mockParams = {
    accountNumber: '200-221-252',
  };

  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: PrismaClient,
          useValue: prismaMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaMock.contract.findMany.mockClear();
    prismaMock.contract.create.mockClear();
    await app.init();
  });

  it('should create a contract (POST) /contract', async () => {
    const createdContract: ContractModel = {
      clientName: 'Test User 2',
      email: 'userTest2@gmail.com',
      accountNumber: '200-221-212',
      amount: 5000,
      currency: 'USD',
    };

    prismaMock.contract.create.mockResolvedValueOnce(createdContract);
    return await request(app.getHttpServer())
      .post('/contract')
      .set('Accept', 'application/json')
      .send(mockContract)
      .expect(HttpStatus.CREATED);
  });

  it('should reject with 500 status code (POST) /contract', async () => {
    const badCreateContract = {
      email: 'userTest2@gmail.com',
      accountNumber: '200-221-212',
      amount: 5000,
      currency: 'USD',
    };

    prismaMock.contract.create.mockRejectedValueOnce(HttpStatus.BAD_REQUEST);
    return await request(app.getHttpServer())
      .post('/contract')
      .set('Accept', 'application/json')
      .send(badCreateContract)
      .expect(HttpStatus.BAD_REQUEST);
  });
  it('should get filtered contracts GET /contractList', async () => {
    prismaMock.contract.findMany.mockResolvedValueOnce([mockContract]);
    const result = await request(app.getHttpServer())
      .get('/contractList')
      .set('Accept', 'application/json')
      .query(mockParams);

    expect(result.status).toBe(HttpStatus.OK);
  });
  it('should get 400 Error on contracts GET /contractList', async () => {
    prismaMock.contract.findMany.mockRejectedValueOnce(HttpStatus.BAD_REQUEST);
    const result = await request(app.getHttpServer())
      .get('/contractList')
      .set('Accept', 'application/json')
      .query({});

    expect(result.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
