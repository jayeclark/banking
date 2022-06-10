import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { fromCamelCase } from "../services/helpers/formatting.js";

const saltRounds = 10;
class User {
  constructor(props) {
    this._id = props._id;
    this.id = nanoid(20);
    this.username = props.username;
    this.admin = props.admin || false;
    this.superAdmin = props.superAdmin || false;
    this.firstName = props.firstName;
    this.middleName = props.middleName || "";
    this.lastName = props.lastName;
    this.password = bcrypt.hash(props.password, saltRounds);
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

  isValid() {
    const required = ["id", "username", "firstName", "lastName", "birthDate", "primaryEmail", "primaryPhone", "primaryAddress"];
    for (let i = 0; i < required.length; i++) {
      if (required[i].includes("primary")) {
        const arr = required[i].replace("primary", "").toLowerCase();
        if (this[required[i]] == null || typeof this[required[i]] == "undefined" || this[arr].length == 0) {
          return false;
        }
      } else if (!this[required[i]]) {
        return false;
      }
    }
    return true;
  }

  missingData() {
    const missingData = [];
    const required = ["id", "username", "firstName", "lastName", "birthDate", "primaryEmail", "primaryPhone", "primaryAddress"];
    for (let i = 0; i < required.length; i++) {
      if (required[i].includes("primary")) {
        const arr = required[i].replace("primary", "").toLowerCase();
        if (this[arr].length == 0) {
          missingData.push({
            field: fromCamelCase(arr),
            message: "No available options."
          })
        }
        if (this[required[i]] == null || typeof this[required[i]] == "undefined") {
          missingData.push({
            field: fromCamelCase(required[i]),
            message: "No preference provided."
          })
        }
      } else if (!this[required[i]]) {
        missingData.push({
            field: fromCamelCase(required[i]),
            message: "No data provided."
          })
      }
    }
    return missingData;
  }
}

export default User;