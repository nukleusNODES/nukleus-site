/*------------------------------------
*Author:FortunaTheme
*Template:Eris
*Version:1.1
*-------------------------------------
*/

(function($) {

    "use strict";

    jQuery(document).ready(function() {

        /*
         * -----------------------------------------------------------------
         *---------------------------Preloader------------------------------
         * -----------------------------------------------------------------
         */

        var themeWindow = $(window);
        var pagebody = $('html, body');

        themeWindow.on("load", function() {

            var preloader = jQuery('.preloader');
            var preloaderArea = jQuery('.preloader-area');
            preloader.fadeOut();
            preloaderArea.delay(50).fadeOut('slow');
            themeWindow.scrollTop(0);
        });




        /*
         * -----------------------------------------------------------------
         *-------------------------------Mixit Up---------------------------
         * -----------------------------------------------------------------
         */



        var portfolioContent = $('.portfolio-content');

        portfolioContent.mixItUp();



        /*
         * -----------------------------------------------------------------
         *-----------------------------lightbox-----------------------------
         * -----------------------------------------------------------------
         */



        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            showImageNumberLabel: false,
        });


       
        /*
         * -----------------------------------------------------------------
         *-----------------------------Ajax Contact Form--------------------
         * -----------------------------------------------------------------
         */



        var contactSubmit = $('#contact-submit');

        contactSubmit.on('click', function(e) {
            e.preventDefault();
            var name = $('#form-name').val();
            var email = $('#form-email').val();

            var message = $('#form-message').val();
            var form = new Array({
                'name': name,
                'email': email,
                'message': message
            });
            $.ajax({
                type: 'POST',
                url: "contact.php",
                data: ({
                    'action': 'contact',
                    'form': form
                })
            }).done(function(data) {

                var conResult = $('#contact .result');
                conResult.html(data);
                $(".contact-form")[0].reset();

            });

        });


        /*
         * -----------------------------------------------------------------
         *-----------------------------Count Down---------------------------
         * -----------------------------------------------------------------
         */
       

        var countDate = $('[data-countdown]');
        countDate.each(function() {
            var $this = $(this),
                finalDate = $(this).data('countdown');
            $this.countdown(finalDate,
                function(event) {
                    $this.html(
                        event.strftime(
                            '<p class="count-num">%D</p><h5 class="count-date count1">days</h5><div class="date-line"></div><p class="count-num">%H</p><h5 class="count-date count2">hrs</h5><span class="count-break"></span><div class="date-line"></div><p class="count-num">%M</p><h5 class="count-date count3">min</h5><div class="date-line"></div><p class="count-num">%S</p><h5 class="count-date count4">sec</h5>'));
                });
        });

        

        /*
         * -----------------------------------------------------------------
         *-----------------------------Ajax Chimp---------------------------
         * -----------------------------------------------------------------
         */


        var chimpForm = $('#mc-form');

        chimpForm.ajaxChimp({
            url: 'https://tahsinscreation.us17.list-manage.com/subscribe/post?u=8d43c37bb4dbc0d0b8078d874&amp;id=c638bf1e04'
        });




         /*
         * -----------------------------------------------------------------
         *-----------------------------Typed Js-----------------------------
         * -----------------------------------------------------------------
         */


        // var typed = new Typed("#typed", {
        //     stringsElement: '#typed-strings',
        //     typeSpeed: 60,
        //     backSpeed: 30,
        //     backDelay: 2000,
        //     startDelay: 1000,
        //     loop: true

        // });

        


        /*
         * -----------------------------------------------------------------
         *-----------------------------Animated Modal-----------------------
         * -----------------------------------------------------------------
         */

         var moreInfo=$("#more-info-btn");

        moreInfo.animatedModal({
            modalTarget: 'right-info-bar',
            animatedIn: 'fadeInRight',
            animatedOut: 'fadeOutRight',
        });
        var notifyBtn = $("#notify-btn");
        notifyBtn.animatedModal({
            modalTarget: 'notify-bar',
            animatedIn: 'fadeInDown',
            animatedOut: 'fadeOutUp',
        });

        /*
         * -----------------------------------------------------------------
         *-----------------------------Ripple Bg---------------------------
         * -----------------------------------------------------------------
         */

         var ripple=$('.ripple-bg');

        if($('.ripple-bg').is(ripple)){

        ripple.ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
        });

        }

    });

})(jQuery);