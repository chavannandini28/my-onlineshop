import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    axios
      .get(
        "https://674e84f1635bad45618eebc1.mockapi.io/api/v1/zeptoproducts"
      )
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      });
  }, []);

  // 🔥 MAIN FILTER FUNCTION (FIX)
  const applyFilters = (searchText, category) => {
    let data = [...products];

    // category filter
    if (category !== "All") {
      data = data.filter((p) => p.category === category);
    }

    // search filter
    if (searchText.trim() !== "") {
      data = data.filter((p) =>
        (p.name || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    setFiltered(data);
  };

  // 🔍 SEARCH
  const handleSearch = (text) => {
    setSearch(text);
    applyFilters(text, activeCat);
  };

  // 📂 CATEGORY
  const handleCategory = (cat) => {
    setActiveCat(cat);
    applyFilters(search, cat);
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  return (
    <div className="home-page">

      {/* SEARCH */}
      <div className="search-bar">
        <input
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY */}
      <div className="category-bar">

        {categories.map((c, i) => (
          <button
            key={i}
            className={
              activeCat === c
                ? "cat-btn active"
                : "cat-btn"
            }
            onClick={() => handleCategory(c)}
          >
            {c}
          </button>
        ))}

      </div>

      {/* PRODUCTS */}
      <div className="grid">

        {filtered.length === 0 ? (
          <div className="empty">
            No products found 😔
          </div>
        ) : (
          filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        )}

      </div>

    </div>
  );
};

export default Home;