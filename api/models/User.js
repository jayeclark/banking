import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { fromCamelCase } from "../services/helpers/formatting.js";

const saltRounds = 10;
class User {
  static required = ["id", "username", "firstName", "lastName", "birthDate", "primaryEmail", "primaryPhone", "primaryAddress", "password"];

  constructor(props) {
    this._id = props._id;
    this.id = nanoid(20);
    this.username = props.username;
    this.admin = props.admin || false;
    this.superAdmin = props.superAdmin || false;
    this.firstName = props.firstName;
    this.middleName = props.middleName || "";
    this.lastName = props.lastName;
    this.password = null;
    this.suffix = props.suffix || "";
    this.prefix = props.prefix || "";
    this.birthDate = props.birthDate;
    this.createdDate = props.createdDate || Date.now();
    this.primaryEmail = props.primaryEmail;
    this.primaryPhone = props.primaryPhone;
    this.primaryAddress = props.primaryAddress;
    this.contactPreferences = props.contactPreferences;
    this.email = props.email || [];
    this.phone = props.phone || [];
    this.address = props.address || [];
    this.customerID = props.customerID || null;
    this.access_token = props.access_token || null;
    this.refresh_token = props.refresh_token || null;
  }

  async createPasswordHash(str) {
    if (str == null) {
      return null;
    }
    const hashed = await bcrypt.hash(str, saltRounds);
    return hashed;
  }

  async addPassword(str) {
    if (str == null || str == "") {
      this.password = null;
      return;
    }
    const hashed = await this.createPasswordHash(str);
    this.password = hashed;
  }

  isValid() {
    for (let i = 0; i < User.required.length; i++) {
      const property = User.required[i];
      if (property.includes("primary")) {
        const arr = property.replace("primary", "").toLowerCase();
        if (this[property] == null || typeof this[property] == "undefined" || this[arr].length == 0) {
          return false;
        }
      } else if (this[property] == null || typeof this[property] == "undefined") {
        return false;
      }
    }
    return true;
  }

  missingData() {
    const missingData = [];
    for (let i = 0; i < User.required.length; i++) {
      const property = User.required[i];
      if (property.includes("primary")) {
        const arr = property.replace("primary", "").toLowerCase();
        if (this[arr].length == 0) {
          missingData.push({
            field: fromCamelCase(arr),
            message: "No available options."
          })
        }
        if (this[property] == null || typeof this[property] == "undefined") {
          missingData.push({
            field: fromCamelCase(User.required[i]),
            message: "No preference provided."
          })
        }
      } else if (this[property] == null || typeof this[property] == "undefined") {
        missingData.push({
            field: fromCamelCase(property),
            message: "No data provided."
          })
      }
    }
    return missingData;
  }
}

export default User;