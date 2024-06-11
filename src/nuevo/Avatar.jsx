import PropTypes from 'prop-types';

import { getImageUrl } from './utils.js';

Avatar.propTypes = {
  person: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
}


export default function Avatar({ person, size }) {


  return (
    <><img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size} 
      />

      <h1>
      {person.name}
      </h1></>
 
  );

  
}