import React from 'react';
import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="root normal" >
        404 Not Found
        <Link to="/" >go to </Link>
    </div>
  );
}

export default NotFound;
