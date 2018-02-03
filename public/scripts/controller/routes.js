'use strict';

page('/', window.indexView.init);
page('/findahike', window.findHikeView.init);
page('/findahike/:length/:elevation/:distance', window.hikeResultsView.init);
//http://localhost:3000/findahike?length=1&elevation=1&distance=1

page();