import { fromCamelCase } from "./formatting"

export const checkRequiredFields = (required, instance, resultsArray) => {
  required.forEach(property => {
    if (instance[property] == null || typeof instance[property] == "undefined") {
      resultsArray.push({
        field: fromCamelCase(property),
        message: "No data provided"
      })
    }
  })
}

export const checkRequiredArrays = (required, instance, resultsArray) => {
  required.forEach(property => {
    if (instance[property].length == 0 || typeof instance[property] == "undefined") {
      resultsArray.push({
        field: fromCamelCase(property),
        message: "No value provided to array."
      })
    }
  })
}