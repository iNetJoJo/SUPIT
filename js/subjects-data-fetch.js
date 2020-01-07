var subjects = [];
var autocompleteList = [];

var auto_complete_box = $(".suggestion-box");
var auto_complete_list = $('#auto-complete-list');
var table =$('#subject-table')
table.hide();
auto_complete_box.hide();


$.ajax({
    url: "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan",
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        console.log(res);
        subjects = res;
    }
});


function createAutoComplete_li(label, value){
    return '<li id="'+value+'" class="auto-cpl-li">'+label+'</li>'
}


$("#subject-search").on('input',function (e) {
    var search_val = $(this).val();
    console.log(search_val.length);
    autocompleteList = [];

    subjects.forEach(el => {
        if (search_val.length !== 0)
            if (el.label.toLowerCase().indexOf(search_val.toLowerCase()) !== -1)
            autocompleteList.push(el)
    })

    auto_complete_list.empty();

    autocompleteList.forEach(el => {auto_complete_list.append(createAutoComplete_li(el.label, el.value))});


    if (search_val.length === 0)
        auto_complete_box.hide();
    else
        auto_complete_box.show();

    console.log(autocompleteList.length);

    if (autocompleteList.length === 0)
        auto_complete_list.append(createAutoComplete_li('Nema traženog rezultata',''))

    console.log(autocompleteList);
});

const generateREST_url = (id) => 'http://www.fulek.com/VUA/supit/GetKolegij/' + id;


const generate_tableRow= (obj) => '<tr><td>'+obj.kolegij+'</td><td>'+obj.ects+'</td><td>'+obj.sati+'</td><td>'+obj.predavanja+'</td>' +
    '<td>'+obj.vjezbe+'</td><td>'+obj.tip+'</td><td><button id="'+obj.id+'t" class="tbl-del-button">Obrisi</button></td></tr>';


let added_subjects = [];
function generate_summaryTableRow() {
    let ects = 0;
    let hours = 0;
    let lectures = 0;
    let practices = 0;

    added_subjects.forEach(function (el) {
        console.log()
        ects += el.ects;
        hours += el.sati;
        lectures += el.predavanja;
        practices += el.vjezbe;
    });


    return '<tr id="summary-tr">' +
        '                    <td>Ukupno</td>' +
        '                    <td>'+ects+'</td>' +
        '                    <td>'+hours+'</td>' +
        '                    <td>'+lectures+'</td>' +
        '                    <td>'+practices+'</td>' +
        '                    <td></td>' +
        '                    <td></td>' +
        '                </tr>';
}


$(document).on('click', '.auto-cpl-li', function (e) {
    console.log(e.target.id);
    $.ajax({
        url: generateREST_url(e.target.id),
        type: 'GET',
        dataType: 'json', // added data type
        success: function(res) {

            table.show();

            if (!added_subjects.find(el => el.id === res.id)) {
                added_subjects.push(res);


                $("#table-first-entry").nextAll().remove();

                added_subjects.forEach(function (el) {
                    $('#table-first-entry').after(generate_tableRow(el));
                });
                $('#subject-table').append(generate_summaryTableRow());
            }
        }
    });
});
$(document).on('click', '.tbl-del-button', function (e) {
    let id = e.target.id.slice(0, -1);
    console.log(id);
     added_subjects = added_subjects.filter(el => el.id != id);
    e.target.parentElement.parentElement.remove();



    $("#summary-tr").remove();

    if (added_subjects.length !==0)
        table.append(generate_summaryTableRow());
    else
        table.hide();

});