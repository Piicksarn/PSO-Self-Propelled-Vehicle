function rbf(weight, mean, inputArray, theta, sigma) {

  // Calculate for Basis function of RBF
  //phi = Math.exp(-1 * norm * (/(sigma * sigma)));
  var norm = 0;
  for(var i in mean) {
    norm = norm + Math.pow((inputArray[i] - mean[i]), 2);
  }
  var phi = Math.exp(-1 * norm * (/(sigma * sigma)));

}

function E() {



}
