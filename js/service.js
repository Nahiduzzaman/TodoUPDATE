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
                document.getElementById('check').checked = false;
                document.getElementById('undone').checked = false;
                document.getElementById('ap').checked = true;
                
                all(def);
            }
        }

        

        function Cancel() {
            document.getElementById('tt').value = '';
            document.getElementById('des').value = '';
            document.getElementById('frm').style.display = 'none';
        }

        function all(e) {
            var lul = getData();
            var container = document.getElementById('shw');
            var txt = '<ul id="fix">';
            if (e.id == 'ap') {
                lul.forEach(function (item, index) {
                    if (item.done == true)
                        txt = complete(txt, item.title, item.id, item.des, e.id);
                    else 
                        txt = incomplete(txt, item.title, item.id, item.des, e.id);
                })
            } else if (e.id == 'check') {
         
                lul.forEach(function (item, index) {
                    if (item.done == true)
                        txt = complete(txt, item.title, item.id, item.des, e.id);
                })

            } else {
                
                lul.forEach(function(item, index) {
                    if(item.done==false)
                        txt = incomplete(txt, item.title, item.id, item.des, e.id);
                })

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
            for (var i = 0; i < donelul.length; i++) {
                if (donelul[i].id == k) {
                    if (donelul[i].done == true) donelul[i].done = false;
                    else donelul[i].done = true;
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


        function getData() {
            var d = JSON.parse(localStorage.getItem('items'));
            return d;
        }

        function putData(p) {
            localStorage.setItem('items', JSON.stringify(p));
        }

        function sortByTitle(a, b) {

            if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
            else if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
            else return 0;
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
