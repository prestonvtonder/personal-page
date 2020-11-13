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
      animateStats('.counter', 2000);
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
    // number of errors
    e: 0,
    // speed
    t: 80
  }

  $('.menu-item a').click(function (e) { 
    e.preventDefault();
    let command = $(this).html();
    collapseMenu();
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

  function collapseMenu() {
    $('.menu-bar-btn').removeClass('toggled');
    $('.menu-bar-btn').find('.menu-icon').removeClass('active');
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

  function collapseInfoBar() {
    $('.info-bar').css({
      'transform': 'translateX(-306px)'
    }, 550);
    $('.curtain').css('opacity', '0')
                 .css('z-index', '0');
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
    jQuery({val: 0}).animate({val: $(selector).data("value")}, {
      duration: ms,
      easing:'swing', 
      step: function(now) { 
        $(selector).text(`${Math.ceil(now)}`);
      }
    });
  }

  $('.info-bar-btn').click(function (e) { 
    e.preventDefault();
    $('.info-bar').css({
      'transform': 'translateX(0px)'
    });
    $('.curtain').css('opacity', '.7')
                 .css('z-index', '8');
  });

  $('.curtain').click(function (e) {
    e.preventDefault();
    collapseMenu();
    collapseInfoBar();
  })

});