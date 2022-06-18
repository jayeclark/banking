// Error types: authentication, authorization, db, unknown, duplicate, missingData
export default class APIError {

  static sendError({ response, message, type, code, data }) {
    const error = { type, message, data }
    response.status(code).json({ error });
  }

  static db(response, data) {
    APIError.sendError({
      response,
      message: "Database error.",
      type: "db",
      code: 500,
      data,
    })
  }

  static authentication(response, data) {
    APIError.sendError({
      response,
      message: "Authentication is missing or invalid.",
      type: "authentication",
      code: 400,
      data,
    })
  }

  static authorization(response, data) {
    APIError.sendError({
      response,
      message: "User is not authorized to perform that action.",
      type: "authorization",
      code: 400,
      data,
    })
  }

  static missingData(response, data) {
    APIError.sendError({
      response,
      message: "Unable to create record. Required information is missing.",
      type: "missingData",
      code: 400,
      data,
    })
  }
  
  static duplicate(response, data) {
    APIError.sendError({
      response,
      message: "Unable to create record. A record with that unique identifier already exists.",
      type: "duplicate",
      code: 400,
      data,
    })
  }

}

