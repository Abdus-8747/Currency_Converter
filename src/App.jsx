import { useState } from 'react'
import InputBox from './Components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState("")
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState("")

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo || {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    if (!amount || isNaN(parseFloat(amount))) return
    const rate = currencyInfo[to]
    if (rate) {
      setConvertedAmount((parseFloat(amount) * rate))
    }
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #6a4c9c, #5f4b8b, #8d7cb0)", // Lighter purple shades
        animation: "gradient 15s ease infinite", // Smooth gradient animation
        backgroundSize: "400% 400%", // Expands the gradient for smooth transition
        height: "100vh", // Full screen height
      }}
      
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-lg bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >
            {/* From Currency Input */}
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(value) => setAmount(value)}
                selectCurrency={from}
              />
            </div>

            {/* Swap Button */}
            <div className="relative w-full h-0.5 mb-4">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-black text-white px-2 py-0.5 transition-all hover:bg-gray-900"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            {/* To Currency Input */}
            <div className="w-full mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>

            {/* Convert Button */}
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-3 rounded-lg transition-all hover:bg-gray-900 focus:outline-none"
              disabled={!amount || !currencyInfo[to]}
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
