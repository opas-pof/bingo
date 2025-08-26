import { useState, useEffect } from 'react'
import BingoCard from './components/BingoCard'
import NumberCaller from './components/NumberCaller'
import GameControls from './components/GameControls'
import { generateBingoCard, checkWin, calculateScore } from './utils/bingoLogic'

function App() {
  const [bingoCard, setBingoCard] = useState([])
  const [calledNumbers, setCalledNumbers] = useState([])
  const [isGameActive, setIsGameActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [score, setScore] = useState(0)
  const [gameResult, setGameResult] = useState(null)

  // Timer effect
  useEffect(() => {
    let interval = null
    if (isGameActive && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameActive, isPaused])

  // เริ่มเกมใหม่
  const startNewGame = () => {
    setBingoCard(generateBingoCard())
    setCalledNumbers([])
    setIsGameActive(true)
    setIsPaused(false)
    setTimeElapsed(0)
    setScore(0)
    setGameResult(null)
  }

  // หยุดเกม
  const pauseGame = () => {
    setIsPaused(true)
  }

  // ดำเนินเกมต่อ
  const resumeGame = () => {
    setIsPaused(false)
  }

  // เมื่อตัวเลขถูกเรียก
  const handleNumberCalled = (number) => {
    if (!isGameActive || isPaused) return
    
    setCalledNumbers(prev => {
      const newCalled = [...prev, number]
      
      // ตรวจสอบการชนะ
      const winResult = checkWin(bingoCard, newCalled)
      if (winResult.isWin) {
        const finalScore = calculateScore(newCalled, timeElapsed)
        setScore(finalScore)
        setIsGameActive(false)
        setGameResult({
          isWin: true,
          pattern: winResult.pattern,
          type: winResult.type,
          score: finalScore
        })
      }
      
      return newCalled
    })
  }

  // เมื่อคลิกตัวเลขในบัตร
  const handleNumberClick = (number, row, col) => {
    if (!isGameActive || isPaused) return
    
    // ตรวจสอบว่าตัวเลขถูกเรียกแล้วหรือไม่
    if (calledNumbers.includes(number)) {
      // ถ้าตัวเลขถูกเรียกแล้ว ให้ตรวจสอบการชนะอีกครั้ง
      const winResult = checkWin(bingoCard, calledNumbers)
      if (winResult.isWin) {
        const finalScore = calculateScore(calledNumbers, timeElapsed)
        setScore(finalScore)
        setIsGameActive(false)
        setGameResult({
          isWin: true,
          pattern: winResult.pattern,
          type: winResult.type,
          score: finalScore
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 Bingo Game
          </h1>
          <p className="text-gray-600">
            เกม Bingo แบบ Single Player - เริ่มเกมใหม่เพื่อเริ่มเล่น!
          </p>
        </div>

        {/* Game Result Modal */}
        {gameResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                ยินดีด้วย! คุณชนะแล้ว!
              </h2>
              <p className="text-gray-600 mb-4">
                คุณได้ {gameResult.type === 'horizontal' ? 'แถวแนวนอน' : 
                        gameResult.type === 'vertical' ? 'แถวแนวตั้ง' : 
                        gameResult.type === 'diagonal' ? 'แนวทแยง' : 'Bingo'}!
              </p>
              <p className="text-xl font-bold text-blue-600 mb-6">
                คะแนน: {gameResult.score}
              </p>
              <button
                onClick={startNewGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                เล่นอีกครั้ง
              </button>
            </div>
          </div>
        )}

        {/* Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* บัตร Bingo */}
          <div className="lg:col-span-1">
            <BingoCard 
              numbers={bingoCard} 
              onNumberClick={handleNumberClick}
              isGameActive={isGameActive && !isPaused}
            />
          </div>

          {/* ควบคุมเกมและตัวเลข */}
          <div className="lg:col-span-2 space-y-6">
            {/* ควบคุมเกม */}
            <GameControls
              onNewGame={startNewGame}
              onPauseGame={pauseGame}
              onResumeGame={resumeGame}
              isGameActive={isGameActive}
              isPaused={isPaused}
              timeElapsed={timeElapsed}
              score={score}
            />

            {/* ตัวเลขที่ถูกเรียก */}
            <NumberCaller
              onNumberCalled={handleNumberCalled}
              isGameActive={isGameActive && !isPaused}
              calledNumbers={calledNumbers}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              📋 วิธีเล่น
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">1. เริ่มเกม</h4>
                <p>คลิกปุ่ม "เกมใหม่" เพื่อเริ่มเกม Bingo</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">2. สุ่มตัวเลข</h4>
                <p>คลิกปุ่ม "สุ่มตัวเลข" เพื่อเรียกตัวเลขใหม่</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3. ตรวจสอบบัตร</h4>
                <p>คลิกตัวเลขในบัตรที่ตรงกับตัวเลขที่ถูกเรียก</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">4. ชนะเกม</h4>
                <p>ทำแถวแนวนอน แนวตั้ง หรือแนวทแยงให้ครบ 5 ตัว</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
