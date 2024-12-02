import  { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Checkbox, Input } from 'antd';
import './homeScreen.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; 
import { Link } from 'react-router-dom'; 

const { Meta } = Card;

const HomePage = () => {
  const [items, setItems] = useState([]); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const [filters, setFilters] = useState({ veg: false, nonVeg: false });
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get('https://qres-data.onrender.com/data'); 
        setItems(data);
        setFilteredItems(data); 
      } catch (error) {
        console.error('Failed to fetch menu items', error);
      }
    };
    fetchItems();
  }, []);

  
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...items];

      
      if (filters.veg && !filters.nonVeg) {
        filtered = filtered.filter(item => item.category === 'veg');
      } else if (filters.nonVeg && !filters.veg) {
        filtered = filtered.filter(item => item.category === 'non-veg');
      }

      
      if (searchTerm) {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      setFilteredItems(filtered);
    };

    applyFilters();
  }, [filters, searchTerm, items]);

  
  const handleFilterChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };

 
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="home-page">
      
      <div className="home-header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="header-links">
        <Input
          className="search-bar"
          placeholder="Search for items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <Link to="/signUp">Sign Up</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>

      
      <div className="filter-section">
        
        <div className="filter-checkboxes">
          <Checkbox
            onChange={() => handleFilterChange('veg')}
            checked={filters.veg}
          >
            Veg
          </Checkbox>
          <Checkbox
            onChange={() => handleFilterChange('nonVeg')}
            checked={filters.nonVeg}
          >
            Non-Veg
          </Checkbox>
        </div>
      </div>

    
      <Row gutter={[16, 16]} className="items-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Col span={8} key={item.id}>
              <Card
                hoverable
                cover={<img alt={item.name} src={item.image} />}
                actions={[

                ]}
              >
                <Button type="primary" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                <Meta title={item.name} description={`Price: ₹${item.price}`} />
              </Card>
            </Col>
          ))
        ) : (
          <p>No items found</p>
        )}
      </Row>
    </div>
  );
};

export default HomePage;
