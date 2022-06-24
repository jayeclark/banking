const setup = require("./setup.js");
const {
  createUser,
  getCustomer,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount } = require("./sharedFunctions.js");

const initialData = setup.initialAccountData;
const initialUserData = setup.initialUserData;
let user;
let customer;
let account;
let headers;

jest.setTimeout(3 * 60 * 1000);

describe('ACCOUNT CONTROLLER', () => {
  beforeAll(async () => {
    const result = await createUser(initialUserData);
    user = await result.data.user;
    const auth = await result.data.user.access_token;
    headers = { Authorization: `Bearer ${auth}` };
    customer = (await getCustomer({ id: user.customerID }, `Bearer ${auth}`)).data;
    initialData.checkSum = await customer.checkSum;
    initialData.customerID = await customer.id;
    initialData.authedUsers = [{
      id: user.id,
      permissions: ["manage"]
    }]
  });
  // CREATE
  describe('create()', () => {
    test('Throws error if not authenticated', async () => {
      const result = await createAccount(initialData, null);
      const statusCode = result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if type is missing', async () => {
      const result = await createAccount({ ...initialData, customerID: customer.id, type: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if customerID is missing', async () => {
      const result = await createAccount({ ...initialData, customerID: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if customer does not exist', async () => {
      const result = await createAccount({ ...initialData, customerID: "62ae115186a84733b024178edfdfdfd"  }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if checksum is missing', async () => {
      initialData.customerID = customer.id;
      const result = await createAccount({ ...initialData, customerID: customer.id, checkSum: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if checksum is not a match', async () => {
      const result = await createAccount({ ...initialData, customerID: "BWnXM6RL2T3KEB0U7rOn" }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if no authed users', async () => {
      initialData.customerID = customer.id;
      const result = await createAccount({ ...initialData, customerID: customer.id, authedUsers: [] }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Creates account if data is complete', async () => {
      initialData.customerID = customer.id;
      const result = await createAccount({ ...initialData, customerID: customer.id }, headers.Authorization);
      const statusCode = await result.status;
      account = await result.data.account;
      expect(statusCode.toString()).toEqual("200");
    });
  });

  // READ
  describe('read()', () => {
    test('Throws error on unauthenticated read request', async () => {
      const result = await getAccount({ id: account.id });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized read request', async () => {
      const result = await getAccount({ id: '12345' }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Returns account by id if user is authenticated and authorized', async () => {
      const result = await getAccount({ id: account.id }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })

  // UPDATE
  describe('update()', () => {
    test('Throws error on unauthenticated update request', async () => {
      const result = await updateAccount({ id: account.id, updates: { nickname: "Other Account" } });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized update request', async () => {
      const result = await updateAccount({ id: '12345', updates: { nickname: "Other Account" }  }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Updates account data if user is authenticated and authorized', async () => {
      const result = await updateAccount({ id: account.id, updates: { nickname: "Other Account" } }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })

  // DELETE
  describe('del()', () => {
    test('Throws error on unauthenticated delete request', async () => {
      const result = await deleteAccount({ id: account.id });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized delete request', async () => {
      const result = await deleteAccount({ id: '12345' }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Deletes account if user is authed and has permission', async () => {
      const result = await deleteAccount({ id: account.id }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })
  afterAll(async () => {
    await deleteUser({ id: user.id },  headers.Authorization);
  });
})
