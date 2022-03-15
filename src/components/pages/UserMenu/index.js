import React, { useState, useMemo, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { uniq } from 'lodash';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import {
  getStorage, ref, getDownloadURL,
} from 'firebase/storage';

import ItemCard from './ItemCard';

const BasicTabs = () => {
  const [images, setImages] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [value, loading, error] = useCollection(
    collection(getFirestore(), 'items'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const menuItems = useMemo(() => {
    if (!loading && !error && value) {
      return value.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    return [];
  }, [value, loading, error]);

  useEffect(() => {
    (async () => {
      const newImages = {};
      await Promise.all(menuItems.map(async (item) => {
        if (newImages[item.id]) return;

        const imagePath = `items/${item.id}.jpg`;
        const storageRef = ref(getStorage(), imagePath);
        const imageUrl = await getDownloadURL(storageRef);
        newImages[item.id] = imageUrl;
      }));

      setImages(newImages);
    })();
  }, [menuItems, setImages]);

  const handleChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const categories = useMemo(() => {
    const newCategories = uniq(menuItems.map((item) => item.category));
    newCategories.sort();
    return newCategories;
  }, [menuItems]);

  let filteredMenuItems = menuItems;

  if (activeCategory !== 'all') {
    filteredMenuItems = menuItems.filter((item) => item.category === activeCategory);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeCategory} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            value="all"
            label="All"
          />
          {categories.map((category) => (
            <Tab
              key={category}
              value={category}
              label={category}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ m: '2rem' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 16 }}>
          {filteredMenuItems.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <ItemCard
                id={item.id}
                name={item.name}
                price={item.price}
                calories={item.calories}
                image={images[item.id]}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BasicTabs;
