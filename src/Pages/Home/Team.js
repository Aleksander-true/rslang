import React from 'react';
import './team.css'

import photo1 from './../../assets/jpg/team-photo1.jpg'
import photo2 from './../../assets/jpg/team-photo2.jpg'
import photo3 from './../../assets/jpg/team-photo3.jpg'

function Team() {
  return (
    <div className='team'>
      <h2 className='home__title'>Наша команда</h2>
      <div className='team__img-wrapper'>
        <figure className='team__person'>
          <img className='team__img' src={photo1} alt=''></img>
          <h3 className='team__name'>Александр Серяпин</h3>
          <p className='team__description'><i>Роль:</i> тимлидер </p>
          <p className='team__description'><i>Достижения:</i></p>
        </figure>
        <figure className='team__person'>
          <img className='team__img' src={photo2} alt=''></img>
          <h3 className='team__name'>Элина Непомнящая</h3>
          <p className='team__description'><i>Роль:</i> дизайнер, разработчик</p>
          <p className='team__description'><i>Достижения:</i></p>
        </figure>
        <figure className='team__person'>
          <img className='team__img' src={photo3} alt=''></img>
          <h3 className='team__name'>Алексей Шишко</h3>
          <p className='team__description'><i>Роль:</i> ведущий-разработчик</p>
          <p className='team__description'><i>Достижения:</i></p>
        </figure>
      </div>

    </div>
  );
}

export default Team;