(function data(window) {

    'use strict';

    function Controller() {

        var vm = this;
        var service = Service;

        function go() {
            service.go();
        }

        function save(x,y) {
            service.save(x,y);
        }

        function Cancel() {
            service.Cancel();
        }

        function done(e,k) {
            service.done(e,k);
        }

        function myfunction() {
            service.myfunction();
        }

        function all(e) {
            service.all(e);
        }

        vm.go = go;
        vm.save = save;
        vm.Cancel = Cancel;
        vm.done = done;
        vm.myfunction = myfunction;
        vm.all = all;
    }


    window.Controller =new Controller();

})(window);
