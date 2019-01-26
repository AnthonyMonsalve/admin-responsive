((function() {
    'use strict';

    var PromoMenComponent = {
        controller: 'usuariosCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/components/business/prodata/usuarios/usuarios.html'
    };

    angular
        .module('hiraApp')
        .component('usuariosListComponent', PromoMenComponent);

})());