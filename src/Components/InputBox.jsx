import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "inr",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`bg-gray-800 text-white p-5 rounded-lg shadow-md flex gap-4 ${className}`}
    >
      {/* Amount Input */}
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-gray-400 mb-2 block font-semibold"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="w-full bg-gray-700 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      <div className="w-1/2 flex flex-col justify-start text-right">
        <label className="text-gray-400 mb-2 block font-semibold">
          Currency Type
        </label>
        <select
          className="rounded-lg px-4 py-2 bg-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={selectCurrency}
          disabled={currencyDisable}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option value={currency} key={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
