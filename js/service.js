(function(window) {

    'use strict';

    function Service() {

        var vm = this;
        //debugger;
        var items = [];
        localStorage.setItem('items', JSON.stringify(items));
        function go() {
            
            document.getElementById('shw').style.display = 'none';
            document.getElementById('frm').style.display = 'block';

        }

        function save(x, y) {


            if (x == null || x == "") {
                alert('Title is empty');
            } else {

                var data = {};
                data.title = x;
                data.des = y;
                data.done = false;
                data.id = Math.floor(Math.random() * 500);
                document.getElementById('tt').value = '';
                document.getElementById('des').value = '';

                var p = JSON.parse(localStorage.getItem('items'));
                p.push(data);
                p = p.sort(sortByTitle);
                localStorage.setItem('items', JSON.stringify(p));
                document.getElementById('frm').style.display = 'none';
                var def = document.getElementById('ap');
                all(def);
            }
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
            var lul = JSON.parse(localStorage.getItem('items'));
            var container = document.getElementById('shw');
            var txt = '<ul id="fix">';
            if (e.id == 'ap') {
                for (var i = 0; i < lul.length; i++) {

                    if (lul[i].done == false) {
                        txt += '<li id="filter"><div class="parent scale"><h1 id="hed" class="inline">' +
                            lul[i].title +
                            '</h1>' +
                            '<p class="inline chker"><input type="checkbox" id="' +
                            e.id +
                            '" onchange="Service.done(this ,' +
                            lul[i].id +
                            ')"/>Done</p></div><div>' +
                            '<br><p class="word-break">' +
                            lul[i].des +
                            '</p></div></li>';
                    } else {

                        txt += '<li id="filter"><div class="parent scale"><h1 id="hed" class="inline"><strike>' +
                            lul[i].title +
                            '</strike></h1>' +
                            '<p class="inline chker"><input type="checkbox" id="' +
                            e.id +
                            '" checked onchange="Service.done(this, ' +
                            lul[i].id +
                            ')"/>Done</p></div><div>' +
                            '<br><p class="word-break">' +
                            lul[i].des +
                            '</p></div></li>';


                    }

                }
            } else if (e.id == 'check') {
                //debugger;
                for (var i = 0; i < lul.length; i++) {
                    if (lul[i].done == true) {

                        txt += '<li id="filter"><div class="parent scale"><h1 id="hed" class="inline"><strike>' +
                            lul[i].title +
                            '</strike></h1>' +
                            '<p class="inline chker"><input type="checkbox" id="' +
                            e.id +
                            '" checked onchange="Service.done(this, ' +
                            lul[i].id +
                            ')"/>Done</p></div><div>' +
                            '<br><p class="word-break">' +
                            lul[i].des +
                            '</p></div></li>';
                        // debugger;

                    }
                }

            } else {

                for (var i = 0; i < lul.length; i++) {

                    if (lul[i].done == false) {
                        txt += '<li id="filter"><div class="parent scale"><h1 id="hed" class="inline">' +
                            lul[i].title +
                            '</h1>' +
                            '<p class="inline chker"><input type="checkbox" id="' +
                            e.id +
                            '"  onchange="Service.done(this, ' +
                            lul[i].id +
                            ')" />Done</p></div><div>' +
                            '<br><p class="word-break">' +
                            lul[i].des +
                            '</p></div></li>';
                    }
                }

            }
            txt += '</ul>';
            container.innerHTML = txt;
            document.getElementById('shw').style.display = 'block';
            document.getElementById('frm').style.display = 'none';
        }


        function done(e, k) {
            document.getElementById('shw').style.display = 'none';
            var donelul = JSON.parse(localStorage.getItem('items'));
            //debugger;
            for (var i = 0; i < donelul.length; i++) {
                if (donelul[i].id == k) {
                    if (donelul[i].done == true) donelul[i].done = false;
                    else donelul[i].done = true;
                    donelul = donelul.sort(sortByTitle);
                    localStorage.setItem('items', JSON.stringify(donelul));
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
    }

    window.Service = new Service();

})(window);
