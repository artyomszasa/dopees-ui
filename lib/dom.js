const dom = {
  get body() {
    const body = document.querySelector('body');

    if (!body) {
      throw new Error('unable to get document body');
    }

    return body;
  },

  detach(node) {
    if (node.parentNode) {
      return node.parentNode.removeChild(node);
    }

    return node;
  },

  remove(node) {
    dom.detach(node);
  }

};
export default dom;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLEdBQUcsR0FBRztBQUNWLE1BQUksSUFBSixHQUFRO0FBQ04sVUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjs7QUFDQSxRQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1QsWUFBTSxJQUFJLEtBQUosQ0FBVSw2QkFBVixDQUFOO0FBQ0Q7O0FBQ0QsV0FBTyxJQUFQO0FBQ0QsR0FQUzs7QUFRVixFQUFBLE1BQU0sQ0FBQyxJQUFELEVBQVc7QUFDZixRQUFJLElBQUksQ0FBQyxVQUFULEVBQXFCO0FBQ25CLGFBQU8sSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsSUFBNUIsQ0FBUDtBQUNEOztBQUNELFdBQU8sSUFBUDtBQUNELEdBYlM7O0FBY1YsRUFBQSxNQUFNLENBQUMsSUFBRCxFQUFXO0FBQUksSUFBQSxHQUFHLENBQUMsTUFBSixDQUFXLElBQVg7QUFBbUI7O0FBZDlCLENBQVo7QUFpQkEsZUFBZSxHQUFmIiwic291cmNlUm9vdCI6IiJ9