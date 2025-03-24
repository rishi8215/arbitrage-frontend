async function fetchArbitrageData() {
    try {
        const response = await fetch("https://your-api.onrender.com/prices"); // Replace with your Render API URL
        const data = await response.json();

        let arbitrageData = data.map(item => {
            const profit = ((item.kucoin - item.binance) / item.binance) * 100;
            const profitClass = profit >= 0 ? "profit-positive" : "profit-negative";

            return `
                <tr>
                    <td>${item.pair}</td>
                    <td>Binance</td>
                    <td>$${item.binance.toFixed(2)}</td>
                    <td>KuCoin</td>
                    <td>$${item.kucoin.toFixed(2)}</td>
                    <td class="profit ${profitClass}">${profit.toFixed(2)}%</td>
                </tr>
            `;
        }).join("");

        document.getElementById("arbitrage-data").innerHTML = arbitrageData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchArbitrageData();
setInterval(fetchArbitrageData, 5000);
