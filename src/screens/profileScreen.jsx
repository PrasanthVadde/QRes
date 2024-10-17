import { useState } from "react";
import { Button, Card, List } from "antd";
import "./profileScreen.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // For redirecting to SignIn

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("Orders");
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate(); // For navigation to SignIn page

  const tabOptions = ["Orders", "Favorites", "Addresses", "Settings"];

  const renderContent = () => {
    switch (selectedTab) {
      case "Orders":
        return <OrdersContent />;
      case "Favorites":
        return <FavoritesContent />;
      case "Addresses":
        return <AddressesContent />;
      case "Settings":
        return <SettingsContent />;
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <Card title="Profile">
          <p>No user logged in. Please <Button type="primary" onClick={() => navigate('/signIn')}>Sign In</Button></p>
        </Card>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-left">
        <Card title="Profile">
          <p>Username: {user.username}</p>
          <p>Mobile: {user.mobile}</p>
          <p>Email: {user.email}</p>
          <Button type="primary">Edit Profile</Button>
        </Card>
        <List
          dataSource={tabOptions}
          renderItem={(item) => (
            <List.Item
              className={selectedTab === item ? "active" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {item}
            </List.Item>
          )}
        />
      </div>

      <div className="profile-right">
        <Card title={selectedTab} className="content-card">
          {renderContent()}
        </Card>
      </div>
    </div>
  );
};

// Component to show the orders content
const OrdersContent = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser || !currentUser.orders) {
    return <p>No orders found</p>; // Return a fallback message if the user is not logged in or has no orders
  }

  return (
    <div>
      {currentUser.orders.length > 0 ? (
        currentUser.orders.map((order, index) => (
          <p key={index}>Order #{index + 1}: {order}</p>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

// Component to show the favorites content
const FavoritesContent = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser || !currentUser.favorites) {
    return <p>No favorites found</p>; // Return a fallback message if the user is not logged in or has no favorites
  }

  return (
    <div>
      {currentUser.favorites.length > 0 ? (
        currentUser.favorites.map((fav, index) => (
          <p key={index}>Favorite #{index + 1}: {fav}</p>
        ))
      ) : (
        <p>No favorites found</p>
      )}
    </div>
  );
};

// Component to show the addresses content
const AddressesContent = () => {
  return <p>Your saved addresses will appear here.</p>;
};

// Component to show the settings content
const SettingsContent = () => {
  return <p>Manage your account settings here.</p>;
};

export default ProfilePage;
