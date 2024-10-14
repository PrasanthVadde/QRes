import { Button, Card, Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice.js";

const { Meta } = Card;

const DefaultCard = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await axios("http://localhost:3000/data");
        if (status === 200) {
          setData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const cardHandler = (id) => {
    console.log("Card clicked:", id);
  };

  return (
    <Row gutter={[16, 16]}>
      {data.length > 0 &&
        data.map((item) => (
          <Col span={8} key={item.id}>
            <Card
              onClick={() => cardHandler(item.id)}
              hoverable
              cover={<img alt="example" src={item.image} />}
            >
              <Meta title={item.name} />
              <h3>price: ${item.price}</h3>
              <h3> Category: {item.category}</h3>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToCart(item)); // Add to cart using Redux
                }}
              >
                Add to cart
              </Button>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default DefaultCard;
