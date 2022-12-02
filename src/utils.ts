export function genRandonString(length: number) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charLength = chars.length;
  var result = "";
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

export function randomInRange(r1: number, r2: number) {
  return r1 + Math.round(Math.random() * (r2 - r1));
}
