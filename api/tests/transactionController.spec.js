const setup = require("./setup.js");
const {
  createUser,
  getCustomer,
  createAccount,
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction} = require("./sharedFunctions.js");

const initialData = setup.initialTransactionData
const initialAccountData = setup.initialAccountData;
const initialUserData = setup.initialUserData;
let user;
let customer;
let account;
let transaction;
let headers;
const addIDs = async (object) => {
  object.userID = await user.id;
  object.customerID = await customer.id;
  object.accountID = await account.id;
}

jest.setTimeout(3 * 60 * 1000);

describe('TRANSACTION CONTROLLER', () => {
  beforeAll(async () => {
    const result = await createUser(initialUserData);
    user = await result.data.user;
    const auth = await result.data.user.access_token;
    headers = { Authorization: `Bearer ${auth}` };
    customer = (await getCustomer({ id: user.customerID }, `Bearer ${auth}`)).data;
    initialAccountData.checkSum = await customer.checkSum;
    initialAccountData.customerID = await customer.id;
    initialAccountData.authedUsers = [{
      id: user.id,
      permissions: ["manage"]
    }]
    const accountResult = await createAccount({ ...initialAccountData, customerID: customer.id }, headers.Authorization);
    account = await accountResult.data.account;
  });
  // CREATE
  describe('create()', () => {
    test('Throws error if not authenticated', async () => {
      const result = await createTransaction(initialData, null);
      const statusCode = result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if type is missing', async () => {
      const result = await createTransaction({ ...initialData, customerID: customer.id, type: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if accountID is missing', async () => {
      const result = await createTransaction({ ...initialData, account: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if account does not exist', async () => {
      const result = await createTransaction({ ...initialData, accountID: "62ae115186a84733b024178edfdfdfd"  }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if customerID is missing', async () => {
      const result = await createTransaction({ ...initialData, customerID: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if customer does not exist', async () => {
      const result = await createTransaction({ ...initialData, customerID: "62ae115186a84733b024178edfdfdfd"  }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if userID is missing', async () => {
      const result = await createTransaction({ ...initialData, userID: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if user does not exist', async () => {
      const result = await createTransaction({ ...initialData, userID: "62ae115186a84733b024178edfdfdfd"  }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if amount is missing', async () => {
      const result = await createTransaction({ ...initialData, amount: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if amount is zero', async () => {
     await addIDs(initialData);
      const result = await createTransaction({ ...initialData, amount: 0 }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if type is missing', async () => {
      await addIDs(initialData);
      const result = await createTransaction({ ...initialData, type: null }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if type is nonsense', async () => {
      await addIDs(initialData);
      const result = await createTransaction({ ...initialData, type: "incorrect type" }, headers.Authorization)
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Creates transaction if data is complete', async () => {
      await addIDs(initialData);
      const result = await createTransaction({ ...initialData }, headers.Authorization);
      const statusCode = await result.status;
      transaction = await result.data.transaction; 
      expect(statusCode.toString()).toEqual("200");
    });
  });

  // READ
  describe('read()', () => {
    test('Throws error on unauthenticated read request', async () => {
      const result = await getTransaction({ id: transaction.id });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized read request', async () => {
      const result = await getTransaction({ id: '12345' }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Returns transaction by id if user is authenticated and authorized', async () => {
      const result = await getTransaction({ id: transaction.id }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })

  // UPDATE
  describe('update()', () => {
    test('Throws error on unauthenticated update request', async () => {
      const result = await updateTransaction({ id: transaction.id, updates: { type: "credit" } });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized update request', async () => {
      const result = await updateTransaction({ id: '12345', updates: { type: "credit" }  }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Updates account data if user is authenticated and authorized', async () => {
      const result = await updateTransaction({ id: transaction.id, updates: { type: "credit" } }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })

  // DELETE
  describe('del()', () => {
    test('Throws error on unauthenticated delete request', async () => {
      const result = await deleteTransaction({ id: transaction.id });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized delete request', async () => {
      const result = await deleteTransaction({ id: '12345' }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Deletes account if user is authed and has permission', async () => {
      const result = await deleteTransaction({ id: transaction.id }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })
  afterAll(async () => {
    await deleteUser({ id: user.id },  headers.Authorization);
  });
})
