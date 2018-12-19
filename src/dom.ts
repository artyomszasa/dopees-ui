
const dom = {
  get body() {
    const body = document.querySelector('body');
    if (!body) {
      throw new Error('unable to get document body');
    }
    return body;
  }
};

export default dom;