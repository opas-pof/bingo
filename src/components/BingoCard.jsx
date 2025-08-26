import { useState } from 'react'

const BingoCard = ({ numbers, onNumberClick, isGameActive = true }) => {
  const [selectedNumbers, setSelectedNumbers] = useState(new Set())

  const handleNumberClick = (number, row, col) => {
    if (!isGameActive) return
    
    const newSelected = new Set(selectedNumbers)
    if (newSelected.has(number)) {
      newSelected.delete(number)
    } else {
      newSelected.add(number)
    }
    setSelectedNumbers(newSelected)
    onNumberClick?.(number, row, col)
  }

  const isSelected = (number) => selectedNumbers.has(number)

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">BINGO</h2>
      </div>
      
      <div className="grid grid-cols-5 gap-1">
        {numbers.map((row, rowIndex) => 
          row.map((number, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleNumberClick(number, rowIndex, colIndex)}
              className={`
                aspect-square flex items-center justify-center text-lg font-bold rounded cursor-pointer transition-all duration-200
                ${number === 'FREE' 
                  ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                  : isSelected(number)
                    ? 'bg-blue-500 text-white shadow-md transform scale-95'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }
                ${isGameActive ? 'hover:scale-105' : 'cursor-not-allowed'}
              `}
            >
              {number}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BingoCard
