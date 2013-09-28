$(document).on('click', 'td', function(e) {

   var col = $(this).data('col');
   var row = $(this).data('row');

   var prev_col = $('table').data('col');
   var prev_row = $('table').data('row');

   if(prev_col == col) { //selected same column, deselect everything

      $('table').column(col).removeClass('col-sel');
      $('table').data('col', -1);

   } else if(prev_row == row) { //selected sam row, select column now

      $('table').row(row).removeClass('row-sel');
      $('table').column(col).addClass('col-sel');

      $('table').data('col', col);
      $('table').data('row', -1);

   } else if (prev_row > 0) { //swap rows

      $('table').swap_row(row, prev_row);

   } else if (prev_col > 0) { //swap columns

      $('table').swap_col(col, prev_col);

   } else { //select first row

      $('table').row(row).addClass('row-sel');
      $('table').data('row', row);
   }

});

$.fn.swap_row = function(row, prev_row) {
   for(var i = 1; i <= $('table').cols(); i++) {

      var row_td = $('table').cell(row, i);
      var prev_row_td = $('table').cell(prev_row, i);

      var tmp = row_td.html();
      row_td.html(prev_row_td.html());
      prev_row_td.html(tmp);
   }

   $('table').row(row).removeClass('row-sel');
   $('table').row(prev_row).removeClass('row-sel');

   $('table').data('col', -1);
   $('table').data('row', -1);
}

$.fn.swap_col = function(col, prev_col) {
   for(var i = 1; i <= $('table').rows(); i++) {

      var col_td = $('table').cell(i, col);
      var prev_col_td = $('table').cell(i, prev_col);

      var tmp = col_td.html();
      col_td.html(prev_col_td.html());
      prev_col_td.html(tmp);
   }

   $('table').column(col).removeClass('col-sel');
   $('table').column(prev_col).removeClass('col-sel');

   $('table').data('col', -1);
   $('table').data('row', -1);
}

$.fn.cell = function(row, col) {
   return $('tr:nth-child('+(row)+') td:nth-child('+(col)+')');
}

$.fn.row = function(i) {
   return $('tr:nth-child('+(i)+') td', this);
}
$.fn.column = function(i) {
   return $('tr td:nth-child('+(i)+')', this);
}
$.fn.rows = function() {
   return $('table tr').length;
}
$.fn.cols = function() {
   return $('table tr:first td').length;
}
