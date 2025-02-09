(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    // $(function () {
    //     $.ajaxSetup({
    //         headers: {
    //             "X-CSRFToken": getCookie("csrftoken")
    //         }
    //     });
    // });
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    function filterDogs(that, breed){
        var token = $("input[name=csrfmiddlewaretoken]").val()
        // Stop form from submitting normally
        // Get some values from elements on the page:
        var $select = that,
            breed_id = breed,
            action_taken = breed_id>0 ?'filter_dogs': 'featured_dogs',
            url = $select.attr( "action" ) + "/list"
        // Send the data using post
        $.ajax({
            url: url,
            data: {
                action: action_taken, 
                breed_id: breed_id,
                CSRF: token
            },
            headers: {
                "X-CSRFToken" : token
            },
            method:'POST',
            success: function( data ) {
                var adoption_list_element = $('<div />').append(data).find("#adoption-list").html()
                $('#adoption-list').html(adoption_list_element);
                if(breed_id>0){
                    $('#featured-dogs-text').html('');
                }
                else{
                    $('#featured-dogs-text').html('Featured Dogs');
                }
            }
        })
    }


    $( "#filter-by-breed").on('change',function( event ) {
        event.preventDefault();
        var breed_id = $(this).val()
        filterDogs($(this), breed_id)
    });

    $( "#search-breed-button").click(function( event ) {
        event.preventDefault();
        var token = $("input[name=csrfmiddlewaretoken]").val()
        var url = $(this).attr( "action" ) + "/list"
        var breed = $("input[name=breed]").val()
        $.ajax({
            url: url,
            data: {
                action: 'breed_name_to_breed_id', 
                breed_name: breed,
                CSRF: token
            },
            headers: {
                "X-CSRFToken" : token
            },
            method:'POST',
            success: function( data ) {
                $("#filter-by-breed").val(data.breed_id);
                $("#filter-by-breed").change();

            }
        })
        
    });
})(jQuery);

