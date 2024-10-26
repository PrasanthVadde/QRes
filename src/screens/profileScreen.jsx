import { useState, useEffect } from "react";
import { Button, Card, List } from "antd";
import "./profileScreen.scss";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../components/firebase/firebase"; 

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("Orders");
  const [user, setUser] = useState(null); 
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        
        setUser(currentUser);
      } else {
        
        setUser(null);
        navigate("/signIn");
      }
    });

    
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      navigate("/signIn"); 
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

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
          <p>Username: {user.displayName || "N/A"}</p>
          <p>Email: {user.email}</p>
          <Button type="primary">Edit Profile</Button>
          <Button type="default" danger onClick={handleLogout} style={{ marginTop: "10px" }}>
            Logout
          </Button>
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

const OrdersContent = () => {
  const user = auth.currentUser;

  if (!user || !user.orders) {
    return <p>No orders found</p>; 
  }

  return (
    <div>
      {user.orders.length > 0 ? (
        user.orders.map((order, index) => (
          <p key={index}>Order #{index + 1}: {order}</p>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

const FavoritesContent = () => {
  const user = auth.currentUser;

  if (!user || !user.favorites) {
    return <p>No favorites found</p>; 
  }

  return (
    <div>
      {user.favorites.length > 0 ? (
        user.favorites.map((fav, index) => (
          <p key={index}>Favorite #{index + 1}: {fav}</p>
        ))
      ) : (
        <p>No favorites found</p>
      )}
    </div>
  );
};


const AddressesContent = () => {
  return <p>Your saved addresses will appear here.</p>;
};


const SettingsContent = () => {
  return <p>Manage your account settings here.</p>;
};

export default ProfilePage;
