# stockcharts
This is a freecodecamp fullstack project. Detailed requirements see: https://www.freecodecamp.org/challenges/chart-the-stock-market

The boilerplate of this app was based on Express in Action and MEAN dev book and my previous fcc exercises. The charting is based on d3 examples by https://bl.ocks.org/mbostock;

Stock data is from Alpha Vantage API on TIME_SERIES_DAILY https://www.alphavantage.co/documentation/ The API is often unstable. If no result is seen, wait for another time to try.

This implemented all the user stories. This can be further improved:

1) There is no error checking: if user inputs a non-existence ticker npthing happens;
2) look and feel is a bit unsatisfying
3) Can add an ticker search box to validate the tickers before submition
4) make it exportable

Then this will be a useful app. For now, just an exercise for learning.


