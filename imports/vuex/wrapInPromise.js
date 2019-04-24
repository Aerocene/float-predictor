export default function wrapInPromise(functionWithCallbackParameter) {
  return (...args) => new Promise((resolve, reject) => {
    functionWithCallbackParameter(...args, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}
