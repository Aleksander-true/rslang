import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './pagination.css';

function Pagination(props: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  let [firstLink, secondLink, thirdLink, forthLink, fifthLink, sixthLink, seventhLink] = [
    `${props.page - 1}`,
    `${props.page}`,
    `${props.page + 1}`,
    `${props.page + 2}`,
    `${props.page + 3}`,
    `...`,
    `${props.lastPage}`,
  ];
  if (props.page <= 1) {
    [firstLink, secondLink, thirdLink, forthLink, fifthLink, sixthLink, seventhLink] = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '...',
      `${props.lastPage}`,
    ];
  }

  if (props.page >= props.lastPage - 4) {
    [firstLink, secondLink, thirdLink, forthLink, fifthLink, sixthLink, seventhLink] = [
      `${props.lastPage - 6}`,
      `${props.lastPage - 5}`,
      `${props.lastPage - 4}`,
      `${props.lastPage - 3}`,
      `${props.lastPage - 2}`,
      `${props.lastPage - 1}`,
      `${props.lastPage}`,
    ];
  }

  const setPage = (page: number | string) => {
    if (String(page) === '...') return;
    page = page <= 1 ? 0 : +page - 1;
    page = page > props.lastPage ? props.lastPage : page;

    setSearchParams({ level: props.level, page: String(page) });
  };

  return (
    <nav className={'pagination-wrapper' + (props.isLearnedAllWords ? ' complete' : '')}>
      <ul className="textbook__pagination">
        <li className="textbook__page-item" onClick={() => setPage(props.page)}>
          <span className="textbook__page-link">&laquo;</span>
        </li>
        <li
          className={'textbook__page-item' + (+firstLink === props.page + 1 ? ' active' : '')}
          onClick={() => setPage(firstLink)}
        >
          <span className="textbook__page-link">{firstLink}</span>
        </li>
        <li
          className={'textbook__page-item' + (+secondLink === props.page + 1 ? ' active' : '')}
          onClick={() => setPage(secondLink)}
        >
          <span className="textbook__page-link">{secondLink}</span>
        </li>
        <li
          className={'textbook__page-item' + (+thirdLink === props.page + 1 ? ' active' : '')}
          onClick={() => setPage(thirdLink)}
        >
          <span className="textbook__page-link">{thirdLink}</span>
        </li>
        <li
          className={'textbook__page-item' + (+forthLink === props.page + 1 ? ' active' : '')}
          onClick={() => setPage(forthLink)}
        >
          <span className="textbook__page-link">{forthLink}</span>
        </li>
        <li
          className={'textbook__page-item' + (+fifthLink === props.page + 1 ? ' active' : '')}
          onClick={() => setPage(fifthLink)}
        >
          <span className="textbook__page-link">{fifthLink}</span>
        </li>
        <li
          className={'textbook__page-item' + (+sixthLink === props.page + 1 ? ' active' : '')}
          onClick={() => setPage(sixthLink)}
        >
          <span className="textbook__page-link">{sixthLink}</span>
        </li>
        <li
          className={'textbook__page-item' + (+seventhLink === props.page + 1 ? ' active' : '')}
          onClick={() => setPage(seventhLink)}
        >
          <span className="textbook__page-link">{seventhLink}</span>
        </li>
        <li className="textbook__page-item" onClick={() => setPage(props.page + 2)}>
          <span className="textbook__page-link">&raquo;</span>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
