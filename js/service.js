(function(window) {

    'use strict';

    function Service() {

        var vm = this;
        
        var items = [];
        putData(items);
        function go() {
            
            document.getElementById('shw').style.display = 'none';
            document.getElementById('frm').style.display = 'block';

        }

        function save(x, y) {


            if (x == null || x == "") {
                alert(Config.error);
            } else {

                var data = {};
                data.title = x;
                data.des = y;
                data.done = false;
                data.id = Math.floor(Math.random() * 500);
                document.getElementById('tt').value = '';
                document.getElementById('des').value = '';

                var p = getData();
                p.push(data);
                p = p.sort(sortByTitle);
                putData(p);
                document.getElementById('frm').style.display = 'none';
                var def = document.getElementById('ap');
                all(def);
            }
        }

        function getData() {
            var d = JSON.parse(localStorage.getItem('items'));
            return d;
        }

        function putData(p) {
            localStorage.setItem('items', JSON.stringify(p));
        }

        function Cancel() {
            document.getElementById('tt').value = '';
            document.getElementById('des').value = '';
            document.getElementById('frm').style.display = 'none';
        }

        function sortByTitle(a, b) {

            if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
            else return 1;
        }


        function all(e) {
            var lul = getData();
            var container = document.getElementById('shw');
            var txt = '<ul id="fix">';
            if (e.id == 'ap') {
                for (var i = 0; i < lul.length; i++) {

                    if (lul[i].done == false) {
                        txt = incomplete(txt,lul[i].title,lul[i].id,lul[i].des,e.id);

                    } else {

                        txt = complete(txt, lul[i].title, lul[i].id, lul[i].des, e.id);
                    }

                }
            } else if (e.id == 'check') {
         
                for (var i = 0; i < lul.length; i++) {
                    if (lul[i].done == true) {

                        txt = complete(txt, lul[i].title, lul[i].id, lul[i].des, e.id);
                    }
                }

            } else {
                for (var i = 0; i < lul.length; i++) {
                    if(lul[i].done==false)
                    txt = incomplete(txt, lul[i].title, lul[i].id, lul[i].des, e.id);
                }

            }
            txt += '</ul>';
            container.innerHTML = txt;
            document.getElementById('shw').style.display = 'block';
            document.getElementById('frm').style.display = 'none';
        }

        function complete(txt,title,id,des,eid) {

            txt += '<li id="filter"><div class="parent scale"><h1 id="hed" class="inline"><strike>' +
                           title +
                           '</strike></h1>' +
                           '<p class="inline chker"><input type="checkbox" id="' +
                           eid +
                           '" checked onchange="Service.done(this, ' +
                           id +
                           ')"/>Done</p></div><div>' +
                           '<br><p class="word-break">' +
                           des +
                           '</p></div></li>';
            return txt;
        }

        function incomplete(txt, title, id, des, eid) {
            txt += '<li id="filter"><div class="parent scale"><h1 id="hed" class="inline">' +
                           title +
                           '</h1>' +
                           '<p class="inline chker"><input type="checkbox" id="' +
                           eid +
                           '" onchange="Service.done(this ,' +
                           id +
                           ')"/>Done</p></div><div>' +
                           '<br><p class="word-break">' +
                           des +
                           '</p></div></li>';
            return txt;
        }


        function done(e, k) {
            document.getElementById('shw').style.display = 'none';
            var donelul = getData();
            //debugger;
            for (var i = 0; i < donelul.length; i++) {
                if (donelul[i].id == k) {
                    if (donelul[i].done == true) donelul[i].done = false;
                    else donelul[i].done = true;
                    donelul = donelul.sort(sortByTitle);
                    putData(donelul);
                    all(e);
                    break;
                }
            }

        }

        function myfunction() {
            var input, jata, ll, li;
            input = document.getElementById("myInput");
            jata = input.value.toUpperCase();
            ll = document.getElementById("fix");
            li = ll.getElementsByTagName("li");
            for (var i = 0; i < li.length; i++) {
                var a = li[i].getElementsByTagName("h1")[0];
                var vl = a.textContent;
                vl = vl.toUpperCase();
                if (vl.indexOf(jata) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";

                }


            }

        }

        vm.go = go;
        vm.save = save;
        vm.Cancel = Cancel;
        vm.done = done;
        vm.myfunction = myfunction;
        vm.all = all;
        vm.getData = getData;
        vm.putData = putData;
        vm.complete = complete;
        vm.incomplete = incomplete;
    }

    window.Service = new Service();
    

})(window);
