// Small helper function proposed by @istarkov
// Adds a cancel() method to a Promise
// More information on the issue:
// https://github.com/facebook/react/issues/5465#issuecomment-157888325
// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html

export const makeCancelable = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
