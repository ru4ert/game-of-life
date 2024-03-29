import Gui from './Gui'
import { Profiler, useEffect, useState } from 'react'

const DIED = 0,
  ACTIVE = 1,
  BORDER = 2

let initGame = [
  // 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 2
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 3
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 4
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 5
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 6
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 7
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // 8
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], // 9
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0], // 10
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 11
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 12
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 13
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 14
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 15
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 16
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 17
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 18
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 19
]

initGame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export default function Engine(props) {
  const { running, gridHeight, gridWidth, color, bgcolor, speed } = props
  if (!gridHeight || gridHeight < 20) gridHeight = 20
  if (!gridWidth || gridWidth < 20) gridWidth = 20

  const [game, setGame] = useState(initGame)
  const [calc, setCalc] = useState(0)
  const [lastRound, setLastRound] = useState(false)

  const engineResetCallback = (event) => {
    event.stopImmediatePropagation()
    setGame(() => initGame)
    setLastRound(() => true)
  }

  const updateCellCallback = (event) => {
    event.stopImmediatePropagation()
    setGame((cGame) => {
      const { colIndex, rowIndex, updateTo } = event.detail
      const cRow = [...cGame[rowIndex]]

      cRow.splice(colIndex, 1, updateTo)
      cGame[rowIndex] = cRow

      return cGame
    })
    setCalc((c) => c + 1)
  }

  document.addEventListener('resetEngine', engineResetCallback)
  document.addEventListener('updateCell', updateCellCallback)

  const reCalGrid = (cGame) => {
    if (cGame.length !== gridHeight) {
      if (cGame.length > gridHeight) {
        // slice
        cGame = cGame.slice(0, gridHeight)
      } else {
        // push
        while (cGame.length !== gridHeight) {
          cGame.push([])
        }
      }
    }

    cGame = cGame.map((row) => {
      if (row.length === gridWidth) return row
      let cMod = [...row]
      if (cMod.length !== gridWidth) {
        if (cMod.length > gridWidth) {
          // slice
          cMod = cMod.slice(0, gridWidth)
        } else {
          // push
          while (cMod.length !== gridWidth) {
            cMod.push(DIED)
          }
        }
      }

      return cMod
    })
    return cGame
  }

  const getNeighbourhood = (rowIndex, colIndex) => {
    let bN
    let cN = colIndex > 0 ? game[rowIndex].slice(colIndex - 1, colIndex + 2) : [2, ...game[rowIndex].slice(colIndex, colIndex + 2)] // wird eh aufgefüllt
    let aN

    if (rowIndex === 0) bN = [2, 2, 2]
    else if (rowIndex >= gridHeight - 1) aN = [2, 2, 2]

    if (!bN) bN = colIndex > 0 ? game[rowIndex - 1].slice(colIndex - 1, colIndex + 2) : [2, ...game[rowIndex - 1].slice(colIndex, colIndex + 2)]
    if (!aN) aN = colIndex > 0 ? game[rowIndex + 1].slice(colIndex - 1, colIndex + 2) : [2, ...game[rowIndex + 1].slice(colIndex, colIndex + 2)]

    if (bN.length < 3)
      if (colIndex > 1) {
        bN = [...bN, 2]
      } else {
        bN = [2, ...bN]
      }

    if (cN.length < 3)
      if (colIndex > 1) {
        cN = [...cN, 2]
      } else {
        cN = [2, ...cN]
      }

    if (aN.length < 3)
      if (colIndex > 1) {
        aN = [...aN, 2]
      } else {
        aN = [2, ...aN]
      }

    return [bN, cN, aN]
  }

  const countNeighbours = (neighbourhood, countIf = [ACTIVE, DIED]) => {
    let count = 0

    neighbourhood.forEach((row) => {
      count += row.filter((it) => it === ACTIVE).map((it) => it).length
    })

    if (neighbourhood[1][1] === ACTIVE) count--

    return count
  }

  const processStep = (pGame) => {
    const mod = []

    reCalGrid(pGame).forEach((row, rowIndex) => {
      const cRow = []
      const setStatus = (status) => cRow.push(status)

      row.forEach((cell, colIndex) => {
        const cneighbourhood = getNeighbourhood(rowIndex, colIndex)
        const neighboursActive = countNeighbours(cneighbourhood, [ACTIVE])

        switch (cell) {
          case DIED:
            if (neighboursActive === 3) {
              // Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
              setStatus(ACTIVE)
            } else {
              setStatus(DIED)
            }

            break

          case BORDER:
            break

          case ACTIVE:
            if (neighboursActive < 2) {
              // Rule 1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.
              setStatus(DIED)
            } else if (neighboursActive > 3) {
              // Rule 2: Any live cell with two or three live neighbours lives on to the next generation.
              // setStatus(rowIndex, colIndex, ACTIVE)
              // Rule 3: Any live cell with more than three live neighbours dies, as if by overpopulation.
              setStatus(DIED)
            } else {
              setStatus(ACTIVE)
            }

            break

          default:
        }
      })

      mod.push(cRow)
    })
    return mod
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!running) {
        if (lastRound) return
        return setLastRound(() => true)
      }

      setLastRound(() => false)
      setGame((game) => processStep(game))
      setCalc((c) => c + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [game, running])

  return (
    <>
      <Gui pGame={game} calc={calc} lastRound={lastRound} />
    </>
  )
}
