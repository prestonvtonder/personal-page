$(window).on('load', function () {
  $('.preloader__loader path:last-child').animate({strokeDashoffset: '0'}, {
    progress: function (_animation, progress, _msRemaining) {
      $('.progress-bar-text').html(`${Math.round(100 * progress)}%`);
    },
    complete: function () {
      $('.preloader').css('opacity', '0');
      setTimeout(function () {
      $('.preloader').css('display', 'none');
      }, 1000);
      animateRadialGraphs('.circle-progress path:last-child');
      animateLineGraphs('.line-progress path:last-child', 1500);
      animateStats('.counter', 3000);
    },
    duration: 2000
  });
  const selectors = {
    home: '.content',
    highlights: '.highlights-container .section-title',
    education: '.education-container .section-title',
    experience: '.work-container .section-title',
    awards: '.awards-container .section-title',
    projects: '.projects-container .section-title',
    contact: '.contact-container .section-title'
  }
  let typeProps = {
    e: 0,
    t: 80
  }
  $('.menu-item a').click(function (e) { 
    e.preventDefault();
    let command = $(this).html();
    collapseMenu('.menu-bar-btn');
    if ($('.content').scrollTop() === 0) {
      typeCommand(command, 1000);
      setTimeout(function() {
        scrollTo(findSelectorFromCommand(command))
      }, 1000 + 1500);
    } else {
      typeCommand(command, 0);
      scrollTo(findSelectorFromCommand(command));
    }
  });

  function collapseMenu(menuBarBtn) {
    $(menuBarBtn).removeClass('toggled');
    $(menuBarBtn).find('.menu-icon').removeClass('active');
    $('.menu-items').removeClass('active');
    $('.menu-bar').css('width', '80px');
    $('.curtain').css('opacity', '0')
                 .css('z-index', '0');
    $('.top-bg').css('transform', 'translateX(0px)')
    $('.content').css('transform', 'translateX(0px)')
      .css('overflow-y', 'scroll')
      .find('.curtain')
      .css('opacity', '0');
  }

  function typeCommand(command, ms) {
    let codeElement = $('.code-text');
    let codeElementLen = codeElement.html().length;
    $(codeElement).backspace(codeElementLen, typeProps);
    $(codeElement).delay(ms)
                  .typetype(`cd ${command === 'Home' ? '~' : '~/' + command}`, typeProps);
  }

  function findSelectorFromCommand(command) {
    return selectors[command.toLowerCase()];
  }

  function scrollTo(selector) {
    if (selector !== selectors['home']) {
      $('.content').animate({
        scrollTop: $('.content').scrollTop() + $(selector).position().top
      }, 2000);
    } else {
      $('.content').animate({
        scrollTop: 0
      }, 2000);
    }
  }

  function animateRadialGraphs(selector) {
    $(selector).each(function() {
      animateRadialGraph($(this))
    })
  }

  function animateRadialGraph(selector) {
    $(selector).css({
      'stroke-dasharray': `${Math.round(291 * (findPercentage(selector)/100))}, 291`
    });
  }

  function animateLineGraphs(selector, ms) {
    $(selector).each(function() {
      animateLineGraph($(this), ms)
    })
  }

  function animateLineGraph(selector, ms) {
    $(selector).animate({
      strokeDashoffset: `${100 - findPercentage(selector)}`
    }, ms);
  }

  function findPercentage(selector) {
    return parseInt($(selector).data("percentage"));
  }

  function animateStats(selector, ms) {
    $(selector).each(function() {
      animateStat($(this), ms);
    });
  }

  function animateStat(selector, ms) {
    jQuery({someValue: 0}).animate({someValue: $(selector).data("value")}, {
      duration: ms,
      easing:'swing', // can be anything
      step: function(now) { // called on every step
          // Update the element's text with rounded-up value:
          $(selector).text(`${Math.ceil(now)}`);
      }
    });
  }

  $('.explore-now-btn .btn-md').click(function (e) { 
    e.preventDefault();
    console.log('click');
    $('.info-bar').css({
      'transform': 'translateX(0px)'
    }, 1000);
    $('.curtain').css('opacity', '.7')
                 .css('z-index', '8');
  });

});