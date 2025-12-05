import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CryptoCharts = ({ prices }) => {
    const formattedData = prices.map((item, index) => ({
        day: index + 1,
        price: item[1]
    })
    );

    return (
        <>
            <ResponsiveContainer width="100%" height={450}>
                <LineChart data={formattedData}>
                    <XAxis
                        dataKey="day"
                    />

                    <YAxis
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `$${value.toFixed(2)}`} // show money format
                        tick={{ fontSize: 12 }}
                    />

                    <Tooltip
                        formatter={(val) => `$${val.toFixed(2)}`}
                        contentStyle={{
                            backgroundColor: "#1e1e1e",
                            borderRadius: "8px",
                            border: "1px solid #333",
                            color: "#fff"
                        }}
                    />

                    <Line
                        type="monotone"      // smooth curved line
                        dataKey="price"
                        stroke="#00c853"     // green crypto feel
                        strokeWidth={3}      // thicker = stronger look
                        dot={false}          // hide dots for cleaner look
                        activeDot={{ r: 6 }} // only show highlight dot on hover
                    />

                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default CryptoCharts
