((function() {

    'use strict';

    /*@ngInject*/
    function ClientDetailsViewOperationCtrl(common, ClientsSvc,localStorageService,OperationsListSvc) {
        var vm = this;
        var storage = localStorageService;
        var user = storage.get('user');
        vm.dataLoaded=false
        vm.filter = OperationsListSvc.getFilter();
        function getOperationRef(id){
          return parseInt(id,16).toString(10).slice(10,16)
        }

        function getOperationType(type) {
            if (type === 'Transfer') {
                return 'Transferencia';
            } else if (type === 'Withdrawal') {
                return 'Canjeo';
            } else if (type === 'Recharge') {
                return 'Recarga';
            }else if (type =='Promo'){
                return 'Promocion'
            }else if (type =='Payout'){
                return 'Pago de Deuda'
            }else if (type =='Debt'){
                return 'Deuda'
            }
        }

        function getTotalAmount(operation) {
              //reconver modification to show the rigth amount
              operation.amount = operation.amount*0.01
            if (operation.service_fee) {
                //reconver modification to show the rigth amount
                operation.service_fee = operation.service_fee*0.01
                return operation.amount + operation.service_fee;
            } else {
                return operation.amount;
            }
        }

        function getPositive(operation, clientId) {
            var sender = operation.sender;
            var receiver = operation.receiver;

            if (operation.type === 'Transfer') {
                if (sender) {
                    return (clientId !== sender.username);
                } else {
                    return (clientId !== receiver.username);
                }

            } else if (operation.type === 'Withdrawal') {
                return false;
            } else if (operation.type === 'Recharge') {
                return true;
            } else if (operation.type=== 'Promo') {
                if (sender) {
                    return (clientId !== sender.username);
                } else {
                    return (clientId !== receiver.username);
                }
            }else if (operation.type === 'Payout') {
                return true;
            }else if (operation.type === 'Debt') {
                return false;
            }
        }

        //esta función me permite ordenar la data que me manda el servidor cuando traigo data de hijos
		function compareDates(a,b){
            var opta = new Date(a.createdAt)
            var optb = new Date(b.createdAt)
            return optb.getTime()-opta.getTime()
        }
        //Dividir todo por 100 es pan comido para mi!
		function reconver() {
			console.log(vm.history[0].amount);
			var i;
			for (i = 0; i < vm.history.length; i++) {
				vm.history[i].amount = vm.history[i].amount / 100;
				//console.log(vm.history.amount);
				if (vm.history[i].service_fee) {
					vm.history[i].service_fee = vm.history[i].service_fee / 100;
				}
			}
		}
        function getOperations() {
            return OperationsListSvc.getOperations(true,vm.clientId).then(function(res) {
            //return ClientsSvc.getClientOperations(vm.clientId,vm.filter.query).then(function(res) {
                // vm.operations = res.data;
                // for (var i = 0; i < vm.operations.list.length; i++) {
                //     vm.operations.list[i].positive = getPositive(vm.operations.list[i], vm.clientId);
                //     vm.operations.list[i].trans_type = getOperationType(vm.operations.list[i].type);
                //     vm.operations.list[i].totalAmount = getTotalAmount(vm.operations.list[i]);
                // }
                // console.log(vm.operations);
                vm.history =[]
                //por cada cuenta (madre y todos sus hijos) unifico su data en la lista vm.historial
                res.data.forEach((user)=>{
                    //la data de la madre va directo a la lista relajado
                    if(!user.mom){
                        user.operations.forEach((op)=>{
                            op.positive= getPositive(op,vm.username)
                            op.trans_type = getOperationType(op.type)
                            op.totalAmount = getTotalAmount(op)
                        })
                        vm.history=vm.history.concat(user.operations)}
                    //El peo esta con los hijos, por cada hijo necesitamos mas data para mostrar bien en el historial
                    else{
                        user.operations.forEach((op)=>{
                            op.positive= getPositive(op,vm.useername)
                            op.trans_type = getOperationType(op.type)
                            op.totalAmount = getTotalAmount(op)
                            //necesitamos agregarle a la operacion un campo llamado son para identificarlo frente a las operaciones de la madre
                            op.son=user.username
                            //Si la hija es receptora la cambio a la madre como realmente sucede (todo va a la cuenta madre)
                            if (op.receiver.username == user.username){
                                op.receiver.username = vm.username
                            }
                            //Si la hija es la autora la cambio a la madre como realmente sucede (todo sale de la cuenta madre)
                            if (op.sender.username== user.username){
                                op.sender.username=vm.username
                            }
                        })
                        console.log(user.operations);
                        //Aqui es donde las operaciones de las hijas van a la lista que se mostrará en el historial
                        vm.history=vm.history.concat(user.operations)
                        vm.dataLoaded = true
                    }
                })
                console.log(vm.history);
                vm.history.sort(compareDates)
                vm.loading=false
                //reconver()
                vm.operations={}
                vm.operations.list=vm.history
            }).catch(function(err) {
                console.log(err);
            });
        }
        vm.getOperations = getOperations
        vm.$onInit = function() {
            console.log("ENTRA OPERACIONES");
            getOperations();
        };

    }

    angular.module('hiraApp')
        .controller('ClientDetailsViewOperationCtrl', ClientDetailsViewOperationCtrl);

})());
