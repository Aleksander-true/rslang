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

  fromURL: (pathname: string, search: string) => {
    whatWords._preLevel = whatWords._curLevel;
    whatWords._prePage = whatWords._curPage;
    if (pathname.includes('textbook') && search === '') {
      whatWords._curLevel = '0';
      whatWords._curPage = '0';
    } else {
      const searchParams = new URLSearchParams(search);
      whatWords._curLevel = searchParams.get('level') || '';
      whatWords._curPage = searchParams.get('page') || '';
    }
  },
};

export default whatWords;
