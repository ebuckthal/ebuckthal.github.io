var g_col = -1;
var g_row = -1;

var row_space = -1;

var doc = $(document);
var gb = $('.game-board');

gb.mousemove(function(e) {
   var y = e.pageY - gb.offset().top;

   gb.set_cell_positions(y);
});

gb.click(function(e) {

   var y = e.pageY - gb.offset().top;

   if(g_row == -1) {

      gb.grab_row(y);
      gb.set_cell_positions(y);
      gb.print();

   } else {

      gb.drop_row(y);
      gb.set_cell_positions(y);
      gb.print();

   }
});

$.fn.set_cell_positions = function(y) {

   if(g_row > -1) { //if we're grabbing a row
      var r = gb.get_row(y);

      if(row_space != r) {

         //if cells are greater than where we are, then push them 100px down
         gb.find('.cell').filter(function() {

            return (parseInt($(this).data('row')) >= r );
         }).each(function() {

            $(this).css('top', parseInt($(this).data('row'))*60 + 100);
         });

         //if cells are less than we are, put them where they should be
         gb.find('.cell').filter(function() { //cells less than where we are

            return (parseInt($(this).data('row')) < r );
         }).each(function() {

            $(this).css('top', parseInt($(this).data('row'))*60);
         });

         //keep track of which row we have made space for
         row_space = r;
      }

      //if cells are currently selected, put them where our cursor is, 30px is half of a cell
      gb.find('.sel-row').each(function() {
         $(this).css('top', (y-30));
      });

   } else {

      //put all cells in their rows
      gb.find('.cell').each(function() {
         $(this).css('top', parseInt($(this).data('row'))*60);
      });
   }
}

$.fn.print = function(y) {

   gb.find('.cell').each(function() {
      $(this).html($(this).data('row') + "<br/>" + $(this).data('col'));
   });
}

$.fn.grab_row = function(y) {

   var r = gb.get_row(y); //which row I am removing
   console.log('grabbing row: ' + r);

   //"select" cell that are in this row
   gb.find('.cell').filter(function() {
      return (parseInt($(this).data('row')) == r);
   }).each(function () {
      $(this).addClass('sel-row').removeClass('bounce');
      $(this).data('row', ""+-1); //make their row -1 for debugging (also so they aren't subject to other moving)
   });

   //put each cell larger than the one I just selected in the row below (make a grid as if I pulled the row out)
   gb.find('.cell').filter(function() { 
      return (parseInt($(this).data('row')) > r);
   }).each(function() { 
      var r = parseInt($(this).data('row'));
      $(this).data('row', ""+(r-1));
   });

   g_row = r;
}

$.fn.drop_row = function(y) {

   var r = gb.get_row(y); //which row I want to add
   console.log('dropping row at: ' + r);

   //for all rows larger than where I am (because I push rows down from my current position for space)
   gb.find('.cell').filter(function() {
      return ($(this).data('row') >= r);
   }).each(function() { 
      var r = parseInt($(this).data('row'));
      $(this).data('row', (r+1));
   });

   //remove "selection" from row I am dropping
   gb.find('.cell').filter(function() {
      return ($(this).data('row') == -1);
   }).each(function() {
      $(this).data('row', ""+r);
      $(this).removeClass('sel-row').addClass('bounce');
   });

   g_row = -1;
   row_space = -1;
}

$.fn.get_row = function(y) {
   return Math.min(Math.floor(y / 60), 9);
}

$.fn.get_col = function(x) {

   return Math.floor(x / 60);

}

/*$.fn.swap_row = function(row, prev_row) {
   for(var i = 1; i <= $(this).cols(); i++) {

      var row_td = $(this).cell(row, i);
      var prev_row_td = $(this).cell(prev_row, i);

      var tmp = row_td.html();
      row_td.html(prev_row_td.html());
      prev_row_td.html(tmp);
   }

   $(this).data('col', -1);
   $(this).data('row', -1);
}

$.fn.swap_col = function(col, prev_col) {
   for(var i = 1; i <= $(this).rows(); i++) {

      var col_td = $(this).cell(i, col);
      var prev_col_td = $(this).cell(i, prev_col);

      var tmp = col_td.html();
      col_td.html(prev_col_td.html());
      prev_col_td.html(tmp);
   }

   $(this).column(col).removeClass('col-sel');
   $(this).column(prev_col).removeClass('col-sel');

   $(this).data('col', -1);
   $(this).data('row', -1);
}

$.fn.cell = function(row, col) {
   return $('tr:nth-child('+(row)+') td:nth-child('+(col)+')', this);
}

$.fn.row = function(i) {
   return $('tr:nth-child('+(i)+') td', this);
}

$.fn.column = function(i) {
   return $('tr td:nth-child('+(i)+')', this);
}
$.fn.rows = function() {
   return $('tr', this).length;
}
$.fn.cols = function() {
   return $('tr:first td', this).length;
}
*/