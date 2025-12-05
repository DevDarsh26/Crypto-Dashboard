import React, { useEffect, useState } from 'react'
import CryptoCharts from './CryptoCharts'
import SearchBar from './SearchBar'

const DashBoard = () => {

    const [data, setdata] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCoin, setselectedCoin] = useState(null)
    const [chartData, setchartData] = useState([])
    const [query, setQuery] = useState("")

    const API = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`

    const fetchData = async () => {
        try {
            const response = await fetch(API);
            const jsonData = await response.json();
            setdata(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchChart = async (coinId) => {
        try {
            const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;
            const res = await fetch(url);
            const jsonData = await res.json();
            setchartData(jsonData.prices);  // store only prices array
            setselectedCoin(coinId);
        } catch (error) {
            console.error("Error fetching chart:", error);
        }
    };


    const handleSearch = () => {
        let results = [];
        if (!query) results = data; // empty query → show all
        else
            results = data.filter((coin) =>
                coin.name.toLowerCase().includes(query.toLowerCase())
            );
        setFilteredData(results);
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Crypto Dashboard</h1>
                <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
                <button
                    onClick={fetchData}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Refresh
                </button>
            </header>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.slice(0, 4).map(coin => (
                        <div
                            key={coin.id}
                            onClick={() => fetchChart(coin.id)}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
                        >
                            <img
                                src={coin.image}
                                alt={coin.name}
                                className="w-16 h-16 mb-2"
                            />
                            <h2 className="text-lg font-semibold">{coin.name}</h2>
                            <p className="text-gray-600">${coin.current_price}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>

            {/* Chart Section */}
            {selectedCoin && chartData.length > 0 && (
                <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 capitalize">
                        {selectedCoin} 7-Day Price Chart
                    </h2>
                    <CryptoCharts prices={chartData} coins={data.slice(0, 4)} />
                </div>
            )}

        </div>
    )
}

export default DashBoard
