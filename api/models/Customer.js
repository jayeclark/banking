import { nanoid } from "nanoid";
class Customer {
  constructor(props) {
    this._id = props._id;
    this.id = nanoid(20);
    this.type = props.type;
    this.name = props.name;
    this.status = "active";
    this.checkSum = props.checkSum;
    this.creator = props.userID;
  }
}

export default Customer;