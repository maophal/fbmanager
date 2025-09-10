import { setFacebookUserAndPages } from '../redux/actions/accountActions';

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
        // Get user's profile
        const userResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name`);
        const userData = await userResponse.json();

        // Get user's pages
        const pagesResponse = await fetch(`https://graph.facebook.com/me/accounts?access_token=${accessToken}&fields=name,access_token`);
        const pagesData = await pagesResponse.json();

        const facebookData = {
          id: userData.id,
          name: userData.name,
          pages: pagesData.data.map(page => ({
            id: page.id,
            name: page.name,
            accessToken: page.access_token,
          })),
        };

        dispatch(setFacebookUserAndPages(facebookData));
        localStorage.setItem('facebookData', JSON.stringify([facebookData])); // Store as an array
      } catch (error) {
        console.error('Error fetching Facebook data:', error);
      }
    }
  },

  getFacebookData: () => {
    const facebookData = localStorage.getItem('facebookData');
    return facebookData ? JSON.parse(facebookData) : []; // Return an empty array if null
  },
};

export default FacebookService;