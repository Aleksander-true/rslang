const whatWords = {
  _preLevel: '',
  _prePage: '',
  _curLevel: '',
  _curPage: '',
  get level() {
    return this._preLevel || null;
  },

  get page() {
    return this._prePage || null;
  },

  fromURL: (url: string) => {
    whatWords._preLevel = whatWords._curLevel;
    whatWords._prePage = whatWords._curPage;

    const searchParams = new URLSearchParams(url);
    whatWords._curLevel = searchParams.get('level') || '';
    whatWords._curPage = searchParams.get('page') || '';
  },
};

export default whatWords;
