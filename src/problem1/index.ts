// Task: Provide 3 unique implementations of the following function in JavaScript.

// Implementation 1: Using Arithmetic Formula
function sum_to_n_a(n) {
  return (n * (n + 1)) / 2;
}

// Implementation 2: Using a Loop
function sum_to_n_b(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// Implementation 3: Using Recursion
function sum_to_n_c(n) {
  if (n <= 1) {
    return n;
  }

  return n + sum_to_n_c(n - 1);
}
