import { setFacebookAccounts } from '../redux/actions/accountActions';

const FacebookService = {
  handleLoginSuccess: (response) => {
    console.log('Facebook Login Success:', response);
    // Assuming the response contains accessToken and other details
    // Store user data or token as needed
    localStorage.setItem('facebookAuth', JSON.stringify(response));
  },

  handleLoginFailure: (error) => {
    console.error('Facebook Login Failure:', error);
    localStorage.removeItem('facebookAuth');
  },

  handleFacebookAccountLogin: async (response, dispatch) => {
    console.log('Facebook Account Login:', response);
    if (response.authResponse && response.authResponse.accessToken) {
      const accessToken = response.authResponse.accessToken;
      try {
        // Get user's pages
        const accountsResponse = await fetch(`https://graph.facebook.com/me/accounts?access_token=${accessToken}&fields=name,access_token`);
        const accountsData = await accountsResponse.json();
        
        const accounts = accountsData.data.map(account => ({
          id: account.id,
          name: account.name,
          accessToken: account.access_token,
        }));

        dispatch(setFacebookAccounts(accounts));
        localStorage.setItem('facebookAccounts', JSON.stringify(accounts));
      } catch (error) {
        console.error('Error fetching Facebook accounts:', error);
      }
    }
  },

  getAccounts: () => {
    const accounts = localStorage.getItem('facebookAccounts');
    return accounts ? JSON.parse(accounts) : [];
  },
};

export default FacebookService;
