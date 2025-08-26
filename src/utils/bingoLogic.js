// สร้างบัตร Bingo ใหม่
export const generateBingoCard = () => {
  const card = []
  
  // สร้างตัวเลขสำหรับแต่ละคอลัมน์
  const columns = [
    generateColumn(1, 15),    // B: 1-15
    generateColumn(16, 30),   // I: 16-30
    generateColumn(31, 45),   // N: 31-45
    generateColumn(46, 60),   // G: 46-60
    generateColumn(61, 75)    // O: 61-75
  ]
  
  // สร้างแถว
  for (let row = 0; row < 5; row++) {
    const newRow = []
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        newRow.push('FREE') // ช่องกลาง
      } else {
        newRow.push(columns[col][row])
      }
    }
    card.push(newRow)
  }
  
  return card
}

// สร้างคอลัมน์ตัวเลข
const generateColumn = (min, max) => {
  const numbers = []
  for (let i = min; i <= max; i++) {
    numbers.push(i)
  }
  
  // สุ่มเลือก 5 ตัวเลข
  const selected = []
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length)
    selected.push(numbers.splice(randomIndex, 1)[0])
  }
  
  return selected
}

// สุ่มตัวเลขสำหรับเกม
export const generateRandomNumber = (calledNumbers) => {
  const allNumbers = []
  for (let i = 1; i <= 75; i++) {
    if (!calledNumbers.includes(i)) {
      allNumbers.push(i)
    }
  }
  
  if (allNumbers.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * allNumbers.length)
  return allNumbers[randomIndex]
}

// ตรวจสอบการชนะ
export const checkWin = (bingoCard, calledNumbers) => {
  const patterns = [
    // แถวแนวนอน
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    
    // แถวแนวตั้ง
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    
    // แนวทแยง
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ]
  
  // แปลงบัตรเป็น array 1 มิติ
  const flatCard = bingoCard.flat()
  
  for (const pattern of patterns) {
    const isWinning = pattern.every(index => {
      const number = flatCard[index]
      return number === 'FREE' || calledNumbers.includes(number)
    })
    
    if (isWinning) {
      return {
        isWin: true,
        pattern: pattern,
        type: getPatternType(pattern)
      }
    }
  }
  
  return { isWin: false }
}

// หาประเภทของ pattern ที่ชนะ
const getPatternType = (pattern) => {
  if (pattern.length !== 5) return 'unknown'
  
  // ตรวจสอบแถวแนวนอน
  if (pattern[0] < 5 && pattern[1] < 5 && pattern[2] < 5 && pattern[3] < 5 && pattern[4] < 5) {
    return 'horizontal'
  }
  
  // ตรวจสอบแถวแนวตั้ง
  if (pattern[0] % 5 === 0 && pattern[1] % 5 === 1 && pattern[2] % 5 === 2 && pattern[3] % 5 === 3 && pattern[4] % 5 === 4) {
    return 'vertical'
  }
  
  // ตรวจสอบแนวทแยง
  if (pattern.includes(0) && pattern.includes(24)) {
    return 'diagonal'
  }
  
  return 'unknown'
}

// คำนวณคะแนน
export const calculateScore = (calledNumbers, timeElapsed) => {
  const baseScore = calledNumbers.length * 10
  const timeBonus = Math.max(0, 300 - timeElapsed) // โบนัสเวลา (300 วินาที = 5 นาที)
  return baseScore + timeBonus
}
