import { useState, useEffect } from 'react'

const NumberCaller = ({ onNumberCalled, isGameActive, calledNumbers = [] }) => {
  const [currentNumber, setCurrentNumber] = useState(null)
  const [isCalling, setIsCalling] = useState(false)

  const callNumber = () => {
    if (!isGameActive || isCalling) return
    
    setIsCalling(true)
    
    // จำลองการสุ่มตัวเลข
    setTimeout(() => {
      const availableNumbers = []
      for (let i = 1; i <= 75; i++) {
        if (!calledNumbers.includes(i)) {
          availableNumbers.push(i)
        }
      }
      
      if (availableNumbers.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length)
        const newNumber = availableNumbers[randomIndex]
        setCurrentNumber(newNumber)
        onNumberCalled(newNumber)
      }
      
      setIsCalling(false)
    }, 1000)
  }

  const getLetter = (number) => {
    if (number <= 15) return 'B'
    if (number <= 30) return 'I'
    if (number <= 45) return 'N'
    if (number <= 60) return 'G'
    return 'O'
  }

  const getColor = (number) => {
    if (number <= 15) return 'bg-red-500'
    if (number <= 30) return 'bg-blue-500'
    if (number <= 45) return 'bg-green-500'
    if (number <= 60) return 'bg-yellow-500'
    return 'bg-purple-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
        ตัวเลขที่ถูกเรียก
      </h3>
      
      {/* ปุ่มสุ่มตัวเลข */}
      <div className="text-center mb-6">
        <button
          onClick={callNumber}
          disabled={!isGameActive || isCalling}
          className={`
            px-6 py-3 rounded-lg font-bold text-white transition-all duration-200
            ${isGameActive && !isCalling
              ? 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
              : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isCalling ? 'กำลังสุ่ม...' : 'สุ่มตัวเลข'}
        </button>
      </div>
      
      {/* ตัวเลขปัจจุบัน */}
      {currentNumber && (
        <div className="text-center mb-6">
          <div className={`inline-block p-4 rounded-full ${getColor(currentNumber)} text-white`}>
            <div className="text-2xl font-bold">{getLetter(currentNumber)}</div>
            <div className="text-4xl font-bold">{currentNumber}</div>
          </div>
        </div>
      )}
      
      {/* ตัวเลขที่ถูกเรียกแล้ว */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">ตัวเลขที่ถูกเรียกแล้ว:</h4>
        <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
          {calledNumbers.map((number, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-xs font-bold rounded
                ${getColor(number)} text-white
              `}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
      
      {/* สถิติ */}
      <div className="text-center text-sm text-gray-600">
        ถูกเรียกแล้ว: {calledNumbers.length}/75 ตัวเลข
      </div>
    </div>
  )
}

export default NumberCaller
