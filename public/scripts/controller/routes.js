'use strict';

page('/', window.landingView.init);
page('/explorer/:rover', window.explorerView.init, window.roverData.fetchCameras);
page('/login', window.loginView.init);
page('/aboutus', window.aboutUsView.init);
page('/explorer/:rover/results', resultsView.init);
page('/createaccount', window.createAccountView.init);
page('/account', accountView.init);
page('/logout', window.landingView.init);

page();