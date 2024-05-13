import React, { useState } from "react";
import "./App.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
function App() {
  const [currentSalary, setCurrentSalary] = useState("");
  const [loanPercent, setLoanPercent] = useState("");
  const [targetBranch, setTargetBranch] = useState("Select");
  const [rankingRange, setRankingRange] = useState("Select");
  const [currency, setCurrency] = useState("Select");
  const [targetCountry, setTargetCountry] = useState("Select");
  const [results, setResults] = useState("");
  const [errors, setErrors] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [futureEarnings, setFutureEarnings] = useState(0);
  const COLORS = ["#0088FE", "#00C49F"];

  const data = [
    { name: "Total Expenses", value: parseFloat(totalExpenses) },
    { name: "Future Earnings", value: parseFloat(futureEarnings) },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (currentSalary === "") {
      newErrors.currentSalary = "Current Annual Salary is required";
    }
    if (loanPercent === "") {
      newErrors.loanPercent = "Loan Amount Percent is required";
    }
    if (targetBranch === "Select") {
      newErrors.targetBranch = "Target Branch is required";
    }
    if (rankingRange === "Select") {
      newErrors.rankingRange = "College Ranking Range is required";
    }
    if (currency === "Select") {
      newErrors.currency = "Currency is required";
    }
    if (targetCountry === "Select") {
      newErrors.targetCountry = "Target Country is required";
    }
    const totalExpenses = currentSalary * (loanPercent / 100);
    setTotalExpenses(totalExpenses);

    // Calculate future earnings
    const yearsToPayLoan = 5;
    const savingsPerYear = 0.025; // 2.5% savings per year

    let futureEarnings = 0;
    for (let i = 1; i <= yearsToPayLoan; i++) {
      futureEarnings += currentSalary * (1 - savingsPerYear) ** i;
    }
    setFutureEarnings(futureEarnings);

    // Update the 'results' state with the calculated values
    setResults(
      `Total Expenses: ${totalExpenses.toFixed(
        2
      )} ${currency}, Future Earnings: ${futureEarnings.toFixed(2)} ${currency}`
    );
    setErrors({});

    setErrors(newErrors);
  };

  return (
    <div className="App">
      <h1>Future Earnings Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="loan-percent">Loan Amount Percent (%):</label>
        <input
          type="range"
          id="loan-percent"
          min="0"
          max="100"
          value={loanPercent}
          onChange={(e) => setLoanPercent(parseInt(e.target.value))}
          required
        />
        {loanPercent}%
        {errors.loanPercent && (
          <p style={{ color: "red" }}>{errors.loanPercent}</p>
        )}
        {!errors.loanPercent && (
          <>
            <br />
            <br />
          </>
        )}
        <label htmlFor="current-salary">Current Annual Salary</label>
        <input
          type="range"
          id="current-salary"
          min="100000"
          max="4000000"
          value={currentSalary}
          onChange={(e) => setCurrentSalary(e.target.value)}
          required
        />
        {currentSalary}
        {errors.currentSalary && (
          <p style={{ color: "red" }}>{errors.currentSalary}</p>
        )}
        {!errors.currentSalary && (
          <>
            <br />
            <br />
          </>
        )}
        <label htmlFor="target-branch">Target Branch:</label>
        <select
          id="target-branch"
          value={targetBranch}
          onChange={(e) => setTargetBranch(e.target.value)}
          required
        >
          <option disabled>Select</option>
          <option value="Aerospace Engineering">Aerospace Engineering</option>
          <option value="Biotechnology">Biotechnology</option>
          <option value="Chemical Engineering">Chemical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Computer Science Engineering">
            Computer Science Engineering
          </option>
          <option value="Electrical and Electronics Engineering">
            Electrical and Electronics Engineering
          </option>
          <option value="Engineering Management">Engineering Management</option>
          <option value="Finance">Finance</option>
          <option value="Industrial Engineering">Industrial Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Material Science">Material Science</option>
          <option value="Mechanical Engineering ">
            Mechanical Engineering
          </option>
          <option value="MIS">MIS</option>
          <option value="Others">Others</option>
        </select>
        {errors.targetBranch && (
          <p style={{ color: "red" }}>{errors.targetBranch}</p>
        )}
        {!errors.targetBranch && (
          <>
            <br />
            <br />
          </>
        )}
        <label htmlFor="target-country">Target Country:</label>
        <select
          id="target-country"
          value={targetCountry}
          onChange={(e) => setTargetCountry(e.target.value)}
          required
        >
          <option disabled>Select</option>
          <option value="All">All</option>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="United States">United States</option>
        </select>
        {errors.targetCountry && (
          <p style={{ color: "red" }}>{errors.targetCountry}</p>
        )}
        {!errors.targetCountry && (
          <>
            <br />
            <br />
          </>
        )}
        <label htmlFor="ranking-range">College Ranking Range:</label>
        <select
          id="ranking-range"
          value={rankingRange}
          onChange={(e) => setRankingRange(e.target.value)}
          required
        >
          <option disabled>Select</option>
          <option value="1-100">1-50</option>
          <option value="1-100">51-100</option>
          <option value="1-100">101-250</option>
          <option value="101-200">251-500</option>
          <option value="201-300">500+</option>
        </select>
        {errors.rankingRange && (
          <p style={{ color: "red" }}>{errors.rankingRange}</p>
        )}
        {!errors.rankingRange && (
          <>
            <br />
            <br />
          </>
        )}
        <label htmlFor="currency">Currency:</label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        >
          <option disabled>Select</option>
          <option value="INR">INR (India)</option>
          <option value="USD">USD (United States)</option>
          <option value="AUD">AUD (Australia)</option>
          <option value="CAD">CAD (Canada)</option>
          <option value="EUR">EUR (Germany)</option>
        </select>
        {errors.currency && <p style={{ color: "red" }}>{errors.currency}</p>}
        {!errors.currency && (
          <>
            <br />
            <br />
          </>
        )}
        <button type="submit">Calculate</button>
      </form>

      <div id="results">
        {results && (
          <>
            {results}
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
