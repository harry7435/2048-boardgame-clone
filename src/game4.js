import { getStorage, removeStorage, setStorage } from './storage.js';

let board = Array.from(Array(4), () => Array(4).fill(0));
let boardId = Array.from([0, 1, 2, 3], (n) =>
  Array(`${n}0`, `${n}1`, `${n}2`, `${n}3`)
);
let score;

// 키보드 입력
const keyDownEventHandler = (e) => {
  const keyCode = e.keyCode;
  // 상
  if (keyCode === 38) {
    moveTop();
  }
  // 하
  else if (keyCode === 40) {
    moveBottom();
  }
  // 좌
  else if (keyCode === 37) {
    moveLeft();
  }
  // 우
  else if (keyCode === 39) {
    moveRight();
  }

  boardUpdate();
};

// 키보드 입력 핸들러
document.onkeydown = keyDownEventHandler;

// 버튼 클릭
const onClickEventHandler = (e) => {
  const { classList } = e.target;
  // 새 게임
  if (classList.contains('new-game')) {
    removeStorage('score');
    removeStorage('board');
    init();
  }
  // 홈 메뉴
  if (classList.contains('go-home')) {
    console.log('홈으로');
  }
};

// 버튼 클릭 핸들러
document.onclick = onClickEventHandler;

// 모바일 터치
const onTouchStartHandler = (e) => {
  const { clientX, clientY } = e.changedTouches[0];
  let startX = clientX;
  let startY = clientY;
  let endX;
  let endY;

  const onTouchEndHandler = (e) => {
    const { clientX, clientY } = e.changedTouches[0];
    endX = clientX;
    endY = clientY;
    const dX = endX - startX;
    const dY = endY - startY;

    const isVertical = Math.abs(dY) > Math.abs(dX);
    // 수직 이동
    if (isVertical) {
      if (dY > 0) {
        moveBottom();
      } else if (dY < 0) {
        moveTop();
      }
    } else {
      // 수평 이동
      if (dX > 0) {
        moveRight();
      } else if (dX < 0) {
        moveLeft();
      }
    }

    boardUpdate();
  };

  document.ontouchend = onTouchEndHandler;
};

// 모바일 터치 핸들러
document.ontouchstart = onTouchStartHandler;

// 마우스 드래그
const onMouseDownHandler = (e) => {
  const { clientX, clientY } = e;
  let startX = clientX;
  let startY = clientY;
  let endX;
  let endY;

  const onMouseUpHandler = (e) => {
    const { clientX, clientY } = e;
    endX = clientX;
    endY = clientY;
    const dX = endX - startX;
    const dY = endY - startY;

    const isVertical = Math.abs(dY) > Math.abs(dX);
    // 수직 이동
    if (isVertical) {
      if (dY > 0) {
        moveBottom();
      } else if (dY < 0) {
        moveTop();
      }
    } else {
      // 수평 이동
      if (dX > 0) {
        moveRight();
      } else if (dX < 0) {
        moveLeft();
      }
    }

    boardUpdate();
  };

  document.onmouseup = onMouseUpHandler;
};

// 마우스 드래그 핸들러
document.onmousedown = onMouseDownHandler;

// 초기화
const init = () => {
  const [savePoint, saveBoard] = [getStorage('score'), getStorage('board')];
  if (savePoint !== null && saveBoard) {
    score = savePoint;
    board = saveBoard;
    boardUpdate(); // 보드 업데이트
    return;
  }

  score = 0;
  // 배열 초기화
  board = Array.from(Array(4), () => Array(4).fill(0));
  // 초기 랜덤 숫자 위치 지정
  let num = 0;
  while (num < 2) {
    let randNum = parseInt(Math.random() * 16); // 0 ~ 15
    let x = randNum % 4; // 열
    let y = parseInt(randNum / 4); // 행
    // 해당 위치에 숫자 생성
    if (board[y][x] === 0) {
      board[y][x] = randNewNum();
      num++;
    }
  }

  boardUpdate(); // 보드 업데이트
};

// 화면 업데이트
const boardUpdate = () => {
  // 보드판 업데이트
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.getElementById(boardId[i][j]);
      box.innerText = board[i][j] === 0 ? '' : board[i][j];
      changeBoxColor(box); // 색깔 변경
    }
  }

  // 보드판 및 점수 저장
  setStorage('board', board);
  setStorage('score', score);

  // 점수 업데이트
  document.querySelector('.score').innerText = score;
};

// 박스 색깔 변경
const changeBoxColor = (box) => {
  let boxNum = parseInt(box.innerText);
  switch (boxNum) {
    case 0:
    case 2:
      box.style.color = '#684A23';
      box.style.background = '#FBEDDC';
      break;
    case 4:
      box.style.color = '#684A23';
      box.style.background = '#F9E2C7';
      break;
    case 8:
      box.style.color = '#684A23';
      box.style.background = '#F6D5AB';
      break;
    case 16:
      box.style.color = '#684A23';
      box.style.background = '#F2C185';
      break;
    case 32:
      box.style.color = '#684A23';
      box.style.background = '#EFB46D';
      break;
    case 64:
      box.style.color = '#FFFFFF';
      box.style.background = '#EBA24A';
      break;
    case 128:
      box.style.color = '#FFFFFF';
      box.style.background = '#E78F24';
      break;
    case 256:
      box.style.color = '#FFFFFF';
      box.style.background = '#E87032';
      break;
    case 512:
      box.style.color = '#FFFFFF';
      box.style.background = '#E85532';
      break;
    case 1024:
      box.style.color = '#FFFFFF';
      box.style.background = '#E84532';
      break;
    case 2048:
      box.style.color = '#FFFFFF';
      box.style.background = '#E83232';
      break;
    default:
      if (boxNum > 2048) {
        box.style.color = '#FFFFFF';
        box.style.background = '#E51A1A';
      } else {
        box.style.color = '#684A23';
        box.style.background = '#FBEDDC';
      }
      break;
  }
};

// 보드판 숫자 이동
// 상
const moveTop = () => {
  let isMoved = false; // 이동 여부 확인
  let isPlused = Array.from(Array(4), () => Array(4).fill(0)); // 중복 누적 방지
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) continue; // 숫자가 없으면 패스
      let topY = i - 1; // 위로 이동할 좌표
      // 이동할 칸이 빈값이 아닐 때까지 이동
      while (topY > 0 && board[topY][j] === 0) topY--;
      // 이동할 칸이 빈값이면
      if (board[topY][j] === 0) {
        // 현재값 밀어올리고 현재값 비우기
        board[topY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 다를 경우
      else if (board[topY][j] !== board[i][j]) {
        if (topY + 1 === i) continue; // 바로 윗칸이면 패스
        // 아니라면 바로 아래까지 밀어올리기
        board[topY + 1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 같다면
      else {
        // 최초 이동한 칸이라면 더하기
        if (isPlused[topY][j] === 0) {
          board[topY][j] *= 2;
          score += board[topY][j];
          board[i][j] = 0;
          isPlused[topY][j] = 1;
          isMoved = true;
        } // 중복 누적이라면 바로 아래칸으로 밀어올리기
        else {
          board[topY + 1][j] = board[i][j];
          board[i][j] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) makeNewNum(); // 이동했으면 새로운 숫자 생성
  else isGameOver(); // 아니라면 게임오버 확인
};
// 하
const moveBottom = () => {
  let isMoved = false; // 이동 여부 확인
  let isPlused = Array.from(Array(4), () => Array(4).fill(0)); // 중복 누적 방지
  for (let i = 2; i > -1; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) continue; // 숫자가 없으면 패스
      let bottomY = i + 1; // 아래로 이동할 좌표
      // 이동할 칸이 빈값이 아닐 때까지 이동
      while (bottomY < 3 && board[bottomY][j] === 0) bottomY++;
      // 이동할 칸이 빈값이면
      if (board[bottomY][j] === 0) {
        // 현재값 밀어내리고 현재값 비우기
        board[bottomY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 다를 경우
      else if (board[bottomY][j] !== board[i][j]) {
        if (bottomY - 1 === i) continue; // 바로 아래칸이면 패스
        // 아니라면 바로 위까지 밀어내리기
        board[bottomY - 1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 같다면
      else {
        // 최초 이동한 칸이라면 더하기
        if (isPlused[bottomY][j] === 0) {
          board[bottomY][j] *= 2;
          score += board[bottomY][j];
          board[i][j] = 0;
          isPlused[bottomY][j] = 1;
          isMoved = true;
        } // 중복 누적이라면 바로 윗칸으로 밀어내리기
        else {
          board[bottomY - 1][j] = board[i][j];
          board[i][j] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) makeNewNum(); // 이동했으면 새로운 숫자 생성
  else isGameOver(); // 아니라면 게임오버 확인
};
// 좌
const moveLeft = () => {
  let isMoved = false; // 이동 여부 확인
  let isPlused = Array.from(Array(4), () => Array(4).fill(0)); // 중복 누적 방지
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[j][i] === 0) continue; // 숫자가 없으면 패스
      let leftX = i - 1; // 왼쪽로 이동할 좌표
      // 이동할 칸이 빈값이 아닐 때까지 이동
      while (leftX > 0 && board[j][leftX] === 0) leftX--;
      // 이동할 칸이 빈값이면
      if (board[j][leftX] === 0) {
        // 현재값 왼쪽으로 당기고 현재값 비우기
        board[j][leftX] = board[j][i];
        board[j][i] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 다를 경우
      else if (board[j][leftX] !== board[j][i]) {
        if (leftX + 1 === i) continue; // 바로 왼쪽칸이면 패스
        // 아니라면 바로 오른쪽까지 당기기
        board[j][leftX + 1] = board[j][i];
        board[j][i] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 같다면
      else {
        // 최초 이동한 칸이라면 더하기
        if (isPlused[j][leftX] === 0) {
          board[j][leftX] *= 2;
          score += board[j][leftX];
          board[j][i] = 0;
          isPlused[j][leftX] = 1;
          isMoved = true;
        } // 중복 누적이라면 바로 아래칸으로 밀어올리기
        else {
          board[j][leftX + 1] = board[j][i];
          board[j][i] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) makeNewNum(); // 이동했으면 새로운 숫자 생성
  else isGameOver(); // 아니라면 게임오버 확인
};
// 우
const moveRight = () => {
  let isMoved = false; // 이동 여부 확인
  let isPlused = Array.from(Array(4), () => Array(4).fill(0)); // 중복 누적 방지
  for (let i = 2; i > -1; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[j][i] === 0) continue; // 숫자가 없으면 패스
      let rightX = i + 1; // 오른쪽으로 이동할 좌표
      // 이동할 칸이 빈값이 아닐 때까지 이동
      while (rightX < 3 && board[j][rightX] === 0) rightX++;
      // 이동할 칸이 빈값이면
      if (board[j][rightX] === 0) {
        // 현재값 당기고 현재값 비우기
        board[j][rightX] = board[j][i];
        board[j][i] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 다를 경우
      else if (board[j][rightX] !== board[j][i]) {
        if (rightX - 1 === i) continue; // 바로 오른쪽 칸이면 패스
        // 아니라면 바로 왼쪽까지 당기기
        board[j][rightX - 1] = board[j][i];
        board[j][i] = 0;
        isMoved = true;
      } // 이동할 칸이 현재값과 같다면
      else {
        // 최초 이동한 칸이라면 더하기
        if (isPlused[j][rightX] === 0) {
          board[j][rightX] *= 2;
          score += board[j][rightX];
          board[j][i] = 0;
          isPlused[j][rightX] = 1;
          isMoved = true;
        } // 중복 누적이라면 바로 왼쪽 칸으로 당기기
        else {
          board[j][rightX - 1] = board[j][i];
          board[j][i] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) makeNewNum(); // 이동했으면 새로운 숫자 생성
  else isGameOver(); // 아니라면 게임오버 확인
};

// 새로운 숫자 생성
const makeNewNum = () => {
  const zeroNum = isZero();
  while (true) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          let randNum = parseInt(Math.random() * zeroNum);
          if (randNum === 0) {
            board[i][j] = randNewNum();
            return;
          }
        }
      }
    }
  }
};

// 빈칸 갯수 세기
const isZero = () => {
  let isZero = 0;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) isZero++;
    }
  }
  return isZero;
};

// 숫자 생성 확률
const randNewNum = () => {
  let randNum = parseInt(Math.random() * 10); // 1/10 확률
  return randNum === 0 ? 4 : 2;
};

// 최대 숫자 갱신
const getMaxNum = () => {
  let maxNum = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      maxNum = board[i][j] > maxNum ? board[i][j] : maxNum;
    }
  }

  setStorage('maxNum', maxNum);
  return maxNum;
};

// 게임오버 확인
const isGameOver = () => {
  // 행 체크
  for (let i = 0; i < 4; i++) {
    let tempCol = board[i][0];
    if (tempCol === 0) return; // 빈 칸이 존재하면 게임 가능
    for (let j = 1; j < 4; j++) {
      // 빈 칸이거나 왼쪽 칸과 동일하면 게임 가능
      if (board[i][j] === tempCol || board[i][j] === 0) return;
      // 값이 있으면 갱신
      else tempCol = board[i][j];
    }
  }
  // 열 체크
  for (let i = 0; i < 4; i++) {
    let tempRow = board[0][i];
    if (tempRow === 0) return; // 빈 칸이 존재하면 게임 가능
    for (let j = 1; j < 4; j++) {
      // 빈 칸이거나 왼쪽 칸과 동일하면 게임 가능
      if (board[j][i] === tempRow || board[j][i] === 0) return;
      // 값이 있으면 갱신
      else tempRow = board[j][i];
    }
  }

  // 게임 불가능하면 최고 점수 반환 및 alert
  gameOver();
};

// 게임오버
const gameOver = () => {
  alert(`게임 오버입니다. 최대 숫자 : ${getMaxNum()} , 최고 점수 : ${score}`);
  localStorage.setItem('2048최고점수', score);
  init();
};

init();
