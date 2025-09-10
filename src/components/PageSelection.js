import React from 'react';

const PageSelection = ({ pages, selectedPage, selectPage }) => {
  if (!pages || pages.length === 0) {
    return <p>No Facebook pages found for this user.</p>;
  }

  return (
    <div className="form-group">
      <label htmlFor="page-select">Select a Page</label>
      <select
        id="page-select"
        className="form-control"
        value={selectedPage || ''}
        onChange={(e) => selectPage(e.target.value)}
      >
        <option value="" disabled>Choose a page</option>
        {pages.map(page => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSelection;
