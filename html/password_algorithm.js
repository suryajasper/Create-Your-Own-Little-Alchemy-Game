function algorithm(password) {
  split = password.split("");
  answer = "";
  for (var i = 0; i < split.length; i++) {
    ascii = split[i].charCodeAt(0);
    answer += Math.sin(ascii).toString();
  }
  return answer;
}
