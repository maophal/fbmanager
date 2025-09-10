import React from 'react';

const AccountSelection = ({ accounts, selectedAccount, selectAccount }) => {
  if (!accounts || accounts.length === 0) {
    return <p>No Facebook accounts found. Please connect one in Settings.</p>;
  }

  return (
    <div className="form-group">
      <label htmlFor="account-select">Select an Account</label>
      <select 
        id="account-select" 
        className="form-control" 
        value={selectedAccount || ''} 
        onChange={(e) => selectAccount(e.target.value)}
      >
        <option value="" disabled>Choose a page</option>
        {accounts.map(account => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountSelection;