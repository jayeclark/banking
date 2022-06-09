class User {
  constructor(props) {
    this.username = props.username;
    this.fName = props.fName;
    this.mName = props.mName || "";
    this.lName = props.lName;
    this.suffix = props.suffix || "";
    this.prefix = props.prefix || "";
    this.birthDate = props.birthDate;
    this.createdDate = props.createdDate || new Date.now();
    this.primaryEmail = props.primaryEmail;
    this.primaryPhone = props.primaryPhone;
    this.primaryAddress = props.primaryAddress;
    this.contactPreferences = props.contactPreferences;
    this.email = props.emails || [];
    this.phone = props.phoneNumbers || [];
    this.address = props.addresses || [];
  }

  isValid() {
    const required = ["username", "fName", "lName", "birthDate", "primaryEmail", "primaryPhone", "primaryAddress"];
    for (let i = 0; i < required.length; i++) {
      if (required[i].includes("primary")) {
        const arr = required[i].replace("primary").toLowerCase();
        if (!this[required[i]] || this[arr].length == 0) {
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
    const required = ["username", "fName", "lName", "birthDate", "primaryEmail", "primaryPhone", "primaryAddress"];
    for (let i = 0; i < required.length; i++) {
      if (required[i].includes("primary")) {
        const arr = required[i].replace("primary").toLowerCase();
        if (this[arr].length == 0) {
          missingData.push({
            field: arr,
            message: "No available options."
          })
        }
        if (!this[required[i]]) {
          missingData.push({
            field: required[i],
            message: "No preference provided."
          })
        }
      } else if (!this[required[i]]) {
        if (this[arr].length == 0) {
          missingData.push({
            field: arr,
            message: "No data provided."
          })
        }
      }
    }
    return missingData;
  }
}

export default User;