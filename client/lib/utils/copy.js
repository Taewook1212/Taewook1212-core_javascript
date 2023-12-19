export function copy(text) {
  // Promiss가 리턴됨. 비동기. then() 콜백함수. 실패하면 Alert 안보냄
  return navigator.clipboard.writeText(text);
}
