var modal = $('#contact-modal');

var btn = $("#contact-nav-btn");

var span = document.getElementsByClassName("close")[0];

btn.on('click', function() {
    modal.css('display', 'block');
});

span.onclick = function() {
    modal.css('display', 'none');
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};



$('#send-form-btn').on('click', function (e) {
        let name = $('#name-input').val();
        let email = $('#email-input').val();
        let importance = $('#imporance-input').val();
        let message = $('#msg-input').val();
        let newsletter = $('#newsletter-checkbox').prop('checked');

        let postObj = {
            name,
            email,
            importance,
            message,
            newsletter
        };
        console.log(postObj);

    $.ajax({
        type: "POST",
        url: "http://www.fulek.com/VUA/SUPIT/ContactUs",
        data: postObj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){alert(data);},
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
})