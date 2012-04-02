(function($) {
  function rand(limit) {
    return Math.floor((Math.random() * limit));
  }

  $.extend(rand, {
    config : {
      available : [
        [5, 'x-oneThird', 'y-oneHalf',   'media'],

        [1,  'x-oneThird', 'y-oneThird', 'avatar'],
        [3,  'x-oneThird', 'y-oneThird', 'about'],

        [1,  'x-oneSixth', 'y-oneSixth', 'badge'],
        [1,  'x-oneSixth', 'y-oneSixth', 'filler'],
        [2,  'x-oneSixth', 'y-oneSixth', 'avatar'],
        [1,  'x-oneSixth', 'y-oneSixth', 'icon'],

        [1,  'x-oneThird', 'y-oneThird', 'followers'],
        [1,  'x-oneThird', 'y-oneThird', 'followed'],
        [1,  'x-oneThird', 'y-oneThird', 'proclivity'],

        [1,  'x-oneThird', 'y-oneSixth', 'factoid'],

        [0,  'x-twoThird', 'y-oneThird', 'library']
      ]
    },

    next : function next() {
      var weighted = this.weigh();
      return weighted[this(weighted.length)];
    },

    weigh : function weigh() {
      var available, weighted, current, i, config, weight, pair;

      if( ! this.config.weighted) {
        available = this.config.available;
        weighted  = [];
        current   = 0;

        while(current < available.length) {
          config = available[current];
          weight = config.shift();
          pair   = config;

          for(i = 0; i < weight; i ++) {
            weighted.push(pair);
          }

          current += 1;
        }

        this.config.weighted = weighted;
      }

      return this.config.weighted;
    }
  });

  $(function() {
    function draw(width) {
      var detail, text;
      var column = width / 6;
      var list   = $('<ul class="items">');

      for(var i = 0, n = 20; i < n; i ++) {
        detail = rand.next();
        text   = (i + 1) + "<br>(" + detail[detail.length - 1] + ")";
        list.append('<li class="item ' + detail.join(' ') + '"><span>' + text + '</span></li>');
      }

      $('.container.w' + width)
        .append(list)
        .isotope({
          itemSelector : '.item',
          layoutMode   : 'masonry',
          masonry : {
            columnWidth : column
          }
        });
    }

    draw(480);
    draw(960);
  });
})(jQuery);
