//피보나치 메모이제이션

//전역상태관리 한다는 이야기
//getNode를 계쏙 불러와야해서

//  나 이거 저장해놓고 필요할 때 가져다 쓸게~~

export const memo = (() => {
  const cache = {};

  return (key, callback) => {
    if (!callback) return cache[key];

    if (cache[key]) {
      console.warn(`${key} 안에는 이미 캐시된 값이 존재합니다.`);
      return cache[key];
    }
    cache[key] = callback();
  };
})();
