(function($) {
  var HelloWorldDevs = function() {};

  HelloWorldDevs.prototype.noOrphans = function (selectors, exceptions) {
    $(selectors).not(exceptions).each(function () {
      $(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/, '&nbsp;$1'));
    });
  };

  HelloWorldDevs.prototype.mailForm = function (form, success_msg, uid) {
    var $form = $(form);
    $form.submit(function(e) {
      e.preventDefault();
      var formData = $form.serialize();
      var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule';
      $('.form-error').remove();
      $.ajax({
        type: 'POST',
        url: formAction,
        data: formData,
        dataType: 'json',
        encode: true
      }).done(function (response) {
        $form.replaceWith($(success_msg).html());
      }).error(function (response) {
        var $error_list = $('<ul>');
        if(response.responseJSON == undefined) {
          $error_list.append($('<li>').text('There was a problem with your submission. Please ensure all fields are correctly entered.'));
        } else {
          $.each(response.responseJSON, function(key, value) {
            $error_list.append($('<li>').text(value));
          });
        }
        $form.before('<div class="form-error"></div>');
        $('.form-error').html($error_list).fadeIn();
      });
    });
  };

  HelloWorldDevs.prototype.scrollOffsetFix = function ( menuID ) {
    // Fix for menu scroll to links. Offsets are needed for desktop but not tablet or mobile.
    // ======================================================================================
    // Store Menu Offests for reset on screen resize reset
    var $PrimaryMenu = $(menuID);
    var menuOffsets = [];
    $PrimaryMenu.find('a').each(function(index) {
      menuOffsets.push($(this).attr('data-offset'));
    });

    // kills menu offsets for tablet and mobile on load
    if ($(window).width() < 993) {
      $PrimaryMenu.find('a').attr('data-offset', '0');
    }

    // Fix scrollTo offsets on tablet and mobile versions (sets data offsets to zero)
    $(window).resize(function() {
      if ($(window).width() < 993) {
        // sets all menu offset to zero for mobile
        $PrimaryMenu.find('a').attr('data-offset', '0');
      } else {
        // resets all menu offsets to origin value
        $PrimaryMenu.find('a').each(function(index) {
          $(this).attr('data-offset', menuOffsets[index]);
        });
      }
    });
  };

  var HWD = new HelloWorldDevs();

  HWD.noOrphans('h1,h2,h3,h4,h5,h6,li,p', '.price-box-h3-mid');
  HWD.mailForm('#mail-form', '#success_msg' , '7fb35345-752d-4792-9480-cd3db6674a62');
  HWD.scrollOffsetFix('#primary-menu');


  // Marquee Slider
  // ==============
  new Swiper('.swiper-container', {
    speed: 600,
    autoplay: 6000,
    loop: true
  });


  // Owl Carousels
  // =============
  $('.service-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    dots: false,
    responsive : {
      0 : {
        items : 1
      },
      550 : {
        items : 2
      },
      768 : {
        items : 3
      },
      990 : {
        items : 4
      },
      1200 : {
        items : 5
      }
    },
    navText: [
      '<i class="icon-chevron-sign-left"></i>',
      '<i class="icon-chevron-sign-right"></i>'
    ]
  });

  $('.team-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    dots: false,
    responsive : {
      0 : {
        items : 1
      },
      550 : {
        items : 2
      },
      768 : {
        items : 3
      },
      990 : {
        items : 4
      },
      1200 : {
        items : 5
      }
    },
    navText: [
      '<i class="icon-chevron-sign-left"></i>',
      '<i class="icon-chevron-sign-right"></i>'
    ]
  });

  $('.tour-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    dots: false,
    navText: [
      '<i class="icon-chevron-sign-left"></i>',
      '<i class="icon-chevron-sign-right"></i>'
    ],
    margin: 30,
    responsive : {
      0 : {
        items : 1
      },
      768 : {
        items : 2
      }
    }
  });

  $('.logo-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    nav: false,
    dots: false,
    margin: 30,
    responsive : {
      0 : {
        items : 2
      },
      550 : {
        items : 3
      },
      768 : {
        items : 4
      },
      990 : {
        items : 5
      }
    }
  });

  $('#google-map5').gMap({
    address: '31.8995069,-110.9909628',
    maptype: 'ROADMAP',
    zoom: 15,
    markers: [
      {
        address: "31.899167,-110.993056"
      }
    ],
    doubleclickzoom: false,
    controls: {
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      draggable: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false
    }
  });

})(jQuery);
