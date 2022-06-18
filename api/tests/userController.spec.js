const axios = require("axios");

let user;
let headers;
let initialData = {
  username: Date.now(),
  firstName: "Test",
  middleName: "Ish",
  lastName: "Person",
  birthDate: "1980-02-10",
  primaryEmail: 0,
  primaryPhone: 0,
  primaryAddress: 0,
  email: ["me@me.com"],
  phone: ["617 555 5555"],
  address: ['1234 Street City State 00000'],
  password: "fakefakefake",
}

async function createUser(data) {
  let result;
  try {
    result = await axios.post("http://localhost:8080/api/auth/register", { ...data }, {});
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function getUser(data, auth) {
  let result;
  try {
    result = await axios.get(`http://localhost:8080/api/user/`, { params: data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function updateUser(data, auth) {
  let result;
  try {
    result = await axios.put(`http://localhost:8080/api/user/`, { data }, { headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function deleteUser(data, auth) {
  let result;
  try {
    result = await axios.delete("http://localhost:8080/api/user/", { data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

describe('USER CONTROLLER', () => {
  describe('create()', () => {
    test('Throws error if username is missing', async () => {
      const result = await createUser({ ...initialData, username: null })
      const statusCode = result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if firstName is missing', async () => {
      const result = await createUser({ ...initialData, firstName: null })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if lastName is missing', async () => {
      const result = await createUser({ ...initialData, lastName: null })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if birthDate is missing', async () => {
      const result = await createUser({ ...initialData, birthDate: null })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if primaryEmail is null', async () => {
      const result = await createUser({ ...initialData, primaryEmail: null })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if email is empty', async () => {
      const result = await createUser({ ...initialData, email: [] })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if primaryPhone is null', async () => {
      const result = await createUser({ ...initialData, primaryPhone: null })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if phone is empty', async () => {
      const result = await createUser({ ...initialData, phone: [] })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if primaryAddress is null', async () => {
      const result = await createUser({ ...initialData, primaryAddress: null })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if address is empty', async () => {
      const result = await createUser({ ...initialData, address: [] })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Throws error if password is missing', async () => {
      const result = await createUser({ ...initialData, password: "" })
      const statusCode = await result.status;
      expect((statusCode).toString()).toEqual("400");
    });
    test('Creates user if data is complete', async () => {
      const result = await createUser(initialData);
      const statusCode = await result.status;
      user = await result.data.user;
      const auth = await result.data.user.access_token;
      headers = { Authorization: `Bearer ${auth}` };
      expect(statusCode.toString()).toEqual("200");
    });
  });
  describe('read()', () => {
    test('Throws error on unauthenticated read request', async () => {
      const result = await getUser({ id: user.id });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized read request', async () => {
      const result = await getUser({ id: '12345' }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Returns user by id if user is authenticated and authorized', async () => {
      const result = await getUser({ id: user.id }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })
  describe('update()', () => {
    test('Throws error on unauthenticated update request', async () => {
      const result = await updateUser({ id: user.id, updates: { birthDate: "1980-02-10" } });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized update request', async () => {
      const result = await updateUser({ id: '12345', updates: { birthDate: "1980-02-10" }  }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Updates user data if user is authenticated and authorized', async () => {
      const result = await updateUser({ id: user.id, updates: { birthDate: "1980-02-10" } }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })
  describe('del()', () => {
    test('Throws error on unauthenticated delete request', async () => {
      const result = await deleteUser({ id: user.id });
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Throws error on unauthorized delete request', async () => {
      const result = await deleteUser({ id: '12345' }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("400");
    });
    test('Deletes user if user is authed and has permission', async () => {
      const result = await deleteUser({ id: user.id }, headers.Authorization);
      const statusCode = result.status;
      expect(statusCode.toString()).toEqual("200");
    });
  })
})
