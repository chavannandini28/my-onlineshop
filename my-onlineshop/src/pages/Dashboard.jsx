import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://674e84f1635bad45618eebc1.mockapi.io/api/v1/zeptoproducts"
      )
      .then((res) => setProducts(res.data));
  }, []);

  // 📊 CATEGORY DATA
  const categoryData = Object.values(
    products.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || {
        name: p.category,
        value: 0,
      };
      acc[p.category].value += 1;
      return acc;
    }, {})
  );

  // 💰 REVENUE
  const revenue = products.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );

  // 🏆 TOP PRODUCTS
  const topProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  const COLORS = ["#6c5ce7", "#00b894", "#0984e3", "#fdcb6e", "#e17055"];

  return (
    <div className="dashboard">

      <div className="dash-header">
        <h2>📊 Admin Dashboard</h2>
      </div>

      {/* STATS */}
      <div className="stats">

        <div className="card">
          <h3>Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <h2>₹{revenue}</h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="charts">

        {/* PIE CHART */}
        <div className="chart-box">
          <h3>Category Distribution</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                outerRadius={80}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}
        <div className="chart-box">
          <h3>Top Categories</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00b894" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* TOP PRODUCTS */}
      <div className="top-products">
        <h3>🏆 Top Products</h3>

        {topProducts.map((p) => (
          <div className="top-item" key={p.id}>
            <span>{p.name}</span>
            <b>₹{p.price}</b>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;