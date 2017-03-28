angular.module('LegendsModule', []);
angular.module('MapInteractionsModule', []);
angular.module('DrawingModule', []);
angular.module('PrintingModule', ['DrawingModule']);
angular.module('pdmApp', ['LegendsModule', 'MapInteractionsModule', 'PrintingModule']);