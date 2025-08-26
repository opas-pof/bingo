import { useState, useEffect } from 'react'

const GameControls = ({ 
  onNewGame, 
  onPauseGame, 
  onResumeGame, 
  isGameActive, 
  isPaused, 
  timeElapsed = 0,
  score = 0 
}) => {
  const [formattedTime, setFormattedTime] = useState('00:00')

  useEffect(() => {
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    
    setFormattedTime(formatTime(timeElapsed))
  }, [timeElapsed])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
        ควบคุมเกม
      </h3>
      
      {/* สถิติเกม */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{formattedTime}</div>
          <div className="text-sm text-gray-600">เวลา</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{score}</div>
          <div className="text-sm text-gray-600">คะแนน</div>
        </div>
      </div>
      
      {/* ปุ่มควบคุม */}
      <div className="space-y-3">
        <button
          onClick={onNewGame}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          เกมใหม่
        </button>
        
        {isGameActive && !isPaused && (
          <button
            onClick={onPauseGame}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            หยุดเกม
          </button>
        )}
        
        {isGameActive && isPaused && (
          <button
            onClick={onResumeGame}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            ดำเนินเกมต่อ
          </button>
        )}
      </div>
      
      {/* สถานะเกม */}
      <div className="mt-4 text-center">
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          isPaused 
            ? 'bg-yellow-100 text-yellow-800' 
            : isGameActive 
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
        }`}>
          {isPaused ? 'หยุดชั่วคราว' : isGameActive ? 'กำลังเล่น' : 'จบเกม'}
        </div>
      </div>
    </div>
  )
}

export default GameControls
