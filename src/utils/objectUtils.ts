// Check if object is empty
export function isEmpty(obj: object) {
    let name;
    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    if (obj.constructor !== Object) {
      return false;
    }
    return true;
}

// Duplicate object
export function duplicate(object: object) {
    return Object.assign({}, object)
}