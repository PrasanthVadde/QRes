export const countIncrement =(id,setItemCounts) => {
    setItemCounts((count) => ({
      ...count,
      [id]: (count[id] || 0) + 1,
    }));
  };

export const countDecrement=(id,setItemCounts,setCart,cart) => {
    setItemCounts((count) => {
      const newCount = (count[id] || 1) - 1;
      if (newCount <= 0) {
        
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        return { ...count, [id]: 0 }; 
      }
      return { ...count, [id]: newCount };
    });
  };